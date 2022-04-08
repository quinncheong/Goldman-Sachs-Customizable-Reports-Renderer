import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { Box, Button, Container, Divider, Grid, Typography, IconButton } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { FormatElementTile } from "./format-element-tile";

export const ReportFormat = ({
  setPageType,
  sheets,
  sheetsDetails,
  compiledTables,
  setCompiledTables,
  compiledRows,
  setCompiledRows,
  compiledSheets,
  setCompiledSheets,
  ...props
}) => {
  const router = useRouter();

  const handleBackClick = () => {
    setPageType("sheets");
  };

  console.log(sheetsDetails);

  return (
    <>
      <Head>
        <title>Report Formatting</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "start",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
          marginTop: "30px",
        }}
      >
        <Container maxWidth={false}>
          <Typography sx={{ mb: 3 }} variant="h4">
            <IconButton onClick={handleBackClick} sx={{ ml: 1 }}>
              <ArrowLeftIcon size="lg" />
            </IconButton>
            Format Report
          </Typography>
          <Box
            sx={{
              alignItems: "start",
              display: "flex",
              flexGrow: 1,
              minHeight: "100%",
              backgroundColor: "neutral.200",
              borderRadius: 2,
              p: 2,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    px: 2,
                    alignItems: "left",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          px: 2,
                          alignItems: "left",
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography variant="h1">Filename</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <FormatElementTile
                        sheets={sheets}
                        sheetsDetails={sheetsDetails}
                        currentSheet={currentSheet}
                        setCurrentSheet={setCurrentSheet}
                        setPageType={setPageType}
                        compiledTables={compiledTables}
                        setCompiledTables={setCompiledTables}
                        compiledRows={compiledRows}
                        setCompiledRows={setCompiledRows}
                        compiledSheets={compiledSheets}
                        setCompiledSheets={setCompiledSheets}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

// export default ReportFormat;
