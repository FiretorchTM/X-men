// alert("olá"); 
 /*
	OBJETIVO 1 - quando passar o mouse em cima do personagem da listagem, devemos selecionalo.
	
	passo 1 - pegar os personagens no js pra poder
			  verificar quando o usuario passar o
			  mouse em cima de um deles.
	
	passo 2 - adicionar a classe "selecionado"
			  no personagem que o usuario passar
			  o cursor do mouse.
	
	passo 3 - verificar se ja exista um personagem
			  selecionado, se sim, devemos remover
			  a seleção dele.
	
	OBJETIVO 2 - quando passar o mouse em cima do personagem da listagem, trocar a imagem, o nome 
				e a descrição do personagem grande.
	
	passo 1 - pegar o elemento do personagem grande
			  pra adicionar as informações a ele.
	
	passo 2 - alterar a imagem do personagem grande.
	
	passo 3 - alterar o nome do personagem grande.
	
	passo 4 - alterar a descrição do personagem grande.
*/
//o valor é const entao o valor e constante e nao pode mudar

const personagens = document.querySelectorAll(".personagem"); //busca todos os elementos que tenham a classe personagem
const audio = new Audio("./src/sounds/som.mp3"); 
const musicaDeFundo = new Audio("./src/sounds/musica-fundo.mp3");

musicaDeFundo.loop = true; // Música em loop
musicaDeFundo.volume = 0.5; // Volume inicial (50%)
const botaoIniciarMusica = document.getElementById("botao-iniciar-musica");// Referência ao botão
const botaoVolume = document.getElementById("botao-volume"); // Referência ao botão de volume
const controleVolume = document.getElementById("controle-volume"); // Referência ao controle de volume


// Iniciar música após interação
botaoIniciarMusica.addEventListener("click", () => {
    musicaDeFundo.play().catch((error) => {
        console.error("Erro ao reproduzir a música de fundo:", error);
    });
	 // Aplica a transição de fade-out para o botão desaparecer
    botaoIniciarMusica.style.opacity = 0; // Aplica a opacidade 0
    setTimeout(() => {
        botaoIniciarMusica.style.display = "none"; // Esconde o botão após o fade-out
    }, 500); // 500ms corresponde ao tempo da transição
	// Controla o volume da música com o slider
controleVolume.addEventListener("input", () => {
    musicaDeFundo.volume = controleVolume.value; // Atualiza o volume com o valor do slider
});
});

// Controle de volume (mutar ou diminuir volume)
botaoVolume.addEventListener("click", () => {
    if (musicaDeFundo.volume > 0) {
        musicaDeFundo.volume = 0; // Muta a música
        botaoVolume.innerText = "🔇 Mutado"; // Atualiza o texto do botão
    } else {
        musicaDeFundo.volume = 0.5; // Restaura o volume para 50%
        botaoVolume.innerText = "🔊 Volume"; // Atualiza o texto do botão
    }
});

personagens.forEach((personagem) =>{
	personagem.addEventListener("mouseenter", () => {
		if(window.innerWidth < 450){//para arrumar o problema do acesso no celular que nao tem mouse pra passar em cima
			window.scrollTo({top: 0, behavio: 'smooth'});//aqui tambem
		}
		     if (!audio.paused) {
            audio.pause();         // Pausa o áudio se ele estiver tocando
            audio.currentTime = 0; // Volta ao início
        }
        audio.play().catch((error) => {
            console.error("Erro ao reproduzir o áudio:", error);
        });
		//as duas linhas a seguir remove a seleção de personagem eu deveria refatorar  
		const personagemSelecionado = document.querySelector(".selecionado"); //buscando um elemento com o querySelector e seleciono apenas um elemento e salvo na variavel
		personagemSelecionado.classList.remove("selecionado");//estou removendo a classe do elemento a classe selecionado
		
		personagem.classList.add("selecionado");//dentro do add estou adicionando uma nova class aqui eu seleciono o azulzinho em volta
		//passo 1 pega o elemento do personagem grande pra adicionar as informações a ele
		const imagemPersonagemGrande = document.querySelector(".personagem-grande");//pego o elemento do personagem grande
		//passo 2 altera a imagem do personagem grande
		const idPersonagem = personagem.attributes.id.value;// o .personagem e o que a gente passa o mouse em cima e vamos pegar os atributos dele
		imagemPersonagemGrande.src = `./src/imagens/card-${idPersonagem}.png`;//colocar craze no começo e fim e depois sera permitido colocar a imagem do card- com o nome de uma variavel que foi iniciada com o "$" altero a fonte vou passar o caminho da imagem
		
		
		//passo 3 altera o nome do personagem grande
		const nomePersonagem = document.getElementById("nome-personagem");
		nomePersonagem.innerText = personagem.getAttribute("data-name");
		
		//passo 4 altera a descrição do personagem grande
		const descricaoPersonagem = document.getElementById("descricao-personagem");
		descricaoPersonagem.innerText = personagem.getAttribute("data-description");
		})
	
})
//cada item da lista o foreach faz alguma coisa, ele vai armazenar o personagem atua do laço ele printa cada um dos personagens	 
//click depois a ação tudo que tiver dentro vai acontecer depois do click
//o js consegue manipular a pagina depois dela carregar