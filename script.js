 const SUPABASE_URL = 'https://krsrcrrdwceritanlsih.supabase.co';
		  const SUPABASE_ANON_KEY = 'sb_publishable_T4B-seLE58QT9egUSovN9w_TwhsRxSf';
		  const Clientesupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
		   let URLimagempendente = null;
		  let enviandoimagem = false;
		  const nomeusuarioconta = localStorage.getItem("nomeUsuario");
		  const dica = document.querySelector('.mostrarondecriaconta');
		  		  const trocarnomeecriarconta = document.getElementById('trocarnomeecriarconta');
		  const sairconta = document.getElementById('sairconta');
		  const abrirjanelaimagemperfil = document.querySelector('.abrirjanelaimagemperfil');
		  const imgconta = document.querySelector('.imgconta');
		  const iddoUsuario = localStorage.getItem("idUsuario");
		  const entrarconta = document.getElementById('entrarconta');
		  const janelaentrarconta = document.querySelector('.janelaentrarconta');
		  const fecharjanelaentrarconta = document.querySelector('.fecharjanelaentrarconta');
		  const botaoentrarconta = document.querySelector('.botaoentrarconta');
		  const inputnomedacontaexistente = document.getElementById('inputnomedacontaexistente');
		  const inputsenhadacontaexistente = document.getElementById('inputsenhadacontaexistente');
		  const inputsenhadousuario = document.querySelector('.inputsenhadousuario');
		  const SUPABASEURL2 = 'https://gxhpugwnsxrcnqpciqpn.supabase.co';
			  const SUPABASE_ANON_KEY_2 = 'sb_publishable_53UTGTptBzBsUre_tAahXQ_XyMu13jM';
			  const ClientUsuarios = window.supabase.createClient(SUPABASEURL2, SUPABASE_ANON_KEY_2);
		  const thumb = document.querySelector('.scrollbar-thumb');
		  const track = document.querySelector('.scrollbar-track');
