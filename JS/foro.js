document.addEventListener('DOMContentLoaded', function () {
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', function () {
            alert('¡Te ha gustado este mensaje!');
        });
    });

    const replyButtons = document.querySelectorAll('.reply-btn');
    replyButtons.forEach(button => {
        button.addEventListener('click', function () {
            const post = this.closest('.post');

            if (post.querySelector('.respuesta-form')) {
                return; 
            }

            const respuestaForm = document.createElement('form');
            respuestaForm.classList.add('respuesta-form');
            respuestaForm.innerHTML = `
                <textarea placeholder="Escribe tu respuesta..." rows="3" required></textarea><br>
                <button type="submit">Publicar Respuesta</button>
            `;

            respuestaForm.addEventListener('submit', function (event) {
                event.preventDefault();

                const respuesta = respuestaForm.querySelector('textarea').value;
                if (respuesta.trim() === "") {
                    alert("Por favor, escribe una respuesta.");
                    return;
                }

                const nuevaRespuesta = document.createElement('div');
                nuevaRespuesta.classList.add('post-respuesta');
                nuevaRespuesta.innerHTML = `
                    <div class="post-header">
                        <span class="post-author">Tú</span>
                        <span class="post-time">Ahora</span>
                    </div>
                    <p class="post-message">${respuesta}</p>
                `;

                post.appendChild(nuevaRespuesta);
                respuestaForm.remove(); 
            });

            post.appendChild(respuestaForm);
        });
    });
});
