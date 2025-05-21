export type RecentSearch = ArticleSearch | ProfileSearch

export interface ArticleSearch {
    articleTitle: string
    articleDescription: string
    articleId: number
    articleCreatedAt: string
}

export interface ProfileSearch {
    profileAvatar: string
    profileId: string
    profileName: string
}
