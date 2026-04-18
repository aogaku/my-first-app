class Game {
    constructor() {
        this.player = {
            x: 100,
            y: window.innerHeight - 150,
            width: 40,
            height: 50,
            speed: 5,
            velocityY: 0,
            gravity: 0.4,
            jumpPower: 12,
            isJumping: false
        };

        this.enemies = [];
        this.keys = {};
        this.gameOver = false;
        this.enemySpawnTimer = 0;
        this.enemySpawnInterval = 120;

        this.playerEl = document.getElementById('player');
        this.enemiesEl = document.getElementById('enemies');
        this.uiEl = document.getElementById('ui');
        this.gameContainer = document.getElementById('gameContainer');

        this.groundY = window.innerHeight - 100;

        this.setupEventListeners();
        this.gameLoop();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            if (e.key === ' ' || e.key === 'ArrowUp') {
                e.preventDefault();
                this.jump();
            }
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });

        window.addEventListener('resize', () => {
            this.groundY = window.innerHeight - 100;
        });
    }

    jump() {
        if (!this.player.isJumping && !this.gameOver) {
            this.player.velocityY = -this.player.jumpPower;
            this.player.isJumping = true;
        }
    }

    updatePlayer() {
        // 左右移動
        if (this.keys['ArrowLeft'] || this.keys['a']) {
            this.player.x -= this.player.speed;
        }
        if (this.keys['ArrowRight'] || this.keys['d']) {
            this.player.x += this.player.speed;
        }

        // 画面端を超えないようにする
        if (this.player.x < 0) this.player.x = 0;
        if (this.player.x + this.player.width > window.innerWidth) {
            this.player.x = window.innerWidth - this.player.width;
        }

        // 重力と落下
        this.player.velocityY += this.player.gravity;
        this.player.y += this.player.velocityY;

        // 地面との判定
        if (this.player.y + this.player.height >= this.groundY) {
            this.player.y = this.groundY - this.player.height;
            this.player.isJumping = false;
            this.player.velocityY = 0;
        }

        // プレイヤー表示更新
        this.playerEl.style.left = this.player.x + 'px';
        this.playerEl.style.bottom = (window.innerHeight - this.player.y - this.player.height) + 'px';
    }

    spawnEnemy() {
        const enemy = {
            x: window.innerWidth,
            y: this.groundY - 45,
            width: 45,
            height: 45,
            speed: 4
        };
        this.enemies.push(enemy);
    }

    updateEnemies() {
        this.enemySpawnTimer++;
        if (this.enemySpawnTimer > this.enemySpawnInterval) {
            this.spawnEnemy();
            this.enemySpawnTimer = 0;
        }

        // 敵の更新と描画
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            enemy.x -= enemy.speed;

            // 画面外の敵を削除
            if (enemy.x + enemy.width < 0) {
                this.enemies.splice(i, 1);
                continue;
            }

            // 衝突判定
            if (this.checkCollision(this.player, enemy)) {
                this.endGame();
            }

            // 敵を描画
            this.renderEnemy(enemy, i);
        }
    }

    checkCollision(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    }

    renderEnemy(enemy, index) {
        let enemyEl = document.getElementById('enemy-' + index);
        
        if (!enemyEl) {
            enemyEl = document.createElement('div');
            enemyEl.className = 'enemy';
            enemyEl.id = 'enemy-' + index;
            this.enemiesEl.appendChild(enemyEl);
        }

        enemyEl.style.left = enemy.x + 'px';
        enemyEl.style.bottom = (window.innerHeight - enemy.y - enemy.height) + 'px';
    }

    endGame() {
        this.gameOver = true;
        this.uiEl.textContent = 'GAME OVER! リロードして再スタート';
        this.uiEl.classList.add('gameover');
    }

    gameLoop() {
        if (!this.gameOver) {
            this.updatePlayer();
            this.updateEnemies();
        }

        requestAnimationFrame(() => this.gameLoop());
    }
}

// ゲーム開始
window.addEventListener('load', () => {
    new Game();
});
