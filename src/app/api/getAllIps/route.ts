import { NextResponse } from "next/server";
import { getAllIps } from "@/lib/actions";
import type { IPResponse } from "@/types/ip";

export async function GET() {
  try {
    const data: IPResponse[] = await getAllIps();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json<IPResponse[]>([], { status: 500 });
  }
}
