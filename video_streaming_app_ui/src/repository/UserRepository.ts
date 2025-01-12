import axios from 'axios';
import { ApiResponse } from '../model';
import { HOST, TOKEN } from '../data/enviroment';

export interface ClientView_UserPageDetailsDTO {
    user : {
        userId: string,
        username: string,
        fullName: string,
        avatar: string,
        gender: boolean,
        country: string | null,
        address: string | null,
        bio: string | null
    },
    stats: {
        videoCounts: number,
        followersCounts: number,
        followingCounts: number,
    },
    myself: boolean,
    followed: boolean,
}

export interface UpdateProfileRequest {
    fullName: string,
    gender: boolean,
    country: string,
    address: string,
    bio: string,
}

export default class UserRepository {
    private AGGREGATOR_URL = `http://${HOST}:8989/api/v1/aggregator`;
    private PROFILE_URL = `http://${HOST}:8989/api/v1/profile`;
    private CONST_TOKEN = TOKEN;
    getUserPage = async (userId : string): Promise<ApiResponse<ClientView_UserPageDetailsDTO>> => {
        const response = await axios.get<ApiResponse<ClientView_UserPageDetailsDTO>>(`${this.AGGREGATOR_URL}/query/user/page/${userId}`, {
            headers: {
                Authorization: `Bearer ${this.CONST_TOKEN}`,
            },
        });
        return response.data;
    };
    updateProfile = async (request : UpdateProfileRequest): Promise<ApiResponse<string>> => {
        const response = await axios.put<ApiResponse<string>>(`${this.PROFILE_URL}/users/info`, request, {
            headers: {
                Authorization: `Bearer ${this.CONST_TOKEN}`,
            },
        });
        return response.data;
    };
}

