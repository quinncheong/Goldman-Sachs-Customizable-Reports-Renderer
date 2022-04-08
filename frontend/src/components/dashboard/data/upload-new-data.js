import React, { useState, useEffect } from "react";

import { 
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  IconButton,
  Grid,
  Typography,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";


export const UploadNewData = ({
  sendRawJson,
}) => {
  return (
    <Button
      sx={{ ml: "auto" }}
      endIcon={<UploadIcon fontSize="large" />}
      variant="contained"
      component="label"
      // onClick={sendRawJson}
      >
      <Typography color="" variant="body2">
      Upload JSON
      </Typography>
      <input type="file" hidden onChange={sendRawJson} multiple />
    </Button>
  );
}
