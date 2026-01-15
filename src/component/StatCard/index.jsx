import { Card, CardContent, Box, Typography } from '@mui/material';

const StatCard = ({ title, value, change, icon, color = '#800080' }) => {
  return (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${color}, ${color}dd)`,
        color: '#FFFFFF',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transition: 'transform 0.3s ease',
        width: '100%',
        minWidth: 370,
        minHeight: 200,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
        },
      }}
    >
      <CardContent sx={{ p: 3.5, '&:last-child': { pb: 3.5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: '100%' }}>
          <Box sx={{ flex: 1, pr: 2 }}>
            <Typography variant="body1" sx={{ opacity: 0.9, mb: 1.5, fontSize: '14px', fontWeight: 500 }}>
              {title}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1.5, fontSize: '36px', lineHeight: 1.1 }}>
              {value}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '13px', fontWeight: 500, color: '#FFFFFF' }}>
              {change}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 2,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 64,
              height: 64,
              flexShrink: 0,
              '& svg': {
                fontSize: '32px',
              },
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
