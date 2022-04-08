import React, { useState, useEffect } from "react";
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

export const DataMapper = ({
  setPageType,
  jsonDataTypes,
  compiledSheets,
  compiledRows,
  compiledTables,
  setCompiledSheets,
  setCompiledRows,
  setCompiledTables,
  ...props
}) => {
  const [value, setValue] = useState("1");
  const [consolidatedDataTypes, setConsolidatedDataTypes] = useState([]);
  const [mapperCompiledTables, setMapperCompiledTables] = useState([]);
  const [flatTable, setFlatTable] = useState([]);

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

  useEffect(() => {
    setMapperCompiledTables(compiledTables);
  }, [compiledTables]);

  const handleBackClick = (e) => {
    setPageType("format");
  };

  const handleNextClick = (e) => {
    setPageType("download");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabs = compiledSheets.map((sheet, index) => {
    return <Tab label={sheet.sheetName} value={index} />;
  });

  const renderTabPanels = compiledSheets.map((sheet, sheetIndex) => {
    let tables = [];
    for (const row of sheet.sheetData) {
      for (const table of compiledRows[row]) {
        let tableObj = {
          row,
          table,
        };
        tables.push(tableObj);
      }
    }

    const renderTables = tables.map((tableAndRowDetails, tableIndex) => (
      <Grid item md={6} xs={12} key={tableIndex}>
        <form {...props}>
          <Card sx={{ width: "100%" }}>
            <CardHeader
              sx={{ p: 3 }}
              subheader={`${Object.keys(consolidatedDataTypes).length} data categories found`}
              // title={`row ${tableAndRowDetails.row}`}
              title={`table ${tableAndRowDetails.table}`}
            />
            <Divider />
            <CardContent sx={{ p: 0, height: 500, width: "100%" }}>
              {/* Rows of the data */}
              <GenerateRows
                tableId={tableAndRowDetails.table}
                compiledTables={mapperCompiledTables}
                setCompiledTables={setMapperCompiledTables}
                datapoints={consolidatedDataTypes}
              />
            </CardContent>
          </Card>
        </form>
      </Grid>
    ));

    return (
      <TabPanel value={sheetIndex}>
        <Grid container spacing={6}>
          {renderTables}
        </Grid>
      </TabPanel>
    );
  });

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
                  {renderTabs}
                </TabList>
              </Box>
              {renderTabPanels}
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
