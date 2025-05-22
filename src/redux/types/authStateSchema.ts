export type NotificationTypes = 'profile' | 'article' | 'post' | 'some'

export interface Notification {
    notificationId: number
    relatedId: number
    type: NotificationTypes | null
    content: string
    isRead: boolean
    createdAt: string
}

export interface AuthSchema {
    login: string
    username: string
    avatar: string
    email: string
}