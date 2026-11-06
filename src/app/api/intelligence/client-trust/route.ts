import { NextResponse } from "next/server";
import { ClientTrustRequestSchema } from "@/lib/paymind/intelligence/schemas";
import { assessClientEvidence } from "@/lib/paymind/intelligence/client-trust";
import { productionAuthNotIntegrated } from "@/lib/paymind/intelligence/dev-only";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (productionAuthNotIntegrated()) {
    return NextResponse.json({ error: "Authentication must be connected before enabling this endpoint in production." }, { status: 503 });
  }
  try {
    const body: unknown = await request.json();
    const parsed = ClientTrustRequestSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid request", details: parsed.error.flatten() }, { status: 400 });
    return NextResponse.json(assessClientEvidence(parsed.data), { status: 200, headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not assess the supplied client records." }, { status: 500 });
  }
}
