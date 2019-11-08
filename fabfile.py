from fabric.api import cd, env, lcd, put, prompt, local, sudo
from fabric.contrib.files import exists

env.hosts=['35.223.237.237']
env.user='root'


def  install():
        sudo('uname -s')