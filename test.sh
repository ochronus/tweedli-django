#!/bin/sh
set -e
flake8 --exclude=virtualenv --ignore=E501 .
python manage.py test