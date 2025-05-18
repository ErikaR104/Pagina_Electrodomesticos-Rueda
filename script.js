const productos = [
  {
    nombre: "Nevera LG 12kg",
    precio: 2500000,
    categoria: "neveras",
    imagen: "img/neveralg.jpg",
    link: "neveralg.html"
  },
  {
    nombre: "Lavadora Samsung 15kg",
    precio: 1900000,
    categoria: "lavadoras",
    imagen: "img/lavadorasms1.jpeg",
    link: "lavadorasms.html"
  },
  {
    nombre: "Nevera Haceb 240L",
    precio: 2200000,
    categoria: "neveras",
    imagen: "img/Nevera-Haceb.jpg",
    link: "detalle/nevera-haceb.html"
  },
  {
    nombre: "Estufa de Piso Superior Axxis",
    precio: 1040000,
    categoria: "Estufas",
    imagen: "img/estufa_axxis1.jpg",
    link: "estufax.html"
  }
];
  
  
  let carrito = [];
  let total = 0;
  
  function mostrarProductos(filtrados = productos) {
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = '';
    filtrados.forEach(p => {
      contenedor.innerHTML += `
        <section class="producto">
          <img src="${p.imagen}" alt="${p.nombre}" />
          <h2><a href="${p.link}">${p.nombre}</a> </h2>
          <p>$${p.precio.toLocaleString()}</p>
          <button onclick="agregarAlCarrito('${p.nombre}', ${p.precio})">Agregar al carrito</button>
        </section>
      `;
    });
  }
  
  function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    actualizarCarrito();
  }
  
  function actualizarCarrito() {
    const lista = document.getElementById('lista-carrito');
    lista.innerHTML = '';
    carrito.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.nombre} - $${item.precio.toLocaleString()}`;
      lista.appendChild(li);
    });
    document.getElementById('total').textContent = total.toLocaleString();
  }
  
  document.getElementById('buscador').addEventListener('input', e => {
    const termino = e.target.value.toLowerCase();
    const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(termino));
    mostrarProductos(filtrados);
  });
  
  document.getElementById('filtro-categoria').addEventListener('change', e => {
    const categoria = e.target.value;
    if (categoria === 'todos') {
      mostrarProductos(productos);
    } else {
      mostrarProductos(productos.filter(p => p.categoria === categoria));
    }
  });
  
  mostrarProductos(); // Mostrar todos al inicio
  