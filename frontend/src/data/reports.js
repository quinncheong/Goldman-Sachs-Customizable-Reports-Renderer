import React, { useEffect } from "react";

export const ShowReports = () => {
    const API_URL = 'http://localhost:7000/api/v1/existing'
    
    const searchAllReports = async() => {
        const response = await fetch(
            API_URL,
            {
                headers: {
                'Accept': 'application/json',
                'Content-Type': ' application/json',
                'bucketType': 'data',
                }
            }
            )
        const data = await response.json()

        console.log(data)
    }

    useEffect(() => {searchAllReports()})

    return (
        <div className="reports">
            <h2>report</h2>
        </div>
    )


}

export default ShowReports;