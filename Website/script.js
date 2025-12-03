// ======== FONT SIZE FUNCTIONALITY ========
// This manages the 3-level font size increment/decrement system
let currentFontLevel = 0; // -3 to +3 range (7 levels total)
const fontSizes = {
    '-3': '12px',
    '-2': '13px', 
    '-1': '14px',
    '0': '16px',   // Normal/default
    '1': '18px',
    '2': '20px',
    '3': '22px'
};

function changeFontSize(direction) {
    // Remove active class from all buttons
    document.querySelectorAll('.text-size button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (direction === 'decrease' && currentFontLevel > -3) {
        currentFontLevel--;
    } else if (direction === 'increase' && currentFontLevel < 3) {
        currentFontLevel++;
    } else if (direction === 'reset') {
        currentFontLevel = 0;
    }
    
    // Apply font size to body
    document.body.style.fontSize = fontSizes[currentFontLevel];
    
    // Update button states
    updateFontButtons();
    
    // Store preference in localStorage
    localStorage.setItem('fontSize', currentFontLevel);
}

function updateFontButtons() {
    const decreaseBtn = document.querySelector('.text-size button:first-child');
    const normalBtn = document.querySelector('.text-size button:nth-child(2)');
    const increaseBtn = document.querySelector('.text-size button:last-child');
    
    // Reset all buttons
    [decreaseBtn, normalBtn, increaseBtn].forEach(btn => {
        btn.classList.remove('active');
        btn.disabled = false;
    });
    
    // Set active button based on current level
    if (currentFontLevel < 0) {
        decreaseBtn.classList.add('active');
    } else if (currentFontLevel === 0) {
        normalBtn.classList.add('active');
    } else {
        increaseBtn.classList.add('active');
    }
    
    // Disable buttons at limits
    if (currentFontLevel <= -3) decreaseBtn.disabled = true;
    if (currentFontLevel >= 3) increaseBtn.disabled = true;
}

