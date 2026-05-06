/* ==========================================================
   products.js — Renderização de produtos do BãoDaFeira
   Cards do catálogo, filtros, busca e tela de detalhe
========================================================== */

/* ----------------------------------------------------------
   CARD HTML (reutilizado em vários grids)
---------------------------------------------------------- */
function productCardHTML(p) {
  return `
    <div class="product-card" onclick="openProduct(${p.id})">
      <img src="${p.img}" alt="${p.name}" loading="lazy"
        onerror="this.onerror=null;this.src='https://picsum.photos/seed/${p.id}/400/300'" />
      <div class="product-card-body">
        <div class="product-card-category">${p.category}</div>
        <div class="product-card-name">${p.name}</div>
        <div class="product-card-producer">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          ${p.producer}
        </div>
        <div style="display:flex;align-items:center;gap:4px;font-size:.78rem;color:var(--text-muted);margin-bottom:10px;">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          ${p.city}
        </div>
        <div class="product-card-footer">
          <div>
            <div class="product-card-price">R$ ${p.price.toFixed(2).replace('.', ',')}</div>
            <div class="product-card-unit">/${p.unit}</div>
          </div>
          <button class="btn btn-primary btn-sm"
            onclick="event.stopPropagation(); openProduct(${p.id})">
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>`;
}

/* ----------------------------------------------------------
   PRODUTOS EM DESTAQUE (landing page)
---------------------------------------------------------- */
function renderFeaturedProducts() {
  const el = document.getElementById('featured-products-grid');
  if (!el) return;
  el.innerHTML = allProducts.slice(0, 6).map(productCardHTML).join('');
}

/* ----------------------------------------------------------
   GRID DE PRODUTOS (página de catálogo)
---------------------------------------------------------- */
function renderProductsGrid() {
  const grid    = document.getElementById('products-grid');
  const countEl = document.getElementById('products-count');
  if (!grid) return;

  const search   = (document.getElementById('search-input')?.value || '').toLowerCase();
  const maxPrice = parseFloat(document.getElementById('price-range')?.value || 100);

  const cats = {
    frutas:     document.getElementById('cat-frutas')?.checked,
    verduras:   document.getElementById('cat-verduras')?.checked,
    laticinios: document.getElementById('cat-laticinios')?.checked,
    artesanais: document.getElementById('cat-artesanais')?.checked,
    outros:     document.getElementById('cat-outros')?.checked,
  };

  const catMap = {
    'Frutas': 'frutas', 'Verduras': 'verduras',
    'Laticínios': 'laticinios', 'Artesanais': 'artesanais', 'Outros': 'outros',
  };

  const filtered = allProducts.filter(p => {
    const matchSearch = !search
      || p.name.toLowerCase().includes(search)
      || p.producer.toLowerCase().includes(search)
      || p.city.toLowerCase().includes(search);
    const matchPrice = p.price <= maxPrice;
    const matchCat   = cats[catMap[p.category] || 'outros'];
    return matchSearch && matchPrice && matchCat;
  });

  grid.innerHTML = filtered.length
    ? filtered.map(productCardHTML).join('')
    : `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted);">
         Nenhum produto encontrado com os filtros selecionados.
       </div>`;

  if (countEl) {
    countEl.textContent = `Exibindo ${filtered.length} produto${filtered.length !== 1 ? 's' : ''}`;
  }
}

function filterProducts()       { renderProductsGrid(); }
function updatePriceLabel(v)    {
  const el = document.getElementById('price-label');
  if (el) el.textContent = 'R$ ' + v;
}

/* ----------------------------------------------------------
   DETALHE DO PRODUTO
---------------------------------------------------------- */
let currentProduct = null;
let detailQty      = 1;

function openProduct(id) {
  const p = allProducts.find(x => x.id === id);
  if (!p) return;

  currentProduct = p;
  detailQty = 1;

  // Resetar seletor de quantidade
  const qtyEl  = document.getElementById('detail-qty-input');
  const unitEl = document.getElementById('detail-unit-tag');
  if (qtyEl)  qtyEl.textContent  = '1';
  if (unitEl) unitEl.textContent = p.unit;

  // Preencher campos
  document.getElementById('detail-img').src            = p.img;
  document.getElementById('detail-thumb-1').src        = p.img;
  document.getElementById('detail-thumb-2').src        = p.img;
  document.getElementById('detail-thumb-3').src        = p.img;
  document.getElementById('detail-category').textContent = p.category;
  document.getElementById('detail-name').textContent   = p.name;
  document.getElementById('detail-price').textContent  = 'R$ ' + p.price.toFixed(2).replace('.', ',');
  document.getElementById('detail-unit').textContent   = '/' + p.unit;
  document.getElementById('detail-qty').textContent    = 'Disponível: ' + p.qty + ' ' + p.unit;
  document.getElementById('detail-desc').textContent   = p.desc;
  document.getElementById('detail-producer-name').textContent = p.producer;
  document.getElementById('detail-producer-city').textContent = p.city;
  document.getElementById('detail-location').textContent =
    p.producer + ', ' + p.city + ' • ~20 km de distância';
  document.getElementById('detail-producer-avatar').src =
    'https://placehold.co/52x52/C8E6C9/2E7D32?text=' +
    encodeURIComponent(p.producer.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase());

  // Produtos relacionados
  const related  = allProducts.filter(x => x.id !== id && x.category === p.category).slice(0, 4);
  const relExtra = allProducts.filter(x => x.id !== id && x.category !== p.category)
                              .slice(0, 4 - related.length);
  const relGrid  = document.getElementById('related-products-grid');
  if (relGrid) relGrid.innerHTML = [...related, ...relExtra].slice(0, 4).map(productCardHTML).join('');

  showScreen('detail');
}

/* ----------------------------------------------------------
   CONTROLE DE QUANTIDADE NA TELA DE DETALHE
---------------------------------------------------------- */
function detailChangeQty(delta) {
  detailQty = Math.max(1, detailQty + delta);
  const el = document.getElementById('detail-qty-input');
  if (el) el.textContent = detailQty;
}

function addToCartFromDetail() {
  if (!currentProduct) return;
  addToCart(currentProduct.id, detailQty);
}

function contactProducerWhatsapp() {
  if (!currentProduct) return;
  const msg = encodeURIComponent(
    `Olá! Vi o produto *${currentProduct.name}* na BãoDaFeira e tenho interesse. Pode me passar mais informações? 🌿`
  );
  window.open(`https://wa.me/5534998187184?text=${msg}`, '_blank', 'noopener,noreferrer');
}
