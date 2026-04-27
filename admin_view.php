<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require 'db.php';
// جلب كل الإيميلات من الداتا بيز
$stmt = $pdo->query("SELECT * FROM subscribers ORDER BY created_at DESC");
$subscribers = $stmt->fetchAll();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Subscribers List - Admin</title>
    <style>
        body { font-family: Arial; padding: 20px; background: #f4f4f4; }
        table { width: 100%; border-collapse: collapse; background: #fff; }
        th, td { padding: 12px; border: 1px solid #ddd; text-align: left; }
        th { background: #4CAF50; color: white; }
    </style>
</head>
<body>
    <h2>📩 Registered Subscribers</h2>
    <table>
        <tr>
            <th>ID</th>
            <th>Email Address</th>
            <th>Subscription Date</th>
        </tr>
        <?php foreach ($subscribers as $row): ?>
        <tr>
            <td><?= $row['id'] ?></td>
            <td><?= $row['email'] ?></td>
            <td><?= $row['created_at'] ?></td>
        </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>