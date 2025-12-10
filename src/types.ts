export enum Page {
  HOME = 'HOME',
  RESUME = 'RESUME', // Includes Education
  PROJECTS = 'PROJECTS',
  CONTACT = 'CONTACT'
}

export interface NavItem {
  label: string;
  page: Page;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}