const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const API_URL = "/api"; 

// Biến Game
let gameState = 'MENU';
let gameLoopId;
let score = 0;
let lives = 3;
let speedMultiplier = 1;

// Đối tượng Player (Công nhân)
const player = { x: 375, y: 500, width: 50, height: 50, speed: 5, sprite: "👷" };

// Items (Vật phẩm rơi)
let items = [];
const itemTypes = [
    { type: 'good', sprite: '💎', score: 10, speed: 2.0 }, // Tư liệu
    { type: 'good', sprite: '🌾', score: 5, speed: 2.5 },  // Lúa
    { type: 'bad', sprite: '💣', score: -20, speed: 3.0 }, // Áp bức
    { type: 'bad', sprite: '🐍', score: -10, speed: 3.5 }, // Suy thoái
    { type: 'quiz', sprite: '📜', score: 0, speed: 2.5 }   // Tri thức
];

// Input (Bàn phím)
let keys = {};
window.addEventListener('keydown', e => {
    keys[e.key] = true;
    if (e.key === 'p' || e.key === 'P') togglePause();
});
window.addEventListener('keyup', e => keys[e.key] = false);

document.getElementById('btn-pause').addEventListener('click', togglePause);

// --- CÁC HÀM ĐIỀU KHIỂN GAME ---
function startGame() {
    score = 0;
    lives = 3;
    items = [];
    speedMultiplier = 1;
    gameState = 'PLAYING';

    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-over-modal').classList.add('hidden');
    document.getElementById('ui-layer').classList.remove('hidden');
    
    updateHUD();

    if (gameLoopId) cancelAnimationFrame(gameLoopId);
    spawnItems();
    loop();
}

