export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  tech: string[];
  github: string;
  demo: string;
  image?: string;
  features?: string[];
  category?: string;
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  url: string;
  description: string;
}
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}