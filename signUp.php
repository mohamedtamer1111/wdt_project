<?php
require 'db.php'; // استدعاء الاتصال بقاعدة البيانات

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $full_name = htmlspecialchars($_POST['full_name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];

    // تشفير الباسورد (خطوة أمان مهمة جداً)
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    try {
        $stmt = $pdo->prepare("INSERT INTO users (full_name, email, password) VALUES (:full_name, :email, :password)");
        $stmt->execute([
            'full_name' => $full_name,
            'email' => $email,
            'password' => $hashed_password
        ]);
        
        echo "<script>alert('Account created successfully! You can now log in.'); window.location.href='auth.html';</script>";
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) {
            echo "<script>alert('This email is already registered!'); window.location.href='auth.html';</script>";
        } else {
            echo "<script>alert('Error: " . $e->getMessage() . "'); window.location.href='auth.html';</script>";
        }
    }
}
?>