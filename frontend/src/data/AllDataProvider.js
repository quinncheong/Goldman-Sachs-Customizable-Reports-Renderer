import React, { useState, useEffect, useContext, createContext } from "react";

function AllDataProvider(fileExtension) {
    const API_URL = 'http://localhost:7000/api/v1/existing'
    const [reportData, setReportData] = useState([]); 

    useEffect(() => {
        async function searchAllReports() {
            const response = await fetch(
                API_URL,
                {
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': ' application/json',
                    'fileExtension': fileExtension
                    }
                }
                )
            const data = await response.json()
            const preparedData = data.map(function (obj) {
                return {
                    projectName: obj.projectName,
                    fileName: obj.fileName,
                    fileURL: obj.fileURL,
                    lastModified: new Date(obj.lastModified).toLocaleDateString('en-US') + ' ' + new Date(obj.lastModified).toLocaleTimeString(),

                }
            })
            setReportData(preparedData);
        }
        searchAllReports();
    }, [])

    return reportData;
}
  
export { AllDataProvider };