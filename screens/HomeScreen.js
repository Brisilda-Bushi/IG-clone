import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Header from '../Components/Home/Header'
import { SafeAreaView, } from 'react-native-safe-area-context';
import Stories from '../Components/Home/Stories';
import Post from '../Components/Home/Post';
import { POSTS } from "../data/posts"
import BottomTabs, { bottomTabIcons } from '../Components/Home/BottomTabs';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Stories />
      <ScrollView>
        {POSTS.map((post, index) => (
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
