'use client';

import { useCallback, useState, useRef } from 'react';
import { Upload, X, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FitsUploadProps {
  onFileUpload: (file: File) => void;
  isUploading?: boolean;
  disabled?: boolean;
}

export function FitsUpload({ onFileUpload, isUploading = false, disabled = false }: FitsUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Validate file extension
    if (!file.name.toLowerCase().endsWith('.fits')) {
      return 'Please upload a .fits file only';
    }

    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      return 'File size must be less than 100MB';
    }

    return null;
  };

  const handleFileSelect = (files: FileList | null) => {
    setError('');
    
    if (!files || files.length === 0) {
      setError('Please select a valid FITS file');
      return;
    }

    const file = files[0];
    const validationError = validateFile(file);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    setSelectedFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && !isUploading) {
      setIsDragActive(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    
    if (disabled || isUploading) return;
    
    handleFileSelect(e.dataTransfer.files);
  };

  const handleClick = () => {
    if (disabled || isUploading) return;
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' : 'border-gray-300 dark:border-gray-600'}
          ${disabled || isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-400'}
          ${selectedFile ? 'bg-green-50 dark:bg-green-950 border-green-500' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".fits"
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled || isUploading}
        />
        
        <div className="flex flex-col items-center space-y-2">
          {selectedFile ? (
            <>
              <FileText className="h-12 w-12 text-green-500" />
              <p className="text-sm font-medium text-green-700 dark:text-green-300">
                {selectedFile.name}
              </p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </>
          ) : (
            <>
              <Upload className="h-12 w-12 text-gray-400" />
              <div>
                <p className="text-lg font-medium">
                  {isDragActive ? 'Drop the FITS file here' : 'Upload FITS File'}
                </p>
                <p className="text-sm text-gray-500">
                  Drag and drop or click to select a .fits file (max 100MB)
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {selectedFile && (
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">{selectedFile.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleUpload}
              disabled={isUploading}
              size="sm"
            >
              {isUploading ? 'Uploading...' : 'Process File'}
            </Button>
            <Button
              onClick={handleRemoveFile}
              variant="ghost"
              size="sm"
              disabled={isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}