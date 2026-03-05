'use client';

import { useCallback } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Plus, BriefcaseBusiness } from 'lucide-react';
import { Experience } from '@/types/resume';

export function ExperienceForm() {
  const { data, addExperience, updateExperience, removeExperience } = useResume();
  const { experiences } = data;

  const handleAddExperience = useCallback(() => {
    addExperience({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      description: '',
    });
  }, [addExperience]);

  const handleChange = useCallback(
    (id: string, field: keyof Omit<Experience, 'id'>, value: string | boolean) => {
      const experience = experiences.find(e => e.id === id);
      if (!experience) return;
      updateExperience(id, { ...experience, [field]: value });
    },
    [experiences, updateExperience]
  );

  return (
    <div className="space-y-4">
      {experiences.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 gap-3 text-muted-foreground border-2 border-dashed rounded-lg">
          <BriefcaseBusiness className="w-8 h-8 text-muted-foreground/40" />
          <p className="text-sm">No work experience added yet</p>
        </div>
      )}

      {experiences.map((experience, idx) => (
        <div
          key={experience.id}
          className="border rounded-xl p-4 space-y-3 bg-muted/20 hover:bg-muted/30 transition-colors"
        >
          {/* Card Header */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Experience #{idx + 1}
            </span>
            <button
              onClick={() => removeExperience(experience.id)}
              className="text-destructive hover:bg-destructive/10 p-1.5 rounded-md transition-colors"
              aria-label="Remove experience"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Company + Position */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor={`company-${experience.id}`} className="text-xs font-semibold">
                Company
              </Label>
              <Input
                id={`company-${experience.id}`}
                value={experience.company}
                onChange={e => handleChange(experience.id, 'company', e.target.value)}
                placeholder="Acme Inc."
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor={`position-${experience.id}`} className="text-xs font-semibold">
                Position / Title
              </Label>
              <Input
                id={`position-${experience.id}`}
                value={experience.position}
                onChange={e => handleChange(experience.id, 'position', e.target.value)}
                placeholder="Senior Developer"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor={`startDate-${experience.id}`} className="text-xs font-semibold">
                Start Date
              </Label>
              <Input
                id={`startDate-${experience.id}`}
                type="month"
                value={experience.startDate}
                onChange={e => handleChange(experience.id, 'startDate', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor={`endDate-${experience.id}`}
                className={`text-xs font-semibold ${experience.currentlyWorking ? 'text-muted-foreground/50' : ''}`}
              >
                End Date
              </Label>
              <Input
                id={`endDate-${experience.id}`}
                type="month"
                value={experience.endDate}
                onChange={e => handleChange(experience.id, 'endDate', e.target.value)}
                disabled={experience.currentlyWorking}
              />
            </div>
          </div>

          {/* Currently Working Checkbox */}
          <div className="flex items-center gap-2">
            <Checkbox
              id={`current-${experience.id}`}
              checked={experience.currentlyWorking}
              onCheckedChange={checked => handleChange(experience.id, 'currentlyWorking', Boolean(checked))}
            />
            <Label htmlFor={`current-${experience.id}`} className="text-xs font-normal cursor-pointer">
              I currently work here
            </Label>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor={`description-${experience.id}`} className="text-xs font-semibold">
              Description
            </Label>
            <Textarea
              id={`description-${experience.id}`}
              value={experience.description}
              onChange={e => handleChange(experience.id, 'description', e.target.value)}
              placeholder="• Describe your key responsibilities and achievements&#10;• Use bullet points for clarity&#10;• Quantify results where possible (e.g., improved speed by 40%)"
              className="min-h-[96px] resize-none text-sm"
            />
          </div>
        </div>
      ))}

      <Button
        onClick={handleAddExperience}
        variant="outline"
        className="w-full gap-2 border-dashed"
      >
        <Plus className="w-4 h-4" />
        Add Work Experience
      </Button>
    </div>
  );
}
