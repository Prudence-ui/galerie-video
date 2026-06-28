import { NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

const resend =
new Resend(
process.env.RESEND_API_KEY!
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

const email =
tx?.customer?.email;

if(
!email
){

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

const reference =
String(
tx.reference
);

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

const accessKey =
crypto
.randomBytes(32)
.toString("hex");

const expiresAt =
new Date();

expiresAt.setDate(
expiresAt.getDate()
+
30
);

await prisma.payment.create({

data:{

email:
String(email),

reference,

amount:
Number(
tx.amount
),

status:
"paid",

accessKey,

expiresAt

}

});

const galleryUrl =
`${process.env.SITE_URL}/galerie?token=${accessKey}`;

const result =
await resend.emails.send({

from:
"Galerie <onboarding@resend.dev>",

to:
[email],

subject:
"🎥 Accès à votre galerie",

html:`

<div style="font-family:sans-serif">

<h1>
Merci pour votre achat 🎉
</h1>

<p>
Votre accès est actif jusqu'au
<b>
${expiresAt.toLocaleDateString("fr-FR")}
</b>
</p>

<a
href="${galleryUrl}"
style="
display:inline-block;
padding:12px 18px;
background:black;
color:white;
text-decoration:none;
border-radius:8px;
"
>
Ouvrir la galerie
</a>

</div>

`

});

console.log(
"MAIL:",
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