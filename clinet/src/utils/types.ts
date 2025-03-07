export interface TInitialStateUser {
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar: string;
  userAbout: string;
  userSecondName: string;
  isAuthChecked: boolean;
  isAuthorization: boolean;
  userFollowings: Array<string>;
  userFollowers: Array<string>;
  userFriends: Array<string>;
}
export interface TInitialStatePosts {
  posts: Array<TPost>;
 // popularPosts: Array<TPost>;
  loading: boolean;
}
export type TUser = {
  readonly _id: string;
  readonly name: string;
  readonly secondName: string;
  readonly email: string;
  readonly avatar: string;
  readonly about: string;
  readonly posts: Array<TPost>;
  readonly followings: Array<string>;
  readonly followers: Array<string>;
  readonly friends: Array<string>;
};
export type TPost = {
  _id: string;
  title: string;
  text: string;
  imgUrl: string;
  author: string;
  views: number;
  comments: Array<string>;
  createdAt: string;
};
export type TComment = {
  comment: string;
  author: string;
};
export type TConversation = {
  readonly members: Array<string>;
  readonly _id: string;
};
export type TMessage = {
  readonly conversationId: string;
  readonly sender: string;
  readonly text: string;
  readonly createdAt: string;
};

