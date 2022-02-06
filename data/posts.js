import { USERS } from "./users";

export const POSTS = [
  {
    imageUrl: "https://i1.wp.com/digital-photography-school.com/wp-content/uploads/2018/07/Seascape-07.jpg?fit=1500%2C966&ssl=1",
    user: USERS[0].user,
    likes: 7870,
    caption: "“The Sea, once it casts its spell, holds one in its net of wonder forever.” ― Jacques-Yves Cousteau",
    profile_picture: USERS[0].image,
    comments: [
      {
        user: "xxiconxx",
        comment: "Where is it?"
      },
      {
        user: "xxrandomxx",
        comment: "I would love to go there"
      }
    ],
  },
  {
    imageUrl: "https://associationsnow.com/wp-content/uploads/2016/01/0111_javascript.jpg",
    user: USERS[1].user,
    likes: 7870,
    caption: "I'll be honest—learning to code was one of the best decisions I ever made",
    profile_picture: USERS[1].image,
    comments: [
      {
        user: "xxsamplexx",
        comment: "Seems complicating!"
      }
    ]
  }
]