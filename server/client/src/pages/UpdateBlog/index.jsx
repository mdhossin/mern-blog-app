import React from "react";
import { useParams } from "react-router-dom";
import CreateBlog from "../CreateBlog";

const UpdateBlog = () => {
  const { id } = useParams();
  return <CreateBlog id={id} />;
};

export default UpdateBlog;
