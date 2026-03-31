import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi
import Button from "./common/Button";

export const FormBook = () => {
  const [book, setBook] = useState({
    judul: "",
    genre: "",
    author: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Untuk mengelola loading state
  const [error, setError] = useState(null); // Untuk mengelola error
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleTambahBuku = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!book.judul || !book.genre || !book.author) {
      setError("Semua field harus diisi!");
      return;
    }

    setIsSubmitting(true); // Mulai proses submit
    setError(null); // Reset error

    try {
      const res = await fetch("http://localhost:8000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });

      if (!res.ok) {
        throw new Error("Gagal menambah buku");
      }

      const data = await res.json();
      console.log(data);

      setBook({ judul: "", genre: "", author: "" }); // Reset input form setelah sukses

      // Navigasi kembali ke halaman utama
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan saat menambah buku.");
    } finally {
      setIsSubmitting(false); // Selesai proses submit
    }
  };

  return (
    <form
      onSubmit={handleTambahBuku}
      className="mb-4 flex flex-col gap-3 items-center"
    >
      <input
        className="p-2 border-2 border-gray-400 rounded-lg w-full"
        type="text"
        value={book.judul}
        placeholder="Judul Buku"
        onChange={(e) => setBook({ ...book, judul: e.target.value })}
        required
      />
      <input
        className="p-2 border-2 border-gray-400 rounded-lg w-full"
        type="text"
        value={book.genre}
        placeholder="Genre Buku"
        onChange={(e) => setBook({ ...book, genre: e.target.value })}
        required
      />
      <input
        className="p-2 border-2 border-gray-400 rounded-lg w-full"
        type="text"
        value={book.author}
        placeholder="Author Buku"
        onChange={(e) => setBook({ ...book, author: e.target.value })}
        required
      />

      <Button
        className="bg-blue-500 text-white p-2 w-32 rounded-md"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Menambah..." : "Tambah Buku"}
      </Button>

      {/* Menampilkan error jika ada */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

// Button untuk navigasi ke halaman tambah buku
export const ButtonTambahBuku = () => {
  const navigate = useNavigate();

  return (
    <Button
      className="bg-green-500 text-white p-2 rounded-md"
      onClick={() => navigate("/tambah-buku")}
    >
      Tambah Buku
    </Button>
  );
};
