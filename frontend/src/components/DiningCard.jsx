import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";

const DiningCard = ({ restaurantName, restaurantImage,  }) => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: "16px", boxShadow: 3 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="160"
          image={restaurantImage}
          alt={`${restaurantName} restaurant`}
          sx={{
            p: 2,
            borderRadius: "16px",
            objectFit: "cover",
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            color="text.primary"
            sx={{ fontWeight: 'bold' }}
          >
            {restaurantName}
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ mt: 2, width: "100%", borderRadius : "18px" }}
          >
            Book Restaurant
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DiningCard;
