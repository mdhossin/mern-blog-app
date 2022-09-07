import React from "react";
import { useParams } from "react-router-dom";

const Blogs = () => {
  const { category } = useParams();
 
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, eveniet
      animi! Voluptatum, porro commodi molestias accusamus repellendus mollitia
      asperiores animi? Molestiae a culpa, voluptatum vero dolore nam enim.
      Adipisci, nobis?
    </div>
  );
};

export default Blogs;
