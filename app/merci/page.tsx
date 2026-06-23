export default function MerciPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#020617,#0f172a,#1e293b)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          width: "100%",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          borderRadius: "24px",
          padding: "50px 35px",
          textAlign: "center",
          color: "white",
          boxShadow:
            "0 20px 50px rgba(0,0,0,0.35)",
        }}
      >
        <div
          style={{
            fontSize: "70px",
            marginBottom: "20px",
          }}
        >
          🎉
        </div>

        <h1
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            marginBottom: "18px",
          }}
        >
          Merci pour votre achat
        </h1>

        <p
          style={{
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#d1d5db",
          }}
        >
          Votre paiement a été reçu avec succès.
        </p>

        <p
          style={{
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#d1d5db",
            marginTop: "10px",
          }}
        >
          Vérifiez votre boîte mail ainsi que vos spams.
        </p>

        <div
          style={{
            marginTop: "30px",
            background: "#1e293b",
            padding: "18px",
            borderRadius: "14px",
          }}
        >
          <p
            style={{
              color: "#93c5fd",
              fontWeight: "bold",
            }}
          >
            Le lien d’accès à la galerie vidéo
            vous sera envoyé automatiquement.
          </p>
        </div>

        <p
          style={{
            marginTop: "30px",
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          Si vous ne recevez rien après quelques minutes,
          vérifiez vos courriers indésirables.
        </p>
      </div>
    </main>
  );
}