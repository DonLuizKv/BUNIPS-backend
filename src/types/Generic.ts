export type StyleConfig = {
    color?: string;
    bgColor?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
};


export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface NotificationItem {
    id: string;
    title: string;
    description: string;
    time: string;
    type: NotificationType;
    read: boolean;
}