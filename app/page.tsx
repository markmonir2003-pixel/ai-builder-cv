'use client';

import { ResumeProvider } from '@/contexts/ResumeContext';
import { ResumeBuilder } from '@/components/resume-builder/ResumeBuilder';
import { Toaster } from 'sonner';

export default function Home() {
  return (
    <ResumeProvider>
      <ResumeBuilder />
      <Toaster />
    </ResumeProvider>
  );
}
