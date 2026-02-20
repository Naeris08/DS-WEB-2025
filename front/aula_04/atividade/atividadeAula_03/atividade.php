<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Atividade Aula 03</title>
</head>
<body>
    <form action="atividade.php" method="post">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" name="nome" required><br><br>

        <label for="email">E-mail:</label>
        <input type="email" id="email" name="email" required><br><br>

        <label for="rm">RM:</label>
        <input type="number" id="rm" name="rm" required><br><br>

        <label for="telefone">Telefone:</label>
        <input type="tel" id="telefone" name="telefone" required><br><br>

        <label for="turma">Turma:</label>
        <input type="text" id="turma" name="turma" required><br><br>

        <input type="submit" value="Cadastrar" onclick="addItem()">
</body>
<script src="script.js"></script>
</html>