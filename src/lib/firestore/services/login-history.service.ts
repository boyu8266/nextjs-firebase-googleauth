import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { firestore } from "../index";
import {
  LoginHistory,
  ClientLoginHistory,
} from "../models/login-history.model";

export async function recordLogin(
  userId: string,
  provider: string,
): Promise<void> {
  const loginHistoryCollection = firestore.collection("login_history");
  const newLogin: LoginHistory = {
    userId,
    timestamp: FieldValue.serverTimestamp(),
    provider,
  };
  await loginHistoryCollection.add(newLogin);
}

export async function getLoginHistory(
  userId: string,
  limit: number,
  lastDocId?: string,
): Promise<{
  history: (LoginHistory & { id: string })[];
  lastDocId: string | null;
}> {
  let query: FirebaseFirestore.Query = firestore
    .collection("login_history")
    .where("userId", "==", userId)
    .orderBy("timestamp", "desc")
    .limit(limit);

  if (lastDocId) {
    const lastDocSnapshot = await firestore
      .collection("login_history")
      .doc(lastDocId)
      .get();
    if (lastDocSnapshot.exists) {
      query = query.startAfter(lastDocSnapshot);
    }
  }

  const snapshot = await query.get();
  const history: (LoginHistory & { id: string })[] = [];
  let newLastDocId: string | null = null;

  snapshot.docs.forEach((doc) => {
    history.push({ id: doc.id, ...(doc.data() as LoginHistory) });
  });

  if (snapshot.docs.length > 0) {
    newLastDocId = snapshot.docs[snapshot.docs.length - 1].id;
  }

  return { history, lastDocId: newLastDocId };
}

export async function getLoginHistoryCount(userId: string): Promise<number> {
  const snapshot = await firestore
    .collection("login_history")
    .where("userId", "==", userId)
    .count()
    .get();
  return snapshot.data().count;
}

export async function getAllLoginHistory(
  limit: number,
): Promise<ClientLoginHistory[]> {
  const snapshot = await firestore
    .collection("login_history")
    .orderBy("timestamp", "desc")
    .limit(limit)
    .get();

  const history: ClientLoginHistory[] = [];
  snapshot.docs.forEach((doc) => {
    const data = doc.data() as LoginHistory;
    history.push({
      id: doc.id,
      provider: data.provider,
      timestamp: (data.timestamp as Timestamp).toDate(),
    });
  });

  return history;
}
