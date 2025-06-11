import { Action } from '../types/actionType';
import { ArticleFilterType } from '../types/articleFilterType';
import { ArticleType } from '../types/articleType';
import { articleAPI } from '../../api/articleAPI';
import { CommentSendType, CommentType } from '../types/commentType';
import { StatusCodes } from '../../api/statusCodes';
import { setAlert, switchSendCommentLoading } from './appReducer';

enum articleReducerConsts {
  SET_ARTICLE_FILTER_TYPE = 'SET_ARTICLE_FILTER_TYPE',
  ADD_ARTICLES = 'ADD_ARTICLES',
  SET_LIKE = 'SET_LIKE',
  SET_COMMENTS = 'SET_COMMENTS',
}

interface DefaultState {
  articleFilterType: ArticleFilterType;
  articles: ArticleType[];
}

let defaultState: DefaultState = {
  articleFilterType: 'popular',
  articles: [],
};

// ======== Reducer ========
const articleReducer = (state = defaultState, action: Action) => {
  switch (action.type) {
    case articleReducerConsts.SET_ARTICLE_FILTER_TYPE:
      return {
        ...state,
        articleFilterType: action.payload,
      };
    case articleReducerConsts.ADD_ARTICLES:
      return {
        ...state,
        articles: [...action.payload],
      };
    case articleReducerConsts.SET_LIKE:
      const findArticleForLike = [...state.articles].find((a) => a.id === action.payload);
      if (findArticleForLike) {
        findArticleForLike.isLike = !findArticleForLike.isLike;
      }
      return {
        ...state,
        articles: [...state.articles.filter((a) => a.id !== action.payload), findArticleForLike],
      };
    case articleReducerConsts.SET_COMMENTS:
      const findArticleForComments = [...state.articles].find(
        (a) => a.id === action.payload[0]?.relatedId,
      );
      if (findArticleForComments) {
        findArticleForComments.comments = action.payload;
      }
      return {
        ...state,
        articles: [
          ...state.articles.filter((a) => a.id !== action.payload),
          findArticleForComments,
        ],
      };
    default:
      return state;
  }
};

// ======== Action creators (AC) ========
export const setArticleFilterTypeAC = (newType: ArticleFilterType): Action => ({
  type: articleReducerConsts.SET_ARTICLE_FILTER_TYPE,
  payload: newType,
});

export const addArticlesAC = (articles: ArticleType[]): Action => ({
  type: articleReducerConsts.ADD_ARTICLES,
  payload: articles,
});

export const setLikeAC = (articleId: number): Action => ({
  type: articleReducerConsts.SET_LIKE,
  payload: articleId,
});

export const setCommentsAC = (comments: CommentType[]): Action => ({
  type: articleReducerConsts.SET_COMMENTS,
  payload: comments,
});

// ======== Thunks ========
export const setArticleFilterType = (newType: ArticleFilterType) => async (dispatch: any) => {
  dispatch(setArticleFilterTypeAC(newType));
};

export const getArticles = (articleFilterType: ArticleFilterType) => async (dispatch: any) => {
  // const response: AxiosResponse<ArticleType[]> = await articleAPI.getArticles(articleFilterType);
  const response: ArticleType[] = articleAPI.getArticles(articleFilterType) as ArticleType[];
  dispatch(addArticlesAC(response));
};

export const setLike = (articleId: number) => async (dispatch: any) => {
  dispatch(setLikeAC(articleId));
};

export const getComments = (articleId: number) => async (dispatch: any) => {
  try {
    const response = await articleAPI.getComments(articleId);
    dispatch(setCommentsAC(response.data));
  } catch {
    dispatch(
      setAlert({
        content: 'Возникла серверная ошибка',
        type: 'error',
      }),
    );
  }
};

export const sendComment =
  (authorLogin: string, content: string, relatedId: number, parentId: number | null) =>
  async (dispatch: any) => {
    const comment: CommentSendType = {
      authorLogin,
      content,
      relatedId,
      parentId,
      relatedType: 'article',
    };
    dispatch(switchSendCommentLoading(true));
    const response = await articleAPI.sendComment(comment);
    if (response.status === StatusCodes.CREATED) {
      dispatch(getComments(relatedId));
    } else {
      dispatch(
        setAlert({
          content: 'Возникла серверная ошибка',
          type: 'error',
        }),
      );
    }
    dispatch(switchSendCommentLoading(false));
  };

export default articleReducer;
