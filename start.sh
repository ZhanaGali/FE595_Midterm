#!/bin/bash

gunicorn -w 5 --bind 0.0.0.0:8080 wsgi