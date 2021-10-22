function salvarCliente() {
    nome = $('#nome').val();
    cpf = $('#cpf').val();

    telefone  = $('#telefone').val();
    email     = $('#email').val();
    cep       = $('#cep').val();
    rua       = $('#rua').val();
    bairro    = $('#bairro').val();
    cidade    = $('#cidade').val();
    estado    = $('#estado').val();

    var cliente = {
        nome: nome,
        cpf: cpf,
        telefone : telefone ,
        email    : email    ,
        cep      : cep      ,
        rua      : rua      ,
        bairro   : bairro   ,
        cidade   : cidade   ,
        estado   : estado   
    }

    jQuery.ajax ({
        url: 'http://localhost:8080/cliente/novo',
        type: "POST",
        data: JSON.stringify(cliente),
        dataType: "text",
        contentType: "application/json; charset=utf-8",
        success: function(data){
            alert('Cliente com id='+data+' cadastrado!');
            limparCampos();
        }
    });

}

function limparCampos(){
    $('#nome').val('');
    $('#cpf').val('');
    $('#telefone').val('');
    $('#email').val('');
    $('#cep').val('');
    $('#rua').val('');
    $('#bairro').val('');
    $('#cidade').val('');
    $('#estado').val('');
}

function limpaTabela() {
    $("#clientes").html("");
}
function carregaClientes() {
    $.get("http://localhost:8080/clientes", function (data) {
        limpaTabela();
        data.forEach(element => {
            criaLinha(element);
        });
    });
}

function excluirCliente(id){
    $.get("http://localhost:8080/cliente/excluir/"+id, function (data) {
        carregaClientes();
    });
}


function criaLinha(element) {
    $tr   = $( "<div class='table_tr'></div>" );
    $tr.append($( "<div class='table_col'><div class='table_td'><span>"+element.id+"</span></div></div>" ));
    $tr.append($( "<div class='table_col'><div class='table_td'><span>"+element.nome+"</span></div></div>" ));
    $tr.append($( "<div class='table_col'><div class='table_td'><span>"+element.cpf+"</span></div></div>" ));
    $tr.append($( "<div class='table_col'><div class='table_td'><span>"+element.telefone+"</span></div></div>" ));
    $tr.append($( "<div class='table_col'><div class='table_td'><span>"+element.email+"</span></div></div>" ));
    $tr.append($( "<div class='table_col'><div class='table_td'><span>"+element.rua+"</span></div></div>" ));
    $tr.append($( "<div class='table_col'><div class='table_td'><span>"+element.bairro+"</span></div></div>" ));
    $tr.append($( "<div class='table_col'><div class='table_td'><span>"+element.cidade+"</span></div></div>" ));
    $tr.append($( "<div class='table_col'><div class='table_td'><span>"+element.estado+"</span></div></div>" ));
    $tr.append($( "<div class='table_col'><div class='table_td'><span>"+element.cep+"</span></div></div>" ));

    $tr.append($( "<div class='table_col'><div class='table_td'><button class='btn_delete' onclick='excluirCliente("+element.id+")' type='button'><img src='/images/delete.png'></button></span></div></div>" ));

    $("#clientes").append($tr);
}