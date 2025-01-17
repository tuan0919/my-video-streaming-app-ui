import axios from 'axios';
import { ApiResponse } from '../model';
import { HOST, TOKEN } from '../data/enviroment';

export default interface VideoDetails {
    ownerProfile: {
        userId: string;
        username: string;
        fullName: string;
        avatar: string;
    },
    stat: {
        videoId: string;
        name: string;
        link: string;
        thumbnail: string;
        description: string;
        viewCount: number;
        downVote: number;
        upVote: number;
        progress: number;
        action: 'UP_VOTE' | 'DOWN_VOTE' | undefined | null;
        createTime: string;
        commentCount: number,
    },
    isFollowed: boolean,
}

export interface ClientView_SearchVideoDTO {
    videoId: string,
    thumbnail: string,
}

interface SignedURLResponse {
    link: string,
}

interface PutFileRequest {
    filename: string,
}

interface UploadVideoResponse {
    videoId: string,
    description: string,
    videoName: string,
    videoURL: string,
    createAt: string,
}

interface UploadVideoRequest {
    videoKey: string,
    thumbnailKey: string,
    description: string,
    videoName: string
}

export default class VideoRepository {
    private AGGREGATOR_URL = `http://${HOST}:8989/api/v1/aggregator`;
    private VIDEO_SERVICE = `http://${HOST}:8989/api/v1/video-streaming`;
    private CONST_TOKEN = TOKEN;
    getVideoDetails = async (videoId: string): Promise<ApiResponse<VideoDetails>> => {
        const response = await axios.get<ApiResponse<VideoDetails>>(`${this.AGGREGATOR_URL}/query/video/${videoId}`, {
            headers: {
                Authorization: `Bearer ${this.CONST_TOKEN}`,
            },
        });
        return response.data;
    };
    getVideoPostedBy = async ({userId, page, pageSize}: {userId: string, page: number, pageSize: number}): Promise<ApiResponse<VideoDetails[]>> => {
        const response = await axios.get<ApiResponse<VideoDetails[]>>(`${this.AGGREGATOR_URL}/query/user/posted?page=${page}&pageSize=${pageSize}&userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${this.CONST_TOKEN}`,
            },
        });
        return response.data;
    };
    putFileRequest = async (data : PutFileRequest): Promise<ApiResponse<SignedURLResponse>> => {
        const response = await axios.put<ApiResponse<SignedURLResponse>>(`${this.VIDEO_SERVICE}/videos/upload`, data, {
            headers: {
                Authorization: `Bearer ${this.CONST_TOKEN}`,
            },
        });
        return response.data;
    };
    uploadVideoRequest = async (data : UploadVideoRequest) : Promise<ApiResponse<UploadVideoResponse>> => {
        const response = await axios.post<ApiResponse<UploadVideoResponse>>(`${this.VIDEO_SERVICE}/videos`, data, {
            headers: {
                Authorization: `Bearer ${this.CONST_TOKEN}`,
            },
        });
        return response.data;
    };
    fetchNewFeed = async ({page, pageSize} : {page: number, pageSize: number}) : Promise<ApiResponse<VideoDetails[]>> => {
        const response = await axios.get<ApiResponse<VideoDetails[]>>(`${this.AGGREGATOR_URL}/query/video/new-feed?page=${page}&pageSize=${pageSize}`, {
            headers: {
                Authorization: `Bearer ${this.CONST_TOKEN}`,
            },
        });
        return response.data;
    };
    fetchNewFeedExclude = async ({page, pageSize, videoId} : {page: number, pageSize: number, videoId: string}) : Promise<ApiResponse<VideoDetails[]>> => {
        const response = await axios.get<ApiResponse<VideoDetails[]>>(`${this.AGGREGATOR_URL}/query/video/new-feed?page=${page}&pageSize=${pageSize}&exclude=${videoId}`, {
            headers: {
                Authorization: `Bearer ${this.CONST_TOKEN}`,
            },
        });
        return response.data;
    };
    searchVideo = async ({page, pageSize, title} : {page: number, pageSize: number, title: string}) : Promise<ApiResponse<ClientView_SearchVideoDTO[]>> => {
        const response = await axios.get<ApiResponse<ClientView_SearchVideoDTO[]>>(`${this.AGGREGATOR_URL}/query/search/video?page=${page}&pageSize=${pageSize}&title=${title}`, {
            headers: {
                Authorization: `Bearer ${this.CONST_TOKEN}`,
            },
        });
        return response.data;
    };
}

