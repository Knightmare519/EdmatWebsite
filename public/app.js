const socket = io();

const refreshPortsBtn = document.getElementById("refreshPortsBtn");
const portSelect = document.getElementById("portSelect");
const baudRateInput = document.getElementById("baudRateInput");
const connectBtn = document.getElementById("connectBtn");
const disconnectBtn = document.getElementById("disconnectBtn");
const statusText = document.getElementById("statusText");
const commandInput = document.getElementById("commandInput");
const sendBtn = document.getElementById("sendBtn");
const valuesGrid = document.getElementById("valuesGrid");
const logBox = document.getElementById("logBox");

const metricState = new Map();
const updateTone = new Audio("/tone.mp3");
updateTone.preload = "auto";

function playUpdateTone() {
  updateTone.currentTime = 0;
  updateTone.play().catch(() => {
    // Ignore autoplay-block errors until the user interacts with the page.
  });
}

function appendLog(message) {
  const time = new Date().toLocaleTimeString();
  logBox.textContent += `[${time}] ${message}\n`;
  logBox.scrollTop = logBox.scrollHeight;
}

function renderMetrics() {
  valuesGrid.innerHTML = "";
  for (const [key, value] of metricState.entries()) {
    const card = document.createElement("div");
    card.className = "metric";
    card.innerHTML = `<div class="key">${key}</div><div class="value">${value}</div>`;
    valuesGrid.appendChild(card);
  }
}

function setStatus(connected, path) {
  statusText.textContent = connected
    ? `Status: Connected (${path})`
    : "Status: Disconnected";
}

function setPorts(ports) {
  const previous = portSelect.value;
  portSelect.innerHTML = "";

  if (!ports.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No ports found";
    portSelect.appendChild(option);
    return;
  }

  for (const port of ports) {
    const option = document.createElement("option");
    option.value = port.path;
    const details = [port.path, port.manufacturer].filter(Boolean).join(" - ");
    option.textContent = details || port.path;
    portSelect.appendChild(option);
  }

  if ([...portSelect.options].some((option) => option.value === previous)) {
    portSelect.value = previous;
  }
}

function sendCommand(message) {
  socket.emit("serial-write", { message });
}

refreshPortsBtn.addEventListener("click", () => socket.emit("list-ports"));

connectBtn.addEventListener("click", () => {
  socket.emit("connect-serial", {
    portPath: portSelect.value,
    baudRate: Number(baudRateInput.value)
  });
});

disconnectBtn.addEventListener("click", () => {
  socket.emit("disconnect-serial");
});

sendBtn.addEventListener("click", () => {
  const message = commandInput.value.trim();
  if (!message) return;
  sendCommand(message);
  commandInput.value = "";
});

commandInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendBtn.click();
  }
});

document.querySelectorAll(".quickCmd").forEach((button) => {
  button.addEventListener("click", () => sendCommand(button.dataset.cmd));
});

socket.on("connect", () => {
  appendLog("Socket connected");
  socket.emit("list-ports");
});

socket.on("serial-status", ({ connected, path }) => {
  setStatus(connected, path);
});

socket.on("serial-ports", (ports) => {
  setPorts(ports);
  appendLog(`Found ${ports.length} serial port(s)`);
});

socket.on("serial-data", ({ raw, parsed }) => {
  appendLog(`RX: ${raw}`);

  let hasMetricChanged = false;
  Object.entries(parsed || {}).forEach(([key, value]) => {
    if (metricState.get(key) !== value) {
      hasMetricChanged = true;
    }
    metricState.set(key, value);
  });

  if (hasMetricChanged) {
    playUpdateTone();
  }

  renderMetrics();
});

socket.on("serial-message", ({ message }) => appendLog(message));

socket.on("serial-error", ({ message }) => appendLog(`ERROR: ${message}`));
