import { formatDistanceToNow, subHours, format } from "date-fns";
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
import CalendarTodayIcon from "@mui/icons-material/Today";
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
          <Box sx={{ display: "flex" }}>
            <CalendarTodayIcon size="small" sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {format(report.dateModified, "dd/MM/yyyy")}
            </Typography>
          </Box>
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
          "&::-webkit-scrollbar": {
            width: "0.2em",
            height: "14px",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            "border-radius": "8px",
            border: "4px solid rgba(0, 0, 0, 0)",
            "background-color": "rgba(94, 94, 94, 0.51)",
            "background-clip": "padding-box",
          },
        }}
      >
        {renderReports}
      </CardContent>
    </Card>
  );
};
