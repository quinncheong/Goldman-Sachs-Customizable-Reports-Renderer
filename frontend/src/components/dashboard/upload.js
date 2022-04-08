import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { formatDistanceToNow, subHours, format } from "date-fns";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  CardActions,
  Divider,
  useTheme,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CloudIcon from '@mui/icons-material/Cloud';
import UploadIcon from "@mui/icons-material/Upload";
import FolderIcon from "@mui/icons-material/Folder";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import DisplayExistingData from "./display-existing-data";
import getAllReports from "../../utils/backend-calls";
import { renderFileDownloadButton } from "../../utils/common-components";


export const Upload = ({
  reportTemplates,
  setPageType,
  reportTemplateType,
  setReportTemplateType,
  sendRawJson,
  selectedData,
  selectedTemplateType,
  setSelectedTemplateType,
  ...props
}) => {
  // const [displayExisting, setDisplayExisting] = useState(false);
  
  // const existingData = existingData;

  const changeTemplateType = (event) => {
    setReportTemplateType(event.target.value);
  };

  const pushToGenerator = (e) => {
    setPageType("sheets");
  };

  const handleSelectTemplate = (templateName) => (e) => {
    setSelectedTemplateType(templateName);
  };


  const renderUploadButtons = () => (
    <>
      <Box
        sx={{
          height: 50,
          width: "100%",
          display: "flex",
          marginTop: 2,
        }}
      >
        <Button
          sx={{ mr: 2 }}
          endIcon={<UploadIcon fontSize="large" />}
          variant="contained"
          component="label"
          disabled={!selectedTemplateType}
        >
          <Typography color="" variant="body2">
            Upload JSON
          </Typography>
          <input type="file" onChange={sendRawJson} hidden multiple />
        </Button>

        <Button
          sx={{ mr: 6 }}
          endIcon={<CloudIcon fontSize="large" />}
          variant="contained"
          component="label"
          disabled={!selectedTemplateType}
          onClick={(event) => {setPageType("load")}}
        >
          <Typography color="" variant="body2">
            Load Existing Data
          </Typography>
          {/* <input type="file" onChange={sendRawJson} hidden multiple /> */}
        </Button>
        {renderTemplateSelection()}
      </Box>
    </>
  );

  const renderTemplateSelection = () => {
    if (!selectedTemplateType) {
      return (
        <Typography sx={{ ml: "auto", alignSelf: "center" }} variant="body1">
          Please Select a Report Template
        </Typography>
      );
    }

    return (
      <>
        <Typography sx={{ ml: "auto", alignSelf: "center" }} variant="body1">
          Selected template:
        </Typography>
        <Box
          sx={{
            padding: 1,
            display: "flex",
            width: "20%",
            textAlign: "center",
            borderRadius: 1,
            border: 1,
            borderColor: "secondary.dark",
            ml: 2,
          }}
        >
          {/* <Typography variant="body5">Selected template:</Typography> */}
          <Chip
            sx={{ width: "100%" }}
            color="success"
            label={selectedTemplateType}
            variant="filled"
          />
        </Box>
      </>
    );
  };

  const renderTemplateTypes = () => (
    <>
      <Box
        sx={{
          height: 80,
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        <FormControl required sx={{ m: 1, minWidth: 280 }}>
          <InputLabel
            sx={{
              typography: "body1",
            }}
            focused
            color="primary"
            id="report-select-label"
          >
            Select Report Template:
          </InputLabel>
          <Select
            required
            classes={"sizeLarge"}
            labelId="report-select-label"
            id="report-select"
            value={reportTemplate}
            label="templateType"
            onChange={changeTemplateType}
          >
            <MenuItem value={"Simple"}>Simple</MenuItem>
            <MenuItem value={"Complex"}>Complex</MenuItem>
            <MenuItem value={"Custom"}>Custom</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );

  const renderReportTemplateWrapper = () => {
    const renderReportTemplates = reportTemplates.map((template) => {
      return (
        <Card
          variant="outlined"
          sx={{
            flexShrink: 0,
            width: "150px",
            height: "180px",
            borderRadius: 1,
            boxShadow: 3,
          }}
        >
          <CardContent sx={{ paddingBottom: 0, paddingTop: 2 }}>
            <Typography sx={{ fontSize: 13 }} variant="h6">
              {template.fileName}
            </Typography>
            <Box sx={{ display: "flex" }}>
              {/* <CalendarTodayIcon size="small" sx={{ mr: 1 }} /> */}
              <Typography sx={{ fontSize: 10 }} color="text.secondary">
                {template.lastModified}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button onClick={handleSelectTemplate(template.fileName)} size="small">
              Select
            </Button>
          </CardActions>
        </Card>
      );
    });

    return (
      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "scroll",
          width: "100%",
          paddingBottom: 2,
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
        {renderReportTemplates}
      </Box>
    );
  };

  return (
    <Card {...props}>
      <CardHeader sx={{}} title="Create New Report" />

      <Divider />
      <CardContent sx={{ paddingY: 0 }}>
        <Box
          sx={{
            height: 340,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          {renderReportTemplateWrapper()}
          {renderUploadButtons()}
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button
          onClick={pushToGenerator}
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};

// old Components
// const options = {
//   animation: false,
//   cornerRadius: 20,
//   layout: { padding: 0 },
//   legend: { display: false },
//   maintainAspectRatio: false,
//   responsive: true,
//   xAxes: [
//     {
//       ticks: {
//         fontColor: theme.palette.text.secondary,
//       },
//       gridLines: {
//         display: false,
//         drawBorder: false,
//       },
//     },
//   ],
//   yAxes: [
//     {
//       ticks: {
//         fontColor: theme.palette.text.secondary,
//         beginAtZero: true,
//         min: 0,
//       },
//       gridLines: {
//         borderDash: [2],
//         borderDashOffset: [2],
//         color: theme.palette.divider,
//         drawBorder: false,
//         zeroLineBorderDash: [2],
//         zeroLineBorderDashOffset: [2],
//         zeroLineColor: theme.palette.divider,
//       },
//     },
//   ],
//   tooltips: {
//     backgroundColor: theme.palette.background.paper,
//     bodyFontColor: theme.palette.text.secondary,
//     borderColor: theme.palette.divider,
//     borderWidth: 1,
//     enabled: true,
//     footerFontColor: theme.palette.text.secondary,
//     intersect: false,
//     mode: "index",
//     titleFontColor: theme.palette.text.primary,
//   },
// };
