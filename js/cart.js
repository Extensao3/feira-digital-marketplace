/* ==========================================================
   cart.js — Carrinho, Checkout, Dashboard e Formulários
   BãoDaFeira
========================================================== */

/* ----------------------------------------------------------
   ESTADO DO CARRINHO
---------------------------------------------------------- */
let cart = []; // [{ product, qty }]

/* ----------------------------------------------------------
   ABRIR / FECHAR DRAWER
---------------------------------------------------------- */
function openCart() {
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCartDrawer();
}

function closeCart() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ----------------------------------------------------------
   ADICIONAR AO CARRINHO
---------------------------------------------------------- */
function addToCart(productId, qty) {
  qty = qty || 1;
  const p = allProducts.find(x => x.id === productId);
  if (!p) return;

  const existing = cart.find(x => x.product.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ product: p, qty });
  }

  updateCartBadge();
  renderCartDrawer();

  // Animação de balanço no ícone da navbar
  const btn = document.getElementById('cart-nav-btn');
  if (btn) {
    btn.classList.remove('cart-added');
    void btn.offsetWidth; // força reflow para reiniciar animação
    btn.classList.add('cart-added');
    setTimeout(() => btn.classList.remove('cart-added'), 600);
  }

  showToast(`"${p.name}" adicionado ao carrinho!`, 'success');
  openCart();
}

/* ----------------------------------------------------------
   REMOVER ITEM
---------------------------------------------------------- */
function removeFromCart(productId) {
  cart = cart.filter(x => x.product.id !== productId);
  updateCartBadge();
  renderCartDrawer();
}

