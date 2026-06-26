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
JSON.stringify(
body,
null,
2
)
);

const tx =
body.data
||
body.entity
||
body;

if(
tx.status
!==
"approved"
){

return NextResponse.json({
ignored:true
});

}

const reference =
tx.reference;

const amount =
tx.amount;

const email =
tx.customer?.email
||
"test@test.com";

// anti doublon
console.log(
"Paiement validé :",
reference
);

await resend.emails.send({

from:
"Galerie <onboarding@resend.dev>",

to:
email,

subject:
"🎥 Accès Galerie",

html:`

<h1>
Paiement confirmé
</h1>

<p>
Votre accès :
</p>

<a href="${process.env.GALLERY_URL}">
Ouvrir la galerie
</a>

`

});

return NextResponse.json({
success:true
});

}

catch(e){

console.log(e);

// IMPORTANT :
return NextResponse.json(
{
ok:true
}
);

}

}