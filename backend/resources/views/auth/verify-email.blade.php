<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Created</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Account Created!</h4>
            <p>Your account has been successfully created. To complete the registration process, please check your email inbox and click on the verification link we sent you.</p>
            <hr>
            <p class="mb-0">If you haven't received the email, please check your spam folder or request a new verification email.</p>
        </div>
        <a href="/" class="btn btn-primary mr-4">Back to Home</a>
        <form method="post" action="{{ route('verification.send') }}">
            @csrf
            <p>
                Didn't receive the verification email? Click the button below to resend the link.
            </p>
            <input type='submit' class="btn btn-success" value='Resend Verification Link'/>
        </form>
    </div>

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
</body>
</html>
