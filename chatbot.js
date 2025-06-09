// NAARAD Chatbot Script
(function() {
  const btn = document.getElementById('narayan-chatbot-btn');
  const windowEl = document.getElementById('narayan-chatbot-window');
  const form = document.getElementById('narayan-chat-form');
  const input = document.getElementById('narayan-chat-input');
  const messages = document.getElementById('narayan-chat-messages');
  const chatPopup = document.querySelector('.chat-popup');

  // Language support
  let narayanLang = null; // null until chosen
  let langChosen = false;

  const botTexts = {
    en: {
      greet: "Hello! I am NAARAD, your assistant. How can I help you today? <br>Options: About Us, Gallery, Donate, Contact, Volunteer, Products, Treatment Options.<br><b>NARAYAN...NARAYAN...</b>",
      options: "You can ask about: About Us, Gallery, Donate, Contact, Volunteer, Products, Treatment Options.",
      about: 'You can learn about our trust in the About Us section. <a href="#about" onclick="document.getElementById(\'about\').scrollIntoView({behavior: \'smooth\'});return false;">Go to About Us</a>.',
      gallery: 'See our cattle and activities in the Gallery. <a href="#gallery" onclick="document.getElementById(\'gallery\').scrollIntoView({behavior: \'smooth\'});return false;">Go to Gallery</a>.',
      donate: 'Support us by donating! <a href="#donate" onclick="document.getElementById(\'donate\').scrollIntoView({behavior: \'smooth\'});return false;">Go to Donate</a>.',
      contact: 'Contact us for any queries. <a href="#contact" onclick="document.getElementById(\'contact\').scrollIntoView({behavior: \'smooth\'});return false;">Go to Contact</a>.',
      volunteer: 'Join us as a volunteer! <a href="#volunteer" onclick="document.getElementById(\'volunteer\').scrollIntoView({behavior: \'smooth\'});return false;">Go to Volunteer</a>.',
      products: 'Check out our products for sale. <a href="#products" onclick="document.getElementById(\'products\').scrollIntoView({behavior: \'smooth\'});return false;">Go to Products</a>.',
      treatment: 'See our cattle treatment options. <a href="treatment-options.html">Go to Treatment Options</a>.',
      language: 'Please choose a language: <button class="narayan-lang-btn" data-lang="en">English</button> <button class="narayan-lang-btn" data-lang="hi">हिन्दी</button> <button class="narayan-lang-btn" data-lang="mr">मराठी</button> <button class="narayan-lang-btn" data-lang="hi-latin">Hinglish</button>',
      setlang: 'Language set to: ' // will append language name
    },
    hi: {
      greet: "नमस्ते! मैं नारद हूँ, आपकी सहायता के लिए। आप क्या जानना चाहते हैं? <br>विकल्प: हमारे बारे में, गैलरी, दान, संपर्क, स्वयंसेवक, उत्पाद, उपचार विकल्प।<br><b>नारायण...नारायण...</b>",
      options: "आप पूछ सकते हैं: हमारे बारे में, गैलरी, दान, संपर्क, स्वयंसेवक, उत्पाद, उपचार विकल्प।",
      about: 'हमारे बारे में अनुभाग में ट्रस्ट के बारे में जानें। <a href="#about" onclick="document.getElementById(\'about\').scrollIntoView({behavior: \'smooth\'});return false;">यहाँ जाएं</a>.',
      gallery: 'गैलरी में हमारे पशु और गतिविधियाँ देखें। <a href="#gallery" onclick="document.getElementById(\'gallery\').scrollIntoView({behavior: \'smooth\'});return false;">यहाँ जाएं</a>.',
      donate: 'दान करके हमारा समर्थन करें! <a href="#donate" onclick="document.getElementById(\'donate\').scrollIntoView({behavior: \'smooth\'});return false;">यहाँ जाएं</a>.',
      contact: 'किसी भी प्रश्न के लिए संपर्क करें। <a href="#contact" onclick="document.getElementById(\'contact\').scrollIntoView({behavior: \'smooth\'});return false;">यहाँ जाएं</a>.',
      volunteer: 'स्वयंसेवक के रूप में जुड़ें! <a href="#volunteer" onclick="document.getElementById(\'volunteer\').scrollIntoView({behavior: \'smooth\'});return false;">यहाँ जाएं</a>.',
      products: 'हमारे बिक्री के उत्पाद देखें। <a href="#products" onclick="document.getElementById(\'products\').scrollIntoView({behavior: \'smooth\'});return false;">यहाँ जाएं</a>.',
      treatment: 'हमारे पशु उपचार विकल्प देखें। <a href="treatment-options.html">यहाँ जाएं</a>.',
      language: 'कृपया भाषा चुनें: <button class="narayan-lang-btn" data-lang="en">English</button> <button class="narayan-lang-btn" data-lang="hi">हिन्दी</button> <button class="narayan-lang-btn" data-lang="mr">मराठी</button> <button class="narayan-lang-btn" data-lang="hi-latin">Hinglish</button>',
      setlang: 'भाषा सेट की गई: '
    },
    mr: {
      greet: "नमस्कार! मी नारद, तुमची मदत करण्यासाठी येथे आहे. तुम्हाला कशाबद्दल माहिती हवी आहे? <br>पर्याय: आमच्याबद्दल, गॅलरी, देणगी, संपर्क, स्वयंसेवक, उत्पादने, उपचार पर्याय.<br><b>नारायण...नारायण...</b>",
      options: "तुम्ही विचारू शकता: आमच्याबद्दल, गॅलरी, देणगी, संपर्क, स्वयंसेवक, उत्पादने, उपचार पर्याय.",
      about: 'आमच्याबद्दल विभागात ट्रस्टबद्दल जाणून घ्या. <a href="#about" onclick="document.getElementById(\'about\').scrollIntoView({behavior: \'smooth\'});return false;">येथे जा</a>.',
      gallery: 'गॅलरीमध्ये आमची जनावरे आणि उपक्रम पहा. <a href="#gallery" onclick="document.getElementById(\'gallery\').scrollIntoView({behavior: \'smooth\'});return false;">येथे जा</a>.',
      donate: 'आम्हाला देणगी देऊन समर्थन करा! <a href="#donate" onclick="document.getElementById(\'donate\').scrollIntoView({behavior: \'smooth\'});return false;">येथे जा</a>.',
      contact: 'कोणत्याही प्रश्नासाठी संपर्क करा. <a href="#contact" onclick="document.getElementById(\'contact\').scrollIntoView({behavior: \'smooth\'});return false;">येथे जा</a>.',
      volunteer: 'स्वयंसेवक म्हणून सामील व्हा! <a href="#volunteer" onclick="document.getElementById(\'volunteer\').scrollIntoView({behavior: \'smooth\'});return false;">येथे जा</a>.',
      products: 'आमची विक्रीसाठी उत्पादने पहा. <a href="#products" onclick="document.getElementById(\'products\').scrollIntoView({behavior: \'smooth\'});return false;">येथे जा</a>.',
      treatment: 'आमचे जनावरांचे उपचार पर्याय पहा. <a href="treatment-options.html">येथे जा</a>.',
      language: 'कृपया भाषा निवडा: <button class="narayan-lang-btn" data-lang="en">English</button> <button class="narayan-lang-btn" data-lang="hi">हिन्दी</button> <button class="narayan-lang-btn" data-lang="mr">मराठी</button> <button class="narayan-lang-btn" data-lang="hi-latin">Hinglish</button>',
      setlang: 'भाषा निवडली: '
    },
    'hi-latin': {
      greet: "Namaste! Main NAARAD hoon, aapki sahayata ke liye. Aap kya jaanna chahte hain? <br>Vikalp: Hamare baare mein, Gallery, Daana, Sampark, Swayamsevak, Utpad, Upchaar Vikalp.<br><b>NARAYAN...NARAYAN...</b>",
      options: "Aap pooch sakte hain: Hamare baare mein, Gallery, Daana, Sampark, Swayamsevak, Utpad, Upchaar Vikalp.",
      about: 'Hamare baare mein section mein trust ke baare mein jaanein. <a href="#about" onclick="document.getElementById(\'about\').scrollIntoView({behavior: \'smooth\'});return false;">Yahan jaayein</a>.',
      gallery: 'Gallery mein hamare pashu aur gatividhiyan dekhein. <a href="#gallery" onclick="document.getElementById(\'gallery\').scrollIntoView({behavior: \'smooth\'});return false;">Yahan jaayein</a>.',
      donate: 'Daana karke hamara samarthan karein! <a href="#donate" onclick="document.getElementById(\'donate\').scrollIntoView({behavior: \'smooth\'});return false;">Yahan jaayein</a>.',
      contact: 'Kisi bhi prashn ke liye sampark karein. <a href="#contact" onclick="document.getElementById(\'contact\').scrollIntoView({behavior: \'smooth\'});return false;">Yahan jaayein</a>.',
      volunteer: 'Swayamsevak ke roop mein jud jaayein! <a href="#volunteer" onclick="document.getElementById(\'volunteer\').scrollIntoView({behavior: \'smooth\'});return false;">Yahan jaayein</a>.',
      products: 'Hamare bikri ke utpad dekhein. <a href="#products" onclick="document.getElementById(\'products\').scrollIntoView({behavior: \'smooth\'});return false;">Yahan jaayein</a>.',
      treatment: 'Hamare pashuon ke upchaar vikalp dekhein. <a href="treatment-options.html">Yahan jaayein</a>.',
      language: 'Kripya bhasha chunein: <button class="narayan-lang-btn" data-lang="en">English</button> <button class="narayan-lang-btn" data-lang="hi">हिन्दी</button> <button class="narayan-lang-btn" data-lang="mr">मराठी</button> <button class="narayan-lang-btn" data-lang="hi-latin">Hinglish</button>',
      setlang: 'Bhasha set ki gayi: '
    }
  };

  // Helper: get narayan phrase for current language
  function getNarayanPhrase() {
    switch (narayanLang) {
      case 'hi': return 'नारायण...नारायण...';
      case 'mr': return 'नारायण...नारायण...';
      case 'hi-latin': return 'NARAYAN...NARAYAN...';
      default: return 'NARAYAN...NARAYAN...';
    }
  }

  // Add typing indicator
  function addTypingIndicator() {
    const div = document.createElement('div');
    div.className = 'narayan-message narayan-bot typing';
    div.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  // Remove typing indicator
  function removeTypingIndicator(indicator) {
    if (indicator && indicator.parentNode) {
      indicator.parentNode.removeChild(indicator);
    }
  }

  // Add bot message with typing effect
  async function addBotMessageWithTyping(msg) {
    const phrase = getNarayanPhrase();
    const fullMessage = phrase + '<br>' + msg + '<br>' + phrase;
    const typingIndicator = addTypingIndicator();
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    removeTypingIndicator(typingIndicator);
    
    const div = document.createElement('div');
    div.className = 'narayan-message narayan-bot';
    div.innerHTML = fullMessage;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    
    // Add event listeners for language buttons if present
    div.querySelectorAll('.narayan-lang-btn').forEach(btn => {
      btn.onclick = function() {
        setLanguage(btn.getAttribute('data-lang'), btn.innerText);
      };
    });
  }

  // Toggle chat window
  btn.addEventListener('click', () => {
    windowEl.classList.toggle('closed');
    if (!windowEl.classList.contains('closed')) {
      chatPopup.style.display = 'none';
      setTimeout(() => { messages.scrollTop = messages.scrollHeight; }, 100);
      if (!langChosen) {
        showLanguagePrompt();
      } else if (!messages.querySelector('.narayan-bot')) {
        addBotMessageWithTyping(botTexts[narayanLang].greet);
      }
    } else {
      chatPopup.style.display = 'block';
    }
  });

  // Handle form submit
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const userMsg = input.value.trim();
    if (!userMsg) return;
    addUserMessage(userMsg);
    if (!langChosen) {
      // Try to detect language from user input
      const m = userMsg.toLowerCase();
      if (m.includes('english')) {
        setLanguage('en', 'English');
      } else if (m.includes('hindi') || m.includes('हिन्दी')) {
        setLanguage('hi', 'हिन्दी');
      } else if (m.includes('marathi') || m.includes('मराठी')) {
        setLanguage('mr', 'मराठी');
      } else if (m.includes('hinglish')) {
        setLanguage('hi-latin', 'Hinglish');
      } else {
        await addBotMessageWithTyping(botTexts.en.language);
      }
      input.value = '';
      return;
    }
    await respondToUser(userMsg);
    input.value = '';
  });

  // Add user message
  function addUserMessage(msg) {
    const div = document.createElement('div');
    div.className = 'narayan-message narayan-user';
    div.innerText = msg;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  async function setLanguage(lang, label) {
    narayanLang = lang;
    langChosen = true;
    await addBotMessageWithTyping(botTexts[narayanLang].setlang + label + '.<br>' + botTexts[narayanLang].greet);
  }

  // Respond to user
  async function respondToUser(msg) {
    const m = msg.toLowerCase();
    let reply = '';
    if (m.includes('language') || m.includes('bhasha') || m.includes('भाषा')) {
      reply = botTexts[narayanLang].language;
    } else if (m.includes('about')) {
      reply = botTexts[narayanLang].about;
    } else if (m.includes('gallery')) {
      reply = botTexts[narayanLang].gallery;
    } else if (m.includes('donate') || m.includes('daan') || m.includes('दान')) {
      reply = botTexts[narayanLang].donate;
    } else if (m.includes('contact') || m.includes('sampark') || m.includes('संपर्क')) {
      reply = botTexts[narayanLang].contact;
    } else if (m.includes('volunteer') || m.includes('swayamsevak') || m.includes('स्वयंसेवक')) {
      reply = botTexts[narayanLang].volunteer;
    } else if (m.includes('product') || m.includes('utpad') || m.includes('उत्पाद')) {
      reply = botTexts[narayanLang].products;
    } else if (m.includes('treatment') || m.includes('upchaar') || m.includes('उपचार')) {
      reply = botTexts[narayanLang].treatment;
    } else if (m.includes('hello') || m.includes('hi') || m.includes('namaste') || m.includes('नमस्ते')) {
      reply = botTexts[narayanLang].greet;
    } else {
      reply = botTexts[narayanLang].options;
    }
    await addBotMessageWithTyping(reply);
  }

  // Show language selection as first message
  function showLanguagePrompt() {
    messages.innerHTML = '';
    addBotMessageWithTyping(botTexts.en.language); // Always show in English for prompt
  }

  // On load, always show language prompt in chat window (if opened)
  if (!windowEl.classList.contains('closed')) {
    showLanguagePrompt();
  }
})(); 
