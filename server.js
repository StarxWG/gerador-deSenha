// commod
const express = require('express');
const bodyParser = require('body-parser');

// utilizando o module faz assim:
// import express from 'express';
// e ai colocamos no package.json embaixo do main: type: 'module', 

const app = express();
const port = 3000;

//middleware para processar o JSON
app.use(bodyParser.json());

//função responsavel por gerar as senhas aleatórias
function generatePassword(length, useUppercase, useNumbers, useSpecialChars){
    const lowercaseChars = 'qwertyuiopasdfghjklzxcvbnm';
    const uppercaseChars = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    const numbers = '1234567890';
    const specialChars = '!@#$%¨&*()_+^~´|}{[]:;.<>?';

    let characterPool = lowercaseChars;

    if (useUppercase) characterPool += uppercaseChars;
    if(useNumbers) characterPool += numbers;
    if(useSpecialChars) characterPool += specialChars;

    if(!characterPool){
        throw new Error('Nenhum caractere foi selecionado!');
    }

    // variavel que guarda a senha aleatoriamente

    let password = '';

    // loop para criar a combinação de senha aleatória
    for (let i = 0; i < length; i++) {
        const randomindex = Math.floor(Math.random() * characterPool.length)
        password += characterPool[randomindex]  
    }

    // retorna a senha
    return password;
}

//criação do and point/ rota para gerar as senhas
app.post('/generate-password', (req, res)=>{
    const {length, useUppercase, useNumbers, useSpecialChars} = req.body;

    if (!length || typeof length !== "number" || length <=0 ){
        return res.status(400).json({error: 'O campo length (o tamanho da senha) deve ser um número maior que 0'})
    }

    try {
        const password = generatePassword(length, useUppercase, useNumbers, useSpecialChars);
        res.json({password})
    } catch (error) {
        res.status(400).json({error: error.menssage})
    }

})

//inicializar o servidor
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
});

