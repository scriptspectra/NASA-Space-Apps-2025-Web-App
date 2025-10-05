import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface InferenceResult {
  input: Record<string, string>;
  output: {
    label: number[];
    probabilities: Array<Record<string, number>>;
  };
}

interface InferenceResultsTableProps {
  results: InferenceResult[];
  modelType: 'kepler' | 'tess';
}

export function InferenceResultsTable({
  results,
  modelType,
}: InferenceResultsTableProps) {
  if (!results.length) return null;

  const inputKeys = Object.keys(results[0].input);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Row</TableHead>
            {inputKeys.map((key) => (
              <TableHead key={key}>{key}</TableHead>
            ))}
            <TableHead>Prediction</TableHead>
            <TableHead>Confidence</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              {inputKeys.map((key) => (
                <TableCell key={key}>{result.input[key]}</TableCell>
              ))}
              <TableCell>
                <span
                  className={`font-bold ${
                    result.output.label[0] === 1
                      ? 'text-[#2563EB]'
                      : 'text-red-500'
                  }`}
                >
                  {result.output.label[0] === 1
                    ? 'Confirmed Exoplanet'
                    : 'False Positive'}
                </span>
              </TableCell>
              <TableCell>
                {(
                  result.output.probabilities[0][
                    result.output.label[0].toString()
                  ] * 100
                ).toFixed(2)}
                %
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}