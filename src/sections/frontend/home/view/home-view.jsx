/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./index.css";

// import required modules
import { Pagination } from "swiper/modules";

const carouselList = [
  "login",
  "register",
  "archive",
  "community",
  "emotion",
  "interaction",
  "profile",
];

const Carousel = () => (
  <Swiper
    modules={[Pagination]}
    spaceBetween={50}
    slidesPerView={1}
    onSlideChange={() => console.log("slide change")}
    onSwiper={(swiper) => console.log(swiper)}
  >
    {carouselList.map((item) => (
      <SwiperSlide key={item}>
        <img src={`/preview/Myfile/carousel/${item}.png`} alt={item} />
      </SwiperSlide>
    ))}
  </Swiper>
);

const Banner = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(6),
  textAlign: "center",
  marginBottom: theme.spacing(4),
}));

// const CarouselItem = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(4),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
//   height: 300,
//   lineHeight: "300px", // Vertically center the text
// }));

function Home() {
  return (
    <Box>
      <Banner elevation={3}>
        <Typography variant="h3">欢迎来到虚拟宠物互动平台</Typography>
        <Typography variant="body1">
          致力于为用户创造一个既有趣又富有意义的虚拟宠物互动平台
        </Typography>
      </Banner>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Carousel />
      </Box>
    </Box>
  );
}

export default Home;
