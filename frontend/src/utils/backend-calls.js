import axios from "axios";

import {
  FOLDER_API_URL,
  EXISTING_API_URL,
  REPORT_API,
  TEMPLATES_API_URL,
  UPLOAD_API,
} from "../config/endpoints";

export const uploadData = async (data) => {
  try {
    let templateRes = await axios.post(UPLOAD_API, data);
    return templateRes;
  } catch (error) {
    return {
      code: 400,
      error: error,
    };
  }
};

export const getAllProjects = async () => {
  const response = await fetch(FOLDER_API_URL, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data >= 1) {
    return Array.from(Array(data + 1).keys()).slice(1);
  } else {
    return [0];
  }
};

export const getAllReports = async (fileExtension) => {
  // fileExtension = 'xlsx' for reports, 'json' for raw data
  const response = await fetch(EXISTING_API_URL, {
    headers: {
      Accept: "application/json",
      "Content-Type": " application/json",
      fileExtension: fileExtension,
    },
  });
  const data = await response.json();
  const preparedData = data.map(function (obj) {
    return {
      projectName: obj.projectName,
      fileName: obj.fileName,
      fileURL: obj.fileURL,
      lastModified:
        new Date(obj.lastModified).toLocaleDateString("en-US") +
        " " +
        new Date(obj.lastModified).toLocaleTimeString(),
    };
  });

  return preparedData;
};

export const getAllTemplates = async () => {
  const response = await fetch(TEMPLATES_API_URL, {
    headers: {
      Accept: "application/json",
      "Content-Type": " application/json",
    },
  });
  const data = await response.json();
  const preparedData = data.map(function (obj) {
    return {
      fileName: obj.fileName,
      templateData: obj.templateData,
      lastModified:
        new Date(obj.lastModified).toLocaleDateString("en-US") +
        " " +
        new Date(obj.lastModified).toLocaleTimeString(),
    };
  });

  return preparedData;
};

/**
Metadata takes in a json object and returns a list of objects with the following properties:
@param {string of int} project - Project Name
@param {Array} files - The list of files

**/
export const analyseJsonData = async (metadata) => {
  try {
    let analyzeRes = await axios.post(ANALYZE_API, metadata);
    return analyseRes;
  } catch (error) {
    return {
      code: 400,
      error: error,
    };
  }
};

export const createReport = async (compiledData) => {
  try {
    let reportRes = await axios.post(REPORT_API, compiledData);
    return reportRes;
  } catch (error) {
    return {
      code: 400,
      error: error,
    };
  }
};
