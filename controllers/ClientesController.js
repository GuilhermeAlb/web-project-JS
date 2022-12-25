const asyncHandler = require('express-async-handler');
const Cliente = require("../models/Cliente");
const clienteDAO = require('../DAO/ClienteDAO');
const { getConnection } = require('../infra/db');

const salvarCliente = asyncHandler(async(req, res)=>{
    const cliente = await requestToClienteMapper(req);
    clienteDAO.salvarCliente(cliente);
    console.log("O cliente"+cliente.nome+" foi salvo com sucesso");
    return {cliente};
});

const listarClientes = asyncHandler(async(req, res)=>{
    const [listaDeClientes] = await clienteDAO.listarClientes();
    return listaDeClientes;
});

const atualizarCliente = asyncHandler(async(req,res)=>{
    const cliente = await requestToClienteMapper(req);
    await clienteDAO.atualizarCliente(cliente);
    return {cliente};
});

const requestToClienteMapper = async(req)=>{
    const cliente = new Cliente();
    cliente.id = req.params.id;
    cliente.nome = req.body.nome;
    cliente.email = req.body.email;
    cliente.cpf = req.body.cpf;
    return cliente;
}

const removerCliente = asyncHandler(async(req,res)=>{
        const id = req.params.id;
        await clienteDAO.removerCliente(id);
})



module.exports = {salvarCliente,listarClientes,atualizarCliente,removerCliente}