import "./HistoryCard.css";

function HistoryCard({ record }) {

  return (
    <div className="history-card">

      <h3>
        {record.prediction}
      </h3>

      <p>
        Risk: {record.risk}
      </p>

      <p>
        Confidence: {record.confidence}%
      </p>

    </div>
  );
}

export default HistoryCard;