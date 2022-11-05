const todosLosProductos = document.getElementById("todosLosProductos")
const botonCarrito = document.getElementById("botonCarrito");
const contenedorCarrito = document.getElementById("contenidoCarrito")
const numeroCarrito = document.getElementById("numeroCarrito");
const borrarCarrito = document.getElementById("botonVaciarCarrito")



document.addEventListener(`DOMContentLoaded`, () => {
    if (localStorage.getItem(`carrito`)) {
      carrito = JSON.parse(localStorage.getItem(`carrito`));
      actualizarCarrito();
    }
  });



let usuarios = [
    {
        usuario: "alexis",
        pass: "123456"
    }
]
let carrito = [] ;


fetch("../js/data.json")
.then(response => response.json())
.then(data => {
    data.forEach(item => {
    let productoRenderizado = document.createElement("todosLosProductos")
    productoRenderizado.innerHTML = `
            <div class="m-3 card-img-top1" style="width: 19rem;">
                <img src="${item.imagen}">
                    <div class="card-body">
                        <h1 class="card-title"> ${item.nombre} </h1>
                        <p class="card-text">  ${item.detalle} </p>
                        <p class="card-text">  $${item.precio} </p>
                        <button id="${"agregarAlCarrito" + item.id}"  class="botonComprar1">
                            <p> Agregar al Carrito </p>
                        </button>
                    </div>
            </div>
        `;

        todosLosProductos.append(productoRenderizado)
        const botonAgregar = document.getElementById(`agregarAlCarrito${item.id}`);
        botonAgregar.addEventListener("click", () => {
            agregarCarrito(item)
            Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Agregaste el producto al Carrito',
            showConfirmButton: false,
            timer: 1000
          })
        })
    })
         
})


const agregarCarrito = producto => {
    let productoExiste = carrito.find(item => item.id === producto.id)
    if (productoExiste !== undefined ){
        productoExiste.subtotal = productoExiste.precio + producto.precio
        productoExiste.cantidad = productoExiste.cantidad + 1 
    } else{
        carrito.push({
            id: producto.id,
            nombre:  producto.nombre,
            precio:  producto.precio,
            imagen: producto.imagen,
            cantidad: 1,
            subtotal: producto.precio,
        })
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("numeroCarritoStorage", JSON.stringify(parseInt(numeroCarrito.innerHTML) + 1));
    numeroCarrito.innerHTML = JSON.parse(localStorage.getItem("numeroCarritoStorage"));
    actualizarCarrito();
}

let returnCarrito = JSON.parse(localStorage.getItem("carrito"));





const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach((item) =>{
        const div = document.createElement("div")
        div.className = ("productoEnCarrito")
        div.innerHTML = `
        <p>${item.nombre}</p>
        <img src="${item.imagen}">
        <p>Precio $${item.precio}</p>
        <p>Cantidad: <span id="cantidad">${item.cantidad}</span></p>
        <div class= "d-flex m-2">
          <button id="${"btnRestar" + item.id}" class="btn btn-outline-danger ms-2 rounded-6 m-1"> -</button>
          <button id="${"btnSumar" + item.id}" class="btn btn-outline-success rounded-6 m-1">+</button>
          <button id="${"btnQuitar" + item.id}" class="  btn btn-danger p-1 rounded-3 mx-auto"><i class="fa fa-trash"></i></button>
        </div>
        <span class="fw-bold">Subtotal: $${item.subtotal}</span>
        `
        contenedorCarrito.appendChild(div);
        let botonRestarItemCarrito = document.getElementById("btnRestar" + item.id);
        let botonSumarItemCarrito = document.getElementById("btnSumar" + item.id);
        let botonQuitarItemCarrito = document.getElementById("btnQuitar" + item.id);
        botonRestarItemCarrito.addEventListener("click", () => restarItemCarrito(item));
        botonSumarItemCarrito.addEventListener("click", () => sumarItemCarrito(item));
        botonQuitarItemCarrito.addEventListener("click", () => quitarItemCarrito(item));

        
    })
    if (parseInt(numeroCarrito.innerHTML) != 0) {
        botonVaciarCarrito.style.display = "inline";
      }
      let totalCompra = document.createElement("div");
      let resultado = carrito.reduce((acc, elem) => acc + elem.subtotal, 0);
      totalCompra.innerHTML = `<h5 class="fw-bold text-center">Total: $${resultado} </h5>`
      contenedorCarrito.append(totalCompra);
      if(carrito.length === 0){
        contenedorCarrito.innerHTML = "<h3>Su carrito está vacío</h3>";
        botonVaciarCarrito.style.display ="none";
      }


}

// agregar al carrito
  const sumarItemCarrito = (producto) => {
    producto.cantidad ++;
    producto.subtotal += producto.precio;
    localStorage.setItem("numeroCarritoStorage", JSON.stringify(parseInt(numeroCarrito.innerHTML) + 1));
    localStorage.setItem("carrito",JSON.stringify(carrito));
    numeroCarrito.innerHTML = JSON.parse(localStorage.getItem("numeroCarritoStorage"));
    actualizarCarrito();
  }
  
  //operaciones en carrito

  const restarItemCarrito = (producto) => {
    if (producto.cantidad > 1){
        producto.cantidad --;
        producto.subtotal -= producto.precio;
      localStorage.setItem("carrito",JSON.stringify(carrito));
      localStorage.setItem("numeroCarritoStorage", JSON.stringify(parseInt(numeroCarrito.innerHTML) - 1));
      numeroCarrito.innerHTML = JSON.parse(localStorage.getItem("numeroCarritoStorage"));
      actualizarCarrito();
    }
  }
  

  const quitarItemCarrito = (producto) => {
    let indice = carrito.indexOf(producto);
    localStorage.setItem("numeroCarritoStorage",JSON.stringify(parseInt(numeroCarrito.innerHTML) - producto.cantidad));
    numeroCarrito.innerHTML = JSON.parse(localStorage.getItem("numeroCarritoStorage"));
    carrito.splice(indice,1);
    localStorage.setItem("carrito",JSON.stringify(carrito));
    actualizarCarrito();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Eliminado correctamente',
      showConfirmButton: false,
      timer: 1500
    })
  }

  const vaciarCarrito = () => {
    Swal.fire({
      title: 'Desea vaciar el carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      allowOutsideClick: () => {
        const popup = Swal.getPopup()
        popup.classList.remove('swal2-show')
        setTimeout(() => {
          popup.classList.add('animate__animated', 'animate__headShake')
        })
        setTimeout(() => {
          popup.classList.remove('animate__animated', 'animate__headShake')
        }, 500)
        return false
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '',
          'Carrito Eliminado',
          'success'
        )
        localStorage.removeItem("carrito");
        localStorage.setItem("numeroCarritoStorage", 0)
        contenedorCarrito.innerHTML = `<h3>Su carrito está vacío</h3>`
        carrito = [];
        numeroCarrito.innerHTML = 0;
        botonVaciarCarrito.style.display = "none";
      }
    })
  }

  botonVaciarCarrito.addEventListener("click", vaciarCarrito);
