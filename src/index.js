
import {ProductManager} from "./productManager.js";//exporto el archivo y lo guardo dentro de llaves

const filePath = "./products.json";

const products = new ProductManager("products.json");//creo el objeto con la clase exportada

console.log("productos:::", products);

//funcion para utilizar metodos asincronos del manager
const producto1= {

   title:"zapatilla",
   description:"zapatilla deportiva",
   price:500,
   thumbnail:"img",
   code:1,
   stock:10,
};

const producto2= {
  
   title:"zapatos",
   description:"informal",
   price:300,
   thumbnail:"img2",
   code:2,
   stock:23,
};
const producto3= {
  
   title:"ojota",
   description:"para playa",
   price:600,
   thumbnail:"img1",
   code:3,
   stock:23,
};
const centroCtl = async()=>{
   try {
    const exist = products.fileExist();//llamo a metodo exist 
    console.log("exist", exist)   

      const resultado = await products.getProduct();// este metodo es una promesa porque la decalramos async 
      console.log("resultado",resultado);  

       await products.addProduct(producto1);
       await products.addProduct(producto2);
       await products.addProduct(producto3);
    
       await products.getProductById(3);
  
       //await products.upDateProduct();
       //await products.deleteProduct(1);
      


   } catch (error) {
    console.log(error.message);
   };
};

centroCtl();

