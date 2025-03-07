import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreatePostForm.module.css";
import { postAPI } from "../../services/PostService";
const CreatePostForm = () => {
  const [title, setTitle] = React.useState<string>("");
  const [text, setText] = React.useState<string>("");
  const [image, setImage] = React.useState<null | File>(null);
  const [CreatePost, {}] = postAPI.useCreatePostMutation();
  const navigate = useNavigate();
  const submitHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("text", text);
      if(image){
      formData.append("image", image);
      }
      await CreatePost(formData).then(() => navigate("/"));
    } catch (error) {
      console.log(error);
    }
  };
  const clearFormHandler = () => {
    setText("");
    setTitle("");
  };
  return (
    <form
      className={`${styles.Container}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <label className={`${styles.AddImage}`}>
        Прикрепить изорбажение:
        <input
          type="file"
          className={`${styles.HiddenImage}`}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImage(e.target.files[0]);
            } else {
              setImage(null);
            }
          }}
        />
      </label>
      <div>
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt={image.name}
            className={`${styles.Image}`}
          />
        )}
      </div>
      <label className={`${styles.Text}`}>
        Заголовок поста:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок"
          className={`${styles.IntupTitle}`}
        />
      </label>
      <label className={`${styles.Text}`}>
        Текст поста:
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Текст поста"
          className={`${styles.IntupText}`}
        />
      </label>
      <div className="flex gap-8 items-center justify-center mt-4">
        <button
          onClick={submitHandler}
          className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
        >
          Добавить
        </button>
        <button
          onClick={clearFormHandler}
          className="flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4"
        >
          Отменить
        </button>
      </div>
    </form>
  );
};
export default CreatePostForm;
