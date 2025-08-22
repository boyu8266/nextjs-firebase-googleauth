import { FieldValue } from "firebase-admin/firestore";

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  createdAt: FieldValue;
  lastLoginAt?: FieldValue;
}
