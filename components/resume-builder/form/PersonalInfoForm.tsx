'use client';

import { useCallback } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, Phone, MapPin, Briefcase, Linkedin, Globe } from 'lucide-react';

export function PersonalInfoForm() {
  const { data, updatePersonalInfo } = useResume();
  const { personalInfo } = data;

  const handleChange = useCallback(
    (field: keyof typeof personalInfo, value: string) => {
      updatePersonalInfo({ ...personalInfo, [field]: value });
    },
    [personalInfo, updatePersonalInfo]
  );

  return (
    <div className="space-y-4">
      {/* Name + Title row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="fullName" className="flex items-center gap-1.5 text-xs font-semibold">
            <User className="w-3.5 h-3.5 text-muted-foreground" />
            Full Name
          </Label>
          <Input
            id="fullName"
            value={personalInfo.fullName}
            onChange={e => handleChange('fullName', e.target.value)}
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="title" className="flex items-center gap-1.5 text-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5 text-muted-foreground" />
            Job Title
          </Label>
          <Input
            id="title"
            value={personalInfo.title}
            onChange={e => handleChange('title', e.target.value)}
            placeholder="Software Engineer"
          />
        </div>
      </div>

      {/* Email + Phone row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="flex items-center gap-1.5 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5 text-muted-foreground" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={personalInfo.email}
            onChange={e => handleChange('email', e.target.value)}
            placeholder="john@example.com"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone" className="flex items-center gap-1.5 text-xs font-semibold">
            <Phone className="w-3.5 h-3.5 text-muted-foreground" />
            Phone
          </Label>
          <Input
            id="phone"
            type="tel"
            value={personalInfo.phone}
            onChange={e => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      {/* Location + LinkedIn row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="location" className="flex items-center gap-1.5 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
            Location
          </Label>
          <Input
            id="location"
            value={personalInfo.location}
            onChange={e => handleChange('location', e.target.value)}
            placeholder="San Francisco, CA"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="linkedin" className="flex items-center gap-1.5 text-xs font-semibold">
            <Linkedin className="w-3.5 h-3.5 text-muted-foreground" />
            LinkedIn
          </Label>
          <Input
            id="linkedin"
            value={personalInfo.linkedin}
            onChange={e => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
      </div>

      {/* Website */}
      <div className="space-y-1.5">
        <Label htmlFor="website" className="flex items-center gap-1.5 text-xs font-semibold">
          <Globe className="w-3.5 h-3.5 text-muted-foreground" />
          Website / Portfolio
        </Label>
        <Input
          id="website"
          value={personalInfo.website}
          onChange={e => handleChange('website', e.target.value)}
          placeholder="johndoe.dev"
        />
      </div>

      {/* Summary */}
      <div className="space-y-1.5">
        <Label htmlFor="summary" className="text-xs font-semibold">
          Professional Summary
        </Label>
        <Textarea
          id="summary"
          value={personalInfo.summary}
          onChange={e => handleChange('summary', e.target.value)}
          placeholder="A brief overview of your professional background, key skills, and career goals…"
          className="min-h-[96px] resize-none"
        />
        <p className="text-xs text-muted-foreground">
          {personalInfo.summary.length} characters · Aim for 2–4 sentences.
        </p>
      </div>
    </div>
  );
}
