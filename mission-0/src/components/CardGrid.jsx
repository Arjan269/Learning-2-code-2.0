import Card from "./Card";
import "./CardGrid.css";

export default function CardGrid() {
  return (
    <section className="card-grid">
      <Card title="Lorem Ipsum" text="Est venenatis" />
      <Card title="Lorem Ipsum" text="Est venenatis" />
      <Card title="Lorem Ipsum" text="Est venenatis" />
    </section>
  );
}
