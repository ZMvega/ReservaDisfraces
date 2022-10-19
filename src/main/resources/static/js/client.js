//FUNCIONES DISFRAZ
function leerClientes(){
    $.ajax({
        url : 'http://localhost:8080/api/Client/all',
        type : 'GET',
        dataType : 'json',

        success : function(disfraces){
            let items=disfraces.items;
            $("#Tbodycliente").empty();
            for(disfraces of disfraces) {
                let tableDisfraz = document.createElement("tr")
                tableDisfraz.innerHTML += "<td><center>"+disfraces.name+"</center></td>";
                tableDisfraz.innerHTML += "<td><center>"+disfraces.email+"</center></td>";
                tableDisfraz.innerHTML += "<td><center>"+disfraces.age+"</center></td>";

                tableDisfraz.innerHTML += "<td><button onclick='borrarCliente(" + disfraces.idClient + ")'>Borrar</button></tr>";

                $("#Tbodycliente").append(tableDisfraz);
            }
        }

    });
}

function guardarCliente(){
    let nombre=$('#nombre').val();
    let email=$('#email').val();
    let age=$('#age').val();
    let password=$('#password').val();


    let data={
        name:nombre,
        email:email,
        age:age,
        password:password,
    };

    let dataToSend=JSON.stringify(data);

    $.ajax({
        url : 'http://localhost:8080/api/Client/save',
        type : 'POST',
        dataType : 'JSON',
        data : dataToSend,
        contentType : 'application/json',

        success : function(disfraz){
            console.log(disfraz)
            $('#nombre').val("");
            $('#email').val("");
            $('#age').val("");
            $('#password').val("");
        },
        complete : function(){
            leerClientes();
        }
    });
}



function borrarCliente(idClient){
    let data={
        id:idClient
    };
    let dataToSend=JSON.stringify(data);

    $.ajax({
        url : 'http://localhost:8080/api/Client/'+idClient,
        type : 'DELETE',
        dataType : 'JSON',
        data : dataToSend,
        contentType : 'application/JSON',

        success : function(borrando){
            $('#nombre').val("");
            $('#email').val("");
            $('#age').val("");
            $('#password').val("");
        },
        complete : function(){
            leerClientes();
        }
    });
}