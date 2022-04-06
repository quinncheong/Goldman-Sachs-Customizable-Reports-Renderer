import React, { useEffect, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import { 
    Box, 
    Container, 
 } from "@mui/material";
import { CustomerListResults } from "../components/customer/customer-list-results";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";
import { ReportStatus } from "../components/dashboard/report-status";
import { AllDataProvider } from "../data/AllDataProvider";
import { RecentReports } from "../components/dashboard/recent-reports";
import { ReportsList } from "../components/reports/reports-list";


const Reports = () => {
    const router = useRouter();
    console.log(router)

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
                {/* <Container maxWidth={false}>
                    <RecentReports sx={{ height: "100%" }} />
                </Container> */}
                <Container maxWidth={false}>
                    <ReportsList sx={{ height: "100%" }}/>
                </Container>
            </Box>
        </>
    )
}

Reports.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Reports;