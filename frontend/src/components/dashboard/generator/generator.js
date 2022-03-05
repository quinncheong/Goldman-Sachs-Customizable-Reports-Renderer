import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Container, Typography, Grid, IconButton } from "@mui/material";
// import { DashboardLayout } from "../../dashboard-layout";
import { SettingsNotifications } from "./settings-notifications";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

export const Generator = () => {
  const [data, setData] = useState({
    1: {
      reportID: 1,
      name: "SaaSFinancialPlan.xlsx",
      date: "2 Feb 2022",
      status: "Pending",
      dateCreated: Date.now(),
      dateModified: Date.now(),
    },
    2: {
      reportID: 2,
      name: "SaaSFinancialPlan2.xlsx",
      date: "2 Feb 2022",
      status: "Completed",
      dateCreated: Date.now(),
      dateModified: Date.now(),
    },
    3: {
      reportID: 3,
      name: "SaaSFinancialPlan3.xlsx",
      date: "2 Feb 2022",
      status: "Cancelled",
      dateCreated: Date.now(),
      dateModified: Date.now(),
    },
  });

  const renderData = Object.keys(data).map((dataID) => (
    <Grid item md={6} xs={12}>
      <SettingsNotifications data={data[dataID]} />
    </Grid>
  ));

  return (
    <>
      <Head>
        <title>
          {" "}
          <IconButton sx={{ ml: 1 }}>
            <ArrowLeftIcon />
          </IconButton>
          Generate Report
        </title>
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
            Generate Report
          </Typography>

          {/* <Box sx={{ pt: 3 }}>
            <SettingsPassword />
          </Box> */}
          <Grid container spacing={3}>
            {renderData}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

// Generator.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
