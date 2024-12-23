import React from 'react';
import { Button, Text, View } from 'react-native';
import { Client, IFrame } from '@stomp/stompjs';

const PlayGroundScreen = () : React.JSX.Element => {
    const WEBSOCKET_URL = 'http://192.168.1.164:8989/api/v1/notification/websocket';
    const USER_ID = '91301499-9a07-4d92-a993-0e55456af54c';
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJucWF0MDkxOSIsInNjb3BlIjoiUk9MRV9VU0VSIiwiaXNzIjoiaWRlbnRpdHktc2VydmljZSIsImlkIjoiOTEzMDE0OTktOWEwNy00ZDkyLWE5OTMtMGU1NTQ1NmFmNTRjIiwiZXhwIjoxNzM0OTAxOTQzLCJpYXQiOjE3MzQ4OTgzNDMsImp0aSI6IjkzYmIyOTEyLWZlMjYtNDU2Yy1hOTNlLTgyNmZhYWY1MTY0NSJ9.EvCep8fPulXHJ7yfrpK6Nti-jP9KNohdKr4CUQFHaUc31Bodku424KN0jbwQlSEe9_Te3Y1byPusFq5cdj48_Q';
    const client = new Client({
        webSocketFactory: () => new WebSocket(WEBSOCKET_URL, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
        onConnect: function (frame: IFrame) {
            console.log('Connected to server!');
            console.log(frame);
            client.subscribe(`/topic/${USER_ID}/notification`, (message) => {
                console.log(message.body);
            });
            client.publish({
                destination: '/app/message',
                body: 'Hello, server!',
            });
            console.log('Message sent to server!');
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
    return (
        <View style={[{
                height: '100%',
                width: '100%',
                alignContent: 'center',
                justifyContent: 'center',
                },
            ]}>
            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>This is just a playground screen</Text>
            <Button title="connect" onPress={() => {
                client.activate();
            }}/>
        </View>
    );
};

export default PlayGroundScreen;
