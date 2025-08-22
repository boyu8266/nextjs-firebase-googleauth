import { FieldValue } from "firebase-admin/firestore";

export interface LoginHistory {
  userId: string;
  timestamp: FieldValue;
  provider: string;
}
