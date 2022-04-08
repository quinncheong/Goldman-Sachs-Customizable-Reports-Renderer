import { DataGrid } from "@mui/x-data-grid";

export const GenerateRows = ({ datapoints, ...props }) => {
  const rows = datapoints.map((datapoint, index) => {
    const { filename, fieldName, dataType, rowCount, sum } = datapoint;
    return {
      id: index,
      col1: `${filename} - ${fieldName}`,
      col2: dataType,
      col3: rowCount,
      col4: sum,
    };
  });

  const columns = [
    { field: "col1", headerName: "Category Name", width: 200 },
    { field: "col2", headerName: "Datatype", width: 80 },
    { field: "col3", headerName: "Data Size", width: 80 },
    { field: "col4", headerName: "Sum", width: 80 },
  ];

  const handleStateChange = (gridState, e, details) => {
    console.log(gridState);
    console.log(e);
    console.log(details);
  };

  return (
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
  );
};

// Old useless stuff

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

{
  /* <TableContainer component={Paper} sx={{ maxHeight: 600, minWidth: 300 }}>
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
        </TableContainer> */
}
