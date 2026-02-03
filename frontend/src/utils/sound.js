// Simple synthesized sounds using Web Audio API to avoid external assets
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export const playSuccessSound = () => {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
    oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1); // A5

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5);
};

export const playTimerCompleteSound = () => {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    // Double beep
    const beep = (time) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(880, time);
        gain.gain.setValueAtTime(0.05, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
        osc.start(time);
        osc.stop(time + 0.1);
    }

    beep(audioCtx.currentTime);
    beep(audioCtx.currentTime + 0.15);
    beep(audioCtx.currentTime + 0.3);
};
