"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { MdTurnedInNot } from "react-icons/md";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const theme = createTheme({
  palette: {
    primary: {
      main: "#EFE7F5", // 원하는 색상으로 변경하세요
    },
  },
});

const WorksInterest = () => {
  const isMobile = useMediaQuery("(max-width: 550px)");
  const [isAnimating, setIsAnimating] = useState(false);

  // 화면 크기가 작아지면서 애니메이션을 추가할 때 실행되는 효과
  useEffect(() => {
    if (isMobile) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isMobile]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: "fixed",
          bottom: isMobile ? "70px" : "16px",
          left: isMobile ? "1px" : "16px",
          "& > :not(style)": { m: 1 },
          zIndex: "10",
          transition: "bottom 0.3s ease-in-out", // 애니메이션 효과 추가
          // 아래 스타일은 화면 크기가 작을 때 애니메이션을 적용하기 위한 스타일
          ...(isAnimating && {
            bottom: "70px",
          }),
        }}
      >
        <Fab
          color="primary" // 테마에서 정의한 색상을 사용합니다
          aria-label="edit"
          sx={{
            width: isMobile ? "60px" : "75px",
            height: isMobile ? "60px" : "75px",
          }}
        >
          <MdTurnedInNot
            style={{
              fontSize: isMobile ? "20px" : "28px",
              color: "#B25FF3",
            }}
          />
        </Fab>
      </Box>
    </ThemeProvider>
  );
};

export default WorksInterest;
