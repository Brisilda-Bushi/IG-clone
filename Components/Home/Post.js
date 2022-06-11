import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { firebase, db } from '../../firebase';

const postFooterIcons = [
  {
    name: 'Like',
    imageUrl: 'https://img.icons8.com/fluency-systems-regular/96/ffffff/like--v1.png',
    likedImageUrl:
      'https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-heart-miscellaneous-kiranshastry-lineal-color-kiranshastry.png',
  },
  {
    name: 'Comment',
    imageUrl: 'https://img.icons8.com/material-outlined/48/ffffff/speech-bubble--v1.png',
  },
  {
    name: 'Share',
    imageUrl: 'https://img.icons8.com/fluency-systems-regular/96/ffffff/sent.png',
  },
  {
    name: 'Save',
    imageUrl: 'https://img.icons8.com/fluency-systems-regular/96/ffffff/bookmark-ribbon--v1.png',
  },
];

const Post = ({ post }) => {
  const handleLike = (post) => {
    const currentLikeStatus = !post.likes_by_users.includes(firebase.auth().currentUser.email);

    db.collection('users')
      .doc(post.owner_email)
      .collection('posts')
      .doc(post.id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.email)
          : firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.email),
      })
      .then(() => {
        console.log('✅ Document successfully updated!');
      })
      .catch((error) => {
        console.error('Error updating document: ', error);
      });
  };

  return (
    <View style={{ marginBottom: 50 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter post={post} handleLike={handleLike} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentsSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        alignItems: 'center',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{ uri: post.profile_picture.large }} style={styles.story} />
        <Text style={{ color: 'white', marginLeft: 5, fontWeight: '700' }}>{post.user}</Text>
      </View>
      <Text style={{ color: 'white', fontWeight: '700' }}>...</Text>
    </View>
  );
};

const PostImage = ({ post }) => {
  return (
    <View
      style={{
        width: '100%',
        height: 450,
      }}
    >
      <Image source={{ uri: post.imageUrl }} style={{ height: '100%', resizeMode: 'cover' }} />
    </View>
  );
};

const PostFooter = ({ handleLike, post }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.leftFootContainer}>
        <TouchableOpacity onPress={() => handleLike(post)}>
          <Image
            style={styles.footerIcon}
            source={{
              uri: post.likes_by_users.includes(firebase.auth().currentUser.email)
                ? postFooterIcons[0].likedImageUrl
                : postFooterIcons[0].imageUrl,
            }}
          />
        </TouchableOpacity>
        <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl} />
        <Icon imgStyle={[styles.footerIcon, styles.shareIcon]} imgUrl={postFooterIcons[2].imageUrl} />
      </View>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
      </View>
    </View>
  );
};

const Icon = ({ imgStyle, imgUrl }) => {
  return (
    <TouchableOpacity>
      <Image style={imgStyle} source={{ uri: imgUrl }} />
    </TouchableOpacity>
  );
};

const Likes = ({ post }) => {
  return (
    <View style={{ flexDirection: 'row', marginTop: 4 }}>
      <Text style={{ color: 'white', fontWeight: '600' }}>{post.likes_by_users.length.toLocaleString()} likes</Text>
    </View>
  );
};

const Caption = ({ post }) => {
  return (
    <View style={{ marginTop: 5 }}>
      <Text style={{ color: 'white' }}>
        <Text style={{ fontWeight: '700' }}>{post.user}</Text>
        <Text> {post.caption}</Text>
      </Text>
    </View>
  );
};

const CommentsSection = ({ post }) => {
  return (
    <View style={{ marginTop: 5 }}>
      {!!post.comments.length && (
        <Text style={{ color: 'gray' }}>
          View {post.comments.length > 1 ? 'all' : ''} {post.comments.length}{' '}
          {post.comments.length > 1 ? 'comments' : 'comment'}
        </Text>
      )}
    </View>
  );
};

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: 'row', marginTop: 5 }}>
        <Text style={{ color: 'white' }}>
          <Text style={{ fontWeight: '700' }}>{comment.user}</Text> {comment.comment}
        </Text>
      </View>
    ))}
  </>
);

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#ff8501',
  },
  footerIcon: {
    width: 33,
    height: 33,
  },
  shareIcon: {
    transform: [{ rotate: '320deg' }],
    marginTop: -3,
  },
  leftFootContainer: {
    flexDirection: 'row',
    width: '32%',
    justifyContent: 'space-between',
  },
});

export default Post;
