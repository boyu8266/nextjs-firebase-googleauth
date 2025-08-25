import { getAllLoginHistory } from "@/lib/firestore/services/login-history.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const history = await getAllLoginHistory(10);
    return NextResponse.json(history);
  } catch (err) {
    console.error("Failed to fetch login history:", err);
    return NextResponse.json(
      { error: "Failed to fetch login history" },
      { status: 500 },
    );
  }
}
