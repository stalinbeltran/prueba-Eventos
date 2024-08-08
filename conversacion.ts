
class Conversacion{
    telefonoCliente:string
    telefono:string
    status:string
    constructor(telefonoCliente, telefono, status){
        this.telefono = telefono
        this.telefonoCliente = telefonoCliente
        this.status = status
    }

    setStatus = (status)=>{
        this.status = status
        console.log('status', this.status);
        
    }
}

export default Conversacion