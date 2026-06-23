"use client";

export default function Home() {

  async function lancerPaiement() {

  const res = await fetch(
    "/api/payment",
    {
      method: "POST"
    }
  );

  const data =
    await res.json();

  console.log(data);

  const url =
    data?.["v1/transaction"]
      ?.payment_url;

  if (url) {
    window.location.href =
      url;

    return;
  }

  alert(
    "Lien paiement introuvable"
  );
}

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
        background: "#0f172a",
        color: "white"
      }}
    >

      <h1 style={{ fontSize: "42px", fontWeight: "bold" }}>
        +200 Vidéos disponibles
      </h1>

      <p style={{ marginTop: "10px" }}>
        Paiement unique : {process.env.NEXT_PUBLIC_PAYMENT_AMOUNT} FCFA
      </p>

      <button
        onClick={lancerPaiement}
        style={{
          marginTop: "30px",
          padding: "15px 35px",
          backgroundColor: "#22c55e",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer"
        }}
      >
        Payer maintenant
      </button>

      <div style={{ marginTop: "40px", maxWidth: "500px" }}>
        <h2>Instructions après paiement</h2>

        <p>
          Après paiement, vous recevrez automatiquement un email
          contenant le lien vers la galerie vidéo.
          Vérifiez aussi vos spams.
        </p>
      </div>

    </main>
  );
}