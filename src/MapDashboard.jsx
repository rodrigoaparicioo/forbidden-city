import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ComposableMap, Geographies, Geography, Sphere, Graticule } from "react-simple-maps";
import { geoMercator } from "d3-geo";

// ─────────────────────────────────────────────────────────────
// DATASET
// ─────────────────────────────────────────────────────────────
const MATERIALS_DATA = [
  {
    "Material": "Nanmu Wood",
    "Origin": "Sichuan, Guizhou, Yunnan",
    "Destination": "Beijing",
    "Transport_Method": "Floating via Yangtze & Grand Canal",
    "Transport_Type": "Water",
    "Hover_Description": "The 'Imperial Timber.' These massive cedar-like logs were floated for thousands of miles, a journey that could take 3–5 years. Many were lost to mountain torrents before even reaching the river.",
    "Start_Year": 1406,
    "Season": ["Summer"],
    "Pace_Of_Movement": "Very Slow",
    "Color": "#2E7D32", 
    "Thickness": "Thick",
    "Workers": "100,000",
    "Cost": "9,000,000 Silver Taels"
  },
  {
    "Material": "Golden Bricks",
    "Origin": "Suzhou",
    "Destination": "Beijing",
    "Transport_Method": "Dedicated Barges via Grand Canal",
    "Transport_Type": "Water",
    "Hover_Description": "Not made of gold, but so dense they ring like metal. Fired for 130 days and soaked in tung oil, each brick took nearly two years to produce before being shipped north.",
    "Start_Year": 1408,
    "Season": ["Summer", "Winter"],
    "Pace_Of_Movement": "Slow",
    "Color": "#D84315", 
    "Thickness": "Thick",
    "Workers": "50,000",
    "Cost": "2,500,000 Silver Taels"
  },
  {
    "Material": "Sticky Rice",
    "Origin": "Yangtze River Delta",
    "Destination": "Beijing",
    "Transport_Method": "Grain Barges via Grand Canal",
    "Transport_Type": "Water",
    "Hover_Description": "The secret to the palace’s strength. Millions of liters of sticky rice soup were mixed with lime to create an organic mortar so strong it remains earthquake-proof 600 years later.",
    "Start_Year": 1410,
    "Season": ["Summer"],
    "Pace_Of_Movement": "Moderate",
    "Color": "#F57F17", 
    "Thickness": "Medium",
    "Workers": "250,000",
    "Cost": "1,000,000 Silver Taels"
  },
  {
    "Material": "White Marble",
    "Origin": "Fangshan District",
    "Destination": "Beijing",
    "Transport_Method": "Sledges on Ice-lubricated Roads",
    "Transport_Type": "Land",
    "Hover_Description": "To move 300-ton monoliths, workers dug wells every 500m to flood the roads in winter. Over 20,000 men and 1,000 mules slid the stone across a 'highway of ice' toward the capital.",
    "Start_Year": 1415,
    "Season": ["Winter"],
    "Pace_Of_Movement": "Fast",
    "Color": "#78909C", 
    "Thickness": "Thick",
    "Workers": "20,000",
    "Cost": "500,000 Silver Taels"
  },
  {
    "Material": "Glazed Tiles",
    "Origin": "Shandong & Mentougou",
    "Destination": "Beijing",
    "Transport_Method": "Carts and Short-haul Canal routes",
    "Transport_Type": "Land",
    "Hover_Description": "The 'Yellow Sea' of the palace. These tiles were coated in a lead-based glaze and fired in imperial kilns. Their bright yellow hue was strictly reserved for the Emperor’s rooflines.",
    "Start_Year": 1417,
    "Season": ["Summer", "Winter"],
    "Pace_Of_Movement": "Moderate",
    "Color": "#FBC02D", 
    "Thickness": "Medium",
    "Workers": "30,000",
    "Cost": "800,000 Silver Taels"
  },
  {
    "Material": "Cinnabar (Red)",
    "Origin": "Hunan & Guizhou",
    "Destination": "Beijing",
    "Transport_Method": "Overland Caravans",
    "Transport_Type": "Land",
    "Hover_Description": "The source of 'Imperial Red.' This toxic mercury-sulfide ore was ground into the vibrant pigment that coats every wall of the palace, symbolizing life, fire, and the Emperor's vitality.",
    "Start_Year": 1418,
    "Season": ["Summer", "Winter"],
    "Pace_Of_Movement": "Fast",
    "Color": "#C62828", 
    "Thickness": "Thin",
    "Workers": "5,000",
    "Cost": "1,200,000 Silver Taels"
  },
  {
    "Material": "Gold Leaf",
    "Origin": "Suzhou",
    "Destination": "Beijing",
    "Transport_Method": "High-security Couriers",
    "Transport_Type": "Land",
    "Hover_Description": "Suzhou craftsmen beat gold into leaves just 0.12 microns thick. Small, silk-lined boxes were carried by elite couriers to be applied to the dragon carvings and the throne itself.",
    "Start_Year": 1418,
    "Season": ["Summer", "Winter"],
    "Pace_Of_Movement": "Fast",
    "Color": "#AF8000", 
    "Thickness": "Thin",
    "Workers": "2,000",
    "Cost": "3,000,000 Silver Taels"
  },
  {
    "Material": "Lapis Lazuli",
    "Origin": "Badakhshan",
    "Destination": "Beijing",
    "Transport_Method": "Camel Caravans via Trade Routes",
    "Transport_Type": "Land",
    "Hover_Description": "A celestial luxury. Traveled from modern-day Afghanistan via the Silk Road. Its deep blue pigment was used for the most sacred eaves and to glaze tiles representing the color of the sky.",
    "Start_Year": 1418,
    "Season": ["Summer", "Winter"],
    "Pace_Of_Movement": "Slow",
    "Color": "#1565C0", 
    "Thickness": "Thin",
    "Workers": "1,500",
    "Cost": "4,000,000 Silver Taels"
  },
  {
    "Material": "Charcoal",
    "Origin": "Beijing Mountains",
    "Destination": "Beijing",
    "Transport_Method": "Mule Carts",
    "Transport_Type": "Land",
    "Hover_Description": "The palace's winter breath. This 'Silver-Veined' charcoal was processed to be smokeless and odorless, fueling the underground hypocaust system that kept the Emperor warm.",
    "Start_Year": 1418,
    "Season": ["Winter"],
    "Pace_Of_Movement": "Fast",
    "Color": "#455A64", 
    "Thickness": "Medium",
    "Workers": "10,000",
    "Cost": "200,000 Silver Taels"
  }
];

