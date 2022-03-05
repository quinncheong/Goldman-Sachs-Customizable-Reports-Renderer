from traceback import print_tb
from fastapi import Request, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
import uvicorn
import pandas as pd

# Helper functions
def get_application() -> FastAPI:
    application = FastAPI()
    return application


def get_all_rows(dict_data, headers):
    for key in dict_data:
        if key == 'columns':
            continue
        if key not in headers and not isinstance(dict_data[key], (tuple, dict, list)):
            headers[key] = {"datatype": type(dict_data[key]).__name__, "row_count": 1}
        elif key not in headers and isinstance(dict_data[key], (tuple, dict, list)):
            headers[key] = {}
        else:
            curr_datatype = type(dict_data[key]).__name__
            if headers[key]["datatype"] == "NoneType":
                headers[key]["datatype"] = curr_datatype
            headers[key]["row_count"] += 1 
        if isinstance(dict_data[key], dict):
            get_all_rows(dict_data[key], headers[key])
        elif isinstance(dict_data[key], list):
            [get_all_rows(x, headers[key]) for x in dict_data[key] if isinstance(x, dict)]      
    return


# Run app
app = get_application()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Placeholder homepage
@app.get("/")
async def homepage():
    return {"msg": "Welcome to data processing"}


# Process datatype and size endpoint
@app.post("/process")
async def get_body(request: Request):
    input =  await request.json()
    
    try:
        input_body = input["body"]
    except Exception as e:
        if repr(e) == "KeyError('body')":
            return {"error_msg": "body data not available in provided json"}
        else:            
            return {"error_msg": repr(e)}
    
    data_schema = {}
    
    try:
        for report in input_body:
            headers = {}
            get_all_rows(input_body[report], headers)
            data_schema[report] = headers
    except Exception as e:
        return {"error_msg": repr(e)}
    
    print(data_schema)
    return {"result": data_schema}


# Create excel report endpoint
# TODO: Make cols and cols_rename to be dynamic
# TODO: Upload excel file to S3 bucket
@app.post("/report")
async def create_table(request: Request):
    df_list = []
    sheet_names = []
    sheet_dict = {}
    
    try:
        input = await request.json()
    except Exception as e:
        return {"error_msg": repr(e)}
    
    try:
        compiled_data = input['compiled']
        data = input['data']
        for k,v in data.items():
            df = pd.DataFrame(v)
            data[k] = df
        # build each dataframe/table
        for k,v in compiled_data.items():
            for table in v:
                series_list = []
                for col, json_data in table.items():
                    if json_data in data:
                        tmp_series = data[json_data][col]
                        series_list.append(tmp_series)
                # build dataframe
                if series_list != []:
                    tmp_df = pd.concat(series_list, axis=1)
                    df_list.append(tmp_df)
            if df_list != []:
                sheet_dict[k] = df_list
                df_list = []
        # write excel
        writer = pd.ExcelWriter('output.xlsx',
                                engine='xlsxwriter',
                                date_format='yyyymmdd')
        workbook = writer.book
        for sheet_name, tables in sheet_dict.items():
            start_row = 1
            start_col = 0
            for table_df in tables:
                table_df.to_excel(writer, sheet_name=sheet_name, startrow=start_row, startcol=start_col, index=False)
                (max_row, max_col) = table_df.shape
                worksheet = writer.sheets[sheet_name]
                worksheet.set_column(0, max_col, 20)
                start_row += (max_row + 3)
        writer.save()   
        return FileResponse('output.xlsx')
        
    except Exception as e:
        return {"error_msg": repr(e)}


if __name__ == "__main__":
    uvicorn.run("main:app", port=8080, reload=True)