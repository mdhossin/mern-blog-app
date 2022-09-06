import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../api/api";
import { Input, InputBox, InputGroup, Label, LeftFromBox } from "./styles";
import { RotatingLines } from "react-loader-spinner";
const BlogFrom = ({ blog, setBlog }) => {
  const [loading, setLoading] = useState(false);

  const { categories } = useSelector((state) => state.allCategories);

  const { access_token } = useSelector((state) => state.user?.userInfo);

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const changeAvatar = async (e) => {
    e.preventDefault();

    try {
      const file = e.target.files[0];

      if (!file)
        return setBlog({
          ...blog,
          error: "No files were uploaded.",
          success: "",
        });

      if (file.size > 1024 * 1024)
        return setBlog({ ...blog, error: "Size too large.", success: "" });

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return setBlog({
          ...blog,
          error: "File format is incorrect.",
          success: "",
        });

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post(`${BASE_URL}/api/upload_image`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: access_token,
        },
      });
      setLoading(false);

      setBlog({
        ...blog,
        success: res.data.message,
        error: "",
        thumbnail: res.data.url,
      });
    } catch (error) {
      setLoading(false);
      setBlog({
        ...blog,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        success: "",
      });
    }
  };

  return (
    <LeftFromBox>
      <InputGroup>
        <Label>Title</Label>
        <InputBox className="title">
          <Input
            type="text"
            required
            value={blog.title}
            name="title"
            onChange={handleChangeInput}
            placeholder="Add blog title*"
            maxLength={50}
          />

          <small>{blog.title.length}/50</small>
        </InputBox>
      </InputGroup>

      <InputGroup>
        <Label>Category</Label>
        <div className="category">
          <select
            value={blog.category}
            name="category"
            onChange={handleChangeInput}
          >
            <option value="">All Products</option>
            {categories?.categories &&
              categories?.categories?.map((category) => (
                <option
                  className="option"
                  style={{ textTransform: "capitalize" }}
                  key={category._id}
                  value={category._id}
                >
                  {category.name}
                </option>
              ))}
          </select>
        </div>
      </InputGroup>

      <InputGroup>
        <Label>Description</Label>
        <textarea
          value={blog.description}
          name="description"
          onChange={handleChangeInput}
          rows="4"
          placeholder="Add blog description*"
          maxLength={200}
        ></textarea>

        <small>{blog.description.length}/200</small>
      </InputGroup>

      <InputGroup>
        <Label>Upload Image</Label>
        <InputBox className="upload-image">
          <div className="upload">
            <input
              type="file"
              name="file"
              id="file_up"
              onChange={changeAvatar}
            />
            {loading && (
              <div className="file_img">
                <RotatingLines
                  strokeColor="#6C62E2"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="60"
                  visible={true}
                />
              </div>
            )}
          </div>
        </InputBox>
      </InputGroup>
    </LeftFromBox>
  );
};

export default BlogFrom;
