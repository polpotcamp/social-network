import styles from "./FriendsList.module.css";
import { useAppSelector } from "../../hooks/redux";
import { UserItem } from "../UserItem/UserItem";
export const FriendsList = () => {
  const friends = useAppSelector((store) => store.userReducer.userFriends);
  const followers = useAppSelector((store) => store.userReducer.userFollowers);
  console.log(friends, followers);
  return (
    <div className={`${styles.Container}`}>
      <div className={`${styles.Column}`}>
        <h2 className={`${styles.Title}`}> Друзья</h2>
        <div className={`${styles.FriendsList}`}>
          {friends?.map((id:any, idx:any) => (
            <UserItem key={idx} userId={id} />
          ))}{" "}
        </div>
      </div>
      <div className={`${styles.Column}`}>
        <h2 className={`${styles.Title}`}> Подпищики</h2>
        <div className={`${styles.FollowersList}`}>
          {" "}
          {followers?.map((id:any, idx:any) => (
            <UserItem key={idx} userId={id} type="follower" />
          ))}
        </div>
      </div>
    </div>
  );
};
