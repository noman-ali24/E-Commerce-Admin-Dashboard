import { Box, AppBar, Toolbar, Typography, IconButton, InputBase, Badge, useTheme, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';

const SearchBox = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.custom.lightGarishPurple}`,
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.primary.light,
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const Header = ({ handleDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const drawerWidth = 280;

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
        ml: { xs: 0, sm: `${drawerWidth}px` },
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.primary.main,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, color: theme.palette.primary.main }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography 
          variant="body2" 
          sx={{ 
            color: theme.palette.text.dark, 
            mr: 2,
            display: { xs: 'none', sm: 'block' }
          }}
        >
          Home / Dashboard
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <SearchBox sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Box
            sx={{
              padding: '0 16px',
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SearchIcon sx={{ color: theme.palette.custom.lightGarishPurple }} />
          </Box>
          <StyledInputBase 
            placeholder="Search here..." 
            sx={{ 
              color: theme.palette.custom.lightGarishPurple,
              '&::placeholder': {
                color: theme.palette.custom.lightGarishPurple,
                opacity: 0.7,
              },
            }} 
          />
        </SearchBox>
        <IconButton sx={{ ml: { xs: 0.5, sm: 2 }, color: theme.palette.custom.lightGarishPurple, '&:hover': { color: theme.palette.primary.light } }}>
          <AccountCircleIcon />
        </IconButton>
        <IconButton sx={{ ml: { xs: 0.5, sm: 1 }, color: theme.palette.custom.lightGarishPurple, '&:hover': { color: theme.palette.primary.light }, display: { xs: 'none', sm: 'flex' } }}>
          <SettingsIcon />
        </IconButton>
        <IconButton sx={{ ml: { xs: 0.5, sm: 1 }, color: theme.palette.custom.lightGarishPurple, '&:hover': { color: theme.palette.primary.light } }}>
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
