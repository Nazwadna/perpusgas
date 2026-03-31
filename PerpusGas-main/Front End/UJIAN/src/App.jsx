import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TableBooks } from "./components/TableBooks"; // Menampilkan tabel buku
import { FormBook } from "./components/FormBook"; // Menambahkan buku baru
import { UpdateBook } from "./components/UpdateBook"; // Mengupdate data buku

function App() {
  return (
    <Router>
      <div className="container mx-auto px-4">
        <header className="py-4 bg-blue-500 text-white text-center">
          <h1 className="text-2xl font-bold">Manajemen Buku</h1>
        </header>
        <main className="my-8">
          <Routes>
            {/* Halaman utama untuk melihat daftar buku */}
            <Route path="/" element={<TableBooks />} />

            {/* Halaman untuk menambah buku baru */}
            <Route path="/add-book" element={<FormBook />} />

            {/* Halaman untuk mengupdate buku */}
            <Route path="/update-book/:id" element={<UpdateBook />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
