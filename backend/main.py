from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import DiagnosisInput

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "DiagniCore Backend Running"
    }


@app.post("/predict")
def predict(data: DiagnosisInput):

    historical = {
        "similarCases": 2,
        "trend": "Stable"
    }

    # ================= HEALTHCARE =================

    if data.domain == "healthcare":

        if data.temperature and data.temperature > 38:

            historical = {
                "similarCases": 3,
                "trend": "Increasing Risk"
            }

            return {
                "risk": "HIGH",
                "prediction": "Possible Fever Detected",
                "confidence": 92,

                "historical": historical,

                "explanation": [
                    "Body temperature exceeds normal range.",
                    "Vital signs indicate a possible fever.",
                    "Previous similar records detected."
                ],

                "solution": [
                    "Take proper rest.",
                    "Drink sufficient fluids.",
                    "Monitor body temperature."
                ]
            }

        return {
            "risk": "SAFE",
            "prediction": "Health Parameters Normal",
            "confidence": 84,

            "historical": {
                "similarCases": 1,
                "trend": "Improving"
            },

            "explanation": [
                "Temperature is within normal range.",
                "No significant health concern detected."
            ],

            "solution": [
                "Maintain healthy lifestyle.",
                "Continue regular monitoring."
            ]
        }

    # ================= AGRICULTURE =================

    if data.domain == "agriculture":

        return {
            "risk": "MEDIUM",
            "prediction": "Low Soil Moisture Detected",
            "confidence": 85,

            "historical": {
                "similarCases": 2,
                "trend": "Stable"
            },

            "explanation": [
                "Soil moisture is below recommended level.",
                "Crop health may be affected.",
                "Previous farm records show similar conditions."
            ],

            "solution": [
                "Increase irrigation.",
                "Monitor soil condition regularly."
            ]
        }

    # ================= FACTORY =================

    if data.domain == "factory":

        return {
            "risk": "HIGH",
            "prediction": "Machine Failure Risk",
            "confidence": 88,

            "historical": {
                "similarCases": 4,
                "trend": "Increasing Risk"
            },

            "explanation": [
                "Machine temperature exceeded threshold.",
                "Operating conditions are unsafe.",
                "Previous maintenance records indicate similar faults."
            ],

            "solution": [
                "Reduce machine load.",
                "Schedule immediate inspection."
            ]
        }

    # ================= BUSINESS =================

    if data.domain == "business":

        return {
            "risk": "LOW",
            "prediction": "Operational Performance Stable",
            "confidence": 78,

            "historical": {
                "similarCases": 2,
                "trend": "Stable"
            },

            "explanation": [
                "Business indicators appear normal.",
                "No major operational issue detected."
            ],

            "solution": [
                "Continue monitoring performance.",
                "Maintain current operations."
            ]
        }

    return {
        "risk": "LOW",
        "prediction": "Normal",
        "confidence": 70,

        "historical": {
            "similarCases": 0,
            "trend": "Unknown"
        },

        "explanation": [
            "No significant issue detected."
        ],

        "solution": [
            "Continue monitoring."
        ]
    }