import { Transport, TransportMessage } from '../../lib'

/**
 * The handler for messages of the proxy transport.
 */
export type MessageHandler = (message: TransportMessage) => any

/**
 * A transport that acts like a proxy.
 */
export default class ProxyTransport extends Transport {
    /**
     * The message handler.
     */
    public messageHandler: MessageHandler

    /**
     * Initializes a new transport.
     */
    public constructor(messageHandler: MessageHandler) {
        super()
        this.messageHandler = messageHandler
    }

    /**
     * Proxies the incoming message to a message handler.
     */
    public message(message: TransportMessage) {
        this.messageHandler(message)
    }
}
