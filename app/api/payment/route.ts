import { NextResponse } from "next/server";

export async function POST() {
  try {

    const response = await fetch(
      "https://api.fedapay.com/v1/transactions",
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer sk_live_v5ac2YBa2BXqIb-eTL06d-VX`,
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          amount: Number(process.env.PAYMENT_AMOUNT),

          description:
            "Accès galerie vidéo",

          currency: {
            iso: "XOF"
          },

          callback_url: `${process.env.SITE_URL}/merci`,

          customer: {
            firstname: "Client",
            lastname: "Test",
            email:
              "test@test.com"
          }
        })
      }
    );

    const data =
      await response.json();

    console.log(
      "FEDAPAY →",
      JSON.stringify(
        data,
        null,
        2
      )
    );

    return NextResponse.json(data);

  } catch (e) {

    console.log(
      "ERREUR →",
      e
    );

    return NextResponse.json(
      {
        error:
          "Erreur backend"
      },

      {
        status: 500
      }
    );
  }
}