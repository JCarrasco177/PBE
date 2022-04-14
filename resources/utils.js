const forbidden = [
    "parseInt", "document.write", "eval", "isNaN", "unescape", "escape",
    "parseFloat", "parseInt", "eval", "isNaN", "onload", "alert", "script",
    "<",  ">", "onload", "=", "(", ")", '"' ,"'" ,"/"]

exports.getForbidden = () =>{
    return forbidden
}

reemplazarTodos = (palabra,reemplazar) =>{

    while(palabra.includes(reemplazar)){
        console.log(`Se ha reemplazado ${reemplazar} en ${palabra}`)
        palabra = palabra.replace(reemplazar,'')
    }
    return palabra
}

exports.limpiarRequest = (data) =>{
    
    forbidden.forEach(word => {
        var usuario = data.usuario
        var password = data.password 
        usuario = reemplazarTodos(usuario,word)
        password = reemplazarTodos(password,word)
        data = {
            usuario,
            password
        }
    })
    return data
    
}



