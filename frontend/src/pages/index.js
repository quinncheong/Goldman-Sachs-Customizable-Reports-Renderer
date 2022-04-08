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
import {
  analyseJsonData,
  createReport,
  getAllProjects,
  getAllReports,
  getAllTemplates,
  uploadData,
} from "../utils/backend-calls";

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

  // Data retrieved from the upload API
  const [jsonDataTypes, setJsonDataTypes] = useState(null);

  // This section contains the design schemes for final report generation
  // Finalised schema
  const [compiledSheets, setCompiledSheets] = useState([
    { sheetName: "Pension Investment Status", sheetData: ["row1", "row2", "row3"] },
    { sheetName: "Stock Balance", sheetData: ["row4"] },
  ]);

  const [compiledRows, setCompiledRows] = useState({
    "row1": ["t1"],
    "row2": ["t2", "t3"],
    "row3": ["t4"],
    "row4": ["t5"],
  });

  const [compiledTables, setCompiledTables] = useState({
    "t1": [
      {colName:"assetCode", colData: { data: "json1.json", sum: false }},
      {colName:"assetName", colData: { data: "json1.json", sum: false }},
      {colName:"previousMonthNAV", colData: { data: "json4.json", sum: true }},
      {colName:"inflow", colData: { data: "json3.json", sum: false }}, 
      {colName:"daysInflow", colData: { data: "json3.json", sum: false }}, 
      {colName:"outflow", colData: { data: "json2.json", sum: false }},
      {colName:"daysOutflow", colData: { data: "json2.json", sum: false }},
      {colName:"currentMonthNAV", colData: { data: "json4.json", sum: true }},
      {colName:"exposure", colData: { data: "json4.json", sum: true }},
      {colName:"compositionRate", colData: { data: "json4.json", sum: true }} 
    ],
    "t2": [
      {colName: "checkInflow", colData: { data: "json5.json", sum: false }},
      {colName: "checkOutflow", colData: { data: "json6.json", sum: false }},
      {colName: "totalTransDaysOutflow", colData: { data: "json6.json", sum: false }} 
    ],
    "t3": [
      {colName: "checkInflow", colData: { data: "json5.json", sum: false }},
      {colName: "checkOutflow", colData: { data: "json6.json", sum: false }},
      {colName: "totalTransDaysOutflow", colData: { data: "json6.json", sum: false }} 
    ],
    "t4": [
      {colName: " ", colData: { data: "provided.json", sum: false }},
      {colName: "Previous Month-End Unrealized Gain/Loss(10)", colData: { data: "provided.json", sum: false }},
      {colName: "Current Month-End Unrealized Gain/Loss(10)", colData: { data: "provided.json", sum: false }}, 
      {colName: "Current Month Realized Gain/Loss", colData: { data: "provided.json", sum: false }},
      {colName: "Current Month Unrealized Gain/Loss Increment(10)", colData: { data: "provided.json", sum: false }}, 
      {colName: "Current Month Unrealized and Realized Gain/Loss", colData: { data: "provided.json", sum: false }} 
    ],
    "t5": [
      {security_cd: " ", colData: { data: "json7.json", sum: false }},
      {securityDescription: " ", colData: { data: "json7.json", sum: false }},
      {market_value_bs: " ", colData: { data: "json7.json", sum: false }},
      {trade_ccy_cd: " ", colData: { data: "json7.json", sum: false }},
    ]
  });

  const createCompiledJson = () => {
    let metadataObject = {
      filename: "complex.xlsx",
      // project: project,
      project: 14,
      reportTemplateType,
      files: [],
    };

    let sheetDefinition = {};
    compiledSheets.map(function (obj) {
      sheetDefinition[obj.sheetName] = obj.sheetData;
    });
    
    let rowDefinition = {};
    Object.entries(compiledRows).map(([row, tables]) => {
      rowDefinition[row] = {}
      tables.map(function (table) {
        let tempObj = {};
        compiledTables[table].map(function (column) {
          tempObj[column['colName']] = column['colData'];
          rowDefinition[row][table] = tempObj;
          if (!metadataObject['files'].includes(column['colData']['data'])) {
            metadataObject['files'].push(column['colData']['data']);
          }
        })
      })
    });
    
    let compiledObject = {};
    Object.entries(sheetDefinition).map(([sheet, rows]) => {
      compiledObject[sheet] = []
      rows.map(function (row) {
        let tempArr = [];
        Object.entries(rowDefinition[row]).map(([tableName, tableItems]) => {
          tempArr.push(tableItems);
        })
        compiledObject[sheet].push(tempArr);
      })
    })
    
    return {
      metadata: metadataObject,
      compiled: compiledObject,
    };
  }
  
  useEffect(() => {
    let reqBean = createCompiledJson();
    createReport(reqBean).then((res) => {
      console.log(res);
      if (res.code >= 400) {
        return res.error;
      }
    });
  }, [])

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
  }, [setProject]);

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
        

        analyseJsonData(metadataObject).then((analyseRes) => {
          if (analyseRes.code >= 400) {
            return analyseRes.error;
          }

          delete analyseRes.data.success["count"];

          setJsonDataTypes(analyseRes.data.success);
          setPageType("sheets");
        });
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
                <EditExistingReport
                  reports={reports.slice(0, 5)}
                  selectedProject={project}
                  sx={{ height: 500 }}
                />
              </Grid>
              <Grid item xs={12}>
                <RecentReports
                  reports={reports.slice(0, 5)}
                  selectedProject={project}
                  sx={{ height: "100%" }}
                />
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
          compiledJson={compiledJson}
          setcompiledJson={setCompiledJson}
        ></Sheets>
      )}

      {pageType === "format" && (
        <ReportFormat
          setPageType={setPageType}
          sheets={sheets}
          sheetsDetails={sheetsDetails}
          jsonData={jsonData}
        />
      )}

      {/* {pageType === "generate" && <DataMapper setPageType={setPageType} jsonData={jsonData} />} */}

      {pageType === "generate" && (
        <DataMapper setPageType={setPageType} jsonData={jsonData} jsonDataTypes={jsonDataTypes} />
      )}

      {pageType === "load" && <Load storedData={storedData} setPageType={setPageType} sendRawJson={sendRawJson} project={project}/>}
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
