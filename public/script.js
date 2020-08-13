const $productos = document.querySelector('#productos');
const $agregarProducto = document.querySelector('#agregar-producto');
const $login = document.querySelector('#login');
const $productosContainer = document.querySelector('.productos-container');
const $linkProductos = document.querySelector('.link-productos');
const $linkAgregarProducto = document.querySelector('.link-agregar-producto');
const $linkLogin = document.querySelector('.link-login');
const $buttonAddProduct = document.querySelector('#button-add-product');

let TOKEN = '';

const handleLogin = async (username, password) => {
    event.preventDefault();

    const usuario = {
        username: username.value,
        password: password.value
    };
    
    const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify(usuario), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    
    if (data.token) {
        TOKEN = data.token;
        // fetch('/solovip', {
        //         method: 'GET',
        //         withCredentials: true,
        //         credentials: 'include',
        //         headers: {
        //             'Authorization': data.token,
        //             'Content-Type': 'application/json'
        //         }
        //     }).then(responseJson => {
        //         console.log('de diego');
        //         return responseJson.json();
        //     })
        //     .then(data => console.log(data))
        //     .catch(console.error);
    } else {
        console.log('No hay token masterer', data.error);
    }
};

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
    try {
        const response = await fetch(`/productos/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': TOKEN
            }
        });
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.warn('Que quisiste hacer pelotudo')
    }
};


const renderProducts = (products) => {
    $productosContainer.innerHTML = '';
    products.forEach(product => {
        const {
            precio,
            nombre,
            id
        } = product;
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



function showElements(...elements) {
    elements.forEach(element => element.classList.remove('hidden'));
}

function hideElements(...elements) {
    elements.forEach(element => element.classList.add('hidden'));
}