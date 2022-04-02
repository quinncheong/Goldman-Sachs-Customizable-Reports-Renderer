import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const GenerateRows = ({ jsonName, data, ...props }) => {
  // const renderFields = Object.keys(data).map((fieldName, index) => {
  //   console.log(data[fieldName]);
  //   return (
  //     <TableRow hover key={index}>
  //       <TableCell>
  //         <FormControlLabel control={<Checkbox color="primary" />} label={fieldName} />
  //       </TableCell>
  //       <TableCell>{data[fieldName].datatype.toUpperCase()}</TableCell>
  //       <TableCell>{data[fieldName].row_count} rows</TableCell>
  //     </TableRow>
  //   );
  // });

  const rows = Object.keys(data).map((fieldName, index) => {
    return {
      id: index,
      col1: fieldName,
      col2: data[fieldName].datatype,
      col3: data[fieldName].row_count,
    };
  });

  const columns = [
    { field: "col1", headerName: "Category Name", width: 200 },
    { field: "col2", headerName: "Datatype", width: 120 },
    { field: "col3", headerName: "Data Size", width: 120 },
  ];

  const handleStateChange = (gridState, e, details) => {
    console.log(gridState);
    console.log(e);
    console.log(details);
  };

  return (
    <form {...props}>
      <Card sx={{ width: "100%" }}>
        <CardHeader
          sx={{ p: 3 }}
          subheader={`${Object.keys(data).length} data categories found`}
          title={jsonName}
        />
        <Divider />
        <CardContent sx={{ p: 0, height: 500, width: "100%" }}>
          <DataGrid
            sx={{ ml: 1, outline: "none" }}
            hideFooter
            labelRowsPerPage=""
            rowsPerPageOptions={[]}
            checkboxSelection
            rows={rows}
            columns={columns}
            onStateChange={handleStateChange}
          />
        </CardContent>

        {/* <TableContainer component={Paper} sx={{ maxHeight: 600, minWidth: 300 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Category Name</TableCell>
                <TableCell>Datatype</TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Data Size
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ overflowY: "scroll", height: 400 }}>{renderFields}</TableBody>
          </Table>
        </TableContainer> */}
      </Card>
    </form>
  );
};
