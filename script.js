const COMMON = [
    'password', '123456', 'qwerty',
    'abc123', 'letmein', 'welcome',
    'monkey', 'dragon', 'master',
    'shadow', 'sunshine', 'princess',
    'football', 'iloveyou', 'admin',
    'login', 'pass', 'test', 'user'
];

function toggle() {
    const p = document.getElementById('pwd');
    if (p.type === 'password') {
        p.type = 'text';
    } else {
        p.type = 'password';
    }
}

function setCheck(id, iconId, pass) {
    const el = document.getElementById(id);
    const icon = document.getElementById(iconId);
    if (pass) {
        el.className = 'chk pass';
        icon.textContent = '✅';
    } else {
        el.className = 'chk';
        icon.textContent = '❌';
    }
}

function audit() {
    const pwd = document.getElementById('pwd').value;
    const len = pwd.length;

    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNum = /[0-9]/.test(pwd);
    const hasSym = /[^A-Za-z0-9]/.test(pwd);
    const isLong = len >= 12;
    const isMin = len >= 8;
    const lower = pwd.toLowerCase();
    const noPattern = !COMMON.some(
        p => lower.includes(p)
    );
    const noRepeat = !/(.)\1{2,}/.test(pwd);

    setCheck('c-len', 'i-len', isMin);
    setCheck('c-upper', 'i-upper', hasUpper);
    setCheck('c-lower', 'i-lower', hasLower);
    setCheck('c-num', 'i-num', hasNum);
    setCheck('c-sym', 'i-sym', hasSym);
    setCheck('c-long', 'i-long', isLong);
    setCheck('c-pat', 'i-pat', noPattern);
    setCheck('c-rep', 'i-rep', noRepeat);

    const passed = [
        isMin, hasUpper, hasLower,
        hasNum, hasSym, isLong,
        noPattern, noRepeat
    ].filter(Boolean).length;

    let score = 0;
    if (isMin) score += 15;
    if (hasUpper) score += 10;
    if (hasLower) score += 10;
    if (hasNum) score += 15;
    if (hasSym) score += 20;
    if (isLong) score += 15;
    if (noPattern) score += 10;
    if (noRepeat) score += 5;
    if (len > 16) score = Math.min(100, score + 5);
    if (pwd === '') score = 0;

    const bar = document.getElementById('score-bar');
    const label = document.getElementById('score-label');

    let color, text;
    if (score === 0) {
        color = '#8b949e'; text = '—';
    } else if (score < 30) {
        color = '#f85149'; text = 'Very Weak';
    } else if (score < 50) {
        color = '#d29922'; text = 'Weak';
    } else if (score < 70) {
        color = '#f0883e'; text = 'Fair';
    } else if (score < 85) {
        color = '#3fb950'; text = 'Strong';
    } else {
        color = '#1f883d'; text = 'Very Strong';
    }

    bar.style.width = score + '%';
    bar.style.background = color;
    label.textContent = pwd === '' ? '—' : text;
    label.style.color = color;

    document.getElementById('stat-len')
        .textContent = len;
    document.getElementById('stat-score')
        .textContent = score + '/100';
    document.getElementById('stat-checks')
        .textContent = passed + '/8';

    const tips = [];
    if (!isMin) tips.push(
        'Use at least 8 characters'
    );
    if (!hasUpper) tips.push(
        'Add uppercase letters (A-Z)'
    );
    if (!hasLower) tips.push(
        'Add lowercase letters (a-z)'
    );
    if (!hasNum) tips.push(
        'Include numbers (0-9)'
    );
    if (!hasSym) tips.push(
        'Add symbols like !@#$%^&*'
    );
    if (!isLong) tips.push(
        'Use 12+ characters for better security'
    );
    if (!noPattern) tips.push(
        'Avoid common words or patterns'
    );
    if (!noRepeat) tips.push(
        'Avoid repeating same character 3+ times'
    );

    const box = document.getElementById(
        'feedback-box'
    );
    const list = document.getElementById(
        'feedback-list'
    );

    if (pwd && tips.length > 0) {
        box.style.display = 'block';
        list.innerHTML = tips
            .map(t => '<li>' + t + '</li>')
            .join('');
    } else {
        box.style.display = 'none';
    }
}