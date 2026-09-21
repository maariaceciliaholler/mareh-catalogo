const params =
    new URLSearchParams(
        window.location.search
    );


const produtoId =
    params.get("id");


const produtos = [

    {
        id: "MRH-0001",

        nome: "Vestido Floral",

        categoriaNome: "Roupas",

        valor: 159.90,

        codigo: "MRH-0001",

        descricao:
            "Vestido floral leve e delicado, perfeito para diferentes ocasiões. Uma peça versátil que pode ser usada tanto durante o dia quanto em momentos especiais.",

        imagens: [
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=90",
            "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=1000&q=90"
        ]

    },

    {
        id: "MRH-0002",

        nome: "Bolsa Rosa Estruturada",

        categoriaNome: "Bolsas",

        valor: 129.90,

        codigo: "MRH-0002",

        descricao:
            "Bolsa estruturada em tom rosa, elegante e versátil.",

        imagens: [
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=90"
        ]

    }

];


const produto =
    produtos.find(
        item =>
            item.id === produtoId
    );


const container =
    document.getElementById(
        "product-detail"
    );


function formatarMoeda(valor) {

    return new Intl.NumberFormat(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    ).format(valor);

}


function renderizarProduto() {

    if (!produto) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    ♡
                </div>

                <h3>
                    Produto não encontrado
                </h3>

                <p>
                    Essa peça pode ter sido removida
                    do catálogo.
                </p>

                <br>

                <a
                    href="../index.html"
                    class="primary-button"
                >
                    Voltar ao catálogo
                </a>

            </div>

        `;

        return;

    }


    container.innerHTML = `

        <div class="product-gallery">

            ${produto.imagens.map(
                imagem => `

                    <img
                        src="${imagem}"
                        alt="${produto.nome}"
                    >

                `
            ).join("")}

        </div>


        <div class="product-detail-info">

            <span class="detail-category">
                ${produto.categoriaNome}
            </span>


            <h1 class="detail-name">
                ${produto.nome}
            </h1>


            <span class="detail-code">
                Código ${produto.codigo}
            </span>


            <div class="detail-price">
                ${formatarMoeda(
                    produto.valor
                )}
            </div>


            <p class="detail-description">
                ${produto.descricao}
            </p>


            <div class="detail-actions">

                <button
                    class="detail-button primary"
                    id="copy-button"
                >
                    Copiar item
                </button>


                <button
                    class="detail-button secondary"
                    id="share-button"
                >
                    Compartilhar
                </button>


                <button
                    class="detail-button secondary"
                    id="whatsapp-button"
                >
                    Falar pelo WhatsApp
                </button>

            </div>

        </div>

    `;


    document
        .getElementById(
            "copy-button"
        )
        .addEventListener(
            "click",
            copiarProduto
        );


    document
        .getElementById(
            "share-button"
        )
        .addEventListener(
            "click",
            compartilharProduto
        );


    document
        .getElementById(
            "whatsapp-button"
        )
        .addEventListener(
            "click",
            whatsappProduto
        );

}


function obterUrlProduto() {

    return window.location.href;

}


async function copiarProduto() {

    const texto = `

Olá! Tenho interesse neste item da Mareh:

${produto.nome}
Código: ${produto.codigo}
Valor: ${formatarMoeda(produto.valor)}

${obterUrlProduto()}

    `.trim();


    await navigator.clipboard
        .writeText(texto);


    alert(
        "Item copiado!"
    );

}


async function compartilharProduto() {

    const url =
        obterUrlProduto();


    if (
        navigator.share
    ) {

        await navigator.share({

            title:
                produto.nome,

            text:
                `Tenho interesse neste item da Mareh: ${produto.nome}`,

            url

        });

        return;

    }


    await navigator.clipboard
        .writeText(url);


    alert(
        "Link copiado!"
    );

}


function whatsappProduto() {

    const mensagem = `

Olá! Tenho interesse neste item da Mareh:

${produto.nome}
Código: ${produto.codigo}
Valor: ${formatarMoeda(produto.valor)}

${obterUrlProduto()}

    `.trim();


    const url =
        "https://wa.me/?text=" +
        encodeURIComponent(
            mensagem
        );


    window.open(
        url,
        "_blank"
    );

}


renderizarProduto();