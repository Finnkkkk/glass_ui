<div align="center">
  
  # 🌸✨ Anime Glass UI

  Uma interface de utilizador moderna, responsiva e elegante, inspirada na estética de Anime e desenvolvida com o efeito *Glassmorphism*.

  [![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](#)
  [![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)](#)
  [![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](#)
  [![GitHub Pages](https://img.shields.io/badge/github%20pages-121013?style=for-the-badge&logo=github&logoColor=white)](#)

</div>

---

## 📖 Visão Geral

O **Anime Glass UI** é um projeto *frontend* focado em explorar tendências modernas de design. Utilizando a técnica de *Glassmorphism* (vidro fosco), a interface sobrepõe elementos translúcidos a fundos coloridos em formato SVG, criando uma sensação de profundidade e leveza, perfeitamente combinada com ilustrações temáticas de anime.

🔗 **Link do Projeto em Execução:** [https://finnkkkk.github.io/glass_ui/]

## ✨ Funcionalidades

*   **Design Glassmorphism:** Cartões, menus e modais com desfoque de fundo (`backdrop-filter`) e bordas subtis.
*   **Tema Anime:** Imagens de fundo (`background`) e avatares (`hero`, `profile1`, etc.) desenhados em vetor para máxima nitidez. (Opcional)
*   **100% Responsivo:** A interface ajusta-se automaticamente a qualquer dispositivo (Mobile, Tablet e Desktop).
*   **Interações Dinâmicas:** Animações fluidas e controlo de interface geridos através de Vanilla JavaScript.
*   **Performance:** Uso de recursos SVG leves para garantir carregamentos rápidos.

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição do Uso no Projeto |
| :--- | :--- |
| **HTML5** | Estruturação semântica de todo o conteúdo da página (`index.html`). |
| **CSS3** | Estilização, variáveis globais de cores, *media queries* e efeitos de vidro (`style.css`). |
| **JavaScript** | Lógica de interação no lado do cliente (`app.js`). |
| **SVGs** | Imagens e gráficos vetoriais de alta resolução que compõem o *design*. |

## 📁 Estrutura do Projeto

Para facilitar a navegação pelo código, o projeto está organizado da seguinte maneira:

```text
📦 anime_glass_ui_github_pages
 ┣ 📂 assets
 ┃ ┣ 📂 css
 ┃ ┃ ┗ 📜 style.css        # Folha de estilos principal
 ┃ ┣ 📂 images
 ┃ ┃ ┣ 🖼️ avatar.jpg         # Avatar principal do utilizador
 ┃ ┃ ┣ 🖼️ background.jpg     # Fundo abstrato da página
 ┃ ┃ ┣ 🖼️ hero.png         # Ilustração de destaque
 ┃ ┃ ┗ 🖼️ profile1, 2, 3.jpg # Avatares secundários
 ┃ ┗ 📂 js
 ┃   ┗ 📜 app.js           # Lógica de interatividade
 ┣ 📜 index.html           # Documento principal
 ┗ 📜 README.md            # Documentação do projeto
```

## 🚀 Como Executar na Sua Máquina

Para testar ou alterar este projeto localmente, siga os seguintes passos:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SEU-USUARIO/anime_glass_ui_github_pages.git
   ```
2. **Aceda à pasta:**
   ```bash
   cd anime_glass_ui_github_pages
   ```
3. **Execute o projeto:**
   Basta abrir o ficheiro `index.html` no seu navegador de preferência. 
   *(Recomendação: Se utilizar o VS Code, instale a extensão **Live Server** para atualizar a página automaticamente ao guardar o código).*

## 📌 Observações Importantes

*   **Compatibilidade de Navegadores:** O efeito principal deste projeto (`backdrop-filter` no CSS) é suportado pela maioria dos navegadores modernos (Chrome, Edge, Safari, Firefox). No entanto, em versões muito antigas, o fundo poderá aparecer como uma cor sólida semi-transparente.
*   **Edição das Cores:** Pode alterar facilmente o esquema de cores da aplicação acedendo ao ficheiro `style.css` e modificando as variáveis `:root` no topo do ficheiro.
*   **Substituição de Imagens:** Se desejar colocar as suas próprias imagens, substitua os ficheiros dentro da pasta `assets/images/` mantendo preferencialmente o formato `.svg` para não perder qualidade.

## 🤝 Como Contribuir

Sinta-se à vontade para contribuir com melhorias para o projeto!

1. Faça um *Fork* do projeto
2. Crie uma *Branch* para a sua funcionalidade (`git checkout -b feature/MinhaNovaFeature`)
3. Adicione as suas alterações (`git commit -m 'Adiciona uma nova funcionalidade'`)
4. Faça o *Push* para a *Branch* (`git push origin feature/MinhaNovaFeature`)
5. Abra um *Pull Request*

---
<div align="center">
  Desenvolvido com 💜 por <strong>[Finn]</strong> <br>
  <a href="https://github.com/Finnkkkk">GitHub</a> • <a href="https://linkedin.com/in/SEU-LINKEDIN">LinkedIn</a>
</div>