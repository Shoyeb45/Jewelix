document.addEventListener('DOMContentLoaded', () => {
    fetchProductDetails();
});

async function fetchProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId'); // Extract productId from URL

    if (!productId) {
        alert('Product ID not found!');
        return;
    }

    try {
        const response = await fetch(`http://localhost:4000/api/v1/product/${productId}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const productData = await response.json();
        if (productData) {
            updateProductPage(productData);
        } else {
            alert("Product not found");
        }
    } catch (err) {
        console.error('Error fetching product data:', err);
        document.getElementById('product-details-container').innerHTML = 'Error fetching data.';
    }
}

function updateProductPage(product) {
    const nameElement = document.getElementById('name-of-product');
    const priceElement = document.getElementById('price');
    const descriptionElement = document.getElementById('description');
    const categoryElement = document.getElementById('category');

    

    nameElement.textContent = product.productName;
    priceElement.textContent = `₹${product.price}`;
    descriptionElement.textContent = product.description;
    categoryElement.textContent = product.category;
    const imageElement = document.getElementById("big-img");

    imageElement.setAttribute("src", product.productImage[0]);

    const stockElement = document.getElementById("stock");

    if (product.quantity === 0) {
        stockElement.innerHTML = "<strike>Out Of Stock</strike>";
        stockElement.style.color = "red";
    } else {
        stockElement.innerHTML = "In Stock";
        stockElement.style.color = "green";
    }

    for (let i = 0; i < 3; i++) {
        const img = document.getElementById("img-" + i);
        img.setAttribute("src", product.productImage[i]);  
        document.getElementById("img-t-" + i).setAttribute("src", product.productImage[i]);  
        // document.getElementById("link-" + i).setAttribute("href", product.productImage[i])
    }
}
