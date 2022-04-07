FROM python:3.9

# RUN mkdir ./data_processing
WORKDIR /data_processing

COPY ./requirements.txt /app/data_processing/requirements.txt 
RUN pip install --no-cache-dir --upgrade -r /app/data_processing/requirements.txt

COPY ./src /app/data_processing/src

CMD ["uvicorn", "app.data_processing.src.main:app"]