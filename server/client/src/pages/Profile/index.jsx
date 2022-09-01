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
} from "./styles";

import {
  AiOutlineCamera,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useToasts } from "react-toast-notifications";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../api/api";

import { isLength, isMatch } from "../../utils/validRegister";

const Profile = () => {
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

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
      <ProfileContent>
        <ImageBox>
          {loading ? (
            <div>Loading..</div>
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
        minima pariatur molestias repellat delectus ducimus natus atque
        deleniti? Quia, quibusdam laboriosam optio exercitationem hic iusto
        deserunt voluptatum animi inventore praesentium.
      </BlogContent>
    </Wrapper>
  );
};

export default Profile;
