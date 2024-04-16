/* eslint-disable import/no-extraneous-dependencies */
import ReactQuill from "react-quill";
import React, { useState } from "react";

import "./style.css";
import "react-quill/dist/quill.snow.css";

import { Box } from "@mui/material";

function RichTextEditor() {
  const [editorHtml, setEditorHtml] = useState("");

  const handleChange = (html) => {
    setEditorHtml(html);
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
      <ReactQuill theme="snow" value={editorHtml} onChange={handleChange} />
    </Box>
  );
}

export default RichTextEditor;
