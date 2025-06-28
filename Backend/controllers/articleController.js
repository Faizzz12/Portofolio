const Article = require('../models/Article');

// Tambah artikel
exports.createArticle = async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ error: 'Gagal menambahkan artikel' });
  }
};

// Ambil semua artikel
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil artikel' });
  }
};

// Ambil 1 artikel
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.json(article);
  } catch (err) {
    res.status(404).json({ error: 'Artikel tidak ditemukan' });
  }
};

// Edit artikel
exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(article);
  } catch (err) {
    res.status(400).json({ error: 'Gagal memperbarui artikel' });
  }
};

// Hapus artikel
exports.deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Artikel berhasil dihapus' });
  } catch (err) {
    res.status(400).json({ error: 'Gagal menghapus artikel' });
  }
};

// Ambil artikel terbaru (misalnya 3 terbaru)
exports.getLatestArticles = async (req, res) => {
  const limit = parseInt(req.query.limit) || 3;

  try {
    const articles = await Article.find().sort({ createdAt: -1 }).limit(limit);
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil artikel terbaru' });
  }
};