function backToMenu() {
    gameState = 'MENU';
    if (gameLoopId) cancelAnimationFrame(gameLoopId);
    
    document.getElementById('ui-layer').classList.add('hidden');
    document.getElementById('pause-modal').classList.add('hidden');
    document.getElementById('game-over-modal').classList.add('hidden');
    document.getElementById('quiz-modal').classList.add('hidden');
    document.getElementById('leaderboard-modal').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function togglePause() {
    if (gameState === 'PLAYING') {
        gameState = 'PAUSED';
        document.getElementById('pause-modal').classList.remove('hidden');
    } else if (gameState === 'PAUSED') {
        gameState = 'PLAYING';
        document.getElementById('pause-modal').classList.add('hidden');
        loop();
        spawnItems();
    }
}

// --- LOGIC GAME LOOP ---
function spawnItems() {
    if (gameState !== 'PLAYING') return;
    
    const type = itemTypes[Math.floor(Math.random() * itemTypes.length)];
    items.push({
        x: Math.random() * (canvas.width - 40),
        y: -50,
        ...type
    });
    
    let spawnRate = Math.max(500, 1500 - score * 3);
    setTimeout(spawnItems, spawnRate);
}

function update() {
    if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
    if (keys['ArrowRight'] && player.x < canvas.width - player.width) player.x += player.speed;

    for (let i = items.length - 1; i >= 0; i--) {
        let item = items[i];
        item.y += item.speed * speedMultiplier;

        if (
            item.x < player.x + player.width &&
            item.x + 30 > player.x &&
            item.y < player.y + player.height &&
            item.y + 30 > player.y
        ) {
            handleCollision(item);
            items.splice(i, 1);
            continue;
        }

        if (item.y > canvas.height) items.splice(i, 1);
    }
}

function handleCollision(item) {
    if (item.type === 'good') {
        score += item.score;
        // Chỉ hiện toast khi ăn được điểm lớn hoặc vật phẩm đặc biệt để đỡ rối mắt
        if(item.score >= 10) showToast(`+${item.score}`, 'success'); 
    } else if (item.type === 'bad') {
        lives--;
        score += item.score;
        showToast(`${item.score}`, 'error');
        // Rung màn hình nhẹ
        canvas.style.transform = "translateX(5px)";
        setTimeout(() => canvas.style.transform = "none", 50);
    } else if (item.type === 'quiz') {
        triggerQuiz();
    }
    updateHUD();
    if (lives <= 0) gameOver();
}

function updateHUD() {
    document.getElementById('score').innerText = score;
    document.getElementById('lives').innerText = "❤️".repeat(Math.max(0, lives));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Vẽ vạch đích giả lập
    ctx.fillStyle = '#444'; 
    ctx.fillRect(0, 550, 800, 5);

    ctx.font = "50px Arial";
    ctx.fillText(player.sprite, player.x, player.y + 40);

    ctx.font = "30px Arial";
    items.forEach(item => {
        ctx.fillText(item.sprite, item.x, item.y);
    });
}

function loop() {
    if (gameState === 'PLAYING') {
        update();
        draw();
        gameLoopId = requestAnimationFrame(loop);
    }
}

// --- HỆ THỐNG CÂU HỎI (QUIZ) ---
let quizInterval;
const QUIZ_TIME_LIMIT = 15; // Tăng thời gian lên xíu cho dễ đọc

function triggerQuiz() {
    gameState = 'QUIZ';
    
    if (typeof questionBank === 'undefined' || questionBank.length === 0) {
        console.error("Thiếu câu hỏi!");
        gameState = 'PLAYING'; loop(); return;
    }

    const qIndex = Math.floor(Math.random() * questionBank.length);
    const qData = questionBank[qIndex];
    
    document.getElementById('question-text').innerText = qData.q;
    const ansContainer = document.getElementById('answers-container');
    ansContainer.innerHTML = '';

    let answers = qData.a.map((ans, idx) => ({ txt: ans, originalIdx: idx }));
    answers.sort(() => Math.random() - 0.5);

    answers.forEach(ans => {
        const btn = document.createElement('button');
        btn.className = 'btn-answer';
        btn.innerText = ans.txt;
        btn.onclick = () => resolveQuiz(ans.originalIdx === qData.correct);
        ansContainer.appendChild(btn);
    });

    document.getElementById('quiz-modal').classList.remove('hidden');
    startQuizTimer();
}

function startQuizTimer() {
    let timeLeft = QUIZ_TIME_LIMIT;
    const timerElement = document.getElementById('quiz-timer');
    timerElement.innerText = `⏳ ${timeLeft}`;

    if (quizInterval) clearInterval(quizInterval);

    quizInterval = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `⏳ ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(quizInterval);
            resolveQuiz(false, true);
        }
    }, 1000);
}

function resolveQuiz(isCorrect, isTimeout = false) {
    if (quizInterval) clearInterval(quizInterval);
    document.getElementById('quiz-modal').classList.add('hidden');
    
    if (isCorrect) {
        score += 50;
        speedMultiplier += 0.1;
        showToast("🎉 CHÍNH XÁC! +50 Điểm", "success");
    } else {
        lives--;
        if (isTimeout) showToast("⌛ HẾT GIỜ!", "error");
        else showToast("💀 SAI RỒI!", "error");
    }
    
    updateHUD();
    
    if (lives <= 0) {
        gameOver();
    } else {
        gameState = 'PLAYING';
        loop();
        spawnItems();
    }
}

// --- UI TOAST MESSAGE (Đã chỉnh theo CSS mới) ---
let toastTimeout;
function showToast(message, type) {
    const toast = document.getElementById('game-toast');
    
    toast.className = ''; 
    toast.classList.add('hidden');
    
    void toast.offsetWidth; 

    toast.innerText = message;
    toast.classList.remove('hidden'); 
    
    if (type === 'success') toast.classList.add('toast-success');
    else if (type === 'error') toast.classList.add('toast-error');
    else if (type === 'gold') toast.classList.add('toast-gold');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.add('hidden'); 
    }, 2500);
}

// --- GAME OVER & LEADERBOARD ---
function gameOver() {
    gameState = 'GAMEOVER';
    document.getElementById('final-score').innerText = score;
    document.getElementById('game-over-modal').classList.remove('hidden');
    document.getElementById('ui-layer').classList.add('hidden');
    
    const inputDiv = document.getElementById('new-high-score');
    if (score > 0) inputDiv.classList.remove('hidden');
    else inputDiv.classList.add('hidden');
}

function saveHighScore() {
    const nameInput = document.getElementById('player-name');
    const name = nameInput.value.trim() || "Vô danh";

    document.getElementById('new-high-score').classList.add('hidden');

    fetch(`${API_URL}/save`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-api-key': 'HACKER_LO_159362'
        },
        body: JSON.stringify({ PlayerName: name, Score: score }) 
    })
    .then(res => {
        // Kiểm tra xem server có từ chối không (nếu sai key)
        if (!res.ok) {
            if (res.status === 403) throw new Error("Sai mật khẩu API!");
            if (res.status === 400) throw new Error("Điểm số không hợp lệ!");
            throw new Error("Lỗi Server");
        }
        return res.json();
    })
    .then(data => {
        showToast("🏆 ĐÃ LƯU ĐIỂM!", "gold");
        showLeaderboard(); 
    })
    .catch(err => {
        console.error(err);
        showToast("❌ Lỗi Server!", "error");
    });
}

function showLeaderboard() {
    const list = document.getElementById('leaderboard-list');
    list.innerHTML = '<li>Đang tải...</li>';
    document.getElementById('leaderboard-modal').classList.remove('hidden');

    fetch(`${API_URL}/leaderboard`)
    .then(res => res.json())
    .then(data => {
        list.innerHTML = '';
        if (data.length === 0) {
            list.innerHTML = '<li>Chưa có dữ liệu</li>';
            return;
        }

        data.forEach((s, index) => {
            const li = document.createElement('li');
            // Thêm icon huy chương cho Top 3
            let medal = "";
            if(index === 0) medal = "🥇";
            if(index === 1) medal = "🥈";
            if(index === 2) medal = "🥉";
            
            li.innerHTML = `<span>${medal} #${index + 1} ${s.PlayerName}</span> <span>${s.Score}</span>`;
            list.appendChild(li);
        });
    })
    .catch(err => {
        list.innerHTML = '<li>Lỗi kết nối Server</li>';
    });
}

function closeLeaderboard() {
    document.getElementById('leaderboard-modal').classList.add('hidden');
}