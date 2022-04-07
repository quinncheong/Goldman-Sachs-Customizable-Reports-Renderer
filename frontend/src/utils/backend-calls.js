import { EXISTING_API_URL, TEMPLATES_API_URL } from "../config/endpoints";

export const sendRawJson = (file) => {};

export const getAllReports = async (fileExtension) => {
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
