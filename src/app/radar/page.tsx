"use client";

import React from "react";

export default function RadarPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 20px",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
        📡 Radar opportunités (Zoé)
      </h1>
      <p style={{ fontSize: "18px", maxWidth: "700px", textAlign: "center" }}>
        Ici, Zoé mettra en forme les idées d’usage, scénarios avant/après et radars de secteurs.
      </p>
    </main>
  );
}
