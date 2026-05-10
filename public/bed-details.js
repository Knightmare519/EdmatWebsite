const bedProfiles = {};

const BED_IDS = Array.from({ length: 16 }, (_, index) => `Bed ${index + 1}`);
const EMPTY_PHOTO =
  "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=140&q=80";
const LOW_PHOTO =
  "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=140&q=80";
const MEDIUM_PHOTO =
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=140&q=80";
const HIGH_PHOTO =
  "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=140&q=80";

const PATIENT_POOL = [
  {
    name: "Mr. Dev Anand",
    nric: "NRIC: 69251480",
    ageGender: "49 Years - Male",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=140&q=80",
    diagnosis: "Fever monitoring",
    allergies: "No Known Allergies"
  },
  {
    name: "Madam Teo Mei Lin",
    nric: "NRIC: 56094523",
    ageGender: "68 Years - Female",
    photo: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=140&q=80",
    diagnosis: "Post-op shoulder recovery",
    allergies: "Seafood"
  },
  {
    name: "Mr. Kumar S/O Rajan",
    nric: "NRIC: 47190264",
    ageGender: "58 Years - Male",
    photo: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=140&q=80",
    diagnosis: "Back pain management",
    allergies: "No Known Allergies"
  },
  {
    name: "Ms. Juliana D Cruz",
    nric: "NRIC: 63942105",
    ageGender: "44 Years - Female",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=140&q=80",
    diagnosis: "Mild dehydration",
    allergies: "Aspirin"
  },
  {
    name: "Mr. Haikal Bin Osman",
    nric: "NRIC: 42076395",
    ageGender: "73 Years - Male",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=140&q=80",
    diagnosis: "Hip surgery recovery",
    allergies: "No Known Allergies"
  },
  {
    name: "Madam Lim Siew Lin",
    nric: "NRIC: 35892164",
    ageGender: "70 Years - Female",
    photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=140&q=80",
    diagnosis: "Arthritis management",
    allergies: "Latex"
  },
  {
    name: "Ms. Aisha Binte Rahman",
    nric: "NRIC: 27483190",
    ageGender: "66 Years - Female",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=140&q=80",
    diagnosis: "Post-op abdominal surgery",
    allergies: "No Known Allergies"
  },
  {
    name: "Mr. Lee Cheng Wei",
    nric: "NRIC: 19836274",
    ageGender: "81 Years - Male",
    photo: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=140&q=80",
    diagnosis: "Stroke rehabilitation",
    allergies: "Sulfa Drugs"
  },
  {
    name: "Mr. Tan Ah Kow",
    nric: "NRIC: 12345678",
    ageGender: "78 Years - Male",
    photo: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=140&q=80",
    diagnosis: "Post-op knee replacement",
    allergies: "No Known Allergies"
  },
  {
    name: "Mdm Chua Hui Ping",
    nric: "NRIC: 51793846",
    ageGender: "74 Years - Female",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=140&q=80",
    diagnosis: "COPD observation",
    allergies: "Penicillin"
  },
  {
    name: "Mr. Ramesh Kumar",
    nric: "NRIC: 60421739",
    ageGender: "62 Years - Male",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=140&q=80",
    diagnosis: "Diabetes control",
    allergies: "No Known Allergies"
  },
  {
    name: "Ms. Nur Izzati",
    nric: "NRIC: 73912568",
    ageGender: "57 Years - Female",
    photo: "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=140&q=80",
    diagnosis: "Renal monitoring",
    allergies: "Iodine Contrast"
  },
  {
    name: "Mr. Daniel Goh",
    nric: "NRIC: 85362714",
    ageGender: "60 Years - Male",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=140&q=80",
    diagnosis: "Pneumonia treatment",
    allergies: "No Known Allergies"
  },
  {
    name: "Mdm Saraswati Devi",
    nric: "NRIC: 46712095",
    ageGender: "72 Years - Female",
    photo: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=140&q=80",
    diagnosis: "Post-fall observation",
    allergies: "NSAIDs"
  },
  {
    name: "Mr. Noor Azlan",
    nric: "NRIC: 39507281",
    ageGender: "65 Years - Male",
    photo: "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=140&q=80",
    diagnosis: "Cardiac telemetry",
    allergies: "No Known Allergies"
  },
  {
    name: "Ms. Joyce Ng",
    nric: "NRIC: 58163427",
    ageGender: "55 Years - Female",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=140&q=80",
    diagnosis: "Vertigo observation",
    allergies: "Shellfish"
  }
];

