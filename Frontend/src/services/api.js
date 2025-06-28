import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export async function getProfile() {
  try {
    const res = await axios.get(`${BASE_URL}/profile`);
    return res.data;
  } catch (err) {
    console.error("Gagal mengambil data profil:", err);
    return null;
  }
}

export const updateProfile = async (profileData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(`${BASE_URL}/profile`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Gagal memperbarui profil:", error);
    throw error;
  }
};

export async function getProjects() {
  try {
    const res = await axios.get(`${BASE_URL}/projects`);
    return res.data;
  } catch (err) {
    console.error("Gagal mengambil data projects:", err);
    return [];
  }
}

export const createProject = async (projectData, token) => {
  const res = await axios.post(`${BASE_URL}/projects`, projectData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateProject = async (id, projectData, token) => {
  const res = await axios.put(`${BASE_URL}/projects/${id}`, projectData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteProject = async (id, token) => {
  const res = await axios.delete(`${BASE_URL}/projects/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};


export const getContact = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/contact`);
    return res.data;
  } catch (error) {
    console.error('Gagal mengambil data contact:', error);
    return null;
  }
}

export const createArticle = async (articleData, token) => {
  try {
    const res = await axios.post(`${BASE_URL}/articles`, articleData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Gagal menambahkan artikel:", error);
    throw error;
  }
};

export const updateArticle = async (id, articleData, token) => {
  try {
    const res = await axios.put(`${BASE_URL}/articles/${id}`, articleData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Gagal mengupdate artikel:", error);
    throw error;
  }
};

export const deleteArticle = async (id, token) => {
  try {
    const res = await axios.delete(`${BASE_URL}/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Gagal menghapus artikel:", error);
    throw error;
  }
};

export const getArticlesWithAuth = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${BASE_URL}/articles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Gagal mengambil artikel:", error);
    return [];
  }
};

export async function getArticleById(id) {
  try {
    const res = await axios.get(`${BASE_URL}/articles/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Gagal mengambil artikel dengan ID ${id}:`, error);
    return null;
  }
}

export const getLatestArticles = async (limit = 3) => {
  try {
    const res = await axios.get(`${BASE_URL}/articles/latest?limit=${limit}`);
    return res.data;
  } catch (error) {
    console.error("Gagal mengambil artikel terbaru:", error);
    return [];
  }
};
