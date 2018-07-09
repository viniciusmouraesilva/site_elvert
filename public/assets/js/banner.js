(function() {
		
	/* variaveis */		
	'use strict';
			
	var $imagens = document.querySelectorAll('.disabled img');
	
	var $bolinhas = document.querySelector('.bolinhas');	
	
	var $header = document.querySelector('header');

	var intervalo = '';
			
	var $prev_e_next = document.querySelector('.botoes');
			
	var alvoAntecedente = 0;
	/* --- */

	/* Verificar se possui imagens */
	if($imagens) {

		/* Variaveis */
		var qtdImagens = $imagens.length;

		fazerBolinhas(qtdImagens);

		var $btns = document.querySelectorAll('header button');

		monitorarClicks();

		//fim em numero de imagens
		//para percorer botões prev e
		//next
		var fim = qtdImagens;
		
		while(qtdImagens)
		{
			qtdImagens--;
					
			$imagens[qtdImagens].classList.add('disabled');		
		}
				
		botoesPrevENext(qtdImagens+1,fim);

		moverCarrossel();

		comecarCarrossel();
	}

	function comecarCarrossel()
	{
		$header.classList.remove('disabled');

		$header.classList.add('imagens');
	}

	function imagemAtual(posicao)
	{
		modificarImagem(posicao);
				
		modificarIdHeader(posicao);
	}

	function retirarImagemAntiga(posicao)
	{
		$imagens[posicao].classList.remove('actived');
		$imagens[posicao].classList.add('disabled');
	}

	function fazerBolinhas(qtd)
	{
		var i = 1;

		while(i<=qtd)
		{
					//criando elemento
			var btn = document.createElement('button');

			btn.id = i;
					
			if(i === 1) btn.style.backgroundColor = 'black'; 

			btn.classList.add('bolinhas');

			var conteudo = document.createTextNode('');

			btn.appendChild(conteudo);

			$bolinhas.appendChild(btn);
			
			i++;
		}
	}

	function monitorarClicks()
	{
		var qtdLinks = $btns.length - 1;				
		for(var i = 0; i<=qtdLinks ;i++)
		{
			$btns[i].addEventListener('click',function(e) {
					mudarImagem(e.target);
			});
		}
	}

	function mudarImagem(imagem)
	{
		limparIntervalo();

		modificarImagem(parseInt(imagem.getAttribute('id'))-1);

		modificarIdHeader(parseInt(imagem.getAttribute('id'))-1);

		reiniciarIntervalo(imagem.id-1);	
	}

	function moverCarrossel(mudancaDeRumo=0)
	{
		var qtd = $imagens.length - 1;
		var n = 0;
				
		if(mudancaDeRumo > 0) {
			n = mudancaDeRumo;
		}

		//Caso regressão var naoDecremento = false;
	
		intervalo = setInterval(function() {

			if($imagens[0] && n === 0) {
				imagemAtual(n + 1);
				retirarImagemAntiga(n);
				//naoDecremento = false;
				incrementar();
			}else if(n < qtd) 
				// Se for em regressão adicionar esse and && !naoDecremento)
			{
				imagemAtual(n + 1);
				retirarImagemAntiga(n);
				incrementar();
			}else {
				imagemAtual(0);
				retirarImagemAntiga(n);	
				n = 0;

				//Casso seja voltar em regresiva 
				//imagemAtual(n-1);
				//naoDecremento = true;
				//n--;
			}

			function incrementar() {
				n++;
			}

		},5000);
	}

	function botoesPrevENext(inicio,fim)
	{
		var i = 1;

		while(i<=2)
		{
			var btn = document.createElement('button');

			if(i==1) {
				var conteudo = document.createTextNode('<');
				btn.setAttribute('id','prev');
			}else {
				var conteudo = document.createTextNode('>') ;
				btn.setAttribute('id','next');
			}
						
			btn.appendChild(conteudo);

			$prev_e_next.appendChild(btn);

			i++;
		}

		var btnNext = document.getElementById('next'); 
		var btnPrev = document.getElementById('prev');
				
		btnNext.addEventListener('click',function(e){
			var alvo = e.target;
			moverImagem(alvo);
		});

		btnPrev.addEventListener('click',function(e){
			var alvo = e.target;
			moverImagem(alvo);
		});
	}

	function moverImagem(alvo)
	{
		var idAtual = parseInt($header.getAttribute('id'));

		var posicoes = $imagens.length;

		if(targetPrev(alvo)) 
		{
			if(idAtual === 0) {

				limparIntervalo();

				modificarImagem(posicoes-1);

				modificarIdHeader(posicoes-1);

				reiniciarIntervalo(posicoes-1);
						
			} else if(idAtual <= posicoes-1) {

				limparIntervalo();

				modificarImagem(idAtual-1);

				modificarIdHeader(idAtual-1);

				reiniciarIntervalo(idAtual-1);
			}
		}

		if(targetNext(alvo)) {

			if(idAtual === posicoes-1) {

				limparIntervalo();

				modificarImagem(0);

				modificarIdHeader(0);

				reiniciarIntervalo(0);

			}else if(idAtual < posicoes-1) {
						
				limparIntervalo();

				modificarImagem(idAtual+1);

				modificarIdHeader(idAtual+1);

				reiniciarIntervalo(idAtual+1);
			}

		}
	}

	function limparIntervalo()
	{
		clearInterval(intervalo);
	}

	function reiniciarIntervalo(posicao)
	{
		moverCarrossel(posicao);
	}

	function modificarIdHeader(id)
	{
		$header.setAttribute('id',id);
	}

	function modificarImagem(posicao)
	{	
		$header.style.backgroundImage = "url("+$imagens[posicao].getAttribute('src')+")";	

		var bolinha = acharBolinha(posicao);
				
		removerEstiloBolinhaRestante(posicao);
				
		estilizarBolinha(bolinha);
	}

	function targetNext(alvo)
	{
		return alvo.getAttribute('id') === 'next';
	}

	function targetPrev(alvo)
	{
		return alvo.getAttribute('id') === 'prev';
	}

	function acharBolinha(posicao)
	{
		var bolinhas = document.querySelectorAll('.bolinhas button');
		return bolinhas[posicao];
	}

	function estilizarBolinha(bolinha)
	{
		bolinha.style.backgroundColor = 'black';
	}

	function removerEstiloBolinhaRestante(posicaoAtual)
	{	
		var qtd = $imagens.length - 1;

		while(qtd >= 0)
		{
			if(qtd !== posicaoAtual) {
				$btns[qtd].style.backgroundColor = 'white';
			}
			qtd--;
		}
	}

})();