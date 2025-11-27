// Universal script to update all HTML pages with proper translation support
const fs = require('fs');
const path = require('path');

const htmlFiles = [
    'cyber-crimes.html',
    'marriage-offences.html', 
    'reproductive-rights.html',
    'indian-constitution-women.html',
    'fundamental-rights-women.html',
    'article-14.html',
    'article-15.html', 
    'article-16.html',
    'article-21.html',
    'constitutional-provisions.html',
    'legal-remedies.html',
    'panchayati-raj-women.html'
];

const updateTranslateFunction = `
        function translatePage(lang) {
            document.querySelectorAll('.translate-btn').forEach(btn => {
                btn.style.opacity = '0.7';
                btn.style.transform = 'scale(1)';
            });
            
            const activeBtn = document.querySelector('.translate-btn-' + lang);
            if (activeBtn) {
                activeBtn.style.opacity = '1';
                activeBtn.style.transform = 'scale(1.1)';
            }
            
            if (typeof changeLanguage === 'function') {
                changeLanguage(lang);
            }
            
            localStorage.setItem('selectedLanguage', lang);
        }
        
        document.addEventListener('DOMContentLoaded', function() {
            // Load saved theme
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-theme');
            }
            
            // Load saved language
            setTimeout(() => {
                const savedLang = localStorage.getItem('selectedLanguage') || 'en';
                if (typeof translatePage === 'function') {
                    translatePage(savedLang);
                }
            }, 100);
        });`;

htmlFiles.forEach(filename => {
    const filePath = path.join(__dirname, filename);
    
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Update translatePage function
        content = content.replace(
            /function translatePage\(lang\)[\s\S]*?document\.addEventListener\('DOMContentLoaded'[\s\S]*?\}\);/,
            updateTranslateFunction
        );
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filename}`);
    }
});

console.log('All HTML files updated with proper translation support!');