import React, { useEffect, useState } from "react";
import {
  Wrapper,
  CategoryContent,
  CategoryForm,
  InputBox,
  Input,
  CategoryList,
} from "./styles";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {
  createCategory,
  getAllCategories,
  updateCategory,
} from "../../redux/actions/categoryActions";
import axios from "axios";
import { BASE_URL } from "../../api/api";
import { CREATE_CATEGORY_RESET } from "../../redux/constants/categoryConstants";
import Loading from "../../components/Loading";
import { Footer } from "../../components";

const Category = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const [name, setName] = useState("");

  const {
    categories: createCategoryData,
    error: createError,
    loading: createLoading,
  } = useSelector((state) => state.createCategory);
  const user = useSelector((state) => state.user?.userInfo);

  const { categories, error, loading } = useSelector(
    (state) => state.allCategories
  );

  const [callback, setCallback] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [id, setId] = useState("");

  const createCategories = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        dispatch(updateCategory(name, id));
      } else {
        dispatch(createCategory(name));
      }
      setOnEdit(false);
      setName("");
    } catch (error) {
      alert(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  const editCategory = async (id, name) => {
    setId(id);
    setName(name);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    try {
      if (window.confirm("Are you sure want to delete?")) {
        const res = await axios.delete(`${BASE_URL}/api/category/${id}`, {
          headers: { Authorization: user?.access_token },
        });
        alert(res.data.message);
        setCallback(!callback);
      }
    } catch (error) {
      alert(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch, callback]);

  useEffect(() => {
    if (createError) {
      dispatch({ type: CREATE_CATEGORY_RESET });
      addToast(createError, {
        appearance: "error",
        autoDismiss: true,
      });
    } else if (createCategoryData?.message) {
      dispatch({ type: CREATE_CATEGORY_RESET });
      addToast(createCategoryData?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setCallback(!callback);
    }
  }, [addToast, createError, dispatch, createCategoryData?.message, callback]);
  return (
    <>
      <Wrapper>
        <CategoryContent>
          <CategoryForm onSubmit={createCategories}>
            <h2>Create Category</h2>
            <InputBox>
              <Input
                type="text"
                name="name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="Add category"
              />
            </InputBox>
            <button>
              {createLoading ? (
                "Loading.."
              ) : (
                <>{onEdit ? "Update" : "Create"}</>
              )}
            </button>
          </CategoryForm>

          <CategoryList>
            <h2>Category List</h2>
            {loading ? (
              <Loading />
            ) : error ? (
              <h2>{error}</h2>
            ) : (
              <>
                {categories?.categories?.map((category) => (
                  <div key={category._id} className="category-box">
                    <h4>{category.name}</h4>
                    <div className="icon-group">
                      <div
                        onClick={() =>
                          editCategory(category._id, category.name)
                        }
                      >
                        <FaEdit />
                      </div>
                      <div onClick={() => deleteCategory(category._id)}>
                        <RiDeleteBin5Line />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </CategoryList>
        </CategoryContent>
      </Wrapper>
      <Footer />
    </>
  );
};

export default Category;
