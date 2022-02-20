# Dependencies
#### Main Language: 
Python 3.8
#### Frameworks: 
FastAPI (Flask-based), Uvicorn (For node handling)
#### Packages:
All package requirements provided by requirements.txt

# Initialization
*Assumes that Python 3.8 and above is available*
1. Install all package requirements
```
pip install requirements.txt
```
2. Run App under main.py

    *Option 1*
    ```
    python src/main.py
    ```
    *Option 2*
    ```
    uvicorn main:app
    ```

# Interaction
3 endpoints are currently available

* `/`
    
    Placeholder homepage, returns welcome message
    
* `/process`
    
    Takes in JSON string containing dataset, and identifies the data columns, datatypes, and number of rows for each column in `body`
    
* `/report`

    Takes in JSON body string containing dataset *(Currently only works for provided dataset simple.json)*
