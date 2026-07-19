/**
 * SafetyNet Interactive Demo — State Machine
 *
 * States: SETUP → READY → ACTIVE → GRACE → ALERT_FIRED
 *                                         ↘ CHECKED_IN
 *
 * All state lives in memory. No backend calls. No auth.
 * CTA redirects to /?early-access=1 which opens the registration modal.
 */

import { DemoTimer } from './demo-timer.js';

const STATE = {
    SETUP:    'setup',
    READY:    'ready',
    ACTIVE:   'active',
    GRACE:    'grace',
    ALERT:    'alert',
    CHECKIN:  'checkin',
};

// Which numbered step (1-3) each state belongs to
const STEP_MAP = {
    setup: 1, ready: 1,
    active: 2, grace: 2,
    alert: 3, checkin: 3,
};

const MAIN_MS  = 10_000;
const GRACE_MS =  5_000;
const RING_CIRC = 339; // 2π × 54 (SVG circle r=54)

let current = STATE.SETUP;
let mainTimer = null;
let graceTimer = null;

// ─── Tiny DOM helpers ────────────────────────────────────────────────────────

const $ = id => document.getElementById(id);

function showScreen(name) {
    document.querySelectorAll('.demo-screen').forEach(el => el.classList.add('hidden'));
    const el = $(`screen-${name}`);
    if (el) el.classList.remove('hidden');
}

function updateSteps(step) {
    document.querySelectorAll('.demo-step').forEach((el, i) => {
        const n = i + 1;
        el.classList.toggle('step-active', n === step);
        el.classList.toggle('step-done', n < step);
    });
}

function transition(next) {
    current = next;
    showScreen(next);
    updateSteps(STEP_MAP[next]);
}

// ─── Timer UI ────────────────────────────────────────────────────────────────

function fmtMs(ms) {
    const s = Math.ceil(ms / 1000);
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${String(sec).padStart(2, '0')}`;
}

function onMainTick(remaining) {
    const timeEl = $('countdownTime');
    const ringEl = $('ringProgress');
    const warnEl = $('activeWarning');

    if (timeEl) timeEl.textContent = fmtMs(remaining);

    if (ringEl) {
        const offset = RING_CIRC * (1 - remaining / MAIN_MS);
        ringEl.style.strokeDashoffset = offset;
        const urgent = remaining <= 3000;
        ringEl.style.stroke = urgent ? '#ef4444' : '#0d9488';
        if (timeEl) timeEl.style.color = urgent ? '#ef4444' : '#0f172a';
    }

    if (warnEl) {
        warnEl.classList.toggle('hidden', remaining > 3000);
    }
}

function onGraceTick(remaining) {
    const el = $('graceTime');
    if (el) el.textContent = Math.ceil(remaining / 1000);
}

// ─── Transitions ─────────────────────────────────────────────────────────────

function doCreate() {
    transition(STATE.READY);
    track('demo_ready');
}

function doStart() {
    transition(STATE.ACTIVE);
    onMainTick(MAIN_MS);
    mainTimer = new DemoTimer({ totalMs: MAIN_MS, onTick: onMainTick, onComplete: startGrace });
    mainTimer.start();
    track('demo_started');
}

function startGrace() {
    transition(STATE.GRACE);
    onGraceTick(GRACE_MS);
    graceTimer = new DemoTimer({ totalMs: GRACE_MS, onTick: onGraceTick, onComplete: fireAlert });
    graceTimer.start();
}

function fireAlert() {
    transition(STATE.ALERT);
    track('demo_alert_fired');
}

function doCheckin() {
    if (mainTimer) { mainTimer.stop(); mainTimer = null; }
    if (graceTimer) { graceTimer.stop(); graceTimer = null; }
    transition(STATE.CHECKIN);
    track('demo_checkedin');
}

function doRestart() {
    if (mainTimer) { mainTimer.stop(); mainTimer = null; }
    if (graceTimer) { graceTimer.stop(); graceTimer = null; }
    resetSpeedButtons();
    transition(STATE.SETUP);
}

function doGetAccess() {
    track('demo_cta_clicked');
    window.location.href = '/?early-access=1';
}

// ─── Speed controls ───────────────────────────────────────────────────────────

function resetSpeedButtons() {
    document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
    const x1 = document.querySelector('.speed-btn[data-speed="1"]');
    if (x1) x1.classList.add('active');
}

function setSpeed(val) {
    if (!mainTimer) return;
    if (val === 'skip') {
        mainTimer.skip();
        return;
    }
    const n = Number(val);
    mainTimer.setSpeed(n);
    document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
    const active = document.querySelector(`.speed-btn[data-speed="${val}"]`);
    if (active) active.classList.add('active');
}

// ─── Snooze (demo: fires after 2s regardless) ────────────────────────────────

function doSnooze() {
    const noteEl = $('snoozeNote');
    if (noteEl) noteEl.classList.remove('hidden');
    if (graceTimer) { graceTimer.stop(); graceTimer = null; }
    graceTimer = new DemoTimer({ totalMs: 2000, onTick: onGraceTick, onComplete: fireAlert });
    graceTimer.start();
}

// ─── Plausible ────────────────────────────────────────────────────────────────

function track(name) {
    if (typeof window.plausible === 'function') window.plausible(name);
}

// ─── Boot ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Screen buttons
    $('btnCreate')?.addEventListener('click', doCreate);
    $('btnEdit')?.addEventListener('click', () => transition(STATE.SETUP));
    $('btnStart')?.addEventListener('click', doStart);
    $('btnCheckin')?.addEventListener('click', doCheckin);
    $('btnSnooze')?.addEventListener('click', doSnooze);

    // Multiple restart + get-access buttons across screens
    document.querySelectorAll('.btn-restart').forEach(btn => btn.addEventListener('click', doRestart));
    document.querySelectorAll('.btn-get-access').forEach(btn => btn.addEventListener('click', doGetAccess));

    // Speed controls
    document.querySelectorAll('.speed-btn').forEach(btn => {
        btn.addEventListener('click', () => setSpeed(btn.dataset.speed));
    });

    // Init
    showScreen(STATE.SETUP);
    updateSteps(1);
});
