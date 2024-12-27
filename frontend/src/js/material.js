function openMaterialWindow(material) {
    const newWindow = window.open('', '_blank');
    newWindow.document.write('<html><head><title>' + material.charAt(0).toUpperCase() + material.slice(1) + ' Products</title></head><body><h1>Loading ' + material.charAt(0).toUpperCase() + material.slice(1) + ' Products...</h1><div id="product-container"></div></body></html>');
    getProductData(material, newWindow);
}

async function getProductData(material, newWindow) {
    try {
        const response = await fetch(`http://localhost:4000/api/v1/product/getProduct?typeOfMaterial=${material}`);
        const productData = await response.json();
        if (productData && productData.length > 0) {
            displayProducts(productData, newWindow);
        } else {
            newWindow.document.getElementById('product-container').innerHTML = 'No products available for this material.';
        }
    } catch (err) {
        newWindow.document.getElementById('product-container').innerHTML = 'Error fetching data.';
    }
}

function displayProducts(products, newWindow) {
    const productContainer = newWindow.document.getElementById("product-container");
    productContainer.innerHTML = '';
    products.forEach(product => {
        const productDiv = newWindow.document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h2>${product.productName}</h2>
            <p>Price: $${product.price}</p>
            <p>Quantity: ${product.quantity}</p>
            <div>
                <strong>Images:</strong>
                <div class="product-images">
                    ${product.productImage.map(img => `<img src="${img}" alt="${product.productName}" class="product-img">`).join("")}
                </div>
            </div>
        `;
        productContainer.appendChild(productDiv);
    });
}

document.querySelectorAll('.material-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const selectedMaterial = event.target.getAttribute('data-material');
        openMaterialWindow(selectedMaterial);
    });
});
