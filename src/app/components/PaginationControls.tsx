"use client";
import { Button, Group, Pagination } from "@mantine/core";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  return (
    <Group justify="center" mt="md">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <Pagination
        total={totalPages}
        value={currentPage}
        onChange={onPageChange}
        boundaries={1}
        siblings={1}
      />
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </Group>
  );
}
