import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { getAllPetInfoApi } from "src/api/modules/pet";
import PetCard from "../pet-card";
// import FunctionWidget from "../function-widget";

export default function ArchiveView() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPetInfo();
  }, []);

  const getPetInfo = () => {
    setLoading(true);
    getAllPetInfoApi().then((res) => {
      setPets(res.data);
      setLoading(false);
    });
  };

  return (
    <Container>
      {loading ? (
        <>加载中</>
      ) : (
        <Grid container spacing={3}>
          {pets.map((pet) => (
            <Grid key={pet.pid} xs={12} sm={6} md={3}>
              <PetCard pet={pet} />
            </Grid>
          ))}
        </Grid>
      )}
      {/* <FunctionWidget /> */}
    </Container>
  );
}
