import { Card, CardContent, Box, Typography } from '@mui/material';

const ChartCard = ({ title, subtitle, children, footer }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        height: '100%',
        minWidth:500,
        minHeight:700,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3, '&:last-child': { pb: 3 } }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: '#800080', fontSize: '18px' }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: '#800080', fontSize: '14px' }}>
            {subtitle}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, minHeight: 320 }}>{children}</Box>
        {footer && (
          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #800080' }}>
            <Typography variant="caption" sx={{ color: '#800080' }}>
              {footer}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
