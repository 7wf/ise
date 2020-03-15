import { Transport } from './transport'

/**
 * The message logger.
 */
export class Ise {
    /**
     * The transports of this logger.
     */
    public transports: Transport[]

    /**
     * Initializes a new logger.
     */
    public constructor(options?: LoggerOptions) {
        this.transports = (options && options.transports) || []
    }

    /**
     * Uses a new transport.
     */
    public use(transport: Transport) {
        this.transports.push(transport)
    }

    /**
     * Logs a message.
     */
    public log(level: string, message: string | MessageOptions): Ise {
        if (!message) throw new Error('The argument `message` is required to transport messages.')

        this.transports.map((transport: Transport) => {
            if (typeof message === 'string') {
                transport.message({ level, message })
            } else {
                transport.message({ level, ...message })
            }
        })

        return this
    }
}

/**
 * The logger options.
 */
export interface LoggerOptions {
    /**
     * The transports for this logger.
     */
    transports?: Transport[]
}

/**
 * The options for logging messages.
 */
export interface MessageOptions {
    /**
     * The message to be logged.
     */
    message: string

    // For extra options.
    [key: string]: any
}
