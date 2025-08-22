import { FieldValue } from "firebase-admin/firestore";
import { firestore } from "../index";
import { LoginHistory } from "../models/login-history.model";

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
