
import { Mensaje } from "./conversacion";
import IngresaDato from './IngresaDato'

class IngresaTelefono extends IngresaDato{
    
    ingresaTelefono = ()=> {
        return this.ingresa(
            ()=>{
                console.log('-------por favor ingrese sus telefonos:')
            },
            (msg:Mensaje)=>{
                console.log('-------guardamos sus telefonos: ' + msg.numero)
            }
        )
    }

}

export default IngresaTelefono