// ======== COMPREHENSIVE TRANSLATION SYSTEM ========
// Complete translations for all website content in Hindi, English, and Urdu
const translations = {
    'en': {
        // Top Bar & Navigation
        'Government of India': 'Government of India',
        'Skip to Main Content': 'Skip to Main Content',
        'Language': 'Language',
        'More': 'More',
        'Empower Hub': 'Empower Hub',
        'Home': 'Home',
        'About Us': 'About Us',
        'Services': 'Services',
        'Popular Cases': 'Popular Cases',
        'How it Works': 'How it Works',
        'Quick Assist': 'Quick Assist',
        'Search...': 'Search...',
        
        // Hero Section
        'Access Your': 'Access Your',
        'Rights': 'Rights',
        'Secure Your': 'Secure Your',
        'Future': 'Future',
        "What's new": "What's new",
        'Important information': 'Important information',
        'View All': 'View All',
        'Explore': 'Explore',
        'Description of what\'s new 2 goes here.': 'Description of what\'s new 2 goes here.',
        'Document Type': 'Document Type',
        'Important information 1 goes here.': 'Important information 1 goes here.',
        'Important information 2 goes here.': 'Important information 2 goes here.',
        
        // Service Finder
        'Find the right service for you': 'Find the right service for you',
        'Tell us about yourself to find out the right services for you': 'Tell us about yourself to find out the right services for you',
        'Get Started': 'Get Started',
        
        // About Section
        'About Ministry/Department': 'About Ministry/Department',
        'We are dedicated to serving the public by [brief description of the ministry/department\'s mission]. Our team of experienced professionals is committed to [mention a few key objectives or areas of focus].': 'We are dedicated to serving the public by [brief description of the ministry/department\'s mission]. Our team of experienced professionals is committed to [mention a few key objectives or areas of focus].',
        'We believe in [core values or principles the ministry/department upholds]. We are here to answer your questions and provide you with the information and resources you need.': 'We believe in [core values or principles the ministry/department upholds]. We are here to answer your questions and provide you with the information and resources you need.',
        'Know More': 'Know More',
        
        // Services Section
        'Explore Services by Category': 'Explore Services by Category',
        'Indian Constitution and Women': 'Indian Constitution and Women',
        'Reproductive Rights': 'Reproductive Rights',
        'Sexual Offences Against Women': 'Sexual Offences Against Women',
        'Offences Related to Marriage': 'Offences Related to Marriage',
        'Cyber Crimes Against Women': 'Cyber Crimes Against Women',
        'Emergency Support & Helplines': 'Emergency Support & Helplines',
        
        // Popular Cases
        'Women Safety': 'Women Safety',
        'Domestic Violence Case': 'Domestic Violence Case',
        'Legal Support • Response - 24 hours': 'Legal Support • Response - 24 hours',
        'Workplace Rights': 'Workplace Rights',
        'Sexual Harassment': 'Sexual Harassment',
        'Legal Aid • Response - 48 hours': 'Legal Aid • Response - 48 hours',
        'Cyber Crime': 'Cyber Crime',
        'Online Harassment': 'Online Harassment',
        'Cyber Cell • Response - 24 hours': 'Cyber Cell • Response - 24 hours',
        'Legal Rights': 'Legal Rights',
        'Property Rights': 'Property Rights',
        'Legal Consultation • Response - 72 hours': 'Legal Consultation • Response - 72 hours',
        
        // How it Works
        'Identify Your Need': 'Identify Your Need',
        'Browse through our categories to find the right legal support or information you need.': 'Browse through our categories to find the right legal support or information you need.',
        'Explore Resources': 'Explore Resources',
        'Access comprehensive guides, legal information, and support services tailored to your situation.': 'Access comprehensive guides, legal information, and support services tailored to your situation.',
        'Take Action': 'Take Action',
        'Use our helpline numbers, file complaints, or connect with legal aid services for immediate support.': 'Use our helpline numbers, file complaints, or connect with legal aid services for immediate support.',
        'Get Resolution': 'Get Resolution',
        'Track your case progress and receive ongoing support until your matter is resolved.': 'Track your case progress and receive ongoing support until your matter is resolved.',
        
        // Footer
        'Need Support?': 'Need Support?',
        'Get immediate help through our 24x7 women helpline numbers and support services': 'Get immediate help through our 24x7 women helpline numbers and support services',
        'Emergency: 112': 'Emergency: 112',
        'Police, Fire, Ambulance': 'Police, Fire, Ambulance',
        'Women Helpline: 181': 'Women Helpline: 181',
        'National helpline for women in distress': 'National helpline for women in distress',
        'NCW Helpline: 7827170170': 'NCW Helpline: 7827170170',
        '24x7 NCW direct helpline': '24x7 NCW direct helpline',
        'Get in touch': 'Get in touch',
        
        // Common Elements
        'Demo': 'Demo',
        'Functionality Demo & Testing': 'Functionality Demo & Testing',
        'Font Size Control (7 Levels)': 'Font Size Control (7 Levels)',
        'Language Switching': 'Language Switching',
        'Responsive Design': 'Responsive Design',
        'Implemented Features': 'Implemented Features',
        'Back to Main Site': '← Back to Main Site'
    },
    
    'hi': {
        // Top Bar & Navigation
        'Government of India': 'भारत सरकार',
        'Skip to Main Content': 'मुख्य सामग्री पर जाएं',
        'Language': 'भाषा',
        'More': 'और',
        'Empower Hub': 'सशक्तिकरण केंद्र',
        'Home': 'होम',
        'About Us': 'हमारे बारे में',
        'Services': 'सेवाएं',
        'Popular Cases': 'लोकप्रिय मामले',
        'How it Works': 'यह कैसे काम करता है',
        'Quick Assist': 'त्वरित सहायता',
        'Search...': 'खोजें...',
        
        // Hero Section
        'Access Your': 'अपने',
        'Rights': 'अधिकार प्राप्त करें',
        'Secure Your': 'अपना',
        'Future': 'भविष्य सुरक्षित करें',
        "What's new": "नया क्या है",
        'Important information': 'महत्वपूर्ण जानकारी',
        'View All': 'सभी देखें',
        'Explore': 'खोजें',
        'Description of what\'s new 2 goes here.': 'नई जानकारी का विवरण यहाँ है।',
        'Document Type': 'दस्तावेज़ प्रकार',
        'Important information 1 goes here.': 'महत्वपूर्ण जानकारी 1 यहाँ है।',
        'Important information 2 goes here.': 'महत्वपूर्ण जानकारी 2 यहाँ है।',
        
        // Service Finder
        'Find the right service for you': 'अपने लिए सही सेवा खोजें',
        'Tell us about yourself to find out the right services for you': 'अपने लिए सही सेवाओं का पता लगाने के लिए अपने बारे में बताएं',
        'Get Started': 'शुरू करें',
        
        // About Section
        'About Ministry/Department': 'मंत्रालय/विभाग के बारे में',
        'We are dedicated to serving the public by [brief description of the ministry/department\'s mission]. Our team of experienced professionals is committed to [mention a few key objectives or areas of focus].': 'हम [मंत्रालय/विभाग के मिशन का संक्षिप्त विवरण] के माध्यम से जनता की सेवा करने के लिए समर्पित हैं। हमारी अनुभवी पेशेवरों की टीम [कुछ मुख्य उद्देश्यों या फोकस क्षेत्रों का उल्लेख] के लिए प्रतिबद्ध है।',
        'We believe in [core values or principles the ministry/department upholds]. We are here to answer your questions and provide you with the information and resources you need.': 'हम [मंत्रालय/विभाग द्वारा समर्थित मूल मूल्यों या सिद्धांतों] में विश्वास करते हैं। हम आपके प्रश्नों का उत्तर देने और आपको आवश्यक जानकारी और संसाधन प्रदान करने के लिए यहाँ हैं।',
        'Know More': 'और जानें',
        
        // Services Section
        'Explore Services by Category': 'श्रेणी के अनुसार सेवाओं का अन्वेषण करें',
        'Indian Constitution and Women': 'भारतीय संविधान और महिलाएं',
        'Reproductive Rights': 'प्रजनन अधिकार',
        'Sexual Offences Against Women': 'महिलाओं के विरुद्ध यौन अपराध',
        'Offences Related to Marriage': 'विवाह संबंधी अपराध',
        'Cyber Crimes Against Women': 'महिलाओं के विरुद्ध साइबर अपराध',
        'Emergency Support & Helplines': 'आपातकालीन सहायता और हेल्पलाइन',
        
        // Popular Cases
        'Women Safety': 'महिला सुरक्षा',
        'Domestic Violence Case': 'घरेलू हिंसा का मामला',
        'Legal Support • Response - 24 hours': 'कानूनी सहायता • प्रतिक्रिया - 24 घंटे',
        'Workplace Rights': 'कार्यक्षेत्र अधिकार',
        'Sexual Harassment': 'यौन उत्पीड़न',
        'Legal Aid • Response - 48 hours': 'कानूनी सहायता • प्रतिक्रिया - 48 घंटे',
        'Cyber Crime': 'साइबर अपराध',
        'Online Harassment': 'ऑनलाइन उत्पीड़न',
        'Cyber Cell • Response - 24 hours': 'साइबर सेल • प्रतिक्रिया - 24 घंटे',
        'Legal Rights': 'कानूनी अधिकार',
        'Property Rights': 'संपत्ति अधिकार',
        'Legal Consultation • Response - 72 hours': 'कानूनी परामर्श • प्रतिक्रिया - 72 घंटे',
        
        // How it Works
        'Identify Your Need': 'अपनी आवश्यकता पहचानें',
        'Browse through our categories to find the right legal support or information you need.': 'आपको आवश्यक सही कानूनी सहायता या जानकारी खोजने के लिए हमारी श्रेणियों को देखें।',
        'Explore Resources': 'संसाधनों का अन्वेषण करें',
        'Access comprehensive guides, legal information, and support services tailored to your situation.': 'आपकी स्थिति के अनुकूल व्यापक गाइड, कानूनी जानकारी और सहायता सेवाओं तक पहुंचें।',
        'Take Action': 'कार्रवाई करें',
        'Use our helpline numbers, file complaints, or connect with legal aid services for immediate support.': 'तत्काल सहायता के लिए हमारे हेल्पलाइन नंबरों का उपयोग करें, शिकायत दर्ज करें, या कानूनी सहायता सेवाओं से जुड़ें।',
        'Get Resolution': 'समाधान प्राप्त करें',
        'Track your case progress and receive ongoing support until your matter is resolved.': 'अपने मामले की प्रगति को ट्रैक करें और जब तक आपका मामला हल नहीं हो जाता तब तक निरंतर सहायता प्राप्त करें।',
        
        // Footer
        'Need Support?': 'सहायता चाहिए?',
        'Get immediate help through our 24x7 women helpline numbers and support services': 'हमारे 24x7 महिला हेल्पलाइन नंबर और सहायता सेवाओं के माध्यम से तत्काल सहायता प्राप्त करें',
        'Emergency: 112': 'आपातकाल: 112',
        'Police, Fire, Ambulance': 'पुलिस, अग्निशमन, एम्बुलेंस',
        'Women Helpline: 181': 'महिला हेल्पलाइन: 181',
        'National helpline for women in distress': 'संकट में महिलाओं के लिए राष्ट्रीय हेल्पलाइन',
        'NCW Helpline: 7827170170': 'NCW हेल्पलाइन: 7827170170',
        '24x7 NCW direct helpline': '24x7 NCW प्रत्यक्ष हेल्पलाइन',
        'Get in touch': 'संपर्क करें',
        
        // Common Elements
        'Demo': 'डेमो',
        'Functionality Demo & Testing': 'कार्यक्षमता डेमो और परीक्षण',
        'Font Size Control (7 Levels)': 'फ़ॉन्ट आकार नियंत्रण (7 स्तर)',
        'Language Switching': 'भाषा बदलना',
        'Responsive Design': 'उत्तरदायी डिज़ाइन',
        'Implemented Features': 'लागू की गई सुविधाएं',
        'Back to Main Site': '← मुख्य साइट पर वापस'
    },
    
    'ur': {
        // Top Bar & Navigation
        'Government of India': 'حکومت ہند',
        'Skip to Main Content': 'اصل مواد پر جائیں',
        'Language': 'زبان',
        'More': 'مزید',
        'Empower Hub': 'بااختیار بنانے کا مرکز',
        'Home': 'ہوم',
        'About Us': 'ہمارے بارے میں',
        'Services': 'خدمات',
        'Popular Cases': 'مقبول کیسز',
        'How it Works': 'یہ کیسے کام کرتا ہے',
        'Quick Assist': 'فوری مدد',
        'Search...': 'تلاش کریں...',
        
        // Hero Section
        'Access Your': 'اپنے',
        'Rights': 'حقوق حاصل کریں',
        'Secure Your': 'اپنا',
        'Future': 'مستقبل محفوظ کریں',
        "What's new": "نیا کیا ہے",
        'Important information': 'اہم معلومات',
        'View All': 'تمام دیکھیں',
        'Explore': 'دریافت کریں',
        'Description of what\'s new 2 goes here.': 'نئی معلومات کی تفصیل یہاں ہے۔',
        'Document Type': 'دستاویز کی قسم',
        'Important information 1 goes here.': 'اہم معلومات 1 یہاں ہے۔',
        'Important information 2 goes here.': 'اہم معلومات 2 یہاں ہے۔',
        
        // Service Finder
        'Find the right service for you': 'اپنے لیے صحیح سروس تلاش کریں',
        'Tell us about yourself to find out the right services for you': 'اپنے لیے صحیح خدمات معلوم کرنے کے لیے اپنے بارے میں بتائیں',
        'Get Started': 'شروع کریں',
        
        // About Section
        'About Ministry/Department': 'وزارت/شعبہ کے بارے میں',
        'We are dedicated to serving the public by [brief description of the ministry/department\'s mission]. Our team of experienced professionals is committed to [mention a few key objectives or areas of focus].': 'ہم [وزارت/شعبہ کے مشن کی مختصر تفصیل] کے ذریعے عوام کی خدمت کرنے کے لیے وقف ہیں۔ ہماری تجربہ کار پیشہ ور افراد کی ٹیم [کچھ اہم مقاصد یا توجہ کے شعبوں کا ذکر] کے لیے پرعزم ہے۔',
        'We believe in [core values or principles the ministry/department upholds]. We are here to answer your questions and provide you with the information and resources you need.': 'ہم [وزارت/شعبہ کی بنیادی اقدار یا اصولوں] پر یقین رکھتے ہیں۔ ہم آپ کے سوالات کا جواب دینے اور آپ کو ضروری معلومات اور وسائل فراہم کرنے کے لیے یہاں ہیں۔',
        'Know More': 'مزید جانیں',
        
        // Services Section
        'Explore Services by Category': 'زمرے کے مطابق خدمات دریافت کریں',
        'Indian Constitution and Women': 'ہندوستانی آئین اور خواتین',
        'Reproductive Rights': 'تولیدی حقوق',
        'Sexual Offences Against Women': 'خواتین کے خلاف جنسی جرائم',
        'Offences Related to Marriage': 'شادی سے متعلق جرائم',
        'Cyber Crimes Against Women': 'خواتین کے خلاف سائبر جرائم',
        'Women Rights under Bharatiya Nyaya Suraksha Sanhita': 'بھارتیہ نیایا سرکشا سنہتا کے تحت خواتین کے حقوق',
        'Other Offences Relating to Women': 'خواتین سے متعلق دیگر جرائم',
        'Emergency Support & Helplines': 'ایمرجنسی سپورٹ اور ہیلپ لائنز',
        
        // Popular Cases
        'Women Safety': 'خواتین کی حفاظت',
        'Domestic Violence Case': 'گھریلو تشدد کا کیس',
        'Legal Support • Response - 24 hours': 'قانونی سپورٹ • جواب - 24 گھنٹے',
        'Workplace Rights': 'کار کی جگہ کے حقوق',
        'Sexual Harassment': 'جنسی ہراسمنٹ',
        'Legal Aid • Response - 48 hours': 'قانونی امداد • جواب - 48 گھنٹے',
        'Cyber Crime': 'سائبر کرائم',
        'Online Harassment': 'آن لائن ہراسمنٹ',
        'Cyber Cell • Response - 24 hours': 'سائبر سیل • جواب - 24 گھنٹے',
        'Legal Rights': 'قانونی حقوق',
        'Property Rights': 'جائیداد کے حقوق',
        'Legal Consultation • Response - 72 hours': 'قانونی مشورہ • جواب - 72 گھنٹے',
        
        // How it Works
        'Identify Your Need': 'اپنی ضرورت کی شناخت کریں',
        'Browse through our categories to find the right legal support or information you need.': 'آپ کو درکار صحیح قانونی سپورٹ یا معلومات تلاش کرنے کے لیے ہماری زمروں کو دیکھیں۔',
        'Explore Resources': 'وسائل کی تلاش کریں',
        'Access comprehensive guides, legal information, and support services tailored to your situation.': 'آپ کی صورتحال کے مطابق جامع گائیڈز، قانونی معلومات، اور سپورٹ سروسز تک رسائی حاصل کریں۔',
        'Take Action': 'عمل کریں',
        'Use our helpline numbers, file complaints, or connect with legal aid services for immediate support.': 'فوری مدد کے لیے ہمارے ہیلپ لائن نمبرز کا استعمال کریں، شکایات درج کریں، یا قانونی امداد کی خدمات سے رابطہ کریں۔',
        'Get Resolution': 'حل حاصل کریں',
        'Track your case progress and receive ongoing support until your matter is resolved.': 'اپنے کیس کی پیش قدمی کو ٹریک کریں اور جب تک آپ کا معاملہ حل نہیں ہو جاتا تب تک مسلسل مدد حاصل کریں۔',
        
        // Footer
        'Need Support?': 'مدد چاہیے؟',
        'Get immediate help through our 24x7 women helpline numbers and support services': 'ہمارے 24x7 خواتین ہیلپ لائن نمبرز اور سپورٹ سروسز کے ذریعے فوری مدد حاصل کریں',
        'Emergency: 112': 'ایمرجنسی: 112',
        'Police, Fire, Ambulance': 'پولیس، فائر، ایمبولینس',
        'Women Helpline: 181': 'خواتین ہیلپ لائن: 181',
        'National helpline for women in distress': 'مصیبت میں خواتین کے لیے قومی ہیلپ لائن',
        'NCW Helpline: 7827170170': 'NCW ہیلپ لائن: 7827170170',
        '24x7 NCW direct helpline': '24x7 NCW براہ راست ہیلپ لائن',
        'Get in touch': 'رابطہ کریں',
        
        // Common Elements
        'Demo': 'ڈیمو',
        'Functionality Demo & Testing': 'فعالیت کا ڈیمو اور ٹیسٹنگ',
        'Font Size Control (7 Levels)': 'فونٹ سائز کنٹرول (7 لیولز)',
        'Language Switching': 'زبان تبدیل کرنا',
        'Responsive Design': 'ذمہ دار ڈیزائن',
        'Implemented Features': 'نافذ شدہ خصوصیات',
        'Back to Main Site': '← مین سائٹ پر واپس'
    }
};

