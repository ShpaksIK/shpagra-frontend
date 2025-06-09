import { Action } from '../types/actionType';
import { ArticleFilterType } from '../types/articleFilterType';
import { ArticleType } from '../types/articleType';
import { articleAPI } from '../../api/articleAPI';
import { AxiosResponse } from 'axios';

enum articleReducerConsts {
  SET_ARTICLE_FILTER_TYPE = 'SET_ARTICLE_FILTER_TYPE',
  ADD_ARTICLES = 'ADD_ARTICLES',
  SET_LIKE = 'SET_LIKE',
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
      const findArticle = [...state.articles].find((a) => a.id === action.payload);
      if (findArticle) {
        findArticle.isLike = !findArticle.isLike;
      }
      return {
        ...state,
        articles: [...state.articles.filter((a) => a.id !== action.payload), findArticle],
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

export default articleReducer;
