'use client';

import React, { useCallback } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { toast } from 'sonner';

export function useDownloadResume() {
  const { data } = useResume();

  const downloadResume = useCallback(async () => {
    // ── Validation ────────────────────────────────────────────────────────────
    if (!data?.personalInfo) {
      toast.error('Resume data is missing. Please fill in your information first.');
      return;
    }

    const toastId = toast.loading('Generating your PDF…');

    try {
      // ── Dynamic import keeps @react-pdf/renderer out of the SSR bundle ───────
      // Both modules are loaded lazily — only when the user clicks Download
      const [{ pdf }, { ResumePdfDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('./pdf/ResumePdfDocument'),
      ]);

      // ── Create a proper React element for the pdf() renderer ──────────────────
      // React.createElement is used because we're in a 'use client' hook file.
      // Cast to `any` is required: @react-pdf/renderer's pdf() type signature
      // technically expects ReactElement<DocumentProps> directly, but it works
      // with any component that returns a <Document> at its root.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const element = React.createElement(ResumePdfDocument, { data }) as any;

      // ── Generate Blob ─────────────────────────────────────────────────────────
      const blob = await pdf(element).toBlob();

      if (!blob || blob.size === 0) {
        throw new Error('Generated PDF blob is empty.');
      }

      // ── Trigger download via object URL ───────────────────────────────────────
      const name = data.personalInfo.fullName
        ? data.personalInfo.fullName.toLowerCase().replace(/\s+/g, '-')
        : 'resume';
      const date = new Date().toISOString().split('T')[0];
      const fileName = `${name}-${date}.pdf`;

      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = fileName;
      anchor.style.display = 'none';
      document.body.appendChild(anchor);
      anchor.click();

      // Cleanup — revoke the object URL after the browser starts the download
      setTimeout(() => {
        document.body.removeChild(anchor);
        window.URL.revokeObjectURL(url);
      }, 200);

      toast.success(`Downloaded: ${fileName}`, { id: toastId });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF. Please try again.', { id: toastId });
    }
  }, [data]);

  return downloadResume;
}
