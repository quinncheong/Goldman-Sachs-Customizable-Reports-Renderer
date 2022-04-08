// Java endpoints
const javaBaseEndpoint = "http://localhost:7000/api/v1";

export const javaTemplateEndpoint = `${javaBaseEndpoint}/template`;
export const javaAnalyzeEndpoint = `${javaBaseEndpoint}/custom/analyze`;

export const FOLDER_API_URL = `${javaBaseEndpoint}/files/findNumberOfFolders?bucketType=data`;
export const EXISTING_API_URL = `${javaBaseEndpoint}/existing`;
export const TEMPLATES_API_URL = `${javaBaseEndpoint}/templates`;
export const UPLOAD_API = `${javaBaseEndpoint}/upload`;
export const ANALYZE_API = `${javaBaseEndpoint}/analyze`;
export const REPORT_API = `${javaBaseEndpoint}/report`;
