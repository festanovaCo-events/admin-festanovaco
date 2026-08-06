import type { Guest } from "@/interfaces/components/app/dashboard/guest-list/interfaces";

function escapeCsvField(value: string | number): string {
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function downloadCsv(
  filename: string,
  headers: string[],
  rows: (string | number)[][],
): void {
  const bom = "\uFEFF";
  const content =
    bom +
    [headers, ...rows]
      .map((row) => row.map(escapeCsvField).join(","))
      .join("\n");

  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export interface GuestCsvHeaders {
  name: string;
  seats: string;
  invitationUrl: string;
}

export function downloadGuestsCsv(
  guests: Guest[],
  filename: string,
  headers: GuestCsvHeaders,
): void {
  const rows = guests.map((guest) => [
    guest.name,
    guest.numberOfSeats > 0 ? guest.numberOfSeats : "",
    guest.invitation_url ?? "",
  ]);

  downloadCsv(
    filename,
    [headers.name, headers.seats, headers.invitationUrl],
    rows,
  );
}

function sanitizeFilename(name: string): string {
  return name
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

export function buildGuestListCsvFilename(listName: string): string {
  return `${sanitizeFilename(listName) || "invitados"}-invitados.csv`;
}
