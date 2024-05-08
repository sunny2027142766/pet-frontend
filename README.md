# GPT

``` json
const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjkzMjk4NGE0LWQ4YTgtNGEwNS05N2U3LTI1ZjA5OGFjN2JhOSIsImV4cCI6MTcxNTY3MDMyMX0.xWB7K0P-_t4KWKXKsMbg_qRHGzFo1y1VEe5HlPl8BBs";

 

const handleSend = () => {
    if (input.trim() !== "") {
      console.log(input);
      // 添加到消息列表
      const newMessage = {
        id: messages.length + 1,
        text: input,
        sender: "user",
        avatar: "/Myfile/avatar_1.jpg",
      };
      setMessages([...messages, newMessage]);
      setInput("");
      // 发送消息到后端
      // 调用 https://api.fukaluosi.online/api/gpt/message/completions
      // 获取回复消息
      setLoading(true);
      fetch("https://api.fukaluosi.online/api/gpt/message/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${API_KEY}`,
        },
        body: JSON.stringify({
          topicId: "61128948-259b-4182-a422-053fd19ebb6d",
          messages: [
            {
              id: "",
              content: input,
              createdTime: "1715151176517",
              role: "user",
              file: [],
            },
          ],
          model: "gpt-3.5-turbo",
          config: {
            temperature: 0.8,
            context: 3,
            model: "gpt-3.5-turbo",
          },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setLoading(false);
          // 处理回复消息
          const reply = data.choices[0].message.content;
          const replyMessage = {
            id: messages.length + 1,
            text: reply,
            sender: "pet",
            avatar: "/Myfile/1713945060686pet_6.png",
          };
          setMessages((prevMessages) => [...prevMessages, replyMessage]);
        });
    }
  };
```





```json
 const API_KEY = "OQDsaLJdC9wk5HXOLlUVEoGiH68cqNpV";
 const handleSend = () => {
    if (input.trim() !== "") {
      console.log(input);
      // 添加到消息列表
      const newMessage = {
        id: messages.length + 1,
        text: input,
        sender: "user",
        avatar: "/Myfile/avatar_1.jpg",
      };
      setMessages([...messages, newMessage]);
      setInput("");
      // 发送消息到后端
      // 调用 https://yewu.bcwhkj.cn/api/v2.Gptliu/search
      // 获取回复消息
      setLoading(true);
      fetch("https://yewu.bcwhkj.cn/api/v2.Gptliu/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: input }],
          model: "gpt-3.5-turbo-1106",
          stream: false,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setLoading(false);
          // 处理回复消息
          const reply = data.choices[0].message.content;
          const replyMessage = {
            id: messages.length + 1,
            text: reply,
            sender: "pet",
            avatar: "/Myfile/1713945060686pet_6.png",
          };
          setMessages((prevMessages) => [...prevMessages, replyMessage]);
        });
    }
  };
```

