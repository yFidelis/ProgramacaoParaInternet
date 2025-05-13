const carrinho = [];

function adicionarAoCarrinho(nome, preco) {
    const item = carrinho.find(p => p.nome === nome);
    if (item) {
        item.quantidade += 1;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }
    renderizarCarrinho();
}

function alterarQuantidade(nome, delta) {
    const item = carrinho.find(p => p.nome === nome);
    if (item) {
        item.quantidade += delta;
        if (item.quantidade <= 0) {
            const index = carrinho.indexOf(item); // corrigido aqui
            carrinho.splice(index, 1);
        }
    }
    renderizarCarrinho();
}

function renderizarCarrinho() {
    const div = document.getElementById('carrinho');
    div.innerHTML = '';
    let total = 0;
    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        div.innerHTML += `
            <p>
                ${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}
                <button onclick="alterarQuantidade('${item.nome}', -1)">-</button>
                <button onclick="alterarQuantidade('${item.nome}', 1)">+</button>
                = R$ ${subtotal.toFixed(2)}
            </p>
        `;
    });

    div.innerHTML += `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
}
