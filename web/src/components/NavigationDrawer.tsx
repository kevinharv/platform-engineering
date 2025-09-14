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
  SettingsOutlined,
  PersonOutlined,
  BuildOutlined,
  InfoOutline,
  ListAltOutlined,
  GroupsOutlined,
  AddOutlined,
  AttachMoneyOutlined,
  CodeOutlined,
  ListOutlined,
  ComputerOutlined,
  CheckOutlined,
  DesktopWindowsOutlined,
  AppsOutlined,
  ConstructionOutlined,
  FeedOutlined,
  LanOutlined,
  CheckCircleOutline,
} from "@mui/icons-material";

const loggedInUser = {
  username: "519233@corp.com",
  displayName: "John Doe",
};
const initials =
  loggedInUser.displayName.split(" ")[0][0] +
  loggedInUser.displayName.split(" ")[1][0];

const drawerWidth = 240;
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
    link: "/groups",
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
  }
];

export default function NavigationDrawer({ children }: { children: any }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 1,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <List sx={{ flexGrow: 1 }}>
            {navEntries.map((entry) => {
              return (
                <ListItem disablePadding>
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
              <Typography variant="body2">
                {loggedInUser.displayName}
              </Typography>
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
