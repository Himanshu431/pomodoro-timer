class MotivationManager {
    constructor() {
        this.quotes = [
            "Every small step you take brings you closer to your goal. Keep moving forward!",
            "Success is built on consistency, not just motivation. Show up every day!",
            "Believe in yourself—you're capable of achieving more than you think.",
            "The only way to fail is to stop trying. Keep going!",
            "Hard work beats talent when talent doesn't work hard.",
            "Growth begins at the edge of your comfort zone. Take the leap!",
            "Be patient. Great things take time, but they are worth the wait.",
            "Your dreams are valid—go chase them!",
            "Don't let yesterday's failures stop today's progress.",
            "Progress, not perfection. Keep improving!",
            "Tough times don't last, but tough people do.",
            "The struggle you're in today is building the strength you need tomorrow.",
            "Every setback is a setup for a comeback!",
            "You've overcome challenges before, and you'll do it again.",
            "Mistakes are proof that you're trying. Learn and move forward!",
            "Difficult roads often lead to beautiful destinations.",
            "You are stronger than your excuses.",
            "Problems are not stop signs; they are guidelines.",
            "When you feel like quitting, remember why you started.",
            "Failure is not the opposite of success—it's part of it!",
            "You are enough, just as you are.",
            "Stop doubting yourself and start believing in what you can do.",
            "You are your only limit—break free!",
            "Confidence is not about having all the answers but believing you can find them.",
            "Trust yourself; you've got this!",
            "The world needs your unique talents—don't hide them.",
            "If you can dream it, you can achieve it.",
            "Don't compare your chapter 1 to someone else's chapter 20.",
            "Your potential is endless. Keep pushing forward!",
            "Keep shining—your light inspires others.",
            "Today is a new opportunity—make the most of it!",
            "Small daily improvements lead to big results.",
            "Discipline will take you where motivation can't.",
            "The best investment you can make is in yourself.",
            "What you do today determines your future.",
            "Replace excuses with effort and doubt with determination.",
            "One hour of focus today can bring years of success tomorrow.",
            "Do something today that your future self will thank you for.",
            "Take the risk or lose the chance!",
            "Your time is valuable—use it wisely.",
            "Choose joy—happiness is a daily decision.",
            "Focus on what you can control, and let go of what you can't.",
            "A grateful heart attracts more to be grateful for.",
            "Surround yourself with positivity, and watch your life change.",
            "Smile—it's the simplest way to spread kindness!",
            "You attract what you think about, so think positive!",
            "Every day may not be good, but there's something good in every day.",
            "Kindness is free—spread it everywhere!",
            "Don't wait for the perfect moment—create it!",
            "You are destined for greatness—believe in yourself!"
        ];
        this.element = document.getElementById('motivationText');
        this.updateInterval = 5 * 60 * 1000; // 5 minutes
        this.lastQuoteTime = 0;
        this.bindEvents();
    }

    bindEvents() {
        this.element.addEventListener('dblclick', () => {
            this.updateMotivationText();
        });
    }

    getRandomLocalQuote() {
        const currentQuote = this.element.textContent;
        let newQuote;
        // Ensure we don't get the same quote twice in a row
        do {
            newQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        } while (newQuote === currentQuote && this.quotes.length > 1);
        
        return newQuote;
    }

    async updateMotivationText() {
        const now = Date.now();
        if (now - this.lastQuoteTime >= 1000) { // Prevent spam clicking (1 second cooldown)
            this.element.classList.remove('animate');
            
            let quote = this.getRandomLocalQuote();
            
            // Add animation
            setTimeout(() => {
                this.element.textContent = quote;
                this.element.classList.add('animate');
            }, 100);

            this.lastQuoteTime = now;
        }
    }

    startPeriodicUpdates() {
        // Update immediately on start
        this.updateMotivationText();
        
        // Then check every 5 minutes
        setInterval(() => this.updateMotivationText(), this.updateInterval);
    }
} 