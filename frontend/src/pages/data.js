import React, { useEffect, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { DataList } from "../components/data/data-list";
import { getAllReports } from "../utils/backend-calls";

const Data = () => {
  const router = useRouter();
  console.log(router);

  const [storedData, setStoredData] = useState([]);
  // retrieve storedData
  const retrieveStoredData = async () => {
    try {
      const fileType = "json";
      let newStoredData = await getAllReports(fileType);
      setStoredData(newStoredData);
    } catch {
      setStoredData({});
    }
  }

  useEffect(() => {
    retrieveStoredData();
  }, [])

  return (
    <>
      <Head>
        <title>Data Files</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <DataList sx={{ height: "100%" }} storedData={storedData}/>
        </Container>
      </Box>
    </>
  );
};

Data.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Data;
