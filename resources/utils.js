const forbidden = [
    "parseInt", "document.write", "eval", "isNaN", "unescape", "escape",
    "parseFloat", "parseInt", "eval", "isNaN", "onload", "alert", "script",
    "<",  ">", "onload", "=", "(", ")", '"' ,"'" ,"/", "#"]
// const forbidden = []   

const getForbidden = () =>{
    return forbidden
}
const btoa = (text) => {
    return Buffer.from(text, 'binary').toString('base64');
};

const atob = (base64) => {
    return Buffer.from(base64, 'base64').toString('binary');
};
const reemplazarTodos = (palabra,reemplazar) =>{

    while(palabra.includes(reemplazar)){
        palabra = palabra.replace(reemplazar,'')
    }
    return palabra
}

 const limpiarRequest = (data) =>{
    
    forbidden.forEach(word => {
        let valores = Object.values(data); ;
        for(let i=0; i< valores.length; i++){
        valores[i] = reemplazarTodos(valores[i],word)
        }
    })
    return data
    
}
module.exports = {
    getForbidden,
    reemplazarTodos,
    limpiarRequest,
    btoa,
    atob,
}

