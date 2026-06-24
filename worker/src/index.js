import {EmailMessage} from "cloudflare:email";

const ALLOWED_ORIGINS = ["https://www.jasutim.org", "https://jasutim.org"];
const FROM = "form@jasutim.org";
const FROM_NAME = "JASUTIM Website";
const TO = "yayasanjasutim@gmail.com";

function cors(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {"Content-Type": "application/json", ...cors(origin)},
  });
}

// Strip CR/LF from header values to prevent header injection.
const oneLine = (s) => String(s || "").replace(/[\r\n]+/g, " ").trim();

function buildMime({name, organization, email, message}) {
  const id = crypto.randomUUID();
  const body =
    `Pesan baru dari form kontak jasutim.org\r\n\r\n` +
    `Nama       : ${name}\r\n` +
    `Organisasi : ${organization || "-"}\r\n` +
    `Email      : ${email}\r\n\r\n` +
    `Pesan:\r\n${message}\r\n`;

  return [
    `From: ${FROM_NAME} <${FROM}>`,
    `To: <${TO}>`,
    `Reply-To: <${oneLine(email)}>`,
    `Message-ID: <${id}@jasutim.org>`,
    `Date: ${new Date().toUTCString()}`,
    `Subject: Kontak Website JASUTIM — ${oneLine(name)}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset=utf-8`,
    ``,
    body,
  ].join("\r\n");
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") return new Response(null, {status: 204, headers: cors(origin)});
    if (request.method !== "POST") return json({success: false, error: "Method not allowed"}, 405, origin);

    try {
      const data = await request.json();

      // Honeypot — silently accept bots.
      if (data.botcheck) return json({success: true}, 200, origin);

      const name = oneLine(data.name);
      const organization = oneLine(data.organization);
      const email = oneLine(data.email);
      const message = String(data.message || "").trim().replace(/\r?\n/g, "\r\n");

      if (!name || !email || !message) {
        return json({success: false, error: "Missing required fields"}, 400, origin);
      }

      const raw = buildMime({name, organization, email, message});
      await env.SEB.send(new EmailMessage(FROM, TO, raw));
      return json({success: true}, 200, origin);
    } catch (err) {
      return json({success: false, error: (err && err.message) || String(err)}, 500, origin);
    }
  },
};
