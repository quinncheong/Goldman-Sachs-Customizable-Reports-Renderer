import React, { useState, useEffect } from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AllDataProvider } from "../../../data/AllDataProvider";
import { getAllReports, getAllTemplates, uploadData } from "../../../utils/backend-calls";

export const ExistingDataList = ({
  storedData,
  setPageType,
  project,
}) => {
  const renderFileDownloadButton = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
              window.location.href = params.row.col3
          }}
        >
          Download
        </Button>
      </strong>
    )
  }
  const [rows, setRows] = useState({});
  const [columns, setColumns] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const buildRows = (rawData) => {
      setRows(rawData.map((data, index) => {
        if (data.projectName === project) {
          return {
          id : index,
          project: data.projectName,
          col1: data.fileName,
          col2: data.lastModified,
          // col3: data.fileURL,
          };
        }
      }).filter(item => item !== undefined)
      );
    }

    const buildColumns = () => {
      setColumns(
        [
            { field: "project", headerName: "Project Name", minWidth: 100, flex: 2},
            { field: "col1", headerName: "File Name", minWidth: 300, flex: 2},
            { field: "col2", headerName: "Last Modified", minWidth: 200, flex:2 },
            // { field: "col3", headerName: "Download", minWidth: 200, flex: 2, renderCell: renderFileDownloadButton }
          ]
      );
    }

    buildRows(storedData);
    buildColumns();

  }, [storedData])
  
  const handleStateChange = (gridState, e, details) => {
    // console.log(gridState);
    // console.log(e);
    // console.log(details);
    console.log(selectedRows);
  };

  const handleSubmit = (event) => {
    console.log("Submit");
    console.log(selectedRows);
    setPageType("sheets");
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} >
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
            // onStateChange={handleStateChange}
            onSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRows = rows.filter((row) =>
                selectedIDs.has(row.id),
              );
    
              setSelectedRows(selectedRows);
            }}
        />
        </CardContent>
        <CardActions>
          <Grid container justify="flex-end">
            <Button 
              // type="submit"           
              variant="contained"
              component="label"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </form>
  );
};
  