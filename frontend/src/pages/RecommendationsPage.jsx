import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import NavBar from "../components/NavBar";
import RecommendationCard from "../components/RecommendationCard";
import data from "../data/destinations.json";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecommendationsPage = () => {
  const theme = useTheme();
  const isNotMobileScreen = useMediaQuery("(min-width: 1000px)");
  const cities = data.map((destination) => destination.title);
  const navigate = useNavigate();

  const [label, setLabel] = useState("");

  const handleChange = (event) => {
    setLabel(event.target.value);
  };

  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };
  const labelStrings = Object.entries(labels).map(([key, value]) => value);

  return (
    <>
      <NavBar />
      <div
        className="flex flex-col items-center justify-center mt-6 mb-10 p-6 drop-shadow-lg rounded-lg w-[85%] mx-auto"
        style={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography
          variant="h2"
          style={{
            color: theme.palette.text.primary,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Discover your travel options
        </Typography>
        <Typography
          sx={{
            mt: 3,
            textAlign: "center",
          }}
        >
          Select your preferences to get personalized recommendations
        </Typography>
        <div className="flex flex-col items-center justify-center mt-6 mb-6 w-[75%] rounded-lg shadow-lg border">
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mt: 3,
              textAlign: "center",
            }}
          >
            Your Personalized Plan
          </Typography>
          <form className="w-full">
            <Box
              display="grid"
              gridTemplateColumns="repeat(2,1fr)"
              gap="30px"
              sx={{
                mt: 3,
                mb: 3,
                width: "100%",
                p: 3,
              }}
            >
              <Autocomplete
                freeSolo
                disableClearable
                options={cities}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                  },
                  gridColumn: isNotMobileScreen ? null : "span 2",
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Origin"
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        type: "search",
                      },
                    }}
                  />
                )}
              />
              <Autocomplete
                freeSolo
                disableClearable
                options={cities}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                  },
                  gridColumn: isNotMobileScreen ? null : "span 2",
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Destination"
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        type: "search",
                      },
                    }}
                  />
                )}
              />
              <TextField
                label="Adults"
                type="number"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                  },
                  gridColumn: !isNotMobileScreen && "span 2",
                }}
              />
              <TextField
                label="Budget"
                type="number"
                slotProps={{
                  input: {
                    startAdornment: (
                      <AttachMoneyIcon position="start">$</AttachMoneyIcon>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                  },
                  gridColumn: !isNotMobileScreen && "span 2",
                }}
              />
              <TextField
                placeholder="Tell us about your preferences"
                multiline
                fullWidth
                rows={4}
                maxRows={4}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                  },
                  gridColumn: "span 2",
                }}
              />{" "}
              <Button
                variant="contained"
                sx={{
                  borderRadius: "18px",
                  gridColumn: "span 2",
                }}
              >
                <Typography>Generate My plan</Typography>
              </Button>
            </Box>
          </form>
        </div>
      </div>
      <div
        className="flex flex-col  mt-6 mb-10 p-6 drop-shadow-lg rounded-lg w-[85%] mx-auto border"
        style={{
          backgroundColor: theme.palette.background.default,
          borderColor: theme.palette.primary.main,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 2,
          }}
        >
          Your Recommendations
        </Typography>
        <div className="w-full px-2 mb-3 flex justify-between items-center">
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
            }}
          >
            Showing 100 results
          </Typography>

          <div className="flex items-center">
            <FormControl
              sx={{
                width: isNotMobileScreen ? 180 : 120,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "30px",
                },
              }}
              size="small"
            >
              <InputLabel id="demo-select-small-label">Sort By</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={label}
                label="Sort By"
                onChange={handleChange}
              >
                {labelStrings.map((label, id) => (
                  <MenuItem
                    key={id}
                    value={label}
                  >
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <Box
          display="grid"
          gridTemplateColumns={
            isNotMobileScreen ? "repeat(3,1fr)" : "repeat(1,1fr)"
          }
          gap="30px"
        >
          <RecommendationCard
            cityName="Paris"
            userRating={2}
            labels={labels}
            onClick={() => navigate(`/recommendations/111`)}
          />
          <RecommendationCard
            cityName="London"
            userRating={2}
            labels={labels}
          />
          <RecommendationCard
            cityName="Paris"
            userRating={2}
            labels={labels}
          />
          <RecommendationCard
            cityName="Paris"
            userRating={2}
            labels={labels}
          />
          <RecommendationCard
            cityName="Paris"
            userRating={5}
            labels={labels}
          />
        </Box>
      </div>
    </>
  );
};
export default RecommendationsPage;
