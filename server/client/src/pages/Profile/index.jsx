import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Wrapper,
  ProfileContent,
  BlogContent,
  InputGroup,
  Input,
  ImageBox,
  Lablel,
  Button,
  Card,
  ImgBox,
  BlogImage,
  Content,
  Title,
  Descritpion,
  JoinDate,
  BlogContainer,
} from "./styles";

import { RotatingLines } from "react-loader-spinner";
import {
  AiOutlineCamera,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../api/api";

import { isLength, isMatch } from "../../utils/validRegister";

import { Link, useLocation } from "react-router-dom";
import { getBlogsByUserId } from "../../redux/actions/blogActions";
import { Pagination } from "../../components";
import Loading from "../../components/Loading";

const Profile = () => {
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    error: "",
    success: "",
  });

  const { addToast } = useToasts();

  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, access_token } = useSelector((state) => state.user?.userInfo);

  const { name, password, confirmPassword, error, success } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, error: "", success: "" });
  };

  const changeAvatar = async (e) => {
    e.preventDefault();

    try {
      const file = e.target.files[0];

      if (!file)
        return setData({
          ...data,
          error: "No files were uploaded.",
          success: "",
        });

      if (file.size > 1024 * 1024)
        return setData({ ...data, error: "Size too large.", success: "" });

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return setData({
          ...data,
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
      setAvatar(res.data.url);
      setData({ ...data, success: res.data.message, error: "" });
    } catch (error) {
      setData({
        ...data,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        success: "",
      });
    }
  };

  const updateInfor = () => {
    try {
      axios.put(
        `${BASE_URL}/api/user/update`,
        {
          name: name ? name : user.name,
          avatar: avatar ? avatar : user.avatar,
        },
        {
          headers: { Authorization: access_token },
        }
      );

      setData({ ...data, error: "", success: "Updated Success!" });
    } catch (error) {
      setData({
        ...data,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        success: "",
      });
    }
  };

  const updatePassword = () => {
    if (isLength(password))
      return setData({
        ...data,
        error: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, confirmPassword))
      return setData({
        ...data,
        error: "Password did not match.",
        success: "",
      });

    try {
      axios.post(
        `${BASE_URL}/api/user/reset`,
        { password, confirmPassword },
        {
          headers: { Authorization: access_token },
        }
      );

      setData({ ...data, error: "", success: "Updated Success!" });
    } catch (error) {
      setData({
        ...data,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        success: "",
      });
    }
  };

  const {
    blogsByUser,
    error: blogsError,
    loading: blogsLoading,
  } = useSelector((state) => state.blogsByUser);

  console.log(blogsByUser, "blogsByUser");

  const location = useLocation();
  const { search } = location;

  useEffect(() => {
    if (!user._id) return;

    dispatch(getBlogsByUserId(user._id, search));
  }, [user._id, dispatch, search]);

  const handlePagination = (num) => {
    const search = `?page=${num}`;
    dispatch(getBlogsByUserId(user._id, search));
  };

  const handleUpdate = () => {
    if (name || avatar) updateInfor();
    if (password) updatePassword();
  };

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error", autoDismiss: true });
      setData({
        name: "",
        password: "",
        cf_password: "",
        error: "",
        success: "",
      });
    } else if (success) {
      addToast(success, {
        appearance: "success",
        autoDismiss: true,
      });
    }
  }, [error, success, addToast]);

  return (
    <Wrapper>
      <BlogContainer>
        <ProfileContent>
          <ImageBox>
            {loading ? (
              <div className="loader">
                <RotatingLines
                  strokeColor="#6C62E2"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="96"
                  visible={true}
                />
              </div>
            ) : (
              <img src={avatar ? avatar : user.avatar} alt="logo" />
            )}
            <span>
              <AiOutlineCamera />
              <p>Change</p>
              <input
                type="file"
                name="file"
                id="file_up"
                onChange={changeAvatar}
              />
            </span>
          </ImageBox>
          <InputGroup>
            <Lablel>Name</Lablel>
            <Input
              type="text"
              name="name"
              id="name"
              defaultValue={user.name}
              placeholder="Your name"
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup>
            <Lablel>Email</Lablel>
            <Input
              type="email"
              name="email"
              id="email"
              defaultValue={user.email}
              placeholder="Your email address"
              disabled
            />
          </InputGroup>
          {user.type !== "register" && (
            <p>
              * Quick login account with {user.type} can't use this function *
            </p>
          )}

          <InputGroup>
            <Lablel>Password</Lablel>
            <Input
              type={typePass ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Your password"
              value={password}
              onChange={handleChange}
              disabled={user.type !== "register"}
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </small>
          </InputGroup>
          <InputGroup>
            <Lablel>Confirm Password</Lablel>
            <Input
              type={typeCfPass ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleChange}
              disabled={user.type !== "register"}
            />
            <small onClick={() => setTypeCfPass(!typeCfPass)}>
              {typeCfPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </small>
          </InputGroup>

          <Button type="button" disabled={loading} onClick={handleUpdate}>
            {loading ? "Loading..." : " Update"}
          </Button>
        </ProfileContent>

        <BlogContent>
          <div className="content-box">
            {blogsLoading ? (
              <Loading />
            ) : blogsError ? (
              <h2>{blogsError}</h2>
            ) : (
              <>
                {blogsByUser?.blogs &&
                  blogsByUser?.blogs.map((blog) => (
                    <Card key={blog._id}>
                      <Link to={`/blog/${blog._id}`}>
                        <ImgBox>
                          <BlogImage src={blog.thumbnail} />
                        </ImgBox>
                      </Link>
                      <Content>
                        <Link to={`/blog/${blog._id}`}>
                          <Title>{blog.title}</Title>
                        </Link>
                        <Descritpion>{blog.description}</Descritpion>
                        <JoinDate>
                          Created: {new Date(blog.createdAt).toLocaleString()}
                        </JoinDate>
                      </Content>
                    </Card>
                  ))}
              </>
            )}
          </div>

          {blogsByUser?.blogs.length === 0 && blogsByUser?.total < 1 && (
            <h3 style={{ fontSize: "2rem" }}>No Blogs</h3>
          )}
          {blogsByUser?.total > 1 && (
            <Pagination
              total={blogsByUser?.total}
              callback={handlePagination}
            />
          )}
        </BlogContent>
      </BlogContainer>
    </Wrapper>
  );
};

export default Profile;
