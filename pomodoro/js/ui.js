class UI {
    constructor(timer) {
        this.timer = timer;
        this.bindEvents();
    }

    bindEvents() {
        document.getElementById('start').addEventListener('click', () => {
            this.timer.start();
        });

        document.getElementById('pause').addEventListener('click', () => {
            this.timer.pause();
        });

        document.getElementById('reset').addEventListener('click', () => {
            this.timer.reset();
        });

        document.getElementById('refreshQuote').addEventListener('click', () => {
            this.timer.motivationManager.updateMotivationText();
        });
    }
} 