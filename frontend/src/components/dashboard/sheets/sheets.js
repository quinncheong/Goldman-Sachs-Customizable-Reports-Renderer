import React, { useState } from "react";
import Head from "next/head";
import {
  Avatar,
  Box,
  Button,
  Container,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SaveIcon from "@mui/icons-material/Save";

export const Sheets = ({ setPageType, jsonData, ...props }) => {
  const [sheets, setSheets] = useState(0);
  const [sheetsDetails, setSheetsDetails] = useState({});
  const [hasSaved, setHasSaved] = useState(false);

  const handleBackClick = () => {
    setPageType("home");
  };

  const handleChangeSheetNo = (e) => {
    const sheetNo = e.target.value;
    let tempSheetDetails = {};
    for (let i = 0; i < sheetNo; i++) {
      tempSheetDetails[i] = "";
    }

    setSheets(sheetNo);
    setSheetsDetails(tempSheetDetails);
  };

  const handleSave = (e) => {
    if (sheets <= 0) {
      alert("Please enter a valid number of sheets.");
      return;
    }
    setHasSaved(!hasSaved);
  };

  const renderSheetSelector = () => {
    let dynamicHeight = 200;
    if (hasSaved) {
      dynamicHeight = 650;
    }
    return (
      <Card sx={{ width: 600, height: dynamicHeight, marginTop: "30px" }} {...props}>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography color="textPrimary" gutterBottom variant="h5">
              {"Select the number of sheets for your report"}
            </Typography>

            <Box sx={{ display: "flex" }}>
              <TextField
                sx={{ marginTop: 1 }}
                id="standard-number"
                label="Number"
                type="number"
                value={sheets}
                InputLabelProps={{
                  shrink: true,
                }}
                variant={!hasSaved ? "filled" : "outlined"}
                disabled={hasSaved}
                onChange={handleChangeSheetNo}
                required
              />

              <Button
                endIcon={<SaveIcon />}
                sx={{ display: "flex", ml: "auto", mt: 1, ml: 3 }}
                color={!hasSaved ? "primary" : "warning"}
                variant="contained"
                onClick={handleSave}
              >
                {!hasSaved ? "Save" : "Undo"}
              </Button>

              <Divider />
            </Box>

            {hasSaved && showSheetNaming()}
          </Box>
        </CardContent>
        {hasSaved && <Divider />}
        {hasSaved && (
          <CardActions>
            <Button
              endIcon={<ArrowForwardIosIcon />}
              sx={{ display: "flex", m: "auto", mt: 1 }}
              color="primary"
              variant="contained"
              onClick={(e) => setPageType("generate")}
            >
              Next
            </Button>
          </CardActions>
        )}
      </Card>
    );
  };
  const showSheetNaming = () => {
    return (
      <Box sx={{ width: "80%" }} mt={2}>
        <Typography variant="h6">Sheet Naming</Typography>
        <Divider />
        <Box mt={2}>
          <Typography variant="body1">Enter the name of the sheet you want to use.</Typography>
        </Box>
        <Box
          sx={{
            overflowY: "scroll",
            height: "300px",
            paddingBottom: 2,
            "&::-webkit-scrollbar": {
              width: "14px",
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
          mt={2}
        >
          {renderSheetNames()}
        </Box>
      </Box>
    );
  };

  const renderSheetNames = () => {
    console.log(sheetsDetails);
    return Object.keys(sheetsDetails).map((sheetIndex, index) => {
      return (
        <Box sx={{ display: "flex", mt: 2 }}>
          <Typography sx={{ m: 1 }} nowrap variant="body1">
            Sheet {Number(sheetIndex) + 1}:
          </Typography>
          <TextField
            sx={{ width: "80%" }}
            key={index}
            id="sheet-name"
            label="Sheet Name"
            variant="outlined"
            size="small"
            onChange={handleSheetNameSetting(sheetIndex)}
          />
        </Box>
      );
    });
  };

  const handleSheetNameSetting = (sheetIndex) => (e) => {
    let tempSheetDetails = { ...sheetsDetails };
    tempSheetDetails[sheetIndex] = e.target.value;
    setSheetsDetails(tempSheetDetails);
  };

  return (
    <>
      <Head>
        <title>Sheets | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            <IconButton onClick={handleBackClick} sx={{ ml: 1 }}>
              <ArrowLeftIcon size="lg" />
            </IconButton>
            Sheets Selection
          </Typography>
          <Grid sx={{ justifyContent: "center" }} container spacing={3}>
            {renderSheetSelector()}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

// Account.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Sheets;
