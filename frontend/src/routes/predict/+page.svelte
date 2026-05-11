<script>
    /* cspell:disable */
    import { onMount } from 'svelte';

    let developers = $state([]);
    let sprints = $state([]);
    let developer_id = $state('');
    let sprint_id = $state('');
    let estimated_hours = $state('');
    let message = $state('');
    let isError = $state(false); // Para cambiar el color del mensaje si hay error

    async function loadDevelopers() {
        try {
            const response = await fetch('https://sprint-risk-mvc.onrender.com/developers');
            developers = await response.json();
        } catch (error) {
            console.error("Error cargando desarrolladores", error);
        }
    }

    async function loadSprints() {
        try {
            const response = await fetch('https://sprint-risk-mvc.onrender.com/sprints');
            sprints = await response.json();
        } catch (error) {
            console.error("Error cargando sprints", error);
        }
    }

    async function saveTask(event) {
        event.preventDefault();
        
        try {
            const response = await fetch('https://sprint-risk-mvc.onrender.com/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sprint_id,
                    developer_id,
                    estimated_hours
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                isError = true;
                message = data.error || 'Error al guardar la tarea';
            } else {
                isError = false;
                message = data.message || 'Tarea guardada exitosamente';
                // Opcional: Limpiar el formulario después de guardar
                estimated_hours = ''; 
            }
        } catch (error) {
            console.error(error); // Aquí usamos la variable para quitar el error de ESLint
            isError = true;
            message = 'Error de conexión con el servidor';
        }
    }

    onMount(() => {
        loadDevelopers();
        loadSprints();
    });
</script>

<!-- cspell:disable -->
<main class="tasks">
    <section class="tasks__container">
        
        <!-- Navegación entre vistas -->
        <nav class="tasks__nav">
            <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
            <a href="/predict" class="tasks__nav-link">
                Ir al Predictor de Sprints &rarr;
            </a>
        </nav>

        <h1 class="tasks__title">
            Administración de Riesgos del Sprint
        </h1>

        <form class="tasks__form" onsubmit={saveTask}>
            <div class="tasks__group">
                <label for="developer">Desarrollador</label>
                <select id="developer" bind:value={developer_id} required>
                    <option value="">Seleccionar Desarrollador</option>
                    {#each developers as developer (developer.id)}
                        <option value={developer.id}>
                            {developer.name}
                        </option>
                    {/each}
                </select>
            </div>

            <div class="tasks__group">
                <label for="sprint">Sprint</label>
                <select id="sprint" bind:value={sprint_id} required>
                    <option value="">Seleccionar Sprint</option>
                    {#each sprints as sprint (sprint.id)}
                        <option value={sprint.id}>
                            {sprint.name}
                        </option>
                    {/each}
                </select>
            </div>

            <div class="tasks__group">
                <label for="hours">Horas Estimadas</label>
                <input
                    id="hours"
                    type="number"
                    bind:value={estimated_hours}
                    placeholder="Ej. 20"
                    required
                />
            </div>

            <button type="submit" class="tasks__button">
                Guardar Tarea
            </button>
        </form>

        {#if message}
            <p class="tasks__message {isError ? 'tasks__message--error' : 'tasks__message--success'}">
                {message}
            </p>
        {/if}
    </section>
</main>

<style>
/* cspell:disable */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.tasks {
    min-height: 100vh;
    padding: 40px 20px;
    background: #f8fafc;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    color: #0f172a;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.tasks__container {
    width: 100%;
    max-width: 600px;
    background: #ffffff;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05);
}

/* Estilos para la navegación */
.tasks__nav {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
}

.tasks__nav-link {
    display: inline-block;
    padding: 8px 16px;
    background-color: #f1f5f9;
    color: #334155;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    border-radius: 8px;
    transition: all 0.2s ease;
}

.tasks__nav-link:hover {
    background-color: #e2e8f0;
    color: #0f172a;
    transform: translateY(-1px);
}

.tasks__title {
    font-size: 32px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 30px;
    text-align: center;
}

.tasks__form {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.tasks__group {
    display: flex;
    flex-direction: column;
}

.tasks__group label {
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 14px;
    color: #475569;
}

.tasks__group input,
.tasks__group select {
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #cbd5e1;
    background-color: #ffffff;
    font-size: 15px;
    color: #1e293b;
    transition: all 0.2s ease;
}

.tasks__group input:focus,
.tasks__group select:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.tasks__button {
    padding: 14px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    background: #2563eb;
    color: white;
    width: 100%;
    margin-top: 10px;
    transition: all 0.2s ease;
}

.tasks__button:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.tasks__button:active {
    transform: translateY(0);
}

/* Estilos de mensajes (Éxito y Error) */
.tasks__message {
    margin-top: 24px;
    text-align: center;
    font-size: 15px;
    font-weight: 500;
    padding: 12px;
    border-radius: 8px;
}

.tasks__message--success {
    color: #059669;
    background: #ecfdf5;
    border: 1px solid #a7f3d0;
}

.tasks__message--error {
    color: #dc2626;
    background: #fef2f2;
    border: 1px solid #fecaca;
}
</style>