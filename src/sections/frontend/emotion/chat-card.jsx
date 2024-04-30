import PropTypes from "prop-types";
import * as React from "react";
import {
  Box,
  Grid,
  Paper,
  Button,
  Avatar,
  TextField,
  Typography,
} from "@mui/material";
import Iconify from "src/components/iconify";

const messages = [
  {
    id: 1,
    text: "你好, 我是宠物助手，有什么可以帮助你的吗？",
    sender: "pet",
    avatar: "/Myfile/1713945060686pet_6.png",
  },
  {
    id: 2,
    text: "今天天气怎么样？",
    sender: "user",
    avatar: "/Myfile/avatar_1.jpg",
  },
  {
    id: 3,
    text: "今天天气晴朗，温度适宜，适合出门活动。",
    sender: "pet",
    avatar: "/Myfile/1713945060686pet_6.png",
  },
];

const ChatUI = () => {
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      console.log(input);
      setInput("");
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#efe2f769",
        borderRadius: 1,
      }}
    >
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </Box>
      <Box sx={{ py: 2, backgroundColor: "background.default" }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              size="small"
              fullWidth
              placeholder="您好，请问您遇到什么问题了？"
              variant="outlined"
              value={input}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              endIcon={
                <Iconify
                  icon="iconamoon:send-duotone"
                  sx={{
                    color: "white",
                    width: 20,
                    height: 20,
                  }}
                />
              }
              onClick={handleSend}
            >
              发送
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const Message = ({ message }) => {
  const isBot = message.sender === "pet";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isBot ? "row" : "row-reverse",
          alignItems: "center",
        }}
      >
        <Avatar
          src={`/preview${message.avatar}`}
          sx={{ bgcolor: isBot ? "primary.main" : "secondary.main" }}
        >
          {isBot ? "P" : "U"}
        </Avatar>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            ml: isBot ? 1 : 0,
            mr: isBot ? 0 : 1,
            backgroundColor: isBot ? "primary.light" : "secondary.light",
            borderRadius: isBot ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
          }}
        >
          <Typography variant="body1">{message.text}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};
Message.propTypes = {
  message: PropTypes.object,
};

export default ChatUI;
