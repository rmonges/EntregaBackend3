
import fs from "fs";

  export class ProductManager {
    constructor(path){
        this.path=path;
        this.products=[];
    }
  

    fileExist(){
        return (fs.existsSync(this.path)) //chequeo si existe un archivo, devuelve true o false
               };
  
    async upDateProduct(){
        try {
            if(this.fileExist){
                this.products = await this.getProduct()
                return console.log("Datos cargados");
             }else{
              return console.log( "No seencontraron datos");
               };
        } 
        catch (error) {
            console.error(error.message)
           };
        };


    async addProduct(product){
        try {
            let newId;
            if(!this.products.length){
                newId=1;
                product.id= newId;
                console.log("primer ingreso del producto");

            }else{
                  newId=this.products[this.products.length -1].id+1;
                  product.id= newId;
                };
           
            if(this.products.some((prod)=>prod.code===this.products.code)){
              console.log("no reune las condiciones codigo repetido");
              return;
             };
        
               this.products.push(product);
               console.log(`Producto creado con ID Nro: ${newId}`);
              
            if(this.fileExist){
                const info = await fs.promises.readFile(this.path, "utf-8")
                const products =  JSON.parse(info);
                 products.push(product);
                 console.log(products);
            
            //escribo 
             await fs.promises.writeFile(this.path, JSON.stringify(products, null,'\t'));
                 console.log("producto creado")
              }else{
                  console.log("el archivo no existe");
                  await fs.promises.writeFile(this.path, JSON.stringify([product], null,'\t'));
                  console.log("producto cargado")
                  };

        } catch (error) {
            console.error(error.message);
        };
    };

    async getProduct(){
        try {
             
            if(this.fileExist){
                    const contenido = await fs.promises.readFile(this.path, "utf-8");
                    const prodJson = JSON.parse(contenido);
                    return prodJson;                    
            } else{
                return console.log("no hay achivos")
                }
        }catch (error) {
            console.error(error.message);
            return undefined;
        };
    };

    async getProductById(id){
        try {
           
            if(this.fileExist){
                const info = await fs.promises.readFile(this.path, "utf-8")
                const productsJson =  JSON.parse(info);
               //console.log("prductJSON",productsJson)
                const searchId = productsJson.some((product)=>{return product.id ===id});
              console.log("el archivo buscado es:",searchId);
              
                if(searchId){
                  const showProduct = this.products.find((product)=>{ return product.id === id});
                   console.log("mostrar producto cargado ById", showProduct)
                   const productById =  await fs.promises.writeFile(this.path, JSON.stringify ([showProduct], null,'\t'));
                  
                 return productById;
               } 
            }else{
                 console.error("Result Product seach byId : Dont Found");
               };
            }
         
        catch (error) {
            console.error(error.message);
            return undefined;
        }
    }; 
   
    async deleteProduct(id){
        try {
            if(this.fileExist){
            const idserch= this.products.find(product => product.id === id);
            console.log("elemento eliminado",idserch);
            const indice = this.products.indexOf(idserch);
            
             this.products.splice(indice,1);//elimino producto del array
           
             await fs.promises.writeFile(this.path, JSON.stringify(this.products, null,'\t'));  
             return(console.log(`Se elimino producto con id: ${id}`));
            
            }else{
                console.error("achivo no existe");
                }              
        } catch (error) {
            console.error(error.message);
            return undefined
        }

        
    };  
    

}
