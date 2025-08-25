"use client";

import { ClientLoginHistory } from "@/lib/firestore/models/login-history.model";
import { useEffect, useState } from "react";
import { LoginHistoryTable } from "./LoginHistoryTable";

export function LoginHistoryHomeView({ className }: { className?: string }) {
  const [history, setHistory] = useState<ClientLoginHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("/api/login-history");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setHistory(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []); // Empty dependency array ensures this runs once on mount

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-4">Recent Logins</h2>
      <LoginHistoryTable history={history} />
    </div>
  );
}
