# # sudo rm /etc/apt/sources.list
# # sudo apt install libseccomp2.4
# # sudo apt-get remove docker docker-engine docker.io containerd runc

# sudo -E apt-get update
# sudo -E apt-get install \
#     ca-certificates \
#     curl \
#     gnupg \
#     lsb-release
# sudo -E apt install apt-transport-https ca-certificates curl software-properties-common
# curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
# sudo -E add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"


# # curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# echo \
#   "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
#   $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# curl -O https://download.docker.com/linux/debian/dists/buster/pool/stable/amd64/containerd.io_1.4.3-1_amd64.deb
# sudo -E apt-get update
# sudo apt install -t buster-backports iptables
# sudo -E apt install ./containerd.io_1.4.3-1_amd64.deb
# sudo -E apt-get install docker-ce docker-ce-cli

# curl -o- https://download.docker.com/linux/ubuntu/dists/focal/stable/binary-s390x/
# sudo dpkg -i /path/to/package.deb

# curl -fsSL https://get.docker.com -o get-docker.sh
# sh ./get-docker.sh
# curl -v https://download.docker.com/linux/ubuntu/

# sudo apt-get update
# curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
# sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
# sudo apt-get update
# apt-cache policy docker-ce
# sudo apt-get install -y docker-ce
# sudo service docker start
# sudo service docker status

#=====
# sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose

# sudo chmod +x /usr/local/bin/docker-compose

# docker-compose version

# sudo apt update
# sudo apt install apt-transport-https ca-certificates curl software-properties-common
# curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
# sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
# apt-cache policy iptables
# sudo apt-get update
# sudo apt install docker-ce

wget https://download.docker.com/linux/ubuntu/gpg
apt-key add gpg
sudo apt-key fingerprint 0EBFCD88
sudo apt install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo add-apt-repository "deb [arch=amd64] http://cz.archive.ubuntu.com/ubuntu focal main "
sudo apt update
sudo apt-get install iptables
sudo apt install docker-ce