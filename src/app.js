import express from "express";

import { ProductManager } from "./productManager.js";
const port = 8080;//puerto de conexion, atravez del puerto recibo o envio informacion en mi computadora

//creamos la aplicacion del servidor
const app = express();

//levantar el servidor, l aplicacion va a estar pendiente de recibir peticiones,le indicamos el puerto por donde va a recibir la info
app.listen(port,()=>console.log(`El servidor esta escuchando en el puerto ${port}`));
//colocar el el package.json type:module para usar ES6 express en nodejs
//arreglo usuarios

//declaro la instaciade la clase
const prodService = new ProductManager("./src/products.json");



   app.get("/products", async (req,res)=>{
     try {
         const result = await prodService.getProduct();
         console.log("resultado", result);
         
         const limite = parseInt(req.query.limite);
        
         if(limite>0){
            const limitReq = result.filter(prod=>prod.id <=limite);
            res.send(limitReq);
            
        }else{
            res.send(result);
          }
         
    } catch (error) {
          res.send(error.message);
      };
});

app.get("/products/:pid", async (req, res) => {
    try {        //console.log(result);  
        const result = await prodService.getProduct();
        console.log("resultaado", result)
        const pid = parseInt(req.params.pid);
        console.log("elem", pid)
        const idProd = result.find(elem => elem.id === pid);
        res.send(idProd);
    } catch (error) {
        res.send(error.message);
    }


})