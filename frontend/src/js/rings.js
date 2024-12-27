async function getProductData() {
    try {
        const response = await fetch("http://localhost:4000/api/v1/product/getProduct");
        console.log(response);
        const productData = await response.json();
<<<<<<< HEAD
        console.log(productData);
        console.log(productData[0].productName);
        
=======
        
        // Assuming productData is an array of product objects
        const ringProducts = productData.filter(product => 
            product.type.toLowerCase().includes("ring")
        );
>>>>>>> 7dfb5108213d79a2019a76544de58f4cb3111841
        
        console.log("All Ring Products:");
        ringProducts.forEach((ring, index) => {
            console.log(`Ring ${index + 1}:`);
            console.log(`  Name: ${ring.name}`);
            console.log(`  Material: ${ring.material}`);
            console.log(`  Price: ${ring.price}`);
            console.log(`  Availability: ${ring.availability ? "In Stock" : "Out of Stock"}`);
            console.log(`  Variations:`);
            if (ring.variations && ring.variations.length > 0) {
                ring.variations.forEach((variation, varIndex) => {
                    console.log(`    Variation ${varIndex + 1}:`);
                    console.log(`      Size: ${variation.size}`);
                    console.log(`      Color: ${variation.color}`);
                    console.log(`      Price: ${variation.price}`);
                });
            } else {
                console.log(`    No variations available.`);
            }
        });

    } catch (err) {
        console.log(err?.message);
    }
}

getProductData();
