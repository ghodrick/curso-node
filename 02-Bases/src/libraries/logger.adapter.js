const winston = require("winston");

const {combine, timestamp, json} = winston.format;

const logger = winston.createLogger({
	level: "info",
	format: combine(timestamp(), json()),
	transports: [
		//
		// - Write all logs with importance level of `error` or less to `error.log`
		// - Write all logs with importance level of `info` or less to `combined.log`
		//
		new winston.transports.File({ filename: "error.log", level: "error" }),
		new winston.transports.File({ filename: "combined.log" }),
	],
});

// logger.add(
// 	new winston.transports.Console({
// 		format: winston.format.simple(),
// 	}),
// );

function buildLogger(service) {
	return {
		log: (message) => {
			logger.log("info", { message, service });
		},
        error: (message) => {
            logger.error('error', {
                message, 
                service
            })
        }
	};
};

module.exports = {
	buildLogger,
	logger
};
