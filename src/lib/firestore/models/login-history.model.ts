import { FieldValue, Timestamp } from "firebase-admin/firestore";

export interface LoginHistory {
  userId: string;
  timestamp: FieldValue | Timestamp; // Allow both FieldValue (for writing) and Timestamp (for reading)
  provider: string;
}

// New interface for client-side representation of LoginHistory
export interface ClientLoginHistory {
  id: string; // Document ID from Firestore, useful for keys and cursor-based pagination
  userId: string;
  timestamp: Date; // Converted to Date object for client-side use
  provider: string;
}

// New interface for the API response structure
export interface PaginatedLoginHistory {
  history: ClientLoginHistory[];
  lastDocId: string | null; // The ID of the last document fetched, for the next page's cursor
  totalCount: number; // Total number of records for pagination calculation
}
