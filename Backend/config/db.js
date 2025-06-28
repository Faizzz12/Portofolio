const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Terhubung ke MongoDB');
  } catch (error) {
    console.error('❌ Gagal koneksi MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;