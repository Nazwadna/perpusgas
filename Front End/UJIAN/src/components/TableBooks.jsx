import React, { useEffect, useState } from "react";
import Button from "./common/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

export const TableBooks = () => {
  const [books, setBooks] = useState([]); // State untuk menyimpan data buku
  const navigate = useNavigate();

  // Mendapatkan data buku dari API
  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/books`);
        setBooks(res.data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };
    getBooks();
  }, []);

  // Fungsi untuk menghapus buku
  const deleteBook = async (bookId) => {
    const previousBooks = [...books];
    setBooks((prevBooks) => prevBooks.filter((book) => book.id_buku !== bookId));

    try {
      await axios.delete(`${API_BASE_URL}/books/${bookId}`);
    } catch (error) {
      console.error("Failed to delete book:", error);
      // Kembalikan state jika API gagal
      setBooks(previousBooks);
    }
  };

  return (
    <div>
      {/* Tombol Tambah Buku */}
      <div className="flex justify-center mb-4">
        <Button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => navigate("/add-book")}
        >
          Tambah Buku
        </Button>
      </div>

      {/* Tabel Data Buku */}
      <table className="w-full table-auto border-collapse">
        <thead className="bg-gray-200">
          <tr className="text-center">
            <th className="border px-4 py-2 border-slate-400">ID Buku</th>
            <th className="border px-4 py-2 border-slate-400">Judul</th>
            <th className="border px-4 py-2 border-slate-400">Genre</th>
            <th className="border px-4 py-2 border-slate-400">Author</th>
            <th className="border px-4 py-2 border-slate-400">Action</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr className="text-center" key={book.id_buku}>
                <td className="border px-4 py-2 border-slate-400">
                  {book.id_buku}
                </td>
                <td className="border px-4 py-2 border-slate-400">
                  {book.judul}
                </td>
                <td className="border px-4 py-2 border-slate-400">
                  {book.genre}
                </td>
                <td className="border px-4 py-2 border-slate-400">
                  {book.author}
                </td>
                <td className="flex gap-3 justify-center border border-slate-400 h-full">
                  <Button
                    className={"bg-blue-500 w-fit"}
                    onClick={() => navigate(`/update-book/${book.id_buku}`)}
                  >
                    Update
                  </Button>
                  <Button
                    className={"bg-red-500 w-fit"}
                    onClick={() => deleteBook(book.id_buku)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="text-center py-4 border border-slate-400"
              >
                No books available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableBooks;
