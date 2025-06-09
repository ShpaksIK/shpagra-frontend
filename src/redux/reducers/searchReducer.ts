import { Action } from '../types/actionType';
import { RecentSearch, ArticleSearch, ProfileSearch } from '../types/searchStateSchema';

enum searchReducerReducerConsts {
  SET_RECENT_SEARCH = 'SET_RECENT_SEARCH',
  SET_ARTICLE_SEARCH = 'SET_ARTICLE_SEARCH',
  SET_PROFILE_SEARCH = 'SET_PROFILE_SEARCH',
}

interface DefaultState {
  recentSearch: RecentSearch[];
  articleSearch: ArticleSearch[];
  profileSearch: ProfileSearch[];
}

let defaultState: DefaultState = {
  recentSearch: [],
  articleSearch: [],
  profileSearch: [],
};

// ======== Reducer ========
const searchReducer = (state = defaultState, action: Action) => {
  switch (action.type) {
    case searchReducerReducerConsts.SET_RECENT_SEARCH:
      return {
        ...state,
        recentSearch: action.payload,
      };
    case searchReducerReducerConsts.SET_ARTICLE_SEARCH:
      return {
        ...state,
        articleSearch: action.payload,
      };
    case searchReducerReducerConsts.SET_PROFILE_SEARCH:
      return {
        ...state,
        profileSearch: [...action.payload],
      };
    default:
      return state;
  }
};

// ======== Action creators (AC) ========
const setRecentSearchAC = (recentSearch: RecentSearch[]): Action => ({
  type: searchReducerReducerConsts.SET_RECENT_SEARCH,
  payload: recentSearch,
});

const setArticleSearchAC = (articleSearch: ArticleSearch[]): Action => ({
  type: searchReducerReducerConsts.SET_ARTICLE_SEARCH,
  payload: articleSearch,
});

const setProfileSearchAC = (profileSearch: ProfileSearch[]): Action => ({
  type: searchReducerReducerConsts.SET_PROFILE_SEARCH,
  payload: profileSearch,
});

// ======== Thunks ========
export const setRecentSearch = () => async (dispatch: any) => {
  dispatch(
    setRecentSearchAC([
      {
        profileAvatar: '',
        profileId: 'shp0ks',
        profileName: 'Максим Иосипчук',
      },
    ]),
  );
};

export const setArticleSearch = () => async (dispatch: any) => {
  dispatch(
    setArticleSearchAC([
      {
        articleCreatedAt: '31.12.2025',
        articleDescription:
          'Test descriptionTest descriptionTest descriptionTest descriptionTest descriptionTest descriptionTest descriptionTest description',
        articleId: 1,
        articleTitle: 'Test Title',
      },
    ]),
  );
};

export const setProfileSearch = () => async (dispatch: any) => {
  dispatch(
    setProfileSearchAC([
      {
        profileAvatar: '',
        profileId: 'shp0ks',
        profileName: 'Максим Иосипчук',
      },
    ]),
  );
};

export default searchReducer;
