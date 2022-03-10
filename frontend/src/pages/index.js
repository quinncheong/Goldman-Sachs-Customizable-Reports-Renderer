import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { ReportStatus } from "../components/dashboard/report-status";
import { Upload } from "../components/dashboard/upload";
import { EditExistingReport } from "../components/dashboard/edit-existing-report";
import { RecentReports } from "../components/dashboard/recent-reports";
import { DashboardLayout } from "../components/dashboard-layout";

// Report generation
import { Generator } from "../components/dashboard/generator/generator";

const Dashboard = () => {
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
  const [pageType, setPageType] = useState("home");
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
  console.log(jsonData);

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
    const file = e.target.files[0];
    console.dir(e.target);
    console.log(file);
    const fileReader = new FileReader();
    // console.log(fileReader);
    const endpoint = "http://localhost:5000/create";
    // fileReader.onloadend = () => {
    //   // console.log(fileReader);
    //   try {
    //     let reqData = JSON.parse(fileReader.result);
    //     axios.post(endpoint, reqData.body["SIMPLE_REPORT"].rows).then((res) => {
    //       // console.log(res.data);
    //     });
    //   } catch (e) {
    //     // Input some error message here
    //     // setErrorData("**Not valid JSON file!**");
    //   }
    // };
    // if (file !== undefined) fileReader.readAsText(file);
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
                <Upload sendRawJson={sendRawJson} setPageType={setPageType} sx={{ height: 500 }} />
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
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
