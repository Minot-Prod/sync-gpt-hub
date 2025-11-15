export default function HomePage() {
  return (
    <main style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "80px 20px",
      fontFamily: "sans-serif"
    }}>
      <h1 style={{ fontSize: "42px", marginBottom: "20px" }}>
        🚀 Sync GPT Hub — Pro Ready
      </h1>
      <p style={{ fontSize: "20px", maxWidth: "600px", textAlign: "center" }}>
        Le hub multi-agents de Sync est bien installé.  
        Utilise le menu ou appelle les endpoints pour tester les agents.
      </p>
    </main>
  );
}
