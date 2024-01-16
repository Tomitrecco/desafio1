const { log } = require("console");

const fs= require("fs").promises
class ProductManager{

    static ultId=0
    constructor(path){
        this.products=[]
        this.path=path;

    }

    async addProduct({title, description, price, img, code, stock}){
        if(!title || !description ||!price||!img||!code||!stock){
        console.log("Complete todos los campos");
        return;
        }

        if (this.products.some(item=> item.code===code)) {
            console.log("El codigo debe ser unico");
        }
        const newProduct={
            id: ProductManager.ultId++,
            title,
            description,
            price,
            img,
            code,
            stock
        }

        this.products.push(newProduct)

        await this.saveFile(this.products)

    }
    async getProducts(){
        //return this.products;
        await this.readFile()

    }
    async getProductsById(id){
        try {
            const arrayProductos= await fs.readFile(this.path, "utf-8");
            const buscado= arrayProductos.find(item=>item.id===id);
            return buscado
        } catch (error) {
            console.log(error);
            
        }
       
    }

    async readFile(){
        try {
            const respuesta= await fs.readFile(this.path, "utf-8")
            const arrayProductos= JSON.parse(respuesta)
            return arrayProductos
        } catch (error) {
            console.log("error al leer", error);
            
        }
    }
    async saveFile(arrayProductos){
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2))
            
        } catch (error) {
            console.log("error al guardar", error);
            
        }
    }


    async updateProduct(id, updatedFields) {
        try {
            const arrayProductos = await this.readFile();
            const index = arrayProductos.findIndex(item => item.id === id);
    
            if (index === -1) {
                console.log("Producto no encontrado");
                return;
            }
    
            l
            updatedFields.id = id;
    
            
            arrayProductos[index] = updatedFields;
    
           
            await this.saveFile(arrayProductos);
            console.log("Producto actualizado correctamente");
        } catch (error) {
            console.log("Error al actualizar el producto", error);
        }
    }

    async deleteProduct(id) {
        try {
            const arrayProductos = await this.readFile();
            const updatedProducts = arrayProductos.filter(item => item.id !== id);
    
            if (updatedProducts.length === arrayProductos.length) {
                console.log("Producto no encontrado");
                return;
            }
    
        
            await this.saveFile(updatedProducts);
            console.log("Producto eliminado correctamente");
        } catch (error) {
            console.log("Error al eliminar el producto", error);
        }
    }
}