let currentLanguage = 'en';

function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Update all translatable text elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update all translatable placeholder elements
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.setAttribute('placeholder', translations[lang][key]);
        }
    });
    
    // Update HTML lang attribute and direction for RTL languages
    document.documentElement.lang = lang;
    if (lang === 'ur') {
        document.documentElement.dir = 'rtl';
        document.body.classList.add('rtl');
    } else {
        document.documentElement.dir = 'ltr';
        document.body.classList.remove('rtl');
    }
    
    // Store preference
    localStorage.setItem('language', lang);
    
    // Update language dropdown display
    updateLanguageDisplay(lang);
    
    // Re-scan for new elements that might have been added dynamically
    setTimeout(() => {
        addTranslateAttributes();
        // Apply translations to newly found elements
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    }, 100);
}

function updateLanguageDisplay(lang) {
    const languageNames = {
        'en': 'English',
        'hi': 'हिंदी',
        'ur': 'اردو'
    };
    
    const languageSpan = document.querySelector('.language span:last-child');
    if (languageSpan) {
        languageSpan.textContent = languageNames[lang];
    }
}

// ======== SEARCH FUNCTIONALITY ========
// This manages the search input toggle animation
function toggleSearch() {
    const searchInput = document.querySelector('.search-input');
    searchInput.classList.toggle('active');
    
    if (searchInput.classList.contains('active')) {
        searchInput.focus();
    }
}

