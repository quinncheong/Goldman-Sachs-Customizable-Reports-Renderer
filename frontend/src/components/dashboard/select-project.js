import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export const SelectProjects = ({
  project,
  allProjects,
  setProject,
  ...props 
}) => {

  const handleChange = (e) => {
    setProject(e.target.value);
  };

  const displayProjects = allProjects.map((allProject) => {
    return (
      <MenuItem value={allProject}>{allProject}</MenuItem>
    );
  });

  return (
    <Card {...props}>
      <CardContent>
        <FormControl fullWidth>
          <InputLabel id="project">Project</InputLabel>
          <Select
            labelId="select-project-label"
            id="select-project"
            value={project}
            label="Project"
            onChange={handleChange}
          >
            {displayProjects}
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};