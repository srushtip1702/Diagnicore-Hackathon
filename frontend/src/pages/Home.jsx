import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {

  const navigate = useNavigate();

  return (

    <div className="home">

      <div className="home-card">

        <img
          src="/logo.png"
          alt="DiagniCore"
          className="home-logo"
        />

        <h1>DiagniCore</h1>

        <p>
          One AI Engine. Multiple Domains.
        </p>

        <button
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Start Diagnosis
        </button>

      </div>

    </div>

  );
}

export default Home;