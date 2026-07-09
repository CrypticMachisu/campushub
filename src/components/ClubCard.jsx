import { Link } from "react-router-dom";
import styles from "./ClubCard.module.css";

export default function ClubCard({ club }) {
  if (!club) return null;

  const { id, name, category, description, image, tags = [], memberCount } = club;

  return (
    <Link to={`/club/${id}`} className={styles.card}>
      <img
        src={image || "https://placehold.co/400x250?text=Club"}
        alt={name}
        className={styles.image}
      />
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <span className={styles.category}>{category}</span>
        <p className={styles.description}>{description}</p>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        {typeof memberCount === "number" && (
          <p className={styles.members}>{memberCount} members</p>
        )}
      </div>
    </Link>
  );
}