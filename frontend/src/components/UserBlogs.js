import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import axios from "axios";
import Blog from "./Blog";
import { Typography } from "@mui/material";

const UserBlogs = () => {
  const [user, setUser] = useState(null);
  const id = localStorage.getItem("userId");
  const isDelete = useSelector((state) => state.delete.isDelete);

  const sendRequest = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`);
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setUser(data.user);
    });
  }, [isDelete]);

  useEffect(() => {
    sendRequest().then((data) => {
      setUser(data.user);
    });
  }, []);
  console.log(user);

  return (
    <div>
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            userId={blog.user._id}
            isUser={true}
            key={index}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            userName={user.name}
            date={blog.date}
            likes={blog.likes}
          />
        ))}
      {user && user.blogs.length === 0 && (
        <Typography
          sx={{ display: "flex", justifyContent: "center", marginTop: "100px" }}
          variant="h5"
          gutterBottom
        >
          You haven't added any blogs yet
        </Typography>
      )}
    </div>
  );
};

export default UserBlogs;
