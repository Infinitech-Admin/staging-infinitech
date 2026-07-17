export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content?: string | null;
  imageUrl?: string | null;
  videoUrl?: string | null;
  category?: string | null;
  author?: string | null;
  publishedAt: string;
}
