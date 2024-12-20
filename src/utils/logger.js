import Winston, { createLogger, format, transports} from "winston";
//import { SyslogConfigSetLevels } from "winston/lib/winston/config"; //Logform, config, ogger


const LOG_DIRECTORY_PATH = "./LOGS/";
const LOG_EXTENSION = ".log";

/**
 * @note transports.File creates the files for you if they don't exists
 */
const getTransportsFile = (level) => {
    return new transports.File({
        filename: LOG_DIRECTORY_PATH + level + LOG_EXTENSION,
        level: level,
        format: format.combine(
            format((info, opts) => info.level === level ? info : false)(), //[ref] to be able to transport logs to specific files per levels 
            format.timestamp(), 
            format.json()
        )
    })
}

const CustomLevelsObj = {
    notice: 1,
    info: 2,
    debug: 3,
    alert: 4,
    warning: 5,
    error: 6,
}

/**
 * @ref https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/
 */
export const LOGGER = createLogger({
    levels: CustomLevelsObj,
    level: "debug",
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        new transports.Console(),
        getTransportsFile("alert"),
        getTransportsFile("info"),
        getTransportsFile("error"),
        getTransportsFile("debug"),
        getTransportsFile("notice"),
        getTransportsFile("warning"),
    ]
});