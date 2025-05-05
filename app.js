// enhanced-app.js
class EnhancedUI {
    constructor() {
        this.initDragAndDrop();
        this.initMediaBrowser();
        this.initSettingsPanel();
    }

    /**
     * Initialize drag and drop functionality
     */
    initDragAndDrop() {
        const dropZone = document.querySelector('.media-browser');
        
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            this.handleFileUpload(e.dataTransfer.files);
        });
    }

    /**
     * Initialize media browser interactions
     */
    initMediaBrowser() {
        document.querySelector('.media-search').addEventListener('input', (e) => {
            this.filterMedia(e.target.value);
        });

        document.querySelectorAll('.filter-button').forEach(button => {
            button.addEventListener('click', (e) => {
                document.querySelector('.filter-button.active').classList.remove('active');
                e.target.classList.add('active');
                this.filterMediaByType(e.target.dataset.type);
            });
        });
    }

    /**
     * Handle media filtering
     */
    filterMedia(searchTerm) {
        const mediaCards = document.querySelectorAll('.media-card');
        const searchQuery = searchTerm.toLowerCase();
        
        mediaCards.forEach(card => {
            const altText = card.querySelector('img').alt.toLowerCase();
            card.style.display = altText.includes(searchQuery) ? 'block' : 'none';
        });
    }

    /**
     * Initialize settings panel interactions
     */
    initSettingsPanel() {
        const settingsToggle = document.querySelector('.menu-button');
        const settingsPanel = document.querySelector('.settings-panel');
        
        settingsToggle.addEventListener('click', () => {
            settingsPanel.classList.toggle('active');
        });

        document.querySelector('.close-panel').addEventListener('click', () => {
            settingsPanel.classList.remove('active');
        });
    }

    /**
     * Show loading state
     */
    showLoading(show = true) {
        document.querySelector('.loading-overlay').style.display = 
            show ? 'grid' : 'none';
    }

    /**
     * Create media card element
     */
    createMediaCard(mediaUrl, altText) {
        const card = document.createElement('div');
        card.className = 'media-card';
        card.innerHTML = `
            <img src="${mediaUrl}" alt="${altText}" loading="lazy">
            <button class="media-select-button" aria-label="Select media">
                <span class="checkmark"></span>
            </button>
        `;
        return card;
    }
}

// Initialize enhanced UI components
document.addEventListener('DOMContentLoaded', () => {
    const ui = new EnhancedUI();
    
    // Example media loading
    const mediaGrid = document.querySelector('.ai-media-grid');
    for (let i = 0; i < 12; i++) {
        mediaGrid.appendChild(ui.createMediaCard(
            'https://source.unsplash.com/random/800x450',
            'Stock media image'
        ));
    }
});