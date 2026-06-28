import { videos } from "@/data/videos";
import { prisma } from "@/lib/prisma";

export default async function Galerie({
searchParams
}:{
searchParams:
Promise<{
token?:string
}>
}){

const params =
await searchParams;

const token =
params.token;

if(
!token
){

return(

<div
style={{

height:"100vh",

display:"flex",

justifyContent:"center",

alignItems:"center"

}}
>

Accès refusé 🔒

</div>

);

}

const access =
await prisma.payment.findFirst({

where:{

accessKey:
token,

expiresAt:{

gt:
new Date()

}

}

});

if(
!access
){

return(

<div
style={{

height:"100vh",

display:"flex",

justifyContent:"center",

alignItems:"center"

}}
>

Lien expiré 🔒

</div>

);

}

return(

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

Accès valide jusqu'au{" "}
{
access.expiresAt
.toLocaleDateString(
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

{

videos.map(
(video)=>(

<div
key={
video.id
}
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
src={
video.url
}
type="video/mp4"
/>

</video>

<h2>

{
video.title
}

</h2>

</div>

)

)

}

</div>

</main>

);

}