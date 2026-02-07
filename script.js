class ClickGame {
    constructor() {
        this.score = 0;
        this.timeRemaining = 30;
        this.gameActive = false;
        this.timerInterval = null;
        this.stars = new Set();

        this.startBtn = document.getElementById('startBtn');
        this.gameArea = document.getElementById('gameArea');
        this.scoreDisplay = document.getElementById('score');
        this.timerDisplay = document.getElementById('timer');
        this.gameOverModal = document.getElementById('gameOverModal');
        this.finalScoreDisplay = document.getElementById('finalScore');
        this.retryBtn = document.getElementById('retryBtn');

        this.attachEventListeners();
    }

    attachEventListeners() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.retryBtn.addEventListener('click', () => this.startGame());
    }

    startGame() {
        this.score = 0;
        this.timeRemaining = 30;
        this.gameActive = true;
        this.stars.clear();

        this.scoreDisplay.textContent = this.score;
        this.timerDisplay.textContent = this.timeRemaining;
        this.gameArea.innerHTML = '';
        this.gameOverModal.classList.add('hidden');
        this.startBtn.disabled = true;

        this.startTimer();
        this.spawnStars();
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeRemaining--;
            this.timerDisplay.textContent = this.timeRemaining;

            if (this.timeRemaining <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    spawnStars() {
        if (!this.gameActive) return;

        const star = document.createElement('div');
        star.className = 'star';
        star.textContent = '◆';
        star.id = `star-${Date.now()}`;

        const x = Math.random() * (this.gameArea.clientWidth - 50);
        const y = Math.random() * (this.gameArea.clientHeight - 50);
        star.style.left = x + 'px';
        star.style.top = y + 'px';

        star.addEventListener('click', (e) => {
            e.stopPropagation();
            this.clickStar(star.id);
        });

        this.gameArea.appendChild(star);
        this.stars.add(star.id);

        // 星は2秒後に消える
        setTimeout(() => {
            if (this.stars.has(star.id)) {
                star.style.animation = 'fadeOut 0.3s ease-out forwards';
                setTimeout(() => {
                    if (star.parentNode) {
                        star.remove();
                    }
                    this.stars.delete(star.id);
                }, 300);
            }
        }, 2000);

        // 次の星を0.8秒後にスポーン
        if (this.gameActive) {
            setTimeout(() => this.spawnStars(), 800);
        }
    }

    clickStar(starId) {
        const star = document.getElementById(starId);
        if (star && this.stars.has(starId)) {
            this.score++;
            this.scoreDisplay.textContent = this.score;
            star.style.animation = 'click 0.2s ease-out forwards';
            setTimeout(() => {
                if (star.parentNode) {
                    star.remove();
                }
                this.stars.delete(starId);
            }, 200);
        }
    }

    endGame() {
        this.gameActive = false;
        clearInterval(this.timerInterval);
        this.startBtn.disabled = false;

        // すべての星を消す
        this.gameArea.innerHTML = '';
        this.stars.clear();

        // ゲーム終了画面を表示
        this.finalScoreDisplay.textContent = this.score;
        this.gameOverModal.classList.remove('hidden');
    }
}

// ゲーム初期化
document.addEventListener('DOMContentLoaded', () => {
    new ClickGame();
});
