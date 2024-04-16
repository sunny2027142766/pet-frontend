import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Footer() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#FFAE01" }}>
      <Toolbar
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography color="inherit">
          © {new Date().getFullYear()} Virtual Pet. @zcy
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
