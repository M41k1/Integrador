document.addEventListener('DOMContentLoaded', function () {
    const listaMensajes = document.getElementById('lista-mensajes');
    const formulario = document.getElementById('formulario-publicacion');

    // Cargar mensajes desde localStorage
    let mensajes = JSON.parse(localStorage.getItem('mensajes')) || [];

    function guardarMensajes() {
        localStorage.setItem('mensajes', JSON.stringify(mensajes));
    }

    // Función para calcular el tiempo transcurrido
    function calcularTiempo(fechaPublicacion) {
        const ahora = new Date();
        const tiempoDif = ahora - fechaPublicacion; // Tiempo en milisegundos

        const segundos = Math.floor(tiempoDif / 1000);
        const minutos = Math.floor(segundos / 60);
        const horas = Math.floor(minutos / 60);
        const dias = Math.floor(horas / 24);

        if (dias > 0) {
            return `Hace ${dias} día${dias > 1 ? 's' : ''}`;
        } else if (horas > 0) {
            return `Hace ${horas} hora${horas > 1 ? 's' : ''}`;
        } else if (minutos > 0) {
            return `Hace ${minutos} minuto${minutos > 1 ? 's' : ''}`;
        } else {
            return `Hace unos segundos`;
        }
    }

    function crearElementoMensaje(mensaje, nivel = 0) {
        const li = document.createElement('li');
        li.className = 'post';
        li.style.marginLeft = `${nivel * 20}px`;

        const header = document.createElement('div');
        header.className = 'post-header';

        // Mostrar el tiempo calculado
        const tiempoTranscurrido = calcularTiempo(new Date(mensaje.tiempo));

        header.innerHTML = `
            <span class="post-author">${mensaje.autor}</span>
            <span class="post-time">${tiempoTranscurrido}</span>
        `;

        const p = document.createElement('p');
        p.className = 'post-message';
        p.textContent = mensaje.texto;

        const botones = document.createElement('div');
        botones.className = 'post-buttons';

        const likeBtn = document.createElement('button');
        likeBtn.className = 'like-btn';
        likeBtn.textContent = `👍 Me gusta (${mensaje.likes})`;

        // Verificar si ya dio "me gusta"
        if (mensaje.meGusta) {
            likeBtn.classList.add('liked'); // Estilo para el botón de "me gusta"
        }

        likeBtn.addEventListener('click', () => {
            if (mensaje.meGusta) {
                // Quitar "me gusta"
                mensaje.likes--;
                mensaje.meGusta = false;
            } else {
                // Dar "me gusta"
                mensaje.likes++;
                mensaje.meGusta = true;
            }

            // Actualizar el texto del botón y la clase
            likeBtn.textContent = `👍 Me gusta (${mensaje.likes})`;

            if (mensaje.meGusta) {
                likeBtn.classList.add('liked');
            } else {
                likeBtn.classList.remove('liked');
            }

            guardarMensajes();
        });

        const replyBtn = document.createElement('button');
        replyBtn.className = 'reply-btn';
        replyBtn.textContent = '💬 Responder';
        replyBtn.addEventListener('click', () => mostrarFormularioRespuesta(mensaje, li, nivel + 1));

        botones.appendChild(likeBtn);
        botones.appendChild(replyBtn);

        li.appendChild(header);
        li.appendChild(p);
        li.appendChild(botones);

        // Mostrar respuestas si las hay
        if (mensaje.respuestas && mensaje.respuestas.length > 0) {
            mensaje.respuestas.forEach(respuesta => {
                li.appendChild(crearElementoMensaje(respuesta, nivel + 1));
            });
        }

        return li;
    }

    function mostrarFormularioRespuesta(mensajePadre, contenedor, nivel) {
        // Evitar múltiples formularios
        if (contenedor.querySelector('.respuesta-form')) return;

        const form = document.createElement('form');
        form.className = 'respuesta-form';
        form.innerHTML = `
            <textarea placeholder="Escribe tu respuesta..." required rows="3"></textarea><br>
            <button type="submit">Publicar Respuesta</button>
        `;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const texto = form.querySelector('textarea').value.trim();
            if (texto === '') return;

            const nuevaRespuesta = {
                autor: 'Tú',
                texto,
                tiempo: new Date().toISOString(), // Guardamos la fecha de la respuesta
                likes: 0,
                meGusta: false,
                respuestas: []
            };

            mensajePadre.respuestas.push(nuevaRespuesta);
            guardarMensajes();
            renderizarMensajes();
        });

        contenedor.appendChild(form);
    }

    function renderizarMensajes() {
        listaMensajes.innerHTML = '';
        mensajes.forEach(msg => {
            listaMensajes.appendChild(crearElementoMensaje(msg));
        });
    }

    // Manejar nueva publicación
    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        const autor = document.getElementById('nombre').value.trim();
        const texto = document.getElementById('mensaje').value.trim();

        if (autor === '' || texto === '') return;

        const nuevoMensaje = {
            autor,
            texto,
            tiempo: new Date().toISOString(), // Guardamos la fecha actual del mensaje
            likes: 0,
            meGusta: false,
            respuestas: []
        };

        mensajes.push(nuevoMensaje);
        guardarMensajes();
        renderizarMensajes();
        formulario.reset();
    });

    renderizarMensajes();
});
