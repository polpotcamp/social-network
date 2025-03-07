import styles from "./Edit.module.css";
import { useState } from "react";
export const Edit = () => {
    const [image, setImage] = useState<File|null>(null)
  return (
    <div className={`${styles.Container}`}>
      <input
        type="file"
        onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImage(e.target.files[0]);
            } else {
              setImage(null);
            }
          }}
        placeholder="загрузите фото"
        className={`${styles.input}`}
        accept="image/png, image/gif, image/jpeg"
      />
    </div>
  );
};
