import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend =
new Resend(
process.env.RESEND_API_KEY
);

export async function POST(
req: Request
) {

try {

const body =
await req.json();

console.log(
"WEBHOOK FEDAPAY →",
JSON.stringify(
body,
null,
2
)
);

const tx =
body?.entity
||
body?.data
||
body;

const status =
tx?.status;

const amount =
tx?.amount;

const reference =
tx?.reference;

const email =
tx?.customer?.email
||
"test@test.com";

// accepter uniquement paiement approuvé
if (
status !==
"approved"
) {

return NextResponse.json(
{
ignored:true
}
);

}

// anti doublon
const existing =
await prisma.payment.findUnique({
where:{
reference
}
});

if(existing){

return NextResponse.json({
already:true
});

}

await prisma.payment.create({

data:{

email,

amount,

reference,

status

}

});

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

return NextResponse.json(
{
success:true
}
);

}

catch(e){

console.log(
"WEBHOOK ERROR",
e
);

return NextResponse.json(
{
error:true
},
{
status:200
}
);

}

}