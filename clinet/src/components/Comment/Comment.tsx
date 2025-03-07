import { FC, useCallback, useEffect, useState } from "react";
import { TComment, TUser } from "../../utils/types";
import styles from "./Comment.module.css";
import axios from "axios";
interface CommentProps {
  commentID: string;
}
export const Comment: FC<CommentProps> = ({ commentID }) => {
  const [comment, setComment] = useState<TComment | null>(null);
  const [user, setUser] = useState<TUser>();
  const fetchComment = useCallback(async () => {
    const { data } = await axios.get(
      `http://localhost:5000/comments/${commentID}`
    );
    setComment(data);
  }, [commentID]);
  const fetchUser = useCallback(async () => {
    if(comment !==null){
    const { data } = await axios.get(
      `http://localhost:5000/user/:${comment.author}`
    );
    console.log(data.data);
    setUser(data.data);
}
  }, [comment?.author]);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  useEffect(() => {
    fetchComment();
  }, [fetchComment]);
  return comment && user ? (
    <div className={`${styles.Comment}`}>
      <img
        className={`${styles.Image}`}
        src={`http://localhost:5000/${user?.avatar}`}
        alt=""
      />
      <p className={`${styles.TextComment}`} >{comment.comment}</p>
    </div>
  ) : null;
};
export default Comment;
