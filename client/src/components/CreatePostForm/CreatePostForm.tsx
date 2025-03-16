import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreatePostForm.module.css";
import { postAPI } from "../../services/PostService";
const CreatePostForm = () => {
  const [title, setTitle] = React.useState<string>("");
  const [text, setText] = React.useState<string>("");
  const [image, setImage] = React.useState<null | File>(null);
  const imageRef = React.useRef<HTMLInputElement>(null);
  const [titleDirty, setTitleDirty] = React.useState<boolean>(false);
  const [textDirty, setTextDirty] = React.useState<boolean>(false);
  const [titleError, setTitleError] = React.useState<string>(
    "Пост должен иметь название"
  );
  const [textError, setTextError] = React.useState<string>(
    "Пост должен иметь текст"
  );
  const [formValid, setFormValid] = React.useState<boolean>(false);
  const [CreatePost, {}] = postAPI.useCreatePostMutation();
  const navigate = useNavigate();
  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    if (value.length >= 75) {
      setTitleError("Название поста слишком длинное");
    } else if (value.length === 0) {
      setTitleError("Пост должен иметь название");
    } else {
      setTitleError("");
    }
  };
  const textHanler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(e.target.value);
    if (value.length >= 10000) {
      setTextError("Пост слишком длинный");
    }else if (value.length === 0) {
      setTextError("Пост должен иметь текст");
    } else {
      setTextError("");
    }
  };
  const blurHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    switch (e.target.name) {
      case "title":
        setTitleDirty(true);
        break;
      case "text":
        setTextDirty(true);
        break;
    }
  };

  const submitHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("text", text);
      if (image) {
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
    setImage(null);
    if (imageRef.current) imageRef.current.value = "";
  };
  React.useEffect(() => {
    if (titleError || textError ||image=== null) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [titleError, textError, image]);
  return (
    <form
      className={`${styles.Container}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <label className={`${styles.AddImage}`}>
        Прикрепить изорбажение:
        <input
          ref={imageRef}
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
      <>
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt={image.name}
            className={`${styles.Image}`}
          />
        )}
      </>
      <label className={`${styles.Text}`}>
        Заголовок поста:
        {titleDirty && titleError && (
          <p className={styles.Error}>{titleError}</p>
        )}
        <input
          onBlur={blurHandler}
          name="title"
          type="text"
          value={title}
          min={1}
          max={75}
          required
          onChange={(e) => titleHandler(e)}
          placeholder="Заголовок"
          className={`${styles.IntupTitle}`}
        />
      </label>
      <label className={`${styles.Text}`}>
        Текст поста:
        {textDirty && textError && <p className={styles.Error}>{textError}</p>}
        <textarea
          onBlur={blurHandler}
          name="text"
          required
          minLength={10}
          maxLength={10000}
          onChange={(e) => textHanler(e)}
          value={text}
          placeholder="Текст поста"
          className={`${styles.IntupText}`}
        />
      </label>
      <div className={`${styles.Buttons}`}>
        <button
          onClick={submitHandler}
          className={`${styles.Button} ${!formValid? styles.ButtonDisable: ''}`}
          disabled={!formValid}
        >
          Добавить
        </button>
        <button onClick={clearFormHandler} className={`${styles.Button}`}>
          Отмена
        </button>
      </div>
    </form>
  );
};
export default CreatePostForm;
