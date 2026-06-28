export default async function Merci({
  searchParams
}:{
  searchParams: Promise<{
    status?: string
  }>
}) {

const params =
await searchParams;

const ok =
params.status==="approved";

return (

<main
style={{
minHeight:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#0f172a",
color:"white"
}}
>

{
ok
?

<div>

<h1>
⛔ Vérifer votre boite Email ou Spam 
</h1>

<p>
Vous recevrez un email si le paiement est validé.
Contenant le lien vers la galerie. Merci
</p>

</div>

:

<div>

<h1>
⛔ Vérifer votre boite Email ou Spam 
</h1>

<p>
Vous recevrez un email si le paiement est validé.
Contenant le lien vers la galerie. Merci
</p>

</div>

}

</main>

);

}