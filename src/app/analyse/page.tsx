"use client";

import React from "react";

export default function AnalysePage() {
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
        🔎 Analyse Sync GPT Hub
      </h1>
      <p style={{ fontSize: "18px", maxWidth: "700px", textAlign: "center" }}>
        Cette page servira plus tard à piloter l’agent d’analyse (Alex) dans Sync GPT Hub.
      </p>
    </main>
  );
}