// ======== TAB FUNCTIONALITY ========
// This manages the hero section tabs (What's new / Important information)
function initializeTabs() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetTab = link.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            link.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// ======== FAQ ACCORDION FUNCTIONALITY ========
// This manages the expandable FAQ sections
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ======== RESPONSIVE NAVIGATION ========
// This manages mobile menu functionality
function initializeMobileMenu() {
    // Create mobile menu toggle button
    const header = document.querySelector('.main-header .container');
    const nav = document.querySelector('.main-nav');
    
    // Create hamburger menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<span class="material-icons-outlined">menu</span>';
    mobileMenuBtn.style.display = 'none';
    
    // Insert before header-right
    const headerRight = document.querySelector('.header-right');
    header.insertBefore(mobileMenuBtn, headerRight);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('mobile-active');
        const icon = mobileMenuBtn.querySelector('.material-icons-outlined');
        icon.textContent = nav.classList.contains('mobile-active') ? 'close' : 'menu';
    });
}

// ======== SMOOTH SCROLLING ========
// This adds smooth scrolling to anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ======== SCROLL TO SERVICES FUNCTION ========
// Function for the yellow explore button
function scrollToServices() {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        servicesSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ======== LANGUAGE DROPDOWN TOGGLE ========
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('language-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

// ======== TRANSLATE PAGE FUNCTION ========
function translatePage(lang) {
    // Update button states
    document.querySelectorAll('.translate-btn').forEach(btn => {
        btn.style.opacity = '0.7';
        btn.style.transform = 'scale(1)';
    });
    
    const activeBtn = document.querySelector('.translate-btn-' + lang);
    if (activeBtn) {
        activeBtn.style.opacity = '1';
        activeBtn.style.transform = 'scale(1.1)';
    }
    
    // Actually translate the content using the main translation system
    if (typeof changeLanguage === 'function') {
        changeLanguage(lang);
    } else {
        // Fallback: Use Google Translate if main system not available
        translateWithGoogle(lang);
    }
    
    // Store language preference
    localStorage.setItem('selectedLanguage', lang);
    
    // Update top bar language display if exists
    const languageNames = {
        'en': 'English',
        'hi': 'हिंदी',
        'ur': 'اردو'
    };
    
    const currentLangSpan = document.getElementById('current-language');
    if (currentLangSpan) {
        currentLangSpan.textContent = languageNames[lang];
    }
}

// ======== GOOGLE TRANSLATE FALLBACK ========
function translateWithGoogle(lang) {
    // Set document language
    document.documentElement.lang = lang;
    
    // Set RTL for Urdu
    if (lang === 'ur') {
        document.documentElement.dir = 'rtl';
        document.body.classList.add('rtl');
    } else {
        document.documentElement.dir = 'ltr';
        document.body.classList.remove('rtl');
    }
    
    // Try to use Google Translate if available
    if (typeof google !== 'undefined' && google.translate) {
        try {
            google.translate.TranslateElement.getInstance().translatePage(lang);
        } catch (e) {
            console.log('Google Translate not available');
        }
    }
}

// ======== LOADING ANIMATION ========
// This manages the page loading state
function initializePageLoading() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
}

// ======== CLICK TRACKING SYSTEM ========
let clickTracker = {
    clicks: [],
    sessionId: Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    
    track: function(element, action, details = {}) {
        const clickData = {
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            element: element.tagName || 'unknown',
            className: element.className || '',
            id: element.id || '',
            action: action,
            text: element.textContent?.trim().substring(0, 50) || '',
            url: window.location.href,
            page: document.title,
            ...details
        };
        
        this.clicks.push(clickData);
        console.log('Click tracked:', clickData);
        
        // Store in localStorage
        localStorage.setItem('clickTracker', JSON.stringify(this.clicks));
        
        // Send to analytics if available
        this.sendToAnalytics(clickData);
    },
    
    sendToAnalytics: function(data) {
        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', data.action, {
                event_category: 'User Interaction',
                event_label: data.text,
                custom_parameter_1: data.element
            });
        }
        
        // Custom analytics endpoint
        if (window.ANALYTICS_ENDPOINT) {
            fetch(window.ANALYTICS_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).catch(e => console.log('Analytics send failed:', e));
        }
    },
    
    getReport: function() {
        return {
            sessionId: this.sessionId,
            totalClicks: this.clicks.length,
            clicks: this.clicks,
            summary: this.generateSummary()
        };
    },
    
    generateSummary: function() {
        const summary = {};
        this.clicks.forEach(click => {
            const key = click.action;
            summary[key] = (summary[key] || 0) + 1;
        });
        return summary;
    }
};

