import kleur, { Color } from 'kleur'

import { Writable } from 'stream'

import { Transport, TransportMessage } from '../transport'

// utility function
const padStartTwoZeros = (number: number) => number.toString().padStart(2, '0')

/**
 * The default color set used inside the console transport.
 */
export const DEFAULT_COLORS: ConsoleTransportColorMap = {
    info: kleur.cyan,
    debug: kleur.magenta,
    warn: kleur.yellow,
    error: kleur.red().underline
}

/**
 * The console transport.
 */
export class ConsoleTransport extends Transport {
    /**
     * The output stream.
     */
    public stream: Writable

    /**
     * The colors used in certain levels.
     */
    public colors: ConsoleTransportColorMap

    /**
     * Whether to use timestamps or not.
     */
    public displayTimestamps: boolean

    /**
     * Initializes the console transport.
     */
    public constructor(options?: ConsoleTransportOptions) {
        super()

        this.stream = (options && options.stream) || process.stdout
        this.colors = (options && options.colors) || DEFAULT_COLORS
        this.displayTimestamps = (options && options.timestamp) || true
    }

    /**
     * Generate a beautiful timestamp from a date.
     */
    protected timestamp(date: Date) {
        return `${padStartTwoZeros(date.getHours())}:${padStartTwoZeros(date.getMinutes())}:${padStartTwoZeros(
            date.getSeconds()
        )}`
    }

    /**
     * Transports a message to the console.
     */
    public message(transport: TransportMessage) {
        const color: Color = this.colors[transport.level] || kleur.gray
        const label = color(transport.level)

        let message = `${label} ${transport.message}`

        if (this.displayTimestamps) {
            const now = new Date()
            const timestamp = this.timestamp(now)

            message = `${kleur.gray(timestamp)} ${message}`
        }

        this.stream.write(`${message}\n`)
    }
}

/**
 * The options for the console transport.
 */
export interface ConsoleTransportOptions {
    /**
     * The output stream.
     */
    stream?: Writable

    /**
     * The color map for levels.
     */
    colors?: ConsoleTransportColorMap

    /**
     * If `true`, the timestamp will be prefixed at messages.
     */
    timestamp?: boolean
}

/**
 * The console transport color map defaults.
 */
export type ConsoleTransportColorMap = {
    [key: string]: Color
}
