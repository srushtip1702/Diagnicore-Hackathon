import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

import {
  FaHeartbeat,
  FaLeaf,
  FaIndustry,
  FaChartLine,
  FaBrain,
  FaShieldAlt,
  FaWifi,
  FaHistory
} from "react-icons/fa";

export default function Dashboard() {

  const navigate = useNavigate();

  const domains = [
    {
      icon: <FaHeartbeat />,
      title: "Healthcare",
      desc: "Analyze patient health conditions and risks.",
      route: "healthcare",
      color: "#8b5cf6"
    },
    {
      icon: <FaLeaf />,
      title: "Agriculture",
      desc: "Monitor crops and detect agricultural issues.",
      route: "agriculture",
      color: "#06b6d4"
    },
    {
      icon: <FaIndustry />,
      title: "Manufacturing",
      desc: "Predict machine failures and maintenance needs.",
      route: "factory",
      color: "#6366f1"
    },
    {
      icon: <FaChartLine />,
      title: "Business",
      desc: "Analyze business risks and operations.",
      route: "business",
      color: "#c084fc"
    }
  ];

  return (
    <div className="dashboard">

      <div className="hero">

  <img
    src="/logo.png"
    alt="DiagniCore"
    className="logo"
  />

  <h1>DiagniCore</h1>

  <p>
    One AI Engine. Multiple Domains.
  </p>

  <button
    className="history-btn"
    onClick={() => navigate("/history")}
  >
    <FaHistory />
    View History
  </button>

</div>
      <div className="cards">

        {domains.map((item, index) => (

          <div
            className="card"
            key={index}
          >

            <div
              className="icon"
              style={{ color: item.color }}
            >
              {item.icon}
            </div>

            <h2>{item.title}</h2>

            <span>
              {item.desc}
            </span>

            <button
              onClick={() =>
                navigate(`/diagnosis/${item.route}`)
              }
            >
              Diagnose →
            </button>

          </div>

        ))}

      </div>

      <div className="features">

        <div className="feature-box">
          <FaBrain className="feature-icon" />
          <h3>AI Powered</h3>
          <p>
            Smart prediction engine for faster decisions.
          </p>
        </div>

        <div className="feature-box">
          <FaWifi className="feature-icon" />
          <h3>Offline First</h3>
          <p>
            Works even in low-connectivity environments.
          </p>
        </div>

        <div className="feature-box">
          <FaShieldAlt className="feature-icon" />
          <h3>Explainable AI</h3>
          <p>
            Provides confidence scores and explanations.
          </p>
        </div>

      </div>

    </div>
  );
}
