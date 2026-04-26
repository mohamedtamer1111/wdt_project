// 1. الحماية وعرض الاسم
if (localStorage.getItem('isLogged') !== 'true') window.location.href = 'auth.html';
document.getElementById('welcomeText').innerText = "Welcome, " + (localStorage.getItem('activeUser') || 'Pharmacist');

// 2. قاعدة البيانات (محدثة بمسارات الصور والفوائد التفصيلية)
const plants = [
    { name: "Aloe Vera", sci: "Aloe barbadensis", img: "pictures/aloe-vera.jpg", tags: ["Legal", "Year-round", "Common"], 
      uses: ["Soothes severe sunburns and skin inflammation", "Accelerates the healing of minor cuts and wounds", "Acts as a natural deep moisturizer for the skin"] },
    
    { name: "Anise", sci: "Pimpinella anisum", img: "pictures/anise.jpg", tags: ["Legal", "Spring", "Common"], 
      uses: ["Relieves digestive issues and abdominal bloating", "Acts as an expectorant to clear respiratory mucus", "Reduces symptoms of infant colic and gas"],
      growthLink: "https://www.youtube.com/embed/uu4pOyefKXM" },
    
    { name: "Basil", sci: "Ocimum basilicum", img: "pictures/basil.jpg", tags: ["Legal", "Summer", "Common"], 
      uses: ["Contains powerful antioxidants that reduce inflammation", "Helps alleviate nausea and motion sickness", "Supports the immune system with antimicrobial properties"] ,
      growthLink: "https://www.theseedcollection.com.au/growguide/basil-seeds",},
    
    { name: "Black Cumin", sci: "Nigella sativa", img: "pictures/black_cumin.jpg", tags: ["Legal", "Winter", "Common"], 
      uses: ["Boosts overall immunity against viral infections", "Helps manage asthma and respiratory allergies", "Regulates blood sugar levels and supports heart health"] },
    
    { name: "Blue Lotus", sci: "Nymphaea caerulea", img: "pictures/Blue-Lotus.jpg", tags: ["Restricted", "Summer", "Rare"], 
      uses: ["Promotes deep sleep and cures insomnia", "Reduces high levels of anxiety and psychological stress", "Used traditionally to induce mild relaxation and vivid dreaming"] },
    
    { name: "Chamomile", sci: "Matricaria chamomilla", img: "pictures/chamomile.jpg", tags: ["Legal", "Spring", "Common"], 
      uses: ["Natural sedative for calming the nervous system", "Relieves stomach cramps and digestive disorders", "Used as a topical wash for skin irritations and eczema"] },
    
    { name: "Peppermint", sci: "Mentha piperita", img: "pictures/peppermint.jpg", tags: ["Legal", "Year-round", "Common"], 
      uses: ["Relieves tension headaches when applied topically", "Treats Irritable Bowel Syndrome (IBS) symptoms", "Clears nasal congestion during common colds"] },
    
    { name: "Hibiscus", sci: "Hibiscus sabdariffa", img: "pictures/hibicus.jpg", tags: ["Legal", "Summer", "Common"], 
      uses: ["Effectively lowers high blood pressure", "Rich in Vitamin C to support cardiovascular health", "Helps in weight management by inhibiting starch absorption"] },
    
    { name: "Ginger", sci: "Zingiber officinale", img: "pictures/ginger.jpg", tags: ["Legal", "Winter", "Common"], 
      uses: ["Powerful remedy for morning sickness and flu", "Reduces chronic joint pain and muscle soreness", "Improves blood circulation and prevents blood clots"] },
    
    { name: "Thyme", sci: "Thymus vulgaris", img: "pictures/thyme.jpg", tags: ["Legal", "Year-round", "Common"], 
      uses: ["Treats persistent sore throats and dry coughs", "Natural antiseptic for mouth and gum infections", "Boosts the production of white blood cells"] },
    
    { name: "Rosemary", sci: "Rosmarinus officinalis", img: "pictures/rosemary.jpg", tags: ["Legal", "Year-round", "Common"], 
      uses: ["Enhances memory performance and mental focus", "Stimulates hair follicles for faster hair growth", "Protects cells from oxidative damage and aging"] },
    
    { name: "Sage", sci: "Salvia officinalis", img: "pictures/sage.jpg", tags: ["Legal", "Fall", "Common"], 
      uses: ["Balances hormones during menopause symptoms", "Effective treatment for sore throats and mouth ulcers", "Improves brain function and cognitive memory"] },
    
    { name: "Senna", sci: "Cassia angustifolia", img: "pictures/senna.jpg", tags: ["Restricted", "Summer", "Common"], 
      uses: ["Strong natural laxative for acute constipation", "Used for bowel preparation before medical surgeries", "Helps detoxify the colon by stimulating movement"] },
    
    { name: "Licorice", sci: "Glycyrrhiza glabra", img: "pictures/licorice.jpg", tags: ["Legal", "Spring", "Common"], 
      uses: ["Soothes stomach ulcers and acid reflux", "Relieves respiratory congestion and bronchitis", "Acts as a natural anti-inflammatory for the liver"] },
    
    { name: "Fenugreek", sci: "Trigonella foenum-graecum", img: "pictures/fenugreek.jpg", tags: ["Legal", "Spring", "Common"], 
      uses: ["Stimulates milk production for lactating mothers", "Helps lower blood sugar levels in diabetic patients", "Reduces skin inflammation and treats boils"] },
    
    { name: "Moringa", sci: "Moringa oleifera", img: "pictures/moringa.jpg", tags: ["Legal", "Summer", "Common"], 
      uses: ["Provides a massive boost of natural vitamins and minerals", "Increases energy levels and fights chronic fatigue", "Protects the liver and supports detoxification"] },
    
    { name: "Fennel", sci: "Foeniculum vulgare", img: "pictures/fennel.jpg", tags: ["Legal", "Fall", "Common"], 
      uses: ["Improves digestion and prevents intestinal gas", "Supports eye health and reduces inflammation", "Helps regulate the menstrual cycle and reduces pain"] },
    
    { name: "Dill", sci: "Anethum graveolens", img: "pictures/dill.jpg", tags: ["Legal", "Spring", "Common"], 
      uses: ["Treats infant colic and digestive spasms", "Acts as a mild appetite stimulant for children", "Rich in calcium for maintaining bone density"] },
    
    { name: "Coriander", sci: "Coriandrum sativum", img: "pictures/Coriander.JPG", tags: ["Legal", "Winter", "Common"], 
      uses: ["Helps the body detox from heavy metals", "Promotes healthy digestion and prevents bloating", "Lowers bad cholesterol (LDL) levels in the blood"] },
    
    { name: "Juniper", sci: "Juniperus communis", img: "pictures/Juniper.jpg", tags: ["Restricted", "Winter", "Rare"], 
      uses: ["Acts as a powerful diuretic for urinary health", "Helps in treating kidney stones and infections", "Relieves joint pain and rheumatic symptoms"] },
    
    { name: "Marjoram", sci: "Origanum majorana", img: "pictures/marjoram.jpg", tags: ["Legal", "Summer", "Common"], 
      uses: ["Relieves nerve pain and muscle spasms", "Supports hormonal balance and regulates cycles", "Improves heart health by reducing artery stiffness"] },
    
    { name: "Henna", sci: "Lawsonia inermis", img: "pictures/henna.jpg", tags: ["Legal", "Summer", "Common"], 
      uses: ["Natural cooling agent for skin during fever", "Treats fungal infections of the skin and nails", "Used as a natural hair dye and scalp conditioner"] },
    
    { name: "Mustard", sci: "Brassica nigra", img: "pictures/mustard.jpg", tags: ["Legal", "Winter", "Common"], 
      uses: ["Improves blood circulation and clears sinuses", "Relieves muscle pain when used as a topical plaster", "Stimulates appetite and aids in protein digestion"] },
    
    { name: "Caraway", sci: "Carum carvi", img: "pictures/caraway.jpg", tags: ["Legal", "Spring", "Common"], 
      uses: ["Effective remedy for chronic bloating and gas", "Helps in weight loss by suppressing appetite", "Relieves spasms of the digestive tract"] }
];