const errorwindow = document.querySelector('.errorwindow');
const fecharerrorwindow = document.querySelector('.fecharerrorwindow');
fecharerrorwindow.onclick = function() {
	errorwindow.style.display = 'none';
}
		  const menucominicioecriarcomunidade = document.getElementById('menucominicioecriarcomunidade');
		  function atualizarscroll() {
			  const altura = document.documentElement.scrollHeight;
			  const janela = window.innerHeight;
			  const posicao = window.scrollY / (altura - janela);
			  const alturaThumb = thumb.offsetHeight;
			  const espacothumb = janela - alturaThumb;
              if (espacothumb <= 0) {
				  return;
			  }
			  thumb.style.top = posicao * espacothumb + 'px';
		  }
		  window.addEventListener('scroll', atualizarscroll);
		  window.addEventListener('resize', atualizarscroll);
		  atualizarscroll();
		  new ResizeObserver(atualizarscroll).observe(document.body);
		  let arrastando = false;
		  let iniciodascrollbar = 0;
		  let scrollInicial = 0;

		  thumb.addEventListener('pointerdown', (e) => {
			  arrastando = true;
			  iniciodascrollbar = e.clientY;
			  scrollInicial = window.scrollY;
			  thumb.setPointerCapture(e.pointerId);
			  thumb.style.transition = 'none';
			  track.style.width = '10px';
		  });
		  thumb.addEventListener('pointermove', (e) => {
			  if (!arrastando) return;
		  const deltaY = e.clientY - iniciodascrollbar;
		  const alturaTotal = document.documentElement.scrollHeight;
			  const janela = window.innerHeight;
			  const scrollmaximo = alturaTotal - janela;

			  const alturaThumb = thumb.offsetHeight;
			  const espacodathumb = janela - alturaThumb;
		  if (espacodathumb <= 0) return;
		  const scrollDelta = (deltaY / espacodathumb) * scrollmaximo;
			  window.scrollTo(0, scrollInicial + scrollDelta);
		  })
		  thumb.addEventListener('pointerup', (e) => {
		  arrastando = false;
		  thumb.style.transition = '';
		  thumb.releasePointerCapture(e.pointerId);
		  track.style.width = '6px';
		  })
		  thumb.addEventListener('pointercancel', (e) => {
		  arrastando = false;
		  thumb.style.transition = '';
			  thumb.releasePointerCapture(e.pointerId);
			  track.style.width = '6px';
		  })
		  botaoentrarconta.onclick = async function() {
			  const senha = inputsenhadacontaexistente.value.trim();
			  const nome = inputnomedacontaexistente.value.trim();
			  if (senha === '' || nome === '') {
		  alert('Preencha tudo');
			  return;
			  }
			  botaoentrarconta.textContent = 'Entrando...';
			  botaoentrarconta.disabled = true;
			  const {data: usuario, error} = await ClientUsuarios
			  .from('usuarios')
			  .select('id, nome, senha')
			  .eq('nome', nome)
			  .maybeSingle();

			  if (error) {
		  alert('Erro ao tentar entrar na conta: ' + error.message);
				  botaoentrarconta.textContent = 'Entrar';
				  botaoentrarconta.disabled = false;
				  return;
		  }
			  if (!usuario) {
		  alert('Usuário invalido, senha ou nome está errado');
				  botaoentrarconta.textContent = 'Entrar';
		  botaoentrarconta.disabled = false;
				  return;
			  }
			  const senhacorreta = await bcrypt.compare(senha, usuario.senha);
		  if (!senhacorreta) {
		  alert('Usuário invalido, senha ou nome está errado');
			  botaoentrarconta.textContent = 'Entrar';
		  botaoentrarconta.disabled = false;
			  return;
		  }
			  localStorage.setItem("idUsuario", usuario.id);
			  localStorage.setItem("nomeUsuario", usuario.nome);
			  inputnomedacontaexistente.value = '';
			  inputsenhadacontaexistente.value = '';
			  location.reload();
		  }
		  if (!iddoUsuario) {
			  entrarconta.style.display = 'block';
			  inputsenhadousuario.style.display = 'block';
		  } else {
			  entrarconta.style.display = 'none';
			  inputsenhadousuario.style.display = 'none';
		  }
		  const menu = document.getElementById('menu');
		  entrarconta.onclick = function() {
			  menucominicioecriarcomunidade.classList.remove('aberto');
			  janelaentrarconta.classList.add('aberta');
			  track.style.display = 'none';
			  menu.style.display = 'none';
		  }
		  fecharjanelaentrarconta.onclick = function() {
			  janelaentrarconta.classList.remove('aberta');
			  track.style.display = 'block';
		  }
		  
		  window.addEventListener('scroll', () => {
			  if (window.scrollY > 0) {
				  if (!iddoUsuario) {
					  dica.style.display = 'none';
			  }
				  abrirjanelaimagemperfil.style.display = '';
			  } else {
				  abrirjanelaimagemperfil.style.display = 'none';
				  if (!iddoUsuario) {
				  dica.style.display = '';
				  }
				  imgconta.style.filter = 'blur(0)';
			  }
		  });
		  const abrirjanelaamizades = document.querySelector('.abrirjanelaamizades');
		  const janelaamizades = document.querySelector('.janelaamizades');
		  const fecharjanelaamizades = document.querySelector('.fecharjanelaamizades');
		  const botaoamigos = document.querySelector('.botaoamigos');
		  const janelaamigo = document.querySelector('.janelaamigo');
		  const fecharjanelaamigo = document.querySelector('.fecharjanelaamigo');
		  const abrirmenucombotoes = document.querySelector('.abrirmenucombotoes')
          const olaenomeusuarioeimg = document.getElementById('olaenomeusuarioeimg');
		  const menucriarconta = document.getElementById('menu');
		  abrirmenucombotoes.onclick = function() {
			  const aberto = menucominicioecriarcomunidade.classList.toggle('aberto');
			  if (aberto) {
				  abrirmenucombotoes.style.left = '145px';
				  olaenomeusuarioeimg.style.marginLeft = '165px';
				  abrirjanelaimagemperfil.style.left = '185px';
				  menucriarconta.style.left = '215px';
				  abrirmenucombotoes.classList.add('selecionado');
				  document.querySelector('header').classList.add('menuaberto');
			  } else {
				  abrirmenucombotoes.style.left = '5px';
				  olaenomeusuarioeimg.style.marginLeft = '40px';
				  abrirjanelaimagemperfil.style.left = '60px';
				  menucriarconta.style.left = '90px';
				  abrirmenucombotoes.classList.remove('selecionado');
				  document.querySelector('header').classList.remove('menuaberto');
			  }
		  }
		  function fecharmenuaoabrirjanela() {
			  menucominicioecriarcomunidade.classList.remove('aberto');
			  abrirmenucombotoes.style.left = '5px';
			  olaenomeusuarioeimg.style.marginLeft = '40px';
			  abrirjanelaimagemperfil.style.left = '60px';
			  menucriarconta.style.left = '90px';
			  abrirmenucombotoes.classList.remove('selecionado');
			  document.querySelector('header').classList.remove('menuaberto');
		  }
		  fecharjanelaamigo.onclick = function() {
			  janelaamigo.style.display = 'none';
			  document.body.style.overflow = 'hidden';
		  }
		  const iniciobtn = document.getElementById('iniciobtn');
		  fecharjanelaamizades.onclick = function() {
			  iniciobtn.classList.add('selecionado');
			  abrirjanelaamizades.classList.remove('selecionado');
			  janelaamizades.classList.remove('aberta');
			  document.body.style.overflow = '';
			  track.style.display = 'block';
		  }
		  abrirjanelaamizades.onclick = function() {
			  fecharmenuaoabrirjanela();
			  iniciobtn.classList.remove('selecionado');
			  abrirjanelaamizades.classList.add('selecionado');
			  janelaamizades.classList.add('aberta');
			  document.body.style.overflow = 'hidden';
			  track.style.display = 'none';
		  }
		  if (nomeusuarioconta) {
			  dica.style.display = 'none';
			  trocarnomeecriarconta.textContent = 'Trocar nome';
		  }
		  if (!nomeusuarioconta) {
			  dica.style.display = 'block';
			  trocarnomeecriarconta.textContent = 'Criar conta';
		  }
		  if (trocarnomeecriarconta.textContent === 'Trocar nome') {
			  sairconta.style.display = 'block';
		  } else {
			  sairconta.style.display = 'none';
		  }
		  const nomeconta = document.querySelector('.nomeusuario');
		  window.addEventListener('scroll', () => {
			  if (window.scrollY > 0) {
				  menu.style.display = '';
			  } else {
				  menu.style.display = 'none';
			  }
		  });
		  document.addEventListener('click', (e) => {
			  if (!menu.contains(e.target) && e.target !== nomeconta) {
				  menu.style.display = 'none';
			  }
		  })
		  const botaocolocarfoto = document.querySelector('.botaocolocarfoto');
		  const inputfotoconta = document.querySelector('.inputfotoconta');
		  botaocolocarfoto.addEventListener('click', () => {
			  inputfotoconta.click();
		  })
		  const janelaimagemperfil = document.querySelector('.janelaimagemperfil');
		  if (imgconta.src === "") {
			  imgconta.src = 'bananaperfil.jpeg';
		  }
		  imgconta.onclick = function() {
			  imgconta.style.filter = 'blur(2px)';
			  abrirjanelaimagemperfil.style.display = 'block';
		  }
		  abrirjanelaimagemperfil.onclick = function() {
			  fecharmenuaoabrirjanela();
			  janelaimagemperfil.classList.add('aberta');
			  track.style.display = 'none';
			  abrirjanelaimagemperfil.style.display = 'none';
		  }
		  document.addEventListener('click', (e) => {
			  const clicounoabrirjanelaimagemperfil = abrirjanelaimagemperfil.contains(e.target);
			  const clicouimgconta = imgconta.contains(e.target);
			  if (!clicounoabrirjanelaimagemperfil && !clicouimgconta) {
				  abrirjanelaimagemperfil.style.display = 'none';
				  imgconta.style.filter = 'blur(0)';
			  }
		  })
		  const imgdajanelaimagemperfil = document.querySelector('.imagemdajanelaimagemperfil');
		  janelaimagemperfil.addEventListener('click', (e) => {
			  if (!botaocolocarfoto.contains(e.target) && !imgdajanelaimagemperfil.contains(e.target)) {
				  janelaimagemperfil.classList.remove('aberta');
				  track.style.display = 'block';
			  }
		  });
		  const imgPerfilSalva = localStorage.getItem("URLimagemconta");
		  imgdajanelaimagemperfil.src = imgPerfilSalva;
		  inputfotoconta.addEventListener('change', async () => {
			 const arquivo = inputfotoconta.files[0];
			  if (!arquivo) {
				  return;
			  }
			  const URLImagemconta = URL.createObjectURL(arquivo);
			  imgconta.src = URLImagemconta;
			  try {
			  const URLimagemcontasalva = await enviarparacloudinary(arquivo);
              localStorage.setItem("URLimagemconta", URLimagemcontasalva);
			  } catch (e) {
				  alert('Erro ao salvar: ' + e.message);
			  } finally {
			  URL.revokeObjectURL(URLImagemconta);
			  inputfotoconta.value = "";
			  }
		  })
		  nomeconta.onclick = function() {
			  menu.style.display = 'flex';
			  verificarseousuariojacriouconta();
		  }
		  const janelacriarconta = document.getElementById('janelacriarconta');
		  trocarnomeecriarconta.addEventListener('click', () => {
			  fecharmenuaoabrirjanela();
			  janelacriarconta.classList.add('aberta');
			  document.body.style.overflow = 'hidden';
			  menu.style.display = 'none';
			  track.style.display = 'none';
		  })
		  sairconta.addEventListener('click', () => {
			  localStorage.removeItem('idUsuario');
			  localStorage.removeItem('URLimagemconta');
			  localStorage.removeItem('nomeUsuario');
			  location.reload();
		  })
		  const criarcomunidadebtn = document.getElementById('criarcomunidadebtn');
		  const fecharjanelacomunidadebtn = document.querySelector('.fecharjanelacomunidade');
		  const janelacriarcomunidade = document.getElementById('janelacriarcomunidade');
		  iniciobtn.classList.add('selecionado');
		  criarcomunidadebtn.onclick = function() {
			  iniciobtn.classList.remove('selecionado');
			  janelacriarcomunidade.classList.add('aberta');
			  document.body.style.overflow = 'hidden';
			  fecharmenuaoabrirjanela();
			  menu.style.display = 'none';
			  criarcomunidadebtn.classList.add('selecionado');
			  track.style.display = 'none';
		  }
		  fecharjanelacomunidadebtn.onclick = function() {
			  iniciobtn.classList.add('selecionado');
			  janelacriarcomunidade.classList.remove('aberta');
			  document.body.style.overflow = '';
			  criarcomunidadebtn.classList.remove('selecionado');
			  track.style.display = 'block';
		  }
		  const inputNomedacomunidade = document.getElementById('inputNomedacomunidade');
		  const container = document.getElementById('container-comunidade');
		  const botaocriarcomunidade = document.getElementById('criar');
		  const modelo = document.querySelector('.modelo-comunidade');
          const janeladascomunidades = document.getElementById('janeladascomunidades');
		  const nomedousuario = localStorage.getItem("nomeUsuario");
		  const nomeusuariotext = document.querySelector('.nomeusuario').textContent;
