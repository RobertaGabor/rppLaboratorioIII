var peticionHttp= new XMLHttpRequest();
var listaAutos;
var id1;
var fila;
var bool=true;
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
            
            
            for(var i=0;i<listaAutos.length;i++)
            {
                id1=listaAutos[i].id;
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
                o= document.createElement("option");
                o.setAttribute("value","example");
                cboFecha=document.createTextNode(listaAutos[i].year);
                o.appendChild(cboFecha);
                tdFecha.appendChild(o);
                for(y=2000;y<2021;y++)
                {
                    if(y!=listaAutos[i].year)
                    {
                        o= document.createElement("option");
                        o.setAttribute("value","example");
                        cboFecha=document.createTextNode(y);
                        o.appendChild(cboFecha);
                        tdFecha.appendChild(o);                       
                    }

                    
                }

                
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
                tdFecha.addEventListener("change",modificar);
            
            
            }
        }
        
    }
    peticionHttp.open("GET","http://localhost:3000/autos",true);
    peticionHttp.send();  
}

function modificar(event)
{
    fila=event.target.parentNode;
    var id = fila.childNodes[0].childNodes[0].textContent;
    var stringPersona;

    peticionHttp.onreadystatechange=function()
    {
        var anio=fila.childNodes[3].childNodes[0].textContent;
        var personaJson={"id":id,"year":anio};

        stringPersona=JSON.stringify(personaJson); 
        if(peticionHttp.status == 200 && peticionHttp.readyState == 4)
        {
            
            $("load").style.display = "none";
            close();
            fila.childNodes[3].childNodes[0]=anio;

        }

        
    }
        $("load").style.display = "flex";
        peticionHttp.open("POST","http://localhost:3000/editarYear",true);
        peticionHttp.setRequestHeader("Content-type","application/json");
        peticionHttp.send(stringPersona);
}

function agregar(event)
{
   

    cuadro=$("cargar");
    cuadro.hidden=false;

    var addd=$("yes");
    var canc=$("no");


    addd.onclick=function()
    {
        var marca=$("txtMarca").value;
        var ok=true;
        var modelo=$("txtModelo").value;
        var fecha=$("txtAño").value;
        id1=id1+1;
        if(marca.length<3)
        {
            $("txtMarca").className="error";
            ok=false;
        }

        if(modelo.length<3)
        {
            $("txtModelo").className="error";
            ok=false;
        }
        if(ok==true)
        {
            var stringPersona;
            peticionHttp.onreadystatechange=function()
            {
                var personaJson={"id":id1,"make":marca,"model":modelo,"year":fecha};

                stringPersona=JSON.stringify(personaJson); 
                if(peticionHttp.status == 200 && peticionHttp.readyState == 4)
                {
                    
                    
                    $("load").style.display = "none";
                    close();
                    var cuerpo=$("tcuerpo");
                    var row= document.createElement("tr");               
                    cuerpo.appendChild(row);
                    
                    var tdId=document.createElement("td");
                    row.appendChild(tdId);
                    var textoId=document.createTextNode(id1);
                    tdId.appendChild(textoId);
     
    
                    var tdMarca=document.createElement("td");
                    row.appendChild(tdMarca);
                    var textoMarca=document.createTextNode(marca);
                    tdMarca.appendChild(textoMarca);
                    
                    var tdModelo=document.createElement("td");
                    row.appendChild(tdModelo);
                    var textoModelo=document.createTextNode(modelo);
                    tdModelo.appendChild(textoModelo);
    
    
                    var tdFecha=document.createElement("select");
                    tdFecha.setAttribute("year","mySelect");
    
                    var o;
                    var cboFecha;
                    o= document.createElement("option");
                    o.setAttribute("value","example");
                    cboFecha=document.createTextNode(fecha);
                    o.appendChild(cboFecha);
                    tdFecha.appendChild(o);
                    for(y=2000;y<2021;y++)
                    {
                        o= document.createElement("option");
                        o.setAttribute("value","example");
                        cboFecha=document.createTextNode(y);
                        o.appendChild(cboFecha);
                        tdFecha.appendChild(o);
                        
                    }

                    
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
                }
    
                
            }
                $("load").style.display = "flex";
                peticionHttp.open("POST","http://localhost:3000/nuevoAuto",true);
                peticionHttp.setRequestHeader("Content-type","application/json");
                peticionHttp.send(stringPersona);
        }
    

    }




    canc.onclick=function()
    {
        close();
    }
}

