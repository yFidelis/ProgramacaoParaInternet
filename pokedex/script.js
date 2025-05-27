// Seleciona os elementos da página
const input = document.getElementById('pokemonInput');
const button = document.getElementById('searchBtn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const card = document.getElementById('pokemonCard');

const nameEl = document.getElementById('pokemonName');
const numberEl = document.getElementById('pokemonNumber');
const spriteEl = document.getElementById('pokemonSprite');
const heightEl = document.getElementById('pokemonHeight');
const weightEl = document.getElementById('pokemonWeight');
const typesEl = document.getElementById('pokemonTypes');

// Função para buscar dados do Pokémon
function buscarPokemon() {
    const nomeOuNumero = input.value.trim().toLowerCase();
    if (!nomeOuNumero) return;

    // Oculta mensagens e mostra loading
    error.classList.add('hidden');
    card.classList.add('hidden');
    loading.classList.remove('hidden');

    fetch(`https://pokeapi.co/api/v2/pokemon/${nomeOuNumero}`)
        .then(res => {
            if (!res.ok) throw new Error("Pokémon não encontrado");
            return res.json();
        })
        .then(data => {
            // Preenche os dados no card
            nameEl.textContent = data.name;
            numberEl.textContent = `#${data.id}`;
            spriteEl.src = data.sprites.front_default;
            heightEl.textContent = `${data.height / 10} m`;
            weightEl.textContent = `${data.weight / 10} kg`;

            // Tipos (podem ter mais de um)
            typesEl.textContent = data.types.map(t => t.type.name).join(", ");

            // Exibe card e esconde loading
            card.classList.remove('hidden');
            loading.classList.add('hidden');
        })
        .catch(() => {
            // Se der erro, mostra mensagem de erro
            loading.classList.add('hidden');
            error.classList.remove('hidden');
        });
}

// Ativa a busca ao clicar no botão
button.addEventListener('click', buscarPokemon);

// Ativa a busca ao pressionar Enter
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') buscarPokemon();
});
