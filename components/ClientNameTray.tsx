import React from "react";

interface ClientNameTrayProps {
  client: string;
  active: boolean; // Hover state of the parent card
}

export function ClientNameTray({ client, active }: ClientNameTrayProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .client-tray-mobile { display: block; }
        .client-tray-desktop { display: none; }
        @media (min-width: 768px) {
          .client-tray-mobile { display: none; }
          .client-tray-desktop { display: block; }
        }
      `}} />

      {/* 1. Mobile Version: Flat, elegant gold pill-badge */}
      <div 
        className="client-tray-mobile"
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          zIndex: 20,
        }}
      >
        <span 
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "3px 12px",
            borderRadius: "9999px",
            fontSize: "10px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            background: "linear-gradient(135deg, #FFFDF5 0%, #FCE8B3 50%, #F5CE6C 100%)",
            color: "#3D2602",
            border: "1px solid rgba(212, 158, 37, 0.5)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)",
            fontFamily: "var(--font-sans)",
          }}
        >
          {client}
        </span>
      </div>

      {/* 2. Desktop Version: Stunning Straight Golden Brass Plaque */}
      <div 
        className="client-tray-desktop"
        style={{
          position: "absolute",
          top: 0,
          right: "48px",
          zIndex: 20,
          pointerEvents: "none",
          userSelect: "none",
          transform: active ? "translateY(-65%) scale(1.04)" : "translateY(-50%) scale(1)",
          transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
          transformOrigin: "bottom center",
        }}
      >
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Symmetrical Underneath Drop-Shadow */}
          <div 
            style={{
              position: "absolute",
              bottom: "-4px",
              left: "6px",
              right: "6px",
              height: "6px",
              backgroundColor: "rgba(45, 34, 10, 0.35)",
              filter: "blur(2.5px)",
              borderRadius: "50%",
              opacity: active ? 0.6 : 0.8,
              transform: active ? "scaleX(1.05)" : "scaleX(1)",
              transition: "all 300ms ease-out",
            }}
          />

          {/* Front Plaque Panel (Resting Straight, Symmetrical) */}
          <div 
            style={{
              position: "relative",
              padding: "2px 14px",
              background: "linear-gradient(135deg, #FFFDF5 0%, #FCE8B3 30%, #F5CE6C 70%, #D49E25 100%)",
              border: "1.5px solid #D49E25",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "inset 0 1.2px 0 rgba(255,255,255,0.65), 0 2px 4px rgba(45,34,10,0.15)",
              overflow: "hidden",
              borderRadius: "2px",
              width: "112px",
              height: "28px",
            }}
          >
            {/* Elegant Inner Trim Border Accent */}
            <div 
              style={{
                position: "absolute",
                inset: "2px",
                border: "1.2px solid rgba(196, 146, 33, 0.35)",
                borderRadius: "1px",
                pointerEvents: "none"
              }}
            />

            {/* Main Client Name */}
            <span 
              style={{
                fontSize: "10.5px",
                fontFamily: "var(--font-sans), sans-serif",
                fontWeight: 900,
                letterSpacing: "0.14em",
                color: "#3D2602",
                textTransform: "uppercase",
                lineHeight: 1,
                textShadow: "0 0.5px 0 rgba(255, 255, 255, 0.4)",
                position: "relative",
                zIndex: 2,
              }}
            >
              {client}
            </span>

            {/* Sweep Metallic Shine Effect on card hover */}
            <div 
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.65), transparent)",
                transform: active ? "translateX(150%) skewX(-25deg)" : "translateX(-150%) skewX(-25deg)",
                transition: active ? "transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)" : "none",
                zIndex: 3,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
