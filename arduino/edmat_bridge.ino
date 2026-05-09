/*
  Edmat Arduino Bridge Example
  - Reads A0 every second and sends serial lines like: sensor=A0,value=512
  - Reads D2 push button and sends: D2=PRESSED
  - Accepts commands from website:
      LED_ON
      LED_OFF
      READ_NOW
*/

const int LED_PIN = LED_BUILTIN;
const int SENSOR_PIN = A0;
const int BUTTON_PIN = 2;
int lastButtonReading = HIGH;
unsigned long lastButtonDebounceAt = 0;
const unsigned long BUTTON_DEBOUNCE_MS = 50;
unsigned long lastReadAt = 0;
const unsigned long READ_INTERVAL_MS = 1000;

void setup() {
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  Serial.begin(9600);
  delay(300);
  Serial.println("status=ready");
}

void sendReading() {
  int value = analogRead(SENSOR_PIN);
  Serial.print("sensor=A0,value=");
  Serial.println(value);
}

void handleCommand(String cmd) {
  cmd.trim();
  cmd.toUpperCase();

  if (cmd == "LED_ON") {
    digitalWrite(LED_PIN, HIGH);
    Serial.println("led=on");
  } else if (cmd == "LED_OFF") {
    digitalWrite(LED_PIN, LOW);
    Serial.println("led=off");
  } else if (cmd == "READ_NOW") {
    sendReading();
  } else if (cmd.length() > 0) {
    Serial.print("unknown=");
    Serial.println(cmd);
  }
}

void loop() {
  if (Serial.available() > 0) {
    String line = Serial.readStringUntil('\n');
    handleCommand(line);
  }

  int currentReading = digitalRead(BUTTON_PIN);
  if (currentReading != lastButtonReading) {
    lastButtonDebounceAt = millis();
    lastButtonReading = currentReading;
  }

  if ((millis() - lastButtonDebounceAt) > BUTTON_DEBOUNCE_MS) {
    static int stableState = HIGH;
    if (currentReading != stableState) {
      stableState = currentReading;
      if (stableState == LOW) {
        Serial.println("D2=PRESSED");
      }
    }
  }

  unsigned long now = millis();
  if (now - lastReadAt >= READ_INTERVAL_MS) {
    lastReadAt = now;
    sendReading();
  }
}
