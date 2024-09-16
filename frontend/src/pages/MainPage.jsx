import { Button, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/travel-logo.png";
import mainImage from "../assets/travel-main.jpg";
import MainCard from "../components/MainCard";

const MainPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center">
      <nav
        className="flex items-center w-[95%] h-14 mt-3 rounded-full shadow-lg px-4"
        style={{ backgroundColor: theme.palette.primary.default }}
      >
        <img
          src={logo}
          alt="AI Travel App Icon"
          className="h-10 w-10 ml-2"
        />

        <Typography
          variant="h4"
          sx={{
            ml: 2,
            fontWeight: "bold",
            letterSpacing: "0.05em",
            color: theme.palette.primary.main,
          }}
        >
          AI Travel App
        </Typography>

        <span style={{ flex: "auto" }}></span>

        <Button
          variant="contained"
          sx={{
            borderRadius: "18px",
          }}
          onClick={() => navigate("/login")}
        >
          Get Started
        </Button>
      </nav>

      <div className="relative flex flex-col items-center justify-center w-[85%] mt-6">
        <img
          src={mainImage}
          className="rounded-lg w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Typography
            variant="h2"
            className="text-white text-4xl font-bold text-center"
          >
            Explore Personalized Travel Suggestions
          </Typography>
        </div>
        <div className="w-[85%] -mt-10 rounded-lg">
          <MainCard />
        </div>
      </div>
    </div>
  );
};
export default MainPage;
