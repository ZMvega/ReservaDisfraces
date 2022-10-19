//FUNCIONES DISFRAZ
function leerDisfraces(){
    $.ajax({
        url : 'http://localhost:8080/api/Costume/all',
        type : 'GET',
        dataType : 'json',

        success : function(disfraces){
            let items=disfraces.items;
            $("#TbodyDisfraz").empty();
            for(disfraces of disfraces) {
                let tableDisfraz = document.createElement("tr")
                tableDisfraz.innerHTML += "<td><center>"+disfraces.name+"</center></td>";
                tableDisfraz.innerHTML += "<td><center>"+disfraces.brand+"</center></td>";
                tableDisfraz.innerHTML += "<td><center>"+disfraces.year+"</center></td>";
                tableDisfraz.innerHTML += "<td><center>"+disfraces.description+"</center></td>";

                tableDisfraz.innerHTML += "<td><button onclick='borrarDisfraz(" + disfraces.id + ")'>Borrar</button></tr>";

                $("#TbodyDisfraz").append(tableDisfraz);
            }
        }

    });
}


function guardarDisfraz(){
    let nombreDisfraz=$('#nombreDisfraz').val();
    let marcaDisfraz=$('#marcaDisfraz').val();
    let anioDisfraz=$('#anioDisfraz').val();
    let descripcionDisfraz=$('#descripcionDisfraz').val();


    let data={
        name:nombreDisfraz,
        brand:marcaDisfraz,
        year:anioDisfraz,
        description:descripcionDisfraz,
    };

    let dataToSend=JSON.stringify(data);

    $.ajax({
        url : 'http://localhost:8080/api/Costume/save',
        type : 'POST',
        dataType : 'JSON',
        data : dataToSend,
        contentType : 'application/json',

        success : function(disfraz){
            console.log(disfraz)
            $('#marcaDisfraz').val("");
            $('#nombreDisfraz').val("");
            $('#anioDisfraz').val("");
            $('#descripcionDisfraz').val("");
        },
        complete : function(){
            leerDisfraces();
        }
    });
}


function editarDisfraz(){
    let marcaDisfraz=$('#marcaDisfraz').val();
    let nombreDisfraz=$('#nombreDisfraz').val();
    let anioDisfraz=$('#anioDisfraz').val();
    let descripcionDisfraz=$('#descripcionDisfraz').val();

    let data={
        name:nombreDisfraz,
        brand:marcaDisfraz,
        year:anioDisfraz,
        description:descripcionDisfraz,
    };

    let dataToSend=JSON.stringify(data);

    $.ajax({
        url : 'http://localhost:8080/api/Costume/update',
        type : 'PUT',
        dataType : 'JSON',
        data : dataToSend,
        contentType : 'application/json',

        success : function(disfraz){
            console.log(disfraz);
            $('#marcaDisfraz').val("");
            $('#nombreDisfraz').val("");
            $('#anioDisfraz').val("");
            $('#descripcionDisfraz').val("");
        },
        complete : function(){
            leerDisfraces();
        }
    });
}


function borrarDisfraz(id){
    let data={
        id:id
    };
    let dataToSend=JSON.stringify(data);

    $.ajax({
        url : 'http://localhost:8080/api/Costume/'+id,
        type : 'DELETE',
        dataType : 'JSON',
        data : dataToSend,
        contentType : 'application/JSON',

        success : function(borrando){
            $('#marcaDisfraz').val("");
            $('#nombreDisfraz').val("");
            $('#anioDisfraz').val("");
            $('#descripcionDisfraz').val("");
        },
        complete : function(){
            leerDisfraces();
        }
    });
}