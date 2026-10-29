import { type Comment } from '~/types';

export const sortCommentsDescending = (comments: Comment[]): Comment[] => {
  return comments.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
};
