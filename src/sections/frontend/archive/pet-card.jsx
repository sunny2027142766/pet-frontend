import PropTypes from "prop-types";
import {
  Box,
  Card,
  Chip,
  Link,
  Stack,
  Typography,
  LinearProgress,
} from "@mui/material";

// ----------------------------------------------------------------------

export default function PetCard({ pet }) {
  const render3DStatus = (
    <Chip
      label={pet.isVirtual ? "3D" : "2D"}
      color={pet.isVirtual ? "secondary" : "info"}
      size="small"
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: "absolute",
        textTransform: "uppercase",
      }}
    />
  );

  const renderImg = (
    <Box
      component="img"
      alt={pet.name}
      src={`/preview/${pet.img}`}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: "cover",
        position: "absolute",
      }}
    />
  );

  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        {render3DStatus}
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {pet.name}
        </Link>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body2">年龄: {pet.age} 岁</Typography>
          <Typography variant="body2">体重: {pet.weight} kg</Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ width: "100%" }}
        >
          <Typography variant="body2" sx={{ minWidth: 100 }}>
            健康度:
          </Typography>
          <LinearProgress
            variant="determinate"
            value={pet.health || 10}
            sx={{ flexGrow: 1 }}
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ width: "100%" }}
        >
          <Typography variant="body2" sx={{ minWidth: 100 }}>
            快乐度:
          </Typography>
          <LinearProgress
            variant="determinate"
            value={pet.happy || 10}
            sx={{ flexGrow: 1 }}
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ width: "100%" }}
        >
          <Typography variant="body2" sx={{ minWidth: 100 }}>
            饥饿度:
          </Typography>
          <LinearProgress
            variant="determinate"
            value={pet.health || 100}
            sx={{ flexGrow: 1 }}
          />
        </Stack>
      </Stack>
    </Card>
  );
}

PetCard.propTypes = {
  pet: PropTypes.object,
};
