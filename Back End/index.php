<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, PUT, DELETE, GET');
header('Access-Control-Allow-Headers: Content-Type');

include_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['REQUEST_URI'], '/'));  // Mengambil semua bagian URL

// Jika URL berbentuk /books/ID, maka ID ada di posisi ke-2 (indeks 1)
$id_buku = isset($request[1]) ? $request[1] : null;

switch ($method) {
    case 'POST':
        createBook();
        break;

    case 'PUT':
        if ($id_buku) {
            updateBook($id_buku);
        } else {
            echo json_encode(['message' => 'ID Buku Missing']);
        }
        break;

    case 'DELETE':
        if ($id_buku) {
            deleteBook($id_buku);
        } else {
            echo json_encode(['message' => 'ID Buku Missing']);
        }
        break;

    case 'GET':
        if ($id_buku) {
            getBook($id_buku);
        } else {
            getAllBooks();
        }
        break;

    default:
        echo json_encode(['message' => 'Invalid Request']);
        break;
}

// Fungsi Create
function createBook()
{
    $data = json_decode(file_get_contents("php://input"));
    if (!empty($data->judul) && !empty($data->genre) && !empty($data->author)) {
        $conn = getConnection();
        $stmt = $conn->prepare("INSERT INTO buku (judul, genre, author) VALUES (?, ?, ?)");
        $stmt->bind_param('sss', $data->judul, $data->genre, $data->author);

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Book Created']);
        } else {
            echo json_encode(['message' => 'Book Not Created']);
        }

        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(['message' => 'Incomplete Data']);
    }
}

// Fungsi Update
function updateBook($id_buku)
{
    $data = json_decode(file_get_contents("php://input"));
    if (!empty($data->judul) && !empty($data->genre) && !empty($data->author)) {
        $conn = getConnection();
        $stmt = $conn->prepare("UPDATE buku SET judul = ?, genre = ?, author = ? WHERE id_buku = ?");
        $stmt->bind_param('sssi', $data->judul, $data->genre, $data->author, $id_buku);

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Book Updated']);
        } else {
            echo json_encode(['message' => 'Book Not Updated']);
        }

        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(['message' => 'Invalid Data']);
    }
}

// Fungsi Delete
function deleteBook($id_buku)
{
    $conn = getConnection();
    $stmt = $conn->prepare("DELETE FROM buku WHERE id_buku = ?");
    $stmt->bind_param('i', $id_buku);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Book Deleted']);
    } else {
        echo json_encode(['message' => 'Book Not Deleted']);
    }

    $stmt->close();
    $conn->close();
}

// Fungsi Get untuk buku tertentu
function getBook($id_buku)
{
    $conn = getConnection();
    $stmt = $conn->prepare("SELECT * FROM buku WHERE id_buku = ?");
    $stmt->bind_param('i', $id_buku);  // Bind parameter dengan benar
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $book = $result->fetch_assoc();
        echo json_encode($book);
    } else {
        echo json_encode(['message' => 'Book Not Found']);
    }

    $stmt->close();
    $conn->close();
}

// Fungsi Get untuk semua buku
function getAllBooks()
{
    $conn = getConnection();
    $stmt = $conn->prepare("SELECT * FROM buku");
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $books = [];
        while ($row = $result->fetch_assoc()) {
            $books[] = $row;
        }
        echo json_encode($books);
    } else {
        echo json_encode(['message' => 'No Books Found']);
    }

    $stmt->close();
    $conn->close();
}
?>
