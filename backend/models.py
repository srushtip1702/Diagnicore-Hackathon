from pydantic import BaseModel
from typing import Optional


class DiagnosisInput(BaseModel):

    # Common
    domain: str

    # User Information

    name: Optional[str] = None
    age: Optional[int] = None

    # Healthcare
    weight: Optional[float] = None
    medicalHistory: Optional[str] = None

    temperature: Optional[float] = None
    heartRate: Optional[float] = None
    oxygen: Optional[float] = None
    bloodPressure: Optional[float] = None

    # Agriculture
    crop: Optional[str] = None
    season: Optional[str] = None
    waterAvailability: Optional[float] = None

    moisture: Optional[float] = None
    ph: Optional[float] = None
    cropHealth: Optional[float] = None

    # Manufacturing
    machineId: Optional[str] = None
    previousFailure: Optional[str] = None

    vibration: Optional[float] = None
    pressure: Optional[float] = None
    efficiency: Optional[float] = None

    # Business
    companyName: Optional[str] = None
    industry: Optional[str] = None

    revenue: Optional[float] = None
    profit: Optional[float] = None
    customers: Optional[float] = None
    expenses: Optional[float] = None