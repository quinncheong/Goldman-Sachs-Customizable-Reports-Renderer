from traceback import print_tb
from fastapi import Request, FastAPI
from fastapi.middleware.cors import CORSMiddleware
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
    cols = ['positionDate', 'portfolio', 'instrumentType', 'ISIN', 'ticker', 'contractCode', 'coupon', 'maturityDate', 'currency', 'currentFace', 'originalFace', 'price', 'marketValue']
    cols_rename = {'positionDate': 'Position Date', 'portfolio': 'Portfolio', 'instrumentType': 'Instrument Type', 'ticker': 'Ticker', 'contractCode': 'Contract Code', 'coupon': 'Coupon', 'maturityDate': 'Maturity', 'currency': 'Currency', 'currentFace': 'Current Face', 'originalFace': 'Original Face', 'price': 'Price', 'marketValue': 'Market Value'}
    
    try:
        input = await request.json()
    except Exception as e:
        return {"error_msg": repr(e)}
    
    try:
        test = pd.DataFrame(input)
        new = test[cols]
        new.rename(columns=cols_rename, inplace=True)

        new = new.round(decimals=2)
        new['Coupon'] = new['Coupon'].apply(lambda x: '' if x == 0.0 else x)
        new['Position Date'] = pd.to_datetime(new['Position Date'], format='%Y%m%d').dt.date
        new['Maturity'] = pd.to_datetime(new['Maturity'], format='%m/%d/%Y').dt.date
        writer = pd.ExcelWriter('output.xlsx',
                        engine='xlsxwriter',
                        date_format='yyyymmdd')
        new.to_excel(writer, sheet_name='Holdings', index=False)
        workbook  = writer.book
        worksheet = writer.sheets['Holdings']
        (max_row, max_col) = new.shape
        worksheet.set_column(0, max_col, 20)
        writer.save()

        # send_file("output.xlsx", as_attachment=True)
        return {"code": 200, "message": "Excel report created."}
    
    except Exception as e:
        return {"error_msg": repr(e)}


if __name__ == "__main__":
    uvicorn.run("main:app", port=8080, reload=True)