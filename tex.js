// ---------- Программный кастомный курсор (JS) ----------
(function(){
  // отключаем на touch-устройствах
  if ('ontouchstart' in window) {
    document.body.style.cursor = ''; // вернём дефолт
    return;
  }

  // Создаём DOM элемент курсора
  const cursor = document.createElement('div');
  cursor.className = 'prog-cursor prog-cursor--code';
  cursor.innerHTML = '<span class="inner">{ }</span>'; // начальный вид — скобки
  document.body.appendChild(cursor);

  // Позиция (текущая и целевая)
  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let curX = mouseX, curY = mouseY;
  const lerp = (a,b,t) => a + (b-a)*t;

  // Слушаем движение мыши
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // если над интерактивными элементами — прячем курсор (позволяет взаимодействовать)
    const tgt = e.target;
    const tag = tgt.tagName && tgt.tagName.toLowerCase();
    const interactive = (tag === 'input' || tag === 'textarea' || tgt.isContentEditable || tgt.closest('a, button, label'));
    if (interactive) cursor.classList.add('hidden'); else cursor.classList.remove('hidden');
  }, {passive:true});

  // Плавный рендер
  function render(){
    curX = lerp(curX, mouseX, 0.18);
    curY = lerp(curY, mouseY, 0.18);
    cursor.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // Переключение режима при наведении на .terminal (если у тебя терминал имеет класс .terminal)
  const term = document.querySelector('.terminal');
  if (term) {
    term.addEventListener('mouseenter', () => {
      cursor.classList.remove('prog-cursor--code');
      cursor.classList.add('prog-cursor--term');
      cursor.innerHTML = ''; // пустой, потому что блок сам отображает
      // подсказка: можно добавить small shadow to terminal
      term.classList.add('hovered');
    });
    term.addEventListener('mouseleave', () => {
      cursor.classList.remove('prog-cursor--term');
      cursor.classList.add('prog-cursor--code');
      cursor.innerHTML = '<span class="inner">{ }</span>';
      term.classList.remove('hovered');
    });
  }

  // Скрывать курсор если окно потеряло фокус
  window.addEventListener('blur', () => cursor.classList.add('hidden'));
  window.addEventListener('focus', () => cursor.classList.remove('hidden'));

  // Если нужно временно показать системный курсор (например в меню), можно поставить класс .hide-custom on body
  const observer = new MutationObserver(() => {
    if (document.body.classList.contains('hide-custom')) document.body.style.cursor = '';
    else document.body.style.cursor = 'none';
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

})();



// Неоновый курсор, реагирующий на наведение
window.addEventListener('DOMContentLoaded', () => {
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  document.body.appendChild(cursor);

  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY + window.scrollY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Подсвечиваем при наведении на кнопки, ссылки и т.п.
  document.querySelectorAll('a, button, .interactive').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  });
});




const heroTitle = document.getElementById('heroTitle');
const text = "Создаём сайты, которые живут и дышат кодом";
let index = 0;

function typeTitle() {
  if (index <= text.length) {
    heroTitle.innerHTML = text.slice(0, index) + '<span class="cursor"></span>';
    index++;
    setTimeout(typeTitle, 80); // скорость печати (мс)
  }
}

typeTitle();







// появление гридов плавное
const grids = document.querySelectorAll('.grid');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
}, { threshold: 0.1 });

grids.forEach(grid => observer.observe(grid));
// конец гридов
// 🌿 Эффект кода "Матрицы" по бокам
function createMatrix(canvasId, side = 'left') {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth * 0.15; // ширина боковой части
    canvas.height = window.innerHeight;
  }
  resize();

  const letters = '01<>[]{}#%&@ΣΛΩπΔ≡+';
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff99';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(draw, 40);
  window.addEventListener('resize', resize);
}

if (window.innerWidth <= 500) {
    // Отключаем определённые функции
    myFunction = function() { /* пусто */ };
    anotherFunction = function() {};
}


createMatrix('matrixLeft');
createMatrix('matrixRight');










    document.getElementById('year').textContent=new Date().getFullYear();

    const codeOutput=document.getElementById('codeOutput');
    const playBtn=document.getElementById('playBtn');
    const nextBtn=document.getElementById('nextBtn');

    const snippets=[
      `// Запуск системы...\nПодключение к серверу...{\n <p>'Привет! Мы-команда программистов';\n\Создаём современные сайты, стильные дизайны и мощные веб-проекты.\n\Стоимость начинается от 100$. Свяжись с нами - и твой проект оживёт.</p>`,
      `// Стиль через код\nconst theme = {color:'green', glow:true};\nconsole.log('Design power', theme);`,
      `// Мы любим JavaScript\nlet magic = 'creative code';\nconsole.log('VerdeBoost →', magic);`
    ];
    let i=0,idx=0,timer=null;

    function typeStep(){
      if(idx>=snippets[i].length){clearInterval(timer);timer=null;return;}
      codeOutput.innerHTML=snippets[i].slice(0,idx+1).replace(/</g,'&lt;').replace(/>/g,'&gt;')+ '<span class="cursor"></span>';
      idx++;
    }

    playBtn.addEventListener('click',()=>{
      if(timer) return;
      idx=0;codeOutput.textContent='';
      timer=setInterval(typeStep,60);
    });

    nextBtn.addEventListener('click',()=>{
      i=(i+1)%snippets.length;
      idx=0;codeOutput.textContent='';
      if(timer){clearInterval(timer);timer=null;}
    });








// Звук печати
const typeSound = new Audio('sounds/key.mp3'); //mp3 в проект
playBtn.addEventListener('click', () => {
  typeSound.currentTime = 0;
  typeSound.play();
});

// Вибрация на мобильных при клике кнопки "Написать"
const vebBtn = document.querySelector('.veb-tel');
vebBtn.addEventListener('click', () => {
  if (navigator.vibrate) navigator.vibrate(50); // короткая вибрация
});





