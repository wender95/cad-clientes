const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const path = require('path');  

const app = express();
const port = 3000;



const credentials = require('./credenciais.json');
const client = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

const spreadsheetId = '17bgayKiBGvw7ZvZIeKqh6dmGSVvTu90flqOYbupwkwE';


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/CAD', express.static(path.join(__dirname, 'CAD')));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/salvar-dados', async (req, res) => {
    try {
        await client.authorize();
        const sheets = google.sheets({ version: 'v4', auth: client });

        const { nome, cpf, telefone, endereco } = req.body;

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'A1', 
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [[nome, cpf, telefone, endereco]]
            }
        });

        console.log('Dados adicionados com sucesso à planilha do Google Sheets.');
        res.status(200).json({ message: 'Dados adicionados com sucesso.' });
    } catch (error) {
        console.error('Erro ao adicionar dados à planilha do Google Sheets:', error);
        res.status(500).json({ message: 'Erro ao adicionar dados à planilha.' });
    }
});


app.get('/agradecimento', (req, res) => {
    res.send('<h1>Obrigado pela inscrição!</h1>');
});


app.listen(port, () => {
    console.log(`Servidor está ouvindo na porta ${port}`);
});
