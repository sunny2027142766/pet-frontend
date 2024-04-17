import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { pets } from "src/_mock/pet";
import PetCard from "../pet-card";
// import FunctionWidget from "../function-widget";

export default function ArchiveView() {
  return (
    <Container>
      <Grid container spacing={3}>
        {pets.map((pet) => (
          <Grid key={pet.id} xs={12} sm={6} md={3}>
            <PetCard pet={pet} />
          </Grid>
        ))}
      </Grid>
      {/* <FunctionWidget /> */}
    </Container>
  );
}
