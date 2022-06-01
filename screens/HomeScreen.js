import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import Header from '../Components/Home/Header'
import { SafeAreaView, } from 'react-native-safe-area-context';
import Stories from '../Components/Home/Stories';
import Post from '../Components/Home/Post';
import { POSTS } from "../data/posts"
import BottomTabs, { bottomTabIcons } from '../Components/Home/BottomTabs';
import { db } from '../firebase';

const HomeScreen = ({navigation}) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    db.collectionGroup('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => doc.data()))
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex:1,
  }
})

export default HomeScreen
