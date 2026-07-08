import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../data/mockUsers";
import { login } from "../utils/authStore";
import styles from "./Login.module.css";

const ROLE_LABELS = {
  tier1: "Tier 1 Admin",
  tier2: "Tier 2 Admin",
  member: "Member",
};

export default function Login() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(users[0]?.id ?? "");

  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedId) return;
    login(selectedId);
    navigate("/");
  }

  return (
    <div className={`container ${styles.wrap}`}>
      <h1>Log in</h1>
      <p className={styles.blurb}>
        This is a demo app with no real accounts or passwords. Pick any account
        below to log in as that person — that's the whole flow.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="user-select">
          Choose an account
        </label>
        <select
          id="user-select"
          className={styles.select}
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} — {ROLE_LABELS[u.role]}
            </option>
          ))}
        </select>

        <button type="submit" className={styles.submitButton}>
          Log in
        </button>
      </form>

      <div className={styles.list}>
        {users.map((u) => (
          <button
            key={u.id}
            type="button"
            className={`${styles.userRow} ${u.id === selectedId ? styles.userRowSelected : ""}`}
            onClick={() => {
              login(u.id);
              navigate("/");
            }}
          >
            <span className={styles.userName}>{u.name}</span>
            <span className={styles.userRole}>{ROLE_LABELS[u.role]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
