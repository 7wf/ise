/**
 * A logger transport.
 */
export abstract class Transport {
    /**
     * Transports a message.
     */
    public abstract message(message: TransportMessage): any
}

/**
 * A transported message.
 */
export interface TransportMessage {
    level: string
    message: string
    [key: string]: any
}
