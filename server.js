const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ✅ تحميل القصص من ملف JSON
let stories = require('./stories.json');

// ✅ Get All Stories
app.get('/', (req, res) => {
  res.send('🎉 Islamic Stories API is running');
});


// ✅ Like Story
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

// ✅ Unlike Story
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
