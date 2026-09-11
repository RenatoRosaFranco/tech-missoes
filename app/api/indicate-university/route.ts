const limits = {
  university: 120,
  website: 200,
  name: 80,
  email: 120,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function asWebsite(value: string) {
  const raw = value.includes("://") ? value : `https://${value}`;
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    if (!url.hostname.includes(".")) return "";
    return url.toString();
  } catch {
    return "";
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Não foi possível ler a indicação." }, { status: 400 });
  }

  const payload = body && typeof body === "object" ? body as Record<string, unknown> : {};
  const university = asText(payload.university, limits.university);
  const website = asWebsite(asText(payload.website, limits.website));
  const name = asText(payload.name, limits.name);
  const email = asText(payload.email, limits.email).toLowerCase();

  if (university.length < 2) return Response.json({ error: "Digite o nome da universidade." }, { status: 400 });
  if (!website) return Response.json({ error: "Digite um website válido." }, { status: 400 });
  if (name.length < 2) return Response.json({ error: "Digite o nome de quem está indicando." }, { status: 400 });
  if (!emailPattern.test(email)) return Response.json({ error: "Digite um e-mail válido." }, { status: 400 });

  return Response.json({ ok: true });
}
