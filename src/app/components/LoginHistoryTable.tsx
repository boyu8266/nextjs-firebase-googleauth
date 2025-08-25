"use client";
import { Table, Text } from "@mantine/core";
import { ClientLoginHistory } from "@/lib/firestore/models/login-history.model";

interface LoginHistoryTableProps {
  history: ClientLoginHistory[];
}

export function LoginHistoryTable({ history }: LoginHistoryTableProps) {
  const rows = history.map((record) => (
    <Table.Tr key={record.id}>
      <Table.Td suppressHydrationWarning>
        {record.timestamp.toLocaleString()}
      </Table.Td>
      <Table.Td>{record.provider}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Timestamp</Table.Th>
          <Table.Th>Provider</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {rows.length > 0 ? (
          rows
        ) : (
          <Table.Tr>
            <Table.Td colSpan={2}>
              <Text ta="center" py="md">
                No login history found.
              </Text>
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  );
}
