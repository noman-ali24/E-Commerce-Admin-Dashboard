import { Box, Grid, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StatCard from '../../component/StatCard';
import ChartCard from '../../component/ChartCard';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const statsData = [
  { title: 'Total Orders', value: '2,450', change: '+55% than last week', icon: <ShoppingCartIcon />, color: '#800080' },
  { title: 'Today\'s Customers', value: '2,300', change: '+3% than last month', icon: <PeopleIcon />, color: '#800080' },
  { title: 'Revenue', value: '34k', change: '+1% than yesterday', icon: <AttachMoneyIcon />, color: '#800080' },
  { title: 'Growth', value: '+91', change: 'Just updated', icon: <TrendingUpIcon />, color: '#800080' },
];

const websiteViewsData = [
  { name: 'M', value: 40 },
  { name: 'T', value: 30 },
  { name: 'W', value: 50 },
  { name: 'T', value: 35 },
  { name: 'F', value: 45 },
  { name: 'S', value: 25 },
  { name: 'S', value: 30 },
];

const salesData = [
  { name: 'Apr', value: 200 },
  { name: 'May', value: 300 },
  { name: 'Jun', value: 250 },
  { name: 'Jul', value: 400 },
  { name: 'Aug', value: 350 },
  { name: 'Sep', value: 450 },
  { name: 'Oct', value: 500 },
  { name: 'Nov', value: 550 },
  { name: 'Dec', value: 600 },
];

const categoryData = [
  { name: 'Mens', orders: 1200, revenue: 18000 },
  { name: 'Ladies', orders: 900, revenue: 15000 },
  { name: 'Kids', orders: 350, revenue: 7000 },
];

const Dashboard = () => {
  return (
    <Box 
      sx={{ 
        width: '100%',
        minHeight: '100%',
        p: { xs: 2, sm: 3, md: 3 },
        mt: { xs: 7, sm: 8 },
        pb: 4,
      }}
    >
      <Typography 
        variant="h4" 
        sx={{ 
          mb: { xs: 3, md: 4 }, 
          fontWeight: 700, 
          color: '#800080',
          fontSize: { xs: '24px', sm: '28px', md: '32px' },
        }}
      >
        E-Commerce Dashboard
      </Typography>

      {/* Stat Cards Grid - Responsive */}
      <Grid 
        container 
        spacing={3} 
        sx={{ mb: { xs: 3, md: 4 } }}
      >
        {statsData.map((stat, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={3} 
            key={index}
            sx={{
              display: 'flex',
            }}
          >
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Charts Grid - First Row - 3 Cards */}
      <Grid 
        container 
        spacing={3} 
        sx={{ mb: { xs: 3, md: 4 } }}
      >
        <Grid 
          item 
          xs={12} 
          sm={12} 
          md={4}
          sx={{
            display: 'flex',
          }}
        >
          <ChartCard
            title="Website Views"
            subtitle="Last Campaign Performance"
            footer="campaign sent 2 days ago"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={websiteViewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="name" stroke="#800080" />
                <YAxis stroke="#800080" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #800080',
                    borderRadius: '8px',
                  }} 
                />
                <Bar dataKey="value" fill="#800080" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid 
          item 
          xs={12} 
          sm={12} 
          md={4}
          sx={{
            display: 'flex',
          }}
        >
          <ChartCard
            title="Daily Sales"
            subtitle="(+15%) increase in today sales."
            footer="updated 4 min ago"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="name" stroke="#800080" />
                <YAxis stroke="#800080" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #800080',
                    borderRadius: '8px',
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#800080" 
                  strokeWidth={3}
                  dot={{ fill: '#800080', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid 
          item 
          xs={12} 
          sm={12} 
          md={4}
          sx={{
            display: 'flex',
          }}
        >
          <ChartCard
            title="Category Performance"
            subtitle="Orders by Category"
            footer="just updated"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="name" stroke="#800080" />
                <YAxis stroke="#800080" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #800080',
                    borderRadius: '8px',
                  }} 
                />
                <Legend />
                <Bar dataKey="orders" fill="#800080" radius={[8, 8, 0, 0]} />
                <Bar dataKey="revenue" fill="#B366B3" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Charts Grid - Second Row - Responsive */}
      <Grid 
        container 
        spacing={3}
      >
        <Grid 
          item 
          xs={12} 
          md={6}
          sx={{
            display: 'flex',
          }}
        >
          <ChartCard
            title="Monthly Revenue"
            subtitle="Revenue trend over months"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="name" stroke="#800080" />
                <YAxis stroke="#800080" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #800080',
                    borderRadius: '8px',
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#800080" 
                  strokeWidth={3}
                  dot={{ fill: '#800080', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid 
          item 
          xs={12} 
          md={6}
          sx={{
            display: 'flex',
          }}
        >
          <ChartCard
            title="Category Distribution"
            subtitle="Orders breakdown by category"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="name" stroke="#800080" />
                <YAxis stroke="#800080" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #800080',
                    borderRadius: '8px',
                  }} 
                />
                <Bar dataKey="orders" fill="#800080" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
