import React, { createContext, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import { HOST, TOKEN } from '../../data/enviroment';

interface WebSocketContextProps {
    subscribe: (topic: string, callback: (message: IMessage) => void) => void;
    unsubscribe: (topic: string, callback: (message: IMessage) => void) => void;
    isConnected: boolean;
}
export const WebSocketContext = createContext<WebSocketContextProps>({
    subscribe: () => {},
    unsubscribe: () => {},
    isConnected: false,
});
const WebSocketProvider = ({children} : {children: ReactNode}) : React.JSX.Element => {
    const WEBSOCKET_URL = `http://${HOST}:8989/api/v1/socket/websocket`;
    const USER_ID = '91301499-9a07-4d92-a993-0e55456af54c';
    const client = useRef<Client | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    // Quản lý danh sách subscriptions dưới dạng `{ topic: [callback1, callback2, ...] }`
    const topicSubscriptions = useRef<Record<string, ((message: IMessage) => void)[]>>({});
    // Hàm đăng ký callback cho một topic
    const subscribe = useCallback((topic: string, callback: (message: IMessage) => void) => {
        if (!topicSubscriptions.current[topic]) {
        topicSubscriptions.current[topic] = [];
        // Đăng ký topic lần đầu với WebSocket client
        if (client.current?.connected) {
            client.current.subscribe(`/topic/${USER_ID}/${topic}`, (message) => {
                topicSubscriptions.current[topic]?.forEach((cb) => cb(message));
            });
        }
        }
        // Thêm callback vào danh sách
        topicSubscriptions.current[topic].push(callback);
    }, []);
    // Hàm hủy đăng ký callback cho một topic
    const unsubscribe = useCallback((topic: string, callback: (message: IMessage) => void) => {
        const callbacks = topicSubscriptions.current[topic];
        if (callbacks) {
            topicSubscriptions.current[topic] = callbacks.filter((cb) => cb !== callback);

            // Nếu không còn callback nào cho topic, có thể hủy đăng ký với WebSocket client
            if (topicSubscriptions.current[topic].length === 0) {
                delete topicSubscriptions.current[topic];
                client.current?.unsubscribe(`/topic/${USER_ID}/${topic}`);
            }
        }
    }, []);
    useEffect(() => {
        client.current = new Client({
            webSocketFactory: () => new WebSocket(WEBSOCKET_URL, null, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }),
            onConnect: function () {
                console.log('WebSocket connected');
                setIsConnected(true);
                // Đăng ký lại tất cả các topic với WebSocket client
                Object.keys(topicSubscriptions.current).forEach((topic) => {
                  client.current?.subscribe(`/topic/${USER_ID}/${topic}`, (message) => {
                    topicSubscriptions.current[topic]?.forEach((cb) => cb(message));
                  });
                });
            },
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 200,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            forceBinaryWSFrames: true,
            appendMissingNULLonIncoming: true,
        });
        client.current.activate();
        return () => {
          client.current?.deactivate();
        };
    });
    return (
        <WebSocketContext.Provider value={{subscribe, unsubscribe, isConnected}}>
            {children}
        </WebSocketContext.Provider>
    );
};

export default WebSocketProvider;
