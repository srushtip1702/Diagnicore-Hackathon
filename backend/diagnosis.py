def analyze(domain, p1, p2):

    if domain.lower() == "healthcare":
        if p1 > 100:
            return {
                "risk": "High",
                "prediction": "Possible Fever",
                "confidence": 85
            }

    elif domain.lower() == "factory":
        if p1 > 90:
            return {
                "risk": "High",
                "prediction": "Machine Failure",
                "confidence": 88
            }

    elif domain.lower() == "agriculture":
        if p1 < 30:
            return {
                "risk": "Medium",
                "prediction": "Water Deficiency",
                "confidence": 80
            }

    return {
        "risk": "Low",
        "prediction": "Normal",
        "confidence": 45
    }