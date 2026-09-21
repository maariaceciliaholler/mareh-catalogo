const produtos = [
    {
        id: "MRH-0001",
        codigo: "MRH-0001",
        nome: "Vestido Floral Midi",
        categoria: "Roupas",
        descricao: "Vestido floral midi, leve e elegante.",
        valor: 159.90,
        imagem: "https://images.unsplash.com/photo-1496217590455-aa63a8350eea?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: "MRH-0002",
        codigo: "MRH-0002",
        nome: "Bolsa Rosa Estruturada",
        categoria: "Bolsas",
        descricao: "Bolsa estruturada em tom rosa, perfeita para compor looks.",
        valor: 129.90,
        imagem: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: "MRH-0003",
        codigo: "MRH-0003",
        nome: "Blusa Off White",
        categoria: "Roupas",
        descricao: "Blusa básica em tom off white.",
        valor: 89.90,
        imagem: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: "MRH-0004",
        codigo: "MRH-0004",
        nome: "Colar Dourado",
        categoria: "Acessórios",
        descricao: "Colar dourado delicado para complementar o look.",
        valor: 49.90,
        imagem: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: "MRH-0005",
        codigo: "MRH-0005",
        nome: "Calça Jeans Wide Leg",
        categoria: "Roupas",
        descricao: "Calça jeans de modelagem wide leg.",
        valor: 119.90,
        imagem: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: "MRH-0006",
        codigo: "MRH-0006",
        nome: "Bolsa Couro Caramelo",
        categoria: "Bolsas",
        descricao: "Bolsa em tom caramelo com design clássico.",
        valor: 149.90,
        imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: "MRH-0007",
        codigo: "MRH-0007",
        nome: "Sandália Nude",
        categoria: "Calçados",
        descricao: "Sandália nude versátil e delicada.",
        valor: 99.90,
        imagem: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: "MRH-0008",
        codigo: "MRH-0008",
        nome: "Brinco Dourado",
        categoria: "Acessórios",
        descricao: "Brinco dourado para produções delicadas.",
        valor: 39.90,
        imagem: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85"
    }
];


const productsGrid = document.getElementById("products-grid");
const productsCount = document.getElementById("products-count");
const emptyState = document.getElementById("empty-state");
const searchInput = document.getElementById("search-input");
const categoryButtons = document.querySelectorAll(".category-button");


let categoriaAtual = "todos";


function formatarMoeda(valor) {

    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(valor);

}


function normalizarTexto(texto) {

    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

}


function renderizarProdutos(lista) {

    productsGrid.innerHTML = "";

    productsCount.textContent =
        `${lista.length} ${lista.length === 1 ? "peça" : "peças"}`;


    if (lista.length === 0) {

        emptyState.classList.remove("hidden");

        return;

    }


    emptyState.classList.add("hidden");


    lista.forEach(produto => {

        const card = document.createElement("article");

        card.className = "produto-card";


        card.innerHTML = `

            <a
                href="pages/produto.html?id=${produto.id}"
                class="produto-card__link"
            >

                <div class="produto-card__imagem-wrapper">

                    <img
                        src="${produto.imagem}"
                        alt="${produto.nome}"
                        class="produto-card__imagem"
                        loading="lazy"
                    >

                </div>


                <div class="produto-card__conteudo">

                    <span class="produto-card__categoria">
                        ${produto.categoria}
                    </span>


                    <h3 class="produto-card__nome">
                        ${produto.nome}
                    </h3>


                    <p class="produto-card__descricao">
                        ${produto.descricao}
                    </p>


                    <div class="produto-card__rodape">

                        <strong class="produto-card__preco">
                            ${formatarMoeda(produto.valor)}
                        </strong>


                        <span class="produto-card__botao">
                            Ver peça
                        </span>

                    </div>

                </div>

            </a>

        `;


        productsGrid.appendChild(card);

    });

}


function filtrarProdutos() {

    const termo =
        normalizarTexto(searchInput.value.trim());


    const listaFiltrada =
        produtos.filter(produto => {

            const correspondeCategoria =
                categoriaAtual === "todos" ||
                normalizarTexto(produto.categoria) ===
                normalizarTexto(categoriaAtual);


            const correspondeBusca =
                !termo ||
                normalizarTexto(produto.nome).includes(termo) ||
                normalizarTexto(produto.descricao).includes(termo) ||
                normalizarTexto(produto.codigo).includes(termo);


            return correspondeCategoria && correspondeBusca;

        });


    renderizarProdutos(listaFiltrada);

}


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(item => {
            item.classList.remove("active");
        });


        button.classList.add("active");


        categoriaAtual =
            button.dataset.category;


        filtrarProdutos();

    });

});


searchInput.addEventListener(
    "input",
    filtrarProdutos
);


renderizarProdutos(produtos);