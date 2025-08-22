import { NextRequest, NextResponse } from "next/server";
import {
  getLoginHistory,
  getLoginHistoryCount,
} from "@/lib/firestore/services/login-history.service";
import { auth } from "@/app/auth"; // Assuming auth() can be used in API routes for session
import { Timestamp } from "firebase-admin/firestore"; // Import Timestamp for type checking

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const limit = 5; // As per feature requirement
  const searchParams = req.nextUrl.searchParams;
  const lastDocId = searchParams.get("lastDocId") || undefined;

  try {
    const { history, lastDocId: newLastDocId } = await getLoginHistory(
      userId,
      limit,
      lastDocId,
    );
    const totalCount = await getLoginHistoryCount(userId);

    const clientHistory = history.map((record) => ({
      ...record,
      id: record.id, // Use the id directly from the record
      timestamp:
        record.timestamp instanceof Timestamp
          ? record.timestamp.toDate()
          : new Date(), // Convert Firebase Timestamp to Date
    }));

    return NextResponse.json({
      history: clientHistory,
      lastDocId: newLastDocId,
      totalCount,
    });
  } catch (error) {
    console.error("Error fetching login history:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
