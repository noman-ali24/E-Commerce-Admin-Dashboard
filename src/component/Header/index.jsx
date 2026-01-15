import { Box, AppBar, Toolbar, Typography, IconButton, InputBase, Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles';

const SearchBox = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#FFFFFF',
  border: '1px solid #800080',
  '&:hover': {
    backgroundColor: '#FFFFFF',
    borderColor: '#800080',
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

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - 280px)`,
        ml: '280px',
        backgroundColor: '#FFFFFF',
        color: '#800080',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar>
        <Typography variant="body2" sx={{ color: '#800080', mr: 2 }}>
          Home / Dashboard
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <SearchBox>
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
            <SearchIcon sx={{ color: '#800080' }} />
          </Box>
          <StyledInputBase placeholder="Search here..." sx={{ color: '#800080' }} />
        </SearchBox>
        <IconButton sx={{ ml: 2, color: '#800080' }}>
          <AccountCircleIcon />
        </IconButton>
        <IconButton sx={{ ml: 1, color: '#800080' }}>
          <SettingsIcon />
        </IconButton>
        <IconButton sx={{ ml: 1, color: '#800080' }}>
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
