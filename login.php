<?php
session_start(); // بدأ الجلسة عشان نحفظ إن المستخدم عمل لوج إن
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];

    // البحث عن المستخدم في الداتا بيز
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch();

    // التأكد من الباسورد
    if ($user && password_verify($password, $user['password'])) {
        // لو الباسورد صح، نحفظ بياناته في الـ Session
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['full_name'];
        
        echo "<script>alert('Welcome back, " . $user['full_name'] . "!'); window.location.href='index.html';</script>";
    } else {
        echo "<script>alert('Incorrect email or password! ❌'); window.location.href='auth.html';</script>";
    }
}
?>