<script>

    import { onMount } from 'svelte';

    let developers = $state([]);

    let sprints = $state([]);

    let developer_id = $state('');

    let sprint_id = $state('');

    let estimated_hours = $state('');

    let message = $state('');

    async function loadDevelopers() {

        const response = await fetch(
            'http://localhost:3000/developers'
        );

        developers = await response.json();

    }

    async function loadSprints() {

        const response = await fetch(
            'http://localhost:3000/sprints'
        );

        sprints = await response.json();

    }

    async function saveTask(event) {

        event.preventDefault();

        const response = await fetch(

            'http://localhost:3000/tasks',

            {

                method: 'POST',

                headers: {

                    'Content-Type': 'application/json'

                },

                body: JSON.stringify({

                    sprint_id,

                    developer_id,

                    estimated_hours

                })

            }

        );

        const data = await response.json();

        message = data.message || data.error;

    }

    onMount(() => {

        loadDevelopers();

        loadSprints();

    });

</script>

<main class="tasks">

    <section class="tasks__container">

        <h1 class="tasks__title">

            Sprint Risk Administration

        </h1>

        <form
            class="tasks__form"
            onsubmit={saveTask}
        >

            <div class="tasks__group">

                <label for="developer">

                    Developer

                </label>

                <select
                    id="developer"
                    bind:value={developer_id}
                >

                    <option value="">

                        Select Developer

                    </option>

                    {#each developers as developer (developer.id)}

                        <option value={developer.id}>

                            {developer.name}

                        </option>

                    {/each}

                </select>

            </div>

            <div class="tasks__group">

                <label for="sprint">

                    Sprint

                </label>

                <select
                    id="sprint"
                    bind:value={sprint_id}
                >

                    <option value="">

                        Select Sprint

                    </option>

                    {#each sprints as sprint (sprint.id)}

                        <option value={sprint.id}>

                            {sprint.name}

                        </option>

                    {/each}

                </select>

            </div>

            <div class="tasks__group">

                <label for="hours">

                    Estimated Hours

                </label>

                <input
                    id="hours"
                    type="number"
                    bind:value={estimated_hours}
                    placeholder="Estimated hours"
                />

            </div>

            <button
                type="submit"
                class="tasks__button"
            >

                Save Task

            </button>

        </form>

        <p class="tasks__message">

            {message}

        </p>

    </section>

</main>