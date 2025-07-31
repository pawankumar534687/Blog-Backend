import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    coverImage: {
        url: {
            type: String,
            required: true,
        },
        public_id: {
            type: String,
            required: true,
        }
    },
    author:{
        type: String,
        required: true,
    }







}, {
    timestamps: true,
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog