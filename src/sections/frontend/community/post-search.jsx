import PropTypes from "prop-types";
import { useState } from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import Iconify from "src/components/iconify";

const PostSearch = ({ onSearch }) => {
  const [text, setText] = useState("");

  const handleSearch = () => {
    onSearch(text);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <Box
      component="div"
      display="flex"
      borderRadius="10px"
      sx={{
        width: { md: "auto" },
        backgroundColor: "#fff",
        border: "1px solid #8E33FF",
      }}
    >
      <InputBase
        value={text}
        onChange={handleChange}
        sx={{ ml: 2, flex: 1 }}
        placeholder="搜索"
      />
      <IconButton type="button" sx={{ p: 1 }} onClick={handleSearch}>
        <Iconify icon="eva:search-fill" />
      </IconButton>
    </Box>
  );
};

export default PostSearch;

PostSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
