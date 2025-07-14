const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

// استخدم المنفذ من متغيرات البيئة (لـ Railway) أو 3000 افتراضيًا
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// تحميل القصص من ملف JSON
let stories = require('./stories.json');

// نقطة اختبار للتأكد إن السيرفر شغال
app.get('/', (req, res) => {
  res.send('🎉 Islamic Stories API is running');
});

// ✅ نقطة GET لعرض جميع القصص
app.get('/stories', (req, res) => {
  res.json(stories);
});

// POST: زيادة لايك
app.post('/stories/:id/like', (req, res) => {
  const storyId = parseInt(req.params.id);
  const story = stories.find(s => s.id === storyId);
  if (story) {
    story.likes += 1;
    story.isLiked = true;
    res.json(story);
  } else {
    res.status(404).json({ message: 'Story not found' });
  }
});

// POST: تقليل لايك
app.post('/stories/:id/unlike', (req, res) => {
  const storyId = parseInt(req.params.id);
  const story = stories.find(s => s.id === storyId);
  if (story && story.likes > 0) {
    story.likes -= 1;
    story.isLiked = false;
    res.json(story);
  } else {
    res.status(404).json({ message: 'Story not found or likes already 0' });
  }
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
