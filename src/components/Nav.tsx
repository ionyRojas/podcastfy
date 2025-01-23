"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useMemo, useState } from "react";

const StyledMenuItem = styled(MenuItem)({
  color: "black",
  "&:hover": {
    color: "white",
    backgroundColor: "rgb(200, 30, 70)",
  },
  borderRadius: "4px",
  fontWeight: "bold",
});

export default function Navbar() {
  const { user, error, isLoading } = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleLogin = () => {
    window.location.href = "/api/auth/login";
  };

  const handleLogout = () => {
    window.location.href = "/api/auth/logout";
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getInitials = useMemo(() => {
    if (user?.name) {
      const names = user.name.split(" ");
      return (
        names[0].charAt(0)?.toUpperCase() + names?.[1]?.charAt(1)?.toUpperCase()
      );
    }

    return "";
  }, [user?.name]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <AppBar position="static" sx={{ bgcolor: "#fff", color: "#000" }}>
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Podcastfy
        </Typography>
        <Box display="flex" gap={3} alignItems="center">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            The app for Podcast
          </Typography>
          {!user ? (
            <Button
              onClick={handleLogin}
              sx={{
                backgroundColor: "rgb(255, 39, 91)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgb(200, 30, 70)",
                },
              }}
            >
              Login
            </Button>
          ) : (
            <Box display="flex" alignItems="center">
              <Avatar
                sx={{ bgcolor: "rgb(255, 39, 91)", cursor: "pointer" }}
                onClick={handleMenuOpen}
              >
                {getInitials}
              </Avatar>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                  style: {
                    padding: 8,
                  },
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <StyledMenuItem onClick={handleLogout}>Logout</StyledMenuItem>
              </Menu>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
