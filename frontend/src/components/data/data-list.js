import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const DataList = ({
  storedData,
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
        return {
        id : index,
        project: data.projectName,
        col1: data.fileName,
        col2: data.lastModified,
        col3: data.fileURL,
        };
      }).filter(item => item !== undefined)
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

    buildRows(storedData);
    buildColumns();

  }, [storedData])
  

  return (
    <form>
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
            onSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRows = rows.filter((row) =>
                selectedIDs.has(row.id),
              );
    
              setSelectedRows(selectedRows);
            }}
        />
        </CardContent>
      </Card>
    </form>
  );
};
  