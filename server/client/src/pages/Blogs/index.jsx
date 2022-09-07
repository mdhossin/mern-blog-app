import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Pagination } from "../../components";
import CardBlog from "../../components/CardBlog";
import Loading from "../../components/Loading";
import { getBlogsByCategoryId } from "../../redux/actions/blogActions";

import { Content, Wrapper } from "./styles";

const Blogs = () => {
  const dispatch = useDispatch();
  const { category: categoryId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;
  const { loading, error, blogsByCategory } = useSelector(
    (state) => state.blogsByCategory
  );
  const { categories } = useSelector((state) => state.allCategories);

  const [id, setId] = useState("");

  useEffect(() => {
    const category = categories?.categories.find(
      (item) => item.name === categoryId
    );
    if (category) setId(category._id);
  }, [categoryId, categories?.categories]);

  useEffect(() => {
    if (!id) return;

    dispatch(getBlogsByCategoryId(id, search));
  }, [id, dispatch, search, navigate, blogsByCategory?.blogsByCategory]);

  const handlePagination = (num) => {
    const search = `?page=${num}`;
    dispatch(getBlogsByCategoryId(id, search));
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      {categoryId && <h2>{categoryId}</h2>}
      {error ? (
        <h2>{error}</h2>
      ) : (
        <Content>
          {blogsByCategory?.blogs &&
            blogsByCategory?.blogs.map((blog) => (
              <CardBlog key={blog._id} blog={blog} />
            ))}
        </Content>
      )}

      {blogsByCategory?.total > 1 && (
        <Pagination
          total={blogsByCategory?.total}
          callback={handlePagination}
        />
      )}
    </Wrapper>
  );
};

export default Blogs;
