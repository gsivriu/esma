import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toEmail) {
    return NextResponse.json(
      { error: "Configurare server incompletă." },
      { status: 500 }
    );
  }

  try {
    const { optiune, nume, prenume, email, telefon, mesaj } =
      await request.json();

    if (!optiune || !nume || !prenume || !email || !telefon || !mesaj) {
      return NextResponse.json(
        { error: "Câmpurile obligatorii lipsesc." },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);

    const html = `
      <p><strong>Opțiune:</strong> ${optiune}</p>
      <p><strong>Nume:</strong> ${nume}</p>
      <p><strong>Prenume:</strong> ${prenume}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${telefon}</p>
      ${mesaj ? `<p><strong>Mesaj:</strong> ${mesaj}</p>` : ""}
    `;

    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: toEmail,
      subject: `Mesaj nou de la ${nume} ${prenume}`,
      html,
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Eroare la trimiterea mesajului." },
      { status: 500 }
    );
  }
}
