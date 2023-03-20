




const toggleButton = document.querySelector('.toggle-button');
const toggleContent = document.querySelector('.toggle-content');

toggleButton.addEventListener('click', function() {
  if (toggleContent.style.display === 'none') {
    toggleContent.style.display = 'block';
  } else {
    toggleContent.style.display = 'none';
  }
});