// 3. نظام النقاط المتكامل
let userPoints = parseInt(localStorage.getItem('userPoints')) || 0;
let readPlants = JSON.parse(localStorage.getItem('readPlants')) || [];
let solvedQuizzes = JSON.parse(localStorage.getItem('solvedQuizzes')) || [];

function updatePointsDisplay() {
    let pointsEl = document.getElementById('userPoints');
    if (pointsEl) {
        pointsEl.innerText = userPoints;
    }
}

// 4. عرض النباتات والفلاتر  لعرض الفائدة   
function render(data) {
    const grid = document.getElementById('plantsGrid');
    document.getElementById('count').innerText = data.length;
    grid.innerHTML = data.map(p => `
        <div class="plant-card" onclick="openModal('${p.name}')" style="cursor:pointer;" title="Click to view details">
            <div class="img-box"><img src="${p.img}" alt="${p.name}"></div>
            <div class="card-body">
                <h3 style="margin:0; color:var(--primary-green)">🍃 ${p.name}</h3>
                <p style="font-style:italic; font-size:12px; color:#777; margin:5px 0;">${p.sci}</p>
                <div style="margin:10px 0;">
                    ${p.tags.map(t => `<span class="tag ${t === 'Legal' ? 'tag-legal' : t === 'Restricted' ? 'tag-restricted' : 'tag-season'}">${t}</span>`).join('')}
                </div>
                <div style="font-size:12px; color:#444; line-height: 1.4;"><b>Main Benefit:</b> ${p.uses[0].substring(0, 50)}...</div>
            </div>
        </div>
    `).join('');
}

