import React from 'react';
import { UploadCloud } from 'lucide-react';

interface Props {
  file: File | null;
  onFileSelect: (file: File) => void;
}

export const ResumeUpload: React.FC<Props> = ({ file, onFileSelect }) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-gray-700">Upload Resume (PDF/DOCX)</label>
      <div 
        onDragOver={(e) => e.preventDefault()} 
        onDrop={handleDrop}
        className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
      >
        <UploadCloud className="w-10 h-10 text-gray-400 mb-3" />
        <span className="text-gray-600">Drag & drop or click to upload</span>
        <input 
          type="file" 
          accept=".pdf,.docx" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => e.target.files && onFileSelect(e.target.files[0])}
        />
      </div>
      {file && (
        <div className="text-sm text-green-600 font-medium mt-1">
          Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
        </div>
      )}
    </div>
  );
};