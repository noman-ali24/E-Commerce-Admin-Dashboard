import { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import ImageIcon from '@mui/icons-material/Image';
import PaymentIcon from '@mui/icons-material/Payment';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Products', icon: <InventoryIcon />, path: '/products' },
  { text: 'Orders', icon: <ReceiptIcon />, path: '/orders' },
  { text: 'Customers', icon: <PeopleIcon />, path: '/customers' },
  { text: 'Categories', icon: <CategoryIcon />, path: '/categories' },
  { text: 'Banners', icon: <ImageIcon />, path: '/banners' },
  { text: 'Payments', icon: <PaymentIcon />, path: '/payments' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  { text: 'Logout', icon: <LogoutIcon />, path: '/logout' },
];

const Sidebar = ({ onLogout, mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openSubmenu, setOpenSubmenu] = useState({
    Products: location.pathname.startsWith('/products'),
  });

  const handleSubmenuToggle = (itemText) => {
    setOpenSubmenu((prev) => ({
      ...prev,
      [itemText]: !prev[itemText],
    }));
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const isSubmenuActive = (submenu) => {
    return submenu?.some((subItem) => location.pathname === subItem.path);
  };

  const handleItemClick = (item) => {
    if (item.submenu) {
      handleSubmenuToggle(item.text);
    } else if (item.path === '/logout') {
      // Handle logout
      if (window.confirm('Are you sure you want to logout?')) {
        if (onLogout) {
          onLogout();
        }
        navigate('/signin');
      }
    } else {
      navigate(item.path);
      // Close mobile drawer when navigating
      if (isMobile && handleDrawerToggle) {
        handleDrawerToggle();
      }
    }
  };

  const drawerContent = (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.text.dark }}>
          E-Commerce Admin
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => {
          const hasSubmenu = !!item.submenu;
          const active = isActive(item.path) || (hasSubmenu && isSubmenuActive(item.submenu));
          const submenuOpen = openSubmenu[item.text] || false;

          return (
            <Box key={item.text}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleItemClick(item)}
                  sx={{
                    mx: 1,
                    borderRadius: 2,
                    backgroundColor: active ? theme.palette.primary.main : 'transparent',
                    '&:hover': {
                      backgroundColor: active ? theme.palette.primary.main : `${theme.palette.primary.main}1A`,
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: active ? theme.palette.text.white : theme.palette.primary.main }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      sx: {
                        color: active ? theme.palette.text.white : theme.palette.primary.main,
                        fontWeight: active ? 600 : 400,
                      },
                    }}
                  />
                  {hasSubmenu && (
                    <Box sx={{ color: active ? theme.palette.text.white : theme.palette.primary.main }}>
                      {submenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </Box>
                  )}
                </ListItemButton>
              </ListItem>
              {hasSubmenu && (
                <Collapse in={submenuOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.submenu.map((subItem) => {
                      const subActive = location.pathname === subItem.path;
                      return (
                        <ListItem key={subItem.text} disablePadding>
                          <ListItemButton
                            onClick={() => {
                              navigate(subItem.path);
                              if (isMobile && handleDrawerToggle) {
                                handleDrawerToggle();
                              }
                            }}
                            sx={{
                              mx: 1,
                              ml: 4,
                              borderRadius: 2,
                              backgroundColor: subActive ? theme.palette.primary.main : 'transparent',
                              '&:hover': {
                                backgroundColor: subActive ? theme.palette.primary.main : `${theme.palette.primary.main}1A`,
                              },
                            }}
                          >
                            <ListItemText
                              primary={subItem.text}
                              primaryTypographyProps={{
                                sx: {
                                  color: subActive ? theme.palette.text.white : theme.palette.primary.main,
                                  fontWeight: subActive ? 600 : 400,
                                  fontSize: '0.9rem',
                                },
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </Box>
          );
        })}
      </List>
    </>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.primary.main,
            borderRight: `1px solid ${theme.palette.custom.lightGreyBorder}`,
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.primary.main,
            borderRight: `1px solid ${theme.palette.custom.lightGreyBorder}`,
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
