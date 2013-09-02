from fabric.api import *

env.user = 'csaba'
env.hosts = ['base.mostof.it']

@task
def hello():
    run("echo hmm")