(() => {
'use strict';

const $ = (id) => document.getElementById(id);
const qs = (sel, ctx = document) => ctx.querySelector(sel);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const toast = (msg) => {
    const el = $('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove('show'), 2400);
};

/* ---------------- Config / persistence ---------------- */
const DEFAULTS = {
    hero: 'assets/images/hero.svg',
    background: 'assets/images/background.svg',
    profile1: 'assets/images/profile1.svg',
    profile2: 'assets/images/profile2.svg',
    profile3: 'assets/images/profile3.svg',
    avatar: 'assets/images/avatar.svg',
    music: '',
    musicTitle: 'Untitled',
    name: 'Expyy',
    blur: 22,
    opacity: 70,
    charShadow: 55,
    charRadius: 26,
    theme: 'light'
};

let config = { ...DEFAULTS };
try {
    const saved = JSON.parse(localStorage.getItem('anime-glass-config') || '{}');
    config = { ...DEFAULTS, ...saved };
} catch { /* corrupted storage, fall back to defaults */ }

function persistConfig() {
    try { localStorage.setItem('anime-glass-config', JSON.stringify(config)); }
    catch { toast('Não foi possível salvar (armazenamento cheio).'); }
}

function setImage(id, src) {
    const el = $(id);
    if (el) el.src = src;
}
function cacheBust(src) {
    if (!src) return src;
    return src.startsWith('data:') ? src : src + (src.includes('?') ? '&' : '?') + 'v=' + Date.now();
}
function applyConfig() {
    setImage('heroImage', cacheBust(config.hero));
    setImage('profile1', cacheBust(config.profile1));
    setImage('profile2', cacheBust(config.profile2));
    setImage('profile3', cacheBust(config.profile3));
    setImage('musicArtImg', cacheBust(config.profile3));
    setImage('avatarSmall', cacheBust(config.avatar));
    setImage('previewHero', cacheBust(config.hero));
    setImage('previewBackground', cacheBust(config.background));
    setImage('previewProfile1', cacheBust(config.profile1));
    setImage('previewProfile2', cacheBust(config.profile2));
    setImage('previewProfile3', cacheBust(config.profile3));
    setImage('previewAvatar', cacheBust(config.avatar));

    $('musicTitle').textContent = config.musicTitle || 'Untitled';
    $('greetingName').textContent = config.name || 'Expyy';
    $('pillName').textContent = config.name || 'Expyy';
    $('nameInput').value = config.name || 'Expyy';
    $('musicTitleInput').value = config.musicTitle || 'Untitled';
    $('musicUrlInput').value = config.music && !config.music.startsWith('data:') ? config.music : '';
    $('blurInput').value = config.blur;
    $('opacityInput').value = config.opacity;
    $('charShadowInput').value = config.charShadow;
    $('charRadiusInput').value = config.charRadius;
    document.documentElement.style.setProperty('--blur', `${config.blur}px`);
    document.documentElement.style.setProperty('--opacity', `${config.opacity / 100}`);
    document.documentElement.style.setProperty('--char-shadow', `${config.charShadow / 100}`);
    document.documentElement.style.setProperty('--char-radius', `${config.charRadius}px`);

    const bg = $('background');
    if (bg) bg.style.backgroundImage = `url("${cacheBust(config.background)}")`;

    const audio = $('audio');
    if (audio && config.music && audio.src !== config.music) audio.src = config.music;

    document.body.classList.toggle('dark', config.theme === 'dark');
}
applyConfig();

/* ---------------- Clock ---------------- */
const pad = n => String(n).padStart(2, '0');
function updateClock() {
    const now = new Date();
    $('clock').textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
    $('weekday').textContent = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(now);
    $('date').textContent = `${pad(now.getMonth() + 1)}/${pad(now.getDate())}`;
}
updateClock();
setInterval(updateClock, 1000);

/* ---------------- Calendar ---------------- */
let calendarDate = new Date();
let selectedDate = new Date();
function renderCalendar() {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    $('monthName').textContent = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(calendarDate);
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const prevLast = new Date(year, month, 0).getDate();
    const start = first.getDay();
    const total = Math.ceil((start + last.getDate()) / 7) * 7;
    const box = $('calendarDays');
    const frag = document.createDocumentFragment();

    for (let i = 0; i < total; i++) {
        const day = i - start + 1;
        const el = document.createElement('button');
        el.type = 'button';
        el.className = 'day';
        let actualDate;
        if (day < 1) {
            el.textContent = prevLast + day;
            el.classList.add('muted');
            actualDate = new Date(year, month - 1, prevLast + day);
        } else if (day > last.getDate()) {
            el.textContent = day - last.getDate();
            el.classList.add('muted');
            actualDate = new Date(year, month + 1, day - last.getDate());
        } else {
            el.textContent = day;
            actualDate = new Date(year, month, day);
        }
        const now = new Date();
        if (actualDate.toDateString() === now.toDateString()) el.classList.add('today');
        if (actualDate.toDateString() === selectedDate.toDateString()) el.classList.add('selected');
        el.setAttribute('aria-label', actualDate.toLocaleDateString('pt-BR'));
        el.onclick = () => {
            selectedDate = actualDate;
            toast(`Data selecionada: ${actualDate.toLocaleDateString('pt-BR')}`);
            renderCalendar();
        };
        frag.appendChild(el);
    }
    box.innerHTML = '';
    box.appendChild(frag);
}
$('prevMonth').onclick = () => { calendarDate.setMonth(calendarDate.getMonth() - 1); renderCalendar(); };
$('nextMonth').onclick = () => { calendarDate.setMonth(calendarDate.getMonth() + 1); renderCalendar(); };
renderCalendar();

/* ---------------- Theme ---------------- */
$('themeBtn').onclick = () => {
    config.theme = config.theme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('dark', config.theme === 'dark');
    persistConfig();
};

/* ---------------- Settings modal ---------------- */
const modal = $('settingsModal');
const openModal = () => { modal.showModal(); };
$('openSettings').onclick = openModal;
$('editHero').onclick = openModal;
$('profilePill').onclick = () => { openModal(); $('nameInput').focus(); };
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });

$('nameInput').oninput = e => {
    const val = e.target.value || 'Expyy';
    $('greetingName').textContent = val;
    $('pillName').textContent = val;
};
$('blurInput').oninput = e => document.documentElement.style.setProperty('--blur', `${e.target.value}px`);
$('opacityInput').oninput = e => document.documentElement.style.setProperty('--opacity', `${e.target.value / 100}`);
$('charShadowInput').oninput = e => document.documentElement.style.setProperty('--char-shadow', `${e.target.value / 100}`);
$('charRadiusInput').oninput = e => document.documentElement.style.setProperty('--char-radius', `${e.target.value}px`);

/* file uploads: drag & drop + click, stored as data URLs (works on static GitHub Pages) */
const targetToElements = {
    hero: ['heroImage', 'previewHero'],
    background: ['background', 'previewBackground'],
    profile1: ['profile1', 'previewProfile1'],
    profile2: ['profile2', 'previewProfile2'],
    profile3: ['profile3', 'previewProfile3'],
    avatar: ['avatarSmall', 'previewAvatar']
};
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
const MAX_SIZE = 5 * 1024 * 1024;

function isAllowedImage(file) {
    if (!file) return false;
    if (file.type && ALLOWED_TYPES.includes(file.type)) return true;
    return /\.(png|jpe?g|webp|gif|svg)$/i.test(file.name || '');
}

function handleFile(target, file) {
    if (!file) return;
    if (!isAllowedImage(file)) return toast('Formato não permitido.');
    if (file.size > MAX_SIZE) return toast('Use uma imagem de até 5 MB.');

    const reader = new FileReader();
    reader.onload = () => {
        config[target] = reader.result;
        persistConfig();
        const [mainId, previewId] = targetToElements[target];
        if (target === 'background') {
            $(mainId).style.backgroundImage = `url("${reader.result}")`;
        } else {
            $(mainId).src = reader.result;
            if (target === 'profile3') $('musicArtImg').src = reader.result;
        }
        $(previewId).src = reader.result;
        toast('Imagem salva neste navegador!');
    };
    reader.onerror = () => toast('Não foi possível ler a imagem.');
    reader.readAsDataURL(file);
}

document.querySelectorAll('.upload-card').forEach(card => {
    const input = qs('input[type=file]', card);
    const target = input.dataset.target;
    input.onchange = () => handleFile(target, input.files?.[0]);

    ['dragenter', 'dragover'].forEach(evt => card.addEventListener(evt, e => {
        e.preventDefault(); card.classList.add('dragover');
    }));
    ['dragleave', 'drop'].forEach(evt => card.addEventListener(evt, e => {
        e.preventDefault(); card.classList.remove('dragover');
    }));
    card.addEventListener('drop', e => {
        const file = e.dataTransfer?.files?.[0];
        if (file) handleFile(target, file);
    });
});

$('saveVisuals').onclick = () => {
    config.name = $('nameInput').value.trim() || 'Expyy';
    config.blur = Number($('blurInput').value);
    config.opacity = Number($('opacityInput').value);
    config.charShadow = Number($('charShadowInput').value);
    config.charRadius = Number($('charRadiusInput').value);
    config.musicTitle = $('musicTitleInput').value.trim() || 'Untitled';
    const url = $('musicUrlInput').value.trim();
    if (url) config.music = url;
    persistConfig();
    applyConfig();
    modal.close();
    toast('Personalização salva!');
};

$('resetBtn').onclick = () => {
    if (!confirm('Restaurar todas as imagens e preferências padrão?')) return;
    localStorage.removeItem('anime-glass-config');
    config = { ...DEFAULTS };
    applyConfig();
    toast('Padrões restaurados!');
};

/* ---------------- Music player ---------------- */
const audio = $('audio');
const playBtn = $('playBtn');
const progressBar = qs('.progress');
const progressFill = $('progress');
const musicCard = qs('.music');

function fmt(sec) {
    if (!Number.isFinite(sec)) return '0:00';
    return `${Math.floor(sec / 60)}:${pad(Math.floor(sec % 60))}`;
}
playBtn.onclick = async () => {
    if (!audio.src) return toast('Adicione uma URL de áudio nas configurações.');
    if (audio.paused) {
        try { await audio.play(); }
        catch { toast('Clique novamente para iniciar a música.'); }
    } else {
        audio.pause();
    }
};
audio.onplay = () => { playBtn.textContent = 'Ⅱ'; musicCard.classList.add('playing'); };
audio.onpause = () => { playBtn.textContent = '▶'; musicCard.classList.remove('playing'); };
audio.onloadedmetadata = () => $('duration').textContent = fmt(audio.duration);
audio.ontimeupdate = () => {
    $('currentTime').textContent = fmt(audio.currentTime);
    progressFill.style.width = `${audio.duration ? (audio.currentTime / audio.duration) * 100 : 0}%`;
};
audio.onended = () => { playBtn.textContent = '▶'; musicCard.classList.remove('playing'); };
audio.onerror = () => { if (audio.src) toast('Não foi possível carregar o áudio.'); };

progressBar.onclick = e => {
    if (!audio.duration) return;
    const rect = progressBar.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
};
$('prevTrack').onclick = () => {
    if (!audio.src) return toast('Adicione uma URL de áudio nas configurações.');
    audio.currentTime = 0;
};
$('nextTrack').onclick = () => {
    if (!audio.src) return toast('Adicione uma URL de áudio nas configurações.');
    audio.currentTime = audio.duration || 0;
};
$('muteBtn').onclick = () => {
    const liked = $('muteBtn').classList.toggle('active');
    toast(liked ? 'Adicionado aos favoritos!' : 'Removido dos favoritos.');
};

/* ---------------- Parallax (mouse) ---------------- */
if (!reduceMotion && matchMedia('(pointer: fine)').matches) {
    const glow = qs('.hero-glow');
    const bg = $('background');
    let raf = null, px = 0, py = 0;
    document.addEventListener('pointermove', e => {
        px = (e.clientX / innerWidth - .5) * 2;
        py = (e.clientY / innerHeight - .5) * 2;
        if (raf) return;
        raf = requestAnimationFrame(() => {
            if (glow) glow.style.transform = `translate(${px * 14}px, ${py * 10}px)`;
            if (bg) bg.style.transform = `scale(1.16) translate(${px * 6}px, ${py * 6}px)`;
            raf = null;
        });
    });
}

})();
