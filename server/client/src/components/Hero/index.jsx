import React from "react";
import { HeroImg } from "../../assets";
import { Wrapper, Div, Title, SubTitle, Button } from "./styles";

import { motion } from "framer-motion";

const Hero = () => {
  return (
    <Wrapper
      style={{
        backgroundImage: `url(${HeroImg})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "550px",
      }}
    >
      <Div />

      <motion.div className="content">
        <motion.div
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
        >
          <Title>Learn to Code</Title>
          <SubTitle>
            & Finally do work you <span>actively</span> love
          </SubTitle>
          <Button>Read More</Button>
        </motion.div>
      </motion.div>
    </Wrapper>
  );
};

export default Hero;