function shuffleArray(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatClockFromMinutesAgo(minutesAgo) {
  const time = new Date(Date.now() - minutesAgo * 60 * 1000);
  const hours24 = time.getHours();
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12;
  return `${hours12}:${minutes} ${period}`;
}

function relativeAgoLabel(minutesAgo) {
  if (minutesAgo < 60) return `${minutesAgo} min ago`;
  const hours = Math.floor(minutesAgo / 60);
  return `${hours} hr ago`;
}

function eventTypeForRisk(risk) {
  if (risk === "high") return ["Help Request", "Bed Exit Alert", "Urgent Nurse Call"];
  if (risk === "moderate") return ["Toilet Request", "Mobility Assist", "Nurse Call"];
  return ["Vitals Update", "Meal Assistance", "Medication Reminder"];
}

function normalizeRisk(raw) {
  const value = String(raw || "").toLowerCase();
  if (value.includes("high")) return "high";
  if (value.includes("medium") || value.includes("moderate")) return "moderate";
  if (value.includes("low")) return "low";
  return "empty";
}

function fallbackPhotoForRisk(risk) {
  if (risk === "high") return HIGH_PHOTO;
  if (risk === "moderate") return MEDIUM_PHOTO;
  if (risk === "low") return LOW_PHOTO;
  return EMPTY_PHOTO;
}

function buildRandomizedBedProfile(bedId, risk, patientTemplate) {
  const isEmpty = risk === "empty";
  const requestMinutesAgo = Math.floor(Math.random() * 55) + 2;
  const lastUsedMinutesAgo = Math.floor(Math.random() * 360) + 20;
  const eventTypes = eventTypeForRisk(risk);
  const randomEventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];

  if (isEmpty) {
    return {
      name: "",
      nric: "",
      ageGender: "",
      bed: bedId,
      risk: "empty",
      photo: EMPTY_PHOTO,
      eventType: "",
      eventTime: `Last used: ${formatClockFromMinutesAgo(lastUsedMinutesAgo)}`,
      eventAgo: "",
      assessment: {
        historyOfFalling: "",
        secondaryDiagnosis: "",
        ambulatoryAid: "",
        ivTherapy: ""
      },
      diagnosis: "",
      mobility: "",
      fallHistory: "",
      allergies: "",
      action: ""
    };
  }

  return {
    name: patientTemplate.name,
    nric: patientTemplate.nric,
    ageGender: patientTemplate.ageGender,
    bed: bedId,
    risk,
    photo: patientTemplate.photo,
    eventType: randomEventType,
    eventTime: `Requested at ${formatClockFromMinutesAgo(requestMinutesAgo)}`,
    eventAgo: relativeAgoLabel(requestMinutesAgo),
    assessment: {
      historyOfFalling: risk === "low" ? "No" : "Yes",
      secondaryDiagnosis: risk === "high" ? "Yes" : Math.random() > 0.5 ? "Yes" : "No",
      ambulatoryAid: risk === "low" ? "No" : "Yes",
      ivTherapy: risk === "high" ? "No" : Math.random() > 0.6 ? "Finished" : "No"
    },
    diagnosis: patientTemplate.diagnosis,
    mobility:
      risk === "high"
        ? "Needs full assistance"
        : risk === "moderate"
          ? "Needs assistance"
          : "Independent with supervision",
    fallHistory:
      risk === "high"
        ? "Yes (within 6 months)"
        : risk === "moderate"
          ? "Yes (older than 6 months)"
          : "No",
    allergies: patientTemplate.allergies,
    action:
      risk === "high"
        ? "Immediate Assistance Needed"
        : risk === "moderate"
          ? "Assist During Movement"
          : "Routine Monitoring"
  };
}

function seedInitialBedProfiles(wardSetup) {
  const patientTemplates = shuffleArray(PATIENT_POOL);
  let patientIndex = 0;
  wardSetup.forEach(({ bedId, risk }) => {
    const template = risk === "empty" ? null : patientTemplates[patientIndex++];
    bedProfiles[bedId] = buildRandomizedBedProfile(bedId, risk, template);
  });
}

const riskMap = {
  low: "Low Risk",
  moderate: "Medium Risk",
  high: "High Risk",
  empty: "Empty Bed"
};

const cards = [...document.querySelectorAll(".ward-card[data-bed]")];

const ui = {
  patientPhoto: document.getElementById("patientPhoto"),
  patientName: document.getElementById("patientName"),
  patientNric: document.getElementById("patientNric"),
  patientAgeGender: document.getElementById("patientAgeGender"),
  patientBed: document.getElementById("patientBed"),
  patientRiskFlag: document.getElementById("patientRiskFlag"),
  eventType: document.getElementById("eventType"),
  eventTime: document.getElementById("eventTime"),
  eventAgo: document.getElementById("eventAgo"),
  riskLevelText: document.getElementById("riskLevelText"),
  riskHistory: document.getElementById("riskHistory"),
  riskSecondary: document.getElementById("riskSecondary"),
  riskAmbulatory: document.getElementById("riskAmbulatory"),
  riskIv: document.getElementById("riskIv"),
  infoDiagnosis: document.getElementById("infoDiagnosis"),
  infoMobility: document.getElementById("infoMobility"),
  infoFallHistory: document.getElementById("infoFallHistory"),
  infoAllergies: document.getElementById("infoAllergies"),
  actionBanner: document.getElementById("actionBanner"),
  approveRailsBtn: document.getElementById("approveRailsBtn"),
  randomNotifyBtn: document.getElementById("randomNotifyBtn"),
  d2DebugPill: document.getElementById("d2DebugPill"),
  motorDebugPill: document.getElementById("motorDebugPill"),
  ledDebugPill: document.getElementById("ledDebugPill")
};
const hardwareSocket = typeof window.io === "function" ? window.io() : null;
let lastD2UiTriggerAt = 0;
const D2_UI_TRIGGER_DEBOUNCE_MS = 300;
const D2_TARGET_BEDS = ["Bed 5", "Bed 11"];
let nextD2TargetIndex = 0;
let d2PillResetTimer = null;

