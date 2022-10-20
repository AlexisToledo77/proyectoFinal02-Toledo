const todosLosProductos = document.getElementById("todosLosProductos")
const botonCarrito = document.getElementById("botonCarrito")
const contenedorCarrito = document.getElementById("carrito-contenedor")



fetch("../js/data.json")
.then(response => response.json())
.then(data => {
    data.forEach(producto => {
    let productoRenderizado = document.createElement("todosLosProductos")
    productoRenderizado.innerHTML = `
            <div class="m-3 card-img-top1" style="width: 19rem;">
                <img src="${producto.imagen}">
                    <div class="card-body">
                        <h1 class="card-title"> ${producto.nombre} </h1>
                        <p class="card-text">  ${producto.detalle} </p>
                        <p class="card-text">  $${producto.precio} </p>
                        <button id=${producto.id}  class="botonComprar1">
                            <p> Agregar al Carrito <i class="bi bi-cart-plus"></i></p>
                        </button>
                    </div>
            </div>
        `;
        todosLosProductos.append(productoRenderizado)

    })
         //agregado de libreria sweet alert
         const botonCarrito = document.getElementById(producto.id)
         botonCarrito.addEventListener("click", () => {
             agregarCarrito(producto)
             Swal.fire({
                 position: 'center',
                 icon: 'success',
                 title: 'Agregaste el producto al Carrito',
                 showConfirmButton: false,
                 timer: 1000
               })
         })
})


let usuarios = [
    {
        usuario: "alexis",
        pass: "123456"
    }
]
let carrito = [] ;


const actualizaCarrito = () => {
    let carritoNumero = document.getElementById("numberCart")
    carritoNumero.innerHTML = `${carrito.length}`

}


const agregarCarrito = (producto) => {
    let productoExiste = carrito.find(item => item.id === producto.id)
    if (productoExiste !== undefined ){
        productoExiste.precio = productoExiste.precio + producto.precio
        productoExiste.cantidad = productoExiste.cantidad + 1 
    } else{
        carrito.push({
            id: producto.id,
            nombre:  producto.nombre,
            precio:  producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        })
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
}
localStorage.setItem("registro", JSON.stringify(usuarios))
let returnCarrito = JSON.parse(localStorage.getItem("carrito"));



botonCarrito.addEventListener("click", () => {
    console.log(returnCarrito)
})

/* botonCarrito.addEventListener("click", () => alert(`Compraste ${returnCarrito.producto} y el total es ${returnCarrito.carrito.length}`))
 */

const actualizarCarrito = () => {
    carrito.forEach((producto) =>{
        const div = document.createElement("div")
        div.className = ("productoEnCarrito")
        div.innerHTML = `
        <p>${producto.nombre}</p>
        <p>Precio $${producto.precio}</p>
        <p>Cantidad: <span id="cantidad">${producto.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${producto.id})" class="botonEliminar"></button>
        `
        contenedorCarrito.appendChild(div)
    })
}