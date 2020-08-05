const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));


const arrayUsuarios = [{
        id: 1,
        nombre: 'Ariel',
        password: '789789789'
    },
    {
        id: 2,
        nombre: 'Juan',
        password: '123123123'
    },
    {
        id: 3,
        nombre: 'Matias',
        password: '456456456'
    },
    {
        id: 4,
        nombre: 'Daniela',
        password: '101102103'
    },
    {
        id: 5,
        nombre: 'Alejandra',
        password: '123456789'
    },
];

const arrayProductos = [{
        id: 1,
        nombre: "centro de mesa",
        precio: 350,
        idUsuario: 1,
    },
    {
        id: 2,
        nombre: "Cuadro Vintage",
        precio: 500,
        idUsuario: 3,
    },
    {
        id: 3,
        nombre: "Pelota",
        precio: 150,
        idUsuario: 2,
    },
    {
        id: 4,
        nombre: "Bicicleta",
        precio: 900,
        idUsuario: 2,
    },
    {
        id: 5,
        nombre: "Cartas",
        precio: 100,
        idUsuario: 1,
    },
    {
        id: 6,
        nombre: "Auto",
        precio: 10000,
        idUsuario: 4,
    },
    {
        id: 7,
        nombre: "Lancha",
        precio: 8000,
        idUsuario: 4,
    },
    {
        id: 8,
        nombre: "Tazas",
        precio: 50,
        idUsuario: 5,
    },
    {
        id: 9,
        nombre: "Computadora",
        precio: 2000,
        idUsuario: 1,
    },
    {
        id: 10,
        nombre: "Microondas",
        precio: 500,
        idUsuario: 5,
    },
];

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.sendFile('index.html');
});

// CREACION DE USUARIOS
app.post('/usuarios', (req, res) => {
    const idCrear = parseInt(req.body.id);
    const usuarioFiltrado = arrayUsuarios.filter(user => user.id === idCrear)
    if (usuarioFiltrado.length >= 1) {
        res.status(400).send('Lo siento, ID de usuario ya existente.');
    } else {
        arrayUsuarios.push(req.body);
        res.status(200).json(arrayUsuarios);
    }

});


//CONSULTA DE USUARIOS

app.get('/usuarios', (req, res) => {
    res.status(200).json(arrayUsuarios);
});

//CONSULTA DE PRODUCTOS

app.get('/productos', (req, res) => {
    res.status(200).json(arrayProductos);
});

//CREACION DE PRODUCTOS
app.post('/productos', (req, res) => {
    arrayProductos.push(req.body);
    // res.status(200).json(arrayProductos);
    res.redirect('/');
});

//CONSULTA DE PRODUCTOS POR USUARIO

app.get('/productos/:idUsuario', (req, res) => {
    const idUsuario = parseInt(req.params.idUsuario);
    const productosUsuario = arrayProductos.filter(obj => obj.idUsuario === idUsuario);
    if (productosUsuario.length < 1) {
        res.status(404).send('Lo siento, el usuario seleccionado no cuenta con productos publicados.');
    } else {
        res.json(productosUsuario);
    }
});

//COMPRAR PRODUCTO

app.delete("/productos/:idProducto", (req, res) => {
    const idProducto = req.params.idProducto;
    const index = arrayProductos.findIndex(
        (producto) => producto.id == idProducto
    );
    arrayProductos.splice(index, 1);
    res.status(200).json(arrayProductos);
});


app.listen(3000, () => {
    console.log('Servidor Iniciado con Exito');
});