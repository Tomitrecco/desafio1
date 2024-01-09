class ProductManager{

    static ultId=0
    constructor(){
        this.products=[]

    }

    addProduct(title, description, price, img, code, stock){
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

    }
    getProducts(){
        return this.products;

    }
    getProductsById(id){
        const product=this.products.find(item => item.id===id)
        if (!product){
            console.error("Not Found")
        }else {
            console.log(product);
        }
    }
}




