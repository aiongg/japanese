import { Sentence } from '../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface SRSDebugTableProps {
  sentences: Sentence[];
}

export function SRSDebugTable({ sentences }: SRSDebugTableProps) {
  return (
    <div className="mt-8 border rounded-lg p-4 bg-muted/50">
      <h3 className="text-lg font-semibold mb-4">SRS Debug Information</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Front</TableHead>
            <TableHead>Interval</TableHead>
            <TableHead>Ease Factor</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Repetitions</TableHead>
            <TableHead>Times Seen</TableHead>
            <TableHead>Last Response</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sentences.map((sentence) => (
            <TableRow key={sentence.id}>
              <TableCell>{sentence.id}</TableCell>
              <TableCell className="font-japanese">{sentence.sentence.text}</TableCell>
              <TableCell>{sentence.srs.interval}</TableCell>
              <TableCell>{sentence.srs.easeFactor.toFixed(2)}</TableCell>
              <TableCell>{sentence.srs.dueDate ? new Date(sentence.srs.dueDate).toISOString().split('T')[0] : 'New'}</TableCell>
              <TableCell>{sentence.srs.repetitions}</TableCell>
              <TableCell>{sentence.srs.timesSeen}</TableCell>
              <TableCell>{sentence.srs.lastResponse || 'None'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 