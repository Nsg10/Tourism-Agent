// src/App.jsx

import React, { useState } from "react";
import "./App.css";

const API_BASE_URL = "https://inkle-tourism-backend.onrender.com";

function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I’m your tourism planner. Tell me where you’re going and whether you want weather, places to visit, or both ✈️🌤️",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tripInfo, setTripInfo] = useState({
    place: null,
    weather: null,
    places: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!res.ok) {
        throw new Error(`Backend error: ${res.status}`);
      }

      const data = await res.json();

      // Add assistant reply
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply || "I’m not sure what to say." },
      ]);

      // Update trip info panel
      setTripInfo({
        place: data.place || null,
        weather: data.weather || null,
        places: data.places || [],
      });
    } catch (err) {
      console.error(err);
      setError(
        "Something went wrong while talking to the agent. Please try again."
      );
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            "Hmm, I ran into an error while generating your answer. The tools may still be fine — try rephrasing your question once.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-root">
      <div className="app-shell">
        {/* Left column: Chat */}
        <div className="chat-panel">
          <header className="app-header">
            <div>
              <h1>Inkle Tourism Agent</h1>
              <p>Your personal trip planner powered by tools + LLM.</p>
            </div>
            <div className="header-pill">Multi-Agent · Tool-Aware · Local LLM</div>
          </header>

          <div className="chat-window">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={
                  msg.role === "user"
                    ? "chat-message chat-message-user"
                    : "chat-message chat-message-assistant"
                }
              >
                <div className="chat-avatar">
                  {msg.role === "user" ? "👤" : "🤖"}
                </div>
                <div className="chat-bubble">{msg.text}</div>
              </div>
            ))}
            {loading && (
              <div className="chat-message chat-message-assistant">
                <div className="chat-avatar">🤖</div>
                <div className="chat-bubble typing">
                  Thinking about weather, routes & places…
                  <span className="dot dot1" />
                  <span className="dot dot2" />
                  <span className="dot dot3" />
                </div>
              </div>
            )}
          </div>

          {error && <div className="error-banner">{error}</div>}

          <form className="chat-input-bar" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ask something like: I’m going to Delhi next week, suggest places to visit and tell me the weather."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>

        {/* Right column: Trip summary */}
        <aside className="summary-panel">
          {/* 🔥 This wrapper will be sticky */}
          <div className="summary-sticky">
            <div className="summary-card">
              <h2>Trip snapshot</h2>
              <p className="summary-subtitle">
                The agent’s structured understanding of your latest query.
              </p>

              {/* Location card */}
              <div className="summary-section">
                <div className="summary-section-header">
                  <span className="section-title">Location</span>
                  <span className="section-tag">Geocoded via Nominatim</span>
                </div>
                {tripInfo.place ? (
                  <div className="summary-body">
                    <div className="location-name">{tripInfo.place.name}</div>
                    <div className="coords">
                      lat: {tripInfo.place.latitude.toFixed(4)}, lon:{" "}
                      {tripInfo.place.longitude.toFixed(4)}
                    </div>
                  </div>
                ) : (
                  <div className="summary-placeholder">
                    Ask about a city to see location details here.
                  </div>
                )}
              </div>

              {/* Weather card */}
              <div className="summary-section">
                <div className="summary-section-header">
                  <span className="section-title">Weather</span>
                  <span className="section-tag">Open-Meteo</span>
                </div>
                {tripInfo.weather ? (
                  <div className="summary-body weather-body">
                    <div className="temp-chip">
                      {tripInfo.weather.temperature_c.toFixed(1)}°C
                    </div>
                    <div className="rain-chip">
                      {tripInfo.weather.is_raining
                        ? "🌧️ It’s currently raining"
                        : "🌤️ No rain right now"}
                    </div>
                  </div>
                ) : (
                  <div className="summary-placeholder">
                    Weather will appear here when you ask about it.
                  </div>
                )}
              </div>

              {/* Places card */}
              <div className="summary-section">
                <div className="summary-section-header">
                  <span className="section-title">Places to visit</span>
                  <span className="section-tag">Overpass (OSM)</span>
                </div>
                {tripInfo.places && tripInfo.places.length > 0 ? (
                  <ul className="places-list">
                    {tripInfo.places.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="summary-placeholder">
                    When you ask for attractions, they’ll show up as a list here.
                  </div>
                )}
              </div>
            </div>

            <div className="summary-footer">
              <p>
                Tip: Try variations like{" "}
                <code>
                  I'm going to Goa, give me weather and 3 places to visit
                </code>{" "}
                or <code>What can I do in Bangalore tomorrow?</code>
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;
