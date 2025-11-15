"use client";

import React from "react";

export default function MessagesPage() {
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
        💬 Bibliothèque de messages
      </h1>
      <p style={{ fontSize: "18px", maxWidth: "700px", textAlign: "center" }}>
        Cette page accueillera les scripts, séquences et modèles produits par les agents.
      </p>
    </main>
  );
}
