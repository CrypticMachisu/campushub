import { Link } from "react-router-dom";
import styles from "./EventCard.module.css";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

export default function EventCard({ event }) {
  if (!event) return null;

  const { id, title, date, time, description, image, location } = event;

  return (
    <Link to={`/event/${id}`} className={styles.card}>
      <img
        src={image || "https://placehold.co/400x250?text=Event"}
        alt={title}
        className={styles.image}
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.datetime}>
          {formatDate(date)} · {time}
        </p>
        {location && <p className={styles.location}>{location}</p>}
        <p className={styles.description}>{description}</p>
      </div>
    </Link>
  );
}