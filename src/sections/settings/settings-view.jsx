import React, { useState } from "react";
import {
  Button,
  Avatar,
  Container,
  TextField,
  Typography,
} from "@mui/material";

export default function SettingsView() {
  const [avatar, setAvatar] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");

  const handleAvatarChange = (event) => {
    // Handle avatar change logic
    setAvatar(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
  };

  return (
    <Container>
      <Avatar alt="User Avatar" src={avatar} onChange={handleAvatarChange} />
      <Typography variant="h5">Edit Profile</Typography>
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Phone Number"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit">
          Save Changes
        </Button>
      </form>
    </Container>
  );
}
