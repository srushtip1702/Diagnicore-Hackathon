import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./History.css";

function History() {

  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("records")) || [];

    setRecords(saved.reverse());
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("records");
    setRecords([]);
    setSelectedDomain(null);
  };

  const riskColors = {
    HIGH: "#ff4d4d",
    MEDIUM: "#ff9800",
    LOW: "#ffd54f",
    SAFE: "#4caf50"
  };

  const stats = {
    healthcare: records.filter(
      r => r.domain === "healthcare"
    ).length,

    agriculture: records.filter(
      r => r.domain === "agriculture"
    ).length,

    factory: records.filter(
      r => r.domain === "factory"
    ).length,

    business: records.filter(
      r => r.domain === "business"
    ).length
  };

  const filteredRecords =
    selectedDomain
      ? records.filter(
          r => r.domain === selectedDomain
        )
      : [];

  return (

    <div className="history-page">

      <div className="history-actions">

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Dashboard
        </button>

        <button
          className="clear-btn"
          onClick={clearHistory}
        >
          🗑 Clear History
        </button>

      </div>

      <h1>
        Previous Analysis Records
      </h1>

      <div className="stats-container">

        <div
          className="stat-card"
          onClick={() =>
            setSelectedDomain("healthcare")
          }
        >
          ❤️ Healthcare
          <h2>{stats.healthcare}</h2>
        </div>

        <div
          className="stat-card"
          onClick={() =>
            setSelectedDomain("agriculture")
          }
        >
          🌱 Agriculture
          <h2>{stats.agriculture}</h2>
        </div>

        <div
          className="stat-card"
          onClick={() =>
            setSelectedDomain("factory")
          }
        >
          🏭 Factory
          <h2>{stats.factory}</h2>
        </div>

        <div
          className="stat-card"
          onClick={() =>
            setSelectedDomain("business")
          }
        >
          📈 Business
          <h2>{stats.business}</h2>
        </div>

      </div>

      {selectedDomain && (

        <>
          <h2 className="domain-heading">
            {selectedDomain.toUpperCase()}
            {" "}HISTORY
          </h2>

          {filteredRecords.map(
            (record, index) => (

              <div
                className="history-card"
                key={index}
              >

                <div
                  className="history-risk"
                  style={{
                    background:
                      riskColors[
                        record.result.risk
                      ]
                  }}
                >
                  {record.result.risk}
                </div>

                <p>
                  <strong>Date:</strong>
                  {" "}
                  {record.date}
                </p>

                {Object.entries(
                  record.user
                ).map(([key, value]) => (

                  <p key={key}>
                    <strong>
                      {key}:
                    </strong>
                    {" "}
                    {String(value)}
                  </p>

                ))}

                <p>
                  <strong>
                    Prediction:
                  </strong>
                  {" "}
                  {record.result.prediction}
                </p>

                <p>
                  <strong>
                    Confidence:
                  </strong>
                  {" "}
                  {record.result.confidence}%
                </p>

              </div>

            )
          )}

        </>

      )}

    </div>

  );
}

export default History;