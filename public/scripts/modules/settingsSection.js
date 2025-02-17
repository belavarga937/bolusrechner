

window.addEventListener('hashchange', () => {
    document.querySelectorAll('.settings-section').forEach( sections => {
        sections.classList.add('hidden');
    });
    const activeSection = document.querySelector(location.hash);
        if (activeSection) {
            activeSection.classList.remove('hidden');
        }
    
});

function removeHidden() {
    const activeSection = document.querySelector(location.hash);
        if (activeSection) {
            activeSection.classList.remove('hidden');
        }
};

removeHidden();