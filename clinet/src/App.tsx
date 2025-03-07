import "./App.css";
import { Routes, Route } from "react-router-dom";
import { OnlyUnAuth, OnlyAuth } from "./components/ProtectedRouteElement";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import CreatePostPage from "./pages/CreatePostPage";
import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { useEffect } from "react";
import { GetUserData } from "./services/async/GetUserData";
import AppHeader from "./components/AppHeader/AppHeader";
import UserPage from "./pages/UserPage";
import NavBar from "./components/NavBar/NavBar";
import UsersPage from "./pages/UsersPage";
import FriendsPage from "./pages/FriendsPage";
import ConversationsPage from "./pages/ConversationsPage";
import MessangerPage from "./pages/MessangerPage";
function App() {
  const dispatch = useAppDispatch();
  const isauth = useAppSelector((store) => store.userReducer.isAuthorization);
  useEffect(() => {
    dispatch(GetUserData());
  }, [dispatch]);
  return (
    <div className="App">
      <AppHeader />
      {isauth ? <NavBar /> : null}
      <Routes>
        <Route
          path="/registration"
          element={<OnlyUnAuth component={<RegistrationPage />} />}
        />
        <Route
          path="/login"
          element={<OnlyUnAuth component={<LoginPage />} />}
        />
        <Route
          path="/createPost"
          element={<OnlyAuth component={<CreatePostPage />} />}
        />
        <Route path="/users" element={<OnlyAuth component={<UsersPage />} />} />
        <Route
          path="/user/:id"
          element={<OnlyAuth component={<UserPage />} />}
        />
        <Route path="/" element={<MainPage />} />
        <Route
          path="/posts/:id"
          element={<OnlyAuth component={<PostPage />} />}
        />
        <Route
          path="/friends"
          element={<OnlyAuth component={<FriendsPage />} />}
        />
        <Route
          path="/messenger/:id"
          element={<OnlyAuth component={<MessangerPage />} />}
        />
        <Route
          path="/conversations"
          element={<OnlyAuth component={<ConversationsPage />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
