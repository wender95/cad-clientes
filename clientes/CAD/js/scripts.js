function enviarFormulario() {
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;

   
    if (nome && cpf && telefone && endereco) {
     
        fetch('/salvar-dados', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, cpf, telefone, endereco }),
        })
        .then(response => response.json())
        .then(data => {
           
            window.location.href = '/agradecimento';
        })
        .catch(error => console.error('Erro ao enviar dados:', error));
    } else {
        
        document.getElementById('mensagem').innerText = 'Preencha todos os campos antes de enviar.';
    }
}
