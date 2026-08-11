// Pequeño efecto de entrada para los botones.
document.querySelectorAll('.action').forEach((button, index) => {
  button.style.opacity = '0';
  button.style.transform = 'translateY(10px)';
  setTimeout(() => {
    button.style.transition = 'opacity .45s ease, transform .45s ease, box-shadow .2s ease';
    button.style.opacity = '1';
    button.style.transform = 'translateY(0)';
  }, 180 + index * 100);
});
