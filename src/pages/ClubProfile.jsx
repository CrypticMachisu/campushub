import { useParams, Link } from "react-router-dom";
import { clubs } from "../data/mockData";
import { getAllEvents } from "../utils/eventsStore";
import EventCard from "../components/EventCard";
import CommentSection from "../components/CommentSection";
import styles from "./ClubProfile.module.css";

export default function ClubProfile() {
  const { clubId } = useParams();
  const club = clubs.find((c) => c.id === clubId);

  if (!club) {
    return (
      <div className={styles.notFoundPage}>
        <h2>Club Not Found</h2>
        <p>The club you are looking for does not exist or has been removed.</p>
        <Link to="/" className={styles.backLink}>Back to Home Feed</Link>
      </div>
    );
  }

  const clubEvents = getAllEvents()
    .filter((e) => e.clubId === club.id)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className={styles.page}>
      <header className={styles.clubHeader}>
        <div className={styles.headerMain}>
          <img src={club.logo} alt={`${club.name} logo`} className={styles.logo} />
          <div>
            <span className={styles.categoryBadge}>{club.category}</span>
            <h1>{club.name}</h1>
          </div>
        </div>
        <p className={styles.description}>{club.description}</p>
        
        <div className={styles.metaInfo}>
          <p><strong>Meeting Time:</strong> {club.meetingTime}</p>
          <p><strong>Location:</strong> {club.meetingLocation}</p>
        </div>

        <div className={styles.tagList}>
          {club.tags.map((tag) => (
            <span key={tag} className={styles.tag}>#{tag}</span>
          ))}
        </div>
      </header>

      <section className={styles.eventsSection}>
        <h2>Upcoming Events</h2>
        {clubEvents.length > 0 ? (
          <div className={styles.eventsGrid}>
            {clubEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className={styles.noEvents}>No upcoming events scheduled for this club yet.</p>
        )}
      </section>

      <hr className={styles.sectionDivider} />

      <section className={styles.commentsWrapper}>
        <h2>Club Discussion</h2>
        <CommentSection targetType="club" targetId={club.id} />
      </section>
    </div>
  );
}
