# Anime Glass UI — GitHub Pages

Interface estática inspirada no design enviado, pronta para publicar no GitHub Pages.

## Importante

GitHub Pages hospeda arquivos estáticos e **não executa PHP**. Por isso esta versão não usa:
- PHP
- `api/upload.php`
- banco de dados
- servidor de upload

A troca de imagens funciona 100% no navegador usando `localStorage`. As imagens escolhidas ficam salvas no dispositivo/navegador do visitante.

## Publicar

1. Crie um repositório no GitHub.
2. Envie o conteúdo desta pasta para o repositório.
3. Vá em `Settings` → `Pages`.
4. Em `Build and deployment`, escolha `Deploy from a branch`.
5. Selecione `main` e `/ (root)`.
6. Salve e aguarde o GitHub Pages publicar.

A página inicial é `index.html`.

## Personalização

No botão da lateral você pode trocar:
- background
- imagem principal
- 3 imagens da galeria
- avatar

Também há:
- relógio em tempo real
- calendário
- modo claro/escuro
- parallax
- player HTML5
- animações
- responsividade
- preferências locais

### Limitação das imagens

Como não existe backend no GitHub Pages, uma imagem enviada pelo usuário **não é salva no repositório**. Ela é convertida para Data URL e guardada no `localStorage` daquele navegador.

Se quiser que a imagem fique pública para todos os visitantes, ela precisa ser colocada no repositório (por exemplo em `assets/images/`) ou usar um serviço externo/backend.

## Música

Para uma música pública no site, coloque um arquivo em `assets/music/` e configure o `src` do `<audio>` no `index.html`, ou adapte o player para uma URL pública.
