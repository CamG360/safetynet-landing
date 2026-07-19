/**
 * DemoTimer — client-side countdown for the SafetyNet interactive demo.
 * Each real tick of 100ms consumes (100ms × speed) of virtual time,
 * so speed=60 makes 10 real seconds feel like 10 minutes of product time.
 */
export class DemoTimer {
    static #TICK = 100;
    #id = null;
    #remaining;
    #speed = 1;
    #onTick;
    #onComplete;

    constructor({ totalMs, onTick, onComplete }) {
        this.totalMs = totalMs;
        this.#remaining = totalMs;
        this.#onTick = onTick;
        this.#onComplete = onComplete;
    }

    start() {
        if (this.#id) return;
        this.#id = setInterval(() => {
            this.#remaining -= DemoTimer.#TICK * this.#speed;
            if (this.#remaining <= 0) {
                this.#remaining = 0;
                this.stop();
                this.#onTick(0);
                this.#onComplete();
            } else {
                this.#onTick(this.#remaining);
            }
        }, DemoTimer.#TICK);
    }

    stop() {
        clearInterval(this.#id);
        this.#id = null;
    }

    setSpeed(multiplier) {
        this.#speed = multiplier;
    }

    skip() {
        this.stop();
        this.#remaining = 0;
        this.#onTick(0);
        this.#onComplete();
    }

    reset() {
        this.stop();
        this.#remaining = this.totalMs;
        this.#speed = 1;
    }

    get remaining() { return this.#remaining; }
    get progress() { return 1 - (this.#remaining / this.totalMs); }
}
