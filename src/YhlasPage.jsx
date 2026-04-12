import React from "react";
import { useNavigate } from "react-router-dom";

export default function YhlasPage() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = React.useState(null);

  return (
    <div className="yhlas-page-root">
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Newsreader:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap"
        rel="stylesheet"
      />
      
      <style>{`
        .yhlas-page-root {
          min-height: 100vh;
          background: #fef9f0;
          font-family: 'Newsreader', serif;
          color: #1d1c16;
        }
        
        .font-headline { font-family: 'Noto Serif', serif; }

        /* HEADER */
        .header {
          width: 100%;
          background-color: rgba(254, 249, 240, 0.9);
          backdrop-filter: blur(20px);
          padding: 24px 48px;
          position: fixed;
          top: 0;
          z-index: 50;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #840101;
        }
        .nav {
          display: none;
          gap: 48px;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        @media (min-width: 768px) { .nav { display: flex; } }
        
        .nav a { 
          text-decoration: none; 
          color: #1d1c16; 
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
          position: relative;
          padding: 4px 0;
          cursor: pointer;
        }
        .nav a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #840101;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav a:hover { 
          color: #840101; 
          transform: translateY(-2px);
        }
        .nav a:hover::after {
          width: 100%;
        }
        .nav a.active {
          color: #840101;
        }
        .nav a.active::after {
          width: 100%;
          background-color: #840101;
        }

        .back-btn {
          padding: 8px 24px;
          background: #840101;
          color: #fff;
          border: none;
          cursor: pointer;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          transition: all 0.5s;
        }
        .back-btn:hover { background: #735c00; }

        .content {
          padding-top: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .title {
          font-size: clamp(3rem, 8vw, 6rem);
          color: #840101;
          margin-bottom: 24px;
        }
      `}</style>

      <header className="header">
        <div className="font-headline" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          故宫 AI
        </div>
        <nav className="nav font-headline">
          <a href="/#introduction" className={activeNav === "Introduction" ? "active" : ""} onClick={() => setActiveNav("Introduction")}>Introduction</a>
          <a href="/#interactive" className={activeNav === "Interactive" ? "active" : ""} onClick={() => setActiveNav("Interactive")}>Interactive</a>
          <a href="/#structure" className={activeNav === "Structure" ? "active" : ""} onClick={() => setActiveNav("Structure")}>Structure</a>
        </nav>
        <button className="back-btn font-headline" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </header>

      <main className="content">
        <h1 className="title font-headline">Yhlas — Coming Soon</h1>
        <p style={{ fontSize: "1.5rem", color: "#5a413d", fontStyle: "italic" }}>
          Expansion in progress...
        </p>
      </main>
    </div>
  );
}
