const path = require("path");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const WEB_PORT = Number(process.env.PORT || 3000);

let serialPort = null;
let serialParser = null;
let lastD2TriggerAt = 0;
const D2_TRIGGER_DEBOUNCE_MS = 250;

function serialState() {
  return {
    connected: Boolean(serialPort && serialPort.isOpen),
    path: serialPort?.path || null
  };
}

function parseKeyValueLine(rawLine) {
  const pairs = rawLine
    .split(/[;,]/)
    .map((part) => part.trim())
    .filter(Boolean);

  const values = {};
  for (const pair of pairs) {
    const idx = pair.indexOf("=");
    if (idx < 1) continue;
    const key = pair.slice(0, idx).trim();
    const value = pair.slice(idx + 1).trim();
    if (!key) continue;
    values[key] = value;
  }
  return values;
}

function parsedValueCaseInsensitive(parsed, key) {
  const expected = String(key || "").toUpperCase();
  for (const [k, v] of Object.entries(parsed || {})) {
    if (String(k).toUpperCase() === expected) {
      return String(v).toUpperCase();
    }
  }
  return "";
}

function isD2Press(raw, parsed) {
  const rawUpper = String(raw || "").toUpperCase();
  if (rawUpper === "D2_PRESSED" || rawUpper === "BUTTON_D2_PRESSED") return true;

  const d2 = parsedValueCaseInsensitive(parsed, "D2");
  return d2 === "1" || d2 === "PRESSED" || d2 === "PRESS";
}

function emitHardwareTriggerIfNeeded(raw, parsed) {
  if (!isD2Press(raw, parsed)) return;

  const now = Date.now();
  if (now - lastD2TriggerAt < D2_TRIGGER_DEBOUNCE_MS) return;
  lastD2TriggerAt = now;

  io.emit("hardware-trigger", {
    source: "D2",
    at: new Date().toISOString()
  });
}

async function listPorts() {
  const ports = await SerialPort.list();
  return ports.map((port) => ({
    path: port.path,
    manufacturer: port.manufacturer || "",
    serialNumber: port.serialNumber || "",
    vendorId: port.vendorId || "",
    productId: port.productId || ""
  }));
}

async function disconnectSerial() {
  if (!serialPort) return;
  const portToClose = serialPort;
  serialPort = null;
  serialParser = null;

  await new Promise((resolve) => {
    portToClose.close(() => resolve());
  });
}

async function connectSerial({ portPath, baudRate }) {
  if (!portPath) {
    throw new Error("Port path is required.");
  }

  if (serialPort && serialPort.isOpen) {
    throw new Error("A serial port is already connected. Disconnect first.");
  }

  const nextPort = new SerialPort({
    path: portPath,
    baudRate: Number(baudRate) || 9600,
    autoOpen: false
  });

  const parser = nextPort.pipe(new ReadlineParser({ delimiter: "\n" }));
  parser.on("data", (line) => {
    const raw = String(line).trim();
    if (!raw) return;
    const parsed = parseKeyValueLine(raw);
    io.emit("serial-data", {
      raw,
      parsed,
      at: new Date().toISOString()
    });
    emitHardwareTriggerIfNeeded(raw, parsed);
  });

  nextPort.on("error", (error) => {
    io.emit("serial-error", { message: error.message });
  });

  nextPort.on("close", () => {
    serialPort = null;
    serialParser = null;
    io.emit("serial-status", serialState());
  });

  await new Promise((resolve, reject) => {
    nextPort.open((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });

  serialPort = nextPort;
  serialParser = parser;
}

function looksLikeArduinoPort(port) {
  const text = [
    port.path,
    port.manufacturer,
    port.vendorId,
    port.productId,
    port.serialNumber
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return (
    text.includes("arduino") ||
    text.includes("wch") ||
    text.includes("ch340") ||
    text.includes("usb serial") ||
    text.includes("ftdi")
  );
}

async function autoConnectSerial({ baudRate } = {}) {
  if (serialPort && serialPort.isOpen) {
    return { connected: true, path: serialPort.path, auto: false };
  }

  const ports = await listPorts();
  if (!ports.length) {
    throw new Error("No serial ports found.");
  }

  const preferred = ports.find(looksLikeArduinoPort) || ports[0];
  await connectSerial({ portPath: preferred.path, baudRate: Number(baudRate) || 9600 });
  return { connected: true, path: preferred.path, auto: true };
}

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/ports", async (_req, res) => {
  try {
    const ports = await listPorts();
    res.json(ports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

io.on("connection", (socket) => {
  socket.emit("serial-status", serialState());

  socket.on("list-ports", async () => {
    try {
      socket.emit("serial-ports", await listPorts());
    } catch (error) {
      socket.emit("serial-error", { message: error.message });
    }
  });

  socket.on("connect-serial", async ({ portPath, baudRate }) => {
    try {
      await connectSerial({ portPath, baudRate });
      io.emit("serial-status", serialState());
      io.emit("serial-message", {
        message: `Connected to ${portPath} at ${baudRate || 9600} baud`
      });
    } catch (error) {
      socket.emit("serial-error", { message: error.message });
    }
  });

  socket.on("auto-connect-serial", async ({ baudRate } = {}) => {
    try {
      const result = await autoConnectSerial({ baudRate });
      io.emit("serial-status", serialState());
      io.emit("serial-message", {
        message: result.auto
          ? `Auto-connected to ${result.path} at ${baudRate || 9600} baud`
          : `Serial already connected at ${result.path}`
      });
    } catch (error) {
      socket.emit("serial-error", { message: error.message });
    }
  });

  socket.on("disconnect-serial", async () => {
    try {
      await disconnectSerial();
      io.emit("serial-status", serialState());
      io.emit("serial-message", { message: "Disconnected" });
    } catch (error) {
      socket.emit("serial-error", { message: error.message });
    }
  });

  socket.on("serial-write", ({ message }) => {
    if (!serialPort || !serialPort.isOpen) {
      socket.emit("serial-error", { message: "Serial port is not connected." });
      return;
    }

    const out = String(message || "");
    if (!out.trim()) return;

    serialPort.write(`${out}\n`, (error) => {
      if (error) {
        socket.emit("serial-error", { message: error.message });
      } else {
        io.emit("serial-message", { message: `TX: ${out}` });
      }
    });
  });
});

server.listen(WEB_PORT, () => {
  console.log(`Web bridge running at http://localhost:${WEB_PORT}`);
});