let ocorreuumerro = false;
		  botaocriarcomunidade.addEventListener('click', async () => {
			  const Nomecomunidade = inputNomedacomunidade.value.trim();
			    if (Nomecomunidade === '') {
			  alert('Digite o nome da comunidade');
			  return;
		  };
			  if (nomeusuariotext !== nomedousuario) {
				  alert("Crie uma conta antes de criar uma comunidade");
				  inputNomedacomunidade.value = '';
				  return;
			  }
		const {data, error} = await Clientesupabase 
			.from('comunidades')
			.insert({nome: Nomecomunidade})
			.select()
			.single();
			  if (error) {
				  ocorreuumerro = true;
				  errorwindow.style.display = 'block';
				  const p = errorwindow.querySelector('p');
				  p.textContent = 'Erro ao criar comunidade: ' + error.message;
		  }
			  if (ocorreuumerro) return;
			   criarElementocomunidade({id: data.id, nome: data.nome});
			  inputNomedacomunidade.value = '';
			  janelacriarcomunidade.classList.remove('aberta');
			  document.body.style.overflow = '';
			  iniciobtn.classList.add('selecionado');
			  criarcomunidadebtn.classList.remove('selecionado');
			  track.style.display = 'block';
		  });
		  function criarElementocomunidade(comunidade) {
			  const novomodelo = modelo.cloneNode(true);
			  novomodelo.style.display = 'block';
		      const nomedacomunidade = novomodelo.querySelector('.nome');
			  nomedacomunidade.textContent = comunidade.nome;
			  nomedacomunidade.onclick = () => {
                  abrirComunidade(comunidade);
			  };
			  container.appendChild(novomodelo);
		  }
		  let comunidadeAtualId = null;
		   const chat = document.getElementById('chat');
		  const caixaconversa = document.querySelector('.caixa-conversa');
		  const textoconversa = document.querySelector('.texto-conversa');
		  const containerconversa = document.querySelector('.container-conversa');
		  async function abrirComunidade(comunidade) {
				comunidadeAtualId = comunidade.id;
			  janeladascomunidades.classList.add('aberta');
			  document.body.style.overflow = 'hidden';
			  fecharmenuaoabrirjanela();
			    menu.style.display = 'none';
			    containerconversa.innerHTML = '';
			    const {data: mensagens, error} = await Clientesupabase
			    .from('mensagens')
			    .select('*')
			    .eq('comunidade_id', comunidade.id)
		         .order('criado_em', {ascending: true});
			    if (error) {
					ocorreuumerro = true;
					errorwindow.style.display = 'block';
					const p = errorwindow.querySelector('p')
						p.textContent = 'Erro ao carregar mensagens:' + error.message;
		  }
			  if (ocorreuumerro) return;
			    mensagens.forEach(m => renderizarMensagem(m.nome, m.texto, m.imagem, m.avatar));
			    track.style.display = 'none';
			  document.body.style.overflow = 'hidden';
					}
		  function renderizarMensagem(nome, texto, urlImagem, urlAvatar) {
			  const novacaixa = caixaconversa.cloneNode(true);
			  novacaixa.style.display = 'flex';
			  const imgPerfil = novacaixa.querySelector('.imagemperfilnaconversa');
			  if (imgPerfil) {
				  if (urlAvatar) {
					  imgPerfil.src = urlAvatar;
					  imgPerfil.style.display = 'block';
				  } else {
					  imgPerfil.src = 'bananaperfil.jpeg';
				  }
			  }
			  const novonome = novacaixa.querySelector('.nomedapessoanochat');
			  novonome.textContent = nome + ":";
			  const nomeatual = localStorage.getItem("nomeUsuario");
			  if (nome && nome === nomeatual) {
				  novacaixa.style.backgroundColor = '#5b8def';
				  novacaixa.style.boxShadow = '0 0 10px #5b8def';
				  novacaixa.querySelector('.nomedapessoanochat').style.color = 'blue';
				  novacaixa.style.alignSelf = 'flex-end';
			  } else {
				  novacaixa.style.alignSelf = 'flex-start';
			  }
			  if (urlImagem) {
				  const img = document.createElement('img');
				  img.src = urlImagem;
				  img.style.maxWidth = '150px';
				  img.style.borderRadius = '10px';
			      img.style.cursor = 'pointer';
				  img.style.marginTop = '5px';
				  novacaixa.appendChild(img);
		  };
			  const novotexto = novacaixa.querySelector('.texto-conversa');
			  novotexto.textContent = texto;
			  containerconversa.appendChild(novacaixa);
			  return novacaixa;
		  }
		  let enviandoMensagem = false;
		  const enviarbtn = document.getElementById('enviar');
		  enviarbtn.addEventListener('click', async () => {
		  if (enviandoMensagem) return;
		  if (enviandoimagem) {
		  alert('Espera a imagem está sendo enviada');
		  return;
		  }
			  const texto = chat.value.trim();
			  if (!idUsuario) {
				  alert("Crie uma conta antes de mandar mensagens nessa comunidade");
				  chat.value = '';
				  return;
			  }
		  if (texto === "" && !URLimagempendente) {
		  alert('Escreva algo primeiro');
		  return;
		  }
		  const imagemperfil = localStorage.getItem("URLimagemconta");
		  
		  const imagemperfilnaconversa = document.getElementById('imagemperfilnaconversa');
		  const nomeatual = localStorage.getItem("nomeUsuario") || "Usuario";
		  enviandoMensagem = true;
		  const {error} = await Clientesupabase
		  .from('mensagens')
		  .insert({
			comunidade_id: comunidadeAtualId,
			texto: texto,
			nome: nomeatual,
		    imagem: URLimagempendente,
			avatar: imagemperfil || null
	        });
			enviandoMensagem = false;
		  if (error) {
		  alert('Erro ao enviar: ' + error.message);
		  return;
		  }
		  const containerimagemchat = document.getElementById('container-imagemchat');
		  const novacaixa = renderizarMensagem(nomeatual, texto, URLimagempendente, imagemperfil);
		  containerimagemchat.innerHTML = '';
		  URLimagempendente = null;
		  chat.value = "";
		  })
		  containerconversa.addEventListener('click', (e) => {
			  if (e.target.tagName === 'IMG') {
				  const janelaimagem = document.getElementById('janelaimagem');
				  const imagemdajanela = janelaimagem.querySelector('img');
		          imagemdajanela.src = e.target.src;
		          janelaimagem.classList.add('aberta');
				  document.body.style.overflow = 'hidden';
		  }
		  });
		  const janelaimagem = document.getElementById('janelaimagem');
		  const img = janelaimagem.querySelector('img');
		  janelaimagem.onclick = function() {
		  janelaimagem.classList.remove('aberta');
		  };
		  img.onclick = function(event) {
			  event.stopPropagation();
		  }
		  const fecharjaneladascomunidades = document.querySelector('.fecharjaneladascomunidades');
		  fecharjaneladascomunidades.onclick = function() {
		  janeladascomunidades.classList.remove('aberta');
		  document.body.style.overflow = '';
		  iniciobtn.classList.add('selecionado');
		  track.style.display = 'block';
		  }
		  const nomeusuario = document.querySelector('.nomeusuario');
		  const criarcontatxt = document.querySelector('.criarcontatxt');
		  const criarcontabtn = document.querySelector('.criarcontabtn');
		  const idUsuario = localStorage.getItem("idUsuario");
		  const inputnomedousuario = document.querySelector('.inputnomedousuario');
