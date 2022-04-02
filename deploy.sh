#!/bin/bash

# Before starting this deploy script, ensure that there
# are no processes running on PORT 3000, 7000, 8000
# Use 'ss -ltpn' to make sure that there are no services on these ports
# Use 'ps aux' to find the offending PID if any and 'kill x' where
# x = PID of offending service

# execute this script using 'Yes "Yes" | bash deploy.sh'

# kill existing services on shared ports
pkill java
pkill python

# install dependencies
sudo apt-get update -y
sudo apt install default-jdk -y
export PATH=$PATH:/usr/lib/jvm/java-11-openjdk-amd64/bin
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
export TANGO_HOST=code-server-instance-901-5ccffd655-jljwd:10000
# sudo dpkg --configure -a
sudo apt install maven nodejs npm python3.8
sudo apt-get install python3-pip 
sudo apt-get install python3-venv

# reload environment
source /etc/environment

# run python API
cd ~/project/the-foobar-fighters/GSEngage2022-TheFoobarFighters/data_processing
python3 -m venv ./env
source ./env/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

if test -f "nohup.out" ; then
    rm nohup.out
fi

nohup uvicorn src.main:app &

# run backend
cd ~/project/the-foobar-fighters/GSEngage2022-TheFoobarFighters/backend

if ! test -f ".env" ; then
    cp .env.example .env
    vi .env

fi

if test -f "nohup.out" ; then
    rm nohup.out
fi

nohup mvn spring-boot:run &

# run frontend
cd ~/project/the-foobar-fighters/GSEngage2022-TheFoobarFighters/frontend
npm install

if test -f "nohup.out" ; then
    rm nohup.out
fi

npm run-script build
npm run start