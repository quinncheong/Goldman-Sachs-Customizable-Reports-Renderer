import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Grid,
  useTheme,
  Tooltip,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import React, { useState } from "react";
import { AllDataProvider } from "../../data/AllDataProvider";

export const EditExistingReport = ({ limit=null, ...props }) => {
    var reports = AllDataProvider('xlsx');
    if (limit != null) { 
        reports = reports.slice(0, limit);
    }
    const displayReports = () => {
    return (
      <React.Fragment>
        {reports.map((report) => {
          return (
            <Grid container direction="row" justifyContent="space-around" alignItems="center">
              <Grid item xs={6}>
                <Typography color="neutral.700" variant="h6">
                  {report.fileName}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography color="neutral.400" variant="body2">
                    { report.lastModified }
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Tooltip title="Edit" arrow placement="right-start">
                  <IconButton sx={{ ml: 1 }}>
                    <EditIcon fontSize="small" />
                    <Typography sx={{ ml: 1 }} color="neutral.400" variant="body2">
                      Edit
                    </Typography>
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          );
        })}
      </React.Fragment>
    );
  };

  return (
    <Card {...props}>
      <CardHeader title="Edit Existing Report" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 280,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            overflowY: "scroll",
          }}
        >
          {displayReports()}
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button sx={{ ml: "auto" }} color="primary" endIcon={<ArrowRightIcon fontSize="small" />} size="small" onClick={() =>{
                window.location.href = "/reports"
            }}>
          View More Reports
        </Button>
      </Box>
    </Card>
  );
};
