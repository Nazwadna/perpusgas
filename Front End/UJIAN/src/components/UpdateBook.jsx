import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const UpdateBook = () => {
  const { id } = useParams(); // Mengambil ID buku dari parameter URL
  const navigate = useNavigate();
  const [book, setBook] = useState({
    judul: "",
    genre: "",
    author: "",
  });

  // Fetch data buku berdasarkan ID saat komponen di-mount
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/books/${id}`);
        setBook(res.data);
      } catch (error) {
        console.error("Failed to fetch book data:", error);
      }
    };
    fetchBook();
  }, [id]);

  // Meng-handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Meng-handle submit untuk mengupdate data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/books/${id}`, book); // API PUT request untuk update data
      navigate("/"); // Redirect ke halaman utama setelah berhasil
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
        <label className="flex flex-col">
          Judul Buku:
          <input
            type="text"
            name="judul"
            value={book.judul}
            onChange={handleChange}
            className="border px-2 py-1 rounded-md"
            required
          />
        </label>
        <label className="flex flex-col">
          Genre:
          <input
            type="text"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            className="border px-2 py-1 rounded-md"
            required
          />
        </label>
        <label className="flex flex-col">
          Author:
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            className="border px-2 py-1 rounded-md"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
