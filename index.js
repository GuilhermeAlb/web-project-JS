const colors = require("colors");
const express = require("express");
const { restart } = require("nodemon");
const dotenv = require("dotenv").config();
const {json} = express();
const app = express();
const cors = require('cors');

const {listarClientes,salvarCliente, removerCliente, atualizarCliente} = require("./controllers/ClientesController");
const PORT = process.env.SERVER_PORT || 8001;

app.use(express.json());

app.use(cors({
    origin: '*'
}));
app.listen(PORT, (err)=>{
    if(err) {console.log(colors.bgRed(colors.white(err)));}
    console.info(colors.bgMagenta(`Programa Rodando na porta ${PORT}!`));
});



app.post("/clientes", (req,res)=>{
        salvarCliente(req,res);
        res.status(201).send("Requisição efetuada com sucesso");
});

app.get("/clientes",cors(), async(req,res)=>{
    const listar =  await listarClientes(req,res);
    res.status(200).send(listar);
})

app.put("/clientes/:id",async(req,res)=>{
   const clienteAtualizado = await atualizarCliente(req,res);
   res.status(200).send("cliente atualizado");
})

app.delete("/clientes/:id", async(req,res)=>{  
    await removerCliente(req,res);
    res.status(200).send("Cliente removido com sucesso!");
})

