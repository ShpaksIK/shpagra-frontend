import { instance } from '.';
import { ArticleFilterType } from '../redux/types/articleFilterType';

export const articleAPI = {
  getArticles(articleFilterType: ArticleFilterType) {
    return [
      {
        id: 1,
        title: 'Test Title',
        description: 'Test desc',
        banner: '',
        content: [
          {
            type: 'title',
            text: 'Title text',
          },
        ],
        status: 'published',
        createdAt: '2025-09-06',
        authorLogin: 'test',
        authorUsername: 'Shpaks',
        authorAvatar: '',
        isLike: true,
      },
    ];
    return instance.get(`articles?filter=${articleFilterType}`);
  },
};
