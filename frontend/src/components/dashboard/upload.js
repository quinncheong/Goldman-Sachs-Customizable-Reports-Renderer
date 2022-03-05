import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Box,
  Button,
  Input,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  Typography,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import FolderIcon from "@mui/icons-material/Folder";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export const Upload = ({ setPageType, ...props }) => {
  const [file, setfile] = useState("");
  const theme = useTheme();
  const router = useRouter();

  const data = {
    datasets: [
      {
        backgroundColor: "#3F51B5",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [18, 5, 19, 27, 29, 19, 20],
        label: "This year",
        maxBarThickness: 10,
      },
      {
        backgroundColor: "#EEEEEE",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [11, 20, 12, 29, 30, 25, 13],
        label: "Last year",
        maxBarThickness: 10,
      },
    ],
    labels: ["1 Aug", "2 Aug", "3 Aug", "4 Aug", "5 Aug", "6 Aug", "7 aug"],
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    console.dir(e.target);
    console.log(file);
    const fileReader = new FileReader();
    // console.log(fileReader);
    const endpoint = "http://localhost:5000/create";
    // fileReader.onloadend = () => {
    //   // console.log(fileReader);
    //   try {
    //     let reqData = JSON.parse(fileReader.result);
    //     axios.post(endpoint, reqData.body["SIMPLE_REPORT"].rows).then((res) => {
    //       // console.log(res.data);
    //     });
    //   } catch (e) {
    //     // Input some error message here
    //     // setErrorData("**Not valid JSON file!**");
    //   }
    // };
    // if (file !== undefined) fileReader.readAsText(file);
  };

  const pushToGenerator = (e) => {
    console.log(router);
    setPageType("generate");
  };

  return (
    <Card variant="outlined" {...props}>
      <CardHeader sx={{ fontSize: "600px" }} title="Create New Report " />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 280,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
          }}
        >
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
              <input type="file" onChange={handleChange} hidden multiple />
            </Button>
            <Button
              color="primary"
              endIcon={<FolderIcon fontSize="large" />}
              variant="outlined"
              size="large"
            >
              <Typography color="" variant="body2">
                Load File
              </Typography>
            </Button>
            <Button
              color="primary"
              endIcon={<TextFormatIcon fontSize="large" />}
              variant="outlined"
              size="large"
            >
              <Typography color="" variant="body2">
                Input Text
              </Typography>
            </Button>
          </Box>
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
