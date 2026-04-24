// ===== TOAST NOTIFICATIONS =====
function showToast(msg, type = 'success') {
  const container = document.getElementById('toast-container') || (() => {
    const el = document.createElement('div');
    el.id = 'toast-container';
    document.body.appendChild(el);
    return el;
  })();
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || '✓'}</span>${msg}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ===== MODAL =====
function openModal(id) { document.getElementById(id)?.classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id)?.classList.add('hidden'); }

// ===== CONFIRM DIALOG =====
function confirmDialog(msg) { return window.confirm(msg); }

// ===== FORMAT DATE =====
function formatDate(ts) {
  if (!ts) return '—';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ===== DISPERSAL MODE BADGE =====
function modeBadge(mode) {
  const map = {
    'School Bus': 'badge-blue',
    'Own Transport': 'badge-orange',
    'By Walk': 'badge-green'
  };
  return `<span class="badge ${map[mode] || 'badge-gray'}">${mode || '—'}</span>`;
}

// ===== SIBLING BADGE =====
function siblingBadge(val) {
  return val === 'Yes'
    ? '<span class="badge badge-green">Yes</span>'
    : '<span class="badge badge-gray">No</span>';
}

// ===== WALK CONSENT BADGE =====
function consentBadge(val) {
  return val === 'Yes'
    ? '<span class="badge badge-green">Yes</span>'
    : '<span class="badge badge-red">No</span>';
}

// ===== GRADE → CYCLE =====
const CYCLE_MAP = {
  KG1: 'kindergarten', KG2: 'kindergarten',
  G1: 'primary', G2: 'primary', G3: 'primary', G4: 'primary', G5: 'primary',
  G6: 'middle', G7: 'middle', G8: 'middle',
  G9: 'higher', G10: 'higher', G11: 'higher', G12: 'higher'
};
function gradeToCycle(grade) { return CYCLE_MAP[grade] || 'unknown'; }
function cycleName(key) {
  return { kindergarten: 'Kindergarten', primary: 'Primary', middle: 'Middle', higher: 'Higher' }[key] || key;
}

// ===== AUTH GUARD =====
function requireAuth(auth, onAuthStateChanged, loginUrl = 'login.html') {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = loginUrl;
      } else {
        resolve(user);
      }
    });
  });
}

// ===== EXCEL EXPORT (plain CSV) =====
function exportCSV(data, filename) {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(h => `"${(row[h] ?? '').toString().replace(/"/g, '""')}"`).join(','));
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
