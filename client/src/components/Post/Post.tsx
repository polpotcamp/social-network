import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import styles from "./Post.module.css";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { TPost, TUser } from "../../utils/types";
import { CreateComment } from "../../services/async/CreateComment";
import Moment from "react-moment";
import Comment from "../Comment/Comment";
import view from "../../Images/view.svg";
import rightArrow from "../../Images/right-arrow.svg";
import { useAppSelector } from "../../hooks/redux";
import { postAPI } from "../../services/PostService";
export const Post = () => {
  const dispatch = useAppDispatch();
  const [post, setPost] = useState<TPost | null>(null);
  const [postCreator, setPostCreator] = useState<TUser>();
  const [comment, setComment] = useState("");
  const params = useParams();
  const postId = params.id as string;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };
  const avatar = useAppSelector((state) => state.userReducer.userAvatar);
  const { data: fetchedPost } = postAPI.useFetchPostQuery(postId, {
    skip: !params.id,
  });
  const handleSubmit = async () => {
    try {
      const postId = params.id;
      await dispatch(CreateComment({ postId, comment }));
      setComment("");
      const { data } = await axios.get(
        `http://localhost:5000/comments/post/${params.id}`
      );
      if (post) {
        const updatedPost: TPost = { ...post, comments: data };
        setPost(updatedPost);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUser = useCallback(async () => {
    if (post !== null) {
      const { data } = await axios.get(
        `http://localhost:5000/user/:${post?.author}`
      );
      setPostCreator(data.data);
    }
  }, [post]);
  useEffect(() => {
    if (post !== null) {
      fetchUser();
    }
  }, [post]);
  useEffect(() => {
    if (fetchedPost) setPost(fetchedPost);
  }, [fetchedPost]);
  if (!post) {
    return <div className={`${styles.loading}`}>Загрузка...</div>;
  }
  return (
    <div className={`${styles.Container}`}>
      <img
        src={`http://localhost:5000/${post.imgUrl}`}
        alt=""
        className={`${styles.Image}`}
      />
      <div className={`${styles.Info}`}>
        <Link to={`/user/${postCreator?._id}`} className={`${styles.Author}`}>
          <img
            className={`${styles.AuthorAvatar}`}
            src={`http://localhost:5000/${postCreator?.avatar}`}
            alt=""
          />
          <p>{`${postCreator?.name} ${postCreator?.secondName}`}</p>
        </Link>
        <Moment date={post.createdAt} format="D MMM YYYY" />
      </div>
      <h2 className={`${styles.Title}`}>{post.title}</h2>
      <p className={`${styles.Text}`}>{post.text}</p>
      <div className={`${styles.Views}`}>
        <img src={view} alt="ViewsIcon" className={`${styles.ViewsIcon}`} />
        <span>{post.views}</span>
      </div>
      <div className={`${styles.Comments}`}>
        <form
          className={`${styles.CreateComment}`}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className={`${styles.UserAvatarContainer}`}>
          <img
            src={`http://localhost:5000/${avatar}`}
            alt=""
            className={`${styles.UserAvatar}`}
          />
          </div>
          <textarea
            ref={textareaRef}
            maxLength={480}
            onInput={handleInput}
            className={`${styles.TextComment}`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className={`${styles.ButtonCommentContainer}`}>
          <button className={`${styles.ButtonComment}`} onClick={handleSubmit}>
            <img src={rightArrow} alt="" className={`${styles.CommentImg}`} />
          </button>
          </div>
        </form>
        <p className={`${styles.Title}`}>Коментарии</p>
        <div className={`${styles.List}`}>
          {post.comments?.map((comment, idx) => (
            <Comment commentID={comment} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};
