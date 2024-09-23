import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import NavBar from "../components/NavBar";
import DiningCard from "../components/DiningCard";

const RecommendationDetailsPage = () => {
  const theme = useTheme();
  const isNotMobileScreen = useMediaQuery("(min-width: 1000px)");
  return (
    <>
      <NavBar />
      <div
        className="flex flex-row items-center justify-center w-[85%] mt-6 mx-auto rounded-3xl shadow-lg border"
        style={{
          borderColor: theme.palette.primary.main,
        }}
      >
        <div className="flex-1 flex-col p-6 h-full">
          <div className="p-2">
            <Typography variant="h4">Flight Information</Typography>
          </div>
          <div className="p-2">
            <Typography>
              <span style={{ fontWeight: "bold" }}>Departure</span> : New York
              JFK - 12:00 PM
            </Typography>
          </div>
          <div className="p-2">
            <Typography>
              <span style={{ fontWeight: "bold" }}>Arrival</span> : Paris CDG -
              2:30 AM
            </Typography>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-end p-6 h-full">
          <Button
            variant="contained"
            sx={{
              borderRadius: "18px",
            }}
          >
            <Typography variant="h6">Book Flight</Typography>
          </Button>
        </div>
      </div>
      <div
        className="flex flex-col items-center justify-center w-[85%] mt-6 mb-6 mx-auto rounded-3xl shadow-lg border"
        style={{
          borderColor: theme.palette.primary.main,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            p: 3,
          }}
        >
          Dining Options
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns={
            isNotMobileScreen ? "repeat(3,1fr)" : "repeat(1,1fr)"
          }
          gap="30px"
          sx={{
            m: 3,
          }}
        >
          <DiningCard
            restaurantImage={"/cities/paris.jpg"}
            restaurantName="restaurant 1"
          />
          <DiningCard
            restaurantImage={"/cities/paris.jpg"}
            restaurantName="restaurant 1"
          />
          <DiningCard
            restaurantImage={"/cities/paris.jpg"}
            restaurantName="restaurant 1"
          />
        </Box>
      </div>
      <div
        className="flex flex-col items-center justify-center w-[85%] mt-6 mb-6 mx-auto rounded-3xl shadow-lg border"
        style={{
          borderColor: theme.palette.primary.main,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            p: 3,
          }}
        >
          Attractions and Experiences
        </Typography>
      </div>
    </>
  );
};
export default RecommendationDetailsPage;
