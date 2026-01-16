import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  IconButton,
  useTheme,
  Typography,
  Collapse,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from 'react';

const CategoryTable = ({ categories, onEdit, onDelete }) => {
  const theme = useTheme();
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (categoryId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const getCategoryColor = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case 'men':
        return theme.palette.primary.main;
      case 'women':
        return theme.palette.primary.light;
      case 'kids':
        return theme.palette.custom?.lightGarishPurple || theme.palette.primary.light;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        backgroundColor: theme.palette.background.paper,
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          height: '8px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.background.default,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.custom.lightGrey,
          borderRadius: '4px',
        },
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: theme.palette.background.default,
            }}
          >
            <TableCell
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
              }}
            >
              Category Name
            </TableCell>
            <TableCell
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
              }}
            >
              Subcategories
            </TableCell>
            <TableCell
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
              }}
              align="center"
            >
              Total Subcategories
            </TableCell>
            <TableCell
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
              }}
              align="center"
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <>
              <TableRow
                key={category.id}
                sx={{
                  '&:nth-of-type(even)': {
                    backgroundColor: theme.palette.background.default,
                  },
                  '&:hover': {
                    backgroundColor: `${theme.palette.primary.main}08`,
                  },
                  borderBottom: `1px solid ${theme.palette.custom?.lightGreyBorder || theme.palette.custom?.lightGrey}`,
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={category.name}
                      sx={{
                        backgroundColor: getCategoryColor(category.name),
                        color: theme.palette.text.white,
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        minWidth: 100,
                      }}
                    />
                    {category.subcategories && category.subcategories.length > 0 && (
                      <IconButton
                        size="small"
                        onClick={() => toggleRow(category.id)}
                        sx={{
                          color: theme.palette.primary.main,
                          '&:hover': {
                            backgroundColor: `${theme.palette.primary.main}15`,
                          },
                        }}
                      >
                        {expandedRows[category.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {category.subcategories && category.subcategories.length > 0 ? (
                      category.subcategories.slice(0, 3).map((sub, index) => (
                        <Chip
                          key={index}
                          label={sub}
                          size="small"
                          sx={{
                            backgroundColor: theme.palette.background.default,
                            color: theme.palette.text.dark,
                            border: `1px solid ${theme.palette.custom?.lightGreyBorder || theme.palette.custom?.lightGrey}`,
                          }}
                        />
                      ))
                    ) : (
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.disabled,
                          fontStyle: 'italic',
                        }}
                      >
                        No subcategories
                      </Typography>
                    )}
                    {category.subcategories && category.subcategories.length > 3 && (
                      <Typography
                        variant="caption"
                        sx={{
                          color: theme.palette.text.secondary,
                          ml: 1,
                        }}
                      >
                        +{category.subcategories.length - 3} more
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={category.subcategories?.length || 0}
                    size="small"
                    sx={{
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.text.white,
                      fontWeight: 600,
                      minWidth: 50,
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <IconButton
                      onClick={() => onEdit(category)}
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
                      onClick={() => onDelete(category.id)}
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
                </TableCell>
              </TableRow>
              {expandedRows[category.id] && category.subcategories && category.subcategories.length > 0 && (
                <TableRow>
                  <TableCell colSpan={4} sx={{ py: 2, backgroundColor: theme.palette.background.default }}>
                    <Box sx={{ pl: 4 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          mb: 1,
                          fontWeight: 600,
                        }}
                      >
                        All Subcategories:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {category.subcategories.map((sub, index) => (
                          <Chip
                            key={index}
                            label={sub}
                            size="small"
                            sx={{
                              backgroundColor: theme.palette.background.paper,
                              color: theme.palette.text.dark,
                              border: `1px solid ${theme.palette.custom?.lightGreyBorder || theme.palette.custom?.lightGrey}`,
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoryTable;
