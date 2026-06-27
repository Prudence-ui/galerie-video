import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend =
new Resend(
process.env.RESEND_API_KEY
);

export async function POST(
req: Request
){

try{

const body =
await req.json();

console.log(
"WEBHOOK:",
JSON.stringify(
body,
null,
2
)
);

// IMPORTANT → Fedapay envoie entity
const tx =
body?.entity
||
body?.data
||
body;

if(
tx?.status
!==
"approved"
){

return NextResponse.json({
ignored:true
});

}

// email réel
const email =
tx?.customer?.email;

if(
!email
){

console.log(
"EMAIL INTROUVABLE"
);

return NextResponse.json(
{
error:
"email missing"
},
{
status:400
}
);

}

console.log(
"EMAIL:",
email
);

const result =
await resend.emails.send({

from:
"Galerie Vidéo <onboarding@resend.dev>",

to:
[email],

subject:
"🎥 Votre accès galerie",

html:`

<div
style="
font-family:Arial;
padding:20px;
">

<h1>
Merci 🎉
</h1>

<p>
Votre paiement a été confirmé.
</p>

<p>

<a
href="${process.env.GALLERY_URL}"
style="
background:black;
color:white;
padding:12px 20px;
display:inline-block;
text-decoration:none;
border-radius:8px;
">

Accéder à la galerie

</a>

</p>

</div>

`

});

console.log(
"MAIL ENVOYÉ:",
result
);

return NextResponse.json({
success:true
});

}

catch(error){

console.log(
"WEBHOOK ERROR",
error
);

return NextResponse.json(
{
error:true
},
{
status:500
}
);

}

}