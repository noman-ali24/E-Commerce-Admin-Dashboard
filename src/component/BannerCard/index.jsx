import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  IconButton,
  Chip,
  useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';

const BannerCard = ({ banner, onEdit, onDelete, type = 'slider' }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        border: `2px solid ${banner.isActive ? theme.palette.primary.main : theme.palette.custom?.lightGreyBorder || theme.palette.custom?.lightGrey}`,
        opacity: banner.isActive ? 1 : 0.7,
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height={type === 'slider' ? 200 : 150}
          image={banner.image}
          alt={banner.title || 'Banner'}
          sx={{
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            gap: 1,
          }}
        >
          <Chip
            label={banner.isActive ? 'Active' : 'Inactive'}
            size="small"
            sx={{
              backgroundColor: banner.isActive
                ? theme.palette.success.light
                : theme.palette.error.light,
              color: theme.palette.text.white,
              fontWeight: 600,
            }}
          />
        </Box>
      </Box>
      <CardContent sx={{ flex: 1, p: 2 }}>
        {type === 'offer' && banner.title && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.dark,
              mb: 0.5,
            }}
          >
            {banner.title}
          </Typography>
        )}
        {type === 'offer' && banner.subtitle && (
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              mb: 1,
            }}
          >
            {banner.subtitle}
          </Typography>
        )}
        {banner.link && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
            <LinkIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.primary.main,
                textDecoration: 'none',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {banner.link}
            </Typography>
          </Box>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
          <IconButton
            onClick={() => onEdit(banner)}
            sx={{
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: `${theme.palette.primary.main}15`,
              },
            }}
            size="small"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => onDelete(banner.id)}
            sx={{
              color: theme.palette.error.main,
              '&:hover': {
                backgroundColor: `${theme.palette.error.main}15`,
              },
            }}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BannerCard;
