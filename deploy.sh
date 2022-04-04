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
sudo apt update && sudo apt upgrade -y
sudo apt install software-properties-common apt-transport-https -y
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt-get update
sudo apt install default-jdk -y
export PATH=$PATH:/usr/lib/jvm/java-11-openjdk-amd64/bin
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
export TANGO_HOST=code-server-instance-901-5ccffd655-jljwd:10000
sudo apt-get install maven
sudo apt-get install python3.8
sudo apt-get install python3-pip 
sudo apt-get install python3.8-venv

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion:q
nvm --version
nvm install 16.14.2
nvm use --delete-prefix v16.14.2 --silent
sudo apt-get install npm

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

npm run build
nohup npm run start &