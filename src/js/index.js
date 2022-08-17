const produtos = document.querySelector(".secaoProdutos")
const carrinho = document.querySelector(".secaoCarrinho")


function listarProdutos(lista, vitrine){

    produtos.innerHTML = ""

    for(let i = 0; i < lista.length; i++){
        
        let produto = lista[i]
        let card = criarCard(produto)
        vitrine.appendChild(card)
    }
}
listarProdutos(produtosDropCat, produtos)


function criarCard(produto){

    const card = document.createElement("li")
    const imagemProduto = document.createElement("img")
    const tagProduto = document.createElement("h3")
    const nomeProduto = document.createElement("h1")
    const descricaoProduto = document.createElement("p")
    const precoProduto = document.createElement("p")
    const botaoCarrinho = document.createElement("button")

    card.classList.add("cardProduto")
    tagProduto.classList.add("categoria")
    botaoCarrinho.classList.add("btnAdicionarCarrinho")

    card.appendChild(imagemProduto)
    card.appendChild(tagProduto)
    card.appendChild(nomeProduto)
    card.appendChild(descricaoProduto)
    card.appendChild(precoProduto)
    card.appendChild(botaoCarrinho)
    produtos.appendChild(card)

    imagemProduto.src = produto.imagem
    imagemProduto.alt = produto.nome
    tagProduto.innerText = produto.tag
    nomeProduto.innerText = produto.nome
    descricaoProduto.innerText = produto.descricao
    precoProduto.innerText = `R$ ${produto.preco},00`
    botaoCarrinho.innerText = "Adicionar ao carrinho"
    botaoCarrinho.href = ""
    botaoCarrinho.id = produto.id

return card
}

produtos.addEventListener("click", interceptaProduto)

const carrinhoCompras = []


function interceptaProduto(event){
    
    let btnComprar = event.target
    
    if(btnComprar.tagName == "BUTTON"){
        
        let idProduto = btnComprar.id
        
        let produto = produtosDropCat.find(function(produto){
            
            if(produto.id == idProduto){
                return produto
            }
        })
        adicionaAoCarrinho(produto)
        removerItem()
    }
}

function adicionaAoCarrinho(produto){

    if(produto !== undefined){
    carrinhoCompras.push(produto)
    listarCarrinho(carrinhoCompras)
    somaItens  (carrinhoCompras) 
    }
}

function criarCardCarrinho(produto){
    
    let cardCarrinho = document.createElement("li")
    let divCarrinho = document.createElement("div")
    let imagemCarrinho = document.createElement("img");
    let nomeCarrinho = document.createElement("h2")
    let precoCarrinho = document.createElement("h3")
    let btnRetirarCarrinho = document.createElement("button")

    imagemCarrinho.src = produto.imagem
    imagemCarrinho.alt = produto.nome
    nomeCarrinho.innerText = produto.nome
    precoCarrinho.innerText = `R$ ${produto.preco},00`
    btnRetirarCarrinho.innerText = "Retirar do carrinho"
    btnRetirarCarrinho.id = produto.id

    cardCarrinho.appendChild(imagemCarrinho)
    divCarrinho.appendChild(nomeCarrinho)
    divCarrinho.appendChild(precoCarrinho)
    divCarrinho.appendChild(btnRetirarCarrinho)
    cardCarrinho.appendChild(divCarrinho)
    carrinho.appendChild(cardCarrinho)

    btnRetirarCarrinho.classList.add("botaoRetirar")   
}

function listarCarrinho(array){
    
    carrinho.innerHTML = ""
    for(let i = 0; i < array.length; i++){  
                
        criarCardCarrinho(array[i])     
    }
}


function removerItem() {

    const btn = document.getElementsByClassName("botaoRetirar")
    
    for(let i = 0; i < btn.length; i++){
        let posicao = btn[i]

        posicao.addEventListener("click", function(){
            carrinhoCompras.splice(i, 1)
            listarCarrinho(carrinhoCompras)
            removerItem()
            somaItens(carrinhoCompras)
        })
    }
}

let infoCarrinho = document.querySelector(".finalizarCompra")
let divCarrinho = document.createElement("div")
let itens = document.createElement("p")
let valor = document.createElement("p")

divCarrinho.appendChild(itens)
divCarrinho.appendChild(valor)
infoCarrinho.appendChild(divCarrinho)

itens.innerHTML = `Quantidade : ${carrinhoCompras.length}`
valor.innerHTML = `Total: R$ 0`



function somaItens(array){
    let valorTotal = 0

    if(array.length == 0){

        let divInfo = document.createElement("div")
        let infoCarrinho = document.createElement("h2")
        let infoValorCarrinho = document.createElement("p")

        infoCarrinho.innerText = "Carrinho vazio"
        infoValorCarrinho.innerText = "Adicione Produtos"

        divInfo.append(infoCarrinho, infoValorCarrinho)
        carrinho.appendChild(divInfo)

        divInfo.classList.add("infoCarrinho")
    }

    for(let i = 0; i < array.length; i++){
        valorTotal += array[i].preco
    }
    itens.innerHTML = `Quantidade : ${array.length}`
    valor.innerHTML = `Total: R$ ${valorTotal}`

}
somaItens(carrinhoCompras)

let input = document.querySelector(".pesquisa input")
let inputButton = document.querySelector(".pesquisa button")

input.addEventListener("keyup", function(event){

    let pesquisaUsuario = input.value
    let resultado = busca(pesquisaUsuario)

})


function busca(valorPesquisa){

    let resultadoBusca = []

    for(let i = 0; i < produtosDropCat.length; i++){

        let pesquisa    = valorPesquisa.toLowerCase()
        let nomeProduto = produtosDropCat[i].nome.toLowerCase()
        let tagProduto = produtosDropCat[i].tag.toLowerCase()

        if(nomeProduto.includes(pesquisa) || tagProduto.includes(pesquisa)){

            resultadoBusca.push(produtosDropCat[i])
            
            listarProdutos(resultadoBusca, produtos)
        }
    }
return resultadoBusca
}


const links = document.querySelector(".cabecalho")

links.addEventListener("click", pesquisaLinks)
    
function pesquisaLinks(event){

    let pesquisaLink = []

    event.preventDefault()
    
    let pesquisaBtn = event.target
    
    for(let i = 0; i < produtosDropCat.length;i++){

        if(pesquisaBtn.tagName == "A" && pesquisaBtn.innerText.includes(produtosDropCat[i].tag)){
            pesquisaLink.push(produtosDropCat[i])
            console.log(pesquisaLink)
            listarProdutos(pesquisaLink, produtos)
        }
        else if(pesquisaBtn.tagName == "A" && pesquisaBtn.innerText == "Todos"){
            listarProdutos(produtosDropCat, produtos)
        }
        
    }
}