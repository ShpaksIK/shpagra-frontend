import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../../api';
import { ErrorType } from '../../../types/errorType';
import { errorHandler } from '../../../utils/errorHandler';
import {
  ArticleFilterType,
  ArticleType,
  CreateArticleType,
} from '../../../types/entities/articleType';
import { showTimeoutAlert } from '../../../utils/showAlert';
import { ReactionsTypes, ReactionType } from '../../../types/entities/reactionType';
import { decrementReaction } from './articleSlice';
import { RootState } from '../..';
import { CommentSendType } from '../../../types/entities/commentType';

export const getArticle = createAsyncThunk(
  'article/getarticle',
  async (articleId: number, { dispatch }) => {
    try {
      const response = await instance.get(`articles/${articleId}`);

      if (!response.data.success) {
        const error: ErrorType = {
          status: response.data.status,
          message: response.data.message,
        };
        throw error;
      }

      const comments = await instance.get(`articles/${articleId}/comments`);

      if (!comments.data.success) {
        const error: ErrorType = {
          status: comments.data.status,
          message: comments.data.message,
        };
        throw error;
      }

      return {
        ...response.data.data,
        comments: comments.data.data,
      };
    } catch (error) {
      errorHandler(error, dispatch);
    }
  },
);

export const getArticles = createAsyncThunk(
  'article/getarticles',
  async (filter: ArticleFilterType, { dispatch }) => {
    try {
      const response = await instance.get(`articles/`);

      if (!response.data.success) {
        const error: ErrorType = {
          status: response.data.status,
          message: response.data.message,
        };
        throw error;
      }

      return response.data.data;
    } catch (error) {
      errorHandler(error, dispatch);
    }
  },
);

export const getArticleComments = createAsyncThunk(
  'article/getarticlecomments',
  async (articleId: number, { dispatch }) => {
    try {
      const response = await instance.get(`articles/${articleId}/comments`);

      if (!response.data.success) {
        const error: ErrorType = {
          status: response.data.status,
          message: response.data.message,
        };
        throw error;
      }

      return {
        articleId,
        comments: response.data.data,
      } as any;
    } catch (error) {
      errorHandler(error, dispatch);
    }
  },
);

interface CreateArticleThunkType {
  article: CreateArticleType;
  to: 'draft' | 'moderation';
}

export const createArticle = createAsyncThunk(
  'article/createarticle',
  async ({ article, to }: CreateArticleThunkType, { dispatch }) => {
    try {
      const response = await instance.post(`articles`, {
        article: {
          ...article,
        },
        to: to,
      });

      if (!response.data.success) {
        const error: ErrorType = {
          status: response.data.status,
          message: response.data.message,
        };
        throw error;
      }

      showTimeoutAlert(dispatch, {
        type: 'success',
        content: 'Статья создана в черновика',
      });

      return response.data.data;
    } catch (error) {
      errorHandler(error, dispatch);
    }
  },
);

export const removeArticle = createAsyncThunk(
  'article/removearticle',
  async (articleId: number, { dispatch }) => {
    try {
      const response = await instance.delete(`articles/${articleId}`);
      if (!response.data.success) {
        const error: ErrorType = {
          status: response.data.status,
          message: response.data.message,
        };
        throw error;
      }

      showTimeoutAlert(dispatch, {
        type: 'success',
        content: 'Статья удалена',
      });

      return response.data.data;
    } catch (error) {
      errorHandler(error, dispatch);
    }
  },
);

interface UpdateArticleThunkType {
  articleId: number;
  article: Partial<ArticleType>;
}

export const updateArticle = createAsyncThunk(
  'article/removearticle',
  async ({ articleId, article }: UpdateArticleThunkType, { dispatch }) => {
    try {
      const response = await instance.put(`articles/${articleId}`, {
        ...article,
      });

      if (!response.data.success) {
        const error: ErrorType = {
          status: response.data.status,
          message: response.data.message,
        };
        throw error;
      }

      showTimeoutAlert(dispatch, {
        type: 'success',
        content: 'Статья изменена',
      });

      return response.data.data;
    } catch (error) {
      errorHandler(error, dispatch);
    }
  },
);

interface ArticleReactionType {
  articleId: number;
  profileLogin: string;
  content: ReactionsTypes;
}

export const createReaction = createAsyncThunk(
  'article/createreaction',
  async ({ articleId, profileLogin, content }: ArticleReactionType, { dispatch, getState }) => {
    try {
      const isReactionSetted = (getState() as RootState).article.articles
        .find((a) => a.id === articleId)
        ?.reactions.find((r) => r.author_login === profileLogin);
      let response;

      if (isReactionSetted) {
        dispatch(
          decrementReaction({
            articleId,
            profileLogin,
          }),
        );
        response = await instance.delete(`reactions/${isReactionSetted.id}`);
      } else {
        response = await instance.post(`articles/${articleId}/reactions`, {
          content,
        });
      }

      if (!response.data.success) {
        const error: ErrorType = {
          status: response.data.status,
          message: response.data.message,
        };
        throw error;
      }

      return {
        articleId: articleId,
        reaction: response.data.data,
      } as any;
    } catch (error) {
      errorHandler(error, dispatch);
    }
  },
);

interface CreateCommentType {
  articleId: number;
  comment: CommentSendType;
}

export const createArticleComment = createAsyncThunk(
  'article/createarticlecomment',
  async ({ articleId, comment }: CreateCommentType, { dispatch }) => {
    try {
      const response = await instance.post(`articles/${articleId}/comments`, {
        ...comment,
      });

      if (!response.data.success) {
        const error: ErrorType = {
          status: response.data.status,
          message: response.data.message,
        };
        throw error;
      }

      return {
        articleId,
        comment: response.data.data,
      } as any;
    } catch (error) {
      errorHandler(error, dispatch);
    }
  },
);

interface CreateCommentReactionType {
  commentId: number;
  content: ReactionsTypes;
}

export const createArticleCommentReaction = createAsyncThunk(
  'article/createarticlecommentreaction',
  async ({ commentId, content }: CreateCommentReactionType, { dispatch }) => {
    try {
      const response = await instance.post(`comments/${commentId}/reactions`, {
        content,
      });

      if (!response.data.success) {
        const error: ErrorType = {
          status: response.data.status,
          message: response.data.message,
        };
        throw error;
      }

      return response.data.data;
    } catch (error) {
      errorHandler(error, dispatch);
    }
  },
);

interface DeleteCommentReactionType {
  commentId: number;
  reactionId: number;
}

export const deleteArticleCommentReaction = createAsyncThunk(
  'article/deletearticlecommentreaction',
  async ({ reactionId, commentId }: DeleteCommentReactionType, { dispatch }) => {
    if (commentId) {
    }

    try {
      const response = await instance.delete(`reactions/${reactionId}`);

      if (!response.data.success) {
        const error: ErrorType = {
          status: response.data.status,
          message: response.data.message,
        };
        throw error;
      }

      return {
        success: response.data.success,
        reactionId,
      } as any;
    } catch (error) {
      errorHandler(error, dispatch);
    }
  },
);
