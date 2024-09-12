import { yupResolver } from "@hookform/resolvers/yup";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import * as yup from "yup";
import api from "../services/api";
import { useGoogleLogin } from "@react-oauth/google";

const schema = yup
  .object({
    email: yup
      .string("Please provide a valid email address")
      .required("Please provide your email address"),
    password: yup
      .string()
      // .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  })
  .required();

const LoginForm = ({ formType, handleSwap }) => {
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const [showPassword, setShowPassword] = useState(false);
  


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const togglePasswordState = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginUser = async (data) => {
    try {
      console.log("data before sent : ", data["email"]);
      const response = await api.post("/auth/token/", {
        email: data.email,
        password: data.password,
      });
      console.log("login response : ", response);
    } catch (error) {
      console.log("error login user : ", error);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  return (
    <form
      className="w-full h-full flex flex-col justify-center items-center p-4"
      onSubmit={handleSubmit(loginUser)}
    >
      <Box
        display="grid"
        gap="10px"
        // m={4}
        gridTemplateColumns="repeat(2, 1fr)"
        sx={{
          width: isNonMobileScreen ? "500px" : undefined,
          maxWidth: isNonMobileScreen ? "100%" : undefined,
          height: "100%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            gridColumn: "span 2",
            color: "#1e90ff", // Vivid blue color for the text
            fontWeight: "bold", // Bold text for prominence
            textAlign: "center", // Centers the text
            mb: 3, // Adds some margin below the title
            fontFamily: "'Karla', sans-serif", // Uses the 'Karla' font
            letterSpacing: "1.5px", // Adds a bit more spacing between letters
            borderBottom: "4px solid #1e90ff", // Thicker bottom border for emphasis
            paddingBottom: "8px", // Adds more padding below the text for balance
            position: "relative", // Needed for the pseudo-element
            overflow: "hidden", // Ensures the pseudo-element does not overflow
            transition: "color 0.4s ease, transform 0.4s ease", // Smooth transition for color and scale
            "&:hover": {
              color: "#ffffff", // Changes text color to white on hover
              transform: "translateY(-5px)", // Slightly lifts the title on hover
            },
            "&::before": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(120deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))",
              opacity: 0,
              transition: "opacity 0.4s ease", // Smooth transition for the gradient
            },
            "&:hover::before": {
              opacity: 1, // Shows the gradient effect on hover
            },
          }}
        >
          {formType.toUpperCase()}
        </Typography>
        {/* Email */}
        <TextField
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          label="Email"
          variant="outlined"
          fullWidth
          sx={{
            gridColumn: "span 2",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EmailIcon /> {/* Replace with your desired icon */}
              </InputAdornment>
            ),
          }}
        />
        {/* Password */}
        <FormControl
          variant="outlined"
          error={!!errors.password}
          fullWidth
          sx={{
            gridColumn: "span 2",
          }}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            {...register("password")}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePasswordState}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText>{errors.password?.message}</FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          sx={{
            gridColumn: "span 2",
            // borderRadius: 28,
          }}
        >
          Log In
        </Button>

        <Paper
          sx={{
            gridColumn: "span 2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "50px",
            mt: "10px",
          }}
          elevation={1}
          className="flex items-center space-x-2"
          onClick={() => loginWithGoogle()}
        >
          <FcGoogle />
          <span>Sign In With Google</span>
        </Paper>

        <Typography
          m={2}
          sx={{
            textAlign: "center",
            fontSize: "1rem",
            fontWeight: "medium",
            color: "#333", // Dark gray color for better readability
            "& span": {
              color: "#1E90FF", // Dodger blue color for the link
              fontWeight: "bold",
              textDecoration: "none",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
                color: "#1C86EE", // Slightly darker blue on hover
              },
            },
            gridColumn: "span 2",
          }}
          component="p"
        >
          Don’t have an account? <span onClick={handleSwap}>Register here</span>
        </Typography>
      </Box>
    </form>
  );
};
export default LoginForm;