// Auto-track all clicks
function initializeClickTracking() {
    document.addEventListener('click', function(e) {
        const element = e.target;
        let action = 'click';
        let details = {};
        
        // Determine action type
        if (element.matches('a')) {
            action = 'link_click';
            details.href = element.href;
        } else if (element.matches('button')) {
            action = 'button_click';
        } else if (element.matches('.case-card')) {
            action = 'case_card_click';
        } else if (element.matches('.section-card')) {
            action = 'section_card_click';
        } else if (element.matches('.faq-question')) {
            action = 'faq_click';
        } else if (element.matches('.carousel-btn')) {
            action = 'carousel_navigation';
        } else if (element.matches('.translate-btn')) {
            action = 'language_change';
            details.language = element.className.match(/translate-btn-(\w+)/)?.[1];
        }
        
        clickTracker.track(element, action, details);
    });
    
    // Track form submissions
    document.addEventListener('submit', function(e) {
        clickTracker.track(e.target, 'form_submit', {
            formId: e.target.id,
            formAction: e.target.action
        });
    });
    
    // Track page visibility changes
    document.addEventListener('visibilitychange', function() {
        clickTracker.track(document, document.hidden ? 'page_hidden' : 'page_visible');
    });
}

// Expose tracking functions globally
window.trackClick = function(element, action, details) {
    clickTracker.track(element, action, details);
};

