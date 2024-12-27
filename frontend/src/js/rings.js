async function getProductData() {
    try {
        const response = await fetch("http://localhost:4000/api/v1/product/getProduct");
        const productData = await response.json();
        
        console.log(productData);
        
    } catch (err) {
        console.log(err?.message);
    }
}

getProductData();