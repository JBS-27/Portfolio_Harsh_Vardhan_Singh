import { NextResponse } from "next/server";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message || !isEmail(email)) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "ui23cs25@iiitsurat.ac.in";
  const formspree = process.env.FORMSPREE_FORM_ID;

  if (resendKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `Portfolio note from ${name}`,
        text: `${message}\n\n— ${name} (${email})`,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Resend failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  }

  if (formspree) {
    const response = await fetch(`https://formspree.io/f/${formspree}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Formspree failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true, fallback: "mailto" });
}
