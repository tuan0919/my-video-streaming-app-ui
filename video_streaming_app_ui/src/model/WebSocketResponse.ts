export default interface WsResponse<T> {
    type: 'count_unread' | 'new_video',
    payload: T,
};
