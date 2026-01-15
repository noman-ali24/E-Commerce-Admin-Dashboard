import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#800080", // Purple
      light: "#B366B3",
      dark: "#5C005C",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#800080",
      light: "#B366B3",
      dark: "#5C005C",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
      dark: "#1A1A1A",
      card: "#FFFFFF",
    },
    gradient: {
      primary: "linear-gradient(90deg, #800080, #B366B3)",
      secondary: "linear-gradient(135deg, #800080, #5C005C)",
      card: "linear-gradient(135deg, #800080, #B366B3)",
    },
    text: {
      primary: "#1A1A1A",
      secondary: "#666666",
      disabled: "#999999",
      white: "#FFFFFF",
      dark: "#1A1A1A",
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
    },
    success: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: {
      fontSize: 48,
      fontWeight: 700,
      color: "#1A1A1A",
      fontFamily: '"Poppins", sans-serif',
    },
    h2: {
      fontSize: 40,
      fontWeight: 700,
      color: "#1A1A1A",
      fontFamily: '"Poppins", sans-serif',
    },
    h3: {
      fontSize: 32,
      fontWeight: 700,
      color: "#1A1A1A",
      fontFamily: '"Poppins", sans-serif',
    },
    h4: {
      fontSize: 28,
      fontWeight: 600,
      color: "#1A1A1A",
      fontFamily: '"Poppins", sans-serif',
    },
    h5: {
      fontSize: 24,
      fontWeight: 600,
      color: "#1A1A1A",
      fontFamily: '"Poppins", sans-serif',
    },
    h6: {
      fontSize: 20,
      fontWeight: 600,
      color: "#1A1A1A",
      fontFamily: '"Poppins", sans-serif',
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 500,
      color: "#67768B",
      fontFamily: '"Poppins", sans-serif',
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 400,
      color: "#67768B",
      fontFamily: '"Poppins", sans-serif',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
      color: "#1A1A1A",
      fontFamily: '"Poppins", sans-serif',
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
      color: "#67768B",
      fontFamily: '"Poppins", sans-serif',
    },
    caption: {
      fontSize: 12,
      fontWeight: 400,
      color: "#67768B",
      fontFamily: '"Poppins", sans-serif',
    },
    button: {
      fontSize: 16,
      fontWeight: 500,
      color: "#ffffff",
      fontFamily: '"Poppins", sans-serif',
      textTransform: "none",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: "all 0.3s ease",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
      },
      variants: [
        {
          props: { variant: "gradient" },
          style: {
            background: "linear-gradient(135deg, #800080, #B366B3)",
            color: "#FFFFFF",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 10px 20px rgba(128,0,128,0.3)",
            },
          },
        },
      ],
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
          fontWeight: 400,
          fontFamily: '"Poppins", sans-serif',
        },
      },
      variants: [
        {
          props: { variant: "gradient" },
          style: {
            background: "linear-gradient(90deg, #800080, #B366B3)",
            color: "#FFFFFF",
            padding: "12px",
            fontSize: "16px",
            "&:hover": {
              background: "linear-gradient(90deg, #B366B3, #800080)",
              transform: "translateY(-2px)",
              boxShadow: "0 5px 15px rgba(128,0,128,0.3)",
            },
          },
        },
        {
          props: { variant: "authbutton" },
          style: {
            background: "linear-gradient(90deg,rgb(6, 247, 66),  #8CE600)",
            color: "#fff",
            padding: "30px 30px",
            fontSize: "18px",
            borderRadius: "8px",
            fontWeight: 700,
            "&:hover": {
              background: "linear-gradient(90deg,  #8CE600,rgb(77, 169, 11))",
              transform: "translateY(-2px)",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            },
          },
        },
        {
          props: { variant: "socail" },
          style: {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "4px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            padding: "5px 26px",
            color: "#ffffff",
            textTransform: "none",
            fontSize: "12px",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          },
        },
        {
          props: { variant: "webbutton" },
          style: {
            background: "linear-gradient(90deg,#8CE600, #8CE600)",
            color: "#151515",
            padding: "30px 30px",
            fontSize: "18px",
            borderRadius: "12px",
            fontWeight: 500,
            "&:hover": {
              background: "linear-gradient(90deg,#8CE600, #8CE600)",
              transform: "translateY(-2px)",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            },
          },
        },

        {
          props: { variant: "gradientbtn" },
          style: {
            background:
              "linear-gradient(135deg, #8CE600 0%, #6BB314 50%, #4A8B0A 100%)", // 🟢 Multi-stop gradient
            color: "#ffffff",
            padding: "12px 24px", // �� Better padding
            fontSize: "16px",
            fontWeight: "600", // 🟢 Bold text
            borderRadius: "12px",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", // 🟢 Smooth transition

            "&::before": {
              // �� Shine effect
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              // background:
              //   "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              transition: "left 0.5s",
            },

            "&:hover": {
              // background:
              //   "linear-gradient(135deg, #9DFF00 0%, #8CE600 50%, #6BB314 100%)", // �� Brighter on hover
              transform: "translateY(-3px) scale(1.02)", // 🟢 Enhanced lift effect
              // boxShadow:
              //   "0 8px 25px rgba(140, 230, 0, 0.4), 0 0 0 1px rgba(140, 230, 0, 0.1)", // 🟢 Glowing shadow

              "&::before": {
                left: "100%", // 🟢 Shine animation
              },
            },

            "&:active": {
              transform: "translateY(-1px) scale(0.98)", // 🟢 Press effect
            },
          },
        },
        {
          props: { variant: "errorbtn" },
          style: {
            background: "linear-gradient(to top, #FDA1A1, #FF0000)",
            color: "#ffff",
            padding: "30px 30px",
            fontSize: "18px",
            borderRadius: "8px",
            fontWeight: 500,
            "&:hover": {
              background: "linear-gradient(to top, #FDA1A1, #FF0000)",
              transform: "translateY(-2px)",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            },
          },
        },
        {
          props: { variant: "customGrey" },
          style: {
            backgroundColor: "#F8FAFC",
            fontSize: 12,
            height: 34,
            width: 80,
            textTransform: "none",
            border: "1px solid",
            borderColor: "#E5E7EB",
            color: "#374151",
            "&:hover": {
              backgroundColor: "#f1f5f9",
            },
          },
        },
        {
          props: { variant: "customOutlined" },
          style: {
            backgroundColor: "#F8FAFC",
            fontSize: 12,
            height: 34,
            width: 150,
            textTransform: "none",
            border: "1px solid",
            borderColor: "#8CE600",
            color: "#8CE600",
          },
        },
      ],
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 8,
          borderRadius: 4,
          backgroundColor: "rgba(255,255,255,0.1)",
        },
        bar: {
          borderRadius: 4,
          background: "linear-gradient(90deg, #800080, #B366B3)",
        },
      },
    },
    MuiBox: {
      variants: [
        {
          props: { variant: "authBox" },
          style: {
            backgroundColor: "#f4f4f4",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          },
        },
      ],
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: '"Poppins", sans-serif',
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#F5F5F5",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #E0E0E0",
          color: "#1A1A1A",
        },
        head: {
          color: "#800080",
          fontWeight: 700,
          fontSize: "0.9rem",
          letterSpacing: "0.5px",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-of-type(even)": {
            backgroundColor: "#FAFAFA",
          },
          "&:hover": {
            backgroundColor: "#F0F0F0",
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #E0E0E0",
          color: "#1A1A1A",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      variants: [
        {
          props: { variant: "softInput" },
          style: {
            backgroundColor: "#eaf3eb",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "15px",
              background: "#eaf3eb",
              "& fieldset": {
                borderColor: "transparent",
                borderRadius: "15px",
              },
              "&:hover fieldset": {
                borderColor: "#fff",
                borderRadius: "15px",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffff",
                borderRadius: "15px",
              },
            },
            "& .MuiInputBase-input": {
              padding: "10px 14px",
              borderRadius: "15px",
            },
          },
        },
        {
          props: { variant: "customInput" },
          style: {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: "15px",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(140, 230, 0, 0.3)",
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "#8CE600",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#8CE600",
                borderWidth: "2px",
              },
            },
            "& .MuiInputBase-input": {
              color: "white",
              "&::placeholder": {
                color: "rgba(255, 255, 255, 0.6)",
              },
            },
            "& .MuiInputLabel-root": {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
        },
        {
          props: { variant: "darkInput" },
          style: {
            backgroundColor: "rgba(42, 42, 42, 0.8)",
            borderRadius: "12px",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(42, 42, 42, 0.8)",
              border: "1px solid rgba(140, 230, 0, 0.2)",
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "#8CE600",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#8CE600",
                borderWidth: "2px",
                boxShadow: "0 0 0 3px rgba(140, 230, 0, 0.1)",
              },
            },
            "& .MuiInputBase-input": {
              color: "white",
              fontSize: "16px",
              "&::placeholder": {
                color: "rgba(255, 255, 255, 0.5)",
              },
            },
            "& .MuiInputLabel-root": {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          fontFamily: '"Poppins", sans-serif',
        },
      },
    },
  },
});

export default theme;
