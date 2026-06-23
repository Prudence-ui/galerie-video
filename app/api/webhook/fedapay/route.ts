import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// helper sécurité simple
function isValidPayment(data: any) {
  return (
    data &&
    data.status === "approved" &&
    data.amount &&
    data.reference
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const transaction =
      body?.data || body;

    // 🔐 1. Vérification anti fake payment
    if (!isValidPayment(transaction)) {
      return NextResponse.json(
        { error: "Invalid payment" },
        { status: 400 }
      );
    }

    const email =
      transaction?.customer?.email;

    const amount =
      transaction?.amount;

    const reference =
      transaction?.reference;

    if (!email || !reference) {
      return NextResponse.json(
        { error: "Missing data" },
        { status: 400 }
      );
    }

    // 🔐 2. éviter doublons (anti replay attack)
    const existing =
      await prisma.payment.findUnique({
        where: { reference }
      });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Already processed"
      });
    }

    // 💾 3. sauvegarde en base
    await prisma.payment.create({
      data: {
        email,
        amount,
        reference,
        status: "paid"
      }
    });

    // 📩 4. envoi email automatique
    await resend.emails.send({
      from: "Galerie Vidéo <onboarding@resend.dev>",
      to: email,
      subject: "🎥 Accès à votre galerie vidéo",
      html: `
        <div style="font-family:Arial;padding:20px">
          <h1>Merci pour votre achat 🎉</h1>

          <p>Votre paiement a été validé avec succès.</p>

          <p>Voici votre accès :</p>

          <a href="${process.env.SITE_URL}/acces" 
             style="display:inline-block;margin-top:10px;padding:10px 20px;background:black;color:white;text-decoration:none;border-radius:8px;">
            Accéder à la galerie
          </a>

          <p style="margin-top:20px;font-size:12px;color:gray;">
            Si vous n’êtes pas à l’origine de cet achat, ignorez cet email.
          </p>
        </div>
      `,
    });

    // ✅ réponse OK
    return NextResponse.json({
      success: true
    });

  } catch (error) {
    console.log("WEBHOOK ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}