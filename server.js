const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

// ✅ دي أهم خطوة: استخدم PORT من البيئة أو 3000 كافتراضي
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let stories = require('./stories.json');

app.get('/', (req, res) => {
  res.send('🎉 Islamic Stories API is running');
});

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

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
