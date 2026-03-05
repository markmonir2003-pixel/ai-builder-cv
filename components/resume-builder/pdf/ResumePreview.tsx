'use client';

import React from 'react';
import { ResumeData } from '@/types/resume';

interface ResumePreviewProps {
  data: ResumeData;
}

const proficiencyWidth: Record<string, string> = {
  beginner: '25%',
  intermediate: '50%',
  advanced: '75%',
  expert: '100%',
};

export function ResumePreview({ data }: ResumePreviewProps) {
  const { personalInfo, experiences, educations, skills } = data;

  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const formatDateRange = (startDate: string, endDate: string, current: boolean): string => {
    if (!startDate) return '';
    const start = formatDate(startDate);
    if (current) return `${start} – Present`;
    if (!endDate) return start;
    return `${start} – ${formatDate(endDate)}`;
  };

  // Inline contact info items
  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.website,
  ].filter(Boolean);

  return (
    <div
      className="bg-white text-slate-900 font-sans"
      style={{ width: '100%', padding: '40px 48px', boxSizing: 'border-box', minHeight: '297mm' }}
    >
      {/* ── Header ── */}
      <div style={{ marginBottom: '20px', paddingBottom: '14px', borderBottom: '2.5px solid #4f46e5' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.2 }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>

        {personalInfo.title && (
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#4f46e5', margin: '4px 0 0' }}>
            {personalInfo.title}
          </p>
        )}

        {contactItems.length > 0 && (
          <p style={{ fontSize: '10px', color: '#64748b', margin: '8px 0 0', lineHeight: 1.6 }}>
            {contactItems.join('  ·  ')}
          </p>
        )}
      </div>

      {/* ── Professional Summary ── */}
      {personalInfo.summary && (
        <Section title="Professional Summary">
          <p style={{ fontSize: '11px', color: '#334155', lineHeight: 1.7, margin: 0 }}>
            {personalInfo.summary}
          </p>
        </Section>
      )}

      {/* ── Experience ── */}
      {experiences.length > 0 && (
        <Section title="Experience">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {experiences.map(exp => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
                    {exp.position || 'Position'}
                  </span>
                  <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 500, whiteSpace: 'nowrap', marginLeft: '8px' }}>
                    {formatDateRange(exp.startDate, exp.endDate, exp.currentlyWorking)}
                  </span>
                </div>
                <p style={{ fontSize: '11px', color: '#4f46e5', fontWeight: 600, margin: '2px 0 0' }}>
                  {exp.company}
                </p>
                {exp.description && (
                  <div style={{ marginTop: '5px' }}>
                    {exp.description.split('\n').map((line, i) => (
                      <p key={i} style={{ fontSize: '11px', color: '#334155', lineHeight: 1.7, margin: '1px 0' }}>
                        {line}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── Education ── */}
      {educations.length > 0 && (
        <Section title="Education">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {educations.map(edu => (
              <div key={edu.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
                    {[edu.degree, edu.field].filter(Boolean).join(' in ') || 'Degree'}
                  </span>
                  <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 500, whiteSpace: 'nowrap', marginLeft: '8px' }}>
                    {formatDate(edu.graduationDate)}
                  </span>
                </div>
                <p style={{ fontSize: '11px', color: '#4f46e5', fontWeight: 600, margin: '2px 0 0' }}>
                  {edu.school}
                </p>
                {edu.gpa && (
                  <p style={{ fontSize: '10px', color: '#64748b', margin: '2px 0 0' }}>
                    GPA: {edu.gpa}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── Skills ── */}
      {skills.length > 0 && (
        <Section title="Skills">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {skills.map(skill => (
              <span
                key={skill.id}
                title={skill.proficiency}
                style={{
                  display: 'inline-block',
                  background: '#eef2ff',
                  color: '#4338ca',
                  fontSize: '10px',
                  fontWeight: 600,
                  padding: '3px 9px',
                  borderRadius: '999px',
                  border: '1px solid #c7d2fe',
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

/** Reusable section wrapper */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <h2
        style={{
          fontSize: '10px',
          fontWeight: 800,
          color: '#0f172a',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          margin: '0 0 8px',
          paddingBottom: '4px',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
