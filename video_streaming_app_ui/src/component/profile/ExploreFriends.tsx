import React from 'react';
import { useMemo } from 'react';
import { FlatList, Image, ImageStyle, Text, TouchableOpacity } from 'react-native';
import { TextStyle, View, ViewStyle } from 'react-native';
import suggest_friends from '../../data/suggest_friends.json';

type SuggestFriend_Type = {
    username: string,
    type: string,
    avatar: string,
}

const friends : SuggestFriend_Type[] = suggest_friends;

const FriendCard = ({friend} : {friend: SuggestFriend_Type}) : React.JSX.Element => {
    type FriendCard = {
        card_wrapper?: ViewStyle,
        image_wrapper?: ViewStyle,
        image?: ImageStyle,
        username_text?: TextStyle,
        type_text?: TextStyle,
        follow_button?: ViewStyle,
        follow_text?: TextStyle
    }
    const style = useMemo<FriendCard>(() => ({
        card_wrapper: {
            backgroundColor: '#222222',
            width: 150,
            height: 210,
            alignItems: 'center',
            paddingVertical: 10,
            borderRadius: 5,
            gap: 10,
        },
        image_wrapper: {
            borderRadius: 50,
            overflow: 'hidden',
            width: 80,
            height: 80,
            borderWidth: 0.5,
            borderColor: 'gray',
        },
        image: {
            width: '100%',
            height: '100%',
        },
        username_text: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 13,
            textAlign: 'center',
        },
        type_text: {
            color: '#666666',
            fontWeight: 'bold',
            fontSize: 12,
            textAlign: 'center',
        },
        follow_button: {
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: '#4267B2',
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderRadius: 5,
            marginTop: 'auto',
        },
        follow_text: {
            fontWeight: 'bold',
            color: 'white',
            fontSize: 15,
        },
    }), []);
    return (
        <View style={[style.card_wrapper]}>
            <View style={[style.image_wrapper]}>
                <Image
                style={[style.image]}
                source={{uri: friend.avatar}} />
            </View>
            <View>
                <Text style={[style.username_text]}>{friend.username}</Text>
                <Text style={[style.type_text]}>{friend.type}</Text>
            </View>
            <TouchableOpacity style={[style.follow_button]}>
                <Text style={[style.follow_text]}>Theo dõi</Text>
            </TouchableOpacity>
        </View>
    );
};

const ItemSeperator = () : React.JSX.Element => {
    return <View style={{width: 10}}/>
}

const ExploreFriends = () : React.JSX.Element => {
    type ExploreFriendsStyle = {
        container: ViewStyle,
        title_wrapper?: ViewStyle,
        title_text?: TextStyle,
        title_seeAll_button?: TextStyle,
    }
    const style = useMemo<ExploreFriendsStyle>(() => ({
        container: {

        },
        title_wrapper: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        title_text: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 15,
        },
        title_seeAll_button: {
            color: '#4267B2',
            fontWeight: 'bold',
            fontSize: 15,
            paddingRight: 10,
        },
    }), []);
    return (
        <View style={[style.container]}>
            <View style={[style.title_wrapper]}>
                <Text style={[style.title_text]}>Khám phá mọi người</Text>
                <TouchableOpacity>
                    <Text style={[style.title_seeAll_button]}>Xem tất cả</Text>
                </TouchableOpacity>
            </View>
            <FlatList
            horizontal={true}
            data={friends}
            ItemSeparatorComponent={ItemSeperator}
            renderItem={({item}) => {
                return <FriendCard friend={item}
            />;
            }}
            />
        </View>
    );
};

export default ExploreFriends;
