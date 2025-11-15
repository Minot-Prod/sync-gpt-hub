"use client";

import React from "react";

export default function CoachPage() {
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
        🧠 Coach Prospection (Sam)
      </h1>
      <p style={{ fontSize: "18px", maxWidth: "700px", textAlign: "center" }}>
        Ici tu pourras plus tard piloter l’agent Sam pour structurer ta prospection.
      </p>
    </main>
  );
}
