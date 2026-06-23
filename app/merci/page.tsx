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
✅ Paiement reçu
</h1>

<p>
Vérification en cours...
Vous recevrez un email si le paiement est validé.
</p>

</div>

:

<div>

<h1>
⛔ Paiement non confirmé
</h1>

<p>
Aucun accès n'a été débloqué.
</p>

</div>

}

</main>

);

}