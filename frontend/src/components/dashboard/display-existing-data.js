import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { formatDistanceToNow, subHours, format } from "date-fns";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  CardActions,
  Divider,
  useTheme,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import CloudIcon from '@mui/icons-material/Cloud';
import UploadIcon from "@mui/icons-material/Upload";
import FolderIcon from "@mui/icons-material/Folder";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export const DisplayExistingData = (props) => {
  // TODO: delete
  return (
    <>
    <CardHeader sc={{}} title="Load Existing Data" />
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2
        }}
        >
        
      </Box>
      <Box
        sx={{
          display: "flex", 
          justifyContent: "flex-end", 
          p:2}}
          >
        <Button>
          
        </Button>
      </Box>
    </>
  )

};