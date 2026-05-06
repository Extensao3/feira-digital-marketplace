/* ==========================================================
   utils.js — Utilitários gerais do BãoDaFeira
   Toast, navegação entre telas, menu mobile,
   máscaras de input, validação e toggle de senha
========================================================== */

/* ----------------------------------------------------------
   NAVEGAÇÃO ENTRE TELAS
---------------------------------------------------------- */
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

  const target = document.getElementById('screen-' + name);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Destaca link ativo na navbar
  document.querySelectorAll('.navbar-links a[data-screen]').forEach(a => {
    a.classList.toggle('active', a.dataset.screen === name);
  });

  // Renderiza conteúdo dinâmico ao mudar de tela
  if (name === 'landing')    renderFeaturedProducts();
  if (name === 'products')   renderProductsGrid();
  if (name === 'dashboard')  renderDashboardTable();
}

/* ----------------------------------------------------------
   TOAST (notificação flutuante)
---------------------------------------------------------- */
let toastTimer;

function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast' + (type === 'success' ? ' success' : '');
  requestAnimationFrame(() => t.classList.add('show'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

/* ----------------------------------------------------------
   MENU MOBILE
---------------------------------------------------------- */
function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
  document.body.classList.toggle('menu-open');
}

function closeMobileMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
  document.body.classList.remove('menu-open');
}

/* ----------------------------------------------------------
   FILTROS MOBILE (sidebar de produtos)
---------------------------------------------------------- */
function toggleMobileFilters() {
  const sidebar = document.getElementById('products-sidebar-panel');
  const btn     = document.getElementById('mobile-filter-btn');
  const isOpen  = sidebar.classList.toggle('mobile-open');

  btn.setAttribute('aria-expanded', isOpen);
  btn.innerHTML = isOpen
    ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
         <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
       </svg> Fechar filtros`
    : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
         <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/>
       </svg> Filtrar produtos`;
}

/* ----------------------------------------------------------
   SHOW / HIDE SENHA
---------------------------------------------------------- */
function togglePassword(inputId, btn) {
  const input     = document.getElementById(inputId);
  const isHidden  = input.type === 'password';

  input.type = isHidden ? 'text' : 'password';
  btn.querySelector('.icon-eye').style.display     = isHidden ? 'none'  : 'block';
  btn.querySelector('.icon-eye-off').style.display = isHidden ? 'block' : 'none';
  btn.setAttribute('aria-label', isHidden ? 'Ocultar senha' : 'Mostrar senha');
}

/* ----------------------------------------------------------
   FORÇA DA SENHA
---------------------------------------------------------- */
function updateStrength(val) {
  const wrap = document.getElementById('password-strength');
  if (!wrap) return;
  wrap.style.display = val.length > 0 ? 'flex' : 'none';

  let score = 0;
  if (val.length >= 8)           score++;
  if (/[A-Z]/.test(val))         score++;
  if (/[0-9]/.test(val))         score++;
  if (/[^A-Za-z0-9]/.test(val))  score++;

  const classes = ['', 'weak', 'fair', 'strong', 'great'];
  const labels  = ['', 'Fraca', 'Regular', 'Boa', 'Forte'];
  const colors  = ['', '#E53935', '#F9A825', '#66BB6A', '#2E7D32'];

  for (let i = 1; i <= 4; i++) {
    const bar = document.getElementById('sb' + i);
    if (bar) bar.className = 'strength-bar' + (i <= score ? ' ' + classes[score] : '');
  }

  const label = document.getElementById('strength-label');
  if (label) {
    label.textContent = labels[score] || '';
    label.style.color = colors[score] || 'var(--text-muted)';
  }
}

/* ----------------------------------------------------------
   VALIDAÇÃO INLINE DE CAMPOS
---------------------------------------------------------- */
function validateField(input, testFn, errorMsg) {
  const errId = 'err-' + input.id.replace('reg-', '');
  const errEl = document.getElementById(errId);
  const valid = input.value === '' ? true : testFn(input.value);

  input.classList.toggle('error',   !valid && input.value !== '');
  input.classList.toggle('success',  valid && input.value !== '');

  if (errEl) {
    errEl.innerHTML = (!valid && input.value !== '')
      ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
           <circle cx="12" cy="12" r="10"/>
           <line x1="12" y1="8" x2="12" y2="12"/>
           <line x1="12" y1="16" x2="12.01" y2="16"/>
         </svg> ${errorMsg}`
      : '';
  }
}

/* ----------------------------------------------------------
   MÁSCARAS DE INPUT
---------------------------------------------------------- */
function maskPhone(input) {
  let v = input.value.replace(/\D/g, '').slice(0, 11);
  if      (v.length > 10) v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  else if (v.length > 6)  v = v.replace(/^(\d{2})(\d{4})(\d*)$/,   '($1) $2-$3');
  else if (v.length > 2)  v = v.replace(/^(\d{2})(\d*)$/,           '($1) $2');
  else if (v.length > 0)  v = v.replace(/^(\d*)$/,                  '($1');
  input.value = v;
}

function maskCPF(input) {
  let v = input.value.replace(/\D/g, '').slice(0, 11);
  v = v.replace(/^(\d{3})(\d)/,           '$1.$2');
  v = v.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
  v = v.replace(/\.(\d{3})(\d)/,          '.$1-$2');
  input.value = v;
}

function maskCEP(input) {
  let v = input.value.replace(/\D/g, '').slice(0, 8);
  if (v.length > 5) v = v.replace(/^(\d{5})(\d)/, '$1-$2');
  input.value = v;
}

/* ----------------------------------------------------------
   FORMATAÇÃO MONETÁRIA
---------------------------------------------------------- */
function fmtMoney(v) {
  return 'R$ ' + v.toFixed(2).replace('.', ',');
}
