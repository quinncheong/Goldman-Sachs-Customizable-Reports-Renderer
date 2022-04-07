import React, { useState, useEffect, useContext, createContext } from "react";

function AllTemplateProvider() {
    const API_URL = 'http://localhost:7000/api/v1/templates'
    const [templateData, setTemplateData] = useState([]);

    useEffect(() => {
        async function searchAllTemplates() {
            const response = await fetch(
                API_URL,
                {
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': ' application/json',
                    }
                }
                )
            const data = await response.json()
            const preparedData = data.map(function (obj) {
                return {
                    fileName: obj.fileName,
                    templateData: obj.templateData,
                    lastModified: new Date(obj.lastModified).toLocaleDateString('en-US') + ' ' + new Date(obj.lastModified).toLocaleTimeString(),

                }
            })
            setTemplateData(preparedData);
        }
        searchAllTemplates();
    }, [])

    return templateData;
}

export { AllTemplateProvider };
