import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST() {
  try {

    const data =
      await resend.emails.send({

        from:
          "Galerie Vidéo <onboarding@resend.dev>",

        to:
          ["tchidiprudence7@gmail.com"],

        subject:
          "Accès à votre galerie vidéo",

        html: `
          <div style="
            font-family:sans-serif;
            padding:20px;
          ">

          <h1>
          Merci pour votre achat 🎉
          </h1>

          <p>
          Cliquez ci-dessous :
          </p>

          <a
            href="${process.env.GALLERY_URL}"
          >
            Ouvrir la galerie
          </a>

          </div>
        `
      });

    console.log(data);

    return NextResponse.json({
      success: true
    });

  } catch (e) {

    console.log(e);

    return NextResponse.json(
      {
        success: false
      },

      {
        status: 500
      }
    );
  }
}