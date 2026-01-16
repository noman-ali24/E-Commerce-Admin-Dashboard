import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  useTheme,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import BannerForm from '../../component/BannerForm';
import BannerCard from '../../component/BannerCard';

// Initial banners data
const initialSliderBanners = [];
const initialOfferBanners = [];

const Banners = () => {
  const theme = useTheme();
  const [sliderBanners, setSliderBanners] = useState(() => {
    const stored = localStorage.getItem('sliderBanners');
    if (stored) {
      return JSON.parse(stored);
    }
    localStorage.setItem('sliderBanners', JSON.stringify(initialSliderBanners));
    return initialSliderBanners;
  });
  const [offerBanners, setOfferBanners] = useState(() => {
    const stored = localStorage.getItem('offerBanners');
    if (stored) {
      return JSON.parse(stored);
    }
    localStorage.setItem('offerBanners', JSON.stringify(initialOfferBanners));
    return initialOfferBanners;
  });
  const [openSliderDialog, setOpenSliderDialog] = useState(false);
  const [openOfferDialog, setOpenOfferDialog] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [currentType, setCurrentType] = useState('slider');

  useEffect(() => {
    localStorage.setItem('sliderBanners', JSON.stringify(sliderBanners));
  }, [sliderBanners]);

  useEffect(() => {
    localStorage.setItem('offerBanners', JSON.stringify(offerBanners));
  }, [offerBanners]);

  const handleAddSlider = () => {
    setEditingBanner(null);
    setCurrentType('slider');
    setOpenSliderDialog(true);
  };

  const handleAddOffer = () => {
    setEditingBanner(null);
    setCurrentType('offer');
    setOpenOfferDialog(true);
  };

  const handleEditSlider = (banner) => {
    setEditingBanner(banner);
    setCurrentType('slider');
    setOpenSliderDialog(true);
  };

  const handleEditOffer = (banner) => {
    setEditingBanner(banner);
    setCurrentType('offer');
    setOpenOfferDialog(true);
  };

  const handleDeleteSlider = (bannerId) => {
    if (window.confirm('Are you sure you want to delete this slider banner?')) {
      const updated = sliderBanners.filter((b) => b.id !== bannerId);
      setSliderBanners(updated);
      localStorage.setItem('sliderBanners', JSON.stringify(updated));
    }
  };

  const handleDeleteOffer = (bannerId) => {
    if (window.confirm('Are you sure you want to delete this offer banner?')) {
      const updated = offerBanners.filter((b) => b.id !== bannerId);
      setOfferBanners(updated);
      localStorage.setItem('offerBanners', JSON.stringify(updated));
    }
  };

  const handleSubmitSlider = (formData) => {
    if (editingBanner) {
      const updated = sliderBanners.map((b) =>
        b.id === editingBanner.id ? { ...formData, id: editingBanner.id } : b
      );
      setSliderBanners(updated);
      localStorage.setItem('sliderBanners', JSON.stringify(updated));
    } else {
      const newId = sliderBanners.length > 0 ? Math.max(...sliderBanners.map((b) => b.id)) + 1 : 1;
      const newBanner = { ...formData, id: newId };
      const updated = [...sliderBanners, newBanner];
      setSliderBanners(updated);
      localStorage.setItem('sliderBanners', JSON.stringify(updated));
    }
    setOpenSliderDialog(false);
    setEditingBanner(null);
  };

  const handleSubmitOffer = (formData) => {
    if (editingBanner) {
      const updated = offerBanners.map((b) =>
        b.id === editingBanner.id ? { ...formData, id: editingBanner.id } : b
      );
      setOfferBanners(updated);
      localStorage.setItem('offerBanners', JSON.stringify(updated));
    } else {
      const newId = offerBanners.length > 0 ? Math.max(...offerBanners.map((b) => b.id)) + 1 : 1;
      const newBanner = { ...formData, id: newId };
      const updated = [...offerBanners, newBanner];
      setOfferBanners(updated);
      localStorage.setItem('offerBanners', JSON.stringify(updated));
    }
    setOpenOfferDialog(false);
    setEditingBanner(null);
  };

  const handleCancel = () => {
    setOpenSliderDialog(false);
    setOpenOfferDialog(false);
    setEditingBanner(null);
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
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 4 },
          fontWeight: 700,
          color: theme.palette.text.dark,
          fontSize: { xs: '24px', sm: '28px', md: '32px' },
        }}
      >
        Banners & Promotions
      </Typography>

      {/* Homepage Slider Images Section */}
      <Paper
        sx={{
          p: { xs: 2, sm: 3 },
          backgroundColor: theme.palette.background.paper,
          borderRadius: 3,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SlideshowIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.dark,
                }}
              >
                Homepage Slider Images
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                }}
              >
                Upload images for the homepage slider carousel
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddSlider}
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
            Add Slider Image
          </Button>
        </Box>
        <Divider sx={{ mb: 3 }} />
        {sliderBanners.length > 0 ? (
          <Grid container spacing={3}>
            {sliderBanners.map((banner) => (
              <Grid item xs={12} sm={6} md={4} key={banner.id}>
                <BannerCard
                  banner={banner}
                  onEdit={handleEditSlider}
                  onDelete={handleDeleteSlider}
                  type="slider"
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.disabled,
              textAlign: 'center',
              py: 4,
              fontStyle: 'italic',
            }}
          >
            No slider images added yet. Click "Add Slider Image" to get started.
          </Typography>
        )}
      </Paper>

      {/* Offer Banners Section */}
      <Paper
        sx={{
          p: { xs: 2, sm: 3 },
          backgroundColor: theme.palette.background.paper,
          borderRadius: 3,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LocalOfferIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.dark,
                }}
              >
                Offer Banners
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                }}
              >
                Create promotional banners (e.g., "Winter Sale 50% Off")
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddOffer}
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
            Add Offer Banner
          </Button>
        </Box>
        <Divider sx={{ mb: 3 }} />
        {offerBanners.length > 0 ? (
          <Grid container spacing={3}>
            {offerBanners.map((banner) => (
              <Grid item xs={12} sm={6} md={4} key={banner.id}>
                <BannerCard
                  banner={banner}
                  onEdit={handleEditOffer}
                  onDelete={handleDeleteOffer}
                  type="offer"
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.disabled,
              textAlign: 'center',
              py: 4,
              fontStyle: 'italic',
            }}
          >
            No offer banners added yet. Click "Add Offer Banner" to create one.
          </Typography>
        )}
      </Paper>

      {/* Slider Dialog */}
      <Dialog
        open={openSliderDialog}
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
          {editingBanner ? 'Edit Slider Image' : 'Add Slider Image'}
        </DialogTitle>
        <DialogContent>
          <BannerForm
            onSubmit={handleSubmitSlider}
            onCancel={handleCancel}
            initialData={editingBanner}
            type="slider"
          />
        </DialogContent>
      </Dialog>

      {/* Offer Dialog */}
      <Dialog
        open={openOfferDialog}
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
          {editingBanner ? 'Edit Offer Banner' : 'Add Offer Banner'}
        </DialogTitle>
        <DialogContent>
          <BannerForm
            onSubmit={handleSubmitOffer}
            onCancel={handleCancel}
            initialData={editingBanner}
            type="offer"
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Banners;
