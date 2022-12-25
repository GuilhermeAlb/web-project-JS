const {getConnection} = require('../infra/db');

const salvarCliente = async (cliente)=>{
    const connection  =  await getConnection();
    const sqlInsert = 'insert into cliente'+
    '(nome,email,cpf) values(?,?,?)';
    const  valores = [cliente.nome,cliente.email,cliente.cpf];
    return connection.query(sqlInsert,valores);
}

const listarClientes = async()=>{
    const connection  = await getConnection();
    const sqlListarTodos = 'select id,nome,email,cpf from agendactt.cliente';
    console.log(sqlListarTodos);
    return connection.query(sqlListarTodos);
}

const atualizarCliente = async(cliente)=>{
    const connection = await getConnection();
    const sqlUpdate = 'update cliente set nome=?, email =?, cpf= ? where id=?';
    const valores = [cliente.nome,cliente.email,cliente.cpf, cliente.id];
    console.log('Atualizado com sucesso');
    return connection.query(sqlUpdate,valores);

}

const removerCliente = async(id)=>{
    const connection = await getConnection();
    const sqlDelete = 'delete from cliente where id=?';
    console.log('Removido com sucesso');
    return connection.query(sqlDelete, id);
}

module.exports = {salvarCliente,listarClientes,atualizarCliente,removerCliente}