const firestoreState = {
  enabled: false,
  db: null
};
const statusUpdateTone = new Audio("/tone.mp3");
statusUpdateTone.preload = "auto";
let hasReceivedInitialStatusSnapshot = false;
const toneSuppressedUntilByBedId = new Map();
const APPROVE_TONE_SUPPRESS_MS = 5000;
const AUTO_SYNC_FIRESTORE = true;
const RISK_DISTRIBUTION = [
  "high",
  "high",
  "high",
  "high",
  "moderate",
  "moderate",
  "moderate",
  "moderate",
  "low",
  "low",
  "low",
  "low",
  "empty",
  "empty",
  "empty",
  "empty"
];
let wardSetup = [];
let wardSetupById = new Map();
let patientBedIds = [];

function createRandomWardSetup() {
  const shuffledRisks = shuffleArray(RISK_DISTRIBUTION);
  return BED_IDS.map((bedId, index) => ({
    bedId,
    risk: shuffledRisks[index]
  }));
}

function setWardSetup(nextWardSetup) {
  wardSetup = nextWardSetup.map((entry) => ({
    bedId: entry.bedId,
    risk: normalizeRisk(entry.risk)
  }));
  wardSetupById = new Map(wardSetup.map((entry) => [entry.bedId, entry]));
  patientBedIds = wardSetup.filter((entry) => entry.risk !== "empty").map((entry) => entry.bedId);
}

setWardSetup(createRandomWardSetup());
seedInitialBedProfiles(wardSetup);
let litBedClearTimer = null;

function cardTypeForRisk(risk) {
  if (risk === "high") return "urgent";
  if (risk === "moderate") return "assist";
  if (risk === "empty") return "empty";
  return "normal";
}

function defaultCardStateForRisk(risk) {
  if (risk === "high") {
    return { cardType: "urgent", count: "", statusText: "High Risk", requestActive: false, isOn: false };
  }
  if (risk === "moderate") {
    return { cardType: "assist", count: "", statusText: "Medium Risk", requestActive: false, isOn: false };
  }
  if (risk === "empty") {
    return { cardType: "empty", count: "", statusText: "Empty Bed", requestActive: false, isOn: false };
  }

  return { cardType: "normal", count: "", statusText: "Low Risk", requestActive: false, isOn: false };
}

function buildGeneratedBedProfile(bedId, risk) {
  const bedNumber = Number(String(bedId).replace(/[^\d]/g, "")) || 0;
  const padded = String(10000000 + bedNumber).slice(1);
  const isEmpty = risk === "empty";

  return {
    name: isEmpty ? "" : `Patient ${bedNumber || bedId}`,
    nric: isEmpty ? "" : `NRIC: ${padded}`,
    ageGender: isEmpty ? "" : "68 Years - Patient",
    bed: bedId,
    risk,
    photo: isEmpty ? EMPTY_PHOTO : risk === "high" ? HIGH_PHOTO : risk === "moderate" ? MEDIUM_PHOTO : LOW_PHOTO,
    eventType: isEmpty ? "" : risk === "high" ? "Help Request" : risk === "moderate" ? "Toilet Request" : "Vitals Update",
    eventTime: isEmpty ? "Last used: --" : "Requested just now",
    eventAgo: isEmpty ? "" : "Active now",
    assessment: {
      historyOfFalling: isEmpty ? "" : risk === "high" || risk === "moderate" ? "Yes" : "No",
      secondaryDiagnosis: isEmpty ? "" : risk === "high" || risk === "moderate" ? "Yes" : "No",
      ambulatoryAid: isEmpty ? "" : risk === "high" || risk === "moderate" ? "Yes" : "No",
      ivTherapy: isEmpty ? "" : "No"
    },
    diagnosis: isEmpty ? "" : "General ward monitoring",
    mobility: isEmpty ? "" : risk === "high" ? "Needs full assistance" : risk === "moderate" ? "Needs assistance" : "Independent",
    fallHistory: isEmpty ? "" : risk === "high" || risk === "moderate" ? "Yes" : "No",
    allergies: isEmpty ? "" : "No Known Allergies",
    action: isEmpty ? "" : risk === "high" ? "Immediate Assistance Needed" : risk === "moderate" ? "Assist During Movement" : "Routine Monitoring"
  };
}

