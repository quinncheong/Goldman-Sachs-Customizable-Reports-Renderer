import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { ReportStatus } from "../components/dashboard/report-status";
import { Upload } from "../components/dashboard/upload";
import { EditExistingReport } from "../components/dashboard/edit-existing-report";
import { RecentReports } from "../components/dashboard/recent-reports";
import { DashboardLayout } from "../components/dashboard-layout";

import axios from "axios";

// Report generation
import { Generator } from "../components/dashboard/generator/generator";
import { javaTemplateEndpoint } from "../config/endpoints";

const Dashboard = () => {
  const [pageType, setPageType] = useState("home");

  const [reports, setReports] = useState([
    {
      reportID: 1,
      name: "SaaSFinancialPlan.xlsx",
      date: "2 Feb 2022",
      status: "Pending",
      dateCreated: Date.now(),
      dateModified: Date.now(),
    },
    {
      reportID: 2,
      name: "SaaSFinancialPlan2.xlsx",
      date: "2 Feb 2022",
      status: "Completed",
      dateCreated: Date.now(),
      dateModified: Date.now(),
    },
    {
      reportID: 3,
      name: "SaaSFinancialPlan3.xlsx",
      date: "2 Feb 2022",
      status: "Cancelled",
      dateCreated: Date.now(),
      dateModified: Date.now(),
    },
    {
      reportID: 4,
      name: "SaaSFinancialPlan3.xlsx",
      date: "2 Feb 2022",
      status: "Cancelled",
      dateCreated: Date.now(),
      dateModified: Date.now(),
    },
    {
      reportID: 5,
      name: "SaaSFinancialPlan3.xlsx",
      date: "2 Feb 2022",
      status: "Completed",
      dateCreated: Date.now(),
      dateModified: Date.now(),
    },
  ]);

  const [reportTemplateType, setReportTemplateType] = useState("Simple");
  const [reportTemplates, setReportTemplates] = useState([
    {
      reportTemplateID: 1,
      name: "Bulk Create",
      date: "2 Feb 2022",
      dateCreated: Date.now(),
      dateModified: Date.now(),
    },
    {
      reportID: 2,
      name: "Many to Many",
      date: "2 Feb 2022",
      dateCreated: Date.now(),
      dateModified: Date.now(),
    },
    {
      reportID: 3,
      name: "Complex",
      date: "2 Feb 2022",
      dateCreated: Date.now(),
      dateModified: Date.now(),
    },
    {
      reportID: 4,
      name: "Another test",
      date: "2 Feb 2022",
      dateCreated: Date.now(),
      dateModified: Date.now(),
    },
    {
      reportID: 5,
      name: "Another test",
      date: "2 Feb 2022",
      dateCreated: Date.now(),
      dateModified: Date.now(),
    },
    {
      reportID: 6,
      name: "Another test",
      date: "2 Feb 2022",
      dateCreated: Date.now(),
      dateModified: Date.now(),
    },
  ]);
  const [selectedTemplateType, setSelectedTemplateType] = useState(null);

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

  useEffect(() => {
    // Function to get report stuff
    // getReports();
    // async function getReports() {
    //   // let url = "http://something/" + productId;
    //   let config = {};
    //   const response = await myFetch(url);
    //   if (!didCancel) {
    //     // Ignore if we started fetching something else
    //   }
    // }
  }, []);

  const sendRawJson = async (e) => {
    const files = e.target.files;
    const promises = [];
    let jsonObject = {};

    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        promises.push(
          new Promise((resolve) => {
            const reader = new FileReader();
            console.log(files);
            const file = files[i];
            reader.readAsBinaryString(file);
            reader.onloadend = async (loadendEvent) => {
              let parsedJson = JSON.parse(reader.result).body;
              console.log(parsedJson[Object.keys(parsedJson)[0]]);
              let mainJsonBody = parsedJson[Object.keys(parsedJson)[0]];
              jsonObject[file.name] = mainJsonBody;
              resolve();
            };
          })
        );
      }
    }

    Promise.all(promises).then(() => {
      console.log(jsonObject);
      let reqBean = {
        data: jsonObject,
        templateType: reportTemplateType,
      };
      console.log(reqBean);
      sendJsonObj(reqBean);
    });

    async function sendJsonObj(data) {
      try {
        let templateRes = await axios.post(javaTemplateEndpoint, data);
        console.log(templateRes);
      } catch (error) {
        console.log(error);
      }
    }
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
              <Grid item md={6} xs={12}>
                <Upload
                  reportTemplateType={reportTemplateType}
                  setReportTemplateType={setReportTemplateType}
                  sendRawJson={sendRawJson}
                  setPageType={setPageType}
                  reportTemplates={reportTemplates}
                  selectedTemplateType={selectedTemplateType}
                  setSelectedTemplateType={setSelectedTemplateType}
                  sx={{ height: 500 }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <EditExistingReport reports={reports} sx={{ height: 500 }} />
              </Grid>
              <Grid item xs={12}>
                <RecentReports reports={reports} sx={{ height: "100%" }} />
              </Grid>
              <Grid item xs={12}>
                <ReportStatus reports={reports} sx={{ height: "100%" }} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}

      {pageType === "generate" && <Generator setPageType={setPageType} jsonData={jsonData} />}

      {pageType === "sheets" && <div>This is a sheets page test</div>}
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
