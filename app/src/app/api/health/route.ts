import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const version = process.env.APP_VERSION ?? "0.1.0";

export async function GET() {
  return NextResponse.json({ status: "ok", version });
}
