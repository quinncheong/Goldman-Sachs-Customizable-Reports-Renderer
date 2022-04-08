import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Container,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Download } from "./download.js";

export const SimpleFlow = ({ setPageType, jsonData }) => {

  const handleBackClick = () => {
    setPageType("home");
  };

  const router = useRouter();
  console.log(router);

  const downloadReports = () => {
    console.log("Files Downloading");
    
  }

  const downloadModal = () => {
    return (
      <Button onClick ={downloadReports}>Download</Button>
    );
  }

  return (
    <>
      <Head>
        <title>Bulk Create</title>
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
            Bulk Create
          </Typography>
        </Container>

        <Container maxWidth={false}>
          {downloadModal()}
        </Container>
      </Box>

    </>
  );
};
