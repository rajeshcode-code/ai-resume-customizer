import React, { useState } from 'react';
import { CustomizationResponse } from '../types';
import { Download, FileText } from 'lucide-react';

export const ResultsDashboard: React.FC<{ data: CustomizationResponse }> = ({ data }) => {
  const [version, setVersion] = useState<'conservative_version' | 'aggressive_version'>('aggressive_version');
  const currentData = data[version];

  const handleDownloadText = () => {
    const textContent = `
SUMMARY
${currentData.summary}

SKILLS
${currentData.skills.join(', ')}

EXPERIENCE
${currentData.experience.map(e => `${e.role} at ${e.company} (${e.duration})\n${e.bullets.map(b => `- ${b}`).join('\n')}`).join('\n\n')}
    `;
    const blob = new Blob([textContent.trim()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tailored_resume_${version}.txt`;
    a.click();
  };

  return (
    <div className="mt-10 flex flex-col gap-8 w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 bg-blue-50 rounded-xl border border-blue-100 text-center">
          <h3 className="text-lg font-bold text-blue-800">JD Match Score</h3>
          <p className="text-4xl font-extrabold text-blue-600 mt-2">{data.match_score}%</p>
        </div>
        <div className="p-6 bg-green-50 rounded-xl border border-green-100 text-center">
          <h3 className="text-lg font-bold text-green-800">ATS Score (Predicted)</h3>
          <p className="text-4xl font-extrabold text-green-600 mt-2">{data.ats_score}%</p>
        </div>
      </div>

      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border">
        <div className="flex gap-4">
          <button 
            className={`px-4 py-2 rounded-md font-medium ${version === 'aggressive_version' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setVersion('aggressive_version')}
          >
            Aggressive (ATS Optimized)
          </button>
          <button 
            className={`px-4 py-2 rounded-md font-medium ${version === 'conservative_version' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setVersion('conservative_version')}
          >
            Conservative (Factual)
          </button>
        </div>
        <button onClick={handleDownloadText} className="flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800">
          <Download className="w-5 h-5" /> Download TXT
        </button>
      </div>

      <div className="bg-white p-8 rounded-xl border shadow-sm flex flex-col gap-6">
        <section>
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-3">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{currentData.summary}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {currentData.skills.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">{skill}</span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-3">Experience</h2>
          <div className="flex flex-col gap-6">
            {currentData.experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{exp.role}</h3>
                  <span className="text-sm font-semibold text-indigo-600">{exp.company} | {exp.duration}</span>
                </div>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
         <h2 className="text-xl font-bold text-amber-900 mb-3">Suggested Missing Keywords</h2>
         <div className="flex flex-wrap gap-2">
            {currentData.missing_keywords.map((kw, idx) => (
              <span key={idx} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">{kw}</span>
            ))}
          </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
         <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2"><FileText /> Generated Cover Letter</h2>
         <p className="whitespace-pre-wrap text-slate-700 leading-relaxed">{data.cover_letter}</p>
      </div>
    </div>
  );
};