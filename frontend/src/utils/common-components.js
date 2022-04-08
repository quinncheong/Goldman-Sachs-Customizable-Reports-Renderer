import {
  Button,
} from "@mui/material";

export const renderFileDownloadButton = (params) => {
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