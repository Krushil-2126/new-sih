// Datasets Browser script
// Fetches rows from Hugging Face datasets-server and renders a table with pagination
(function(){
  const state = {
    dataset: 'MexFoundation/google_maps',
    config: 'default',
    split: 'train',
    offset: 0,
    length: 100,
    page: 1,
  };

  const e = (id) => document.getElementById(id);

  function readInputs(){
    state.dataset = e('dsName')?.value?.trim() || state.dataset;
    state.config = e('dsConfig')?.value?.trim() || state.config;
    state.split = e('dsSplit')?.value || state.split;
    state.offset = parseInt(e('dsOffset')?.value || state.offset, 10) || 0;
    state.length = Math.min(Math.max(parseInt(e('dsLength')?.value || state.length, 10) || 100, 1), 1000);
  }

  function setStatus(msg){ const s = e('dsStatus'); if (s) s.textContent = msg; }
  function setPageInfo(){ const p = e('dsPageInfo'); if (p) p.textContent = `Page ${state.page}`; }

  function buildUrl(){
    const params = new URLSearchParams({
      dataset: state.dataset,
      config: state.config,
      split: state.split,
      offset: String(state.offset),
      length: String(state.length),
    });
    return `https://datasets-server.huggingface.co/rows?${params.toString()}`;
  }

  function renderRows(rows){
    const tbody = e('dsTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const html = (rows || []).map((r, idx) => {
      const rowIndex = state.offset + idx + 1;
      const json = JSON.stringify(r.row ?? r, null, 2);
      return `<tr>
        <td>${rowIndex}</td>
        <td><pre class="code">${escapeHtml(json)}</pre></td>
      </tr>`;
    }).join('');
    tbody.insertAdjacentHTML('beforeend', html);
  }

  function escapeHtml(s){
    return s.replace(/[&<>"]/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c] || c));
  }

  async function fetchRows(){
    try {
      readInputs();
      setStatus('Loading...');
      const url = buildUrl();
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      // rows field may be data.rows; fallback to data if shape differs
      renderRows(data.rows || data);
      setStatus('Loaded');
      setPageInfo();
    } catch (err) {
      console.error(err);
      setStatus('Error loading dataset');
    }
  }

  function prevPage(){
    if (state.offset <= 0) return;
    state.offset = Math.max(0, state.offset - state.length);
    state.page = Math.max(1, state.page - 1);
    e('dsOffset').value = String(state.offset);
    fetchRows();
  }

  function nextPage(){
    state.offset = state.offset + state.length;
    state.page = state.page + 1;
    e('dsOffset').value = String(state.offset);
    fetchRows();
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Initialize default inputs
    if (e('dsName')) e('dsName').value = state.dataset;
    if (e('dsConfig')) e('dsConfig').value = state.config;
    if (e('dsSplit')) e('dsSplit').value = state.split;
    if (e('dsOffset')) e('dsOffset').value = String(state.offset);
    if (e('dsLength')) e('dsLength').value = String(state.length);

    fetchRows();
  });

  // Expose for buttons
  window.fetchRows = fetchRows;
  window.prevPage = prevPage;
  window.nextPage = nextPage;
})();
