from matplotlib.pyplot import isinteractive
from fastapi import Request, FastAPI
from pydantic import BaseModel
import uvicorn


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


app = get_application()


# Placeholder homepage
@app.get("/")
async def homepage():
    return {"msg": "Welcome to data processing"}


# Main process endpoint
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
    
    return {"result": data_schema}       


if __name__ == "__main__":
    uvicorn.run("main:app", port=8080, reload=True)