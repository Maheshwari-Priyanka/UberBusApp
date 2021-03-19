from flask import Flask, flash, request, jsonify, render_template, redirect, url_for, g, session, send_from_directory, abort
from flask_cors import CORS
from flask_api import status
from datetime import date, datetime, timedelta
from calendar import monthrange
from dateutil.parser import parse
import pytz
import os
import sys
import time
import uuid
import json
import random
import string
import pathlib
import io
from uuid import UUID
from bson.objectid import ObjectId
import urllib.parse

# straight mongo access
from pymongo import MongoClient

username = urllib.parse.quote_plus('admin')
password = urllib.parse.quote_plus('Csye@7220')

# mongo
#mongo_client = MongoClient('mongodb://localhost:27017/')
mongo_client = MongoClient("mongodb+srv://%s:%s@uberapp.hvf8i.mongodb.net/uber?retryWrites=true&w=majority" % (username, password))

app = Flask(__name__)
CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))

# Here are my datasets
uber = dict()      

#Database
Database = mongo_client.get_database('uber')

#Table
users = Database.users
buses = Database.buses
bookings = Database.bookings

################
# Apply to mongo
################

def atlas_connect():
    # Node
    # const MongoClient = require('mongodb').MongoClient;
    # const uri = "mongodb+srv://admin:<password>@tweets.8ugzv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    # const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    # client.connect(err => {
    # const collection = client.db("test").collection("devices");
    # // perform actions on the collection object
    # client.close();
    # });

    # Python
    client = pymongo.MongoClient("mongodb+srv://admin:"+urllib.quote("Csye@7220") + "@uberapp.hvf8i.mongodb.net/uber?retryWrites=true&w=majority")
    db = client.test


# database access layer
def insert_one(r):
    start_time = datetime.now()
    with mongo_client:
        #start_time_db = datetime.now()
        db = mongo_client['uber']
        #microseconds_caching_db = (datetime.now() - start_time_db).microseconds
        #print("*** It took " + str(microseconds_caching_db) + " microseconds to cache mongo handle.")

        print("...insert_one() to mongo: ", r)
        try:
            mongo_collection = db['busBookingCollection']
            result = mongo_collection.insert_one(r)
            print("inserted _ids: ", result.inserted_id)
        except Exception as e:
            print(e)

    microseconds_doing_mongo_work = (datetime.now() - start_time).microseconds
    print("*** It took " + str(microseconds_doing_mongo_work) + " microseconds to insert_one.")

## seconds since midnight
def ssm():
    now = datetime.now()
    midnight = now.replace(hour=0, minute=0, second=0, microsecond=0)
    return str((now - midnight).seconds)


################################################
# UberApp 
################################################


# endpoint to signin user 
@app.route("/busapp/signin", methods=["GET"])
def signin():

    # email = request.json['email']
    # password = request.json['password']

    email = "vanga@email.com"
    password = "passwordTest"

    queryObject = {"email":email}
    query = users.find_one(queryObject)
    print("find user: ", query)
    result = {}
    
    if query == None:
        result = {"message": "Email not found"}
        return jsonify(result), 400
    else:
        query.pop('_id')
        if query['email'] != email:
            return jsonify({"message": "Incorrect email ID"}), 400
        elif query['password'] != password:
            return jsonify({"message": "Incorrect password"}), 400
        else:
            return jsonify({"message": "Successful login"}), 200


# endpoint to add new user
@app.route("/busapp/signup", methods=["GET","POST"])
def signup():
    # firstname = request.json['firstname']
    # lastname = request.json['lastname']
    # email = request.json['email']
    # password = request.json['password']

    firstname = "priyanka"
    lastname = "maheshwari"
    email = "priyanka@email.com"
    password = "passwordTest1"

    result = {}
    queryObject = {"email":email}
    user = users.find_one(queryObject)

    if user != None:
        return jsonify({"message": "User already exists. Signup with different email address"}), 400
    else:
        uber_user = {'_id':str(ObjectId()),
                'firstname':firstname, 
                 'lastname':lastname, 
                 'email': email,
                'password':password 
                }

        query = users.insert_one(uber_user)
        print("query insert user ", query)
    
        if query:
            return jsonify({"message": "User added successfully"}), 200
        else:
            return jsonify({"message": "Error adding user"+ query}), 400
    
    # return jsonify(result), 201


# endpoint to show all buses 
@app.route("/busapp/getbuses", methods=["GET"])
def get_buses():
    query = buses.find()
    result = {}
    if query == None:
        return jsonify({"message": "No Buses found"}), 400
    output = {} 
    i = 0
    for x in query: 
        output[i] = x 
        output[i].pop('_id') 
        i += 1
    print("output: ", output)
    return jsonify(output), 200

# endpoint to add new booking
@app.route("/busapp/addbooking", methods=["GET","POST"])
def addbooking():
    # source = request.json['source']
    # destination = request.json['destination']
    # date = request.json['date']
    # bus = request.json['bus']
    # time = request.json['time']
    # userID = request.json['userID']

    source = "Boston"
    destination = "new york"
    date = "date"
    bus = "bus1"
    time = "time"
    userID = "1"

    result = {}
    
    booking = {'_id':str(ObjectId()),
                'userID': userID,
                'source':source, 
                 'destination':destination, 
                 'date': date,
                'bus':bus,
                'time': time 
                }

    query = bookings.insert_one(booking)
    print("query insert booking ", query)
    
    if query:
        return jsonify({"message": "Booking added successfully"}), 200
    else:
        return jsonify({"message": "Error adding new booking"+ query}), 400

# endpoint to show all bookings 
@app.route("/busapp/getbookings", methods=["GET"])
def get_bookings():
    # userID = request.jsonify['userID']
    userID = '1'

    query = bookings.find({'userID': userID})
    result = {}
    if query == None:
        return jsonify({"message": "No bookings found"}), 400
    output = {} 
    i = 0
    for x in query: 
        output[i] = x 
        output[i].pop('_id') 
        i += 1
    print("output: ", output)
    return jsonify(output), 200


################################################
# Mock
################################################
@app.route("/")
def home(): 
    return """Welcome to online mongo/UberApp testing ground!<br />
        <br />
        Run the following endpoints:<br />
        From collection:<br/>
        http://localhost:5000/busapp/signin<br />
        http://localhost:5000/busapp/signup<br />
        http://localhost:5000/busapp/getbuses<br />
        http://localhost:5000/busapp/addbooking<br />
        http://localhost:5000/busapp/getbookings<br />"""


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')