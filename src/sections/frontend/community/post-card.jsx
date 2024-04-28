import PropTypes from "prop-types";

import { alpha } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Link, Card, Stack, Avatar, Typography } from "@mui/material";

import { fDate } from "src/utils/format-time";
import { fShortenNumber } from "src/utils/format-number";

import Iconify from "src/components/iconify";
import SvgColor from "src/components/svg-color";
import { useRouter } from "src/routes/hooks";

// ----------------------------------------------------------------------

export default function PostCard({ post, index }) {
  const {
    pid,
    title,
    img,
    commentNum,
    likeNum,
    shareNum,
    username,
    avatar,
    createTime,
  } = post;

  const router = useRouter();

  const latestPostLarge = index === 0;

  const latestPost = index === 1 || index === 2;

  const navToPostDetail = () => {
    router.push(`/community/${pid}`);
  };

  const renderAvatar = (
    <Avatar
      alt={username}
      src={`/preview/${avatar}`}
      sx={{
        zIndex: 9,
        width: 32,
        height: 32,
        position: "absolute",
        left: (theme) => theme.spacing(3),
        bottom: (theme) => theme.spacing(-2),
        ...((latestPostLarge || latestPost) && {
          zIndex: 9,
          top: 24,
          left: 24,
          width: 40,
          height: 40,
        }),
      }}
    />
  );

  const renderTitle = (
    <Link
      color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        height: 44,
        overflow: "hidden",
        WebkitLineClamp: 2,
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        // 设置鼠标抓手
        cursor: "pointer",
        ...(latestPostLarge && { typography: "h5", height: 60 }),
        ...((latestPostLarge || latestPost) && {
          color: "common.white",
        }),
      }}
      onClick={navToPostDetail}
    >
      {title}
    </Link>
  );

  const renderInfo = (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={1.5}
      justifyContent="flex-end"
      sx={{
        mt: 3,
        color: "text.disabled",
      }}
    >
      {[
        { number: commentNum, icon: "eva:message-circle-fill" },
        { number: likeNum, icon: "iconamoon:like-duotone" },
        { number: shareNum, icon: "eva:share-fill" },
      ].map((info, _index) => (
        <Stack
          key={_index}
          direction="row"
          sx={{
            ...((latestPostLarge || latestPost) && {
              opacity: 0.48,
              color: "common.white",
            }),
          }}
        >
          <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
          <Typography variant="caption">
            {fShortenNumber(info.number)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );

  const renderCover = (
    <Box
      component="img"
      alt={title}
      src={`/preview${img}`}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: "cover",
        position: "absolute",
      }}
    />
  );

  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        color: "text.disabled",
        ...((latestPostLarge || latestPost) && {
          opacity: 0.48,
          color: "common.white",
        }),
      }}
    >
      {fDate(createTime, "yyyy-MM-dd")}
    </Typography>
  );

  const renderShape = (
    <SvgColor
      color="paper"
      src="/assets/icons/shape-avatar.svg"
      sx={{
        width: 80,
        height: 36,
        zIndex: 9,
        bottom: -15,
        position: "absolute",
        color: "background.paper",
        ...((latestPostLarge || latestPost) && { display: "none" }),
      }}
    />
  );

  return (
    <Grid xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card>
        <Box
          sx={{
            position: "relative",
            pt: "calc(100% * 3 / 4)",
            ...((latestPostLarge || latestPost) && {
              pt: "calc(100% * 4 / 3)",
              "&:after": {
                top: 0,
                content: "''",
                width: "100%",
                height: "100%",
                position: "absolute",
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: "calc(100% * 4 / 3)",
                sm: "calc(100% * 3 / 4.66)",
              },
            }),
          }}
        >
          {renderShape}

          {renderAvatar}

          {renderCover}
        </Box>

        <Box
          sx={{
            p: (theme) => theme.spacing(4, 3, 3, 3),
            ...((latestPostLarge || latestPost) && {
              width: 1,
              bottom: 0,
              position: "absolute",
            }),
          }}
        >
          {renderDate}

          {renderTitle}

          {renderInfo}
        </Box>
      </Card>
    </Grid>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};
