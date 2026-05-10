#include <Servo.h>

/*
  Edmat Arduino Bridge Example
  - Reads A0 every second and sends serial lines like: sensor=A0,value=512
  - Reads D2 push button and sends: D2=PRESSED
  - Pulses buzzer on D6 for 0.3s when D2 is pressed
  - Drives continuous servos on D8 and D9 in opposite directions on approve command
  - Lights D11 for low-risk approve, D12 for moderate/high-risk approve
  - Accepts commands from website:
      LED_ON
      LED_OFF
      READ_NOW
      MOTOR_APPROVE
      APPROVE_LOW
      APPROVE_ELEVATED
*/

const int LED_PIN = LED_BUILTIN;
const int SENSOR_PIN = A0;
const int BUTTON_PIN = 2;
const int BUZZER_PIN = 6;
const int MOTOR_A_PIN = 8;
const int MOTOR_B_PIN = 9;
const int LOW_RISK_LED_PIN = 11;
const int ELEVATED_RISK_LED_PIN = 12;

const int SERVO_STOP = 90;
const int MOTOR_A_FORWARD = 100;
const int MOTOR_A_REVERSE = 80;
const int MOTOR_B_FORWARD = 80;
const int MOTOR_B_REVERSE = 100;
const unsigned long MOTOR_SPIN_MS = 1000;
const unsigned long MOTOR_RETURN_WAIT_MS = 5000;

int lastButtonReading = HIGH;
unsigned long lastButtonDebounceAt = 0;
const unsigned long BUTTON_DEBOUNCE_MS = 50;

unsigned long lastReadAt = 0;
const unsigned long READ_INTERVAL_MS = 1000;

unsigned long buzzerOffAt = 0;
const unsigned long BUZZ_DURATION_MS = 300;

enum MotorCycleState {
  MOTOR_IDLE,
  MOTOR_SPIN_OUT,
  MOTOR_WAIT_BEFORE_RETURN,
  MOTOR_SPIN_BACK
};

MotorCycleState motorState = MOTOR_IDLE;
unsigned long motorPhaseAt = 0;

Servo motorA;
Servo motorB;

void stopMotors() {
  motorA.write(SERVO_STOP);
  motorB.write(SERVO_STOP);
}

void spinMotorsOut() {
  motorA.write(MOTOR_A_FORWARD);
  motorB.write(MOTOR_B_FORWARD);
}

void spinMotorsBack() {
  motorA.write(MOTOR_A_REVERSE);
  motorB.write(MOTOR_B_REVERSE);
}

void triggerMotorApproveCycle() {
  spinMotorsOut();
  motorState = MOTOR_SPIN_OUT;
  motorPhaseAt = millis() + MOTOR_SPIN_MS;
  Serial.println("motor=active");
}

void setup() {
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);

  pinMode(BUTTON_PIN, INPUT_PULLUP);

  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);

  pinMode(LOW_RISK_LED_PIN, OUTPUT);
  pinMode(ELEVATED_RISK_LED_PIN, OUTPUT);
  digitalWrite(LOW_RISK_LED_PIN, LOW);
  digitalWrite(ELEVATED_RISK_LED_PIN, LOW);

  motorA.attach(MOTOR_A_PIN);
  motorB.attach(MOTOR_B_PIN);
  stopMotors();

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
  } else if (cmd == "APPROVE_LOW") {
    digitalWrite(LOW_RISK_LED_PIN, HIGH);
    digitalWrite(ELEVATED_RISK_LED_PIN, LOW);
    Serial.println("approve_led=low");
  } else if (cmd == "APPROVE_ELEVATED") {
    digitalWrite(LOW_RISK_LED_PIN, LOW);
    digitalWrite(ELEVATED_RISK_LED_PIN, HIGH);
    Serial.println("approve_led=elevated");
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

  if (motorState != MOTOR_IDLE && millis() >= motorPhaseAt) {
    if (motorState == MOTOR_SPIN_OUT) {
      stopMotors();
      motorState = MOTOR_WAIT_BEFORE_RETURN;
      motorPhaseAt = millis() + MOTOR_RETURN_WAIT_MS;
      Serial.println("motor=wait");
    } else if (motorState == MOTOR_WAIT_BEFORE_RETURN) {
      spinMotorsBack();
      motorState = MOTOR_SPIN_BACK;
      motorPhaseAt = millis() + MOTOR_SPIN_MS;
      Serial.println("motor=return");
    } else if (motorState == MOTOR_SPIN_BACK) {
      stopMotors();
      motorState = MOTOR_IDLE;
      motorPhaseAt = 0;
      Serial.println("motor=home");
    }
  }

  unsigned long now = millis();
  if (now - lastReadAt >= READ_INTERVAL_MS) {
    lastReadAt = now;
    sendReading();
  }
}
