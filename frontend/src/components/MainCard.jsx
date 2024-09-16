import { Typography, useTheme } from "@mui/material";

const MainCard = () => {
  const theme = useTheme();
  return (
    <div
      className="flex flex-row items-center justify-center rounded-lg w-full border"
      style={{
        backgroundColor: theme.palette.background.default,
        borderColor: theme.palette.primary.main,
      }}
    >
      <div
        className="flex-1 items-center justify-center text-center h-20 border"
        style={{
          borderRight: "0px solid black",
        }}
      >
        <div className="flex flex-col">
          <Typography variant="h6">Find your next</Typography>
          <Typography
            variant="h6"
            className="bold"
          >
            Paris
          </Typography>
        </div>
      </div>
      <div className="flex-1 items-center justify-center text-center h-20 border p-6">
        Hello
      </div>
      <div className="flex-1 items-center justify-center text-center h-20 border p-6">
        Hello
      </div>
      <div className="flex-1 items-center justify-center text-center h-20 border p-6">
        Hello
      </div>
    </div>
  );
};
export default MainCard;
