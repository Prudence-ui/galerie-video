import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(
  req: Request
) {

try {

const body =
await req.json();

console.log(
"WEBHOOK :",
JSON.stringify(
body,
null,
2
)
);

// structure réelle Fedapay
const tx =
body?.data
||
body;

const status =
tx?.status;

if(
status !==
"approved"
){

return NextResponse.json({
ignored:true
});

}

// récupération email
const email =

tx?.customer?.email
||

tx?.metadata?.email
||

tx?.email;

if(
!email
){

console.log(
"AUCUN EMAIL"
);

return NextResponse.json(
{
error:
"email manquant"
},
{
status:400
}
);

}

console.log(
"EMAIL →",
email
);

const result =
await resend.emails.send({

from:
"Galerie Vidéo <onboarding@resend.dev>",

to:
[email],

subject:
"🎥 Accès Galerie",

html:`

<div
style="
font-family:Arial;
padding:20px;
"
>

<h1>
Merci 🎉
</h1>

<p>
Votre paiement est confirmé.
</p>

<a
href="${process.env.GALLERY_URL}"
style="
padding:12px 20px;
background:black;
color:white;
text-decoration:none;
border-radius:8px;
display:inline-block;
"
>

Ouvrir la galerie

</a>

</div>

`

});

console.log(
"EMAIL ENVOYÉ :",
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