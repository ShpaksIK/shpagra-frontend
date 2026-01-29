import { useLocation } from 'react-router';
import { ProfileType } from '../types/entities/profileType';
import { UserType } from '../types/entities/userType';

export const useProfile = () => {
  const location = useLocation();

  const splitPathname = location.pathname.split('/');

  if (!splitPathname[2]) {
    const user: UserType = {
      isAuth: true,
      login: 'shp0ks',
      username: 'Shpaks',
      avatar: null,
      articles: [
        {
          id: 1,
          title: 'Test Article',
          description:
            'Test description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this article',
          banner: null,
          content: [],
          status: 'published',
          createdAt: Date.now(),
          updatedAt: null,
          authorLogin: 'shp0ks',
          authorUsername: 'Shpaks',
          authorAvatar: null,
          reactions: [],
          comments: [
            {
              id: 1,
              content: 'Test comment',
              createdAt: Date.now(),
              updatedAt: null,
              authorLogin: 'skebob',
              authorUsername: 'Матвей',
              authorAvatar: null,
              parent: null,
              relatedId: 1,
              relatedType: 'article',
              reactions: [],
            },
            {
              id: 2,
              content: 'Test comment 2',
              createdAt: Date.now(),
              updatedAt: Date.now(),
              authorLogin: 'skebob2',
              authorUsername: 'Матвей 2',
              authorAvatar: null,
              parent: {
                id: 1,
                authorUsername: 'Матвей',
                relatedType: 'article',
                text: 'Test comment',
              },
              relatedId: 1,
              relatedType: 'article',
              reactions: [],
            },
          ],
        },
        {
          id: 2,
          title: 'Test Article',
          description: 'Test description for this article',
          banner: null,
          content: [],
          status: 'published',
          createdAt: Date.now(),
          updatedAt: null,
          authorLogin: 'shp0ks',
          authorUsername: 'Shpaks',
          authorAvatar: null,
          reactions: [],
          comments: [],
        },
      ],
      comments: [
        {
          id: 1,
          content: 'Test comment',
          createdAt: Date.now(),
          updatedAt: null,
          authorLogin: 'skebob',
          authorUsername: 'Матвей',
          authorAvatar: null,
          parent: null,
          relatedId: 1,
          relatedType: 'article',
          reactions: [],
        },
        {
          id: 2,
          content: 'Test comment 2',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          authorLogin: 'skebob2',
          authorUsername: 'Матвей 2',
          authorAvatar: null,
          parent: {
            id: 1,
            authorUsername: 'Матвей',
            relatedType: 'article',
            text: 'Test comment',
          },
          relatedId: 1,
          relatedType: 'article',
          reactions: [],
        },
      ],
      reactions: [
        {
          id: 1,
          type: 'dislike',
          authorLogin: 'shp0ks',
          relatedId: 1,
          relatedType: 'article',
        },
        {
          id: 2,
          type: 'like',
          authorLogin: 'shp0ks',
          relatedId: 1,
          relatedType: 'post',
        },
        {
          id: 3,
          type: 'like',
          authorLogin: 'test',
          relatedId: 2,
          relatedType: 'article',
        },
      ],
    };
    return user;
  }

  // проверяем, есть ли в store уже загруженный профиль
  // И совпадает ли URL открытого профиля с хранимым.

  const profile: ProfileType = {
    login: 'Ifnuh666',
    username: 'Максим',
    avatar: null,
    articles: [
      {
        id: 1,
        title: 'Test Article',
        description:
          'Test description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this articleTest description for this article',
        banner: null,
        content: [],
        status: 'published',
        createdAt: Date.now(),
        updatedAt: null,
        authorLogin: 'shp0ks',
        authorUsername: 'Shpaks',
        authorAvatar: null,
        reactions: [],
        comments: [
          {
            id: 1,
            content: 'Test comment',
            createdAt: Date.now(),
            updatedAt: null,
            authorLogin: 'skebob',
            authorUsername: 'Матвей',
            authorAvatar: null,
            parent: null,
            relatedId: 1,
            relatedType: 'article',
            reactions: [],
          },
          {
            id: 2,
            content: 'Test comment 2',
            createdAt: Date.now(),
            updatedAt: Date.now(),
            authorLogin: 'skebob2',
            authorUsername: 'Матвей 2',
            authorAvatar: null,
            parent: {
              id: 1,
              authorUsername: 'Матвей',
              relatedType: 'article',
              text: 'Test comment',
            },
            relatedId: 1,
            relatedType: 'article',
            reactions: [],
          },
        ],
      },
      {
        id: 2,
        title: 'Test Article',
        description: 'Test description for this article',
        banner: null,
        content: [],
        status: 'published',
        createdAt: Date.now(),
        updatedAt: null,
        authorLogin: 'shp0ks',
        authorUsername: 'Shpaks',
        authorAvatar: null,
        reactions: [],
        comments: [],
      },
    ],
    comments: [
      {
        id: 1,
        content: 'Test comment',
        createdAt: Date.now(),
        updatedAt: null,
        authorLogin: 'skebob',
        authorUsername: 'Матвей',
        authorAvatar: null,
        parent: null,
        relatedId: 1,
        relatedType: 'article',
        reactions: [],
      },
      {
        id: 2,
        content: 'Test comment 2',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        authorLogin: 'skebob2',
        authorUsername: 'Матвей 2',
        authorAvatar: null,
        parent: {
          id: 1,
          authorUsername: 'Матвей',
          relatedType: 'article',
          text: 'Test comment',
        },
        relatedId: 1,
        relatedType: 'article',
        reactions: [],
      },
    ],
    reactions: [
      {
        id: 1,
        type: 'dislike',
        authorLogin: 'shp0ks',
        relatedId: 1,
        relatedType: 'article',
      },
      {
        id: 2,
        type: 'like',
        authorLogin: 'shp0ks',
        relatedId: 1,
        relatedType: 'post',
      },
      {
        id: 3,
        type: 'like',
        authorLogin: 'test',
        relatedId: 2,
        relatedType: 'article',
      },
    ],
  };

  return profile;
};