function playStatusUpdateTone() {
  statusUpdateTone.currentTime = 0;
  statusUpdateTone.play().catch(() => {
    // Ignore autoplay-block errors until the user interacts with the page.
  });
}

function nricValue(raw) {
  return String(raw || "").replace(/^NRIC:\s*/i, "").trim();
}

function buildPatientRecord(bedId, bed) {
  const isAssigned = bed.risk !== "empty" && Boolean((bed.name || "").trim());
  return {
    bedId,
    assigned: isAssigned,
    risk: bed.risk || "empty",
    patientName: bed.name || "",
    nric: nricValue(bed.nric),
    ageGender: bed.ageGender || "",
    photo: bed.photo || fallbackPhotoForRisk(bed.risk),
    riskCategory: riskMap[bed.risk] || "Unknown",
    assessment: {
      historyOfFalling: bed.assessment?.historyOfFalling || "",
      secondaryDiagnosis: bed.assessment?.secondaryDiagnosis || "",
      ambulatoryAid: bed.assessment?.ambulatoryAid || "",
      ivTherapy: bed.assessment?.ivTherapy || ""
    },
    diagnosis: bed.diagnosis || "",
    mobility: bed.mobility || "",
    fallHistory: bed.fallHistory || "",
    allergies: bed.allergies || "",
    eventType: bed.eventType || "",
    eventTime: bed.eventTime || "",
    eventAgo: bed.eventAgo || "",
    action: bed.action || "",
    lastUsedTime: isAssigned ? "" : bed.eventTime || ""
  };
}

function getCardType(card) {
  if (card.classList.contains("empty")) return "empty";
  if (card.classList.contains("urgent")) return "urgent";
  if (card.classList.contains("assist")) return "assist";
  return "normal";
}

function readCardStatus(card) {
  const bedId = card?.dataset?.bed;
  const risk = wardSetupById.get(bedId)?.risk || "empty";
  return {
    cardType: getCardType(card),
    count: card.querySelector(".count")?.textContent?.trim() || "",
    statusText: card.querySelector("p")?.textContent?.trim() || "",
    requestActive: card.classList.contains("request-active"),
    isOn: card.classList.contains("is-on"),
    risk
  };
}

function normalizeStatusText(text) {
  const value = String(text || "").trim().toLowerCase();
  if (value === "all clear") return "Low Risk";
  if (value === "pending") return "Medium Risk";
  if (value === "request unanswered") return "High Risk";
  return text;
}

function isStatusOn(state = {}) {
  if (typeof state.isOn === "boolean") return state.isOn;
  if (typeof state.on === "boolean") return state.on;
  if (state.requestActive === true) return true;

  const countValue = String(state.count || "").trim().toLowerCase();
  if (["1", "on", "true", "yes"].includes(countValue)) return true;

  return false;
}

function applyStatusToCard(card, state) {
  if (!card || !state) return;
  const normalizedState = {
    ...state,
    statusText: normalizeStatusText(state.statusText),
    isOn: Boolean(state.isOn)
  };

  card.classList.remove("normal", "assist", "urgent", "empty", "request-active", "is-on");
  card.classList.add(normalizedState.cardType || "normal");
  if (normalizedState.requestActive) card.classList.add("request-active");
  if (normalizedState.isOn) card.classList.add("is-on");

  const count = card.querySelector(".count");
  if (count && typeof normalizedState.count === "string") count.textContent = normalizedState.count;

  const status = card.querySelector("p");
  if (status && typeof normalizedState.statusText === "string") status.textContent = normalizedState.statusText;

  const chip = card.querySelector(".request-chip");
  if (normalizedState.requestActive) {
    if (!chip) {
      const el = document.createElement("span");
      el.className = "request-chip";
      el.textContent = "Needs Response";
      card.insertBefore(el, card.querySelector(".ward-details"));
    }
  } else if (chip) {
    chip.remove();
  }
}

function normalizedStatusForRisk(risk, state = {}) {
  const normalizedRisk = normalizeRisk(risk);
  const fallback = defaultCardStateForRisk(normalizedRisk);
  const on = isStatusOn(state);
  return {
    ...fallback,
    count: "",
    requestActive: false,
    isOn: on,
    risk: normalizedRisk
  };
}

