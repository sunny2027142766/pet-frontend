import { Container } from "@mui/material";
import ChatCard from "../chat-card";
import LeftWidget from "../left-widget";

export default function EmotionView() {
  return (
    <Container>
      <LeftWidget />
      <ChatCard />
    </Container>
  );
}
