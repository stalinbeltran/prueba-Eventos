
import { Mensaje } from "./conversacion";
import IngresaDato from './IngresaDato'

class IngresaNombre extends IngresaDato{

    ingresoNombre = async()=>{      
        //aquí realizamos todas las acciones asíncronas que se requieren para ingreso de nombre
        //en el orden deseado
        return this.ingresaNombres()
        .then(this.ingresaApellidos)
        .then(this.ingresaTitulo)
    }

    private ingresaApellidos = ()=> {
        return this.ingresa(
            ()=>{
                console.log('-------por favor ingrese sus apellidos:')
            },
            (msg:Mensaje)=>{
                console.log('-------guardamos sus apellidos: ' + msg.numero)
            }
        )
    }

    private ingresaTitulo = ()=> {
        return this.ingresa(
            ()=>{
                console.log('-------por favor ingrese sus titulo:')
            },
            (msg:Mensaje)=>{
                console.log('-------guardamos sus titulo: ' + msg.numero)
            }
        )
    }


    private ingresaNombres = () => {
        return this.ingresa(
            ()=>{
                console.log('-------por favor ingrese sus nombres:')
            },
            (msg:Mensaje)=>{
                console.log('-------guardamos sus nombres: ' + msg.numero)
            }
        )
    }

}

export default IngresaNombre