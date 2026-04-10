import { useState, useMemo, useEffect } from "react";
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

// Expand bounding box for Central Asia (Badakhshan) & China
const MAP_W   = 1200;
const MAP_H   = 700;
const PROJ_CENTER = [100, 38]; 
const PROJ_SCALE  = 650;

const makeProjection = () =>
  geoMercator()
    .center(PROJ_CENTER)
    .scale(PROJ_SCALE)
    .translate([MAP_W / 2, MAP_H / 2]);

// Accurate multiple-point paths representing rivers, canals, and trade routes
const ROUTE_PATHS_GEO = {
  "Sichuan, Guizhou, Yunnan (SW Jungles)": [
    [104.0, 26.5], // Origin
    [106.5, 29.5], // Chongqing/Yangtze
    [114.3, 30.6], // Wuhan/Yangtze
    [118.8, 32.0], // Nanjing
    [119.1, 33.5], // Grand Canal South (Offset)
    [117.1, 36.5], // Grand Canal Mid (Offset)
    [116.2, 39.8]  // Beijing Arrival (Offset)
  ],
  "Suzhou": [
    [120.6, 31.3], // Suzhou
    [119.5, 33.5], // Grand Canal South
    [117.5, 36.5], // Grand Canal Mid
    [116.4, 39.9]  // Beijing Arrival 
  ],
  "Yangtze River Delta (Southern China)": [
    [119.0, 30.0],
    [120.0, 31.5],
    [119.9, 33.5], // Grand Canal proxy (Offset)
    [117.9, 36.5],
    [116.6, 39.8] // Beijing Arrival (Offset)
  ],
  "Fangshan District (Local, SW of Beijing)": [
    [115.8, 39.6],
    [116.4, 39.9]
  ],
  "Shandong & Mentougou": [
    [118.0, 36.5],
    [118.0, 38.0],
    [116.8, 39.8]
  ],
  "Hunan & Guizhou": [
    [110.0, 27.5], // Origin
    [112.0, 31.0], // Overland route Central China
    [114.0, 35.0], 
    [116.4, 39.9]
  ],
  "Badakhshan": [
    [71.0, 37.0],  // Badakhshan
    [76.0, 39.5],  // Kashgar
    [89.0, 43.0],  // Turpan
    [94.0, 40.0],  // Dunhuang
    [103.0, 36.0], // Lanzhou
    [109.0, 38.0], // Ordos loop
    [116.4, 39.9]
  ],
  "Beijing Mountains": [
    [115.8, 40.5],
    [116.4, 39.9]
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

// Smooth path generation for continuous segmented routes
function getSmoothPath(geoPoints, proj) {
  if (!geoPoints || geoPoints.length === 0) return "";
  const points = geoPoints.map(proj);
  if (points.length === 1) return `M${points[0][0]},${points[0][1]}`;
  if (points.length === 2) {
      const [start, end] = points;
      const midX = (start[0] + end[0]) / 2;
      const midY = (start[1] + end[1]) / 2;
      const curveFactor = 0.15;
      const cpX = midX + (start[1] - end[1]) * curveFactor;
      const cpY = midY - (start[0] - end[0]) * curveFactor;
      return `M${start[0]},${start[1]} Q${cpX},${cpY} ${end[0]},${end[1]}`;
  }
  
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const xc = (points[i][0] + points[i + 1][0]) / 2;
    const yc = (points[i][1] + points[i + 1][1]) / 2;
    d += ` Q${points[i][0]},${points[i][1]} ${xc},${yc}`;
  }
  d += ` L${points[points.length - 1][0]},${points[points.length - 1][1]}`;
  return d;
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function ForbiddenCityMap() {
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

  const [bx, by] = proj([116.4, 39.9]); // Beijing

  return (
    <div style={{
      width: "100%",
      height: "100vh",
      background: "#fef9f0",
      color: "#1d1c16",
      fontFamily: "'Newsreader', serif",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden"
    }}>

      {/* ──────────────── HEADER & CONTROLS ──────────────── */}
      <header style={{
        flex: "0 0 auto",
        textAlign: "center",
        padding: "30px 24px 20px",
        background: "rgba(254, 249, 240, 0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: "none",
        zIndex: 10,
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h1 style={{
            margin: "0 0 16px",
            fontSize: "clamp(32px, 5vw, 64px)",
            fontFamily: "'Noto Serif', serif",
            fontWeight: 800,
            color: "#1d1c16",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}>
            故宫AI
          </h1>

          {/* CONTROLS */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            
            {/* Year Range Slider */}
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              gap: 12, 
              width: "100%", 
              maxWidth: 500, 
              background: "#ffffff", 
              padding: "16px 32px", 
              borderRadius: 0, 
              boxShadow: "0 20px 50px rgba(29, 28, 22, 0.06)",
              border: "none",
            }}>
              <label style={{ fontSize: 16, color: "#5a413d", fontFamily: "'Noto Serif', serif", fontWeight: "700" }}>
                Timeline: <span style={{ color: "#1d1c16", fontSize: 20, marginLeft: 4 }}>{year}</span>
              </label>
              <input 
                type="range" 
                min="1406" max="1420" 
                value={year} 
                onChange={(e) => setYear(parseInt(e.target.value))}
                style={{
                  width: "100%",
                  accentColor: "#840101",
                  cursor: "pointer",
                  height: 6
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%", fontSize: 13, color: "#5a413d", fontWeight: 500 }}>
                <span>1406 (Start)</span>
                <span>1420 (Completion)</span>
              </div>
            </div>

            {/* Season Toggle */}
            <div style={{ display: "flex", gap: 8 }}>
              {["All", "Summer", "Winter"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSeason(s)}
                  style={{
                    padding: "10px 24px",
                    background: season === s ? "linear-gradient(135deg, #840101, #a62116)" : "transparent",
                    border: season === s ? "1px solid transparent" : "1px solid rgba(142, 112, 108, 0.15)",
                    borderRadius: 0,
                    color: season === s ? "#ffffff" : "#840101",
                    cursor: "pointer",
                    fontSize: 14,
                    fontFamily: "'Newsreader', serif",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: season === s ? "0 4px 12px rgba(132, 1, 1, 0.2)" : "none"
                  }}
                  onMouseOver={(e) => { 
                    if (season !== s) {
                      e.currentTarget.style.background = "rgba(115, 92, 0, 0.08)";
                      e.currentTarget.style.color = "#735c00";
                    }
                  }}
                  onMouseOut={(e) => { 
                    if (season !== s) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#840101";
                    }
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ──────────────── MAP CONTAINER ──────────────── */}
      <div style={{ flex: 1, position: "relative", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        
        <div style={{ width: "100%", height: "100%", position: "absolute" }}>
          
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ center: PROJ_CENTER, scale: PROJ_SCALE }}
            width={MAP_W}
            height={MAP_H}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          >
            {/* Blue Water Base */}
            <Sphere stroke="#D4E6F1" strokeWidth={0.5} fill="#eaf2f8" />
            <Graticule stroke="#d0dee5" strokeWidth={0.5} />

            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const isChina = geo.id === "156";
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isChina ? "#F5F3E9" : "#ffffff"}
                      stroke={isChina ? "#cfc7b4" : "#e6e6e6"}
                      strokeWidth={isChina ? 1 : 0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: isChina ? "#f0ede0" : "#fdfdfd" },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {/* Rivers details for topography */}
            {riversGEO && (
              <Geographies geography={riversGEO}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="none"
                      stroke="#a9cce3"
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

              const pathD = getSmoothPath(geoPoints, proj);
              const thickness = getThickness(item.Thickness);
              const duration = getPaceAnimationDuration(item.Pace_Of_Movement);

              // Calculate number of particles based on thickness
              const particleCount = item.Thickness === "Thick" ? 4 : (item.Thickness === "Medium" ? 3 : 2);
              
              // Base route color indicating river/canal vs land transport
              const baseRouteColor = item.Transport_Type === "Water" ? "#3498db" : "#bdc3c7";
              const baseRouteOpacity = item.Transport_Type === "Water" ? 0.35 : 0.6;

              return (
                <g 
                  key={idx}
                  onMouseMove={(e) => handleMouseMove(e, item)}
                  onMouseLeave={handleMouseLeave}
                  style={{ cursor: "pointer" }}
                >
                  {/* Invisible hit area for easier hovering */}
                  <path 
                    d={pathD} 
                    fill="none" 
                    stroke="transparent" 
                    strokeWidth={20}
                  />

                  {/* Explicit transport paths forming the logistics network */}
                  <path 
                    d={pathD} 
                    fill="none" 
                    stroke={baseRouteColor} 
                    strokeWidth={thickness + 1} 
                    opacity={baseRouteOpacity} 
                  />

                  {/* Moving Particles */}
                  {Array.from({ length: particleCount }).map((_, pIdx) => (
                    <g key={`p-${pIdx}`}>
                      <text 
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={thickness * 4 + 8}
                        filter="url(#glow)"
                        style={{ userSelect: "none", opacity: 0.95 }}
                      >
                        {getMaterialEmoji(item.Material)}
                      </text>
                      <animateMotion
                        dur={`${duration}s`}
                        repeatCount="indefinite"
                        path={pathD}
                        begin={`${(duration / particleCount) * pIdx}s`}
                      />
                    </g>
                  ))}
                  
                  {/* Origin Marker */}
                  <circle 
                    cx={proj(geoPoints[0])[0]} 
                    cy={proj(geoPoints[0])[1]} 
                    r={thickness * 1.8} 
                    fill="#FFF"
                    stroke={item.Color}
                    strokeWidth={2.5}
                    opacity={1.0}
                  />
                  <text 
                    x={proj(geoPoints[0])[0]} 
                    y={proj(geoPoints[0])[1]} 
                    dy={thickness * 2 + 14}
                    textAnchor="middle" 
                    fontSize={11} 
                    fill="#4a5568" 
                    fontFamily="inherit" 
                    fontWeight="700"
                  >
                    {item.Origin.split(" ")[0]}
                  </text>
                </g>
              );
            })}

            {/* Beijing Marker */}
            <g filter="url(#glow)">
              <circle cx={bx} cy={by} r={9} fill="#e74c3c" stroke="#FFF" strokeWidth={2.5} />
              <text x={bx} y={by - 18} textAnchor="middle" fontSize={16} fill="#1a1a1a" fontFamily="inherit" fontWeight="800">
                Beijing
              </text>
            </g>
          </svg>
        </div>

      </div>

      {/* ──────────────── TOOLTIP ──────────────── */}
      {tooltip && (
        <div 
          style={{
            position: "fixed",
            top: tooltip.y + 20,
            left: tooltip.x + 20,
            width: 380,
            background: "#ffffff",
            border: "none",
            borderTop: `4px solid ${tooltip.data.Color}`,
            borderRadius: 0,
            padding: 24,
            boxShadow: "0 20px 50px rgba(29, 28, 22, 0.08)",
            pointerEvents: "none", 
            zIndex: 100,
            animation: "fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 14, height: 14, borderRadius: 0, background: tooltip.data.Color }} />
            <h3 style={{ margin: 0, fontSize: 22, color: "#1d1c16", fontFamily: "'Noto Serif', serif", fontWeight: "700", letterSpacing: "0.02em" }}>{tooltip.data.Material}</h3>
          </div>
          
          <div style={{ fontSize: 14, color: "#5a413d", marginBottom: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontFamily: "'Newsreader', serif" }}>
            <div style={{ gridColumn: "span 2" }}>
              <strong style={{ color: "#1d1c16", fontWeight: "700" }}>Origin:</strong> 
              <span style={{ marginLeft: 6 }}>{tooltip.data.Origin}</span>
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <strong style={{ color: "#1d1c16", fontWeight: "700" }}>Transport:</strong> 
              <span style={{ marginLeft: 6 }}>{tooltip.data.Transport_Method}</span>
            </div>
            <div style={{ marginTop: 4 }}>
              <strong style={{ color: "#1d1c16", fontWeight: "700" }}>Workers:</strong> 
              <span style={{ marginLeft: 6, color: "#840101" }}>{tooltip.data.Workers}</span>
            </div>
            <div style={{ marginTop: 4 }}>
              <strong style={{ color: "#1d1c16", fontWeight: "700" }}>Cost:</strong> 
              <span style={{ marginLeft: 6, color: "#735c00" }}>{tooltip.data.Cost}</span>
            </div>
          </div>
          
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#5a413d", paddingTop: 16, borderTop: "1px solid rgba(142, 112, 108, 0.15)", fontFamily: "'Newsreader', serif" }}>
            {tooltip.data.Hover_Description}
          </p>
        </div>
      )}

      {/* ──────────────── GLOBAL STYLES ──────────────── */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
