
class Mensaje{
    msg:string
    telefonoCliente:string
    numero:string
}

class Conversacion{
    telefono:string
    nombreEvento:string
    constructor(nombreEvento, telefono){
        this.nombreEvento = nombreEvento
        this.telefono = telefono
    }

}

export {Conversacion, Mensaje} 