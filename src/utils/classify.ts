import { sections } from '../data/mockData';

export const classifySectionByFileName = (fileName: string): string => {
  const lower = fileName.toLowerCase();
  if (lower.includes('exchange')) return 'mail';
  if (lower.includes('rds') || lower.includes('server')) return 'infra';
  if (lower.includes('wifi') || lower.includes('network')) return 'network';
  if (lower.includes('security')) return 'security';
  return 'business';
};

export const getSectionName = (id: string): string => {
  return sections.find((section) => section.id === id)?.name ?? id;
};
