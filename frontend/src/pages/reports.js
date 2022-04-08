import React, { useEffect, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { ReportsList } from "../components/reports/reports-list";
import { getAllReports } from "../utils/backend-calls";

const Reports = () => {
  const router = useRouter();
  console.log(router);
  
  const [reports, setReports] = useState([]);
  // retrieve reports
  useEffect(() => {
    const retrieveReports = async () => {
      try {
        const fileType = "xlsx";
        let reports = await getAllReports(fileType);
        setReports(reports);
      } catch {
        // Mock reports data on failure
        setReports([
          {
            reportID: 1,
            fileName: "SaaSFinancialPlan.xlsx",
            date: "2 Feb 2022",
            status: "Pending",
            dateCreated: Date.now(),
            lastModified: Date.now(),
          },
        ]);
      }
    };

    retrieveReports();
  }, []);

  return (
    <>
      <Head>
        <title>Past Reports</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ReportsList reports={reports}/>
        </Container>
      </Box>
    </>
  );
};

Reports.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Reports;
