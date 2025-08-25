import { FieldValue, Timestamp } from "firebase-admin/firestore";

export interface LoginHistory {
  userId: string;
  timestamp: FieldValue | Timestamp;
  provider: string;
}

export interface ClientLoginHistory {
  id: string;
  timestamp: Date;
  provider: string;
}

export interface PaginatedLoginHistory {
  history: ClientLoginHistory[];
  lastDocId: string | null;
  totalCount: number;
}