function applyDefaultWardSetup() {
  wardSetup.forEach(({ bedId, risk }) => {
    if (!bedProfiles[bedId]) {
      bedProfiles[bedId] = buildGeneratedBedProfile(bedId, risk);
    }
  });

  cards.forEach((card) => {
    const bedId = card.dataset.bed;
    const setup = wardSetupById.get(bedId) || { risk: "empty" };
    applyStatusToCard(card, defaultCardStateForRisk(setup.risk));
  });

  Object.entries(bedProfiles).forEach(([bedId, bed]) => {
    const setup = wardSetupById.get(bedId) || { risk: "empty" };
    const nextRisk = setup.risk || "empty";
    bed.risk = nextRisk;
    if (nextRisk === "empty") {
      bed.name = "";
      bed.nric = "";
      bed.ageGender = "";
      bed.eventType = "";
      bed.eventAgo = "";
      bed.action = "";
      bed.diagnosis = "";
      bed.mobility = "";
      bed.fallHistory = "";
      bed.allergies = "";
      bed.assessment = {
        historyOfFalling: "",
        secondaryDiagnosis: "",
        ambulatoryAid: "",
        ivTherapy: ""
      };
      if (!String(bed.eventTime || "").startsWith("Last used:")) {
        bed.eventTime = "Last used: --";
      }
    }
  });
}

function clearBedProfiles() {
  Object.keys(bedProfiles).forEach((bedId) => {
    delete bedProfiles[bedId];
  });
}

function buildWardSetupFromRecords(recordByBedId) {
  return BED_IDS.map((bedId) => {
    const record = recordByBedId.get(bedId);
    const fallbackRisk = wardSetupById.get(bedId)?.risk || "empty";
    const risk = normalizeRisk(record?.risk || record?.riskCategory || fallbackRisk);
    return { bedId, risk };
  });
}

function hydrateBedProfilesFromRecords(recordByBedId) {
  clearBedProfiles();

  BED_IDS.forEach((bedId) => {
    const record = recordByBedId.get(bedId) || {};
    const setup = wardSetupById.get(bedId) || { risk: "empty" };
    const fallback = buildGeneratedBedProfile(bedId, setup.risk);
    const risk = setup.risk;
    const nricRaw = nricValue(record.nric);

    bedProfiles[bedId] = {
      ...fallback,
      bed: bedId,
      risk,
      name: record.patientName || fallback.name,
      nric: nricRaw ? `NRIC: ${nricRaw}` : "",
      ageGender: record.ageGender || fallback.ageGender,
      photo: record.photo || fallback.photo || fallbackPhotoForRisk(risk),
      eventType: record.eventType || fallback.eventType,
      eventTime: record.eventTime || record.lastUsedTime || fallback.eventTime,
      eventAgo: record.eventAgo || fallback.eventAgo,
      assessment: {
        ...fallback.assessment,
        ...(record.assessment || {})
      },
      diagnosis: record.diagnosis || fallback.diagnosis,
      mobility: record.mobility || fallback.mobility,
      fallHistory: record.fallHistory || fallback.fallHistory,
      allergies: record.allergies || fallback.allergies,
      action: record.action || fallback.action
    };
  });
}

function initFirestore() {
  const config = window.EDMAT_FIREBASE_CONFIG;
  if (!window.firebase || !config || !config.apiKey || config.apiKey === "YOUR_API_KEY") {
    return;
  }

  if (!window.firebase.apps.length) {
    window.firebase.initializeApp(config);
  }

  firestoreState.db = window.firebase.firestore();
  firestoreState.enabled = true;
}

function subscribeBedStatuses() {
  if (!firestoreState.enabled) return;

  firestoreState.db.collection("bed_status").onSnapshot((snapshot) => {
    let shouldPlayTone = false;

    snapshot.docChanges().forEach((change) => {
      const bedId = change.doc.id;
      const state = change.doc.data();
      const risk = wardSetupById.get(bedId)?.risk || state?.risk || "empty";
      const nextState = normalizedStatusForRisk(risk, state || {});
      const card = cards.find((item) => item.dataset.bed === bedId);
      applyStatusToCard(card, nextState);

      const suppressUntil = toneSuppressedUntilByBedId.get(bedId) || 0;
      if (Date.now() < suppressUntil) {
        return;
      }
      if (suppressUntil) toneSuppressedUntilByBedId.delete(bedId);

      if (hasReceivedInitialStatusSnapshot && (change.type === "added" || change.type === "modified")) {
        shouldPlayTone = true;
      }
    });

    if (shouldPlayTone) {
      playStatusUpdateTone();
    }

    hasReceivedInitialStatusSnapshot = true;
  });
}

async function seedBedStatusIfEmpty() {
  if (!firestoreState.enabled) return;

  const statusCol = firestoreState.db.collection("bed_status");
  const statusSnap = await statusCol.limit(1).get();
  if (!statusSnap.empty) return;

  const batch = firestoreState.db.batch();
  cards.forEach((card) => {
    const bedId = card.dataset.bed;
    if (!bedId) return;
    batch.set(statusCol.doc(bedId), {
      ...readCardStatus(card),
      updatedAt: window.firebase.firestore.FieldValue.serverTimestamp()
    });
  });
  await batch.commit();
}

