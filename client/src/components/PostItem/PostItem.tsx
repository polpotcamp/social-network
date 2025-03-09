import styles from "./PostItem.module.css";
import React, { FC, useCallback } from "react";
import { Link } from "react-router-dom";
import { TPost, TUser } from "../../utils/types";
import Moment from "react-moment";
import axios from "axios";
import view from "../../Images/view.svg";
import comment from "../../Images/comment.svg";
import arrowDown from "../../Images/arrow-down.svg";
interface PostItemProps {
  post: TPost;
}
const PostItem: FC<PostItemProps> = ({ post }) => {
  const [user, setUser] = React.useState<TUser>();
  const fetchUser = useCallback(async () => {
    const { data } = await axios.get(
      `http://localhost:5000/user/:${post.author}`
    );
    setUser(data.data);
  }, [post.author]);
  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  if (!post) {
    return <div className={`${styles.loading}`}>Загрузка...</div>;
  }
  return (
    <div className={`${styles.Container}`}>
      <div className={`${styles.PostItem}`}>
        <img
          src={`http://localhost:5000/${post.imgUrl}`}
          alt=""
          className={`${styles.image}`}
        />
        <div className={`${styles.Column}`}>
          <div className={`${styles.TwoColumns}`}>
            <Link
              to={`/user/${user?._id}`}
              style={{ textDecoration: "none" }}
              className={`${styles.Author}`}
            >
              <img
                className={`${styles.AuthorAvatar}`}
                src={`http://localhost:5000/${user?.avatar}`}
                alt=""
              />
              <p  className={`${styles.AuthorName}`}> {user ? user.name : "автор неизвестен"}</p>
            </Link>
            <Moment fromNow>{post.createdAt}</Moment>
          </div>
          <Link to={`/posts/${post._id}`} className={`${styles.Title}`}>
            {post.title}
          </Link>
          <p className={`${styles.Text}`}>{post.text}</p>
          <div className={`${styles.Bot}`}>
            <div className={`${styles.IconWithText}`}>
              <img className={`${styles.Icon}`} src={view} alt="" />{" "}
              <span className={`${styles.Number}`}>{post.views}</span>
            </div>
            <Link
              to={`/posts/${post._id}`}
              className={`${styles.IconWithText} ${styles.Link}`}
            >
              <p>Читать далее</p>
              <img src={arrowDown} alt="" className={`${styles.Icon}`} />
            </Link>
            <div className={`${styles.IconWithText}`}>
              <img src={comment} alt="" className={`${styles.Icon}`} />
              <span className={`${styles.Number}`}>{post.comments.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostItem;
