<script>
    /* cspell:disable */
</script>

<main class="home">
    <section class="home__container">
        <h1 class="home__title">Sprint Risk Manager</h1>
        <p class="home__subtitle">Sistema de Gestión y Predicción de Riesgos Scrum</p>
        
        <div class="home__menu">
            <a href="/predict" class="home__card">
                <span class="home__icon">📊</span>
                <div class="home__text">
                    <h3>Predictor de Riesgo</h3>
                    <p>Simula Sprints y predice el éxito basado en historial.</p>
                </div>
            </a>

            <a href="/tasks" class="home__card">
                <span class="home__icon">⚙️</span>
                <div class="home__text">
                    <h3>Administración</h3>
                    <p>Asignación de tareas y gestión de capacidad del equipo.</p>
                </div>
            </a>
        </div>
    </section>
</main>

<style>
    :global(body) { margin: 0; padding: 0; }
    .home {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f1f5f9;
        font-family: sans-serif;
    }
    .home__container {
        text-align: center;
        max-width: 800px;
        padding: 20px;
    }
    .home__title { font-size: 48px; color: #1e293b; margin-bottom: 10px; }
    .home__subtitle { font-size: 18px; color: #64748b; margin-bottom: 40px; }
    .home__menu {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }
    .home__card {
        background: white;
        padding: 30px;
        border-radius: 16px;
        text-decoration: none;
        color: inherit;
        display: flex;
        align-items: center;
        gap: 20px;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
        transition: transform 0.2s, box-shadow 0.2s;
    }
    .home__card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    }
    .home__icon { font-size: 40px; }
    .home__text { text-align: left; }
    .home__text h3 { margin: 0; color: #2563eb; }
    .home__text p { margin: 5px 0 0; font-size: 14px; color: #64748b; }

    @media (max-width: 600px) {
        .home__menu { grid-template-columns: 1fr; }
    }
</style>