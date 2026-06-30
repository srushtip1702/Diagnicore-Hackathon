import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Diagnosis.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

function Diagnosis() {

  const navigate = useNavigate();
  const { domain } = useParams();

  const fieldConfig = {
    healthcare: [
      { name: "name", label: "Patient Name" },
      { name: "age", label: "Age (Years)" },
      { name: "weight", label: "Weight (kg)" },
      { name: "medicalHistory", label: "Medical History" },
      { name: "temperature", label: "Body Temperature (°C)" },
      { name: "heartRate", label: "Heart Rate (BPM)" },
      { name: "oxygen", label: "Oxygen Level (%)" },
      { name: "bloodPressure", label: "Blood Pressure (mmHg)" }
    ],

    agriculture: [
      { name: "name", label: "Farmer Name" },
      { name: "crop", label: "Crop Type" },
      { name: "season", label: "Current Season" },
      { name: "waterAvailability", label: "Water Availability (%)" },
      { name: "temperature", label: "Temperature (°C)" },
      { name: "moisture", label: "Soil Moisture (%)" },
      { name: "ph", label: "Soil pH" },
      { name: "cropHealth", label: "Crop Health Score (0-100)" }
    ],

    factory: [
      { name: "machineId", label: "Machine ID" },
      { name: "previousFailure", label: "Previous Failure" },
      { name: "temperature", label: "Machine Temperature (°C)" },
      { name: "vibration", label: "Vibration Level" },
      { name: "pressure", label: "Pressure (PSI)" },
      { name: "efficiency", label: "Efficiency (%)" }
    ],

    business: [
      { name: "companyName", label: "Company Name" },
      { name: "industry", label: "Industry Type" },
      { name: "revenue", label: "Revenue (₹)" },
      { name: "profit", label: "Profit (%)" },
      { name: "customers", label: "Customer Growth (%)" },
      { name: "expenses", label: "Expenses (₹)" }
    ]
  };

  const guidance = {
    temperature: "Normal: 36–37°C",
    heartRate: "Normal: 60–100 BPM",
    oxygen: "Normal: 95–100%",
    bloodPressure: "Normal: Around 120/80 mmHg",

    moisture: "Ideal: 40–70%",
    ph: "Ideal: 6–7.5",
    cropHealth: "Healthy range: 70–100",
    waterAvailability: "Recommended: Above 60%",

    vibration: "High vibration may indicate wear.",
    pressure: "Check machine operating limits.",
    efficiency: "Healthy: Above 80%",

    revenue: "Monthly revenue amount.",
    profit: "Healthy: Above 15%",
    customers: "Customer growth percentage.",
    expenses: "Monthly operating expenses.",

    age: "Enter age in years.",
    weight: "Enter weight in kilograms."
  };

  const fields = fieldConfig[domain] || [];

  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const riskColors = {
    HIGH: "#ff4d4d",
    MEDIUM: "#ff9800",
    LOW: "#ffd54f",
    SAFE: "#4caf50"
  };

  const textFields = [
    "name",
    "medicalHistory",
    "crop",
    "season",
    "machineId",
    "previousFailure",
    "companyName",
    "industry"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: textFields.includes(name)
        ? value
        : Number(value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post("/predict", {
        domain,
        ...formData
      });

      const previousRecords =
        JSON.parse(localStorage.getItem("records")) || [];

      const similarCases =
        previousRecords.filter(
          (record) =>
            record.domain === domain
        ).length;

      const previousRisk =
        similarCases > 0
          ? previousRecords[
              previousRecords.length - 1
            ].result.risk
          : "None";

      response.data.historical = {
        similarCases,
        previousRisk,
        trend:
          similarCases >= 3
            ? "Recurring Pattern"
            : "Stable"
      };

      setResult(response.data);

      previousRecords.push({
        domain,
        user: formData,
        result: response.data,
        date: new Date().toLocaleString()
      });

      localStorage.setItem(
        "records",
        JSON.stringify(previousRecords)
      );

    } catch (error) {
      console.log(error);
      alert("Backend connection error.");
    }

    setLoading(false);
  };
const downloadPDF = () => {

  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("DiagniCore Diagnosis Report", 20, 20);

  doc.setFontSize(12);

  doc.text(
    `Domain: ${domain.toUpperCase()}`,
    20,
    40
  );

  doc.text(
    `Date: ${new Date().toLocaleString()}`,
    20,
    50
  );

  let y = 70;

  doc.text("User Information:", 20, y);

  y += 10;

  Object.entries(formData).forEach(
    ([key, value]) => {

      doc.text(
        `${key}: ${value}`,
        20,
        y
      );

      y += 10;
    }
  );

  y += 10;

  doc.text(
    `Risk: ${result.risk}`,
    20,
    y
  );

  y += 10;

  doc.text(
    `Prediction: ${result.prediction}`,
    20,
    y
  );

  y += 10;

  doc.text(
    `Confidence: ${result.confidence}%`,
    20,
    y
  );

  y += 20;

  doc.text(
    "AI Analysis:",
    20,
    y
  );

  y += 10;

  result.explanation.forEach(
    (item) => {

      doc.text(
        `• ${item}`,
        25,
        y
      );

      y += 10;
    }
  );

  y += 10;

  doc.text(
    "Recommendations:",
    20,
    y
  );

  y += 10;

  result.solution.forEach(
    (item) => {

      doc.text(
        `• ${item}`,
        25,
        y
      );

      y += 10;
    }
  );

  y += 20;

  doc.setTextColor(
    255,
    0,
    0
  );

  doc.text(
    "AI-generated temporary guidance.",
    20,
    y
  );

  doc.save(
    "DiagniCore_Report.pdf"
  );
};
 return (
  <div className="diagnosis">

    <div className="input-card">

      <button
        type="button"
        className="back-btn"
        onClick={() => navigate("/dashboard")}
      >
        ← Dashboard
      </button>

      <h1>
        {domain.toUpperCase()} ANALYSIS
      </h1>

        <form onSubmit={handleSubmit}>

          {fields.map((field) => (

            <div
              className="input-group"
              key={field.name}
            >

              <label>
                {field.label}
              </label>

              {guidance[field.name] && (
                <div className="input-guide">
                  ℹ {guidance[field.name]}
                </div>
              )}

              <input
                type={
                  textFields.includes(field.name)
                    ? "text"
                    : "number"
                }
                name={field.name}
                placeholder={field.label}
                onChange={handleChange}
                required
              />

            </div>

          ))}

          <button type="submit">

            {loading
              ? "Analyzing..."
              : "Analyze AI"}

          </button>

        </form>

      </div>

      {result && (

        <div className="result-card">

          <div
            className="risk"
            style={{
              background:
                riskColors[result.risk]
            }}
          >
            {result.risk}
          </div>

          <h2>
            {result.prediction}
          </h2>

          <h3>
            Confidence Score
          </h3>

          <p>
            {result.confidence}%
          </p>

          <h3>
            Historical Analysis
          </h3>

          <div className="history-analysis">

            <p>
              <strong>
                Previous Similar Cases:
              </strong>{" "}
              {result.historical?.similarCases}
            </p>

            <p>
              <strong>
                Previous Risk:
              </strong>{" "}
              {result.historical?.previousRisk}
            </p>

            <p>
              <strong>
                Risk Trend:
              </strong>{" "}
              {result.historical?.trend}
            </p>

          </div>

          <h3>
            AI Analysis
          </h3>

          <ul>
            {result.explanation?.map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}
          </ul>

          <h3>
            Temporary Recommendation
          </h3>

          <ul>
            {result.solution?.map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}
          </ul>

          <div className="warning">

  ⚠ AI-generated temporary guidance.

  <br /><br />

  These recommendations are temporary and generated by DiagniCore AI.

  Please consult the relevant professional or authority as early as possible.

</div>

<button
  type="button"
  className="pdf-btn"
  onClick={downloadPDF}
>
  📄 Download PDF Report
</button>

        </div>

      )}

    </div>
  );
}

export default Diagnosis;