"use client";

export default function Home() {

async function lancerPaiement() {

const res =
await fetch(
"/api/payment",
{
method:"POST"
}
);

const data =
await res.json();

const url =
data?.["v1/transaction"]
?.payment_url;

if(url){

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
background:"#000",
color:"white",
minHeight:"100vh",
position:"relative",
overflow:"hidden"
}}
>

{/* VIDEO FOND */}

<video
autoPlay
muted
loop
playsInline
style={{
position:"absolute",
width:"100%",
height:"100%",
objectFit:"cover",
zIndex:0
}}
>

<source
src="/hero.mp4"
type="video/mp4"
/>

</video>

{/* OVERLAY */}

<div
style={{
position:"absolute",
inset:0,
background:
"linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.8))",
zIndex:1
}}
/>

{/* HEADER */}

<header
style={{
position:"relative",
zIndex:2,
padding:"30px",
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}
>

<div
style={{
fontSize:"32px",
fontWeight:800
}}
>
Galerie
</div>

</header>

{/* HERO */}

<section
style={{
position:"relative",
zIndex:2,
minHeight:"80vh",
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
textAlign:"center",
padding:"20px"
}}
>

<div
style={{
fontSize:"14px",
letterSpacing:"3px",
opacity:.8,
marginBottom:"20px"
}}
>

GALERIE VIDÉO 

</div>

<h1
style={{
fontSize:"clamp(50px,8vw,90px)",
fontWeight:900,
lineHeight:1
}}
>

Vos vidéos,
<br/>

votre accès.

</h1>

<p
style={{
marginTop:"25px",
fontSize:"22px",
maxWidth:"700px",
color:"#d4d4d8"
}}
>

Découvrez plus de 200 vidéos exclusives.

Paiement unique —
accès immédiat —
lien privé valable 30 jours.

</p>

<button
onClick={lancerPaiement}
style={{
marginTop:"40px",
padding:"18px 38px",
border:"none",
borderRadius:"14px",
background:"#15b8ff",
color:"white",
fontWeight:700,
fontSize:"18px",
cursor:"pointer",
boxShadow:
"0 10px 40px rgba(21,184,255,.4)"
}}
>

Accéder maintenant →
<br/>

{process.env.NEXT_PUBLIC_PAYMENT_AMOUNT}
FCFA

</button>

<div
style={{
marginTop:"60px",
display:"grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(220px,1fr))",
gap:"20px",
maxWidth:"1000px",
width:"100%"
}}
>

{[
"Accès immédiat",
"Lien privé",
"Expire après 30 jours"
].map((x)=>(

<div
key={x}
style={{
background:
"rgba(255,255,255,.08)",
padding:"30px",
borderRadius:"20px",
backdropFilter:
"blur(12px)"
}}
>

<h3>
{x}
</h3>

<p
style={{
opacity:.8
}}
>

Profitez de vos vidéos
sans publicité.

</p>

</div>

))}

</div>

</section>

{/* FOOTER */}

<footer
style={{
position:"relative",
zIndex:2,
padding:"40px",
borderTop:
"1px solid rgba(255,255,255,.1)",
textAlign:"center",
color:"#a1a1aa"
}}
>

© 2026 Galerie Vidéo

<br/>

Le lien d'accès est envoyé automatiquement après paiement.

</footer>

</main>

);

}