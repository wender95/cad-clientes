function enviarFormulario() {
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;

    // Verifique se todos os campos foram preenchidos antes de enviar
    if (nome && cpf && telefone && endereco) {
        // Enviar dados para o servidor (substitua a URL pelo seu endpoint)
        fetch('/salvar-dados', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, cpf, telefone, endereco }),
        })
        .then(response => response.json())
        .then(data => {
            // Redirecionar para a página de agradecimento
            window.location.href = '/agradecimento';
        })
        .catch(error => console.error('Erro ao enviar dados:', error));
    } else {
        // Exiba uma mensagem de erro se algum campo estiver em branco
        document.getElementById('mensagem').innerText = 'Preencha todos os campos antes de enviar.';
    }
}