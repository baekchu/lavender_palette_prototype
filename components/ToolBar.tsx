"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { TbMessage2Share } from "react-icons/tb";
import { MdOutlineUpdate, MdUploadFile } from "react-icons/md";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useArtworkRegist from "./hooks/useArtworkRegist";

const actions = [
  { icon: <TbMessage2Share />, name: "전체 메세지" },
  { icon: <MdOutlineUpdate />, name: "최근 본 작품" },
  { icon: <MdUploadFile />, name: "업로드" },
];
const theme = createTheme({
  palette: {
    primary: {
      main: "#EFE7F5", // 원하는 색상으로 변경하세요
    },
  },
});
export default function ToolBar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isMobile = useMediaQuery("(max-width: 550px)");
  const [isAnimating, setIsAnimating] = useState(false);
  const ArtworkRegist = useArtworkRegist();

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
          height: 320,
          transform: 'translateZ(0px)', 
          flexGrow: 1 ,
          position: "fixed",
          bottom: isMobile ? "70px" : "16px",
          right: isMobile ? "1px" : "16px",
          "& > :not(style)": { m: 1 },
          zIndex: "10",
          transition: "bottom 0.3s ease-in-out", // 애니메이션 효과 추가
          // 아래 스타일은 화면 크기가 작을 때 애니메이션을 적용하기 위한 스타일
          ...(isAnimating && {
            bottom: "70px",
          }),
        }}
      >
        <Backdrop open={open} />
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{ position: "absolute", bottom: 8, right: 8 }}
          icon={<SpeedDialIcon className="text-[#B25FF3] " />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => {
                 (action.name === "업로드") 
                  ArtworkRegist.onOpen();
                }}
            />
          ))}
        </SpeedDial>
      </Box>
    </ThemeProvider>
  );
}
