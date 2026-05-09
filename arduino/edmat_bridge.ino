#include <Servo.h>

/*
  Edmat Arduino Bridge Example
  - Reads A0 every second and sends serial lines like: sensor=A0,value=512
  - Reads D2 push button and sends: D2=PRESSED
  - Pulses buzzer on D6 for 0.3s when D2 is pressed
  - Drives servos on D8 and D9 in opposite 180deg directions on approve command
  - Accepts commands from website:
      LED_ON
      LED_OFF
      READ_NOW
      MOTOR_APPROVE
*/

const int LED_PIN = LED_BUILTIN;
const int SENSOR_PIN = A0;
const int BUTTON_PIN = 2;
const int BUZZER_PIN = 6;
const int MOTOR_A_PIN = 8;
const int MOTOR_B_PIN = 9;

const int MOTOR_A_HOME_DEG = 0;
const int MOTOR_B_HOME_DEG = 180;
const int MOTOR_A_ACTIVE_DEG = 180;
const int MOTOR_B_ACTIVE_DEG = 0;

int lastButtonReading = HIGH;
unsigned long lastButtonDebounceAt = 0;
const unsigned long BUTTON_DEBOUNCE_MS = 50;

unsigned long lastReadAt = 0;
const unsigned long READ_INTERVAL_MS = 1000;

unsigned long buzzerOffAt = 0;
const unsigned long BUZZ_DURATION_MS = 300;

unsigned long motorReturnAt = 0;
const unsigned long MOTOR_RETURN_WAIT_MS = 5000;
bool motorCycleActive = false;

Servo motorA;
Servo motorB;

void moveMotorsHome() {
  motorA.write(MOTOR_A_HOME_DEG);
  motorB.write(MOTOR_B_HOME_DEG);
}

void triggerMotorApproveCycle() {
  motorA.write(MOTOR_A_ACTIVE_DEG);
  motorB.write(MOTOR_B_ACTIVE_DEG);
  motorReturnAt = millis() + MOTOR_RETURN_WAIT_MS;
  motorCycleActive = true;
  Serial.println("motor=active");
}

void setup() {
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);

  pinMode(BUTTON_PIN, INPUT_PULLUP);

  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);

  motorA.attach(MOTOR_A_PIN);
  motorB.attach(MOTOR_B_PIN);
  moveMotorsHome();

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
  } else if (cmd == "MOTOR_APPROVE") {
    triggerMotorApproveCycle();
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
        digitalWrite(BUZZER_PIN, HIGH);
        buzzerOffAt = millis() + BUZZ_DURATION_MS;
      }
    }
  }

  if (buzzerOffAt > 0 && millis() >= buzzerOffAt) {
    digitalWrite(BUZZER_PIN, LOW);
    buzzerOffAt = 0;
  }

  if (motorCycleActive && millis() >= motorReturnAt) {
    moveMotorsHome();
    motorCycleActive = false;
    motorReturnAt = 0;
    Serial.println("motor=home");
  }

  unsigned long now = millis();
  if (now - lastReadAt >= READ_INTERVAL_MS) {
    lastReadAt = now;
    sendReading();
  }
}
