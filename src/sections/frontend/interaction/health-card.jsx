/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from "prop-types";
import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Chip, Stack, Rating, Divider } from "@mui/material";
import Iconify from "src/components/iconify";

const StyledRoot = styled("div")(({ theme }) => ({
  zIndex: 999,
  left: 10,
  display: "flex",
  position: "fixed",
  top: "50%",
  transform: "translateY(-50%)",
  alignItems: "center",
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
}));

export default function HealthCard({ health, mood, hunger }) {
  const petCardInfo = [
    { name: "健康值", value: health, status: health > 3 ? "良好" : "正常" },
    { name: "心情值", value: mood, status: mood > 3 ? "快乐" : "一般" },
    { name: "饥饿度", value: hunger, status: hunger > 3 ? "非常饿" : "一般" },
  ];

  return (
    <StyledRoot>
      <Stack
        spacing={2}
        sx={{
          boxShadow:
            "0px 3px 5px -1px rgba(145, 158, 171, 0.2), 0px 6px 10px 0px rgba(145, 158, 171, 0.14), 0px 1px 18px 0px rgba(145, 158, 171, 0.12)",
          color: "rgba(0, 0, 0, 0.87)",
          backgroundColor: "#DFE3E8",
          borderRadius: 2,
        }}
      >
        <Chip
          label="宠物信息板"
          color="info"
          variant="outlined"
          sx={{ my: 10 }}
          size="medium"
          icon={
            <Iconify
              icon="tabler:clipboard-heart"
              color="#1297a1"
              width={30}
              height={30}
              mr={1}
            />
          }
        />
        {petCardInfo.map((info) => (
          <Box key={info.name} sx={{ px: 1, paddingTop: 1 }}>
            <Divider>
              <Chip color="info" label={info.name} size="small" />
            </Divider>
            <Box
              sx={{
                paddingTop: 1,
                width: 250,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating
                name={info.name}
                value={info.value}
                precision={1}
                readOnly
                icon={
                  <Iconify
                    icon="solar:health-bold"
                    sx={{ color: "#ff3d47" }}
                    width={24}
                    height={24}
                    mr={1}
                  />
                }
                emptyIcon={
                  <Iconify
                    icon="solar:health-bold"
                    width={24}
                    height={24}
                    mr={1}
                  />
                }
              />
              <Box sx={{ ml: 2 }}>{info.status}</Box>
            </Box>
          </Box>
        ))}
      </Stack>
    </StyledRoot>
  );
}

HealthCard.propTypes = {
  health: PropTypes.number,
  mood: PropTypes.number,
  hunger: PropTypes.number,
};
