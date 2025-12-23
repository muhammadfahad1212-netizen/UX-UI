
export interface Topic {
  id: string;
  title: string;
  completed: boolean;
}

export interface Week {
  id: number;
  title: string;
  subtitle: string;
  goal: string;
  topics: Topic[];
  outcome: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
