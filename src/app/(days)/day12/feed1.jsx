import { StyleSheet,View, FlatList, StatusBar } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Stack } from 'expo-router'
import VideoPost from '@Components/day12/VideoPost';

const dummyPosts = [
    {
        id: '2',
        video:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4',
        caption: 'Caption of the post',
    },
    {
        id: '1',
        video:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/1.mp4',
        caption: 'Hey there',
    },
    {
        id: '3',
        video:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/3.mp4',
        caption: 'Hola',
    },
    {
        id: '4',
        video:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/4.mp4',
        caption: 'Piano practice',
    },
    {
        id: '5',
        video:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/5.mp4',
        caption: 'Hello World!',
    },
];


const FeedScreen = () => {
    const [activePostId, setActivePostId] = useState(dummyPosts[0].id);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            // fetch posts from the server
            setPosts(dummyPosts);
        };

        fetchPosts();
    }, []);

    const viewabilityConfigCallbackPairs = useRef([
        {
          viewabilityConfig: { itemVisiblePercentThreshold: 50 },
          onViewableItemsChanged: ({ changed, viewableItems }) => {
            if (viewableItems.length > 0 && viewableItems[0].isViewable) {
              setActivePostId(viewableItems[0].item.id);
            }
          },
        },
      ]);

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar barStyle={'light-content'} />
            <FlatList
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                showsVerticalScrollIndicator={false}
                data={posts}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) => (
                    <VideoPost post={item} activePostId={activePostId}/>
                )}
                pagingEnabled
                
            />
        </View>
    )
}

export default FeedScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
})  