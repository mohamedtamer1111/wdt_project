<?php
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. استلام الإيميل وتنظيفه
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);

    // 2. التحقق من صحة الصيغة (Validation)
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Invalid email format! ❌'); window.history.back();</script>";
        exit();
    }

    // 3. التحقق من وجود "الدمين" (اختياري - لزيادة الاحترافية)
    $domain = substr(strrchr($email, "@"), 1);
    if (!checkdnsrr($domain, "MX")) {
        echo "<script>alert('This email domain does not exist! ⚠️'); window.history.back();</script>";
        exit();
    }

    try {
        // 4. محاولة الحفظ في قاعدة البيانات
        $stmt = $pdo->prepare("INSERT INTO subscribers (email) VALUES (:email)");
        $stmt->execute(['email' => $email]);
        
        echo "<script>alert('Thank you for subscribing! 🌿'); window.location.href='index.html';</script>";
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) { // إيميل مكرر
            echo "<script>alert('This email is already in our list! 😊'); window.location.href='index.html';</script>";
        } else {
            echo "<script>alert('Something went wrong. Please try again.'); window.location.href='index.html';</script>";
        }
    }
}
?>