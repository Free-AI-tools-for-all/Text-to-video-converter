class VideoFactory {
    constructor() {
        this.API_KEY = 'eOMIwCYb0chqEi2as26dueIqWCV93OPxCze8UPbj4m32bNY2d71Gjex6'; // 🔒 Your Pexels API key
        this.selectedMedia = [];
        this.selectedVoice = null;
        this.selectedTrack = null;
        this.currentLang = 'en';
        this.synth = window.speechSynthesis;
        this.translations = {
            en: { /* English translations */ },
            es: { /* Spanish translations */ },
            fr: { /* French translations */ },
            de: { /* German translations */ }
        };

        this.init();
    }

    // ... rest of the class remains unchanged ...

    async loadMedia() {
        try {
            const response = await fetch(`https://api.pexels.com/v1/search?query=${this.getScriptKeywords()}`, {
                headers: { 
                    Authorization: this.API_KEY // 👈 Using your key here
                }
            });
            const data = await response.json();
            this.renderMedia(data.photos);
        } catch (error) {
            this.showError('Failed to load media');
        }
    }

    // ... rest of the methods ...
}
