import { Card, CardContent, Box, Typography, useTheme } from '@mui/material';

const ChartCard = ({ title, subtitle, children, footer }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        height: '100%',
        minHeight: { xs: 400, sm: 300, md: 500 },
        width: '100%',
        minWidth: {  sm: 520 },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3, '&:last-child': { pb: 3 } }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: theme.palette.primary.main, fontSize: '18px' }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontSize: '14px' }}>
            {subtitle}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, minHeight: { xs: 250, sm: 300, md: 320 } }}>{children}</Box>
        {footer && (
          <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${theme.palette.primary.main}` }}>
            <Typography variant="caption" sx={{ color: theme.palette.primary.main }}>
              {footer}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
