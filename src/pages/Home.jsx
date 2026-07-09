import { useState } from "react";
import { clubs, CATEGORIES } from "../data/mockData";
import { getAllEvents } from "../utils/eventsStore";
import ClubCard from "../components/ClubCard";
import EventCard from "../components/EventCard";
import styles from "./Home.module.css";

export default function Home() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("clubs");

  const filteredClubs = clubs.filter((club) => {
    const matchesCategory = category === "All" || club.category === category;
    const matchesSearch =
      club.name.toLowerCase().includes(search.toLowerCase()) ||
      club.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const upcomingEvents = getAllEvents()
    .filter((event) => {
      const matchesCategory = category === "All" || event.category === category;
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.tags?.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>CampusHub Discovery</h1>
        <p>Find your community and upcoming campus events</p>
      </header>

      <section className={styles.controls}>
        <input
          type="text"
          placeholder="Search by name or tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />

        <div className={styles.filterGroup}>
          <button
            onClick={() => setCategory("All")}
            className={category === "All" ? styles.activeFilter : styles.filterBtn}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={category === cat ? styles.activeFilter : styles.filterBtn}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.toggleGroup}>
          <button 
            onClick={() => setViewMode("clubs")} 
            className={viewMode === "clubs" ? styles.activeToggle : styles.toggleBtn}
          >
            Browse Clubs
          </button>
          <button 
            onClick={() => setViewMode("events")} 
            className={viewMode === "events" ? styles.activeToggle : styles.toggleBtn}
          >
            Browse Events
          </button>
        </div>
      </section>

      <main className={styles.content}>
        {viewMode === "clubs" ? (
          <div className={styles.grid}>
            {filteredClubs.length > 0 ? (
              filteredClubs.map((club) => (
                <ClubCard key={club.id} club={club} />
              ))
            ) : (
              <p className={styles.emptyState}>No clubs found matching your criteria.</p>
            )}
          </div>
        ) : (
          <div className={styles.grid}>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <p className={styles.emptyState}>No upcoming events found matching your criteria.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
