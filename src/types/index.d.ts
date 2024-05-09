export interface Post {
  id: number;
  title: string;
}

export interface DataReturn {
  data: Post[];
  isLoading: boolean;
  error: string | null;
}