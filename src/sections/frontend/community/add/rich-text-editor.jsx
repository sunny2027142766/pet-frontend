/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import React from "react";

import "./style.css";
import "react-quill/dist/quill.snow.css";

import { Box } from "@mui/material";

export default function RichTextEditor({ text, setText }) {
  const handleChange = (html) => {
    setText(html);
  };

  return (
    <Box
      sx={{
        overflow: "hidden",
        position: "relative",
        borderRadius: "8px",
        border: "1px solid rgba(145, 158, 171, 0.2)",
      }}
    >
      <ReactQuill theme="snow" value={text} onChange={handleChange} />
    </Box>
  );
}

RichTextEditor.propTypes = {
  text: PropTypes.string,
  setText: PropTypes.func,
};
