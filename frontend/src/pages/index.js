import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { ReportStatus } from "../components/dashboard/report-status";
import { Upload } from "../components/dashboard/upload";
import { EditExistingReport } from "../components/dashboard/edit-existing-report";
import { RecentReports } from "../components/dashboard/recent-reports";
import { DashboardLayout } from "../components/dashboard-layout";

// Report generation
import { Generator } from "../components/dashboard/generator/generator";

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [pageType, setPageType] = useState("home");

  useEffect(() => {
    // Function to get report stuff
    // getReports();
    // async function getReports() {
    //   let url = "http://something/" + productId;
    //   let config = {};
    //   const response = await myFetch(url);
    //   if (!didCancel) {
    //     // Ignore if we started fetching something else
    //     console.log(response);
    //   }
    // }

    setReports([
      {
        reportID: 1,
        name: "SaaSFinancialPlan.xlsx",
        date: "2 Feb 2022",
        status: "Pending",
        dateCreated: Date.now(),
        dateModified: Date.now(),
      },
      {
        reportID: 2,
        name: "SaaSFinancialPlan2.xlsx",
        date: "2 Feb 2022",
        status: "Completed",
        dateCreated: Date.now(),
        dateModified: Date.now(),
      },
      {
        reportID: 3,
        name: "SaaSFinancialPlan3.xlsx",
        date: "2 Feb 2022",
        status: "Cancelled",
        dateCreated: Date.now(),
        dateModified: Date.now(),
      },
      {
        reportID: 4,
        name: "SaaSFinancialPlan3.xlsx",
        date: "2 Feb 2022",
        status: "Cancelled",
        dateCreated: Date.now(),
        dateModified: Date.now(),
      },
      {
        reportID: 5,
        name: "SaaSFinancialPlan3.xlsx",
        date: "2 Feb 2022",
        status: "Completed",
        dateCreated: Date.now(),
        dateModified: Date.now(),
      },
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard | Material Kit</title>
      </Head>

      {pageType === "home" && (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <Upload setPageType={setPageType} sx={{ height: 500 }} />
              </Grid>
              <Grid item md={6} xs={12}>
                <EditExistingReport reports={reports} sx={{ height: 500 }} />
              </Grid>
              <Grid item xs={12}>
                <RecentReports reports={reports} sx={{ height: "100%" }} />
              </Grid>
              <Grid item xs={12}>
                <ReportStatus reports={reports} sx={{ height: "100%" }} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}

      {
        pageType === "generate" &&
        <Generator />
      }
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
