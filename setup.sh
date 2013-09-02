#!/bin/sh

set -e

rm -rf virtualenv || true
virtualenv --distribute --no-site-packages -p python2.7 virtualenv
. virtualenv/bin/activate
pip install -r requirements.txt