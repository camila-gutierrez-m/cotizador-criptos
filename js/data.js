// js/data.js
// Datos de criptomonedas y funciones utilitarias

const CRYPTOS_DATA = [
  {
    id: 'btc', name: 'Bitcoin', sym: 'BTC', color: '#F7931A',
    price: 67420, change: 2.34, cap: '$1.32T', vol: '$28.4B',
    high: 68100, low: 65800, supply: '19.7M BTC',
  },
  {
    id: 'eth', name: 'Ethereum', sym: 'ETH', color: '#627EEA',
    price: 3512, change: -1.12, cap: '$422B', vol: '$14.2B',
    high: 3680, low: 3420, supply: '120.3M ETH',
  },
  {
    id: 'bnb', name: 'BNB', sym: 'BNB', color: '#F3BA2F',
    price: 608, change: 0.87, cap: '$88B', vol: '$1.9B',
    high: 622, low: 598, supply: '145.8M BNB',
  },
  {
    id: 'sol', name: 'Solana', sym: 'SOL', color: '#9945FF',
    price: 172, change: 4.21, cap: '$79B', vol: '$3.1B',
    high: 178, low: 164, supply: '458M SOL',
  },
  {
    id: 'ada', name: 'Cardano', sym: 'ADA', color: '#0033AD',
    price: 0.612, change: -2.45, cap: '$21B', vol: '$520M',
    high: 0.64, low: 0.59, supply: '35.1B ADA',
  },
  {
    id: 'dot', name: 'Polkadot', sym: 'DOT', color: '#E6007A',
    price: 9.84, change: 1.03, cap: '$12.4B', vol: '$310M',
    high: 10.2, low: 9.5, supply: '1.26B DOT',
  },
  {
    id: 'matic', name: 'Polygon', sym: 'MATIC', color: '#8247E5',
    price: 0.884, change: -0.55, cap: '$8.3B', vol: '$420M',
    high: 0.92, low: 0.86, supply: '9.28B MATIC',
  },
  {
    id: 'link', name: 'Chainlink', sym: 'LINK', color: '#2A5ADA',
    price: 18.42, change: 3.10, cap: '$10.8B', vol: '$680M',
    high: 19.1, low: 17.8, supply: '587M LINK',
  },
]

// Formatea un precio según su magnitud
function fmtPrice(p) {
  if (p >= 1000) return '$' + p.toLocaleString('es', { maximumFractionDigits: 0 })
  if (p >= 1)    return '$' + p.toFixed(2)
  return '$' + p.toFixed(4)
}

// Genera datos de gráfica simulados para las últimas 24 horas
function generateChartData(basePrice) {
  const labels = []
  const data   = []
  for (let i = 23; i >= 0; i--) {
    labels.push(i === 0 ? 'Ahora' : i + 'h')
    const noise = (Math.random() - 0.48) * basePrice * 0.03 * (i / 4 + 1)
    data.push(parseFloat((basePrice + noise).toFixed(4)))
  }
  data[23] = basePrice
  return { labels, data }
}
