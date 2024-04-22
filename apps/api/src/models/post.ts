// Node JS approach
// export type Post = {
//   id: string;
//   title: string;
//   image: string;
//   description: string;
//   category: string;
//   comments: Array<[]>;
// };

// MongoDB approach
import mongoose, { Document, Schema, Types } from 'mongoose';

interface IPost extends Document {
  // id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  comments?: Types.Array<String>;
}

export const postSchema = new Schema<IPost>({
  // id: {
  //   type: String,
  //   required: true
  // },
  title: {
    type: String,
    required: [true, 'Property is required']
  },
  image: {
    type: String
  },
  description: {
    type: String,
    required: [true, 'Property is required']
  },
  category: {
    type: String,
    required: [true, 'Property is required']
  },
  comments: {
    type: [String]
  }
});

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;
