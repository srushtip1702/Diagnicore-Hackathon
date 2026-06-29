from pydantic import BaseModel
from typing import Optional

class DiagnosisInput(BaseModel):

    domain: str

    # Healthcare
    age: Optional[float] = None
    temperature: Optional[float] = None
    heartRate: Optional[float] = None
    oxygen: Optional[float] = None

    # Agriculture
    soilMoisture: Optional[float] = None
    humidity: Optional[float] = None
    cropHealth: Optional[float] = None

    # Manufacturing
    machineTemp: Optional[float] = None
    vibration: Optional[float] = None
    runtime: Optional[float] = None
    load: Optional[float] = None

    # Business
    revenue: Optional[float] = None
    complaints: Optional[float] = None
    operationalCost: Optional[float] = None
    performance: Optional[float] = None