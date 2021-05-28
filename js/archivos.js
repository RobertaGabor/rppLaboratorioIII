var peticionHttp= new XMLHttpRequest();
var listaAutos;
var id1;
var fila;
window.addEventListener('load',function()
{
    TraerAutos();
    var x=$("close");
    x.addEventListener("click",close);

    var add=$("alta");
    add.addEventListener("click",agregar);



});

// var peticionHttp= new XMLHttpRequest();
// window.onload = function() {
//     TraerPersonas();
// };
function close()
{
    cuadro=$("cargar");
    cuadro.hidden=true;
}
function $(id)
{
    return document.getElementById(id);
}

function TraerAutos()
{

    peticionHttp.onreadystatechange=function(){
     
        if(peticionHttp.readyState==4 && peticionHttp.status==200)
        { 
            listaAutos=JSON.parse(peticionHttp.responseText);
            var bool=true;
            for(var i=0;i<listaAutos.length;i++)
            {
                var cuerpo=$("tcuerpo");
                var row= document.createElement("tr");               
                cuerpo.appendChild(row);
                
                var tdId=document.createElement("td");
                row.appendChild(tdId);
                var textoId=document.createTextNode(listaAutos[i].id);
                tdId.appendChild(textoId);
 

                var tdMarca=document.createElement("td");
                row.appendChild(tdMarca);
                var textoMarca=document.createTextNode(listaAutos[i].make);
                tdMarca.appendChild(textoMarca);
                
                var tdModelo=document.createElement("td");
                row.appendChild(tdModelo);
                var textoModelo=document.createTextNode(listaAutos[i].model);
                tdModelo.appendChild(textoModelo);


                var tdFecha=document.createElement("select");
                tdFecha.setAttribute("year","mySelect");

                var o;
                //var cboFecha=document.createTextNode(listaAutos[i].year);
                var cboFecha
                for(y=2000;y<2021;y++)
                {
                    o= document.createElement("option");
                    o.setAttribute("value","example");
                    cboFecha=document.createTextNode(y);
                    o.appendChild(cboFecha);
                    tdFecha.appendChild(o);
                    
                }
                o= document.createElement("option");
                o.setAttribute("value","example");
                cboFecha=document.createTextNode(listaAutos[i].year);
                o.appendChild(cboFecha);
                tdFecha.appendChild(o);
                
                row.appendChild(tdFecha);

                if(bool==true)
                {
                    row.className="td1";
                }
                else
                {
                    row.className="td2";
                }
                bool=!bool;
                //row.addEventListener("dblclick",modificar); //aCA DEBERIA MODIFICAR FECHA Y ENMVIAR DIRECTO CUANDO CAMBIE ESTADO DE CBOBOX
            }
        }
        
    }
    peticionHttp.open("GET","http://localhost:3000/autos",true);
    peticionHttp.send();  
}

function agregar(event)
{
    fila=event.target.parentNode;
    id1 = fila.childNodes[0].childNodes[0];
    cuadro=$("cargar");
    cuadro.hidden=false;
    
    // var txtmarca;
    // var txtmodelo;
    // var dateFecha;
    
    // txtmarca=fila.cells[1].innerHTML;
    // dateFecha=fila.cells[3].innerHTML;
    // txtmodelo=fila.cells[2].innerHTML;
    var addd=$("yes");
    var canc=$("no");


    addd.onclick=function()
    {
        var nombre=$("txtNombre").value;

        var cuatri=$("txtCuatrimestre").value;
        var id = fila.childNodes[0].innerHTML;
        var fecha=$("dteFecha").value;
        var turno;
        var bool=false;
    
    
        const hoy = Date.now();
        const today = new Date(hoy);
    
        var fechaType=Date.parse(fecha);
        const dateIso = new Date(fechaType);

        if(nombre.length>=6 && dateIso.getTime()>=today.getTime())
        {
            if($("tm").checked==true)
            {
                turno="Mañana";
                bool=true;
    
            }
            else
            {
                turno="Noche";
                bool=true;
            }
        }
    
        if(bool==true)
        {
           
            var stringPersona;
            var array = fecha.split("-");
            fecha = array[2] + "/" + array[1] + "/" + array[0];

            peticionHttp.onreadystatechange=function()
            {
                var personaJson={"id":id,"nombre":nombre,"cuatrimestre":cuatri,"fechaFinal":fecha,"turno":turno};

                stringPersona=JSON.stringify(personaJson); 
                if(peticionHttp.status == 200 && peticionHttp.readyState == 4)
                {
                    
                    $("load").style.display = "none";
                    close();
                    fila.childNodes[1].innerHTML=nombre;
                    fila.childNodes[2].innerHTML=cuatri;
                    fila.childNodes[3].innerHTML=fecha;
                    fila.childNodes[4].innerHTML=turno;
                    fila.childNodes[0].innerHTML=id; 
                }
    
                
            }
                $("load").style.display = "flex";
                peticionHttp.open("POST","http://localhost:3000/editar",true);
                peticionHttp.setRequestHeader("Content-type","application/json");
                peticionHttp.send(stringPersona);
        }       
    }




    canc.onclick=function()
    {
        var delId=fila.childNodes[0].innerHTML;
        var personaJson={"id":delId};
        stringPersona=JSON.stringify(personaJson); 
        peticionHttp.onreadystatechange=function()
        {
            if(peticionHttp.status == 200 && peticionHttp.readyState == 4)
            {
                $("load").style.display = "none";
                close();
                fila.removeChild(fila.childNodes[0]);
                fila.removeChild(fila.childNodes[0]);
                fila.removeChild(fila.childNodes[0]);
                fila.removeChild(fila.childNodes[0]);
                fila.removeChild(fila.childNodes[0]);
            }           

        }
        $("load").style.display = "flex";
        peticionHttp.open("POST","http://localhost:3000/eliminar",true);
        peticionHttp.setRequestHeader("Content-type","application/json");
        peticionHttp.send(stringPersona);
    }
}

