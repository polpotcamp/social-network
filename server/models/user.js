import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        secondName:{
          type: String,
          required: true,
          unique: false,
        },
        password: {
            type: String,
            required: true,
        },
        about:{
          type: String,
          
        },   
        avatar:{
          type: String
        },
        email:{
          unique: true,
          type: String,
          required: true,
        },
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post',
            },
        ],
        followers: [
          {
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
          },
      ],
        followings: [
          {
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
          },
      ],
        friends: [
          {
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
          },
      ]
    },
    { timestamps: true },
)

export default mongoose.model('User', UserSchema)