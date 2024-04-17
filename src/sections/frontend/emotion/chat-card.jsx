import React, { useState } from "react";
import { Paper, Stack, Button, TextField, Typography } from "@mui/material";
import Iconify from "src/components/iconify";
import axios from "axios";

// ---------------------------------------------------------------------------

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() !== "") {
      const newMessages = [...messages, { from: "user", text: input }];
      setMessages(newMessages);
      const response = await axios.post("/chat/api/messages", { text: input });
      setMessages([...newMessages, { from: "bot", text: response.data }]);
      setInput("");
    }
  };

  return (
    <Stack direction="column" spacing={2}>
      <Paper
        style={{
          borderRadius: 2,
          border: "1px solid #e0e0e0",
          height: 600,
          overflow: "auto",
        }}
      >
        {messages.map((msg, index) => (
          <Typography
            key={index}
            p={2}
            align={msg.from === "user" ? "right" : "left"}
          >
            {msg.text}
          </Typography>
        ))}
      </Paper>
      <Stack
        spacing={5}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <TextField
          fullWidth
          color="secondary"
          variant="outlined"
          placeholder="请输入消息..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<Iconify icon="tabler:send" />}
          sx={{ width: 100, height: "inherit" }}
          onClick={sendMessage}
        >
          发送
        </Button>
      </Stack>
    </Stack>
  );
}
