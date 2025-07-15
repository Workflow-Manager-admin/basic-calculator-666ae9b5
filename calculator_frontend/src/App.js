import React, { useEffect, useState } from "react";
import "./App.css";

// Import the Figma background image
import figmaBg from "./figma-bg.jpg";

/**
 * PUBLIC_INTERFACE
 * Main ToDo App component, built to closely follow the Figma-derived design spec for the mobile ToDo App.
 */
function App() {
  // Light/dark themes not in Figma prototype, but demo toggling (as present previously) is preserved for clarity
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Set the background image for the ToDo app as per Figma
  useEffect(() => {
    const bgEl = document.querySelector(".ToDoApp");
    if (bgEl && figmaBg) {
      bgEl.style.backgroundImage = `url('${figmaBg}')`;
      bgEl.style.backgroundSize = "cover";
      bgEl.style.backgroundRepeat = "no-repeat";
      bgEl.style.backgroundPosition = "center top";
    }
    // Clean up on unmount/theme toggle
    return () => {
      if (bgEl) bgEl.style.backgroundImage = "";
    };
  }, [theme]);

  // Example ToDos for showing UI (would be dynamic in a live app)
  const sampleTodos = [
    {
      id: 1,
      title: "Design meeting with UI team",
      subtitle: "Today • 10:00AM",
      checked: false,
    },
    {
      id: 2,
      title: "Grocery shopping for dinner",
      subtitle: "Tomorrow • 6:30PM",
      checked: true,
    },
    {
      id: 3,
      title: "Send weekly project updates",
      subtitle: "Friday • 3:00PM",
      checked: false,
    },
  ];

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  // PUBLIC_INTERFACE
  const handleFabClick = () => {
    // Would launch "add new ToDo" UI/modal; for now shows alert
    alert("Add new ToDo (not implemented)");
  };

  // PUBLIC_INTERFACE
  const handleCardToggle = (id) => {
    // Would dispatch event to update todo checked state.
    alert(`Toggle complete for ToDo ID: ${id} (not implemented)`);
  };

  return (
    <div className="ToDoApp">
      <div className="todo-content-container">
        {/* Status Bar */}
        <div className="status-bar" role="presentation" aria-label="device status bar">
          <div className="status-clock">9:41</div>
          <div className="status-icons">
            <span role="img" aria-label="cell signal">📶</span>
            <span role="img" aria-label="wifi">📡</span>
            <span role="img" aria-label="battery">🔋</span>
          </div>
        </div>

        {/* App Header */}
        <header className="appbar-header">
          <div className="header-side">
            {/* Replace with SVG/Menu if needed */}
            <span className="header-icon" aria-label="Navigation menu">☰</span>
          </div>
          <div className="header-title">ToDo</div>
          <div className="header-side header-action">
            {/* Profile/settings quick action icon, placeholder for now */}
            <span className="header-icon" aria-label="Profile">👤</span>
          </div>
        </header>

        {/* Main ToDo List Scroll Area */}
        <main className="todos-scroll">
          <div className="todos-list">
            {sampleTodos.map((todo) => (
              <ToDoCard
                key={todo.id}
                {...todo}
                onToggle={() => handleCardToggle(todo.id)}
              />
            ))}
          </div>
        </main>

        {/* Floating Action Button (FAB) */}
        <button
          className="fab"
          aria-label="Add new ToDo"
          onClick={handleFabClick}
        >
          {/* Inline SVG plus icon (centered) */}
          <svg width="40" height="40" aria-hidden="true" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="19" fill="none" />
            <rect x="18" y="10" width="4" height="20" rx="2" fill="#fff" />
            <rect x="10" y="18" width="20" height="4" rx="2" fill="#fff" />
          </svg>
        </button>

        {/* Bottom Navigation Bar */}
        <nav className="bottom-navbar" role="navigation" aria-label="Bottom navigation">
          <NavIcon label="Home" selected>
            {/* Home icon SVG */}
            <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
              <path d="M3 12.5L13 4l10 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 3 21.5v-9z" fill="none" stroke="#9395d3" strokeWidth="2"/>
              <rect x="9" y="16" width="8" height="6" rx="2" fill="#9395d3" />
            </svg>
          </NavIcon>
          <NavIcon label="Todos">
            {/* Check icon SVG */}
            <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
              <circle cx="13" cy="13" r="11" stroke="#9395d3" strokeWidth="2" fill="none" />
              <path d="M9 13l3 3 5-6" stroke="#9395d3" strokeWidth="2" fill="none" />
            </svg>
          </NavIcon>
          <NavIcon label="Calendar">
            {/* Calendar icon */}
            <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
              <rect x="3" y="7" width="20" height="16" rx="4" fill="none" stroke="#9395d3" strokeWidth="2"/>
              <rect x="7" y="13" width="4" height="4" rx="1.5" fill="#9395d3"/>
              <rect x="15" y="13" width="4" height="4" rx="1.5" fill="#9395d3"/>
            </svg>
          </NavIcon>
          <NavIcon label="Profile">
            {/* User/person icon */}
            <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
              <circle cx="13" cy="10" r="4" fill="none" stroke="#9395d3" strokeWidth="2"/>
              <ellipse cx="13" cy="19" rx="7" ry="3" fill="none" stroke="#9395d3" strokeWidth="2"/>
            </svg>
          </NavIcon>
        </nav>

        {/* Retain theme toggle as a floating dev tool */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * ToDo Card component: displays one task as per design (rounded card, check icon, title/subtitle).
 */
function ToDoCard({ id, title, subtitle, checked, onToggle }) {
  return (
    <div className="todo-card" tabIndex="0" aria-checked={checked} role="checkbox">
      <div className="todo-card-content">
        <div className="todo-text-group">
          <div className="todo-title">{title}</div>
          <div className="todo-subtitle">{subtitle}</div>
        </div>
        <button className="todo-check-btn" onClick={onToggle} aria-label={checked ? "Unmark as done" : "Mark as done"}>
          {checked ? (
            // Checked state: solid circle with checkmark
            <span className="check-icon">
              <svg width="25" height="25" viewBox="0 0 25 25" aria-hidden="true">
                <circle cx="12.5" cy="12.5" r="12" fill="#9395d3" />
                <path d="M8 13.5l3.5 3L17 10" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
          ) : (
            // Unchecked: outlined circle
            <span className="check-icon">
              <svg width="25" height="25" viewBox="0 0 25 25" aria-hidden="true">
                <circle cx="12.5" cy="12.5" r="11" fill="none" stroke="#9395d3" strokeWidth="2" />
              </svg>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Bottom Navbar icon (flex), highlights selected icon.
 */
function NavIcon({ children, label, selected }) {
  return (
    <div className={`nav-icon${selected ? " nav-icon-selected" : ""}`} tabIndex={0} role="button" aria-label={label}>
      {children}
      <span className="nav-icon-label">{label}</span>
    </div>
  );
}

export default App;
