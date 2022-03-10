import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Box, Container, Typography, Grid, IconButton, Button } from "@mui/material";
// import { DashboardLayout } from "../../dashboard-layout";
import { GenerateRows } from "./generate-rows";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export const Generator = ({ setPageType, jsonData, ...props }) => {
  const router = useRouter();
  const renderData = Object.keys(jsonData).map((name, index) => (
    <Grid item md={6} xs={12} key={index}>
      <GenerateRows jsonName={name} data={jsonData[name].parsedData.rows} />
    </Grid>
  ));

  const handleBackClick = () => {
    setPageType("home");
  };

  const handleNextClick = () => {

   }

  return (
    <>
      <Head>
        <title> Generate Report</title>
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
            Generate Report
          </Typography>

          {/* <Box sx={{ pt: 3 }}>
            <SettingsPassword />
          </Box> */}
          <Grid container spacing={3}>
            {renderData}
          </Grid>
          <Button
            endIcon={<ArrowForwardIosIcon />}
            sx={{ display: "flex", ml: "auto", mt: 1 }}
            color="primary"
            variant="contained"
            onClick={(e) => setPageType("sheets")}
          >
            Next
          </Button>
        </Container>
      </Box>
    </>
  );
};

// Generator.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
