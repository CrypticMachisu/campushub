import { useMemo, useState } from "react";
import { clubs, CATEGORIES } from "../data/mockData";
import { getAllEvents } from "../utils/eventsStore";
import ClubCard from "../components/ClubCard";
import EventCard from "../components/EventCard";
import styles from "./Home.module.css";

const HERO_IMAGES = [
  "/images/campus-life.svg",
  "/images/club-fair.svg",
  "/images/game-night.svg",
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const allEvents = useMemo(() => getAllEvents(), []);

  const upcomingEvents = useMemo(() => {
    return [...allEvents]
      .filter((e) => e.date >= "2026-07-08")
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 6);
  }, [allEvents]);

  const visibleClubs = useMemo(() => {
    if (activeCategory === "All") return clubs;
    return clubs.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  function clubName(clubId) {
    return clubs.find((c) => c.id === clubId)?.name;
  }

  return (
    <div className="container">
      <section className={styles.hero}>
        <div className={styles.photoStack} aria-hidden="true">
          <img src={HERO_IMAGES[0]} alt="" className={`${styles.photo} ${styles.photoA}`} />
          <img src={HERO_IMAGES[1]} alt="" className={`${styles.photo} ${styles.photoB}`} />
          <img src={HERO_IMAGES[2]} alt="" className={`${styles.photo} ${styles.photoC}`} />
        </div>

        <div className={styles.heroText}>
          <h1 className={styles.title}>Find your people on campus</h1>
          <p className={styles.subtitle}>
            Browse clubs, discover upcoming events, and sign up in a couple of taps.
          </p>
          <div className={styles.chips}>
            <button
              className={activeCategory === "All" ? `${styles.chip} ${styles.chipActive}` : styles.chip}
              onClick={() => setActiveCategory("All")}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={activeCategory === cat ? `${styles.chip} ${styles.chipActive}` : styles.chip}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Upcoming events</h2>
        <div className={styles.eventGrid}>
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} clubName={clubName(event.clubId)} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {activeCategory === "All" ? "All clubs" : activeCategory}
        </h2>
        <div className={styles.clubGrid}>
          {visibleClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </section>
    </div>
  );
}
