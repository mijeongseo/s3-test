import React, { useCallback, useState, useEffect } from "react";

import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import ImagePopup from "../components/ImagePopup";

import { useSelector, useDispatch } from "react-redux";

import { backUrl } from "../config/config";

export default function Home() {
  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { mainPosts } = state;
  const [imgbool, setImgbool] = useState(false);
  const [imgsrc, setImgsrc] = useState("");

  useEffect(() => {
    dispatch({
      type: "LOAD_POSTS_REQUEST",
    });
  }, []);

  const popOpen = useCallback((e) => {
    setImgbool((prev) => !prev);
    setImgsrc(e.target.src);
  }, []);

  return (
    <AppLayout>
      <PostForm />

      {mainPosts?.length !== 0 &&
        mainPosts.map((post) => (
          <div style={{ cursor: "pointer" }} key={post.id}>
            <img
              style={{ display: "block", width: "100%", marginTop: 20 }}
              src={`${backUrl}/${post.src}`}
              onClick={popOpen}
              alt=""
            />
          </div>
        ))}

      {imgbool && <ImagePopup src={imgsrc} onClick={popOpen} />}
    </AppLayout>
  );
}
