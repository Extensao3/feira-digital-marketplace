/* ==========================================================
   data.js — Dados estáticos da aplicação BãoDaFeira
   Produtos do catálogo e pedidos de exemplo do dashboard
========================================================== */

const allProducts = [
  {
    id: 1, name: 'Tomate Orgânico', category: 'Verduras',
    price: 8.90, unit: 'kg', producer: 'João Silva', city: 'Campinas/SP', qty: 50,
    img: 'https://images.unsplash.com/photo-1546094096-0df4bcabd337?w=400&h=300&fit=crop&auto=format',
    desc: 'Tomate orgânico cultivado sem agrotóxicos, colhido na maturação ideal. Rico em licopeno e vitamina C.',
    status: 'Ativo'
  },
  {
    id: 2, name: 'Alface Crespa', category: 'Verduras',
    price: 3.50, unit: 'unidade', producer: 'Maria Santos', city: 'Indaiatuba/SP', qty: 80,
    img: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=300&fit=crop&auto=format',
    desc: 'Alface crespa hidropônica, fresca e crocante. Cultivada sem agrotóxicos.',
    status: 'Ativo'
  },
  {
    id: 3, name: 'Queijo Minas Frescal', category: 'Laticínios',
    price: 22.00, unit: 'unidade', producer: 'Fazenda Boa Vista', city: 'São Roque/SP', qty: 20,
    img: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=300&fit=crop&auto=format',
    desc: 'Queijo Minas Frescal artesanal, produzido com leite integral fresco da própria fazenda.',
    status: 'Ativo'
  },
  {
    id: 4, name: 'Mel Silvestre', category: 'Artesanais',
    price: 35.00, unit: '500g', producer: 'Apicultura Flores do Campo', city: 'Atibaia/SP', qty: 30,
    img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop&auto=format',
    desc: 'Mel silvestre puro, extraído de colmeias naturais em área de mata preservada.',
    status: 'Ativo'
  },
  {
    id: 5, name: 'Banana Prata', category: 'Frutas',
    price: 6.00, unit: 'kg', producer: 'Sítio Vale Verde', city: 'Jundiaí/SP', qty: 100,
    img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop&auto=format',
    desc: 'Banana prata doce e madura, colhida no ponto certo. Produção familiar sem agrotóxicos.',
    status: 'Ativo'
  },
  {
    id: 6, name: 'Leite Integral Fresco', category: 'Laticínios',
    price: 4.50, unit: 'litro', producer: 'Família Rodrigues', city: 'Itatiba/SP', qty: 60,
    img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop&auto=format',
    desc: 'Leite integral fresco, pasteurizado artesanalmente. Rebanho livre de hormônios.',
    status: 'Ativo'
  },
  {
    id: 7, name: 'Morango', category: 'Frutas',
    price: 12.00, unit: 'bandeja', producer: 'Rosa Pereira', city: 'Jarinu/SP', qty: 40,
    img: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=300&fit=crop&auto=format',
    desc: 'Morango vermelho, doce e perfumado. Colhido no dia, sem conservantes.',
    status: 'Ativo'
  },
  {
    id: 8, name: 'Mandioca', category: 'Verduras',
    price: 5.00, unit: 'kg', producer: 'Pedro Almeida', city: 'Campo Limpo Paulista/SP', qty: 120,
    img: 'https://images.unsplash.com/photo-1598512199271-c0bde4e1d5b4?w=400&h=300&fit=crop&auto=format',
    desc: 'Mandioca fresca, maciça e saborosa. Ideal para acompanhamentos, caldos e mandioca frita.',
    status: 'Ativo'
  },
  {
    id: 9, name: 'Ovos Caipira', category: 'Outros',
    price: 15.00, unit: 'dz', producer: 'Sítio Esperança', city: 'Mairiporã/SP', qty: 35,
    img: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=400&h=300&fit=crop&auto=format',
    desc: 'Ovos caipira com gema laranja, de galinhas criadas soltas em pasto natural. Sem antibióticos.',
    status: 'Ativo'
  },
  {
    id: 10, name: 'Abóbora Cabotiá', category: 'Verduras',
    price: 7.00, unit: 'kg', producer: 'Sítio Vale Verde', city: 'Jundiaí/SP', qty: 45,
    img: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=400&h=300&fit=crop&auto=format',
    desc: 'Abóbora cabotiá saborosa, ideal para sopas, purês e assados.',
    status: 'Inativo'
  },
  {
    id: 11, name: 'Goiaba Vermelha', category: 'Frutas',
    price: 9.00, unit: 'kg', producer: 'João Silva', city: 'Campinas/SP', qty: 55,
    img: 'https://images.unsplash.com/photo-1536823267670-c69ffe404a92?w=400&h=300&fit=crop&auto=format',
    desc: 'Goiaba vermelha doce e perfumada, rica em vitamina C e antioxidantes.',
    status: 'Ativo'
  },
  {
    id: 12, name: 'Doce de Leite Artesanal', category: 'Artesanais',
    price: 18.00, unit: '300g', producer: 'Fazenda Boa Vista', city: 'São Roque/SP', qty: 25,
    img: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02?w=400&h=300&fit=crop&auto=format',
    desc: 'Doce de leite caseiro, feito em tacho de cobre com leite da própria fazenda.',
    status: 'Ativo'
  },
];

const dashProducts = allProducts.slice(0, 7);

const sampleOrders = [
  { id: '#001', client: 'Ana Oliveira',   product: 'Tomate Orgânico', qty: '5 kg',     value: 'R$ 44,50', date: '17/03/2025', status: 'Pendente' },
  { id: '#002', client: 'Carlos Mendes', product: 'Ovos Caipira',    qty: '2 dz',     value: 'R$ 30,00', date: '16/03/2025', status: 'Pendente' },
  { id: '#003', client: 'Fernanda Costa',product: 'Mel Silvestre',   qty: '1 unidade', value: 'R$ 35,00', date: '15/03/2025', status: 'Pendente' },
  { id: '#004', client: 'Ricardo Lima',  product: 'Banana Prata',    qty: '3 kg',     value: 'R$ 18,00', date: '14/03/2025', status: 'Entregue' },
];