async function seedMissingBedStatuses() {
  if (!firestoreState.enabled) return;

  const statusCol = firestoreState.db.collection("bed_status");
  const statusSnap = await statusCol.get();
  const existingBedIds = new Set(statusSnap.docs.map((doc) => doc.id));
  const missingBedIds = BED_IDS.filter((bedId) => !existingBedIds.has(bedId));
  if (!missingBedIds.length) return;

  const batch = firestoreState.db.batch();
  missingBedIds.forEach((bedId) => {
    const card = cards.find((item) => item.dataset.bed === bedId);
    if (!card) return;
    batch.set(statusCol.doc(bedId), {
      ...readCardStatus(card),
      updatedAt: window.firebase.firestore.FieldValue.serverTimestamp()
    });
  });
  await batch.commit();
}

async function syncBedStatusesToWardRisk() {
  if (!firestoreState.enabled) return;

  const statusCol = firestoreState.db.collection("bed_status");
  const statusSnap = await statusCol.get();
  const statusByBedId = new Map(statusSnap.docs.map((doc) => [doc.id, doc.data()]));
  const batch = firestoreState.db.batch();

  BED_IDS.forEach((bedId) => {
    const risk = wardSetupById.get(bedId)?.risk || "empty";
    const existingState = statusByBedId.get(bedId) || {};
    batch.set(
      statusCol.doc(bedId),
      {
        ...normalizedStatusForRisk(risk, existingState),
        updatedAt: window.firebase.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    );
  });

  await batch.commit();
}

async function seedPatientRecordsIfEmpty() {
  if (!firestoreState.enabled) return;

  const recordsCol = firestoreState.db.collection("patient_records");
  const recordsSnap = await recordsCol.limit(1).get();
  if (!recordsSnap.empty) return;

  const batch = firestoreState.db.batch();
  Object.entries(bedProfiles).forEach(([bedId, bed]) => {
    batch.set(recordsCol.doc(bedId), {
      ...buildPatientRecord(bedId, bed),
      createdAt: window.firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: window.firebase.firestore.FieldValue.serverTimestamp()
    });
  });
  await batch.commit();
}

async function seedMissingPatientRecords(recordByBedId) {
  if (!firestoreState.enabled) return;

  const missingBedIds = BED_IDS.filter((bedId) => !recordByBedId.has(bedId));
  if (!missingBedIds.length) return;

  const recordsCol = firestoreState.db.collection("patient_records");
  const batch = firestoreState.db.batch();
  missingBedIds.forEach((bedId) => {
    const bed = bedProfiles[bedId];
    if (!bed) return;
    batch.set(
      recordsCol.doc(bedId),
      {
        ...buildPatientRecord(bedId, bed),
        createdAt: window.firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: window.firebase.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    );
  });
  await batch.commit();
}

async function bootstrapWardFromFirestore() {
  if (!firestoreState.enabled) return;

  const recordsCol = firestoreState.db.collection("patient_records");
  const recordsExistence = await recordsCol.limit(1).get();

  if (recordsExistence.empty) {
    renderCurrentWardSetup();
    await seedPatientRecordsIfEmpty();
    await seedBedStatusIfEmpty();
    return;
  }

  const recordsSnap = await recordsCol.get();
  const recordByBedId = new Map(recordsSnap.docs.map((doc) => [doc.id, doc.data()]));

  setWardSetup(buildWardSetupFromRecords(recordByBedId));
  hydrateBedProfilesFromRecords(recordByBedId);
  renderCurrentWardSetup();

  await seedMissingPatientRecords(recordByBedId);
  await seedMissingBedStatuses();
  await syncBedStatusesToWardRisk();
  await seedBedStatusIfEmpty();
}

function saveCardStatusToFirestore(bedId, state) {
  if (!firestoreState.enabled) return;
  const risk = wardSetupById.get(bedId)?.risk || "empty";

  firestoreState.db.collection("bed_status").doc(bedId).set(
    {
      ...normalizedStatusForRisk(risk, state),
      updatedAt: window.firebase.firestore.FieldValue.serverTimestamp()
    },
    { merge: true }
  );
}

function updateSelectedCard(activeBed) {
  cards.forEach((card) => {
    const isSelected = card.dataset.bed === activeBed;
    card.classList.toggle("is-selected", isSelected);
    card.setAttribute("aria-pressed", isSelected ? "true" : "false");
  });
}

function updateRiskTheme(level) {
  ui.patientRiskFlag.className = `risk-flag ${level}`;
  ui.patientRiskFlag.textContent = riskMap[level];
  ui.actionBanner.className = `action-banner ${level}`;
}

function renderBed(bedId) {
  const bed = bedProfiles[bedId];
  if (!bed) return;

  ui.patientPhoto.src = bed.photo;
  ui.patientPhoto.alt = `${bed.name} portrait`;
  ui.patientName.textContent = bed.name || "";
  ui.patientNric.textContent = bed.nric || "";
  ui.patientAgeGender.textContent = bed.ageGender || "";
  ui.patientBed.textContent = bed.bed;

  ui.eventType.textContent = bed.eventType || "";
  ui.eventTime.textContent = bed.eventTime || "";
  ui.eventAgo.textContent = bed.eventAgo || "";

  ui.riskLevelText.textContent = riskMap[bed.risk];
  ui.riskHistory.textContent = bed.assessment.historyOfFalling || "";
  ui.riskSecondary.textContent = bed.assessment.secondaryDiagnosis || "";
  ui.riskAmbulatory.textContent = bed.assessment.ambulatoryAid || "";
  ui.riskIv.textContent = bed.assessment.ivTherapy || "";

  ui.infoDiagnosis.textContent = bed.diagnosis || "";
  ui.infoMobility.textContent = bed.mobility || "";
  ui.infoFallHistory.textContent = bed.fallHistory || "";
  ui.infoAllergies.textContent = bed.allergies || "";
  ui.actionBanner.textContent = bed.action || "";

  updateRiskTheme(bed.risk);
  updateSelectedCard(bedId);
}

function setSelectedBedAllClear() {
  const selectedCard = cards.find((card) => card.classList.contains("is-selected"));
  if (!selectedCard) return;

  if (selectedCard.classList.contains("empty")) return;
  const selectedBedId = selectedCard.dataset.bed;
  const selectedRisk = wardSetupById.get(selectedBedId)?.risk || "empty";

  const nextStatus = {
    cardType: "normal",
    count: "",
    statusText: "All Clear",
    requestActive: false
  };
  applyStatusToCard(selectedCard, nextStatus);

  const bedId = selectedCard.dataset.bed;
  const bed = bedProfiles[bedId];
  if (bed) {
    bed.eventType = "Request Completed";
    bed.eventTime = "Resolved just now";
    bed.eventAgo = "";
    bed.action = "All Clear";
  }

  ui.actionBanner.textContent = "All Clear";
  ui.actionBanner.className = "action-banner low";
  if (bedId) {
    toneSuppressedUntilByBedId.set(bedId, Date.now() + APPROVE_TONE_SUPPRESS_MS);
  }
  saveCardStatusToFirestore(bedId, nextStatus);

  if (hardwareSocket) {
    hardwareSocket.emit("serial-write", { message: "MOTOR_APPROVE" });
    const riskCommand = selectedRisk === "low" ? "APPROVE_LOW" : "APPROVE_ELEVATED";
    hardwareSocket.emit("serial-write", { message: riskCommand });
  }
}

function randomBedStatus() {
  if (!patientBedIds.length) return;

  const offBedIds = patientBedIds.filter((bedId) => {
    const card = cards.find((item) => item.dataset.bed === bedId);
    return card && !card.classList.contains("is-on");
  });

  const targetPool = offBedIds.length ? offBedIds : patientBedIds;
  const randomBedId = targetPool[Math.floor(Math.random() * targetPool.length)];
  activateBedById(randomBedId);
}

function activateBedById(bedId) {
  const targetCard = cards.find((card) => card.dataset.bed === bedId);
  if (!targetCard) return;

  const risk = wardSetupById.get(bedId)?.risk || "empty";
  const nextStatus = {
    ...defaultCardStateForRisk(risk),
    isOn: true
  };
  applyStatusToCard(targetCard, nextStatus);
  saveCardStatusToFirestore(bedId, nextStatus);

  cards.forEach((card) => card.classList.remove("is-lit"));
  if (litBedClearTimer) {
    clearTimeout(litBedClearTimer);
    litBedClearTimer = null;
  }

  targetCard.classList.add("is-lit");
  litBedClearTimer = setTimeout(() => {
    targetCard.classList.remove("is-lit");
  }, 1400);

  renderBed(bedId);
}

function deactivateBedById(bedId) {
  const targetCard = cards.find((card) => card.dataset.bed === bedId);
  if (!targetCard) return;

  const risk = wardSetupById.get(bedId)?.risk || "empty";
  const nextStatus = {
    ...defaultCardStateForRisk(risk),
    isOn: false
  };
  applyStatusToCard(targetCard, nextStatus);
  saveCardStatusToFirestore(bedId, nextStatus);
}

function triggerRandomFromD2() {
  const now = Date.now();
  if (now - lastD2UiTriggerAt < D2_UI_TRIGGER_DEBOUNCE_MS) return;
  lastD2UiTriggerAt = now;
  const targetBedId = D2_TARGET_BEDS[nextD2TargetIndex];
  const otherBedId = D2_TARGET_BEDS[(nextD2TargetIndex + 1) % D2_TARGET_BEDS.length];
  nextD2TargetIndex = (nextD2TargetIndex + 1) % D2_TARGET_BEDS.length;
  deactivateBedById(otherBedId);
  activateBedById(targetBedId);
}

function renderCurrentWardSetup() {
  applyDefaultWardSetup();
  const defaultBed =
    cards.find((card) => card.classList.contains("is-selected"))?.dataset.bed ||
    patientBedIds[0] ||
    "Bed 1";
  renderBed(defaultBed);
}

cards.forEach((card) => {
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.addEventListener("click", () => renderBed(card.dataset.bed));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      renderBed(card.dataset.bed);
    }
  });
});

