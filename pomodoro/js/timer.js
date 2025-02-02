class Timer {
    constructor() {
        this.timeLeft = 25 * 60;
        this.isRunning = false;
        this.interval = null;
        this.motivationManager = new MotivationManager();
        this.motivationManager.startPeriodicUpdates();
        this.updateDisplay();
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.interval = setInterval(() => {
                this.tick();
            }, 1000);
        }
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.interval);
    }

    reset(minutes = 25) {
        this.timeLeft = minutes * 60;
        this.isRunning = false;
        clearInterval(this.interval);
        this.updateDisplay();
    }

    tick() {
        if (this.timeLeft > 0) {
            this.timeLeft--;
            this.updateDisplay();
            
            // Check if it's time to update motivation (every 5 minutes)
            if (this.timeLeft % 300 === 0) {
                this.motivationManager.updateMotivationText();
            }
        } else {
            this.complete();
        }
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timer').textContent = display;
    }

    complete() {
        this.pause();
        const { ipcRenderer } = require('electron');
        ipcRenderer.send('timer-complete');
    }
} 