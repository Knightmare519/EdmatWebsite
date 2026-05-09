# Edmat Arduino Website Bridge

This project connects a website to an Arduino over serial:
- Read Arduino input values in real time.
- Send output commands from the browser to Arduino.

## 1. Prerequisites

- Node.js 20+ installed
- Arduino board connected by USB
- Arduino IDE installed

## 2. Upload Arduino Sketch

1. Open `arduino/edmat_bridge.ino` in Arduino IDE.
2. Select your board and COM port.
3. Upload the sketch.
4. Close Arduino Serial Monitor after upload (it can lock the COM port).

## 3. Install & Run Website Bridge

```bash
npm install
npm run dev
```

Then open:

`http://localhost:3000`

## 4. Use the Dashboard

1. Click `Refresh Ports`.
2. Select your Arduino port (for Windows usually `COMx`).
3. Keep baud rate `9600` (or match your sketch).
4. Click `Connect`.

You will see:
- Parsed values such as `sensor` and `value`.
- Live serial log.

## 5. Output Commands

Use buttons or send manual commands:
- `LED_ON`
- `LED_OFF`
- `READ_NOW`

## 6. Data Format

The server parses serial lines in key-value format:

`key=value,key2=value2`

or

`key=value;key2=value2`

Example:

`sensor=A0,value=523`
