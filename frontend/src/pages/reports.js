import React, { useEffect, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Container } from "@mui/material";
import { CustomerListResults } from "../components/customer/customer-list-results";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";
import { ReportStatus } from "../components/dashboard/report-status";
import { ShowReports } from "../data/reports";

const Reports = () => {
    const router = useRouter();
    console.log(router)

    return (
        <>
            <Head>
                <title>Report Status</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth={false}>
                    <ShowReports />
                </Container>
            </Box>
        </>
    )
}

Reports.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Reports;