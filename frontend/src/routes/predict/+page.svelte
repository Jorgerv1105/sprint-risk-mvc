<script>
    let sprint_capacity = $state(80);
    let results = $state(null);
    let tasks = $state([
        {
            task_type: 'Backend',
            complexity: 'High',
            technology: 'Node.js',
            story_points: 8,
            estimated_hours: 40
        }
    ]);

    function addTask() {
        tasks = [
            ...tasks,
            {
                task_type: '',
                complexity: '',
                technology: '',
                story_points: 0,
                estimated_hours: 0
            }
        ];
    }

    async function predictSprint(event) {
        event.preventDefault();
        const response = await fetch(
            'http://localhost:3000/predict/sprint',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sprint_capacity,
                    tasks
                })
            }
        );
        results = await response.json();
    }
</script>

<main class="predict">
    <section class="predict__container">
        <h1 class="predict__title">
            Sprint Risk Predictor
        </h1>

        <form class="predict__form" onsubmit={predictSprint}>
            <div class="predict__group">
                <label for="capacity">
                    Sprint Capacity
                </label>
                <input
                    id="capacity"
                    type="number"
                    bind:value={sprint_capacity}
                />
            </div>

            <h2 class="predict__subtitle">
                Tasks
            </h2>

            {#each tasks as task, index (index)}
                <article class="predict__task">
                    <div class="predict__group">
                        <label for="task_type_{index}">
                            Task Type
                        </label>
                        <select
                            id="task_type_{index}"
                            bind:value={task.task_type}
                        >
                            <option value="">Select</option>
                            <option value="Backend">Backend</option>
                            <option value="Frontend">Frontend</option>
                        </select>
                    </div>

                    <div class="predict__group">
                        <label for="complexity_{index}">
                            Complexity
                        </label>
                        <select
                            id="complexity_{index}"
                            bind:value={task.complexity}
                        >
                            <option value="">Select</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div class="predict__group">
                        <label for="technology_{index}">
                            Technology
                        </label>
                        <input
                            id="technology_{index}"
                            type="text"
                            bind:value={task.technology}
                        />
                    </div>

                    <div class="predict__group">
                        <label for="story_points_{index}">
                            Story Points
                        </label>
                        <input
                            id="story_points_{index}"
                            type="number"
                            bind:value={task.story_points}
                        />
                    </div>

                    <div class="predict__group">
                        <label for="estimated_hours_{index}">
                            Estimated Hours
                        </label>
                        <input
                            id="estimated_hours_{index}"
                            type="number"
                            bind:value={task.estimated_hours}
                        />
                    </div>
                </article>
            {/each}

            <button
                type="button"
                class="predict__add"
                onclick={addTask}
            >
                Add Task
            </button>

            <button
                type="submit"
                class="predict__button"
            >
                Predict Sprint
            </button>
        </form>

        {#if results}
            <section class="predict__results">
                <h2>Sprint Results</h2>
                <p>Capacity: {results.sprint_capacity}</p>
                <p>Predicted Hours: {results.total_predicted_hours}</p>
                <p>Sprint Risk: {results.sprint_risk}</p>

                <h3>Tasks Analysis</h3>
                {#each results.results as result, index (index)}
                    <article class="predict__card">
                        <p>Predicted: {result.predicted_hours}h</p>
                        <p>Risk: {result.risk}</p>
                        <p>Similar Tasks: {result.similar_tasks}</p>
                    </article>
                {/each}
            </section>
        {/if}
    </section>
</main>

<style>
.predict {
    min-height: 100vh;
    padding: 40px;
    background: #f4f7fb;
    font-family: Arial;
}

.predict__container {
    max-width: 900px;
    margin: 0 auto;
    background: white;
    padding: 30px;
    border-radius: 12px;
}

.predict__title {
    font-size: 32px;
    margin-bottom: 30px;
}

.predict__subtitle {
    margin-top: 30px;
}

.predict__form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.predict__task {
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.predict__group {
    display: flex;
    flex-direction: column;
}

.predict__group label {
    margin-bottom: 8px;
    font-weight: bold;
}

.predict__group input,
.predict__group select {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
}

.predict__button,
.predict__add {
    padding: 12px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
}

.predict__button {
    background: #2563eb;
    color: white;
}

.predict__add {
    background: #16a34a;
    color: white;
}

.predict__results {
    margin-top: 40px;
}

.predict__card {
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 10px;
    margin-top: 15px;
}
</style>