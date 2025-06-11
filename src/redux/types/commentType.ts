type RelatedType = 'article' | 'post';

export interface CommentType {
  id: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
  authorLogin: string;
  authorUsername: string;
  parentId?: number;
  relatedId: number;
  relatedType: RelatedType;
}

export interface CommentSendType {
  authorLogin: string;
  content: string;
  relatedId: number;
  parentId: number | null;
  relatedType: RelatedType;
}
