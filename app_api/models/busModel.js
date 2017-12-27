var mongoose = require('mongoose');

var driverSchema = new mongoose.Schema({
    name: String,
    phone: String
});
var dirSchema = new mongoose.Schema({
    loc_name: String,
    date: Date
});

var transportsSchema = new mongoose.Schema({
	busNumber: String,
	companyName: String,
	fromDirection: String,
	toDirection: String,
	fromDate: Date,
	toDate: Date,
	cameDate: Date,
	drivers: [driverSchema],
	directions: [dirSchema],
	distance: Number,
	late: Boolean,
	speed: Boolean,
	change: Boolean
});

mongoose.model('Buss', transportsSchema, 'transports');

/*
db.transports.insert({
busNumber: '1111УНА',
companyName: 'Буянт огоо',
fromDirection: 'Чойр',
toDirection: 'Улаанбаатар',
fromDate: ISODate("2017-12-22T06:40:03.389Z"),
toDate: ISODate("2017-12-20T12:40:03.389Z"),
cameDate: null,
drivers: [{
    name: 'Лодой',
    phone: '99776655',
    },
    {
    name: 'Бат',
    phone: '88773344',
    }],
distance: 230,
velocity: null,
late: null,
speed: null,
change: null
});


*/