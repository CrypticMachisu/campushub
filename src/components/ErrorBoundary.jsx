import { Component } from "react";

// Peer review (01-person1-foundation.md): "Error Boundaries" — every
// store's localStorage reads already catch their own JSON.parse
// failures internally, but this is a second line of defense for
// anything that still slips through (e.g. a corrupted value written by
// hand in devtools) so the whole app doesn't go blank.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.error("CampusHub crashed:", error);
  }

  handleReset = () => {
    Object.keys(localStorage)
      .filter((key) => key.startsWith("campushub_"))
      .forEach((key) => localStorage.removeItem(key));
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="container" style={{ paddingTop: "3rem", textAlign: "center" }}>
          <h1>Something went wrong</h1>
          <p>
            CampusHub's local data may have gotten into a bad state. Resetting will clear
            everything stored in this browser (accounts stay — those are seed data — but
            signups, comments, and custom events will be cleared).
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            style={{
              fontFamily: "var(--font-mono)",
              padding: "10px 20px",
              background: "var(--color-primary)",
              color: "var(--color-white)",
              border: "none",
              borderRadius: "var(--radius)",
              cursor: "pointer",
            }}
          >
            Reset local data
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
