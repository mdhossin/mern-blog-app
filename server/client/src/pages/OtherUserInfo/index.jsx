import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getOtherUserInfo } from "../../redux/actions/userActions";
import {
  BlogImage,
  Card,
  Container,
  Content,
  Descritpion,
  Image,
  ImageBox,
  ImgBox,
  JoinDate,
  LeftContent,
  RightContent,
  Role,
  Title,
  UserName,
  Wrapper,
} from "./styles";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { getBlogsByUserId } from "../../redux/actions/blogActions";
import { Pagination } from "../../components";

const OtherUserInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { otherInfo, loading, error } = useSelector((state) => state.otherInfo);
  const {
    blogsByUser,
    error: blogsError,
    loading: blogsLoading,
  } = useSelector((state) => state.blogsByUser);

  console.log(blogsByUser, "blogsByUser");

  useEffect(() => {
    dispatch(getOtherUserInfo(id));
  }, [id, dispatch]);

  const location = useLocation();
  const { search } = location;

  useEffect(() => {
    if (!id) return;

    dispatch(getBlogsByUserId(id, search));
  }, [id, dispatch, search]);

  const handlePagination = (num) => {
    const search = `?page=${num}`;
    dispatch(getBlogsByUserId(id, search));
  };

  return (
    <Wrapper>
      <Container>
        {loading ? (
          <Loading />
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <>
            {otherInfo && (
              <LeftContent>
                <ImageBox>
                  <Image src={otherInfo.avatar} />
                </ImageBox>

                <UserName>{otherInfo.name}</UserName>
                <Role>{otherInfo.role}</Role>
                <div className="join-date">
                  Join Date:{" "}
                  <span style={{ color: "#6c62e2" }}>
                    {new Date(otherInfo.createdAt).toLocaleString()}
                  </span>
                </div>
              </LeftContent>
            )}
          </>
        )}
        <RightContent>
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
        </RightContent>
      </Container>
    </Wrapper>
  );
};

export default OtherUserInfo;
