const mongoose = require('mongoose')
const postSchema = new mongoose.Schema(
    {
      content: {
        type: String,
        required: [true, 'Content 未填寫']
      },
      image: {
        type:String,
        default:""
      },
      createdAt: {
        type: Date,
        default: Date.now,
        // select: false
      },
      user: {
          type: mongoose.Schema.ObjectId, // 指定為 mongoose id 格式
          ref: "user", // 關連到 user collection
          required: [true, '貼文姓名未填寫']
      },
      likes: {
          type:Number,
          default:0
        }
    }
);
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