// 4. عرض النباتات والفلاتر (محدثة للبحث بالاسم العلمي)
function update() {
    let f = plants.filter(p => {
        let s = document.getElementById('mainSearch').value.toLowerCase();
        let sea = document.getElementById('seasonSelect').value;
        let sta = document.getElementById('statusSelect').value;
        let ava = document.getElementById('availSelect').value;
        
        // 👇 هنا ضفنا البحث بالاسم العلمي: p.sci.toLowerCase().includes(s) 👇
        return (p.name.toLowerCase().includes(s) || 
                p.sci.toLowerCase().includes(s) || 
                p.uses.some(u => u.toLowerCase().includes(s))) &&
               (sea === 'all' || p.tags.includes(sea)) &&
               (sta === 'all' || p.tags.includes(sta)) &&
               (ava === 'all' || p.tags.includes(ava));
    });
    
    if(document.getElementById('sortSelect').value === 'name-desc') f.sort((a,b)=>b.name.localeCompare(a.name));
    else f.sort((a,b)=>a.name.localeCompare(b.name));
    
    render(f);
}

// 5. نظام الكويز والنافذة المنبثقة
function openModal(plantName) {
    let p = plants.find(x => x.name === plantName);
    if (!p) return;

    // مكافأة القراءة
    if (!readPlants.includes(p.name)) {
        userPoints += 5;
        readPlants.push(p.name);
        localStorage.setItem('userPoints', userPoints);
        localStorage.setItem('readPlants', JSON.stringify(readPlants));
        updatePointsDisplay();
    }

    let modalHtml = `
        <div id="plantInfo">
            <div style="display:flex; gap:20px; border-bottom:1px solid #eee; padding-bottom:15px; margin-bottom:15px;">
                <img src="${p.img}" alt="${p.name}" style="width:120px; height:120px; border-radius:12px; object-fit:cover;">
                <div>
                    <h2 style="margin: 0 0 5px 0; color: #00703c; font-size: 24px;">🍃 ${p.name}</h2>
                    <p style="margin: 5px 0; color: #666; font-style: italic;">${p.sci}</p>
                    <div style="margin-top: 10px;">
                        ${p.tags.map(t => `<span class="tag ${t === 'Legal' ? 'tag-legal' : t === 'Restricted' ? 'tag-restricted' : 'tag-season'}">${t}</span>`).join('')}
                    </div>
                </div>
            </div>
            <div>
                <h3 style="color: #333; margin-bottom: 10px;">💡 Medical Uses & Benefits</h3>
                <ul style="line-height: 1.6; color: #444; padding-left: 20px; margin-bottom: 15px;">
                    ${p.uses.map(use => `<li style="margin-bottom: 5px;">${use}</li>`).join('')}
                </ul>
                
                <div style="margin-bottom: 15px;">
                    <a href="${p.growthLink}" target="_blank" style="display:inline-block; background-color:#4CAF50; color:white; padding:8px 15px; border-radius:8px; text-decoration:none; font-weight:bold; font-size:14px;">
                        🌱 How to grow this plant
                    </a>
                </div>
                <p style="font-size: 13px; color: #00703c; background: #e8f5e9; padding: 10px; border-radius: 8px; margin-top: 15px;">
                    💡 You earned +5 points for reading about this plant! Take the quiz below to earn +10 more.
                </p>
            </div>
        </div>
    `;

    if (!solvedQuizzes.includes(p.name)) {
        modalHtml += `
            <div class="quiz-section" id="quizSection">
                <button class="quiz-btn" onclick="startQuiz('${p.name}')">Take Quiz (10 Points)</button>
            </div>
        `;
    } else {
        modalHtml += `<div class="quiz-section"><p style="color:green; font-weight:bold; text-align:center; margin-top:15px;">✅ You already completed this quiz!</p></div>`;
    }

    document.getElementById('modalBody').innerHTML = modalHtml;
    document.getElementById('plantModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('plantModal').style.display = 'none';
}

window.onclick = function(event) {
    let modal = document.getElementById('plantModal');
    if (event.target == modal) {
        closeModal();
    }
}

function startQuiz(plantName) {
    // إخفاء معلومات النبتة   
    document.getElementById('plantInfo').style.display = 'none';

    let p = plants.find(x => x.name === plantName);
    let correctUse = p.uses[0];
    let allUses = plants.flatMap(plant => plant.uses);
    let wrongUses = allUses.filter(u => !p.uses.includes(u)).sort(() => 0.5 - Math.random()).slice(0, 2);
    let options = [correctUse, ...wrongUses].sort(() => Math.random() - 0.5);

    let quizHtml = `
        <h4 style="margin-top:0; color:#333; margin-bottom:15px;">Question: What is one of the main uses of ${p.name}?</h4>
        <div style="display:flex; flex-direction:column; gap:10px;">
            ${options.map(opt => `
                <button class="quiz-btn quiz-option" style="text-align:left; padding:12px; font-size:14px; line-height:1.4;" onclick="checkAnswer('${p.name}', '${opt}', '${correctUse}')">${opt}</button>
            `).join('')}
        </div>
    `;
    document.getElementById('quizSection').innerHTML = quizHtml;
}

function checkAnswer(plantName, selected, correct) {
    if (selected === correct) {
        userPoints += 10;
        solvedQuizzes.push(plantName);
        localStorage.setItem('userPoints', userPoints);
        localStorage.setItem('solvedQuizzes', JSON.stringify(solvedQuizzes));
        updatePointsDisplay();
        document.getElementById('quizSection').innerHTML = `<p style="color:green; font-weight:bold; text-align:center; font-size:16px; margin-top:15px;">🎉 Correct Answer! You earned +10 points.</p>`;
    } else {
        document.getElementById('quizSection').innerHTML += `<p style="color:red; font-size:13px; text-align:center; margin-top:10px;">❌ Incorrect answer. Read the benefits and try again!</p>`;
        // إرجاع المعلومات مرة أخرى بعد الإجابة الخاطئة
        setTimeout(() => {
            document.getElementById('plantInfo').style.display = 'block';
            document.getElementById('quizSection').innerHTML = `<button class="quiz-btn" onclick="startQuiz('${plantName}')">Try Quiz Again</button>`;
        }, 2000);
    }
}

// 6. المساعد الذكي
function toggleChat() { 
    let chatWin = document.getElementById('chat-window');
    chatWin.style.display = (chatWin.style.display === 'flex') ? 'none' : 'flex'; 
}

function sendChat() {
    let inp = document.getElementById('chatInput');
    let msg = inp.value.trim().toLowerCase();
    if(!msg) return;

    appendMsg(inp.value, 'user');
    inp.value = '';

    setTimeout(() => {
        let reply = "I'm not sure about that. Try asking about a symptom like 'cough' or 'skin'.";
        
        plants.forEach(p => {
            // البحث في الجمل الطويلة
            if(p.uses.some(u => u.toLowerCase().includes(msg))) {
                reply = `For that, I recommend ${p.name}. It helps with: ${p.uses[0].toLowerCase()}.`;
            }
            if(msg.includes(p.name.toLowerCase())) {
                reply = `${p.name} (${p.sci}) is very useful. One of its main benefits is that it ${p.uses[0].toLowerCase()}.`;
            }
        });
        
        appendMsg(reply, 'bot');
    }, 600);
}

function appendMsg(txt, side) {
    let log = document.getElementById('chatLogs');
    let d = document.createElement('div');
    d.className = `chat-msg ${side}`;
    d.innerText = txt;
    log.appendChild(d);
    log.scrollTop = log.scrollHeight;
}

// 7. تسجيل الخروج والتشغيل
function logout() { 
    localStorage.removeItem('isLogged'); 
    window.location.href='auth.html'; 
}

// تشغيل الفلاتر وتحديث النقاط وعرض البيانات عند تحميل الصفحة
document.querySelectorAll('select, input').forEach(el => el.addEventListener('input', update));
updatePointsDisplay();
render(plants);