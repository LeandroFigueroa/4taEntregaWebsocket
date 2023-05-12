const socketClient = io();
const form = document.getElementById('form');
const inputName = document.getElementById('name');
const inputPrice = document.getElementById('price');
const inputDesc = document.getElementById('description');
const products = document.getElementById('products');

form.onsubmit = (e) => {
  e.preventDefault();
  const name = inputName.value;
  const price = inputPrice.value;
  const description = inputDesc.value;

  if (price === '' || name === '' || description === '') {
    alert('Por favor, completa todos los campos.');
    return false;
  }

  socketClient.emit('newProduct', { name, price, description });

  return true;
};

socketClient.on('getProducts', (products) => {
  let data = '';

  products.forEach((p) => {
    data += `
      <div  class="cart-product"">
        <ul>
          <h1>${p.name}</h1>
          <h2>Price: $${p.price}</h2>
          <h3 style="color:aliceblue; margin-bottom:20px">Description: ${p.description}</h3>
        </ul>
        <button class="button" style="padding: 5px" onclick="deleteProduct(${p.id})">Eliminar</button>
      </div>
    `;
  });

  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = data;
});

socketClient.on('deleteProduct', (id) => {
  const productElement = document.getElementById(id);
  if (productElement) {
    productElement.remove();
  }
});

function deleteProduct(id) {
  socketClient.emit('deleteProduct', id);
}