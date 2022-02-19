from fastapi import Request, FastAPI
from pydantic import BaseModel


class User(BaseModel):
    email: str
    password: str


app = FastAPI()

# Placeholder homepage
@app.get("/")
async def homepage():
    return await {"msg": "Welcome to data processing"}


# Main process endpoint
@app.post("/process")
async def get_body(request: Request):
    return await request.json()



# @app.post("/login")
# def login(user: User):
#     # ...
#     # do some magic
#     # ...
#     return {"msg": "login successful"}