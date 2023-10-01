export interface DawComment {
  id: number;
  dawId: number;
  content: string;
  replies?: DawComment[];
  parentId?: number | null;
}
