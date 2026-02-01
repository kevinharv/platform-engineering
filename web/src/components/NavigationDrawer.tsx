import { Link } from "@tanstack/react-router";
import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  DashboardOutlined,
  AddOutlined,
  AttachMoneyOutlined,
  AppsOutlined,
  ConstructionOutlined,
  LanOutlined,
  CheckCircleOutline,
} from "@mui/icons-material";
import { useAuth } from "./AuthContext";

const drawerWidth = 220;
const navEntries = [
  {
    icon: <DashboardOutlined />,
    name: "Dashboard",
    link: "/",
  },
  {
    icon: <AddOutlined />,
    name: "New",
    link: "/new",
  },
  {
    icon: <AppsOutlined />,
    name: "Applications",
    link: "/applications",
  },
  {
    icon: <LanOutlined />,
    name: "Inventory",
    link: "/inventory",
  },
  {
    icon: <CheckCircleOutline />,
    name: "Approvals",
    link: "/approvals",
  },
  {
    icon: <ConstructionOutlined />,
    name: "Maintenance",
    link: "/maintenance",
  },
  {
    icon: <AttachMoneyOutlined />,
    name: "Billing",
    link: "/billing",
  },
];

export default function NavigationDrawer({ children }: { children: any }) {
  const { username, displayName } = useAuth();
  const initials = displayName.split(" ")[0][0] + displayName.split(" ")[1][0];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 1,
          display: { xs: "none", md: "block" },
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            position: "relative",
            height: "100vh",
            top: 0,
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <List sx={{ flexGrow: 1 }}>
            {navEntries.map((entry) => {
              return (
                <ListItem key={entry.name} disablePadding>
                  <ListItemButton component={Link} to={entry.link}>
                    {entry.icon}
                    <ListItemText
                      primary={entry.name}
                      sx={{ marginLeft: "5%" }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Box sx={{ p: 2, borderTop: "1px solid #ddd" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ mr: 1 }}>{initials}</Avatar>
              <Typography variant="body2">{username}</Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        {children}
      </Box>
    </Box>
  );
}