window.getClickReport = function() {
    return clickTracker.getReport();
};

window.clearClickData = function() {
    clickTracker.clicks = [];
    localStorage.removeItem('clickTracker');
};

// ======== CLICK TRACKING ========
let clickData = [];

function trackClick(element, action) {
    const timestamp = new Date().toISOString();
    const pageUrl = window.location.pathname;
    const elementInfo = {
        tag: element.tagName,
        class: element.className,
        id: element.id,
        text: element.textContent?.substring(0, 50)
    };
    
    const clickEvent = {
        timestamp,
        page: pageUrl,
        action,
        element: elementInfo
    };
    
    clickData.push(clickEvent);
    console.log('Click tracked:', clickEvent);
    
    localStorage.setItem('clickTracking', JSON.stringify(clickData));
}

function initializeClickTracking() {
    const stored = localStorage.getItem('clickTracking');
    if (stored) {
        clickData = JSON.parse(stored);
    }
    
    document.addEventListener('click', function(e) {
        trackClick(e.target, 'click');
    });
}

// ======== INITIALIZATION ========
// This runs when the page loads and sets up all functionality
document.addEventListener('DOMContentLoaded', function() {
    // Prevent font size glitch by setting default immediately
    document.body.style.fontSize = '16px';
    document.body.classList.add('loaded');
    
    // Load saved preferences after a small delay to prevent glitches
    setTimeout(() => {
        const savedFontSize = localStorage.getItem('fontSize');
        const savedLanguage = localStorage.getItem('selectedLanguage') || localStorage.getItem('language');
        
        if (savedFontSize) {
            currentFontLevel = parseInt(savedFontSize);
            document.body.style.fontSize = fontSizes[currentFontLevel];
            updateFontButtons();
        }
        
        if (savedLanguage && translations[savedLanguage]) {
            changeLanguage(savedLanguage);
        }
        
        // Load saved language for translate buttons
        const savedTranslateLang = localStorage.getItem('selectedLanguage') || 'en';
        if (typeof translatePage === 'function') {
            translatePage(savedTranslateLang);
        }
    }, 50);
    
    // Add data-translate attributes to translatable elements
    addTranslateAttributes();
    
    // Initialize all functionality
    initializeClickTracking();
    initializeTabs();
    initializeFAQ();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializePageLoading();
    initializeClickTracking();
    
    // Update font buttons on load
    updateFontButtons();
    
    // Create language dropdown
    createLanguageDropdown();
    
    // Apply current language to all elements
    if (currentLanguage !== 'en') {
        setTimeout(() => {
            addTranslateAttributes();
            changeLanguage(currentLanguage);
        }, 200);
    }
});

// ======== AUTOMATIC TRANSLATION ATTRIBUTE ASSIGNMENT ========
// This scans all text content and adds translation attributes automatically
function addTranslateAttributes() {
    // Auto-detect and add translation attributes to all text elements
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button, li, td, th, label, input[type="text"], input[placeholder], textarea');
    
    textElements.forEach(element => {
        const text = element.textContent?.trim();
        const placeholder = element.getAttribute('placeholder');
        
        // Check if element already has data-translate attribute
        if (element.hasAttribute('data-translate')) return;
        
        // Skip empty elements or elements with only icons
        if (!text && !placeholder) return;
        if (text && text.match(/^[\s\n\r]*$/)) return;
        
        // Check for placeholder text
        if (placeholder && translations.en[placeholder]) {
            element.setAttribute('data-translate-placeholder', placeholder);
        }
        
        // Check for regular text content
        if (text && translations.en[text]) {
            element.setAttribute('data-translate', text);
        }
    });
    
    // Manual assignments for specific elements that need special handling
    const specificElements = [
        { selector: '.cta-button', key: 'Quick Assist' },
        { selector: '.search-input', attr: 'placeholder', key: 'Search...' },
        { selector: '.view-all', key: 'View All' },
        { selector: '.explore-btn', key: 'Explore' },
        { selector: '.doc-type', key: 'Document Type' }
    ];
    
    specificElements.forEach(item => {
        const elements = document.querySelectorAll(item.selector);
        elements.forEach(element => {
            if (item.attr === 'placeholder') {
                element.setAttribute('data-translate-placeholder', item.key);
            } else {
                element.setAttribute('data-translate', item.key);
            }
        });
    });
}