initFirestore();
if (AUTO_SYNC_FIRESTORE && firestoreState.enabled) {
  bootstrapWardFromFirestore().catch((error) => {
    console.error("Failed to bootstrap ward from Firestore:", error);
    renderCurrentWardSetup();
  }).finally(() => {
    subscribeBedStatuses();
  });
} else {
  renderCurrentWardSetup();
  if (firestoreState.enabled) {
    subscribeBedStatuses();
  }
}

if (ui.approveRailsBtn) {
  ui.approveRailsBtn.addEventListener("click", setSelectedBedAllClear);
}

if (ui.randomNotifyBtn) {
  ui.randomNotifyBtn.addEventListener("click", randomBedStatus);
}

function setD2Pill(state, text) {
  if (!ui.d2DebugPill) return;
  ui.d2DebugPill.classList.remove("active", "ok", "error");
  if (state) ui.d2DebugPill.classList.add(state);
  ui.d2DebugPill.textContent = text;
}

function setMotorPill(state, text) {
  if (!ui.motorDebugPill) return;
  ui.motorDebugPill.classList.remove("active", "ok", "error");
  if (state) ui.motorDebugPill.classList.add(state);
  ui.motorDebugPill.textContent = text;
}

function setLedPill(state, text) {
  if (!ui.ledDebugPill) return;
  ui.ledDebugPill.classList.remove("active", "ok", "error");
  if (state) ui.ledDebugPill.classList.add(state);
  ui.ledDebugPill.textContent = text;
}

