import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Card, Container, Grid } from "@mui/material";
import { ReportStatus } from "../components/dashboard/report-status";
import { Upload } from "../components/dashboard/upload";
import { EditExistingReport } from "../components/dashboard/edit-existing-report";
import { RecentReports } from "../components/dashboard/recent-reports";
import { DashboardLayout } from "../components/dashboard-layout";

import axios from "axios";

// Report generation
import { Generator } from "../components/dashboard/generator/generator";
import { Sheets } from "../components/dashboard/sheets/sheets";
import { ReportFormat } from "../components/dashboard/format/format";
import { DataMapper } from "src/components/dashboard/dataMapper/data-mapper";
import { Load } from "../components/dashboard/load";
import { SelectProjects } from "../components/dashboard/select-project";
import { DisplayExistingData } from "src/components/dashboard/display-existing-data";
import { javaTemplateEndpoint } from "../config/endpoints";

// Backend Connector Functions
import { getAllProjects, getAllReports, getAllTemplates, uploadData } from "../utils/backend-calls";

const Dashboard = () => {
  const [pageType, setPageType] = useState("home");
  const [reports, setReports] = useState([]);
  const [project, setProject] = useState(1);
  const [allProjects, setAllProjects] = useState([]);
  const [storedData, setStoredData] = useState(null);

  const [reportTemplateType, setReportTemplateType] = useState("Simple");
  const [reportTemplates, setReportTemplates] = useState([]);
  const [selectedTemplateType, setSelectedTemplateType] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const [sheets, setSheets] = useState(0);
  const [sheetsDetails, setSheetsDetails] = useState({});
  const [sheetHasSaved, setSheetHasSaved] = useState(false);

  const [jsonData, setJsonData] = useState({
    Simple: {
      rawData: require("../../../data/simple.json"),
      parsedData: {
        rows: {
          instrumentType: {
            datatype: "str",
            row_count: 18,
          },
          ticker: {
            datatype: "str",
            row_count: 18,
          },
          coupon: {
            datatype: "int",
            row_count: 18,
          },
          originalFace: {
            datatype: "float",
            row_count: 18,
          },
          marketValue: {
            datatype: "float",
            row_count: 18,
          },
          ISIN: {
            datatype: "str",
            row_count: 18,
          },
          portfolio: {
            datatype: "str",
            row_count: 18,
          },
          maturityDate: {
            datatype: "str",
            row_count: 18,
          },
          price: {
            datatype: "int",
            row_count: 18,
          },
          positionDate: {
            datatype: "str",
            row_count: 18,
          },
          currentFace: {
            datatype: "float",
            row_count: 18,
          },
          currency: {
            datatype: "str",
            row_count: 18,
          },
          contractCode: {
            datatype: "str",
            row_count: 18,
          },
        },
      },
    },
    Simple2: {
      rawData: require("../../../data/simple.json"),
      parsedData: {
        rows: {
          instrumentType: {
            datatype: "str",
            row_count: 18,
          },
          ticker: {
            datatype: "str",
            row_count: 18,
          },
          coupon: {
            datatype: "int",
            row_count: 18,
          },
          originalFace: {
            datatype: "float",
            row_count: 18,
          },
          marketValue: {
            datatype: "float",
            row_count: 18,
          },
          ISIN: {
            datatype: "str",
            row_count: 18,
          },
          portfolio: {
            datatype: "str",
            row_count: 18,
          },
          maturityDate: {
            datatype: "str",
            row_count: 18,
          },
          price: {
            datatype: "int",
            row_count: 18,
          },
          positionDate: {
            datatype: "str",
            row_count: 18,
          },
          currentFace: {
            datatype: "float",
            row_count: 18,
          },
          currency: {
            datatype: "str",
            row_count: 18,
          },
          contractCode: {
            datatype: "str",
            row_count: 18,
          },
        },
      },
    },
    Simple3: {
      rawData: require("../../../data/simple.json"),
      parsedData: {
        rows: {
          instrumentType: {
            datatype: "str",
            row_count: 18,
          },
          ticker: {
            datatype: "str",
            row_count: 18,
          },
          coupon: {
            datatype: "int",
            row_count: 18,
          },
          originalFace: {
            datatype: "float",
            row_count: 18,
          },
          marketValue: {
            datatype: "float",
            row_count: 18,
          },
          ISIN: {
            datatype: "str",
            row_count: 18,
          },
          portfolio: {
            datatype: "str",
            row_count: 18,
          },
          maturityDate: {
            datatype: "str",
            row_count: 18,
          },
          price: {
            datatype: "int",
            row_count: 18,
          },
          positionDate: {
            datatype: "str",
            row_count: 18,
          },
          currentFace: {
            datatype: "float",
            row_count: 18,
          },
          currency: {
            datatype: "str",
            row_count: 18,
          },
          contractCode: {
            datatype: "str",
            row_count: 18,
          },
        },
      },
    },
  });

  // retrieve projects
  const retrieveProjects = async () => {
    try {
      let newProjects = await getAllProjects();
      setAllProjects(newProjects);
    } catch {
      setAllProjects([]);
    }
  }

  useEffect(() => {
    retrieveProjects();
  }, [setProject])

  // retrieve storedData
  const retrieveStoredData = async () => {
    try {
      const fileType = "json";
      let newStoredData = await getAllReports(fileType);
      console.log(newStoredData);
      setStoredData(newStoredData);
    } catch {
      setStoredData({});
    }
  }

  useEffect(() => {
    retrieveStoredData();
  }, [project])

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
  }, [setProject]);

  // retrieve templates
  useEffect(() => {
    const retrieveTemplates = async () => {
      try {
        let templates = await getAllTemplates();
        setReportTemplates(templates);
      } catch {
        // Mock reports data on failure
        setReportTemplates([
          {
            reportTemplateID: 1,
            fileName: "Bulk Create",
            date: "2 Feb 2022",
            dateCreated: Date.now(),
            lastModified: Date.now(),
          },
        ]);
      }
    };

    retrieveTemplates();
  }, []);

  const sendRawJson = async (e) => {
    const files = e.target.files;
    const promises = [];
    let jsonObject = {};
    let metadataObject = {
      project: project,
      reportTemplateType,
      files: [],
    };

    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        promises.push(
          new Promise((resolve) => {
            const reader = new FileReader();
            const file = files[i];
            reader.readAsBinaryString(file);
            reader.onloadend = async (loadendEvent) => {
              let parsedJson = JSON.parse(reader.result).body;
              let mainJsonBody = parsedJson[Object.keys(parsedJson)[0]];
              jsonObject[file.name] = mainJsonBody;
              metadataObject.files.push(file.name);
              resolve();
            };
          })
        );
      }
    }

    Promise.all(promises).then(() => {
      let reqBean = {
        metadata: metadataObject,
        data: jsonObject,
      };

      uploadData(reqBean).then((res) => {
        if (res.code >= 400) {
          return res.error;
        }
        retrieveStoredData();
      });
    });
  };

  return (
    <>
      <Head>
        <title>Bulletin by Goldman Sachs</title>
      </Head>

      {pageType === "home" && (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <SelectProjects 
                  project={project}
                  allProjects={allProjects}
                  setProject={setProject}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Upload
                  reportTemplates={reportTemplates}
                  reportTemplateType={reportTemplateType}
                  setReportTemplateType={setReportTemplateType}
                  sendRawJson={sendRawJson}
                  selectedData={selectedData}
                  setPageType={setPageType}
                  selectedTemplateType={selectedTemplateType}
                  setSelectedTemplateType={setSelectedTemplateType}
                  sx={{ height: 500 }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <EditExistingReport reports={reports.slice(0, 5)} selectedProject={project} sx={{ height: 500 }} />
              </Grid>
              <Grid item xs={12}>
                <RecentReports reports={reports.slice(0, 5)} selectedProject={project} sx={{ height: "100%" }} />
              </Grid>
              <Grid item xs={12}>
                {/* <ReportStatus reports={reports} sx={{ height: "100%" }} /> */}
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}

      {/* {pageType === "generate" && <Generator setPageType={setPageType} jsonData={jsonData} />} */}

      {pageType === "sheets" && (
        <Sheets
          sheets={sheets}
          setSheets={setSheets}
          hasSaved={sheetHasSaved}
          setHasSaved={setSheetHasSaved}
          sheetsDetails={sheetsDetails}
          setSheetsDetails={setSheetsDetails}
          setPageType={setPageType}
          jsonData={jsonData}
        ></Sheets>
      )}

      {pageType === "format" && <ReportFormat setPageType={setPageType} jsonData={jsonData} />}
      
      {pageType === "generate" && <DataMapper setPageType={setPageType} jsonData={jsonData} />}

      {pageType === "load" && <Load storedData={storedData} setPageType={setPageType} sendRawJson={sendRawJson} />}
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
