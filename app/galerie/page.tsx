import { prisma } from "@/lib/prisma";
import { videos } from "@/data/videos";

export default async function Galerie({
  searchParams
}: {
  searchParams: Promise<{
    token?: string
  }>
}) {

const params =
await searchParams;

const token =
params.token;

if(!token){

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

Lien invalide 🔒

</div>

);

}

const payment =
await prisma.payment.findUnique({

where:{
accessKey: token
}

});

if(
!payment
||
new Date()
>
payment.expiresAt
){

return (

<div
style={{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
fontSize:"24px",
flexDirection:"column",
gap:"10px"
}}
>

<h1>
Accès expiré ⛔
</h1>

<p>
Votre accès à la galerie a expiré.
</p>

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

<h1>
🎥 Galerie privée
</h1>

<p>
Accès valable jusqu’au{" "}
{
new Date(
payment.expiresAt
).toLocaleDateString(
"fr-FR"
)
}
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
>

<source
src={video.url}
type="video/mp4"
/>

</video>

<h2>
{video.title}
</h2>

</div>

)
)}

</div>

</main>

);

}