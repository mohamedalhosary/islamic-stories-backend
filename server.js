const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let stories = require('./stories.json');

// ✅ نقطة اختبار
app.get('/', (req, res) => {
  res.send('🎉 Islamic Stories API is running');
});

// ✅ جلب كل القصص
app.get('/stories', (req, res) => {
  res.json(stories);
});

// ✅ إضافة قصة جديدة
app.post('/stories', (req, res) => {
  const newStory = req.body;

  // التحقق من البيانات الأساسية
  if (!newStory.title || !newStory.content) {
    return res.status(400).json({ message: 'العنوان أو المحتوى ناقص' });
  }

  newStory.id = stories.length + 1;
  newStory.likes = 0;
  newStory.isLiked = false;
  newStory.date = new Date().toISOString();

  stories.push(newStory);

  // (اختياري) حفظ التغيير في ملف JSON
  fs.writeFile('./stories.json', JSON.stringify(stories, null, 2), err => {
    if (err) {
      return res.status(500).json({ message: 'فشل حفظ القصة في الملف' });
    }
    res.status(201).json(newStory);
  });
});

// ✅ زيادة لايك
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

// ✅ تقليل لايك
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

// ✅ تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
