#!/bin/bash

# assuming Python 3.7.3
sudo apt update

# install pip
sudo apt install python3-pip

# install python packages
cd data_processing
pip3 install -r requirements.txt
# add uvicorn to path
export PATH="/home/coder/.local/bin:$PATH"

# assuming Node v10.24.0
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
# rm -r node_modules
npm install next react react-dom
npm audit fix