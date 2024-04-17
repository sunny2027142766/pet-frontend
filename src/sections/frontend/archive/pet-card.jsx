import PropTypes from "prop-types";
import { Box, Card, Chip, Link, Stack, Typography } from "@mui/material";

// ----------------------------------------------------------------------

export default function PetCard({ pet }) {
  const render3DStatus = (
    <Chip
      label={pet.is3D ? "3D" : "2D"}
      color={pet.is3D ? "secondary" : "info"}
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
      src={pet.photo}
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

        <Typography variant="body2" color="text.secondary">
          {pet.type} - {pet.breed}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body2">年龄: {pet.age} 岁</Typography>
          <Typography variant="body2">体重: {pet.weight} kg</Typography>
        </Stack>

        <Typography variant="body2">健康状况: {pet.health}</Typography>
      </Stack>
    </Card>
  );
}
PetCard.propTypes = {
  pet: PropTypes.object,
};
