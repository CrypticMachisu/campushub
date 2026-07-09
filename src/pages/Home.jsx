import { useState, useEffect } from "react";
import { clubs, CATEGORIES } from "../data/mockData";
import { getAllEvents } from "../utils/eventsStore";
import ClubCard from "../components/ClubCard";
import EventCard from "../components/EventCard";
import styles from "./Home.module.css";

// Custom hook for 300ms Search Debouncing
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function Home() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("clubs");

  // Apply the 300ms debounce to the search string
  const debouncedSearch = useDebounce(search, 300);

  // Filter Clubs with Expanded Parameters (Name, Tags, and Description)
  const filteredClubs = clubs.filter((club) => {
    const matchesCategory = category === "All" || club.category === category;
    
    const searchLower = debouncedSearch.toLowerCase();
    const matchesSearch =
      club.name.toLowerCase().includes(searchLower) ||
      club.description.toLowerCase().includes(searchLower) || // Added description
      club.tags.some((tag) => tag.toLowerCase().includes(searchLower));

    return matchesCategory && matchesSearch;
  });

  // Filter and Sort Events with Dynamic Date Parsing
  const upcomingEvents = getAllEvents()
    .filter((event) => {
      const matchesCategory = category === "All" || event.category === category;
      
      const searchLower = debouncedSearch.toLowerCase();
      const matchesSearch =
        event.title.toLowerCase().includes(searchLower) ||
        event.tags?.some((tag) => tag.toLowerCase().includes(searchLower));

      return matchesCategory && matchesSearch;
    })
    // Explicit dynamic date sorting via timestamp parsing
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>CampusHub Discovery</h1>
        <p>Find your community and upcoming campus events</p>
      </header>

      <section className={styles.controls}>
        <input
          type="text"
          placeholder="Search by name, description, or tags..."
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
              /* Dedicated Empty State UI Component */
              <div className={styles.emptyStateBox}>
                <h3>No Clubs Found</h3>
                <p>We couldn't find any clubs matching "{debouncedSearch}". Try checking your spelling or changing filters.</p>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.grid}>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              /* Dedicated Empty State UI Component */
              <div className={styles.emptyStateBox}>
                <h3>No Upcoming Events Found</h3>
                <p>No events match your current criteria. Try looking under a different category.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
