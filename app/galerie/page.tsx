import { prisma } from "@/lib/prisma";
import { videos } from "@/data/videos";

export default async function Galerie({
  searchParams,
}: {
  searchParams: Promise<{
    token?: string;
  }>;
}) {
  const params = await searchParams;

  const token = params.token;

  if (!token) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
        }}
      >
        Accès refusé 🔒
      </div>
    );
  }

  const payment = await prisma.payment.findUnique({
    where: {
      accessKey: token,
    },
  });

  // lien inexistant
  if (!payment) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
        }}
      >
        Lien invalide 🔒
      </div>
    );
  }

  // lien expiré
  if (new Date() > payment.expiresAt) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
          fontSize: "24px",
        }}
      >
        <h1>⏳ Accès expiré</h1>

        <p>
          Votre accès galerie a expiré le{" "}
          {payment.expiresAt.toLocaleDateString("fr-FR")}
        </p>
      </div>
    );
  }

  return (
    <main
      style={{
        background: "#0f172a",
        color: "white",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <h1
        style={{
          fontSize: "40px",
          marginBottom: "10px",
        }}
      >
        🎥 Galerie privée
      </h1>

      <p
        style={{
          color: "#94a3b8",
          marginBottom: "30px",
        }}
      >
        Accès valide jusqu'au{" "}
        {payment.expiresAt.toLocaleDateString("fr-FR")}
      </p>

      <div
        style={{
          display: "grid",
          gap: "30px",
        }}
      >
        {videos.map((video) => (
          <div
            key={video.id}
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "16px",
            }}
          >
            <video
              controls
              controlsList="nodownload"
              width="100%"
              style={{
                borderRadius: "12px",
              }}
            >
              <source src={video.url} type="video/mp4" />
            </video>

            <h2
              style={{
                marginTop: "15px",
              }}
            >
              {video.title}
            </h2>
          </div>
        ))}
      </div>
    </main>
  );
}