import axios from 'axios';
import { ApiResponse } from '../model';
import { HOST, TOKEN } from '../data/enviroment';

export interface Notification {
    id: string,
    content: string,
    createTime: string,
    thumbnail: string,
    relatedObjectId: string,
    avatar: string,
    routeObjectId: string,
    relatedEvent: 'COMMENT_REPLY_EVENT'|
    'NEW_USER_CREATED_EVENT'
}

export default class NotificationRepository {
    private AGGREGATOR_URL = `http://${HOST}:8989/api/v1/aggregator`;
    private CONST_TOKEN = TOKEN;
    getNotifications = async ({page, pageSize} : {page: number, pageSize: number}): Promise<ApiResponse<Notification[]>> => {
        const response = await axios.get<ApiResponse<Notification[]>>(`${this.AGGREGATOR_URL}/query/notifications?page=${page}&pageSize=${pageSize}`, {
            headers: {
                Authorization: `Bearer ${this.CONST_TOKEN}`,
            },
        });
        return response.data;
    };
}

