import { NextResponse } from "next/server";
import { deleteIp } from "@/lib/actions";

export async function DELETE(req: Request) {
  const { id } = await req.json();
  try {
    await deleteIp(+id);
    return NextResponse.json({ status: 200 });
  } catch {
    return NextResponse.json({ error: 'Error borrando' }, { status: 500 });
  }
}