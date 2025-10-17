import "./Card.css";

export default function Card({ title, text }) {
  return (
    <div className="card">
      <div className="card-image"></div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
