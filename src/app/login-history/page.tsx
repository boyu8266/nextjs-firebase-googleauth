"use client";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Container, Title, Center, Loader, Alert, Paper } from "@mantine/core";
import { LoginHistoryTable } from "@/app/components/LoginHistoryTable";
import { PaginationControls } from "@/app/components/PaginationControls";
import {
  ClientLoginHistory,
  PaginatedLoginHistory,
} from "@/lib/firestore/models/login-history.model";

const PAGE_SIZE = 5;

export default function LoginHistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loginHistory, setLoginHistory] = useState<ClientLoginHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  // lastFetchedDocId will store the ID of the last document of the *current* page
  // This is crucial for Firestore's `startAfter` cursor-based pagination.

  // A map to store the lastDocId for each page, to allow navigating back and forth
  const [pageCursors, setPageCursors] = useState<Map<number, string | null>>(
    new Map([[1, null]]),
  );

  const totalPages = Math.ceil(totalRecords / PAGE_SIZE);

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const fetchHistory = useCallback(async () => {
    if (status !== "authenticated" || !session?.user?.email) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const currentLastDocId = pageCursors.get(currentPage);
      const queryParams = new URLSearchParams({
        limit: String(PAGE_SIZE),
      });

      if (currentLastDocId) {
        queryParams.append("lastDocId", currentLastDocId);
      }

      const response = await fetch(
        `/api/login-history?${queryParams.toString()}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: PaginatedLoginHistory = await response.json();

      setLoginHistory(data.history);
      setTotalRecords(data.totalCount);

      // Update the cursor for the next page
      if (data.history.length > 0) {
        const newCursor = data.history[data.history.length - 1].id;
        setPageCursors((prev) => new Map(prev).set(currentPage + 1, newCursor));
      } else {
        setPageCursors((prev) => new Map(prev).set(currentPage + 1, null));
      }
    } catch (e: unknown) {
      setError(
        e instanceof Error ? e.message : "Failed to fetch login history.",
      );
    } finally {
      setLoading(false);
    }
  }, [currentPage, status, session]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (status === "loading" || loading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" data-testid="loader" />
      </Center>
    );
  }

  if (error) {
    return (
      <Container size="md" my="xl">
        <Alert title="Error" color="red">
          {error}
        </Alert>
      </Container>
    );
  }

  if (status === "unauthenticated") {
    return null; // Redirect handled by useEffect
  }

  return (
    <Container size="md" my="xl">
      <Title order={2} ta="center" mb="lg">
        Login History
      </Title>
      <Paper shadow="xs" p="md">
        <LoginHistoryTable history={loginHistory} />
      </Paper>
      {totalRecords > PAGE_SIZE && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
}
