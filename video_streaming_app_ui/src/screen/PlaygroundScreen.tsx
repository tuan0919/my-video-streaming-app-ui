import React from 'react';
import { Button, Text, View } from 'react-native';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const PlayGroundScreen = () : React.JSX.Element => {
    const WEBSOCKET_URL = 'http://192.168.1.164:59013/notification/websocket';
    const client = new Client({
        webSocketFactory: () => new SockJS(WEBSOCKET_URL),
        connectHeaders: {
            login: 'user',
            passcode: 'password',
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
