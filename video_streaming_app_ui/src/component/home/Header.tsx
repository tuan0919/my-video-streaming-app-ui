import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {AppLogo} from '../index.ts';
import { IMessage } from '@stomp/stompjs';
import { WebSocketContext } from '../provider/WebSocketProvider.tsx';
import { NotificationRepository, UnreadCountResponse } from '../../repository';
import { WsResponse } from '../../model';

export default function Header(): React.JSX.Element {
  const {subscribe, unsubscribe, isConnected} = useContext(WebSocketContext);
  useEffect(() => {
    const handleNotification = (message: IMessage) => {
      const response : WsResponse<any> = JSON.parse(message.body);
      if (response.type === 'count_unread') {
        const data : UnreadCountResponse = response.payload;
        setCount(data.unreadCount);
      }
    };
    if (isConnected) {
      subscribe('notification', handleNotification);
    }
    return () => {
      unsubscribe('notification', handleNotification);
    };
  }, [isConnected, subscribe, unsubscribe]);
  const [count, setCount] = useState<number>(0);
  const notificationRepository = useMemo(() => new NotificationRepository(), []);
  const fetchCountNotification = useCallback(async () => {
    try {
      const response = await notificationRepository.countUnreadnotifications();
      if (response && response.result) {
          setCount(() => response.result.unreadCount);
      } else {
          console.error('Invalid response:', response);
      }
    } catch (error : any) {
      console.error(error);
    }
  }, [notificationRepository]);
  useEffect(() => {
    fetchCountNotification();
  }, [fetchCountNotification]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity>
          <AppLogo />
        </TouchableOpacity>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity>
          <IconAntDesign style={styles.icon} name="plussquareo" />;
        </TouchableOpacity>
        <TouchableOpacity>
          <IconAntDesign style={styles.icon} name="hearto" />;
        </TouchableOpacity>
        <TouchableOpacity style={{position: 'relative'}}>
          <IconIonicons style={styles.icon} name="notifications-outline"/>
          {
            count > 0 &&
            <View style={styles.unreadBadget}>
              <Text style={styles.badgetText}>{count}</Text>
            </View>
          }
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  iconsContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  icon: {
    color: 'white',
    fontSize: 30,
  },

  unreadBadget: {
    top: -5,
    left: 15,
    backgroundColor: '#ff3f3f',
    position: 'absolute',
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgetText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  }

});
