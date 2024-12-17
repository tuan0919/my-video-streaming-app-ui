import axios from 'axios';
import { ApiResponse } from '../model';

interface VideoDetails {
    ownerProfile: {
        userId: string;
        username: string;
        fullName: string;
    },
    stat: {
        videoId: string;
        name: string;
        link: string;
        description: string;
        viewCount: number;
        downVote: number;
        upVote: number;
        progress: number;
        action: string | null;
        createTime: string;
    },
    isFollowed: boolean,
} 

export default class VideoRepository {
    private AGGREGATOR_URL = 'http://192.168.1.21:8989/api/v1/aggregator';
    private CONST_TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJucWF0MDkxOSIsInNjb3BlIjoiUk9MRV9VU0VSIiwiaXNzIjoiaWRlbnRpdHktc2VydmljZSIsImlkIjoiYThkNTg5MDYtMjg4My00OTU2LTliZWMtZTY1MDg3ZGYyOTBkIiwiZXhwIjoxNzM0NDQ0MDEwLCJpYXQiOjE3MzQ0NDA0MTAsImp0aSI6IjRjYmZhM2E0LTFkZWEtNGE2MS1hODEwLWIzNmFmOGZlOTU5OSJ9.E4GjUErMNGweUeO7qkegOt9nUFMCa-YX0GKaIe50XZ7prG0TCC7Zv6eItlqh56AatZh6p6l0Rg-EQc7dnGM8fg';
    getVideoDetails = async (videoId: string): Promise<ApiResponse<VideoDetails>> => {
        const response = await axios.get<ApiResponse<VideoDetails>>(`${this.AGGREGATOR_URL}/query/video/${videoId}`, {
            headers: {
                Authorization: `Bearer ${this.CONST_TOKEN}`,
            },
        });
        return response.data;
    };
}

