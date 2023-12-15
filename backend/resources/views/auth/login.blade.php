<!-- resources/views/auth/login.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>

    <form method="POST" action="{{ route('login') }}">
        @csrf

        <label for="email">Email:</label>
        <input type="email" name="email" id="email" required>

        <br>

        <label for="password">Password:</label>
        <input type="password" name="password" id="password" required>

        <br>

        <button type="submit">Login</button>
    </form>

</body>
</html>
