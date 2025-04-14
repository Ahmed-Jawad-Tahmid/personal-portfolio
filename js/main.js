document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  const setDarkMode = (enabled) => {
    if (enabled) {
      body.classList.add('dark');
      themeToggle.textContent = 'Light Mode';
    } else {
      body.classList.remove('dark');
      themeToggle.textContent = 'Dark Mode';
    }
  };

  // Toggle on click
  themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('dark');
    setDarkMode(!isDark);
  });
});
