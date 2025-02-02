class Settings {
    constructor(timer) {
        this.timer = timer;
        this.modal = document.getElementById('settingsModal');
        this.customTimeInput = document.getElementById('customTime');
        this.settings = {
            notifications: true,
            sound: true,
            autoStartBreaks: false
        };
        
        this.loadSettings();
        this.bindEvents();
    }

    loadSettings() {
        const savedSettings = localStorage.getItem('pomodoro-settings');
        if (savedSettings) {
            this.settings = JSON.parse(savedSettings);
        }
    }

    saveSettings() {
        // Get the custom time value
        let minutes = parseInt(this.customTimeInput.value);
        
        // Validate input
        if (isNaN(minutes) || minutes < 1) {
            minutes = 1;
        } else if (minutes > 180) {
            minutes = 180;
        }
        
        // Save settings to localStorage
        this.settings.duration = minutes;
        localStorage.setItem('pomodoro-settings', JSON.stringify(this.settings));
        
        // Update timer
        this.timer.reset(minutes);
        this.closeModal();
    }

    bindEvents() {
        // Open modal
        document.getElementById('settings-btn').addEventListener('click', () => {
            this.openModal();
        });

        // Close modal
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        // Close on outside click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Save settings
        document.getElementById('saveSettings').addEventListener('click', () => {
            this.saveSettings();
        });

        // Prevent dragging when interacting with inputs
        this.customTimeInput.addEventListener('mousedown', (e) => {
            e.stopPropagation();
        });
    }

    openModal() {
        // Set current timer value
        const currentMinutes = Math.ceil(this.timer.timeLeft / 60);
        this.customTimeInput.value = currentMinutes;
        this.modal.style.display = 'block';
    }

    closeModal() {
        this.modal.style.display = 'none';
    }
} 