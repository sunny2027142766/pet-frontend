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
  CircularProgress,
} from "@mui/material";
import Iconify from "src/components/iconify";
import { getItem } from "src/utils/local-storage";

const messageList = [
  {
    id: 1,
    text: "我心情不好，可以讲个笑话吗？",
    sender: "user",
    avatar: "/Myfile/avatar_1.jpg",
  },
  {
    id: 2,
    text: "当然可以！为什么搞笑的书总是很瘦？ 因为它们只有笑料，没有油脂！希望这个笑话能让你心情好一点！",
    sender: "pet",
    avatar: "/Myfile/1713945060686pet_6.png",
  },
  {
    id: 3,
    text: "上面是示例，有什么情感问题可以向我倾诉哦！",
    sender: "pet",
    avatar: "/Myfile/1713945060686pet_6.png",
  },
];
// 冰橙GPT
// const API_KEY = "OQDsaLJdC9wk5HXOLlUVEoGiH68cqNpV";
// const BANNER_KEY = `Bearer ${API_KEY}`;
// 自己的GPT
// const SK_KEY = "sk-7mwut1NUOmSIzbGfB2084d7042F54659B0EdB0797cE36784"; // 李灿key
const SK_KEY = "sk-EeHosGGFArPuhI1256Cc6f5cAf764dC89cC80a3b2d250bD8"; // 自己的key
const CHAT_URL = "https://api.b3n.fun/v1/chat/completions";

const ChatUI = () => {
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState(messageList);
  const [loading, setLoading] = React.useState(false);
  const userInfo = getItem("userInfo");

  const handleSend = () => {
    if (input.trim() !== "") {
      console.log(input);
      // 添加到消息列表
      const newMessage = {
        id: Math.random() * 1000,
        text: input,
        sender: "user",
        avatar: userInfo.avatar,
      };
      setMessages([...messages, newMessage]);
      setInput("");
      // 发送消息到后端
      // 调用 https://yewu.bcwhkj.cn/api/v2.Gptliu/search
      // 获取回复消息
      setLoading(true);
      fetch(`${CHAT_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${SK_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: input,
            },
          ],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setLoading(false);
          // 处理回复消息
          const reply = data.choices[0].message.content;
          const replyMessage = {
            id: Math.random() * 1000,
            text: reply,
            sender: "pet",
            avatar: "/Myfile/1713945060686pet_6.png",
          };
          setMessages((prevMessages) => [...prevMessages, replyMessage]);
        });
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
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <Iconify
                    icon="iconamoon:send-duotone"
                    sx={{
                      color: "white",
                      width: 20,
                      height: 20,
                    }}
                  />
                )
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
