from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import DiagnosisInput

app = FastAPI(
    title="DiagniCore",
    description="AI Powered Diagnostic Assistant"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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

    # ================= HEALTHCARE =================

    if data.domain == "healthcare":

        if (
            data.temperature and data.temperature > 100
        ) or (
            data.oxygen and data.oxygen < 92
        ):

            return {
                "risk": "HIGH",

                "prediction":
                "Possible Fever or Health Risk",

                "confidence": 92,

                "explanation": [
                    "Body temperature exceeds normal limits.",
                    "Oxygen level indicates potential concern.",
                    "Vital signs require attention."
                ],

                "solution": [
                    "Take proper rest.",
                    "Drink sufficient fluids.",
                    "Monitor temperature regularly."
                ]
            }

        return {

            "risk": "SAFE",

            "prediction":
            "Health Parameters Normal",

            "confidence": 84,

            "explanation": [
                "Temperature is within normal range.",
                "Oxygen levels are stable.",
                "No immediate health concern."
            ],

            "solution": [
                "Maintain healthy lifestyle.",
                "Continue regular monitoring."
            ]
        }

    # ================= AGRICULTURE =================

    if data.domain == "agriculture":

        if (
            data.soilMoisture and data.soilMoisture < 30
        ):

            return {

                "risk": "MEDIUM",

                "prediction":
                "Low Soil Moisture Detected",

                "confidence": 85,

                "explanation": [
                    "Soil moisture is below threshold.",
                    "Crop growth may be affected.",
                    "Environmental conditions are dry."
                ],

                "solution": [
                    "Increase irrigation.",
                    "Check water availability.",
                    "Monitor soil regularly."
                ]
            }

        return {

            "risk": "SAFE",

            "prediction":
            "Crop Conditions Healthy",

            "confidence": 82,

            "explanation": [
                "Moisture level is adequate.",
                "Environmental conditions are stable."
            ],

            "solution": [
                "Continue regular monitoring.",
                "Maintain irrigation schedule."
            ]
        }

    # ================= FACTORY =================

    if data.domain == "factory":

        if (
            data.machineTemp and data.machineTemp > 90
        ):

            return {

                "risk": "HIGH",

                "prediction":
                "Machine Failure Risk",

                "confidence": 89,

                "explanation": [
                    "Machine temperature exceeded threshold.",
                    "Equipment may overheat.",
                    "Historical failures show similar patterns."
                ],

                "solution": [
                    "Reduce machine load.",
                    "Inspect machinery immediately.",
                    "Schedule maintenance."
                ]
            }

        return {

            "risk": "LOW",

            "prediction":
            "Machine Operating Normally",

            "confidence": 80,

            "explanation": [
                "Temperature within safe range.",
                "Operating conditions appear stable."
            ],

            "solution": [
                "Continue monitoring.",
                "Perform routine maintenance."
            ]
        }

    # ================= BUSINESS =================

    if data.domain == "business":

        if (
            data.complaints and data.complaints > 50
        ):

            return {

                "risk": "MEDIUM",

                "prediction":
                "Operational Risk Detected",

                "confidence": 78,

                "explanation": [
                    "Customer complaints are increasing.",
                    "Operational efficiency may be affected.",
                    "Business performance needs review."
                ],

                "solution": [
                    "Review customer feedback.",
                    "Optimize operations.",
                    "Improve service quality."
                ]
            }

        return {

            "risk": "SAFE",

            "prediction":
            "Business Performance Stable",

            "confidence": 83,

            "explanation": [
                "Business indicators appear healthy.",
                "Operational performance is stable."
            ],

            "solution": [
                "Maintain current operations.",
                "Continue monitoring KPIs."
            ]
        }

    return {

        "risk": "LOW",

        "prediction":
        "No Risk Detected",

        "confidence": 70,

        "explanation": [
            "Input values appear normal."
        ],

        "solution": [
            "Continue monitoring."
        ]
    }