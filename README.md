<div align="center">

<img src="assets/banner.svg" alt="BãoDaFeira — Compre direto do produtor" width="100%"/>

<br/>

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/)

<br/>

> **BãoDaFeira** é um marketplace web que conecta agricultores familiares e produtores rurais diretamente aos consumidores urbanos — sem atravessadores, com alimentos mais frescos e preço justo para quem produz e para quem compra.

<br/>

---

</div>

## Visão Geral

```
┌─────────────────────────────────────────────────────────────┐
│                        BãoDaFeira                           │
│                                                             │
│   Produtor  ──────────────────────────►  Consumidor        │
│   cadastra       plataforma web            compra          │
│   produtos       (sem backend)             direto          │
│                                                             │
│   ✔ Sem intermediários   ✔ Preço justo   ✔ Mais frescor    │
└─────────────────────────────────────────────────────────────┘
```

A plataforma é uma **SPA (Single Page Application)** construída inteiramente com HTML, CSS e JavaScript puro — zero dependências, zero frameworks, zero build step. Abre direto no navegador.

---

## Números da Plataforma

<div align="center">

| 🌱 Produtores | 🛒 Produtos | 😊 Clientes |
|:---:|:---:|:---:|
| **200+** | **1.200+** | **4.800+** |
| Cadastrados | Frescos disponíveis | Satisfeitos |

</div>

---

## Funcionalidades

<img src="transferir.png" align="right" width="260" alt="Entregador BãoDaFeira"/>

### Para o Consumidor
- **🏠 Landing Page** — hero section com estatísticas, como funciona e benefícios da plataforma
- **🛍️ Catálogo de Produtos** — grid com filtros por categoria, faixa de preço e localização
- **🔍 Busca em tempo real** — pesquisa por nome, produtor ou categoria
- **📦 Página de Produto** — detalhes completos, card do produtor, avaliações e produtos relacionados
- **🛒 Carrinho Lateral (Drawer)** — adicionar, remover e ajustar quantidades com animações
- **💳 Checkout** — formulário de entrega com máscara de campos (CPF, telefone, CEP) e 3 formas de pagamento:
  - PIX
  - Combinar pelo WhatsApp
  - Dinheiro na Entrega
- **✅ Confirmação de Pedido** — tela de sucesso com código do pedido e botão WhatsApp

### Para o Produtor
- **📝 Cadastro** — formulário completo com validação inline, indicador de força de senha e máscaras
- **📊 Dashboard** — painel com métricas (produtos, pedidos, vendas, avaliação)
- **📋 Gestão de Produtos** — tabela com ações de editar e remover
- **➕ Adicionar Produto** — upload de imagem, categorias, preço, unidade, estoque e tags
- **📬 Pedidos Recebidos** — listagem de pedidos pendentes
- **👤 Perfil** — edição dos dados cadastrais

### UX & Acessibilidade
- 📱 **Totalmente responsivo** — mobile, tablet e desktop
- ♿ **Acessibilidade** — skip-link, `aria-label`, `aria-live`, `focus-visible`
- 🍞 **Toast Notifications** — feedback visual para todas as ações
- 📲 **Menu mobile** com overlay e bloqueio de scroll
- 💬 **Botão WhatsApp flutuante** com tooltip e animação de pulso

---

## Telas da Aplicação

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│              │  │              │  │              │  │              │
│  Landing     │  │  Catálogo    │  │  Detalhe     │  │  Cadastro    │
│  Page        │  │  de          │  │  do          │  │  Produtor    │
│              │  │  Produtos    │  │  Produto     │  │              │
│  Hero ✓      │  │  Filtros ✓   │  │  Fotos ✓     │  │  Validação ✓ │
│  Steps ✓     │  │  Busca ✓     │  │  Produtor ✓  │  │  Máscara ✓  │
│  Benefits ✓  │  │  Ordenação✓  │  │  Carrinho✓   │  │  Senha ✓    │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘

┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│              │  │              │  │              │  │              │
│  Dashboard   │  │  Adicionar   │  │  Checkout    │  │  Pedido      │
│  Produtor    │  │  Produto     │  │              │  │  Confirmado  │
│              │  │              │  │              │  │              │
│  Métricas ✓  │  │  Upload ✓    │  │  Entrega ✓   │  │  Código ✓   │
│  Tabela ✓    │  │  Campos ✓    │  │  Pgamento ✓  │  │  WhatsApp ✓ │
│  Pedidos ✓   │  │  Status ✓    │  │  Resumo ✓    │  │  Voltar ✓   │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

---

## Estrutura do Projeto

```
baoDaFeira/
│
├── 📄 feira-digital.html      # Aplicação completa (todas as 8 telas)
├── 🎨 style.css               # Estilos globais, componentes e responsividade
│
└── 📁 js/
    ├── data.js                # Dados estáticos — produtos e pedidos de exemplo
    ├── utils.js               # Helpers — máscaras, toast, navegação entre telas
    ├── products.js            # Renderização do catálogo, filtros e busca
    └── cart.js                # Lógica do carrinho, checkout e confirmação
```

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| **HTML5 Semântico** | Estrutura das 8 telas, acessibilidade com `aria-*` |
| **CSS3 Moderno** | Grid, Flexbox, Custom Properties, animações e `@keyframes` |
| **JavaScript Vanilla** | SPA navigation, carrinho, filtros, máscaras e validação |
| **Google Fonts — Poppins** | Tipografia em todo o projeto |
| **SVG Inline** | Todos os ícones — sem dependências externas |
| **WhatsApp API** | Contato direto com produtor via `wa.me` |

---

## Paleta de Cores

```css
--green-dark:  #2E7D32   /* Verde principal — CTAs e destaques   */
--green-mid:   #388E3C   /* Verde intermediário — hover           */
--green-light: #66BB6A   /* Verde claro — acento e bordas        */
--green-pale:  #C8E6C9   /* Verde pastel — backgrounds e badges  */
--brown-light: #EFEBE9   /* Bege suave — seções alternadas       */
--whatsapp:    #25D366   /* Verde WhatsApp                        */
```

---

## Como Usar

**Nenhuma instalação necessária.** Basta abrir o arquivo no navegador:

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/baoDaFeira.git

# Abra direto no navegador
start feira-digital.html       # Windows
open feira-digital.html        # macOS
xdg-open feira-digital.html    # Linux
```

> Os arquivos JS em `js/` são carregados via `<script src="">` no final do HTML — mantenha a estrutura de pastas intacta.

---

## Fluxo de Navegação

```
Landing Page
    │
    ├──► Catálogo de Produtos
    │         │
    │         ├──► Detalhe do Produto ──► Carrinho ──► Checkout ──► Pedido Confirmado
    │         │
    │         └──► (filtros, busca, ordenação)
    │
    ├──► Cadastro de Produtor
    │
    └──► Dashboard do Produtor
              │
              ├──► Adicionar Produto
              ├──► Pedidos Recebidos
              └──► Meu Perfil
```

---

## Diferenciais Técnicos

- **Sem build step** — HTML/CSS/JS puro, roda em qualquer servidor estático ou localmente
- **Zero dependências** — nenhuma biblioteca externa além da fonte Google Fonts
- **Máscaras de input** — CPF `000.000.000-00`, telefone `(00) 0 0000-0000`, CEP `00000-000`
- **Validação inline** — feedback em tempo real nos campos do formulário de cadastro
- **Indicador de força de senha** — 4 níveis: Fraca, Razoável, Forte, Excelente
- **Carrinho persistente na sessão** — estado do carrinho mantido entre telas sem localStorage
- **Animações suaves** — fadeIn por tela, cartShake no ícone do carrinho, badgePop na badge, successBounce na confirmação
- **Responsividade completa** — breakpoints em 1024px, 900px, 768px e 500px

---

## Formas de Pagamento Suportadas

| Método | Descrição |
|---|---|
| 💜 **PIX** | Pagamento imediato |
| 💬 **WhatsApp** | Combinar direto com o produtor |
| 💵 **Dinheiro** | Pagar na retirada ou entrega |

---

<div align="center">

---

Feito com ♥ para a **agricultura familiar brasileira**

*Conectando o campo à sua mesa — direto, fresco e justo.*

</div>
