export type TopicId = 'stack' | 'queue' | 'linked-list' | 'tree' | 'graph' | 'array';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface OperationStep {
  name: string;
  complexity: string;
  description: string;
  steps: string[];
  pointerFlow: string[];
  cCode: string;
}

export interface Pitfall {
  id: string;
  title: string;
  description: string;
  badCode: string;
  goodCode: string;
}

export interface TopicData {
  id: TopicId;
  name: string;
  tagline: string;
  category: 'Linear' | 'Hierarchical' | 'Non-Linear Network';
  readTime: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  memoryModel: 'Contiguous RAM' | 'Scattered Dynamic Heap' | 'Pointer Graphs';
  summary: string;
  analogy: {
    title: string;
    description: string;
  };
  characteristics: {
    title: string;
    description: string;
    badge?: string;
  }[];
  cStruct: string;
  operations: OperationStep[];
  pitfalls: Pitfall[];
  quiz: QuizQuestion[];
}

export interface ComplexityEntry {
  structure: string;
  category: string;
  access: { best: string; avg: string; worst: string };
  search: { best: string; avg: string; worst: string };
  insert: { best: string; avg: string; worst: string };
  delete: { best: string; avg: string; worst: string };
  space: string;
  notes: string;
}
