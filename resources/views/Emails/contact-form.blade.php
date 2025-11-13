<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau Message de Contact</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            width: 90%;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
        }
        .header {
            font-size: 24px;
            font-weight: bold;
            color: #1d4ed8; /* Bleu (primary-700) */
        }
        .content {
            margin-top: 20px;
        }
        .content p {
            margin-bottom: 15px;
        }
        .content strong {
            display: inline-block;
            min-width: 100px;
            color: #555;
        }
        .message-box {
            background-color: #f9f9f9;
            border: 1px solid #eee;
            padding: 15px;
            border-radius: 5px;
            margin-top: 15px;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        Nouveau Message de Contact
    </div>
    <div class="content">
        <p>Vous avez reçu un nouveau message depuis le formulaire de contact de Parks.</p>

        <p><strong>Nom :</strong> {{ $formData['first_name'] }} {{ $formData['last_name'] }}</p>
        <p><strong>Email :</strong> {{ $formData['email'] }}</p>
        @if (!empty($formData['phone']))
            <p><strong>Téléphone :</strong> {{ $formData['phone'] }}</p>
        @endif

        <div class="message-box">
            <strong>Message :</strong>
            <p>{{ $formData['message'] }}</p>
        </div>
    </div>
</div>
</body>
</html>
