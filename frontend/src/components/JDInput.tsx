import React from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export const JDInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-gray-700">Job Description</label>
      <textarea
        className="w-full h-48 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="Paste the job description here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="text-sm text-gray-500 text-right">
        {value.length} characters (min 50)
      </div>
    </div>
  );
};