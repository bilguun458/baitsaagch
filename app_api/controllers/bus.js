var mongoose = require('mongoose');
var busModel = mongoose.model('Buss');

//placeholder funcs
var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

//transportuudiin medeeleluud жагсаалтаар буцаах GET хүсэлт
module.exports.transportsListRead = function(req, res) {
	if (req.params && req.params.dir) {
		busModel
		.find( {"cameDate" : null, $where: "this.toDirection == '" + req.params.dir + "'" } )
		.sort({toDate: 1})
		.select('busNumber fromDirection toDirection toDate cameDate directions')
		.exec(function(err, transport) {
			if (!transport) {
				sendJsonResponse(res, 404, {
					"message": "transports not found"
				});
				return;
			} else if (err) {
				sendJsonResponse(res, 404, err);
				return;
			}
			sendJsonResponse(res, 200, transport);
		});
	} else {
		sendJsonResponse(res, 404, {
			"message": "No direction in request"
		});
	}
};
//нэг transportiin medeelel буцаах GET хүсэлт
module.exports.transportRead = function(req, res) {
	if (req.params && req.params.bus_id) {
		busModel
		.findById(req.params.bus_id)
		//.select('busNumber fromDirection toDirection toDate')
		.exec(function(err, transport) {
			if (!transport) {
				sendJsonResponse(res, 404, {
					"message": "transport not found"
				});
				return;
			} else if (err) {
				sendJsonResponse(res, 404, err);
				return;
			}
			sendJsonResponse(res, 200, transport);
		});
	} else {
		sendJsonResponse(res, 404, {
			"message": "No bus number in request"
		});
	}
};
//Ирсэн цаг(cameDate)-ийг update хийх put хүсэлт
module.exports.transportUpdateCameDate = function(req, res) {
	if (req.params && req.params.bus_id && req.params.late && req.params.speed && req.params.change) {
		busModel
		.findById(req.params.bus_id)
		//.select('busNumber fromDirection toDirection toDate')
		.exec(function(err, transport) {
			if (!transport) {
				sendJsonResponse(res, 404, {
					"message": "transport not found"
				});
				return;
			} else if (err) {
				sendJsonResponse(res, 404, err);
				return;
			}
			transport.cameDate = Date.now();//Odoogiin date
			transport.late = req.params.late;
			transport.speed = req.params.speed;
			transport.change = req.params.change;
			transport.save(function(err, transport) {
				if (err) {
					sendJsonResponse(res, 404, err);
				} else {
					sendJsonResponse(res, 200, transport);
				}
			});
		});
	} else {
		sendJsonResponse(res, 404, {
			"message": "No bus number or came date in request"
		});
	}
};
//Андуурч автобус ирсэн гэсэн мэдээлэл оруулсан тохиолдолд буцаах функц
module.exports.transportUpdateMistake = function(req, res) {
	if (req.params && req.params.bus_id) {
		busModel
		.findById(req.params.bus_id)
		//.select('busNumber fromDirection toDirection toDate')
		.exec(function(err, transport) {
			if (!transport) {
				sendJsonResponse(res, 404, {
					"message": "transport not found"
				});
				return;
			} else if (err) {
				sendJsonResponse(res, 404, err);
				return;
			}
			transport.cameDate = null;//null date
			transport.save(function(err, transport) {
				if (err) {
					sendJsonResponse(res, 404, err);
				} else {
					sendJsonResponse(res, 200, transport);
				}
			});
		});
	} else {
		sendJsonResponse(res, 404, {
			"message": "No bus number or came date in request"
		});
	}
};
//conf medeelel буцаах GET хүсэлт
module.exports.getConf = function(req, res) {
	busModel
	.find({"cameDate" : null})
	//.count()
	.exec(function(err, transport) {
		if (!transport) {
			sendJsonResponse(res, 404, {
				"message": "transports not found"
			});
			return;
		} else if (err) {
			sendJsonResponse(res, 404, err);
			return;
		}
		sendJsonResponse(res, 200, transport);
	});
};