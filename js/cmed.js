document.addEventListener('DOMContentLoaded',function(){
    //seleccionamos elementos de la interfaz

    class RutValidador{
        constructor(run){
            this.run = run;
            // obtenemos el ultimo caracter igresado del run
            this.dv = this.run.substring(this.run.length - 1);
            // limpiar el run dejando solamente los numeros
            this.run = this.run.substring(0, this.run.length - 1).replace(/\D/g, '');
            this.esValido = this.validarRut();
        }
        validarRut(){
            let numerosArray = this.run.split('').reverse();
            let acumulador = 0;
            let multiplicador = 2;
            for (let numero of numerosArray){
                acumulador += parseInt(numero) * multiplicador;
                multiplicador++;
                if(multiplicador == 8 ){
                    multiplicador = 2;
                }
            }
            let dv = 11 - (acumulador % 11);
            if (dv == 11)
                dv = '0'
            if (dv == 10)
                dv = 'k'

            // console.log('Digito calculado:',dv);
            return dv == this.dv.toLowerCase();

        };

        formato() {
            if (!this.esValido) return '';

            return (this.run.toString().replace(/\B(?=(\d{3})+(?!\d))/g , '.')) + '-' + this.dv;
        }
    };

    // let clasValidador = new RutValidador('30.686.957-4');
    // console.log(clasValidador.formato());


    // console.log('numeros', clasValidador.run);
    // console.log('Dig verificador:', clasValidador.dv );




    const Medico = {
        run:'',
        nombres:'',
        paterno:'',
        materno:'',
        edad:'',
        email:'',
        prevision:'',
        celular:'',
        alergias:'',
        

   
    }

    const inputRun = document.querySelector('#run');
    const inputNombre = document.querySelector('#nombres');
    const inputApellidopat = document.querySelector('#paterno');
    const inputApellidomat = document.querySelector('#materno');
    const inputEdad = document.querySelector('#edad');
    const inputEmail = document.querySelector('#email');
    const inputPrevision = document.querySelector('#prevision');
    const inputAlergias = document.querySelector('#alergias');
    const inputSialergias = document.querySelector('#AlergiasText');
    const inputCelular = document.querySelector('#celular');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type ="submit"]');
    const btnReset = document.querySelector('#formulario button[type ="reset"]');
    const spinner = document.querySelector('#spinner');
    




    // Asignar eventos
    
   

    inputSialergias.addEventListener('blur',validarSialergia);
    inputAlergias.addEventListener('change',validarAlergia);

    inputRun.addEventListener('blur', validarRun);

    inputNombre.addEventListener('blur', validarVerde);

    inputApellidomat.addEventListener('blur', validarVerde);

    inputApellidopat.addEventListener('blur', validarVerde);

    inputEdad.addEventListener('input', validarVerde);

    inputEmail.addEventListener('blur', validarVerde);

    // inputEspecialidad.addEventListener('blur', validarEspecialidad);

    inputPrevision.addEventListener('change', validarPrevision);


    inputCelular.addEventListener('blur',validarCelular);
    
    // inputFecha.addEventListener('blur', validarVerde);
    // inputFecha.addEventListener('blur', capturarFecha);

    // inputHorainicio.addEventListener('blur',validarVerde);
    // inputHoraFin.addEventListener('blur', validarVerde);


    // inputUbicacion.addEventListener('input', validarVerde);

    btnReset.addEventListener('click',function(e){
        e.preventDefault;
        resetFormulario();

    })

    btnSubmit.addEventListener('click',enviar);
    
    //Funcion que muestra la alerta


    function validarVerde(e){
        if(e.target.value.trim() === ''){
            mostrarAlerta2("el campo " + e.target.id + " es incorrecto", e.target.parentElement);
            Medico[e.target.name] = '';
            confirmarMedico();
           return;
           
        }
                      
        if(e.target.type === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta2(`el email ${e.target.value} no es valido`, e.target.parentElement);         
            Medico[e.target.name] = '';
            confirmarMedico();
            return;

        }

        // if(e.target.name === 'run' && !validarRut(e.target.value)){
        //     mostrarAlerta2(`el rut ${e.target.value} no es valido`, e.target.parentElement);         
        //     Medico[e.target.name] = '';
        //     confirmarMedico();
        //     return;

        // }        
        
        // if(e.target.id === 'Fecha' && e.target.value === ''){
        //     mostrarAlerta2(`la fecha ${e.target.value} no es valido`, e.target.parentElement);
        //     console.log(e);         
        //     Medico[e.target.name] = '';
        //     confirmarMedico();
        //     return;                
            
        // };

        // if(e.target.id === 'start_time' && e.target.value === ''){
        //     mostrarAlerta2(`la fecha ${e.target.value} no es valido`, e.target.parentElement);
        //     console.log(e);         
        //     Medico[e.target.name] = '';
        //     confirmarMedico();
        //     return;                
            
        // }; 
        
        // if(e.target.id === 'end_time' && e.target.value === ''){
        //     mostrarAlerta2(`la fecha ${e.target.value} no es valido`, e.target.parentElement);
        //     console.log(e);         
        //     Medico[e.target.name] = '';
        //     confirmarMedico();
        //     return;                
            
        // };          
        limpiarAlerta(e.target.parentElement);
        //Asignar valores al objeto Medico
        Medico[e.target.name] = e.target.value.trim().toLowerCase();

        console.log(e.target.value);
        confirmarMedico();      
        };
    
    function validarRun(e){
        let run = e.target.value;
        let runValidador = new RutValidador(run);

        if(runValidador.esValido){
            console.log(runValidador.run)
            Medico[e.target.name] = e.target.value;
            return;
        };
        mostrarAlerta2(`por favor selecciona una prevision válida, seleccionaste: ${e.target.value}`, e.target.parentElement);
        

    };


    function validarCelular(e){
        if(e.target.value ===''){
                Medico[e.target.name] = 'Sin numero';               
                return;
            
        };
            
    Medico[e.target.name] = e.target.value.trim().toLowerCase();
    console.log(e.target.value); 

    };


    function validarAlergia(e){
        if(e.target.value ==='No'){
                console.log('toma')
                
                Medico[e.target.name] = 'No alergico';
                confirmarMedico();      
                return;
            
        };
    //Si si es alergico llamo a la funcion para activar el textarea para escribir las alergias
    mostrarSialergia();
                
    };


    //Funcion para activar el textareaalergias
    function mostrarSialergia(e){
        const textarea = document.getElementById('AlergiasText');
        if (textarea){
            textarea.parentElement.style.display='block';
            // Medico[e.target.name] = e.target.value.trim().toLowerCase();

        };
    };

    //Funcion para capturar los datos del textareaAlergias
    function validarSialergia(e){
        if(e.target.value ===''){   
            mostrarAlerta2(`no deje el campo vacio`, e.target.parentElement);
            return;
        }
    Medico[e.target.name] = e.target.value.trim().toLowerCase();
    console.log(e.target.value);  
    };




    function validarPrevision(e){
        if(e.target.type ===''){
                console.log('alo');
                mostrarAlerta2(`por favor selecciona una prevision válida, seleccionaste: ${e.target.value}`, e.target.parentElement);
                Medico[e.target.name] = '';
                return;
            
        } 
    Medico[e.target.name] = e.target.value.trim().toLowerCase();
    console.log(e.target.value);
    console.log('alo');

    confirmarMedico();      


    }

    

    //Funcion validarEspecialidad
    function validarEspecialidad(e){
        // Validación específica para especialidad (select)  
        if(e.target.value ===''){
                mostrarAlerta2(`por favor selecciona una especialidad válida`, e.target.parentElement);
                Medico[e.target.name] = '';
                confirmarMedico();
                return;
            
        }
        limpiarAlerta(e.target.parentElement);
        //Asignar valores al objeto Medico
        Medico[e.target.name] = e.target.value.trim().toLowerCase();
        console.log(e.target.value);
        confirmarMedico();        
        }


    //Crea función que crea la alerta de correcto
    function mostrarAlerta2(e, referencia){
        limpiarAlerta(referencia);
        const error = document.createElement('P');
        error.textContent = e
        error.classList.add('bg-red-600', 'text-white', 'p-2','alerta1')
        referencia.appendChild(error);
        }



    // function mostrarAlergia(e, referencia){
  
    //     const titulo = document.createElement('P');
    //     const text = document.createElement('textarea');
    //     text.rows = 6;
    //     text.cols = 10;
    //     // text.style.color = 'rgba(210, 7, 7, 1)';
    //     // text.style.color = '#150000ff';
    //     text.id = 'alergiasTextarea';
    //     text.classList. add('w-full', 'textoArea');
    //     text.value = " Ejemplo: Ibuprofeno, amoxicilina, etc";
    //     titulo.textContent = e

    //     titulo.classList.add('bg-cyan-600', 'text-white', 'p-2',)
    //     referencia.appendChild(titulo);
    //     referencia.appendChild(text);

    //     }






    function limpiarAlerta(referencia){
        const ref = referencia.querySelector('.alerta1');
        if(ref){
            ref.remove();
            return;
        }
    }
    //Funcion que valida el email del formulario
    function validarEmail(em){
      const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
      const resultado = regex.test(em);
      console.log(resultado);
      return resultado;
 
    }

   
    


    

    function confirmarMedico(){
        console.log(Medico);
    if(Object.values(Medico).includes('')){
    btnSubmit.classList.add('opacity-50');
    btnSubmit.disabled = true;
               
    }
    else{
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    };
    }

    function enviar(){
        spinner.classList.add('flex');
        spinner.classList.remove('hidden'); 

        setTimeout(() =>{
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');
        resetFormulario();
        },500000)

    }

    function resetFormulario(){
        Medico.run='',
        Medico.nombres= '',
        Medico.paterno='',
        Medico.materno='',
        Medico.edad= '',
        Medico.email='',
        Medico.prevision='',
        Medico.celular= '',
        Medico.alergias='',

        formulario.reset();
        confirmarMedico();
    }


})

// //Funcion para calendario
// var fecha = new Date()

// //RECORDAR QUE VARIAS FECHAS DEL OBJETO DATE PARTEN DEL 0 (Dia y mes)
// var minuto = fecha.getMinutes();
// var hora = fecha.getHours();
// var dia = fecha.getDay();
// var mes = fecha.getMonth();
// var anio = fecha.getFullYear();

// //Función registrar datos de fecha de manera dinamica
// let fechaDia = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
// let fechaMes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 
// 'Diciembre'];

// console.log(`Se ha capturado la fecha. Hora:${hora} Minutos:${minuto} Dia:${fechaDia[dia]} Mes:${fechaMes[mes]} Año:${anio}`);

// //Funcion Caputrar dato del input fecha





