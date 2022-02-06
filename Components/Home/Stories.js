import React from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { USERS } from '../../data/users'


const Stories = () => {
  return (
    <View style={{ marginBottom: 13}}>
      <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      >
        {USERS.map((story, index) => (
          <TouchableOpacity key={index} style={{ alignItems: "center" }}>
            <Image 
            source={{uri: story.image}}
            style={styles.story}
            />
            <Text style={{ color: "white", marginLeft: 10}}>{
              story.user.length > 11 ? story.user.slice(0, 10).toLowerCase() + "..." : story.user.toLowerCase()
            }</Text>
          </TouchableOpacity>
        ))}
       
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  story:{
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 10,
    borderWidth: 2,
    borderColor: "#ff8501",
  },
})

export default Stories
