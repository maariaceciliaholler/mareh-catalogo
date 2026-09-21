const produtos = [

    {
        id: "MRH-0001",

        nome: "Vestido Floral",

        categoria: "roupas",

        categoriaNome: "Roupas",

        valor: 159.90,

        descricao:
            "Vestido floral leve e delicado, perfeito para diferentes ocasiões.",

        imagem:
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=85"
    },


    {
        id: "MRH-0002",

        nome: "Bolsa Rosa Estruturada",

        categoria: "bolsas",

        categoriaNome: "Bolsas",

        valor: 129.90,

        descricao:
            "Bolsa estruturada em tom rosa, elegante e versátil.",

        imagem:
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85"
    },


    {
        id: "MRH-0003",

        nome: "Blusa Off White",

        categoria: "roupas",

        categoriaNome: "Roupas",

        valor: 79.90,

        descricao:
            "Blusa em tom off white, peça essencial para o dia a dia.",

        imagem:
            "https://images.unsplash.com/photo-1564257577054-0eaa4c5f2f5f?auto=format&fit=crop&w=800&q=85"
    },


    {
        id: "MRH-0004",

        nome: "Colar Dourado",

        categoria: "acessorios",

        categoriaNome: "Acessórios",

        valor: 49.90,

        descricao:
            "Colar delicado com acabamento dourado.",

        imagem:
            "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=85"
    },


    {
        id: "MRH-0005",

        nome: "Calça Jeans",

        categoria: "roupas",

        categoriaNome: "Roupas",

        valor: 99.90,

        descricao:
            "Calça jeans clássica com modelagem confortável.",

        imagem:
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=85"
    },


    {
        id: "MRH-0006",

        nome: "Bolsa Couro Caramelo",

        categoria: "bolsas",

        categoriaNome: "Bolsas",

        valor: 189.90,

        descricao:
            "Bolsa em tom caramelo com visual clássico.",

        imagem:
            "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=800&q=85"
    },


    {
        id: "MRH-0007",

        nome: "Sandália Nude",

        categoria: "calcados",

        categoriaNome: "Calçados",

        valor: 119.90,

        descricao:
            "Sandália nude elegante e fácil de combinar.",

        imagem:
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=85"
    },


    {
        id: "MRH-0008",

        nome: "Brinco Dourado",

        categoria: "acessorios",

        categoriaNome: "Acessórios",

        valor: 39.90,

        descricao:
            "Brinco dourado delicado para completar o look.",

        imagem:
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=85"
    }

];


const productsGrid =
    document.getElementById(
        "products-grid"
    );


const productsCount =
    document.getElementById(
        "products-count"
    );


const emptyState =
    document.getElementById(
        "empty-state"
    );


const searchInput =
    document.getElementById(
        "search-input"
    );


let categoriaAtual = "todos";

let termoBusca = "";


/* =========================
   MOEDA
========================= */


function formatarMoeda(valor) {

    return new Intl.NumberFormat(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    ).format(valor);

}


/* =========================
   PRODUTOS FILTRADOS
========================= */


function obterProdutosFiltrados() {

    return produtos.filter(
        produto => {

            const correspondeCategoria =
                categoriaAtual === "todos" ||
                produto.categoria ===
                    categoriaAtual;


            const termo =
                termoBusca
                    .toLowerCase()
                    .trim();


            const correspondeBusca =
                produto.nome
                    .toLowerCase()
                    .includes(termo)

                ||

                produto.descricao
                    .toLowerCase()
                    .includes(termo);


            return (
                correspondeCategoria &&
                correspondeBusca
            );

        }
    );

}


/* =========================
   RENDER
========================= */


function renderizarProdutos() {

    const lista =
        obterProdutosFiltrados();


    productsCount.textContent =
        `${lista.length} ${
            lista.length === 1
                ? "peça"
                : "peças"
        }`;


    if (!lista.length) {

        productsGrid.innerHTML = "";

        emptyState.classList.remove(
            "hidden"
        );

        return;

    }


    emptyState.classList.add(
        "hidden"
    );


    productsGrid.innerHTML =
        lista.map(
            produto => `

                <a
                    href="pages/produto.html?id=${produto.id}"
                    class="product-card"
                >

                    <div class="product-image">

                        <img
                            src="${produto.imagem}"
                            alt="${produto.nome}"
                            loading="lazy"
                        >

                        <span
                            class="product-badge"
                        >
                            Disponível
                        </span>

                    </div>


                    <div class="product-info">

                        <span
                            class="product-category"
                        >
                            ${produto.categoriaNome}
                        </span>


                        <h3
                            class="product-name"
                        >
                            ${produto.nome}
                        </h3>


                        <p
                            class="product-description"
                        >
                            ${produto.descricao}
                        </p>


                        <div
                            class="product-footer"
                        >

                            <strong
                                class="product-price"
                            >
                                ${formatarMoeda(
                                    produto.valor
                                )}
                            </strong>


                            <span
                                class="product-link"
                            >
                                Ver peça →
                            </span>

                        </div>

                    </div>

                </a>

            `
        ).join("");

}


/* =========================
   CATEGORIAS
========================= */


document
    .querySelectorAll(
        ".category-button"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".category-button"
                        )
                        .forEach(
                            item =>
                                item.classList
                                    .remove(
                                        "active"
                                    )
                        );


                    button.classList.add(
                        "active"
                    );


                    categoriaAtual =
                        button.dataset.category;


                    renderizarProdutos();

                }
            );

        }
    );


/* =========================
   BUSCA
========================= */


searchInput.addEventListener(
    "input",
    event => {

        termoBusca =
            event.target.value;

        renderizarProdutos();

    }
);


/* =========================
   MENU MOBILE
========================= */


const mobileMenuButton =
    document.querySelector(
        ".mobile-menu-button"
    );


const navigation =
    document.querySelector(
        ".main-navigation"
    );


mobileMenuButton.addEventListener(
    "click",
    () => {

        navigation.classList.toggle(
            "mobile-open"
        );

    }
);


/* =========================
   INICIALIZAÇÃO
========================= */


renderizarProdutos();