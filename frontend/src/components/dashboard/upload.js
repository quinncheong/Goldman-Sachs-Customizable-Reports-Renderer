import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import FolderIcon from "@mui/icons-material/Folder";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export const Upload = ({
  setPageType,
  reportTemplate,
  setReportTemplate,
  sendRawJson,
  ...props
}) => {
  console.log(reportTemplate);
  const changeTemplateType = (event) => {
    setReportTemplate(event.target.value);
  };

  const pushToGenerator = (e) => {
    setPageType("generate");
  };

  const renderUploadButtons = () => (
    <>
      <Box
        sx={{
          height: 50,
          display: "flex",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <Button endIcon={<UploadIcon fontSize="large" />} variant="contained" component="label">
          <Typography color="" variant="body2">
            Upload JSON
          </Typography>
          <input
            type="file"
            onChange={sendRawJson}
            hidden
            multiple={reportTemplate === "Simple" ? false : true}
          />
        </Button>
      </Box>
    </>
  );

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

  return (
    <Card variant="outlined" {...props}>
      <CardHeader sx={{}} title="Create New Report " />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 280,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          {renderTemplateTypes()}
          {renderUploadButtons()}
          {reportTemplate === "Simple" && (
            <Typography color="error" variant="body2">
              *Only 1 JSON file can be uploaded for Simple Templates
            </Typography>
          )}
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
