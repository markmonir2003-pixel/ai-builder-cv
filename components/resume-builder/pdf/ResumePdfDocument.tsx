// NOTE: No 'use client' — @react-pdf/renderer components run in a worker context,
// not in the browser DOM. This file must remain a pure react-pdf component tree.

import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateString: string): string {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

function formatDateRange(startDate: string, endDate: string, current: boolean): string {
    if (!startDate) return '';
    const start = formatDate(startDate);
    if (current) return `${start} – Present`;
    if (!endDate) return start;
    return `${start} – ${formatDate(endDate)}`;
}

// ── Styles ───────────────────────────────────────────────────────────────────

const INDIGO = '#4f46e5';
const SLATE_900 = '#0f172a';
const SLATE_700 = '#334155';
const SLATE_600 = '#64748b';
const SLATE_200 = '#e2e8f0';
const INDIGO_100 = '#eef2ff';
const INDIGO_700 = '#4338ca';
const INDIGO_200 = '#c7d2fe';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        backgroundColor: '#ffffff',
        paddingTop: 40,
        paddingBottom: 40,
        paddingHorizontal: 48,
        fontSize: 10,
        color: SLATE_900,
        lineHeight: 1.5,
    },

    // ── Header ──
    header: {
        marginBottom: 18,
        paddingBottom: 12,
        borderBottomWidth: 2,
        borderBottomColor: INDIGO,
        borderBottomStyle: 'solid',
    },
    name: {
        fontSize: 24,
        fontFamily: 'Helvetica-Bold',
        color: SLATE_900,
        marginBottom: 3,
    },
    jobTitle: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        color: INDIGO,
        marginBottom: 5,
    },
    contactRow: {
        fontSize: 9,
        color: SLATE_600,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 0,
    },
    contactItem: {
        fontSize: 9,
        color: SLATE_600,
    },
    contactDot: {
        fontSize: 9,
        color: SLATE_600,
        paddingHorizontal: 4,
    },

    // ── Section ──
    section: {
        marginBottom: 14,
    },
    sectionTitle: {
        fontSize: 8,
        fontFamily: 'Helvetica-Bold',
        color: SLATE_900,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 6,
        paddingBottom: 3,
        borderBottomWidth: 1,
        borderBottomColor: SLATE_200,
        borderBottomStyle: 'solid',
    },

    // ── Summary ──
    summaryText: {
        fontSize: 10,
        color: SLATE_700,
        lineHeight: 1.6,
    },

    // ── Experience ──
    expEntry: {
        marginBottom: 10,
    },
    expTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 2,
    },
    expPosition: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        color: SLATE_900,
        flex: 1,
    },
    expDate: {
        fontSize: 9,
        color: SLATE_600,
        fontFamily: 'Helvetica',
        flexShrink: 0,
        marginLeft: 8,
    },
    expCompany: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        color: INDIGO,
        marginBottom: 3,
    },
    expDesc: {
        fontSize: 10,
        color: SLATE_700,
        lineHeight: 1.6,
    },

    // ── Education ──
    eduEntry: {
        marginBottom: 8,
    },
    eduTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 2,
    },
    eduDegree: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        color: SLATE_900,
        flex: 1,
    },
    eduDate: {
        fontSize: 9,
        color: SLATE_600,
        flexShrink: 0,
        marginLeft: 8,
    },
    eduSchool: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        color: INDIGO,
        marginBottom: 1,
    },
    eduGpa: {
        fontSize: 9,
        color: SLATE_600,
    },

    // ── Skills ──
    skillsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
    },
    skillPill: {
        backgroundColor: INDIGO_100,
        borderWidth: 1,
        borderColor: INDIGO_200,
        borderRadius: 20,
        paddingVertical: 3,
        paddingHorizontal: 9,
    },
    skillText: {
        fontSize: 9,
        fontFamily: 'Helvetica-Bold',
        color: INDIGO_700,
    },
});

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionWrapper({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {children}
        </View>
    );
}

// ── Main Document ─────────────────────────────────────────────────────────────

interface ResumePdfDocumentProps {
    data: ResumeData;
}

export function ResumePdfDocument({ data }: ResumePdfDocumentProps) {
    // Guard: should not render if data is malformed
    if (!data?.personalInfo) return null;

    const { personalInfo, experiences, educations, skills } = data;

    const contactItems = [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.location,
        personalInfo.linkedin,
        personalInfo.website,
    ].filter(Boolean) as string[];

    return (
        <Document
            title={personalInfo.fullName ? `${personalInfo.fullName} – Resume` : 'Resume'}
            author={personalInfo.fullName || 'Resume'}
            creator="AI Resume Builder"
            producer="AI Resume Builder"
        >
            <Page size="A4" style={styles.page}>

                {/* ── Header ── */}
                <View style={styles.header}>
                    <Text style={styles.name}>{personalInfo.fullName || 'Your Name'}</Text>

                    {!!personalInfo.title && (
                        <Text style={styles.jobTitle}>{personalInfo.title}</Text>
                    )}

                    {contactItems.length > 0 && (
                        <View style={styles.contactRow}>
                            {contactItems.map((item, idx) => (
                                <React.Fragment key={idx}>
                                    <Text style={styles.contactItem}>{item}</Text>
                                    {idx < contactItems.length - 1 && (
                                        <Text style={styles.contactDot}>·</Text>
                                    )}
                                </React.Fragment>
                            ))}
                        </View>
                    )}
                </View>

                {/* ── Summary ── */}
                {!!personalInfo.summary && (
                    <SectionWrapper title="Professional Summary">
                        <Text style={styles.summaryText}>{personalInfo.summary}</Text>
                    </SectionWrapper>
                )}

                {/* ── Experience ── */}
                {experiences.length > 0 && (
                    <SectionWrapper title="Experience">
                        {experiences.map(exp => (
                            <View key={exp.id} style={styles.expEntry}>
                                <View style={styles.expTopRow}>
                                    <Text style={styles.expPosition}>{exp.position || 'Position'}</Text>
                                    <Text style={styles.expDate}>
                                        {formatDateRange(exp.startDate, exp.endDate, exp.currentlyWorking)}
                                    </Text>
                                </View>
                                <Text style={styles.expCompany}>{exp.company}</Text>
                                {!!exp.description && (
                                    <Text style={styles.expDesc}>{exp.description}</Text>
                                )}
                            </View>
                        ))}
                    </SectionWrapper>
                )}

                {/* ── Education ── */}
                {educations.length > 0 && (
                    <SectionWrapper title="Education">
                        {educations.map(edu => (
                            <View key={edu.id} style={styles.eduEntry}>
                                <View style={styles.eduTopRow}>
                                    <Text style={styles.eduDegree}>
                                        {[edu.degree, edu.field].filter(Boolean).join(' in ') || 'Degree'}
                                    </Text>
                                    <Text style={styles.eduDate}>{formatDate(edu.graduationDate)}</Text>
                                </View>
                                <Text style={styles.eduSchool}>{edu.school}</Text>
                                {!!edu.gpa && (
                                    <Text style={styles.eduGpa}>GPA: {edu.gpa}</Text>
                                )}
                            </View>
                        ))}
                    </SectionWrapper>
                )}

                {/* ── Skills ── */}
                {skills.length > 0 && (
                    <SectionWrapper title="Skills">
                        <View style={styles.skillsRow}>
                            {skills.map(skill => (
                                <View key={skill.id} style={styles.skillPill}>
                                    <Text style={styles.skillText}>{skill.name}</Text>
                                </View>
                            ))}
                        </View>
                    </SectionWrapper>
                )}

            </Page>
        </Document>
    );
}
