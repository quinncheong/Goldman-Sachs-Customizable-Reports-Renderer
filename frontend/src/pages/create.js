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
import { Sheets } from "../components/dashboard/sheets/sheets";
import { DataMapper } from "src/components/dashboard/dataMapper/data-mapper";
import { DisplayExistingData } from "src/components/dashboard/display-existing-data";
import { javaTemplateEndpoint } from "../config/endpoints";

// Backend Connector Functions
import { getAllReports, getAllTemplates, uploadData } from "../utils/backend-calls";

const Create = () => {
  
};

Create.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Create;
