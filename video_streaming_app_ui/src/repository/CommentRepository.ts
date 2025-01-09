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

export interface CommentCreationRequestDTO {
    content: string,
    videoId: string,
    parentId?: string,
}

export interface CommentResponse {
    id: string,
    videoId: string,
    userId: string,
    content: string,
    parentId?: string,
    replyCounts: number,
    likeCounts: number,
    dislikeCounts: number,
    createAt: string,
}

export interface InteractCommentRequest {
    action: string,
}


export default class CommentRepository {
    private AGGREGATOR_URL = `http://${HOST}:8989/api/v1/aggregator`;
    private COMMENT_URL = `http://${HOST}:8989/api/v1/comment`;
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
    createNewComment = async (requestDTO : CommentCreationRequestDTO): Promise<ApiResponse<CommentResponse>> => {
        const response = await axios.post<ApiResponse<CommentResponse>>(`${this.COMMENT_URL}/users/new`, requestDTO, {
            headers: {
                Authorization: `Bearer ${this.CONST_TOKEN}`,
            },
        });
        return response.data;
    };
    reactToComment = async (requestDTO : InteractCommentRequest, commentId: string) : Promise<ApiResponse<string>> => {
        const response = await axios.post<ApiResponse<string>>(`${this.COMMENT_URL}/users/comment/${commentId}/interact`, requestDTO, {
            headers: {
                Authorization: `Bearer ${this.CONST_TOKEN}`,
            },
        });
        return response.data;
    };
}

