import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Box,
  Container,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  Grid,
  IconButton,
  Button,
  Tab,
} from "@mui/material";
// import { DashboardLayout } from "../../dashboard-layout";
import { GenerateRows } from "./generate-rows";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export const DataMapper = ({ setPageType, jsonDataTypes, ...props }) => {
  const [value, setValue] = useState("1");
  const [consolidatedDataTypes, setConsolidatedDataTypes] = useState([]);

  useEffect(() => {
    let newConsolidatedClone = [];
    for (const [filename, rowsPlaceholder] of Object.entries(jsonDataTypes)) {
      for (const [fieldName, rowDetails] of Object.entries(rowsPlaceholder.rows)) {
        newConsolidatedClone.push({
          filename,
          fieldName,
          dataType: rowDetails.datatype,
          rowCount: rowDetails.row_count,
          sum: false,
        });
      }
    }
    console.log(newConsolidatedClone);
    setConsolidatedDataTypes(newConsolidatedClone);
  }, [jsonDataTypes]);

  const handleBackClick = (e) => {
    setPageType("format");
  };

  const handleNextClick = (e) => {
    setPageType("sheets");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderData = [1, 2, 3, 4, 5].map((sheet, index) => (
    <Grid item md={6} xs={12} key={index}>
      <form {...props}>
        <Card sx={{ width: "100%" }}>
          <CardHeader
            sx={{ p: 3 }}
            subheader={`${Object.keys(consolidatedDataTypes).length} data categories found`}
            title={sheet}
          />
          <Divider />
          <CardContent sx={{ p: 0, height: 500, width: "100%" }}>
            {/* Rows of the data */}
            <GenerateRows datapoints={consolidatedDataTypes} />
          </CardContent>
        </Card>
      </form>
    </Grid>
  ));

  const renderTabPanels = () => {
    return <TabPanel value="2">Item Two</TabPanel>;
  };

  return (
    <>
      <Head>
        <title> Select Data Relationship </title>
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
            Select Data Relationship
          </Typography>

          {/* <Box sx={{ pt: 3 }}>
            <SettingsPassword />
          </Box> */}
          {/* <Grid container spacing={3}>
            {renderData}
          </Grid> */}

          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Item One" value="1" />
                  <Tab label="Item Two" value="2" />
                  <Tab label="Item Three" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">Item One</TabPanel>
              <TabPanel value="2">Item Two</TabPanel>
              <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
          </Box>

          <Button
            endIcon={<ArrowForwardIosIcon />}
            sx={{ display: "flex", ml: "auto", mt: 1 }}
            color="primary"
            variant="contained"
            onClick={handleNextClick}
          >
            Next
          </Button>
        </Container>
      </Box>
    </>
  );
};

// Generator.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
