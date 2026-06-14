'use client';

import React, { useState } from 'react';
import { JDInput } from '@/components/JDInput';
import { ResumeUpload } from '@/components/ResumeUpload';
import { ResultsDashboard } from '@/components/ResultsDashboard';
import { CustomizationResponse } from '@/types';

export default function Home() {
  const [jd, setJd] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<CustomizationResponse | null>(null);

  const handleSubmit = async () => {
    if (!jd || jd.length < 50) return setError('Job description is too short.');
    if (!file) return setError('Please upload a resume.');
    
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('jd', jd);
    formData.append('file', file);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${baseUrl}/api/customize`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Failed to process resume');
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">AI Resume Customizer</h1>
          <p className="mt-3 text-lg text-gray-500">Tailor your resume to any job description instantly using AI.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6 relative">
          {error && <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">{error}</div>}
          
          <JDInput value={jd} onChange={setJd} />
          <ResumeUpload file={file} onFileSelect={setFile} />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Analyzing & Customizing...' : 'Customize Resume'}
          </button>
        </div>
      </div>

      {result && <ResultsDashboard data={result} />}
    </main>
  );
}