import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

const DestinationCard = ({ title, description }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const img = await import(`../assets/cities/${title}.jpg`);
        setImage(img.default);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    loadImage();
  }, [title]);

  return (
    <Card
      sx={{ maxWidth: 345, height: 320 }}
    >
      <CardActionArea>
        {image && (
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: 200,
              objectFit: "cover",
            }}
            image={image}
            alt={title}
          />
        )}
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary" }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DestinationCard;
