require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.API_KEY;

if (!MONGO_URI) {
    console.error("❌ LỖI: Chưa cấu hình MONGO_URI trong file .env!");
} else {
    mongoose.connect(MONGO_URI)
        .then(() => console.log('✅ Đã kết nối MongoDB thành công!'))
        .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));
}

const playerSchema = new mongoose.Schema({
    PlayerName: String,
    Score: Number,
    date: { type: Date, default: Date.now }
});

const Player = mongoose.model('Player', playerSchema);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/leaderboard', async (req, res) => {
    try {
        const topPlayers = await Player.find().sort({ Score: -1, date: 1 }).limit(20);
        res.json(topPlayers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/save', async (req, res) => {
    try {
        const { PlayerName, Score } = req.body;
        const clientKey = req.headers['x-api-key']; 

        if (clientKey !== SECRET_KEY) {
            console.log(`⚠️ Có đứa hack! IP: ${req.ip}`);
            return res.status(403).json({ error: "Sai mật khẩu API! Cút!" });
        }

        if (!Score || Score < 0 || Score > 10000) {
             return res.status(400).json({ error: "Điểm số không hợp lệ!" });
        }

        let cleanName = (PlayerName || "Vô danh").trim();
        if (cleanName.length > 15) cleanName = cleanName.substring(0, 15) + "...";

        const newPlayer = new Player({ PlayerName: cleanName, Score });
        await newPlayer.save();
        
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});