import { Router } from 'express'
const router = new Router()
import auth from '../middlewares/auth.js'
import { createComment,getCommentByID, getCommentsByPostId} from '../controllers/comments.js'


router.post('/comments/:id', auth, createComment)
router.get('/comments/:id', getCommentByID)
router.get('/comments/post/:id', getCommentsByPostId)
export default router