// ─────────────────────────────────────────────────────────────
// CONSTANTS & MAPPINGS
// ─────────────────────────────────────────────────────────────
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";
const RIVERS_URL = "https://raw.githubusercontent.com/simonepri/geo-maps/master/previews/earth-rivers.geo.json";

const MAP_W   = 1200;
const MAP_H   = 700;
const PROJ_CENTER = [100, 38]; 
const PROJ_SCALE  = 650;

const makeProjection = () =>
  geoMercator()
    .center(PROJ_CENTER)
    .scale(PROJ_SCALE)
    .translate([MAP_W / 2, MAP_H / 2]);

const ROUTE_PATHS_GEO = {
  "Sichuan, Guizhou, Yunnan (SW Jungles)": [
    [104.0, 26.5], [106.5, 29.5], [114.3, 30.6], [118.8, 32.0], [119.1, 33.5], [117.1, 36.5], [116.2, 39.8]  
  ],
  "Suzhou": [
    [120.6, 31.3], [119.5, 33.5], [117.5, 36.5], [116.4, 39.9]  
  ],
  "Yangtze River Delta (Southern China)": [
    [119.0, 30.0], [120.0, 31.5], [119.9, 33.5], [117.9, 36.5], [116.6, 39.8] 
  ],
  "Fangshan District (Local, SW of Beijing)": [
    [115.8, 39.6], [116.4, 39.9]
  ],
  "Shandong & Mentougou": [
    [118.0, 36.5], [118.0, 38.0], [116.8, 39.8]
  ],
  "Hunan & Guizhou": [
    [110.0, 27.5], [112.0, 31.0], [114.0, 35.0], [116.4, 39.9]
  ],
  "Badakhshan": [
    [71.0, 37.0], [76.0, 39.5], [89.0, 43.0], [94.0, 40.0], [103.0, 36.0], [109.0, 38.0], [116.4, 39.9]
  ],
  "Beijing Mountains": [
    [115.8, 40.5], [116.4, 39.9]
  ]
};

const getMaterialEmoji = (materialName) => {
  if (materialName.includes("Nanmu Wood")) return "🪵";
  if (materialName.includes("Golden Bricks")) return "🧱";
  if (materialName.includes("Sticky Rice")) return "🍚";
  if (materialName.includes("White Marble")) return "🧊";
  if (materialName.includes("Glazed Tiles")) return "🟨";
  if (materialName.includes("Cinnabar")) return "🩸";
  if (materialName.includes("Gold Leaf")) return "✨";
  if (materialName.includes("Lapis Lazuli")) return "💎";
  if (materialName.includes("Charcoal")) return "🪨";
  return "📦";
};

const getThickness = (thick_str) => {
  if (thick_str === "Thin") return 2;
  if (thick_str === "Medium") return 4;
  if (thick_str === "Thick") return 6;
  return 3;
};

