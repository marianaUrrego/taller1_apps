function navegarASeccion(id) {
    const seccion = document.getElementById(id);
    // Verificar que exista la sección antes de navegar a ella
    if (seccion) { 
        seccion.scrollIntoView({ behavior: 'smooth' });
    }
}

// Observer para el estado active de los botones en las secciones
const secciones = document.querySelectorAll('section');

const botones = {
    inicio: document.getElementById('boton-inicio'),
    proyectos: document.getElementById('boton-proyectos'),
    productos: document.getElementById('boton-productos'),
    contacto: document.getElementById('boton-contacto')
};

const observer = new IntersectionObserver(
    (elementos) => {
      elementos.forEach(e => {
        if (e.isIntersecting) {
            Object.values(botones).forEach(boton => boton.classList.remove('activo'));
            
            const id = e.target.id;
            if (botones[id]) botones[id].classList.add('activo')
        }
      });
    },
    {
      threshold: 0.6
    }
);

// Activar el observador en las secciones
secciones.forEach(seccion => {
    observer.observe(seccion);
});