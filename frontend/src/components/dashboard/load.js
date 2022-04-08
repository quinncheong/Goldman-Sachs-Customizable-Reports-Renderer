import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { 
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  IconButton,
  Grid,
  Typography,
} from "@mui/material";
import { DashboardLayout } from "../dashboard-layout";

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

import axios from "axios";

// Report generation
import { Generator } from "./generator/generator";
import { Sheets } from "./sheets/sheets";
import { DataMapper } from "src/components/dashboard/dataMapper/data-mapper";
import { DisplayExistingData } from "src/components/dashboard/display-existing-data";
import { javaTemplateEndpoint } from "../../config/endpoints";
import { ExistingDataList } from "src/components/data/existing-data-list";

export const Load = ({
  setPageType,
}) => {
  const handleBackClick = () => {
    setPageType("home");
  };

  const router = useRouter();
  console.log(router);

  return (
    <>
      <Head>
        <title>Bulletin by Goldman Sachs</title>
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
            Load Existing Data
          </Typography>
          <ExistingDataList sx={{ height: "100%" }} setPageType={setPageType}/>
        </Container>
      </Box>
    </>
  );
};

// Load.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Load;
