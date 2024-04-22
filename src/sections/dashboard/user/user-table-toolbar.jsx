import PropTypes from "prop-types";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

import Iconify from "src/components/iconify";

// ----------------------------------------------------------------------

export default function UserTableToolbar({ numSelected, handleQuery }) {
  const [keywords, setKeywords] = useState("");

  return (
    <Toolbar
      sx={{
        height: 96,
        display: "flex",
        justifyContent: "space-between",
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} 已选择
        </Typography>
      ) : (
        <>
          <OutlinedInput
            value={keywords}
            onChange={(event) => {
              setKeywords(event.target.value);
            }}
            sx={{
              width: 300,
            }}
            placeholder="请输入用户名、昵称、手机号"
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: "text.disabled", width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />
          <Tooltip title="查询">
            <IconButton onClick={() => handleQuery(keywords)}>
              <Iconify icon="eva:search-fill" />
            </IconButton>
          </Tooltip>
        </>
      )}

      {numSelected > 0 && (
        <Tooltip title="删除">
          <IconButton onClick={() => {}}>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  handleQuery: PropTypes.func,
};
