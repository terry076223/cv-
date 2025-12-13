// 修復函數：確保獎狀照片正確保存到 localStorage

// 替換 upsertAward 函數
const originalUpsertAward = window.upsertAward;
window.upsertAward = function(event) {
  event.preventDefault();
  const data = loadData();
  const id = document.getElementById('award-id').value || crypto.randomUUID();
  const preview = document.getElementById('award-photo-preview');
  
  // 從 data attribute 或 img src 讀取照片
  let photoBase64 = preview.dataset.photoBase64 || '';
  if (!photoBase64) {
    const img = preview.querySelector('img');
    if (img && img.src && img.src.startsWith('data:image')) {
      photoBase64 = img.src;
    }
  }
  
  const payload = {
    id,
    name: document.getElementById('award-name').value.trim(),
    issuer: document.getElementById('award-issuer').value.trim(),
    year: document.getElementById('award-year').value.trim(),
    link: document.getElementById('award-link').value.trim(),
    desc: document.getElementById('award-desc').value.trim(),
    photoBase64: photoBase64
  };
  
  if (!Array.isArray(data.awards)) data.awards = [];
  const idx = data.awards.findIndex(i => i.id === id);
  if (idx >= 0) {
    data.awards[idx] = payload;
  } else {
    data.awards.unshift(payload);
  }
  
  saveData(data);
  resetForm('award-form');
  preview.innerHTML = '<p style="color: #9aa1b5; font-size: 12px; margin: 0; text-align: center; padding: 12px;">上傳照片後預覽</p>';
  preview.removeAttribute('data-photoBase64');
  refreshUI();
};

// 確保 editAward 也正確設置 data attribute
const originalEditAward = window.editAward;
window.editAward = function(id) {
  const data = loadData();
  const item = (data.awards || []).find(i => i.id === id);
  if (!item) return;
  
  document.getElementById('award-id').value = item.id;
  document.getElementById('award-name').value = item.name || '';
  document.getElementById('award-issuer').value = item.issuer || '';
  document.getElementById('award-year').value = item.year || '';
  document.getElementById('award-link').value = item.link || '';
  document.getElementById('award-desc').value = item.desc || '';
  
  const preview = document.getElementById('award-photo-preview');
  if (item.photoBase64) {
    preview.innerHTML = `<img src="${item.photoBase64}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />`;
    preview.setAttribute('data-photoBase64', item.photoBase64);
  } else {
    preview.innerHTML = '<p style="color: #9aa1b5; font-size: 12px; margin: 0; text-align: center; padding: 12px;">上傳照片後預覽</p>';
    preview.removeAttribute('data-photoBase64');
  }
};
