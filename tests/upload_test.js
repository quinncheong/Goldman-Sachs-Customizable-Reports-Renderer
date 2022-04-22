import axios from "axios"
import { DateTime, Interval } from "luxon"

import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const jsonReportBodyTemplate = require("./data/standard_report_5_5_5.json") // use the require method

console.log(jsonReportBodyTemplate)

const generateReportUrl = "http://54.179.120.17:7000/api/v1/report"

const make_batch_call = async (count) =>  {
    let promises = []
    const testStart = DateTime.now();
    console.log(testStart.toString())

    for (let i = 0; i < count; i++) {
        promises.push(axios.post(generateReportUrl, jsonReportBodyTemplate))
    }

    try {
        const data = await Promise.all(promises)

        const testEnd = DateTime.now();
        console.log(testEnd.toString())
        console.log(data.length)
        console.log(data[data.length - 1].data)

        const diffSeconds = testEnd.diff(testStart, 'seconds')
        console.log(diffSeconds.toObject())

    } catch (error) {
        console.log(error)
    }
}

make_batch_call(10)