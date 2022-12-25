const tbCliente = document.getElementById("tbCliente");
const tbody = document.getElementsByTagName('tbody')[0];
const btnSalvarCliente = document.querySelector('#btnSalvarCliente');
const formCliente = document.querySelector('#formCliente');
const btnLimparForm = document.querySelector("#btnLimparForm")
var i =0;
let linhaSelecionada;



function inserirLinha(cliente){
    //criar linha
    const trCliente = document.createElement("tr");

    //criar colunas
    const tdId = document.createElement("td");
          tdId.style["display"] = 'none';
          tdId.classList.add("data-id");
    const tdNome = document.createElement("td");
            tdNome.classList.add("data-nome");
    const tdEmail = document.createElement("td");
    tdEmail.classList.add("data-email");

    const tdCpf = document.createElement("td");
    tdCpf.classList.add("data-cpf");

    //adiciona as colunas na linha
    tdId.textContent = cliente.id;
    tdId.value = cliente.id;
    tdNome.textContent = cliente.nome;
    tdEmail.textContent = cliente.email;
    tdCpf.textContent = cliente.cpf;
    trCliente.append(tdId);
    trCliente.append(tdNome);
    trCliente.append(tdEmail);
    trCliente.append(tdCpf);
    
    //inserir linha no corpo da tabela
    tbody.append(trCliente);


    //Criar Colunas para âncoras
    const tdAncoraEditar = document.createElement('td');
    const ancoraEditar = document.createElement('a');
            ancoraEditar.setAttribute("href","#");
            ancoraEditar.id = "editar";
            ancoraEditar.textContent = 'Editar';
            tdAncoraEditar.append(ancoraEditar);
        
          

    const tdAncoraRemover = document.createElement('td');
    const ancoraRemover = document.createElement('a');
        ancoraRemover.setAttribute("href","#");
        ancoraRemover.textContent = 'Remover';
        ancoraRemover.id = "remover";

        tdAncoraRemover.append(ancoraRemover);
        
    trCliente.append(tdAncoraEditar);
    trCliente.append(tdAncoraRemover);


}

async function cadastrarCliente(cliente){
    console.log(formCliente.id.value);
    let id = parseInt(formCliente.id.value);

    if(isNaN(id)){   
    console.log("CADASTRAR CLIENTE")     
        await fetch("http://127.0.0.1:8001/clientes",
        {
        method:'POST',
        headers:{
            'Content-Type':"application/json"
        },
        body: JSON.stringify(cliente)
        })
        .then((cliente)=>{           
               console.log("cliente "+cliente);
               console.table(cliente);

        });
        
        inserirLinha(cliente) 
        formCliente.reset();
    } else if(formCliente.id.value = linhaSelecionada.children[0].textContent){
       console.log("Linha "+ linhaSelecionada.children[0].textContent);
       
       fetch("http://127.0.0.1:8001/clientes/"+id,
       {
           method:'PUT',

           headers:{
               'Content-Type':"application/json"
           },

           body: JSON.stringify(cliente)
       })
       
       linhaSelecionada.children[1].textContent = formCliente.nome.value;
       linhaSelecionada.children[2].textContent = formCliente.email.value;
       linhaSelecionada.children[3].textContent = formCliente.cpf.value;
       formCliente.id.value = '';
       formCliente.reset();
}

}

btnSalvarCliente.addEventListener('click',(event)=>{
    event.preventDefault();

    const cliente ={
        nome:formCliente.nome.value,
        email:formCliente.email.value,
        cpf: formCliente.cpf.value

    }

    cadastrarCliente(cliente);
    

});


btnLimparForm.addEventListener('click',(event)=>{
    event.preventDefault();
    formCliente.reset();
})

tbody.addEventListener("click",(event)=>{
    let id =event.target.parentNode.parentNode.children[0].textContent;
    if(event.target.id ===  'remover'){
        fetch("http://127.0.0.1:8001/clientes/"+id,
        {
            method:'DELETE'
        })
        event.target.parentNode.parentNode.remove();
    }else if(event.target.id === "editar"){
        const linha = event.target.parentNode.parentNode;
        console.log(event.target.id);
        linhaSelecionada = linha;
        formCliente.id.value = linha.children[0].textContent;
        formCliente.nome.value = linha.children[1].textContent;
        formCliente.email.value = linha.children[2].textContent;
        formCliente.cpf.value = linha.children[3].textContent;
    }
});


async function listarClientes(){
   await fetch("http://127.0.0.1:8001/clientes")
    .then(async (res)=>await res.json())
    .then((clientes)=>{
            clientes.forEach(cliente=> {
                inserirLinha(cliente);
            });
        });
}


window.addEventListener('load',(event)=>{
    event.preventDefault();
    listarClientes();
});
