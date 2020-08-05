const $productos = document.querySelector('#productos');
const $agregarProducto = document.querySelector('#agregar-producto');
const $login = document.querySelector('#login');
const $productosContainer = document.querySelector('.productos-container');
const $linkProductos = document.querySelector('.link-productos');
const $linkAgregarProducto = document.querySelector('.link-agregar-producto');
const $linkLogin = document.querySelector('.link-login');
const $buttonAddProduct = document.querySelector('#button-add-product')

const getProductos = async () => {
    try {
        const response = await fetch('/productos');
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error(error);
    }
};

getProductos();

const compraProducto = async (id) => {
    console.warn('Me llamaron con id: ' + id);
    try {
        const response = await fetch(`/productos/${id}`, {
            method: 'DELETE'
        });
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.warn('Que quisiste hacer pelotudo')
    }
}


const renderProducts = (products) => {
    $productosContainer.innerHTML = '';
    products.forEach(product => {
        const {precio, nombre, id } = product;
        const productHTML = 
        `<div class="product">
            <h5>${nombre}</h5>
            <p>Precio: $${precio}</p>
            <button class="btn btn-warning" onclick="compraProducto(${id})">Comprar</button>
        </div>`;

        $productosContainer.insertAdjacentHTML('beforeend', productHTML);
    });
};


showElements($productos);
hideElements($agregarProducto, $login);

$linkProductos.addEventListener('click', () => {
    showElements($productos);
    hideElements($agregarProducto, $login);
});

$linkAgregarProducto.addEventListener('click', () => {
    showElements($agregarProducto);
    hideElements($productos, $login);
});

$linkLogin.addEventListener('click', () => {
    showElements($login);
    hideElements($agregarProducto, $productos);
});

$linkAgregarProducto.addEventListener('click', () => {

});

$linkLogin.addEventListener('click', () => {

});


function showElements(...elements) {
    elements.forEach(element => element.classList.remove('hidden'));
}

function hideElements(...elements) {
    elements.forEach(element => element.classList.add('hidden'));
}
