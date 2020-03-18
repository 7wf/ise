import { Ise } from '../lib'

import ProxyTransport from './utils/proxy-transport'

describe('Ise', () => {
    /**
     * `new Ise()` comes without transports.
     */
    it('`new Ise()` should initialize a logger without transports', () => {
        const logger = new Ise()

        expect(logger.transports).toStrictEqual([])
    })

    /**
     * Loggers accept transports.
     */
    it('should accept new transports', () => {
        const emptyProxy = new ProxyTransport(() => 0)
        const logger = new Ise({
            transports: [emptyProxy]
        })

        expect(logger.transports.length).toBe(1)

        logger.use(emptyProxy)
        expect(logger.transports.length).toBe(2)
    })

    /**
     * The parameter `message` is required.
     */
    it('should not accept `level`-only messages', () => {
        const logger = new Ise()

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore - JavaScript
        expect(() => logger.log('info')).toThrowError(/required/)
    })

    /**
     * Loggers sends messages to your `transports`.
     */
    it('should transport messages to transports', (done: jest.DoneCallback) => {
        const logger = new Ise()
        const proxy = new ProxyTransport(({ message }) => {
            expect(message).toBe('hello')
            done()
        })

        logger.use(proxy)
        logger.log('info', 'hello')
    })

    /**
     * `logger.info` & transports accept objects as parameter.
     */
    it('must accept a object instead of a string in the message parameter', (done: jest.DoneCallback) => {
        const logger = new Ise()
        const proxy = new ProxyTransport(({ message, timestamp }) => {
            expect(message).toBe('hello')
            expect(timestamp).toBeLessThanOrEqual(Date.now())
            done()
        })

        logger.use(proxy)
        logger.log('info', {
            message: 'hello',
            timestamp: Date.now()
        })
    })
})
