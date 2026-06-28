// js/app.js
// Aplicación Vue 3 — Cotizador de Criptos

const { createApp, ref, computed, watch, onMounted } = Vue

createApp({

  setup() {

    // ── Estado principal ───────────────────────────────────────────────
    const cryptos      = ref(CRYPTOS_DATA.map(c => ({ ...c })))
    const selectedId   = ref('btc')
    const searchQuery  = ref('')
    const activeFilter = ref('all')
    const favorites    = ref(new Set(['btc', 'sol']))
    const alerts       = ref([])
    const lastUpdate   = ref('Actualizado: ahora')

    // Convertidor
    const convCrypto = ref('1')
    const convFiat   = ref('')
    const fiatRate   = ref('1')
    const alertType  = ref('above')
    const alertPrice = ref('')

    // Chart.js instance
    let chartInstance = null

    // Filtros disponibles
    const filters = [
      { id: 'all',     label: 'Todas' },
      { id: 'gainers', label: 'Ganadoras' },
      { id: 'losers',  label: 'Perdedoras' },
      { id: 'favs',    label: 'Favoritas' },
    ]

    // ── Computed ───────────────────────────────────────────────────────
    const filteredCryptos = computed(() => {
      const q = searchQuery.value.toLowerCase()
      let list = cryptos.value.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.sym.toLowerCase().includes(q)
      )
      if (activeFilter.value === 'gainers') list = list.filter(c => c.change > 0)
      if (activeFilter.value === 'losers')  list = list.filter(c => c.change < 0)
      if (activeFilter.value === 'favs')    list = list.filter(c => favorites.value.has(c.id))
      return list
    })

    const selected = computed(() =>
      cryptos.value.find(c => c.id === selectedId.value) || null
    )

    const alertsForSelected = computed(() =>
      alerts.value.filter(a => a.coin === selected.value?.sym)
    )

    // ── Acciones ───────────────────────────────────────────────────────
    function selectCrypto(id) {
      selectedId.value = id
      const c = cryptos.value.find(x => x.id === id)
      if (c) {
        convCrypto.value = '1'
        convFiat.value   = (c.price * parseFloat(fiatRate.value)).toFixed(2)
      }
    }

    function toggleFav(id) {
      const favs = new Set(favorites.value)
      favs.has(id) ? favs.delete(id) : favs.add(id)
      favorites.value = favs
    }

    function convertFrom() {
      if (!selected.value) return
      const crypto = parseFloat(convCrypto.value) || 0
      const rate   = parseFloat(fiatRate.value)   || 1
      convFiat.value = (crypto * selected.value.price * rate).toFixed(2)
    }

    function convertTo() {
      if (!selected.value) return
      const fiat = parseFloat(convFiat.value) || 0
      const rate = parseFloat(fiatRate.value) || 1
      convCrypto.value = (fiat / (selected.value.price * rate)).toFixed(6)
    }

    function addAlert() {
      const price = parseFloat(alertPrice.value)
      if (!price || price <= 0 || !selected.value) return
      alerts.value.push({
        id:   Date.now(),
        coin: selected.value.sym,
        type: alertType.value,
        price,
      })
      alertPrice.value = ''
    }

    function delAlert(id) {
      alerts.value = alerts.value.filter(a => a.id !== id)
    }

    function refreshPrices() {
      cryptos.value = cryptos.value.map(c => ({
        ...c,
        price:  parseFloat((c.price * (1 + (Math.random() - 0.47) * 0.02)).toFixed(6)),
        change: parseFloat((c.change + (Math.random() - 0.5) * 0.4).toFixed(2)),
      }))
      const now = new Date()
      const hh  = now.getHours()
      const mm  = String(now.getMinutes()).padStart(2, '0')
      lastUpdate.value = `Actualizado: ${hh}:${mm}`

      // Si hay cripto seleccionada, actualizar convertidor
      if (selected.value) convertFrom()
      renderChart()
    }

    // ── Gráfica ────────────────────────────────────────────────────────
    function renderChart() {
      const canvas = document.getElementById('priceChart')
      if (!canvas || !selected.value) return

      const { labels, data } = generateChartData(selected.value.price)

      if (chartInstance) chartInstance.destroy()

      chartInstance = new Chart(canvas, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            data,
            borderColor:     '#4E7D6E',
            backgroundColor: 'rgba(168, 202, 187, 0.25)',
            tension:          0.4,
            fill:             true,
            pointRadius:      0,
            pointHoverRadius: 4,
            borderWidth:      2,
          }],
        },
        options: {
          responsive:          true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              ticks:  { maxTicksLimit: 8, font: { size: 10 }, color: '#5A8A7A' },
              grid:   { display: false },
            },
            y: {
              ticks:    { font: { size: 10 }, color: '#5A8A7A', callback: v => fmtPrice(v) },
              grid:     { color: '#C8E0D4' },
            },
          },
        },
      })
    }

    // ── Watchers ───────────────────────────────────────────────────────

    // Redibujar gráfica cuando cambia la cripto seleccionada
    watch(selectedId, () => {
      setTimeout(renderChart, 50)
      convertFrom()
    })

    // Actualizar convertidor cuando cambia la tasa fiat
    watch(fiatRate, convertFrom)

    // ── Lifecycle ──────────────────────────────────────────────────────
    onMounted(() => {
      convFiat.value = (selected.value?.price || 0).toFixed(2)
      setTimeout(renderChart, 100)
    })

    // ── Exponer al template ────────────────────────────────────────────
    return {
      cryptos,
      selectedId,
      searchQuery,
      activeFilter,
      favorites,
      alerts,
      lastUpdate,
      convCrypto,
      convFiat,
      fiatRate,
      alertType,
      alertPrice,
      filters,
      filteredCryptos,
      selected,
      alertsForSelected,
      fmtPrice,
      selectCrypto,
      toggleFav,
      convertFrom,
      convertTo,
      addAlert,
      delAlert,
      refreshPrices,
    }
  },

}).mount('#app')
