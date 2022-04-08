import React, { useState, useEffect } from "react";

import {
  Card,
  CardContent,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { renderFileDownloadButton } from "../../utils/common-components";
import { getAllReports } from "../../utils/backend-calls";

export const ReportsList = ({ 
  reports,
  ...props
}) => {
  // const [reports, setReports] = useState(null)
  const [rows, setRows] = useState({});
  const [columns, setColumns] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  // // Load initial data
  // useEffect(() => {
  //   const getReports = async () => {
  //     let allReports = await getAllReports('xlsx');
  //     setReports(allReports);
  //   }
  // }, [])

  useEffect(() => {
    const buildRows = (rawData) => {
      setRows(rawData.map((report, index) => {
        return {
          id : index,
          project: report.projectName,
          col1: report.fileName,
          col2: report.lastModified,
          col3: report.fileURL,
        };
      })
      );
    }

    const buildColumns = () => {
      setColumns(
        [
          { field: "project", headerName: "Project Name", minWidth: 100, flex: 2},
          { field: "col1", headerName: "File Name", minWidth: 300, flex: 2},
          { field: "col2", headerName: "Last Modified", minWidth: 200, flex:2 },
          { field: "col3", headerName: "Download", minWidth: 200, flex: 2, renderCell: renderFileDownloadButton }      
        ]
      );
    }

    buildRows(reports);
    buildColumns();

  }, [reports])

  return (
    <form {...props}>
      <Card sx={{ width: "100%" }}>
        <CardContent sx={{ height: 800, width: "100%" }}>
          <DataGrid
            sx={{ outline: "none" }}
            hideFooter
            labelRowsPerPage=""
            rowsPerPageOptions={[]}
            checkboxSelection
            rows={rows}
            columns={columns}
          />
        </CardContent>
      </Card>
    </form>
  );
};
