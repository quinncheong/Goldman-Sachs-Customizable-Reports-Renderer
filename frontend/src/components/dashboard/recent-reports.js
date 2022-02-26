import { formatDistanceToNow, subHours } from "date-fns";
import { v4 as uuid } from "uuid";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Clock as ClockIcon } from "src/icons/clock";
import { Download as DownloadIcon } from "src/icons/download";

export const RecentReports = ({ reports = [], ...props }) => {
  const renderReports = reports.map((report) => {
    return (
      <Card
      variant="outlined"
        sx={{
          flexShrink: 0,
          maxWidth: 345,
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
        <CardMedia
          style={{ height: "180px", paddingTop: "2%" }}
          component="img"
          // height="140"
          image="/static/images/excel.jpg"
          alt="Excel Template"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {report.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {report.date}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  });

  return (
    <Card {...props}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }} aria-label="recipe">
            <ClockIcon color="primary.main" />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <Typography sx={{ mr: 1 }} color="primary.main">
              View all
            </Typography>
            <ArrowForwardIosIcon color="primary.main" />
          </IconButton>
        }
        // subtitle={`${products.length} in total`}
        title="Recent Reports"
      />
      <Divider />
      <CardContent
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "scroll",
        }}
      >
        {renderReports}
      </CardContent>
    </Card>
  );
};
