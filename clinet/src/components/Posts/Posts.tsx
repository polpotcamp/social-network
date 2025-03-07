import styles from "./Posts.module.css";
import React from "react";
import PostItem from "../PostItem/PostItem";
import { TPost } from "../../utils/types";
import { postAPI } from "../../services/PostService";
const Posts = () => {
  const [nameColumn, setNameColumn] = React.useState<string>("Последние посты");
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const { data: posts } = postAPI.useFetchAllPostsQuery();
  const [finalPosts, setFinalPosts] = React.useState<Array<TPost> | null>(null);
  const handleSort = (index: number, sortType: string, nameColumn: string) => {
    setActiveIndex(index);
    setNameColumn(nameColumn);
    if (posts) {
      let sortedPosts = [...posts];
      switch (sortType) {
        case "new":
          sortedPosts.sort(
            (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
          );
          break;
        case "mostViews":
          sortedPosts.sort((a, b) => b.views - a.views);
          break;
        case "mostComments":
          sortedPosts.sort((a, b) => b.comments.length - a.comments.length);
          break;
      }
      setFinalPosts(sortedPosts);
    }
  };
  React.useEffect(() => {
    if (posts) {
      setFinalPosts(posts);
    }
  }, [posts]);
  if (!finalPosts) {
    return <div className={`${styles.loading}`}>Загрузка...</div>;
  }
  return (
    <>
      <ul className={`${styles.Sorts}`}>
        <li
          className={`${styles.SortItem} ${
            activeIndex === 0 ? styles.active : ""
          }`}
          onClick={() => handleSort(0, "new", "Последние посты")}
        >
          Новые
        </li>
        <li
          className={`${styles.SortItem} ${
            activeIndex === 1 ? styles.active : ""
          }`}
          onClick={() => handleSort(1, "mostViews", "Популярные посты")}
        >
          Самые популярные
        </li>
        <li
          className={`${styles.SortItem} ${
            activeIndex === 2 ? styles.active : ""
          }`}
          onClick={() => handleSort(2, "mostComments", "Комментируемые посты")}
        >
          Самые комментируемые
        </li>
      </ul>
      <h2 className={`${styles.NameColumn}`}>{nameColumn}</h2>
      <div className={`${styles.Column}`}>
        {finalPosts.map((post, idx) => (
          <PostItem key={idx} post={post} />
        ))}
      </div>
    </>
  );
};
export default Posts;
