import { yupResolver } from "@hookform/resolvers/yup";
import EmailIcon from "@mui/icons-material/Email";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
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
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import api from "../services/api";
const schema = yup
  .object({
    firstName: yup.string().required("Please Provide your First Name"),
    lastName: yup.string().required("Please provide your Last Name"),
    email: yup
      .string("Please provide a valid email address")
      .required("Please provide your email address"),
    password: yup
      .string()
      // .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  })
  .required();

const RegisterForm = ({ formType, handleSwap, registerToast }) => {
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

  const registerUser = async (data) => {
    delete data["passwordConfirmation"];
    console.log("data", data);
    try {
      const response = await api.post("/auth/register/", {
        firstName: data["firstName"],
        lastName: data["lastName"],
        email: data["email"],
        password: data["password"],
      });

      console.log("register response : ", response);
      registerToast();
    } catch (error) {
      console.log("error registering user : ", error);
    }
  };
  return (
    <form
      className="w-full h-full flex flex-col justify-center items-center p-4"
      onSubmit={handleSubmit(registerUser)}
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

        {/* First Name */}
        <TextField
          {...register("firstName")}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          label="First Name"
          variant="outlined"
          className="rounded-lg"
          fullWidth
          sx={{
            gridColumn: isNonMobileScreen ? null : "span 2",
          }}
          InputProps={{
            endAdornment: (
              <PermIdentityIcon position="end">
                <EmailIcon /> {/* Replace with your desired icon */}
              </PermIdentityIcon>
            ),
          }}
        />

        {/* Last Name */}
        <TextField
          {...register("lastName")}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          label="Last Name"
          variant="outlined"
          fullWidth
          sx={{
            gridColumn: isNonMobileScreen ? null : "span 2",
          }}
          InputProps={{
            endAdornment: (
              <PermIdentityIcon position="end">
                <EmailIcon /> {/* Replace with your desired icon */}
              </PermIdentityIcon>
            ),
          }}
        />

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

        {/* Confirm Password */}
        <FormControl
          variant="outlined"
          error={!!errors.passwordConfirmation}
          fullWidth
          sx={{
            gridColumn: "span 2",
          }}
        >
          <InputLabel htmlFor="outlined-adornment-confirm-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            {...register("passwordConfirmation")}
            id="outlined-adornment-confirm-password"
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
            label="Confirm Password"
          />
          <FormHelperText>
            {errors.passwordConfirmation?.message}
          </FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          sx={{
            gridColumn: "span 2",
            // borderRadius: 28,
          }}
        >
          Register
        </Button>

        <Typography
          m={2}
          sx={{
            textAlign: "center",
            fontSize: "1rem",
            fontWeight: "medium",
            color: "#333", 
            "& span": {
              color: "#1E90FF", 
              fontWeight: "bold",
              textDecoration: "none",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
                color: "#1C86EE", 
              },
            },
            gridColumn: "span 2",
          }}
          component="p"
        >
          Already have an account?
          <span onClick={handleSwap}> Sign In</span>
        </Typography>
      </Box>
    </form>
  );
};
export default RegisterForm;
