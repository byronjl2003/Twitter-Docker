from fabric.api import cd, env, lcd, put, prompt, local, sudo
from fabric.contrib.files import exists

env.hosts=['35.223.237.237']
env.user='root'

def pull():
    if exists('Twitter-Docker'):
        sudo('rm -r Twitter-Docker')
    sudo('git clone https://github.com/jorged104/Twitter-Docker ')
    with cd('Twitter-Docker'):
        sudo('git checkout develop')
        sudo('kubectl apply -f .')

    
    