import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CategoryTable from '../../component/CategoryTable';
import CategoryForm from '../../component/CategoryForm';

// Default categories with subcategories
const initialCategories = [
  {
    id: 1,
    name: 'Men',
    subcategories: ['Shirts', 'Pants', 'Shoes', 'Accessories', 'Jackets', 'T-Shirts'],
  },
  {
    id: 2,
    name: 'Women',
    subcategories: ['Dresses', 'Tops', 'Pants', 'Shoes', 'Accessories', 'Handbags'],
  },
  {
    id: 3,
    name: 'Kids',
    subcategories: ['Shirts', 'Pants', 'Shoes', 'Dresses', 'Accessories', 'Toys'],
  },
];

const Categories = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [categories, setCategories] = useState(() => {
    // Load from localStorage or use initial data
    const stored = localStorage.getItem('categories');
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize localStorage with initial categories
    localStorage.setItem('categories', JSON.stringify(initialCategories));
    return initialCategories;
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    // Save to localStorage whenever categories change
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const handleAdd = () => {
    setEditingCategory(null);
    setOpenDialog(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setOpenDialog(true);
  };

  const handleDelete = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const updatedCategories = categories.filter((c) => c.id !== categoryId);
      setCategories(updatedCategories);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
    }
  };

  const handleSubmit = (formData) => {
    if (editingCategory) {
      // Update existing category
      const updatedCategories = categories.map((c) =>
        c.id === editingCategory.id
          ? {
              ...c,
              name: formData.name,
              subcategories: formData.subcategories,
            }
          : c
      );
      setCategories(updatedCategories);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
    } else {
      // Add new category
      const newId = categories.length > 0 ? Math.max(...categories.map((c) => c.id)) + 1 : 1;
      const newCategory = {
        id: newId,
        name: formData.name,
        subcategories: formData.subcategories,
      };
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
    }
    setOpenDialog(false);
    setEditingCategory(null);
  };

  const handleCancel = () => {
    setOpenDialog(false);
    setEditingCategory(null);
  };

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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: { xs: 3, md: 4 },
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.dark,
            fontSize: { xs: '24px', sm: '28px', md: '32px' },
          }}
        >
          Categories Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.white,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
            textTransform: 'none',
            px: 3,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          Add Category
        </Button>
      </Box>

      <Paper
        sx={{
          p: { xs: 2, sm: 3 },
          backgroundColor: theme.palette.background.paper,
          borderRadius: 3,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            color: theme.palette.primary.main,
            fontWeight: 600,
          }}
        >
          All Categories
        </Typography>
        <CategoryTable
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCancel}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            color: theme.palette.text.dark,
            fontWeight: 700,
            pb: 2,
          }}
        >
          {editingCategory ? 'Edit Category' : 'Add New Category'}
        </DialogTitle>
        <DialogContent>
          <CategoryForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            initialData={editingCategory}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Categories;
