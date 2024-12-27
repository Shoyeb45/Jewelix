async function getProductData() {
    try {
        const response = await fetch("http://localhost:4000/api/v1/product/getProduct");
        console.log(response);
        const productData = await response.json();
        console.log(productData);
        console.log(productData[0].productName);
        
        
    } catch (err) {
        console.log(err?.message);
    }
}

getProductData();