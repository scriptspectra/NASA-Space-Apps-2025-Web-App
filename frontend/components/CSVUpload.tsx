import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import Papa from 'papaparse';

interface CSVUploadProps {
  onDataParsed: (data: Array<Record<string, string>>) => void;
  expectedHeaders: string[];
}

export function CSVUpload({ onDataParsed, expectedHeaders }: CSVUploadProps) {
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);

    if (!file) {
      setError('Please select a file');
      return;
    }

    if (file.type !== 'text/csv') {
      setError('Please upload a CSV file');
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // Check if all required headers are present
        const headers = results.meta.fields || [];
        const missingHeaders = expectedHeaders.filter(
          (header) => !headers.includes(header)
        );

        if (missingHeaders.length > 0) {
          setError(
            `Missing required columns: ${missingHeaders.join(
              ', '
            )}. Please make sure your CSV file has all required columns.`
          );
          return;
        }

        // Validate that we have at least one row of data
        if (results.data.length === 0) {
          setError('The CSV file is empty');
          return;
        }

        // Pass the parsed data to the parent component
        onDataParsed(results.data as Array<Record<string, string>>);
      },
      error: (error) => {
        setError(`Error parsing CSV file: ${error.message}`);
      },
    });
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            Upload CSV file with the following columns:
          </label>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {expectedHeaders.map((header) => (
              <li key={header}>{header}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <Button asChild>
            <label className="cursor-pointer">
              Choose File
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </Button>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      </div>
    </Card>
  );
}