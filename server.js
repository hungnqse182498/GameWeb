// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Thay link MongoDB của ông vào đây nếu muốn, hoặc dùng link mặc định này để test
const MONGO_URI = 'mongodb+srv://sa:123451@cluster0.rydit5x.mongodb.net/?appName=Cluster0';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Đã kết nối MongoDB thành công!'))
    .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

const playerSchema = new mongoose.Schema({
    PlayerName: String,
    Score: Number,
    date: { type: Date, default: Date.now }
});

const Player = mongoose.model('Player', playerSchema);

// Quan trọng: Phục vụ file tĩnh (HTML, CSS, JS)
app.use(express.static(__dirname));

// Route trang chủ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API Lấy bảng xếp hạng
app.get('/api/leaderboard', async (req, res) => {
    try {
        const topPlayers = await Player.find().sort({ Score: -1, date: 1 }).limit(20);
        res.json(topPlayers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API Lưu điểm
app.post('/api/save', async (req, res) => {
    try {
        const { PlayerName, Score } = req.body;
        const newPlayer = new Player({ PlayerName, Score });
        await newPlayer.save();
        
        // Dọn dẹp database, chỉ giữ Top 20
        const count = await Player.countDocuments();
        if (count > 20) {
            const top20 = await Player.find().sort({ Score: -1, date: 1 }).limit(20);
            const top20Ids = top20.map(p => p._id);
            await Player.deleteMany({ _id: { $nin: top20Ids } });
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});