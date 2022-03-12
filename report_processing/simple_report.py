from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pandas as pd
app = Flask(__name__)
CORS(app)

PREFIX='/api/v1'

# takes in JSON input and outputs simple excel report
@app.route(f"{PREFIX}/report/simple", methods=['POST'])
def simpleReport():
    f = request.files['file']
    contents = f.read()
    rawdata = pd.read_json(contents)
    reportName = list(rawdata['body'].keys())[0]
    jsondata = rawdata['body'][reportName]

    compiledColumnData = {}

    for column in jsondata['columns']:
        datatype = column['type']
        if datatype == 'string':
            datatype = "object"
        elif datatype == 'double':
            datatype = "float"
        elif datatype == 'decimal':
            datatype = "float"
        elif datatype == 'boolean':
            datatype = "bool"
        else:
            print("Unidentified datatype.")

        columnName = column['name']
        compiledColumnData[columnName] = datatype

    df = pd.DataFrame({c: pd.Series(dtype=t) for c, t in compiledColumnData.items()})
    for row in jsondata['rows']:
        df = df.append(row, ignore_index=True)
    fileName = f"{reportName}.xlsx"
    df.to_excel(fileName)
    return jsonify({"code": 200, "message": "Simple Report created."}), 200