/* ----------------------------------------------------------
   ALTERAR QUANTIDADE
---------------------------------------------------------- */
function changeQty(productId, delta) {
  const item = cart.find(x => x.product.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  updateCartBadge();
  renderCartDrawer();
}

/* ----------------------------------------------------------
   BADGE DE CONTAGEM
---------------------------------------------------------- */
function updateCartBadge() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  const badge = document.getElementById('cart-badge');
  if (!badge) return;

  if (total > 0) {
    badge.textContent  = total > 99 ? '99+' : total;
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

/* ----------------------------------------------------------
   TOTAL DO CARRINHO
---------------------------------------------------------- */
function cartTotal() {
  return cart.reduce((s, i) => s + i.product.price * i.qty, 0);
}

/* ----------------------------------------------------------
   RENDERIZAR DRAWER
---------------------------------------------------------- */
function renderCartDrawer() {
  const listEl   = document.getElementById('cart-items-list');
  const footerEl = document.getElementById('cart-footer');
  const countEl  = document.getElementById('cart-items-count');
  const subEl    = document.getElementById('cart-subtotal');
  const totEl    = document.getElementById('cart-total');

  if (!listEl) return;

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  if (countEl) countEl.textContent = totalQty + (totalQty === 1 ? ' item' : ' itens');

  if (cart.length === 0) {
    listEl.innerHTML = `
      <div class="cart-empty" id="cart-empty">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" stroke-width="1.2">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <p>Seu carrinho está vazio</p>
        <span>Adicione produtos para continuar</span>
        <button class="btn btn-outline" style="margin-top:12px;"
          onclick="closeCart(); showScreen('products')">Ver Produtos</button>
      </div>`;
    if (footerEl) footerEl.style.display = 'none';
    return;
  }

  if (footerEl) footerEl.style.display = 'flex';

  listEl.innerHTML = cart.map(({ product: p, qty }) => `
    <div class="cart-item" id="cart-item-${p.id}">
      <img class="cart-item-img" src="${p.img}" alt="${p.name}"
        onerror="this.src='https://picsum.photos/seed/${p.id}/64/64'" />
      <div class="cart-item-info">
        <div class="cart-item-name">${p.name}</div>
        <div class="cart-item-producer">${p.producer} · ${p.city}</div>
        <div class="cart-item-price">
          ${fmtMoney(p.price * qty)}
          <span class="cart-item-unit">(${fmtMoney(p.price)}/${p.unit})</span>
        </div>
      </div>
      <div class="cart-item-controls">
        <div class="qty-control">
          <button class="qty-btn" onclick="changeQty(${p.id}, -1)" aria-label="Diminuir">−</button>
          <span class="qty-value">${qty}</span>
          <button class="qty-btn" onclick="changeQty(${p.id}, +1)" aria-label="Aumentar">+</button>
        </div>
        <button class="cart-remove-btn" onclick="removeFromCart(${p.id})" aria-label="Remover ${p.name}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
          </svg>
        </button>
      </div>
    </div>
  `).join('');

  const total = cartTotal();
  if (subEl) subEl.textContent = fmtMoney(total);
  if (totEl) totEl.textContent = fmtMoney(total);
}

/* ----------------------------------------------------------
   IR PARA CHECKOUT
---------------------------------------------------------- */
function goToCheckout() {
  if (cart.length === 0) return;
  closeCart();
  renderCheckout();
  showScreen('checkout');
}

/* ----------------------------------------------------------
   RENDERIZAR RESUMO DO CHECKOUT
---------------------------------------------------------- */
function renderCheckout() {
  const itemsEl = document.getElementById('checkout-order-items');
  const subEl   = document.getElementById('checkout-subtotal');
  const totalEl = document.getElementById('checkout-total-final');
  if (!itemsEl) return;

  itemsEl.innerHTML = cart.map(({ product: p, qty }) => `
    <div class="checkout-order-item">
      <img class="checkout-order-img" src="${p.img}" alt="${p.name}"
        onerror="this.src='https://picsum.photos/seed/${p.id}/52/52'" />
      <div class="checkout-order-info">
        <div class="checkout-order-name">${p.name}</div>
        <div class="checkout-order-meta">${qty} × ${fmtMoney(p.price)}/${p.unit} · ${p.producer}</div>
      </div>
      <div class="checkout-order-price">${fmtMoney(p.price * qty)}</div>
    </div>
  `).join('');

  const total = cartTotal();
  if (subEl)   subEl.textContent  = fmtMoney(total);
  if (totalEl) totalEl.textContent = fmtMoney(total);
}

/* ----------------------------------------------------------
   CONFIRMAR PEDIDO
---------------------------------------------------------- */
function confirmOrder() {
  const nome = document.getElementById('co-nome');
  const tel  = document.getElementById('co-tel');

  if (!nome?.value.trim()) {
    nome?.classList.add('error');
    showToast('Informe seu nome para continuar.', '');
    nome?.focus();
    return;
  }
  if (!tel || tel.value.replace(/\D/g, '').length < 10) {
    tel?.classList.add('error');
    showToast('Informe um WhatsApp válido.', '');
    tel?.focus();
    return;
  }

  const btn = document.querySelector('#screen-checkout .btn-primary');
  if (btn) { btn.disabled = true; btn.textContent = 'Confirmando...'; }

  setTimeout(() => {
    const code = '#' + String(Math.floor(1000 + Math.random() * 9000));
    const codeEl = document.getElementById('order-code');
    if (codeEl) codeEl.textContent = code;

    cart = [];
    updateCartBadge();
    showScreen('order-success');
  }, 900);
}

/* ----------------------------------------------------------
   WHATSAPP APÓS CONFIRMAÇÃO
---------------------------------------------------------- */
function confirmOrderWhatsapp() {
  const nome  = document.getElementById('co-nome')?.value || '';
  const items = cart.length
    ? cart.map(i => `${i.qty}x ${i.product.name}`).join(', ')
    : 'Produto';
  const msg = encodeURIComponent(
    `Olá! Acabei de fazer um pedido na BãoDaFeira.\n\nPedido: ${items}\n\nNome: ${nome}\n\nPode confirmar? 🌿`
  );
  window.open(`https://wa.me/5534998187184?text=${msg}`, '_blank', 'noopener,noreferrer');
}

/* ----------------------------------------------------------
   DASHBOARD — TABELA DE PRODUTOS
---------------------------------------------------------- */
function renderDashboardTable() {
  const tbody = document.getElementById('dash-table-body');
  if (!tbody) return;

  tbody.innerHTML = dashProducts.map(p => `
    <tr>
      <td>
        <div class="table-product-cell">
          <img class="table-product-img" src="${p.img}" alt="${p.name}" />
          <span style="font-weight:500;">${p.name}</span>
        </div>
      </td>
      <td>${p.category}</td>
      <td style="font-weight:600;color:var(--green-dark);">R$ ${p.price.toFixed(2).replace('.', ',')}</td>
      <td>${p.qty} ${p.unit}</td>
      <td>
        <span class="badge ${p.status === 'Ativo' ? 'badge-green' : 'badge-gray'}">${p.status}</span>
      </td>
      <td>
        <div class="table-actions">
          <button class="btn btn-outline btn-sm"
            onclick="showToast('Modo de edição em breve!','')">Editar</button>
          <button class="btn btn-danger btn-sm"
            onclick="showToast('Produto excluído.','success')">Excluir</button>
        </div>
      </td>
    </tr>
  `).join('');
}

/* ----------------------------------------------------------
   DASHBOARD — TROCA DE SEÇÃO
---------------------------------------------------------- */
function setDashSection(section) {
  ['products', 'orders', 'profile'].forEach(s => {
    const el = document.getElementById('dash-' + s + '-section');
    if (el) el.style.display = s === section ? 'block' : 'none';
  });

  document.querySelectorAll('.dash-nav-item').forEach(item => item.classList.remove('active'));
  event.currentTarget.classList.add('active');

  const titles = { products: 'Meus Produtos', orders: 'Pedidos Recebidos', profile: 'Meu Perfil' };
  const titleEl = document.getElementById('dash-section-title');
  if (titleEl) titleEl.textContent = titles[section] || '';

  if (section === 'orders') renderOrders();
}

/* ----------------------------------------------------------
   DASHBOARD — PEDIDOS
---------------------------------------------------------- */
function renderOrders() {
  const list = document.getElementById('orders-list');
  if (!list) return;

  list.innerHTML = sampleOrders.map(o => `
    <div style="background:var(--white);border-radius:var(--radius-md);border:1px solid var(--gray-200);
                padding:18px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
      <div style="font-weight:700;color:var(--gray-600);font-size:.85rem;min-width:52px;">${o.id}</div>
      <div style="flex:1;min-width:160px;">
        <div style="font-weight:600;font-size:.9rem;">${o.client}</div>
        <div style="font-size:.8rem;color:var(--text-muted);">${o.product} • ${o.qty}</div>
      </div>
      <div style="font-weight:700;color:var(--green-dark);">${o.value}</div>
      <div style="font-size:.8rem;color:var(--gray-600);">${o.date}</div>
      <span class="badge ${o.status === 'Pendente' ? 'badge-orange' : 'badge-green'}">${o.status}</span>
      <div style="display:flex;gap:6px;">
        ${o.status === 'Pendente'
          ? `<button class="btn btn-primary btn-sm"
               onclick="showToast('Pedido confirmado!','success')">Confirmar</button>`
          : ''}
        <button class="btn btn-ghost btn-sm">Detalhes</button>
      </div>
    </div>
  `).join('');
}

/* ----------------------------------------------------------
   FORMULÁRIOS — CADASTRO DE PRODUTOR
---------------------------------------------------------- */
function handleRegister(e) {
  e.preventDefault();

  const nome   = document.getElementById('reg-nome');
  const email  = document.getElementById('reg-email');
  const tel    = document.getElementById('reg-tel');
  const senha  = document.getElementById('reg-senha');
  const senha2 = document.getElementById('reg-senha2');
  let ok = true;

  const markError = (el, errId, msg) => {
    if (!el) return;
    el.classList.add('error');
    const errEl = document.getElementById(errId);
    if (errEl) errEl.innerHTML = '⚠ ' + msg;
    ok = false;
  };

  if (!nome?.value.trim() || nome.value.trim().length < 3)
    markError(nome, 'err-nome', 'Digite seu nome completo');

  if (!email?.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
    markError(email, 'err-email', 'E-mail inválido');

  if (!tel?.value || tel.value.replace(/\D/g, '').length < 10)
    markError(tel, 'err-tel', 'Telefone inválido');

  if (!senha?.value || senha.value.length < 8)
    markError(senha, 'err-senha', 'Mínimo de 8 caracteres');

  if (!senha2?.value || senha2.value !== senha?.value)
    markError(senha2, 'err-senha2', 'As senhas não conferem');

  if (!ok) {
    showToast('Corrija os campos em vermelho antes de continuar.', '');
    document.querySelector('.form-input.error')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const btn = e.target.querySelector('[type=submit]');
  if (btn) { btn.disabled = true; btn.textContent = 'Criando conta...'; }

  showToast('Conta criada com sucesso! Bem-vindo(a)! 🌿', 'success');
  setTimeout(() => {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        Criar Conta Gratuitamente`;
    }
    showScreen('dashboard');
  }, 1400);
}

/* ----------------------------------------------------------
   FORMULÁRIOS — ADICIONAR PRODUTO
---------------------------------------------------------- */
function handleAddProduct(e) {
  e.preventDefault();
  showToast('Produto publicado com sucesso!', 'success');
  setTimeout(() => showScreen('dashboard'), 1200);
}

/* ----------------------------------------------------------
   UPLOAD DE FOTO DO PRODUTO
---------------------------------------------------------- */
function handleFileSelect(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const preview = document.getElementById('upload-preview');
    const img     = document.getElementById('upload-preview-img');
    const name    = document.getElementById('upload-preview-name');
    img.src            = e.target.result;
    name.textContent   = file.name;
    preview.style.display      = 'flex';
    preview.style.alignItems   = 'center';
  };
  reader.readAsDataURL(file);
}

/* ----------------------------------------------------------
   INICIALIZAÇÃO
---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedProducts();
  renderProductsGrid();
  renderDashboardTable();
});
