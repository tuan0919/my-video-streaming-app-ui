import axios from 'axios';
import { ApiResponse } from '../model';
import { HOST, TOKEN } from '../data/enviroment';

export interface CommentDetails {
    ownerProfile: Profile,
    comment: Comment,
    action?: string | null,
}

interface Profile {
    userId: string,
    username: string,
    avatar: string,
}

interface Comment {
    id: string,
    videoId: string,
    content: string,
    parentId: string,
    replyCounts: number,
    likeCounts: number,
    dislikeCounts: number,
    createTime: string,
}


export default class CommentRepository {
    private AGGREGATOR_URL = `http://${HOST}:8989/api/v1/aggregator`;
    private CONST_TOKEN = TOKEN;
    getCommentsOfVideo = async ({videoId, page, pageSize} : {videoId: string, page: number, pageSize: number}): Promise<ApiResponse<CommentDetails[]>> => {
        const response = await axios.get<ApiResponse<CommentDetails[]>>(`${this.AGGREGATOR_URL}/query/video/${videoId}/comments?page=${page}&pageSize=${pageSize}`, {
            headers: {
                Authorization: `Bearer ${this.CONST_TOKEN}`,
            },
        });
        return response.data;
    };
    getCommentsReplyOfComment = async ({commentId, page, pageSize} : {commentId: string, page: number, pageSize: number}): Promise<ApiResponse<CommentDetails[]>> => {
        const response = await axios.get<ApiResponse<CommentDetails[]>>(`${this.AGGREGATOR_URL}/query/comment/${commentId}/reply?page=${page}&pageSize=${pageSize}`, {
            headers: {
                Authorization: `Bearer ${this.CONST_TOKEN}`,
            },
        });
        return response.data;
    };
}

