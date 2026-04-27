    // --- MÉTODOS DO DOM PARA SELEÇÃO ---
        const inputBusca = document.getElementById('input-busca');
        const contador = document.getElementById('contador-carrinho');
        const botoesComprar = document.querySelectorAll('.btn-comprar');
        const cards = document.querySelectorAll('.produto-card');

        let totalItens = 0;

        // --- EVENTO DE CLIQUE (Adicionar ao carrinho) ---
        botoesComprar.forEach(botao => {
            botao.addEventListener('click', () => {
                totalItens++;
                // Atualizando o conteúdo via DOM
                contador.textContent = totalItens;
                
                // Feedback visual simples
                botao.innerText = "Adicionado!";
                botao.style.backgroundColor = "#27ae60";
                
                setTimeout(() => {
                    botao.innerText = "Adicionar ao Carrinho";
                    botao.style.backgroundColor = "#2ecc71";
                }, 1000);
            });
        });

        // --- EVENTO DE INPUT (Filtro de busca) ---
        inputBusca.addEventListener('input', (e) => {
            const termo = e.target.value.toLowerCase();

            cards.forEach(card => {
                const nomeProduto = card.querySelector('h3').innerText.toLowerCase();
                
                // Método DOM para alterar visibilidade
                if (nomeProduto.includes(termo)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });



// Seletores Adicionais
const listaCarrinho = document.getElementById('lista-carrinho');
const subtotalDisplay = document.getElementById('subtotal');
const selectFrete = document.getElementById('select-frete');
const formCheckout = document.getElementById('form-checkout');
const notaFiscalArea = document.getElementById('nota-fiscal');

let itensCarrinho = [];

// 1. ADICIONAR E RENDERIZAR CARRINHO
function atualizarCarrinho() {
    listaCarrinho.innerHTML = ""; // Limpa a lista para re-renderizar
    let soma = 0;

    itensCarrinho.forEach((item, index) => {
        soma += item.preco;
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.nome} - R$ ${item.preco.toFixed(2)}
            <button onclick="removerDoCarrinho(${index})">❌</button>
        `;
        listaCarrinho.appendChild(li);
    });

    subtotalDisplay.textContent = soma.toFixed(2);
}

// Vinculando aos botões da vitrine (exemplo de modificação na função anterior)
document.querySelectorAll('.btn-comprar').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.produto-card');
        const nome = card.querySelector('h3').innerText;
        const preco = parseFloat(card.querySelector('.preco').innerText.replace('R$ ', '').replace('.', '').replace(',', '.'));
        
        itensCarrinho.push({ nome, preco });
        atualizarCarrinho();
    });
});


function atualizarCarrinho() {
    listaCarrinho.innerHTML = ""; 
    let soma = 0;

    // Atualiza o contador de itens lá do topo (o que está marcando 4 na sua imagem)
    const contadorTopo = document.getElementById('contador-carrinho');
    contadorTopo.textContent = itensCarrinho.length;

    itensCarrinho.forEach((item, index) => {
        soma += item.preco;
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.nome} - R$ ${item.preco.toFixed(2)}
            <button class="btn-remover" onclick="removerDoCarrinho(${index})">❌</button>
        `;
        listaCarrinho.appendChild(li);
    });

    // Atualiza o subtotal na tela
    subtotalDisplay.textContent = soma.toFixed(2);
}

// 2. REMOVER DO CARRINHO (Método removeChild indireto)
window.removerDoCarrinho = (index) => {
    itensCarrinho.splice(index, 1);
    atualizarCarrinho();
};

// 3. CÁLCULO DE FRETE (Evento 'change')
selectFrete.addEventListener('change', () => {
    const frete = parseFloat(selectFrete.value);
    const sub = parseFloat(subtotalDisplay.textContent);
    alert(`Total com frete: R$ ${(sub + frete).toFixed(2)}`);
});

// 4. PAGAMENTO E EMISSÃO DE NOTA (Evento 'submit')
formCheckout.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede a página de recarregar
    
    if (itensCarrinho.length === 0) return alert("Carrinho vazio!");

    const frete = parseFloat(selectFrete.value);
    const metodo = document.getElementById('metodo-pagamento').value;
    let total = parseFloat(subtotalDisplay.textContent) + frete;
    
    // Regra de negócio: Desconto no Pix
    if (metodo === "Pix") total *= 0.95;

    // Gerar Nota Fiscal via DOM
    notaFiscalArea.innerHTML = `
        <div class="nf-box">
            <h2>🧾 Nota Fiscal Eletrônica</h2>
            <p><strong>Data:</strong> ${new Date().toLocaleString()}</p>
            <hr>
            <p>Itens: ${itensCarrinho.length}</p>
            <p>Frete: R$ ${frete.toFixed(2)}</p>
            <p>Pagamento: ${metodo}</p>
            <h3>Total Pago: R$ ${total.toFixed(2)}</h3>
            <button onclick="window.print()">Imprimir PDF</button>
        </div>
    `;
    notaFiscalArea.classList.remove('hidden');
    window.scrollTo(0, document.body.scrollHeight);
});

formCheckout.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    if (itensCarrinho.length === 0) return alert("Carrinho vazio!");

    const btn = document.getElementById('btn-finalizar');

    // 1. ESTADO: PROCESSANDO (Azul Escuro)
    btn.style.backgroundColor = "#2c3e50"; 
    btn.innerText = "Processando...";
    btn.disabled = true;

    setTimeout(() => {
        // 2. ESTADO: SUCESSO (Verde)
        btn.style.backgroundColor = "#27ae60"; // Verde Sucesso
        btn.innerText = "✓ Compra Finalizada com Sucesso!";

        // 3. RETORNAR AO NORMAL (Após 3 segundos)
        setTimeout(() => {
            btn.style.backgroundColor = "#3498db"; // Volta para o Azul original
            btn.innerText = "Finalizar Compra";
            btn.disabled = false;
            
            // Limpa o carrinho após o sucesso (Opcional)
            // itensCarrinho = [];
            // atualizarCarrinho();
        }, 3000);

        // Chamar a emissão de nota aqui se desejar
        // emitirNotaFiscal(); 

    }, 1500); // Tempo do "Processando..."
});

//logout
const btnLogout = document.getElementById('btn-logout');

btnLogout.addEventListener('click', () => {
    // 1. Confirmação opcional
    const confirmacao = confirm("Deseja realmente sair da sua conta?");

    if (confirmacao) {
        // 2. Feedback visual antes de sair
        btnLogout.innerText = "Saindo...";
        btnLogout.style.backgroundColor = "#7f8c8d";

        // 3. Simula a limpeza de dados (se você usar localStorage)
        // localStorage.removeItem('usuarioLogado');

        // 4. Redirecionamento via DOM
        setTimeout(() => {
            window.location.href = "login.html";
        }, 800);
    }
});