function markD2Received() {
  const stamp = new Date().toLocaleTimeString();
  setD2Pill("active", `D2: ${stamp}`);
  if (d2PillResetTimer) clearTimeout(d2PillResetTimer);
  d2PillResetTimer = setTimeout(() => setD2Pill("ok", "D2: Listening"), 1500);
}

if (hardwareSocket) {
  setD2Pill("ok", "D2: Connecting");
  setMotorPill("ok", "Motor: Listening");
  setLedPill("ok", "LED: Listening");
  hardwareSocket.emit("auto-connect-serial", { baudRate: 9600 });

  hardwareSocket.on("hardware-trigger", (payload) => {
    if (payload?.source === "D2") {
      markD2Received();
      triggerRandomFromD2();
    }
  });

  hardwareSocket.on("serial-data", (payload) => {
    const raw = String(payload?.raw || "").toUpperCase();
    const parsed = payload?.parsed || {};
    const parsedD2 = String(parsed.D2 || parsed.d2 || "").toUpperCase();
    const parsedMotor = String(parsed.motor || parsed.MOTOR || "").toUpperCase();
    const parsedApproveLed = String(parsed.approve_led || parsed.APPROVE_LED || "").toUpperCase();
    if (raw === "D2=PRESSED" || parsedD2 === "PRESSED" || parsedD2 === "1") {
      markD2Received();
    }

    if (parsedMotor === "ACTIVE") {
      setMotorPill("active", "Motor: Active");
    } else if (parsedMotor === "WAIT") {
      setMotorPill("ok", "Motor: Waiting 5s");
    } else if (parsedMotor === "RETURN") {
      setMotorPill("active", "Motor: Returning");
    } else if (parsedMotor === "HOME") {
      setMotorPill("ok", "Motor: Home");
    }

    if (parsedApproveLed === "LOW") {
      setLedPill("ok", "LED: D11 LOW");
    } else if (parsedApproveLed === "ELEVATED") {
      setLedPill("active", "LED: D12 MID/HIGH");
    }
  });

  hardwareSocket.on("serial-message", (payload) => {
    if (payload?.message) {
      console.info(payload.message);

      if (String(payload.message).toLowerCase().includes("connected")) {
        setD2Pill("ok", "D2: Listening");
        setMotorPill("ok", "Motor: Listening");
        setLedPill("ok", "LED: Listening");
      }
    }
  });

  hardwareSocket.on("serial-error", (payload) => {
    if (payload?.message) {
      console.error("Serial error:", payload.message);
      setD2Pill("error", "D2: Serial Error");
      setMotorPill("error", "Motor: Serial Error");
      setLedPill("error", "LED: Serial Error");
    }
  });
} else {
  setD2Pill("error", "D2: Socket Off");
  setMotorPill("error", "Motor: Socket Off");
  setLedPill("error", "LED: Socket Off");
}

const themeToggle = document.getElementById("themeToggle");
const THEME_KEY = "misi-theme";

function applyTheme(theme) {
  const dark = theme === "dark";
  document.body.classList.toggle("dark-mode", dark);
  if (themeToggle) {
    themeToggle.textContent = dark ? "Light Mode" : "Dark Mode";
    themeToggle.setAttribute("aria-pressed", dark ? "true" : "false");
  }
}

const savedTheme = localStorage.getItem(THEME_KEY) || "light";
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
    localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
  });
}
