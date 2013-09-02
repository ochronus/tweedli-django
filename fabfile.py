from fabric.api import task, env, run

env.user = 'csaba'
env.hosts = ['base.mostof.it']


@task
def hello():
    run("echo hmm")
