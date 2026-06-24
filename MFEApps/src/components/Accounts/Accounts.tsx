import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { tableColumnStyles, tableRowStyles, tableStyles } from "./Accounts.styles";
import { Config } from "../../config";

// Transaction Interface
interface ITransaction {
  Serial: number;
  Date: string;
  Balance: number;
  Credit: number;
  Debit: number;
  Description: string;
  TransactedBy: string;
}

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

// Format dates such as "1-Apr-2026" reliably across browsers.
const formatDate = (value: string): string => {
  const match = value.match(/^(\d{1,2})-([A-Za-z]{3,})-(\d{4})$/);
  if (match) {
    const month = MONTHS[match[2].slice(0, 3).toLowerCase()];
    if (month !== undefined) {
      return new Date(Number(match[3]), month, Number(match[1])).toLocaleDateString();
    }
  }
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? value : parsed.toLocaleDateString();
};

// Parse CSV text into rows of fields, honouring quoted fields that may
// contain commas, newlines or escaped double quotes ("").
const parseCSV = (text: string): string[][] => {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
};

const toNumber = (value: string): number =>
  Number((value ?? "").replace(/[^0-9.-]/g, "")) || 0;

const parseCsvToTransactions = (csv: string): ITransaction[] => {
  const rows = parseCSV(csv).filter((cells) => cells.some((c) => c.trim() !== ""));
  if (rows.length < 2) {
    return [];
  }

  const headers = rows[0].map((h) => h.trim());
  const at = (cells: string[], name: string): string => {
    const idx = headers.indexOf(name);
    return idx >= 0 ? cells[idx] ?? "" : "";
  };

  return rows.slice(1).map((cells) => ({
    Serial: toNumber(at(cells, "#")),
    Date: at(cells, "Date").trim(),
    Balance: toNumber(at(cells, "Balance")),
    Credit: toNumber(at(cells, "Credit")),
    Debit: toNumber(at(cells, "Debit")),
    Description: at(cells, "Description").trim(),
    TransactedBy: at(cells, "TransactedBy").trim(),
  }));
};

export const Accounts = () => {
  const [transactions, setTransactions] = React.useState<ITransaction[]>([]);

  React.useEffect(() => {
    const random = Math.floor(Math.random() * 9000 + 1000);
    const separator = Config.AccountsAPI.includes("?") ? "&" : "?";
    fetch(Config.AccountsAPI + separator + "random=" + random)
      .then((response) => response.text())
      .then((text) => {
        const data = parseCsvToTransactions(text);
        const sortedData = data.sort((a, b) => b.Serial - a.Serial);
        setTransactions(sortedData);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={tableStyles} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={tableColumnStyles}>Date</TableCell>
            <TableCell sx={tableColumnStyles} align="left">CR/DR</TableCell>
            <TableCell sx={tableColumnStyles} align="left">Transaction Info</TableCell>
            <TableCell sx={tableColumnStyles} align="left">Purpose</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.filter(x => x.Credit != x.Debit).map((row) => (
            <TableRow key={row.Serial} sx={tableRowStyles}>
              <TableCell align="left">{formatDate(row.Date)}</TableCell>
              <TableCell align="left">{row.Credit - row.Debit} ₹</TableCell>
              <TableCell align="left">{row.TransactedBy}</TableCell>
              <TableCell align="left">{row.Description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