// ======== LANGUAGE DROPDOWN FUNCTIONALITY ========
// This creates and manages the language selection dropdown
function createLanguageDropdown() {
    const languageDiv = document.querySelector('.language');
    if (!languageDiv || languageDiv.querySelector('.language-dropdown')) return;
    
    // Create dropdown container
    const dropdown = document.createElement('div');
    dropdown.className = 'language-dropdown';
    dropdown.innerHTML = `
        <div class="dropdown-content">
            <a href="#" onclick="changeLanguage('en'); event.preventDefault(); return false;">English</a>
            <a href="#" onclick="changeLanguage('hi'); event.preventDefault(); return false;">हिंदी</a>
            <a href="#" onclick="changeLanguage('ur'); event.preventDefault(); return false;">اردو</a>
        </div>
    `;
    
    languageDiv.appendChild(dropdown);
    
    // Toggle dropdown on click
    languageDiv.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Close all other dropdowns first
        document.querySelectorAll('.language-dropdown.active').forEach(d => {
            if (d !== dropdown) d.classList.remove('active');
        });
        
        dropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!languageDiv.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
    
    // Close dropdown on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdown.classList.remove('active');
        }
    });
}

// Initialize language dropdown after DOM is loaded
document.addEventListener('DOMContentLoaded', createLanguageDropdown);

// ======== POPULAR CASES CAROUSEL ========
let currentSlide = 0;
const slidesToShow = 3;
let autoSlideInterval;

function moveCarousel(direction) {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.case-card');
    const totalCards = cards.length;
    const maxSlide = Math.max(0, totalCards - slidesToShow);
    
    currentSlide += direction;
    
    if (currentSlide < 0) currentSlide = 0;
    if (currentSlide > maxSlide) currentSlide = maxSlide;
    
    const cardWidth = cards[0].offsetWidth + 32;
    const translateX = -currentSlide * cardWidth;
    
    track.style.transform = `translateX(${translateX}px)`;
    updateCarouselButtons(maxSlide);
    
    // Restart auto-slide after manual navigation
    stopAutoSlide();
    setTimeout(startAutoSlide, 2000);
}

function updateCarouselButtons(maxSlide) {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
    nextBtn.style.opacity = currentSlide === maxSlide ? '0.5' : '1';
    
    prevBtn.style.pointerEvents = currentSlide === 0 ? 'none' : 'auto';
    nextBtn.style.pointerEvents = currentSlide === maxSlide ? 'none' : 'auto';
}

