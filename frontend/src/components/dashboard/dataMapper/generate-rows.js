// import { DataGrid } from "@mui/x-data-grid";
// import DataGrid from "react-data-grid";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export const GenerateRows = ({
  datapoints,
  compiledTables,
  setCompiledTables,
  tableId,
  ...props
}) => {
  const rows = datapoints.map((datapoint, index) => {
    const { fileName, fieldName, dataType, rowCount, sum } = datapoint;
    return {
      id: index,
      col1: `${fileName} - ${fieldName}`,
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

  const handleStateChange = (selectedInputs) => {
    let compiledTablesClone = { ...compiledTables };

    let tableFinalData = [];

    for (const selection of selectedInputs) {
      tableFinalData.push({
        colName: selection.fieldName,
        colData: { data: selection.fileName, sum: selection.sum },
      });
    }

    compiledTablesClone[tableId] = tableFinalData;
    setCompiledTables(compiledTablesClone);
  };

  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={datapoints}
        getOptionLabel={(option) => `${option.fileName} - ${option.fieldName}`}
        onChange={(event, newValue) => {
          handleStateChange(newValue);
        }}
        // defaultValue={}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Multiple values"
            placeholder="Select Inputs"
          />
        )}
      />
    </Stack>
  );
};

