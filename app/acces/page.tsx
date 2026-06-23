export default function AccesPage() {
  const ok =
    process.env.NEXT_PUBLIC_ACCESS_KEY;

  return (
    <main
      style={{
        background:"#020617",
        color:"white",
        minHeight:"100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
        padding:"30px"
      }}
    >
      <h1>
        Accès validé 🎉
      </h1>

      <a
        href={`/galerie?key=${ok}`}
        style={{
          marginTop:"20px",
          background:"#2563eb",
          padding:"14px 28px",
          borderRadius:"10px"
        }}
      >
        Ouvrir la galerie
      </a>
    </main>
  );
}