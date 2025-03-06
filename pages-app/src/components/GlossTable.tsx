import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface GlossEntry {
  word: string;
  reading: string;
  english: string;
  romaji: string;
}

interface GlossTableProps {
  gloss: GlossEntry[];
}

export function GlossTable({ gloss }: GlossTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Word</TableHead>
          <TableHead>Reading</TableHead>
          <TableHead>Romaji</TableHead>
          <TableHead>English</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {gloss.map((entry, index) => (
          <TableRow key={index}>
            <TableCell>{entry.word}</TableCell>
            <TableCell>{entry.reading !== "-" ? entry.reading : ""}</TableCell>
            <TableCell>{entry.romaji}</TableCell>
            <TableCell>{entry.english}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 