import { videos } from "@/data/videos";

export default async function Galerie({
  searchParams
}: {
  searchParams:
  Promise<{
    key?: string
  }>
}) {

const params =
await searchParams;

if (
params.key !==
process.env.NEXT_PUBLIC_ACCESS_KEY
) {
return (

<div
style={{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
fontSize:"24px"
}}
>

Accès refusé 🔒

</div>

);
}

return (

<main
style={{
background:"#0f172a",
color:"white",
minHeight:"100vh",
padding:"40px"
}}
>

<h1
style={{
fontSize:"40px",
marginBottom:"10px"
}}
>

🎥 Galerie privée

</h1>

<p
style={{
color:"#94a3b8",
marginBottom:"30px"
}}
>

+200 vidéos disponibles

</p>

<div
style={{
display:"grid",
gap:"30px"
}}
>

{videos.map(
(video)=>(

<div
key={video.id}
style={{
background:"#1e293b",
padding:"20px",
borderRadius:"16px"
}}
>

<video
controls
controlsList="nodownload"
width="100%"
style={{
borderRadius:"12px"
}}
>

<source
src={video.url}
type="video/mp4"
/>

</video>

<h2
style={{
marginTop:"15px"
}}
>

{video.title}

</h2>

</div>

)
)}

</div>

</main>

);

}