let erroaconteceu = false;
		  criarcontabtn.addEventListener('click', async () => {
			  const novonome = inputnomedousuario.value.trim();
			  if (novonome === "") {
				  alert('Digite um nome');
				  return;
			  }
			  if (inputnomedousuario.value.trim().length < 6 && inputnomedousuario.value.trim().length > 0) {
		  alert('Digite um nome mais longo com no minimo 6 digitos');
	return;
	}
			  const nomeantigo = localStorage.getItem("nomeUsuario");
			  
			  if (nomeantigo) {
			  const {data: inserirnomenovo, error} = await ClientUsuarios
			  .from('usuarios')
			  .update({nome: novonome})
			  .eq('id', idUsuario)
			  .select()
			  .maybeSingle();
			  if (error) {
				  erroaconteceu = true;
				  janelacriarconta.classList.add('aberta');
				  if (error.code === '23505') {
					  errorwindow.style.display = 'block';
					  const p = errorwindow.querySelector('p');
					  p.textContent = 'Coloque um nome que uma pessoa não está usando';
					  return;
				  } else {
				  errorwindow.style.display = 'block';
				  const p = errorwindow.querySelector('p');
				  p.textContent = 'Erro ao trocar nome:' + error.message;
				  return;
			  }
			  }
			  if (inserirnomenovo) {
				  localStorage.setItem("nomeUsuario", novonome);
			  }
		  } else {
				  const senhadigitada = inputsenhadousuario.value.trim();
				  if (inputsenhadousuario.value.trim() === '') {
		  alert('Coloque uma senha primeiro');
	return;
	}
				  criarcontabtn.textContent = "Criando...";
				  criarcontabtn.disabled = true;
				  const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(senhadigitada, salt);
			  const {data, error} = await ClientUsuarios
			  .from('usuarios', {schema: 'public'})
			  .insert({nome: novonome,
					  senha: hash
				})
			  .select()
			  .maybeSingle();
			  if (error) {
				  erroaconteceu = true;
				  janelacriarconta.classList.add('aberta');
				  if (error.code === '23505') {
					  errorwindow.style.display = 'block';
					  const p = errorwindow.querySelector('p');
					  p.textContent = 'Coloque um nome que ninguém usou';
				  } else {
				  errorwindow.style.display = 'block';
				  const p = errorwindow.querySelector('p');
				  p.textContent = 'Erro ao criar conta: ' + error.message;
				  }
			  }
			  if (data) {
		      localStorage.setItem("idUsuario", data.id);
			  localStorage.setItem("nomeUsuario", novonome);
		  }
			  }
			  if (erroaconteceu) return;
			  janelacriarconta.classList.remove('aberta');
			  inputnomedousuario.value = '';
			  nomeusuario.textContent = novonome;
			  const nomedapessoanochat = document.querySelector('.nomedapessoanochat');
			  nomedapessoanochat.textContent = novonome + ":";
			  criarcontabtn.disabled = false;
			  await carregaramizades();
			  await carregarpessoasseguidas();
			  location.reload();
			  document.body.style.overflow = '';
		  })
		  const botaoprocurarpessoas = document.querySelector('.botaoprocuraramizade');
		  const textareaamizade = document.querySelector('.textareaamizade');
		  const containerpessoas = document.getElementById('container-pessoas');
		  let amigosid = [];
		  botaoprocurarpessoas.addEventListener('click', async () => {
			  textareaamizade.style.top = '10px';
			  const textodotextarea = textareaamizade.value.trim();
			  if (textodotextarea === '') {
				  containerpessoas.innerHTML = '';
				  await carregarpessoasseguidas();
				  return;
			  }
			  if (!idUsuario) {
				  alert('Crie uma conta antes de seguir alguém');
				  return;
			  }
			  containerpessoas.innerHTML = '<p>Pesquisando...</p>';
			  const containerpessoasadicionadas = document.getElementById('pessoasadicionadas');
			  containerpessoasadicionadas.innerHTML = '';
			  const {data, error} = await ClientUsuarios
			  .from('usuarios')
		      .select('id, nome')
	          .ilike('nome', `%${textodotextarea}%`)
			  .limit(20);
			  if (error) {
				  containerpessoas.innerHTML = '';
				  alert('Erro ao pesquisar: ' + error.message);
				  return;
		  }
			  containerpessoas.innerHTML = '';
		  if (!data || data.length === 0) {
		  containerpessoas.innerHTML = '<p>Nenhum usuário encontrado que tenha esse nome</p>';
			  return;
		  }
				  
		  data.forEach(usuario => {
			  const div = document.createElement('div');
			  const p = document.createElement('p');
			  const button = document.createElement('button');
			  if (amigosid.includes(usuario.id)) {
					button.textContent = 'Ver perfil';
					button.style.backgroundColor = '#28a745';
				    button.style.borderRadius = '999px';
				  button.style.border = 'none';
				  button.style.cursor = 'pointer';
				  button.onclick = async function() {
                      abrirjanelaperfilamigo(usuario.id, usuario.nome);
				  }
			  }
		  else {
		  button.textContent = 'Seguir';
		  button.style.borderRadius = '999px';
		  button.style.backgroundColor = '#2E6BFF';
		  button.style.border = '#5b8def';
				  button.onclick = async function() {
				const iddousuario = localStorage.getItem("idUsuario");
				if (!iddousuario) {
					alert('Primeiro crie uma conta');
					return;
				}
			    button.textContent = 'Adicionando...';
				button.disabled = true;
				const {data: inserido, error: errorinsert} = await ClientUsuarios
				  .from('amizades')
				  .insert({ 
					  usuario_id: iddousuario,
					  amigo_id: usuario.id
			  })
					  .select();
				  if (errorinsert) {
		  button.disabled = false;
	button.textContent = 'Seguir';
					  alert('Erro ao seguir esse pessoa: ' + errorinsert.message);
					  return;
		  }
					  amigosid.push(usuario.id);
		  button.textContent = 'Ver perfil';
		  button.style.backgroundColor = '#28a745';
					  button.style.color = '#FFFFFF';
					  button.style.borderRadius = '999px';
	button.style.cursor = 'pointer';
					  button.disabled = false;
					  button.onclick = async function() {
	abrirjanelaperfilamigo(usuario.id, usuario.nome);
		  }
	}
		  }
			  div.appendChild(p);
	          div.appendChild(button);
			  div.style.display = 'flex';
	          div.style.flexDirection = 'row';
			  div.style.gap = '10px';
			  div.style.marginTop = '10px';
	          p.style.color = '#FFFFFF';
			  p.textContent = usuario.nome;
			  const iddousuario = localStorage.getItem("idUsuario");
			  if (String(usuario.id) === String(iddousuario)) {
				  p.style.display = 'none';
				  button.style.display = 'none';
			  }
			    containerpessoas.appendChild(div);
		  });
		  });
		  async function abrirjanelaperfilamigo(idAmigo, nomeamigo) {
			  const fotopessoa = document.querySelector('.fotopessoa');
			  const nomepessoa = document.querySelector('.nomepessoausuarioseguindo');
		  const containercomunidades = document.querySelector('.comunidadespessoa');
			  const janelaamigo = document.querySelector('.janelaamigo');
			  const idUsuario = localStorage.getItem("idUsuario");
if (!idUsuario) return;
		  janelaamigo.style.display = 'flex';
		  document.body.style.overflow = 'hidden';
		  nomepessoa.textContent = nomeamigo;

			  fotopessoa.src = 'bananaperfil.jpeg';
			  fotopessoa.style.width = '64px';
		  fotopessoa.style.height = '64px';
			  fotopessoa.style.borderRadius = '999px';
			  fotopessoa.style.marginTop = '10px';
	fotopessoa.style.border = '2px solid #F7D117';
			  containercomunidades.innerHTML = '<p>Carregando comunidades...</p>'
			  const {data: mensagens, error} = await Clientesupabase
			  .from('mensagens')
		  .select('comunidade_id')
			  .eq('nome', nomeamigo);

		  containercomunidades.innerHTML = '';
			  if (error || !mensagens || mensagens.length === 0) {
				  containercomunidades.innerHTML = '<p>Esse usuário não mandou mensagem em nenhuma das comunidades.</p>';
		  return;
	}
			  const idsdascomunidadesqueousuariocomentou = [... new Set(mensagens.map(m => m.comunidade_id))];
			  const {data: comunidades, error: errorcomunidades} = await Clientesupabase
			  .from('comunidades')
			  .select('nome')
			  .in('id', idsdascomunidadesqueousuariocomentou);

			  if (errorcomunidades || !comunidades) {
		  containercomunidades.innerHTML = '<p>Erro ao carregar comunidades</p>';
				  return;
	}
			  comunidades.forEach(comunidade => {
		  const p = document.createElement('p');
		  p.textContent = comunidade.nome;
				  p.style.color = '#FFFFFF';
	      p.style.marginTop = '10px';
	containercomunidades.appendChild(p);
		  });
		  }
		  function verificarseousuariojacriouconta() {
			  const nomesalvo = localStorage.getItem("nomeUsuario");
		  if (nomesalvo) {
			  criarcontatxt.textContent = "Trocar nome";
			  criarcontabtn.textContent = "Trocar";
		  } else {
		  criarcontatxt.textContent = "Criar conta";
		  criarcontabtn.textContent = "Criar";
		  }
		  }
		  const chattextarea = document.getElementById('chat');
		  chattextarea.addEventListener("input", () => {
		  chattextarea.style.height = 'auto';
		  chattextarea.style.height = Math.min(chattextarea.scrollHeight, 150) + "px";
		  });
		  const anexarbtn = document.getElementById('anexar');
		  const inputfoto = document.getElementById('input-foto');
		  anexarbtn.addEventListener('click', () => {
			  inputfoto.click();
		  });
		  inputfoto.addEventListener('change', async () => {
			  const arquivo = inputfoto.files[0];
			  if (!arquivo) {
				  return;
		  }
			  const urlTemporaria = URL.createObjectURL(arquivo);
			  const image = document.createElement('img');
			  image.src = urlTemporaria;
			  image.style.maxWidth = '100px';
		      image.style.maxHeight = '100px';
		      image.style.borderRadius = '10px';
			  const containerimagemchat = document.getElementById('container-imagemchat');
		      containerimagemchat.appendChild(image);
			  enviandoimagem = true;
			  URLimagempendente = await enviarparacloudinary(arquivo);
			  enviandoimagem = false;
			  URL.revokeObjectURL(urlTemporaria);
			  inputfoto.value = '';
		  });
		  async function enviarparacloudinary(arquivo) {
		  const formData = new FormData();
			 formData.append('file', arquivo);
		     formData.append('upload_preset', 'banana-forum_unsigned');
			  const resposta = await fetch('https://api.cloudinary.com/v1_1/esdfqqro/image/upload',
		  {
			  method: 'POST',
			  body: formData
		  }
		  );
		  const dados = await resposta.json();
		  return dados.secure_url;
		  }
		  async function carregaramizades() {
			  const idUsuario = localStorage.getItem("idUsuario");
			  if (!idUsuario) return;
			  const {data, error} = await ClientUsuarios
			  .from('amizades')
			  .select('amigo_id')
			  .eq('usuario_id', idUsuario);
			  if (!error && data) {
				  amigosid = data.map(amizade => amizade.amigo_id);
			  }
		  }
		  async function carregarpessoasseguidas() {
			  const container = document.getElementById('pessoasadicionadas');
			  const idUsuario = localStorage.getItem("idUsuario");
	container.innerHTML = '';
			  if (!idUsuario) {
				  container.innerHTML = '<p>Crie uma conta primeiro</p>';
				return;
			  }
			  const {data: amizades} = await ClientUsuarios.from('amizades').select('amigo_id').eq('usuario_id', idUsuario);
			  if (!amizades || amizades.length === 0) {
	container.innerHTML = '<p>Você não está seguindo nenhuma pessoa neste momento</p>';
				  return;
			  }
			  const {data: usuarios} = await ClientUsuarios.from('usuarios').select('id, nome').in('id', amizades.map(a => a.amigo_id));
			  usuarios.forEach(u => {
				  const p1 = document.createElement('p');
				 const p2 = document.createElement('p');
				  p1.textContent = 'Pessoas que você segue:'
				  p1.style.color = '#FFFFFF';
				  p2.style.color = '#FFFFFF';
				  p2.textContent = u.nome;
	p2.style.display = 'flex';
				  p2.onclick = () => abrirjanelaperfilamigo(u.id, u.nome);
		  container.appendChild(p1);
				  container.appendChild(p2);
		  });
		  }
			  window.onload = async function() {
			  const nomesalvo = localStorage.getItem("nomeUsuario");
			  const nomedacomunidadesalvo = localStorage.getItem("comunidade");
			  const nomedacomunidade = document.querySelector('.nome');
			  const fotosalva = localStorage.getItem("URLimagemconta");
		      const imagemperfilnaconversa = document.querySelector('.imagemperfilnaconversa');
			  if (!fotosalva && imgconta.src === "") {
				  imgconta.src = 'bananaperfil.jpeg';
			  }
			  if (fotosalva) {
			  imgdajanelaimagemperfil.src = fotosalva;
			  imgconta.src = fotosalva;
			  } else {
		       imgconta.src = 'bananaperfil.jpeg';
				  imgdajanelaimagemperfil.src = 'bananaperfil.jpeg';
			  }
				  const nomeSalvo = localStorage.getItem("nomeUsuario");
				  const idSalvo = localStorage.getItem("idUsuario");
				  if (nomeSalvo && !idSalvo) {
					  const {data, error} = await ClientUsuarios
					  .from('usuarios')
					  .select('id')
					  .eq('nome', nomeSalvo)
					  .single();
				  if (!error && data) {
					  localStorage.setItem("idUsuario", data.id);
				  }
				  }
				  await carregaramizades();
				  await carregarpessoasseguidas();
			  if (nomesalvo) {
				  nomeusuario.textContent = nomesalvo;
			  }
			  if (nomedacomunidadesalvo) {
				  nomedacomunidade.textContent = nomedacomunidadesalvo;
			  }
			  verificarseousuariojacriouconta();
			  const {data: comunidades, error} = await Clientesupabase
			  .from('comunidades')
			  .select('*')
			  .order('criado_em', {ascending: false});
			  if (error) {
		      console.error('Erro ao carregar comunidades', error);
		      return;
		  }
				  comunidades.forEach(criarElementocomunidade);
		  };
		  const fecharjanelacriarconta = document.querySelector('.fecharjanelacriarconta');
		  fecharjanelacriarconta.onclick = function() {
			  janelacriarconta.classList.remove('aberta');
			  document.body.style.overflow = '';
			  track.style.display = 'block';
		  }