// ======== CASE MODAL FUNCTIONALITY ========
const caseData = {
    'shah-bano': {
        title: 'Shah Bano Case (1985)',
        category: 'Maintenance after divorce',
        summary: 'Shah Bano, a 62-year-old woman, was divorced via instant Triple Talaq after decades of marriage. Left with no financial support, she approached court seeking maintenance under Section 125 CrPC, applicable to all wives unable to maintain themselves.',
        background: 'Elderly woman abandoned after decades of marriage. Fully financially dependent on husband. Divorced instantly without support. No livelihood or savings.',
        suffering: 'Total financial insecurity. No money for food, rent, or healthcare. Social isolation and emotional trauma. Fear of survival in old age.',
        action: 'Filed a maintenance petition under CrPC 125. Challenged husband\'s refusal based on personal law. Pursued the case through multiple courts up to the Supreme Court.',
        judgment: 'Supreme Court ruled: CrPC 125 applies to all women, regardless of religion. Husband MUST pay maintenance if wife cannot maintain herself. Personal laws cannot override constitutional protections.',
        impact: 'Any woman—of any religion—abandoned after divorce can: File under CrPC 125 for monthly maintenance. Seek free help from legal aid services. Obtain court-ordered financial support based on husband\'s income.'
    },
    'danial-latifi': {
        title: 'Danial Latifi vs Union of India (2001)',
        category: 'Long-term financial support for divorced Muslim women',
        summary: 'After the Shah Bano backlash, the govt passed Muslim Women Act (1986). It was misinterpreted to limit maintenance to iddat (3 months). Lawyer Danial Latifi challenged this before the Supreme Court.',
        background: 'Act seemed to weaken rights of divorced Muslim women. Many women were getting only 3 months\' worth of support. Increased poverty and vulnerability.',
        suffering: 'No long-term financial security. Forced dependence on family or remarriage. Poverty after iddat. No stable support for children.',
        action: 'Law challenged by women\'s rights advocates. Petition filed to ensure constitutional interpretation.',
        judgment: 'Supreme Court ruled: Husband must make a "fair and reasonable provision" for wife\'s ENTIRE FUTURE. Payment may be lump-sum or long-term. 1986 Act must be read in line with constitutional protections.',
        impact: 'A divorced Muslim woman can demand: Major long-term financial settlement. Protection from poverty after divorce.'
    },
    'shamim-ara': {
        title: 'Shamim Ara vs State of UP (2002)',
        category: 'Validity of talaq',
        summary: 'Her husband claimed he divorced her years ago using oral talaq but produced no proof. She challenged this fake divorce claim.',
        background: 'Husband fabricated date of divorce. No written proof or witnesses. Used false talaq claim to deny rights.',
        suffering: 'Sudden abandonment. No maintenance. Social pressure and uncertainty. Mental harassment.',
        action: 'Took the case to court. Demanded procedural requirements for talaq.',
        judgment: 'Supreme Court ruled: Talaq MUST follow Quranic procedure. Husband must show: 1. Reasonable cause. 2. Proof of talaq. 3. Attempt at reconciliation. Unsupported talaq claims are INVALID.',
        impact: 'Women can challenge: Fake talaq claims. Undocumented verbal talaq. Forced or manipulated divorces.'
    },
    'shayara-bano': {
        title: 'Shayara Bano vs Union of India (2017)',
        category: 'Instant Triple Talaq',
        summary: 'Shayara Bano was divorced through instantaneous Triple Talaq, losing her marriage and security instantly. She challenged its constitutionality.',
        background: 'Married for years. Husband divorced her suddenly via letter. No chance for reconciliation or response.',
        suffering: 'Shock and emotional trauma. Financial insecurity. Social stigma and humiliation. Loss of marital rights without process.',
        action: 'Filed petition before a Constitutional Bench. Claimed talaq-e-biddat violates Articles 14 & 21.',
        judgment: 'Instant Triple Talaq is unconstitutional. Violates dignity, equality, and due process. Not essential to Islam.',
        impact: 'If husband attempts instant Triple Talaq: It is illegal. She can file FIR under 2019 Act. Husband can face 3 years of imprisonment.'
    },
    'zunaideen': {
        title: 'K. Zunaideen vs Ameena Begum (1998)',
        category: 'Talaq in anger',
        summary: 'Husband pronounced talaq in anger during a fight. Wife challenged its validity.',
        background: 'Frequent disputes. Husband emotionally unstable. No attempt at reconciliation.',
        suffering: 'Emotional abuse. Sudden marital breakup. No financial stability. Lack of clarity about marriage status.',
        action: 'Filed legal challenge. Argued that talaq violated procedure.',
        judgment: 'Court held: Talaq in anger is not valid. Divorce must be thoughtful, deliberate, and follow set steps.',
        impact: 'A woman can challenge: Emotional, impulsive talaq. Divorce pronounced during fights.'
    },
    'hina': {
        title: 'Hina Case (2020)',
        category: 'Illegal Triple Talaq',
        summary: 'Hina\'s husband attempted instant Triple Talaq even after the 2019 Act banned it.',
        background: 'Husband repeatedly threatened talaq. Emotional blackmail. Continued illegal practice.',
        suffering: 'Fear of illegal divorce. Domestic harassment. No stability for children.',
        action: 'Filed FIR under Triple Talaq (2019) Act.',
        judgment: 'Husband arrested. Case registered. Provided safety to woman.',
        impact: 'Women can immediately: File FIR. Seek police protection. Stop illegal divorce attempts.'
    },
    'vishaka': {
        title: 'Vishaka vs State of Rajasthan (1997)',
        category: 'Workplace harassment',
        summary: 'Filed after social worker Bhanwari Devi was assaulted for preventing child marriage.',
        background: 'No workplace harassment law existed. Women unsafe in field jobs.',
        suffering: 'Assault. Social pressure. Trauma and injustice.',
        action: 'Women\'s groups filed PIL demanding protection.',
        judgment: 'Supreme Court created Vishaka Guidelines: Mandatory internal complaint committees. Employer responsibility for safety.',
        impact: 'Women can complain under POSH Act in ANY workplace (schools, colleges, offices).'
    },
    'laxmi': {
        title: 'Laxmi vs Union of India (2013)',
        category: 'Acid attacks',
        summary: 'Teenager Laxmi survived an acid attack and filed PIL demanding stricter laws.',
        background: 'Acid was sold freely to anyone. Attackers faced weak punishment.',
        suffering: 'Permanent injuries. Psychological trauma. Expensive medical operations.',
        action: 'Filed PIL to regulate acid sales.',
        judgment: 'Acid cannot be sold without ID. Stronger punishments introduced. Victims must receive compensation.',
        impact: 'Acid buyers must provide ID. Police must act immediately on complaints.'
    },
    'nirbhaya': {
        title: 'Nirbhaya Case (2012–2017)',
        category: 'Sexual violence',
        summary: 'A young woman was brutally assaulted in Delhi, triggering nationwide protests.',
        background: 'Lack of fast police response. Weak sexual assault laws.',
        suffering: 'Life-threatening injuries. Emotional and physical trauma. National outrage.',
        action: 'Fast-track court trial. Justice Verma Committee formed.',
        judgment: 'Death penalty for convicts. Stronger rape laws created.',
        impact: 'Women now have: Faster trials. Harsher punishments for offenders. Protection against stalking & voyeurism.'
    }
};

function openCaseModal(caseId) {
    const modal = document.getElementById('case-modal');
    const data = caseData[caseId];
    
    if (!data) return;
    
    // Populate modal content
    document.getElementById('modal-case-title').textContent = data.title;
    document.getElementById('modal-case-category').textContent = data.category;
    document.getElementById('modal-summary').textContent = data.summary;
    document.getElementById('modal-background').textContent = data.background;
    document.getElementById('modal-suffering').textContent = data.suffering;
    document.getElementById('modal-action').textContent = data.action;
    document.getElementById('modal-judgment').textContent = data.judgment;
    document.getElementById('modal-impact').textContent = data.impact;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCaseModal() {
    const modal = document.getElementById('case-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on outside click
document.addEventListener('click', function(e) {
    const modal = document.getElementById('case-modal');
    if (e.target === modal) {
        closeCaseModal();
    }
});

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCaseModal();
    }
});

function moveCarousel(direction) {
    const wrapper = document.querySelector('.carousel-wrapper');
    const cardWidth = 300;
    
    wrapper.scrollBy({
        left: direction * cardWidth,
        behavior: 'smooth'
    });
}

// Touch/swipe support for mobile
let startX = 0;
let isDragging = false;

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;
    
    track.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    track.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    track.addEventListener('touchend', function(e) {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                moveCarousel(1); // Swipe left - next
            } else {
                moveCarousel(-1); // Swipe right - prev
            }
        }
        
        isDragging = false;
    });
});