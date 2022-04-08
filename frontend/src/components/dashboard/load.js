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
import UploadIcon from "@mui/icons-material/Upload";

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

import axios from "axios";

// Report generation
import { Generator } from "./generator/generator";
import { Sheets } from "./sheets/sheets";
import { DataMapper } from "src/components/dashboard/dataMapper/data-mapper";
import { DisplayExistingData } from "src/components/dashboard/display-existing-data";
import { javaTemplateEndpoint } from "../../config/endpoints";
import { ExistingDataList } from "src/components/dashboard/data/existing-data-list";
import { UploadNewData } from "src/components/dashboard/data/upload-new-data";

export const Load = ({
  storedData,
  setPageType,
  sendRawJson,
  project,
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
            Load Data
          </Typography>
          <Box sx={{ display: 'flex', mb: 2}}>
            <UploadNewData sendRawJson={sendRawJson}/>
          </Box>
          <ExistingDataList sx={{ height: "100%" }} storedData={storedData} setPageType={setPageType} project={project}/>
        </Container>
      </Box>
    </>
  );
};

// Load.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Load;
