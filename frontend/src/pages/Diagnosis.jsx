import "./Diagnosis.css";

import { useParams } from "react-router-dom";
import { useState } from "react";

import API from "../services/api";

export default function Diagnosis() {

    const { domain } = useParams();

    const [formData, setFormData] = useState({});

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const analyze = async () => {

        const response = await API.post(
            "/predict",
            {
                domain,
                ...formData
            }
        );

        setResult(response.data);
    };

    const getFields = () => {

        switch(domain){

            case "healthcare":
                return [
                    "age",
                    "temperature",
                    "heartRate",
                    "oxygen"
                ];

            case "agriculture":
                return [
                    "soilMoisture",
                    "humidity",
                    "temperature",
                    "cropHealth"
                ];

            case "factory":
                return [
                    "machineTemp",
                    "vibration",
                    "runtime",
                    "load"
                ];

            case "business":
                return [
                    "revenue",
                    "complaints",
                    "operationalCost",
                    "performance"
                ];

            default:
                return [];
        }
    };

    const riskColor = {
        HIGH:"#ef4444",
        MEDIUM:"#f97316",
        LOW:"#eab308",
        SAFE:"#22c55e"
    };

    return (

        <div className="diagnosis">

            <h1>
                {domain.toUpperCase()}
            </h1>

            <div className="input-card">

                {getFields().map((field) => (

                    <input
                        key={field}
                        type="number"
                        placeholder={field}
                        name={field}
                        onChange={handleChange}
                    />

                ))}

                <button onClick={analyze}>
                    Analyze AI
                </button>

            </div>

            {result && (

                <div className="result-card">

                    <div
                        className="risk"
                        style={{
                            background:
                            riskColor[result.risk]
                        }}
                    >
                        {result.risk} RISK
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
                        Why was this detected?
                    </h3>

                    <ul>
                        {result.explanation.map(
                            (item,index)=>(
                                <li key={index}>
                                    {item}
                                </li>
                            )
                        )}
                    </ul>

                    <h3>
                        Temporary Recommendations
                    </h3>

                    <ul>
                        {result.solution.map(
                            (item,index)=>(
                                <li key={index}>
                                    {item}
                                </li>
                            )
                        )}
                    </ul>

                    <div className="warning">

                        ⚠ AI GENERATED CAUTION

                        <br/><br/>

                        The recommendations provided above are AI-generated temporary suggestions.

                        Please take the required action as early as possible and consult the appropriate professional or domain expert.

                    </div>

                </div>

            )}

        </div>
    );
}