const Project = require('../models/Project');

// Tambah Project
exports.createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: 'Gagal menambahkan project' });
  }
};

// Ambil semua project
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil project' });
  }
};

// Edit project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: 'Gagal memperbarui project' });
  }
};

// Hapus project
exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project berhasil dihapus' });
  } catch (err) {
    res.status(400).json({ error: 'Gagal menghapus project' });
  }
};