const getPaceAnimationDuration = (pace_str) => {
  if (pace_str === "Very Slow") return 24;
  if (pace_str === "Slow") return 18;
  if (pace_str === "Moderate") return 12;
  if (pace_str === "Fast") return 6;
  return 10;
};

function getSmoothPath(geoPoints, proj, itemIndex = 0) {
  if (!geoPoints || geoPoints.length === 0) return "";
  let basePoints = geoPoints.map(proj);
  if (basePoints.length === 1) return `M${basePoints[0][0]},${basePoints[0][1]}`;

  // Dynamically offset the lanes based on the item index 
  // so items sharing routes fan out (0=center, -1=left, 1=right, etc.)
  const laneArr = [0, -1, 1, -2, 2, -3, 3];
  const laneMultiplier = laneArr[itemIndex % laneArr.length] || 0;
  const offsetAmount = 25 * laneMultiplier;

  if (basePoints.length === 2) {
      const [start, end] = basePoints;
      const midX = (start[0] + end[0]) / 2;
      const midY = (start[1] + end[1]) / 2;
      
      const dx = end[0] - start[0];
      const dy = end[1] - start[1];
      const len = Math.sqrt(dx*dx + dy*dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;
      
      const baseCurve = offsetAmount === 0 ? (len * 0.15) : offsetAmount;
      const cpX = midX + nx * baseCurve;
      const cpY = midY + ny * baseCurve;
      
      return `M${start[0]},${start[1]} Q${cpX},${cpY} ${end[0]},${end[1]}`;
  }
  
  // Calculate perpendicular normal vectors at each intermediate point to shift them
  const offsetPoints = basePoints.map((p, i) => {
    // Don't shift origin and destination anchors
    if (i === 0 || i === basePoints.length - 1) return p;
    
    // Compute normal from prev to next points
    const prev = basePoints[i - 1];
    const next = basePoints[i + 1];
    const dx = next[0] - prev[0];
    const dy = next[1] - prev[1];
    const len = Math.sqrt(dx*dx + dy*dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    
    return [p[0] + nx * offsetAmount, p[1] + ny * offsetAmount];
  });

  let d = `M${offsetPoints[0][0]},${offsetPoints[0][1]}`;
  for (let i = 1; i < offsetPoints.length - 2; i++) {
    const xc = (offsetPoints[i][0] + offsetPoints[i + 1][0]) / 2;
    const yc = (offsetPoints[i][1] + offsetPoints[i + 1][1]) / 2;
    d += ` Q${offsetPoints[i][0]},${offsetPoints[i][1]} ${xc},${yc}`;
  }
  
  // For the final segment, use a Q curve instead of L to ensure smooth bezier landing
  const n = offsetPoints.length;
  d += ` Q${offsetPoints[n - 2][0]},${offsetPoints[n - 2][1]} ${offsetPoints[n - 1][0]},${offsetPoints[n - 1][1]}`;
  return d;
}


// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

export default function MapDashboard() {
  const navigate = useNavigate();
  const [year, setYear] = useState(1420);
  const [season, setSeason] = useState("All");
  const [tooltip, setTooltip] = useState(null);

  const proj = useMemo(() => makeProjection(), []);

  const activeMaterials = useMemo(() => {
    return MATERIALS_DATA.filter((m) => {
      if (m.Start_Year > year) return false;
      if (season !== "All" && !m.Season.includes(season)) return false;
      return true;
    });
  }, [year, season]);

  const [riversGEO, setRiversGEO] = useState(null);
  useEffect(() => {
    fetch(RIVERS_URL)
      .then(res => res.json())
      .then(data => {
        if (data && data.features) setRiversGEO(data.features);
      })
      .catch(err => console.error("Could not load rivers GeoJSON:", err));
  }, []);

  const handleMouseMove = (e, data) => {
    setTooltip({
      x: e.clientX,
      y: e.clientY,
      data,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  const [bx, by] = proj([116.4, 39.9]);

  return (
    <div className="map-dashboard-root">
      {/* Google Fonts loaded */}
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Newsreader:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .map-dashboard-root {
          --bg-top: #5c1010;
          --bg-bottom: #3a0a0a;
          --text: #e3cd8b;
          --gold-dark: #c5a017;
          --gold-light: #e3cd8b;
          --gold-mid: #d4af37;
          --red-dark: #4a0e0e;
          --red-surface: #5c1010;
          --red-light: #8c1a1a;
          
          background-image: linear-gradient(to bottom, var(--bg-top), var(--bg-bottom));
          color: var(--text);
          font-family: 'Newsreader', serif;
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }
        
        .map-dashboard-root * { box-sizing: border-box; }
        
        .font-headline { font-family: 'Noto Serif', serif; }
        .font-body { font-family: 'Newsreader', serif; }

        /* HEADER */
        .md-header {
          width: 100%;
          background-color: #f8f5f0;
          color: #4a0e0e;
          padding: 16px 32px;
          position: sticky;
          top: 0;
          z-index: 50;
          display: flex;
          justify-content: space-between;
          align-items: center;
          /* Removed shadow per DESIGN rules */
          border-bottom: 2px solid #840101; 
        }
        .md-nav {
          display: none;
          gap: 32px;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
        }
        @media (min-width: 768px) { .md-nav { display: flex; } }
        .md-nav a { text-decoration: none; color: #4a0e0e; transition: color 0.3s; }
        .md-nav a:hover { color: #8c1a1a; }
        .md-nav a.active { border-bottom: 2px solid #4a0e0e; padding-bottom: 4px; }
        
        .md-explore-btn {
          background: #4a0e0e; color: #fff; text-decoration: none;
          padding: 8px 24px; text-transform: uppercase; font-size: 0.875rem; font-weight: bold;
          transition: background 0.3s; border: none; cursor: pointer;
        }
        .md-explore-btn:hover { background: #7a1515; }

        /* HERO */
        .md-hero {
          padding: 80px 16px;
          text-align: center;
          position: relative;
        }
        .md-hero-title {
          font-size: clamp(3rem, 6vw, 5.5rem);
          margin-bottom: 48px;
          color: var(--gold-light);
          background: linear-gradient(to right, #e3cd8b, #c5a017, #e3cd8b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-top: 0;
          letter-spacing: 0.05em;
        }
        
        /* TIMELINE CONTROL */
        .md-timeline-box {
          border: 1px solid rgba(212, 175, 55, 0.5);
          padding: 32px;
          max-width: 672px;
          margin: 0 auto;
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(4px);
          position: relative;
        }
        .md-corner {
          position: absolute; width: 16px; height: 16px;
        }
        
        .md-slider {
          width: 100%; height: 6px; cursor: pointer; accent-color: var(--gold-mid);
        }
        .md-filters {
          display: flex; justify-content: center; gap: 16px; margin-top: 32px;
        }
        .md-filter-btn {
          padding: 8px 32px;
          background: transparent;
          color: var(--gold-mid);
          border: 1px solid var(--gold-mid);
          font-weight: bold;
          cursor: pointer;
          text-transform: uppercase;
          font-family: 'Newsreader', serif;
          transition: all 0.3s;
        }
        .md-filter-btn.active {
          background: var(--gold-light);
          color: var(--red-dark);
        }

        /* MAP BOX */
        .md-map-section {
          width: 100%; max-width: 1280px; margin: 0 auto; padding: 32px 16px;
        }
        .md-map-box {
          position: relative; width: 100%; aspect-ratio: 16/9;
          background: #e6dcc3;
          border: 1px solid rgba(170, 138, 19, 0.3);
          /* No rounded corners per DESIGN.md */
          overflow: hidden;
        }
        @media (min-width: 768px) { .md-map-box { aspect-ratio: 21/9; } }

        /* VIZ */
        .md-viz-section { max-width: 1152px; margin: 0 auto; padding: 64px 16px; }
        .md-viz-title { font-size: 2.25rem; margin-bottom: 24px; color: var(--gold-light); }
        .md-viz-subtitle { font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold-mid); margin-bottom: 8px; }
        .md-chart-container {
          position: relative; width: 100%; height: 400px;
          border-bottom: 1px solid rgba(227, 205, 139, 0.3);
          border-left: 1px solid rgba(227, 205, 139, 0.3);
          padding-left: 48px; padding-bottom: 32px; margin-bottom: 32px;
        }

        /* ARCHITECTURAL MARVELS */
        .md-arch-section {
          max-width: 1152px; margin: 0 auto; padding: 80px 16px;
          display: flex; flex-direction: column; gap: 48px;
          border-top: 1px solid rgba(212, 175, 55, 0.2);
        }
        @media (min-width: 768px) { .md-arch-section { flex-direction: row; align-items: center; } }
        
        /* CTA */
        .md-cta {
          padding: 96px 16px; text-align: center; background: var(--gold-dark);
          position: relative; margin-top: 32px;
        }
        .md-cta-title { font-size: clamp(2.5rem, 5vw, 4rem); color: var(--red-dark); margin-bottom: 48px; }
        .md-cta-btns {
          display: flex; flex-direction: column; justify-content: center; gap: 24px;
        }
        @media (min-width: 768px) { .md-cta-btns { flex-direction: row; } }
        .md-btn-primary {
          background: #4a0e0e; color: #e3cd8b; text-decoration: none; text-transform: uppercase;
          padding: 16px 32px; font-weight: bold; letter-spacing: 0.1em; transition: 0.3s;
          border: none; cursor: pointer;
        }
        .md-btn-primary:hover { background: #5c1010; }
        .md-btn-ghost {
          background: transparent; color: #4a0e0e; border: 2px solid #4a0e0e;
          padding: 16px 32px; text-transform: uppercase; font-weight: bold;
          letter-spacing: 0.1em; transition: 0.3s; cursor: pointer; text-decoration: none;
        }
        .md-btn-ghost:hover { background: #4a0e0e; color: #e3cd8b; }

        /* FOOTER */
        .md-footer {
          background: #3a0a0a; color: rgba(227, 205, 139, 0.6);
          padding: 48px 16px; text-align: center;
          border-top: 1px solid rgba(212, 175, 55, 0.2);
        }
        .md-footer-logo { font-size: 1.25rem; font-weight: bold; color: var(--gold-mid); margin-bottom: 32px; letter-spacing: 0.1em; text-transform: uppercase; }
        .md-footer-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 24px; margin-bottom: 32px; }
        .md-footer-links a { text-decoration: none; color: inherit; transition: 0.3s; }
        .md-footer-links a:hover { color: var(--gold-light); }
      `}</style>


      {/* ──────────────── HEADER ──────────────── */}
      <header className="md-header">
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <div className="font-headline" style={{ fontSize: "1.5rem", fontWeight: "bold", letterSpacing: "0.1em" }}>
            Interactive Map
          </div>
          <nav className="md-nav font-headline">
            <a href="#arch" className="active" onClick={(e) => e.preventDefault()}>Architecture</a>
            <a href="#hist" onClick={(e) => e.preventDefault()}>History</a>
            <a href="#palaces" onClick={(e) => e.preventDefault()}>Palaces</a>
          </nav>
          <button className="md-explore-btn font-headline" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </header>

      <main>
        {/* ──────────────── HERO ──────────────── */}
        <section className="md-hero">
          <div style={{ position: "absolute", inset: 0, opacity: 0.5, mixBlendMode: "overlay", pointerEvents: "none" }}></div>
          <div style={{ position: "relative", zIndex: 10, maxWidth: 896, margin: "0 auto" }}>
            <h1 className="md-hero-title font-headline">
              Interactive Map
            </h1>
            
            {/* Timeline Control */}
            <div className="md-timeline-box font-headline">
              <div className="md-corner" style={{ top: 0, left: 0, borderTop: "1px solid var(--gold-mid)", borderLeft: "1px solid var(--gold-mid)" }} />
              <div className="md-corner" style={{ top: 0, right: 0, borderTop: "1px solid var(--gold-mid)", borderRight: "1px solid var(--gold-mid)" }} />
              <div className="md-corner" style={{ bottom: 0, left: 0, borderBottom: "1px solid var(--gold-mid)", borderLeft: "1px solid var(--gold-mid)" }} />
              <div className="md-corner" style={{ bottom: 0, right: 0, borderBottom: "1px solid var(--gold-mid)", borderRight: "1px solid var(--gold-mid)" }} />
              
              <h3 style={{ fontSize: "1.25rem", marginBottom: 24 }}>Timeline: <span style={{ fontWeight: "bold", color: "var(--gold-mid)", fontSize: "1.5rem" }}>{year}</span></h3>
              
              <input 
                type="range" 
                min="1406" max="1420" 
                value={year} 
                onChange={(e) => setYear(parseInt(e.target.value))}
                className="md-slider"
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "rgba(227, 205, 139, 0.8)", marginTop: 8 }}>
                <span>1406 (Start)</span>
                <span>1420 (Completion)</span>
              </div>
            </div>

            {/* Filters */}
            <div className="md-filters">
              {["All", "Summer", "Winter"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSeason(s)}
                  className={`md-filter-btn ${season === s ? "active" : ""}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────── MAP SECTION ──────────────── */}
        <section className="md-map-section">
          <div className="md-map-box">
            
            {/* The Actual Map Content */}
            <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ center: PROJ_CENTER, scale: PROJ_SCALE }}
                width={MAP_W}
                height={MAP_H}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              >
                {/* Vintage map water base */}
                <Sphere stroke="#D4E6F1" strokeWidth={0.5} fill="#DED6C4" />
                <Graticule stroke="#C4BBA7" strokeWidth={0.5} />

                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const isChina = geo.id === "156";
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={isChina ? "#cfc4af" : "#ebded0"}
                          stroke={isChina ? "#a89d85" : "#c4b5a3"}
                          strokeWidth={isChina ? 1 : 0.5}
                          style={{
                            default: { outline: "none" },
                            hover: { outline: "none", fill: isChina ? "#b5a993" : "#d9cdbf" },
                            pressed: { outline: "none" },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>

                {riversGEO && (
                  <Geographies geography={riversGEO}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="none"
                          stroke="#778DA9"
                          strokeWidth={0.8}
                          opacity={0.7}
                          style={{
                            default: { outline: "none" },
                            hover: { outline: "none" },
                            pressed: { outline: "none" },
                          }}
                        />
                      ))
                    }
                  </Geographies>
                )}
              </ComposableMap>

              {/* OVERLAY SVG FOR ROUTES AND MARKERS */}
              <svg
                viewBox={`0 0 ${MAP_W} ${MAP_H}`}
                preserveAspectRatio="xMidYMid meet"
                style={{
                  position: "absolute", top: 0, left: 0,
                  width: "100%", height: "100%",
                  overflow: "visible",
                }}
              >
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Routes */}
                {activeMaterials.map((item, idx) => {
                  const geoPoints = ROUTE_PATHS_GEO[item.Origin];
                  if (!geoPoints) return null;

                  const pathD = getSmoothPath(geoPoints, proj, idx);
                  const thickness = getThickness(item.Thickness);
                  const duration = getPaceAnimationDuration(item.Pace_Of_Movement);
                  const particleCount = item.Thickness === "Thick" ? 4 : (item.Thickness === "Medium" ? 3 : 2);
                  const baseRouteColor = item.Transport_Type === "Water" ? "#1B4F72" : "#7B241C";
                  const baseRouteOpacity = item.Transport_Type === "Water" ? 0.35 : 0.6;

                  return (
                    <g 
                      key={idx}
                      onMouseMove={(e) => handleMouseMove(e, item)}
                      onMouseLeave={handleMouseLeave}
                      style={{ cursor: "pointer" }}
                    >
                      <path d={pathD} fill="none" stroke="transparent" strokeWidth={20} />
                      <path d={pathD} fill="none" stroke={baseRouteColor} strokeWidth={thickness + 1} opacity={baseRouteOpacity} />

                      {Array.from({ length: particleCount }).map((_, pIdx) => (
                        <g key={`p-${pIdx}`}>
                          <text 
                            textAnchor="middle" dominantBaseline="central"
                            fontSize={thickness * 4 + 8} filter="url(#glow)"
                            style={{ userSelect: "none", opacity: 0.95 }}
                          >
                            {getMaterialEmoji(item.Material)}
                          </text>
                          <animateMotion
                            dur={`${duration}s`}
                            repeatCount="indefinite"
                            path={pathD}
                            begin={`${(duration / particleCount) * pIdx + (idx * 0.3)}s`}
                          />
                        </g>
                      ))}
                      
                      <circle cx={proj(geoPoints[0])[0]} cy={proj(geoPoints[0])[1]} r={thickness * 1.8} fill="#FFF" stroke={item.Color} strokeWidth={2.5} />
                      <text x={proj(geoPoints[0])[0]} y={proj(geoPoints[0])[1]} dy={thickness * 2 + 14} textAnchor="middle" fontSize={11} fill="#1a1a1a" fontFamily="inherit" fontWeight="700">
                        {item.Origin.split(" ")[0]}
                      </text>
                    </g>
                  );
                })}

                <g filter="url(#glow)">
                  <circle cx={bx} cy={by} r={9} fill="#4a0e0e" stroke="#e3cd8b" strokeWidth={2.5} />
                  <text x={bx} y={by - 18} textAnchor="middle" fontSize={16} fill="#1a1a1a" fontFamily="inherit" fontWeight="800">
                    Beijing
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </section>

        {/* ──────────────── DATA VISUALIZATIONS ──────────────── */}
        <section className="md-viz-section font-body">
          <div style={{ marginBottom: 80 }}>
            <div style={{ marginBottom: 32 }}>
              <p className="md-viz-subtitle font-headline">Current Visualizations</p>
              <h2 className="md-viz-title font-headline">Logistics routes</h2>
              <div style={{ display: "flex", gap: 24, fontSize: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 24, height: 4, background: "var(--gold-mid)" }}></span> Beijing</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 24, height: 4, background: "orange" }}></span> Summer</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 8, height: 8, background: "red" }}></span> Winter</div>
              </div>
            </div>
            
            <div className="md-chart-container">
              {/* Y Axis Left */}
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 32, display: "flex", flexDirection: "column", justifyContent: "space-between", fontSize: 12, color: "rgba(227, 205, 139, 0.6)", textAlign: "right", paddingRight: 8 }}>
                <span>3,500 000</span><span>3,000 000</span><span>2,500 000</span><span>2,000 000</span><span>1,500 000</span><span>1,000 000</span><span>500 000</span><span>0</span>
              </div>
              {/* Y Axis Right */}
              <div style={{ position: "absolute", right: 0, top: 0, bottom: 32, display: "flex", flexDirection: "column", justifyContent: "space-between", fontSize: 12, color: "rgba(227, 205, 139, 0.6)", textAlign: "left", paddingLeft: 8, borderLeft: "1px solid rgba(212, 175, 55, 0.3)" }}>
                <span>400</span><span>350</span><span>250</span><span>200</span><span>150</span><span>100</span><span>50</span><span>0</span>
              </div>
              {/* X Axis */}
              <div style={{ position: "absolute", bottom: 0, left: 48, right: 48, display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(227, 205, 139, 0.6)", paddingTop: 8 }}>
                <span>Jan</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Dec</span>
              </div>
              
              <svg style={{ width: "100%", height: "100%" }} preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0,80 Q20,90 30,70 T50,60 T70,20 T90,30 L100,50 L100,100 L0,100 Z" fill="rgba(212, 175, 55, 0.2)"></path>
                <path d="M0,80 Q20,90 30,70 T50,60 T70,20 T90,30 L100,50" fill="none" stroke="#d4af37" strokeWidth="0.5"></path>
                <path d="M0,90 Q15,85 25,60 T45,40 T65,10 T85,25 L100,45" fill="none" stroke="#ffaa00" strokeWidth="0.5"></path>
              </svg>
            </div>
            
            <div style={{ display: "flex", border: "1px solid rgba(212, 175, 55, 0.5)", maxWidth: 768, margin: "0 auto" }}>
              <button style={{ flex: 1, padding: 12, background: "transparent", color: "var(--gold-light)", border: "none" }}>All</button>
              <button style={{ flex: 1, padding: 12, background: "rgba(170, 138, 19, 0.4)", color: "var(--gold-light)", border: "none" }}>Winter</button>
            </div>
          </div>

          <div>
            <h2 className="md-viz-title font-headline">Data Visualization</h2>
            <div style={{ position: "relative", width: "100%", height: 300, borderBottom: "1px solid rgba(227, 205, 139, 0.3)", borderLeft: "1px solid rgba(227, 205, 139, 0.3)", paddingLeft: 40, paddingBottom: 32 }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 32, display: "flex", flexDirection: "column", justifyContent: "space-between", fontSize: 12, color: "rgba(227, 205, 139, 0.6)", textAlign: "right", paddingRight: 8 }}>
                <span>1000</span><span>800</span><span>600</span><span>400</span><span>200</span><span>0</span>
              </div>
              <div style={{ position: "absolute", bottom: 0, left: 40, right: 0, display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(227, 205, 139, 0.6)", paddingTop: 8 }}>
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
              </div>
              <svg style={{ width: "100%", height: "100%" }} preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0,85 L10,95 L25,80 L40,65 L50,85 L65,70 L75,75 L85,60 L95,20 L100,15 L100,100 L0,100 Z" fill="rgba(212, 175, 55, 0.15)"></path>
                <path d="M0,85 L10,95 L25,80 L40,65 L50,85 L65,70 L75,75 L85,60 L95,20 L100,15" fill="none" stroke="#d4af37" strokeWidth="0.5"></path>
              </svg>
            </div>
          </div>
        </section>

        {/* ──────────────── ARCHITECTURAL MARVELS ──────────────── */}
        <section className="md-arch-section font-body">
          <div style={{ flex: 1 }}>
            <p className="md-viz-subtitle font-headline">Structural Ingenuity</p>
            <h2 className="font-headline" style={{ fontSize: "clamp(2.25rem, 4vw, 3rem)", color: "var(--gold-light)", lineHeight: 1.2, marginBottom: 24, marginTop: 0 }}>Architectural Marvels:<br/>The Dougong</h2>
            <p style={{ fontSize: "1.125rem", color: "rgba(227, 205, 139, 0.8)", marginBottom: 40, lineHeight: 1.6 }}>
              One of the most remarkable features of imperial architecture is the complete absence of nails. The entire structure is held together by the <em style={{ color: "var(--gold-mid)" }}>Dougong</em> - an intricate system of interlocking wooden brackets.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <div style={{ display: "flex", gap: 16 }}>
                <span className="material-symbols-outlined" style={{ color: "var(--gold-mid)", fontSize: 32 }}>architecture</span>
                <div>
                  <h4 className="font-headline" style={{ fontSize: "1.25rem", color: "var(--gold-light)", margin: "0 0 8px 0" }}>Seismic Resilience</h4>
                  <p style={{ margin: 0, color: "rgba(227, 205, 139, 0.7)", fontSize: "0.875rem", lineHeight: 1.6 }}>The flexibility of the joinery allows the massive buildings to sway and absorb energy during earthquakes.</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <span className="material-symbols-outlined" style={{ color: "var(--gold-mid)", fontSize: 32 }}>precision_manufacturing</span>
                <div>
                  <h4 className="font-headline" style={{ fontSize: "1.25rem", color: "var(--gold-light)", margin: "0 0 8px 0" }}>Precision Craft</h4>
                  <p style={{ margin: 0, color: "rgba(227, 205, 139, 0.7)", fontSize: "0.875rem", lineHeight: 1.6 }}>Each piece is hand-carved to fit with millimeter precision, a testament to thousand-year-old secrets.</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7a0ifSHVAtCZxqsIKfHjopDH6LSPQcgykG9R5PljslocEFKVRKimkIHguVO-YPdoBCFortbO1zmpoMbFUpmY0o3YiX7r-BInRZK_FNUoDJV6q6JaZbfYPP0KpIBID44l70u98JMi15P5fLrtyaGyt-t8IEMxGOuVwFBGEiRhMCiEf0BIdD-zWngx2vmj88fkFOKgryr9emC01x8c37DAxdrZCmss8xhYDSTzmhR0lJMFYSrAhTdOq6HSH9ebRjm1SaBtAb9FKb3DB" 
              alt="Dougong" 
              style={{ width: "100%", maxWidth: 450, mixBlendMode: "screen", opacity: 0.9 }} 
            />
          </div>
        </section>

        {/* ──────────────── CTA ──────────────── */}
        <section className="md-cta">
          <div style={{ position: "relative", zIndex: 10 }}>
            <h2 className="md-cta-title font-headline">Witness the Majesty<br/>Firsthand</h2>
            <div className="md-cta-btns font-headline">
              <button className="md-btn-primary">Plan Your Visit</button>
              <button className="md-btn-ghost">Virtual Gallery</button>
            </div>
          </div>
        </section>
      </main>

      {/* ──────────────── FOOTER ──────────────── */}
      <footer className="md-footer font-body">
        <div className="md-footer-logo font-headline">Imperial Majesty</div>
        <div className="md-footer-links">
          <a href="#heritage" onClick={(e) => e.preventDefault()}>Cultural Heritage</a>
          <a href="#archives" onClick={(e) => e.preventDefault()}>Archives</a>
          <a href="#conservation" onClick={(e) => e.preventDefault()}>Conservation</a>
          <a href="#contact" onClick={(e) => e.preventDefault()}>Contact</a>
          <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy</a>
        </div>
        <p style={{ margin: 0, fontSize: "0.75rem", opacity: 0.7 }}>© 2024 The Digital Pavilion. All Rights Reserved. Preservation of the Ming &amp; Qing Legacies.</p>
      </footer>

      {/* ──────────────── TOOLTIP ──────────────── */}
      {tooltip && (
        <div 
          style={{
            position: "fixed",
            top: tooltip.y + 20,
            left: tooltip.x + 20,
            width: 380,
            background: "#4a0e0e",
            border: "none",
            borderTop: `4px solid ${tooltip.data.Color}`,
            padding: 24,
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
            pointerEvents: "none", 
            zIndex: 100,
            animation: "fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            fontFamily: "'Newsreader', serif"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 14, height: 14, background: tooltip.data.Color }} />
            <h3 style={{ margin: 0, fontSize: 22, color: "#e3cd8b", fontFamily: "'Noto Serif', serif", fontWeight: "700" }}>{tooltip.data.Material}</h3>
          </div>
          
          <div style={{ fontSize: 13, color: "rgba(227, 205, 139, 0.9)", marginBottom: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ gridColumn: "span 2" }}>
              <strong style={{ color: "#e3cd8b", fontWeight: "700" }}>Origin:</strong> 
              <span style={{ marginLeft: 6 }}>{tooltip.data.Origin}</span>
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <strong style={{ color: "#e3cd8b", fontWeight: "700" }}>Transport:</strong> 
              <span style={{ marginLeft: 6 }}>{tooltip.data.Transport_Method}</span>
            </div>
            <div style={{ marginTop: 4 }}>
              <strong style={{ color: "#e3cd8b", fontWeight: "700" }}>Workers:</strong> 
              <span style={{ marginLeft: 6, color: "#ff9d9d" }}>{tooltip.data.Workers}</span>
            </div>
            <div style={{ marginTop: 4 }}>
              <strong style={{ color: "#e3cd8b", fontWeight: "700" }}>Cost:</strong> 
              <span style={{ marginLeft: 6, color: "#d4af37" }}>{tooltip.data.Cost}</span>
            </div>
          </div>
          
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "rgba(227, 205, 139, 0.7)", paddingTop: 16, borderTop: "1px solid rgba(212, 175, 55, 0.2)" }}>
            {tooltip.data.Hover_Description}
          </p>
        </div>
      )}
    </div>
  );
}
