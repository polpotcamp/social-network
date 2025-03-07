import Comment from '../models/comment.js'
import Post from '../models/post.js'
export const createComment = async (req, res) => {
    try {
        const { postId, comment } = req.body
        const userId =  req.user._id
        if (!comment)
            return res.json({ message: 'Комментарий не может быть пустым' })

        const newComment = new Comment({ comment: comment, author: userId })
        await newComment.save()

        try {
            await Post.findByIdAndUpdate(postId, {
                $push: { comments: newComment._id },
            })
        } catch (error) {
            console.log(error)
        }

        res.json(newComment)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}
export const getCommentByID = async (req,res) =>{
    try{
        const comment = await Comment.findById(req.params.id)
        res.json(comment)
    }catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}
export const getCommentsByPostId = async (req,res) =>{
    try{
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Пост не найден.' });
    
        const commentsIds = post.comments;
        res.json(commentsIds)
    }catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}