(function () {
    var storageKey = 'portfolio-theme';
    var savedTheme = null;

    try {
        savedTheme = localStorage.getItem(storageKey);
    } catch (error) {
        savedTheme = null;
    }

    var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var initialTheme = savedTheme === 'dark' || savedTheme === 'light'
        ? savedTheme
        : (systemPrefersDark ? 'dark' : 'light');

    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    document.documentElement.dataset.theme = initialTheme;

    function updateToggle(theme) {
        var toggle = document.querySelector('[data-theme-toggle]');
        if (!toggle) {
            return;
        }

        var isDark = theme === 'dark';
        toggle.setAttribute('aria-pressed', String(isDark));
        toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        toggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        toggle.querySelector('.theme-toggle-icon').textContent = isDark ? '\u2600' : '\u263E';
    }

    function setTheme(theme, persist) {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        document.documentElement.dataset.theme = theme;

        if (persist) {
            try {
                localStorage.setItem(storageKey, theme);
            } catch (error) {
            }
        }

        updateToggle(theme);
    }

    document.addEventListener('DOMContentLoaded', function () {
        updateToggle(initialTheme);

        var toggle = document.querySelector('[data-theme-toggle]');
        if (toggle) {
            toggle.addEventListener('click', function () {
                var nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
                setTheme(nextTheme, true);
            });
        }
    });
})();
