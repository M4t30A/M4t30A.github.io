function toggleCertImg(badgeEl, e) {
  e.stopPropagation();
  const card = badgeEl.closest('.cert-card');
  const imgDiv = card.querySelector('.cert-inner-img');
  const imgEl = imgDiv.querySelector('img');
  const src = card.getAttribute('data-img');
  if (src && imgEl.getAttribute('src') !== src) imgEl.setAttribute('src', src);
  imgDiv.classList.toggle('show');
}
function closeCertImg(closeEl, e) {
  e.stopPropagation();
  closeEl.closest('.cert-inner-img').classList.remove('show');
}
