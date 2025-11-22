🌍 Inkle Tourism Agent

A Multi-Agent, Tool-Aware Tourism Planner powered by FastAPI + React + Local LLM

Your personal AI travel assistant that gives:
✔️ Weather of any city
✔️ Attractions / places to visit
✔️ Combined responses (weather + places)
✔️ Clean, structured JSON API
✔️ Frontend chatting UI
✔️ Works for any city worldwide
✔️ Fully deployed (Backend + Frontend)

🚀 Live Demo
🔹 Frontend (React + Vite)

👉 https://aquamarine-sopapillas-20be42.netlify.app/

🔹 Backend (FastAPI)

👉 https://inkle-tourism-backend.onrender.com

(Contains Swagger UI: /docs → https://inkle-tourism-backend.onrender.com/docs
)

📁 Project Structure
Tourism-Agent/
│
│── backend/                # FastAPI backend
│     │── app/
│     │     ├── api/
│     │     ├── agents/
│     │     ├── core/
│     │     ├── models/
│     │     ├── services/
│     │     └── main.py
│     │
│     ├── requirements.txt
│     ├── Procfile          # Needed for Render deployment
│
│── frontend/               # React + Vite frontend
│     ├── src/
│     │     ├── App.jsx
│     │     ├── config.js
│     │     ├── App.css
│     │     └── main.jsx
│     ├── index.html
│     ├── package.json
│
└── README.md

🧠 How It Works (High-Level)

1️⃣ Intent Extraction (NLP)
The system understands:
City name
Whether the user wants weather
Whether the user wants tourist places
Or both
Example:

“I'm going to Bangalore, suggest places and tell me the weather.”
✔️ City → Bangalore
✔️ Weather → Yes
✔️ Attractions → Yes

2️⃣ Tool-Based Information Retrieval
The agent uses three real-world APIs:
Task	Tool Used	Description
1) Geocoding	Nominatim (OpenStreetMap)	Converts city → latitude & longitude
2) Weather	Open-Meteo API	Fetches temperature + rain
3) Places	Overpass OSM API	Fetches tourist POIs nearby

3️⃣ LLM-Based Final Answer
Uses a Strict Prompting System to ensure answers follow exactly this format:

✔️ If only weather:
In <CITY> it’s currently <TEMP>°C with a chance of <RAIN>% to rain.

✔️ If only places:
In <CITY> these are the places you can go:
- Place 1
- Place 2
- Place 3

✔️ If both:
In <CITY> it’s currently <TEMP>°C with a chance of <RAIN>% to rain.
And these are the places you can go:
- Place 1
- Place 2
- Place 3


Correct, clean, human-friendly, consistent output — every time.

📸 Screenshots (UI + Backend)
🔹 Initial UI
<img width="1704" height="765" alt="Screenshot 2025-11-23 005816" src="https://github.com/user-attachments/assets/05cdab5d-9bba-4e3b-8a29-20b8c90780da" />

🔹 Trip Snapshot UI
<img width="533" height="677" alt="Screenshot 2025-11-23 005857" src="https://github.com/user-attachments/assets/01137d6b-4035-4704-8be6-eb2def74d367" />

🔹 LLM Response Example
<img width="1630" height="856" alt="Screenshot 2025-11-23 005927" src="https://github.com/user-attachments/assets/bb942e02-64a7-4058-a7a9-1cd147f67e74" />

🔹 Weather Example
<img width="951" height="521" alt="Screenshot 2025-11-23 010140" src="https://github.com/user-attachments/assets/81814f7a-6e9a-431c-9081-3d795953f6a6" />

🔹 Hyderabad Attractions
<img width="951" height="521" alt="Screenshot 2025-11-23 010140" src="https://github.com/user-attachments/assets/90cf4d16-f53f-447a-9f2d-36fc157aa2bc" />

🔹 Backend Swagger
<img width="1845" height="747" alt="Screenshot 2025-11-23 010230" src="https://github.com/user-attachments/assets/ac31f141-9a09-416d-b1e7-ee3dc7701758" />

🔹 Successful API Response
<img width="1155" height="238" alt="Screenshot 2025-11-23 010313" src="https://github.com/user-attachments/assets/c80b6ac4-6173-40d1-9dab-ed279b2a999a" />
<img width="1773" height="779" alt="Screenshot 2025-11-23 010536" src="https://github.com/user-attachments/assets/2f02a4ad-ac86-4d58-916a-f3d9024d5ccf" />

⚙️ Tech Stack
Backend
Python
FastAPI
Pydantic Models
Async HTTP Clients
Nominatim API
Overpass OSM API
Open-Meteo API
Render Deployment

Frontend
React (Vite)
CSS Styling
State Management with Hooks
Netlify Deployment

🛠️ How to Run Locally
1️⃣ Clone repo
git clone https://github.com/Nsg10/Tourism-Agent.git
cd Tourism-Agent

2️⃣ Backend Setup
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload


Backend runs at:
👉 http://127.0.0.1:8000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs at:
👉 http://localhost:5173/

🧪 API Example

POST → /api/chat

{
  "message": "I'm going to Bangalore, what are the places I can visit?"
}


Example Response:

{
  "reply": "In Bengaluru... ",
  "place": {
    "name": "Bengaluru, Karnataka, India",
    "latitude": 12.97,
    "longitude": 77.59
  },
  "weather": {
    "temperature_c": 20.5,
    "is_raining": false
  },
  "places": [
    "Lalbagh Botanical Garden",
    "Cubbon Park",
    "Bangalore Palace"
  ]
}

🎯 Features That Make This Project Unique

Multi-Agent architecture
Strict LLM formatting control
Automated attraction filtering
Fully integrated backend–frontend
Clean UI with fixed side panel

💡 Future Enhancements

Add day-wise itinerary generation
Add hotels/restaurant recommendations
Add route optimization
Use vector search for memory

📄 License

MIT License.

🙋‍♀️ Author

Niharika S Gowda
AIML Engineer | FastAPI + React Developer
