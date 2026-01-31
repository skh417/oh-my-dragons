/**
 * =============================================================================
 * 드래곤 타마고치 - 타입 정의
 * =============================================================================
 * 게임에서 사용되는 모든 타입과 인터페이스를 정의합니다.
 */
{};
//# sourceMappingURL=types.js.map
/**
 * 14가지 드래곤 타입 정보
 * 각 타입은 고유한 색상, 이모지, 조상 드래곤을 가짐
 */
const DRAGON_TYPES = {
    fire: { name: '불', emoji: '🔥', color: '#ff6b35', ancestor: { name: 'Igniteon', korean: '이그니테온' } },
    water: { name: '물', emoji: '💧', color: '#4a90d9', ancestor: { name: 'Abyssalon', korean: '아비살론' } },
    earth: { name: '땅', emoji: '🏔️', color: '#8b7355', ancestor: { name: 'Terranos', korean: '테라노스' } },
    dark: { name: '어둠', emoji: '🌑', color: '#5a4a7a', ancestor: { name: 'Nocturniah', korean: '녹투르니아' } },
    light: { name: '빛', emoji: '✨', color: '#fff8dc', ancestor: { name: 'Luminarch', korean: '루미나르크' } },
    speed: { name: '스피드', emoji: '💨', color: '#00d4aa', ancestor: { name: 'Velociron', korean: '벨로키론' } },
    electric: { name: '전기', emoji: '⚡', color: '#ffd700', ancestor: { name: 'Fulgurion', korean: '풀구리온' } },
    wind: { name: '바람', emoji: '🌪️', color: '#87ceeb', ancestor: { name: 'Zephyros', korean: '제피로스' } },
    psychic: { name: '초능력', emoji: '🔮', color: '#ff69b4', ancestor: { name: 'Psychiron', korean: '사이키론' } },
    grass: { name: '풀', emoji: '🌿', color: '#3cb371', ancestor: { name: 'Silvanor', korean: '실바노르' } },
    rock: { name: '바위', emoji: '🪨', color: '#808080', ancestor: { name: 'Petragon', korean: '페트라곤' } },
    ice: { name: '얼음', emoji: '❄️', color: '#add8e6', ancestor: { name: 'Glacius', korean: '글라키우스' } },
    poison: { name: '독', emoji: '☠️', color: '#8a2be2', ancestor: { name: 'Vennomark', korean: '벤노마르크' } },
    metal: { name: '금속', emoji: '⚙️', color: '#9aa3ad', ancestor: { name: 'Ferrarion', korean: '페라리온' } }
};
const GENDERS = { male: '♂', female: '♀' };
/**
 * 각 액션의 쿨다운 시간 (초)
 */
const COOLDOWNS = {
    hunt: 30,
    education: 20,
    exploration: 60,
    training: 15,
    meditation: 25
};
/**
 * 둥지 레벨별 정보
 * 골드를 사용해 업그레이드하면 다양한 보너스 획득
 */
const NESTS = [
    { name: '기본 둥지', bonus: '보너스 없음', cost: 0, happinessGain: 1, statGain: 1, expGain: 1 },
    { name: '포근한 둥지', bonus: '행복 회복 +10%', cost: 150, happinessGain: 1.1, statGain: 1, expGain: 1 },
    { name: '호화 둥지', bonus: '모든 능력치 증가 +20%', cost: 450, happinessGain: 1, statGain: 1.2, expGain: 1 },
    { name: '전설의 둥지', bonus: '경험치 획득 +30%', cost: 900, happinessGain: 1, statGain: 1, expGain: 1.3 }
];
const STORAGE_KEYS = {
    gold: 'dragonGold',
    nest: 'dragonNestLevel',
    pokedex: 'dragonPokedex',
    stats: 'dragonStats'
};
/**
 * 레벨업에 필요한 경험치 계산
 * 공식: 80 + (레벨 - 1) * 30
 * 레벨 1: 80, 레벨 2: 110, 레벨 3: 140 ...
 */
function getExpToNextLevel(level) {
    if (level >= 15)
        return null;
    return 80 + (level - 1) * 30;
}
//# sourceMappingURL=constants.js.map

function createNewDragon() {
    return {
        type: null,
        stage: 0,
        hunger: 100,
        happiness: 100,
        energy: 100,
        growth: 0,
        isSleeping: false,
        name: '???',
        gender: null,
        attack: 10,
        defense: 10,
        intelligence: 10,
        spirit: 10,
        level: 1,
        exp: 0,
        tier: null,
        totalFeeds: 0,
        totalPlays: 0,
        totalEducation: 0,
        totalTraining: 0,
        totalMeditation: 0,
        totalHunts: 0,
        totalExplorations: 0,
        unlockedAbilities: [],
        recorded: false
    };
}
const gameState = {
    dragon: createNewDragon(),
    isHatched: false,
    gold: 0,
    nestLevel: 0,
    pokedex: [],
    pokedexStats: { totalRaised: 0, typesDiscovered: [], highestTier: '없음' },
    cooldowns: { hunt: 0, education: 0, exploration: 0, training: 0, meditation: 0 },
    gameInterval: null,
    cooldownInterval: null
};
const elements = {
    spriteContainer: null,
    stageBadge: null,
    typeBadge: null,
    genderBadge: null,
    dragonName: null,
    hungerBar: null,
    happinessBar: null,
    energyBar: null,
    growthBar: null,
    hungerValue: null,
    happinessValue: null,
    energyValue: null,
    growthValue: null,
    message: null,
    particles: null,
    feedBtn: null,
    playBtn: null,
    sleepBtn: null,
    huntBtn: null,
    trainingBtn: null,
    educationBtn: null,
    meditationBtn: null,
    explorationBtn: null,
    huntCooldown: null,
    trainingCooldown: null,
    educationCooldown: null,
    meditationCooldown: null,
    explorationCooldown: null,
    modalOverlay: null,
    nameInput: null,
    goldValue: null,
    nestName: null,
    nestTitle: null,
    nestBonus: null,
    nestCost: null,
    upgradeNestBtn: null,
    attackValue: null,
    defenseValue: null,
    intelligenceValue: null,
    spiritValue: null,
    levelValue: null,
    expValue: null,
    tierLine: null,
    ancestorLine: null,
    pokedexStats: null,
    pokedexList: null,
    tabButtons: [],
    tabPanels: []
};
function initElements() {
    elements.spriteContainer = document.getElementById('dragonSprite');
    elements.stageBadge = document.getElementById('stageBadge');
    elements.typeBadge = document.getElementById('typeBadge');
    elements.genderBadge = document.getElementById('genderBadge');
    elements.dragonName = document.getElementById('dragonName');
    elements.hungerBar = document.getElementById('hungerBar');
    elements.happinessBar = document.getElementById('happinessBar');
    elements.energyBar = document.getElementById('energyBar');
    elements.growthBar = document.getElementById('growthBar');
    elements.hungerValue = document.getElementById('hungerValue');
    elements.happinessValue = document.getElementById('happinessValue');
    elements.energyValue = document.getElementById('energyValue');
    elements.growthValue = document.getElementById('growthValue');
    elements.message = document.getElementById('message');
    elements.particles = document.getElementById('particles');
    elements.feedBtn = document.getElementById('feedBtn');
    elements.playBtn = document.getElementById('playBtn');
    elements.sleepBtn = document.getElementById('sleepBtn');
    elements.huntBtn = document.getElementById('huntBtn');
    elements.trainingBtn = document.getElementById('trainingBtn');
    elements.educationBtn = document.getElementById('educationBtn');
    elements.meditationBtn = document.getElementById('meditationBtn');
    elements.explorationBtn = document.getElementById('explorationBtn');
    elements.huntCooldown = document.getElementById('huntCooldown');
    elements.trainingCooldown = document.getElementById('trainingCooldown');
    elements.educationCooldown = document.getElementById('educationCooldown');
    elements.meditationCooldown = document.getElementById('meditationCooldown');
    elements.explorationCooldown = document.getElementById('explorationCooldown');
    elements.modalOverlay = document.getElementById('modalOverlay');
    elements.nameInput = document.getElementById('nameInput');
    elements.goldValue = document.getElementById('goldValue');
    elements.nestName = document.getElementById('nestName');
    elements.nestTitle = document.getElementById('nestTitle');
    elements.nestBonus = document.getElementById('nestBonus');
    elements.nestCost = document.getElementById('nestCost');
    elements.upgradeNestBtn = document.getElementById('upgradeNestBtn');
    elements.attackValue = document.getElementById('attackValue');
    elements.defenseValue = document.getElementById('defenseValue');
    elements.intelligenceValue = document.getElementById('intelligenceValue');
    elements.spiritValue = document.getElementById('spiritValue');
    elements.levelValue = document.getElementById('levelValue');
    elements.expValue = document.getElementById('expValue');
    elements.tierLine = document.getElementById('tierLine');
    elements.ancestorLine = document.getElementById('ancestorLine');
    elements.pokedexStats = document.getElementById('pokedexStats');
    elements.pokedexList = document.getElementById('pokedexList');
    elements.tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
    elements.tabPanels = Array.from(document.querySelectorAll('.tab-panel'));
}
function loadStorage() {
    const savedGold = Number(localStorage.getItem(STORAGE_KEYS.gold));
    const savedNest = Number(localStorage.getItem(STORAGE_KEYS.nest));
    const savedPokedex = localStorage.getItem(STORAGE_KEYS.pokedex);
    const savedStats = localStorage.getItem(STORAGE_KEYS.stats);
    gameState.gold = Number.isFinite(savedGold) ? savedGold : 0;
    gameState.nestLevel = Number.isFinite(savedNest) ? Math.min(Math.max(savedNest, 0), NESTS.length - 1) : 0;
    gameState.pokedex = savedPokedex ? JSON.parse(savedPokedex) : [];
    gameState.pokedexStats = savedStats ? JSON.parse(savedStats) : { totalRaised: 0, typesDiscovered: [], highestTier: '없음' };
}
function saveStorage() {
    localStorage.setItem(STORAGE_KEYS.gold, String(gameState.gold));
    localStorage.setItem(STORAGE_KEYS.nest, String(gameState.nestLevel));
    localStorage.setItem(STORAGE_KEYS.pokedex, JSON.stringify(gameState.pokedex));
    localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(gameState.pokedexStats));
}
function getRandomType() {
    const types = ['fire', 'water', 'earth', 'dark', 'light', 'speed', 'electric', 'wind', 'psychic', 'grass', 'rock', 'ice', 'poison', 'metal'];
    return types[Math.floor(Math.random() * types.length)];
}
function getRandomGender() {
    return Math.random() < 0.5 ? 'male' : 'female';
}
function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//# sourceMappingURL=state.js.map
/**
 * =============================================================================
 * 드래곤 타마고치 - 메인 게임 로직
 * =============================================================================
 */


/**
 * 레벨에 따른 성장 단계 정보 반환
 * - 레벨 1-5: 아기
 * - 레벨 6-10: 청소년
 * - 레벨 11-14: 성체
 * - 레벨 15: 전설
 */
function getStageInfo(level) {
    if (level <= 5)
        return { label: '아기', stageClass: 'dragon-baby', phaseLevel: level };
    if (level <= 10)
        return { label: '청소년', stageClass: 'dragon-teen', phaseLevel: level - 5 };
    if (level <= 14)
        return { label: '성체', stageClass: 'dragon-adult', phaseLevel: level - 10 };
    return { label: '전설', stageClass: 'dragon-adult', phaseLevel: 5 };
}
function getStageBadgeText() {
    if (!gameState.isHatched)
        return '알';
    const info = getStageInfo(gameState.dragon.level);
    if (gameState.dragon.level === 15)
        return '전설';
    return `${info.label} ${info.phaseLevel}단계`;
}
function getNestEffects() {
    return NESTS[gameState.nestLevel] || NESTS[0];
}
/**
 * 둥지 효과가 적용된 행복도 증가량 계산
 */
function applyHappinessGain(amount) {
    return Math.round(amount * getNestEffects().happinessGain);
}
/**
 * 둥지 효과가 적용된 스탯 증가량 계산
 */
function applyStatGain(amount) {
    return Math.round(amount * getNestEffects().statGain);
}
/**
 * 경험치 추가 및 레벨업 처리
 * 경험치가 필요량을 초과하면 자동으로 레벨업
 */
function addExp(amount) {
    if (!gameState.isHatched || gameState.dragon.level >= 15)
        return;
    const gain = Math.round(amount * getNestEffects().expGain);
    gameState.dragon.exp += gain;
    let needed = getExpToNextLevel(gameState.dragon.level);
    while (needed !== null && gameState.dragon.exp >= needed && gameState.dragon.level < 15) {
        gameState.dragon.exp -= needed;
        gameState.dragon.level += 1;
        handleLevelUp();
        needed = getExpToNextLevel(gameState.dragon.level);
    }
}
/**
 * 진화 등급 계산
 * 모든 스탯의 평균값을 기준으로 하급/중급/상급 결정
 * - 평균 < 45: 하급
 * - 평균 < 75: 중급
 * - 평균 >= 75: 상급
 */
function calculateTier() {
    const { hunger, happiness, energy, attack, defense, intelligence, spirit } = gameState.dragon;
    const avg = (hunger + happiness + energy + attack + defense + intelligence + spirit) / 7;
    if (avg < 45)
        return '하급';
    if (avg < 75)
        return '중급';
    return '상급';
}
/**
 * 드래곤을 도감에 기록
 * 레벨 15 도달 시 자동 호출됨
 */
function recordDragon() {
    if (!gameState.isHatched || gameState.dragon.recorded || !gameState.dragon.type)
        return;
    const typeData = DRAGON_TYPES[gameState.dragon.type];
    const entry = {
        name: gameState.dragon.name,
        type: typeData.name,
        typeKey: gameState.dragon.type,
        gender: GENDERS[gameState.dragon.gender],
        level: gameState.dragon.level,
        tier: gameState.dragon.tier || '미정',
        ancestor: `${typeData.ancestor.korean} (${typeData.ancestor.name})`,
        stats: {
            hunger: Math.round(gameState.dragon.hunger),
            happiness: Math.round(gameState.dragon.happiness),
            energy: Math.round(gameState.dragon.energy),
            attack: gameState.dragon.attack,
            defense: gameState.dragon.defense,
            intelligence: gameState.dragon.intelligence,
            spirit: gameState.dragon.spirit
        }
    };
    gameState.pokedex.unshift(entry);
    gameState.pokedexStats.totalRaised += 1;
    if (!gameState.pokedexStats.typesDiscovered.includes(gameState.dragon.type)) {
        gameState.pokedexStats.typesDiscovered.push(gameState.dragon.type);
    }
    const tierRank = { '하급': 1, '중급': 2, '상급': 3, '없음': 0 };
    const currentRank = tierRank[gameState.pokedexStats.highestTier] || 0;
    const newRank = tierRank[entry.tier] || 0;
    if (newRank > currentRank) {
        gameState.pokedexStats.highestTier = entry.tier;
    }
    gameState.dragon.recorded = true;
    saveStorage();
    renderPokedex();
}
function createEggSprite() {
    return '<div class="pixel-egg"></div>';
}
function createDragonSprite(type, level) {
    const stageClass = getStageInfo(level).stageClass;
    let html = `<div class="dragon-body ${stageClass} dragon-${type}">`;
    html += '<div class="head">';
    if (level >= 6) {
        html += '<div class="horn left"></div>';
        html += '<div class="horn right"></div>';
    }
    html += '<div class="eye left"></div>';
    html += '<div class="eye right"></div>';
    html += '</div>';
    if (level >= 11) {
        html += '<div class="wing left"></div>';
        html += '<div class="wing right"></div>';
    }
    html += '<div class="body"></div>';
    html += '<div class="tail"></div>';
    html += '</div>';
    return html;
}
function updateUI() {
    const { dragon, isHatched, gold } = gameState;
    const growthPercent = isHatched
        ? (dragon.level >= 15 ? 100 : Math.round((dragon.exp / (getExpToNextLevel(dragon.level) || 1)) * 100))
        : Math.min(100, Math.round((dragon.growth / 15) * 100));
    if (elements.hungerBar)
        elements.hungerBar.style.width = `${dragon.hunger}%`;
    if (elements.happinessBar)
        elements.happinessBar.style.width = `${dragon.happiness}%`;
    if (elements.energyBar)
        elements.energyBar.style.width = `${dragon.energy}%`;
    if (elements.growthBar)
        elements.growthBar.style.width = `${growthPercent}%`;
    if (elements.hungerValue)
        elements.hungerValue.textContent = String(Math.round(dragon.hunger));
    if (elements.happinessValue)
        elements.happinessValue.textContent = String(Math.round(dragon.happiness));
    if (elements.energyValue)
        elements.energyValue.textContent = String(Math.round(dragon.energy));
    if (elements.growthValue)
        elements.growthValue.textContent = isHatched ? `${growthPercent}%` : `${Math.round(dragon.growth)}/15`;
    if (elements.stageBadge)
        elements.stageBadge.textContent = getStageBadgeText();
    if (!isHatched) {
        if (elements.spriteContainer) {
            elements.spriteContainer.innerHTML = createEggSprite();
            elements.spriteContainer.className = 'dragon-sprite-container egg';
        }
        if (elements.genderBadge)
            elements.genderBadge.classList.add('hidden');
        if (elements.typeBadge)
            elements.typeBadge.className = 'type-badge hidden';
        if (elements.tierLine)
            elements.tierLine.textContent = '진화 등급: -';
        if (elements.ancestorLine)
            elements.ancestorLine.textContent = '조상 드래곤: ???';
    }
    else if (dragon.type) {
        if (elements.spriteContainer) {
            elements.spriteContainer.innerHTML = createDragonSprite(dragon.type, dragon.level);
            elements.spriteContainer.className = dragon.isSleeping ? 'dragon-sprite-container sleeping' : 'dragon-sprite-container';
        }
        const typeData = DRAGON_TYPES[dragon.type];
        if (elements.typeBadge) {
            elements.typeBadge.textContent = `${typeData.emoji} ${typeData.name}`;
            elements.typeBadge.className = `type-badge type-${dragon.type}`;
        }
        if (elements.genderBadge && dragon.gender) {
            elements.genderBadge.textContent = GENDERS[dragon.gender];
            elements.genderBadge.classList.remove('hidden');
        }
        if (elements.tierLine)
            elements.tierLine.textContent = `진화 등급: ${dragon.tier || '미정'}`;
        if (elements.ancestorLine)
            elements.ancestorLine.textContent = `조상 드래곤: ${typeData.ancestor.korean} (${typeData.ancestor.name})`;
    }
    if (elements.goldValue)
        elements.goldValue.textContent = String(gold);
    if (elements.attackValue)
        elements.attackValue.textContent = String(dragon.attack);
    if (elements.defenseValue)
        elements.defenseValue.textContent = String(dragon.defense);
    if (elements.intelligenceValue)
        elements.intelligenceValue.textContent = String(dragon.intelligence);
    if (elements.spiritValue)
        elements.spiritValue.textContent = String(dragon.spirit);
    if (elements.levelValue)
        elements.levelValue.textContent = isHatched ? String(dragon.level) : '-';
    const expMax = getExpToNextLevel(dragon.level);
    if (elements.expValue)
        elements.expValue.textContent = isHatched ? (expMax ? `${dragon.exp}/${expMax}` : '최대') : '0/0';
    if (elements.feedBtn)
        elements.feedBtn.disabled = dragon.isSleeping;
    if (elements.playBtn)
        elements.playBtn.disabled = dragon.isSleeping || dragon.energy < 10;
    if (elements.sleepBtn)
        elements.sleepBtn.disabled = dragon.isSleeping;
    updateNestUI();
    renderPokedex();
}
function updateNestUI() {
    const currentNest = getNestEffects();
    if (elements.nestName)
        elements.nestName.textContent = currentNest.name;
    if (elements.nestTitle)
        elements.nestTitle.textContent = currentNest.name;
    if (elements.nestBonus)
        elements.nestBonus.textContent = currentNest.bonus;
    if (gameState.nestLevel < NESTS.length - 1) {
        const nextNest = NESTS[gameState.nestLevel + 1];
        if (elements.nestCost)
            elements.nestCost.textContent = `업그레이드 비용: ${nextNest.cost} 골드`;
        if (elements.upgradeNestBtn)
            elements.upgradeNestBtn.disabled = false;
    }
    else {
        if (elements.nestCost)
            elements.nestCost.textContent = '업그레이드 비용: 최대 단계';
        if (elements.upgradeNestBtn)
            elements.upgradeNestBtn.disabled = true;
    }
}
function renderPokedex() {
    const typeNames = gameState.pokedexStats.typesDiscovered.map((key) => DRAGON_TYPES[key]?.name || key);
    if (elements.pokedexStats) {
        elements.pokedexStats.textContent = `총 키운 드래곤: ${gameState.pokedexStats.totalRaised}마리 | 발견 타입: ${typeNames.length}종 | 최고 등급: ${gameState.pokedexStats.highestTier}`;
    }
    if (!elements.pokedexList)
        return;
    if (gameState.pokedex.length === 0) {
        elements.pokedexList.innerHTML = '<div class="pokedex-item">아직 기록된 드래곤이 없습니다.</div>';
        return;
    }
    elements.pokedexList.innerHTML = gameState.pokedex
        .map((entry) => `
      <div class="pokedex-item">
        <strong>${entry.name}</strong> (${entry.gender}) - ${entry.type}
        <div>레벨: ${entry.level} | 진화 등급: ${entry.tier}</div>
        <div>조상: ${entry.ancestor}</div>
        <div>공격 ${entry.stats.attack} / 방어 ${entry.stats.defense} / 지능 ${entry.stats.intelligence} / 정신 ${entry.stats.spirit}</div>
      </div>
    `)
        .join('');
}
function spawnParticle(emoji) {
    if (!elements.particles)
        return;
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.textContent = emoji;
    particle.style.left = `${30 + Math.random() * 40}%`;
    particle.style.top = `${40 + Math.random() * 20}%`;
    elements.particles.appendChild(particle);
    setTimeout(() => particle.remove(), 1000);
}
function showMessage(msg) {
    if (elements.message)
        elements.message.textContent = msg;
}
function showNameModal() {
    if (elements.modalOverlay)
        elements.modalOverlay.classList.remove('hidden');
    if (elements.nameInput) {
        elements.nameInput.value = '';
        elements.nameInput.focus();
    }
}
function confirmName() {
    const name = elements.nameInput?.value.trim();
    if (name) {
        gameState.dragon.name = name;
    }
    else if (gameState.dragon.type) {
        const prefixes = ['작은', '빛나는', '용감한', '신비로운', '귀여운', '강력한'];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        gameState.dragon.name = `${prefix} ${DRAGON_TYPES[gameState.dragon.type].name}`;
    }
    if (elements.modalOverlay)
        elements.modalOverlay.classList.add('hidden');
    if (elements.dragonName && gameState.dragon.gender) {
        elements.dragonName.textContent = `${gameState.dragon.name} ${GENDERS[gameState.dragon.gender]}`;
    }
    if (gameState.dragon.type) {
        const typeData = DRAGON_TYPES[gameState.dragon.type];
        showMessage(`🎉 ${typeData.name} 타입의 ${gameState.dragon.name}이(가) 태어났습니다!`);
    }
    updateUI();
    startGameLoop();
}
function hatch() {
    if (gameState.isHatched)
        return;
    gameState.dragon.type = getRandomType();
    gameState.dragon.gender = getRandomGender();
    gameState.dragon.level = 1;
    gameState.dragon.exp = 0;
    gameState.dragon.stage = 1;
    gameState.isHatched = true;
    const typeData = DRAGON_TYPES[gameState.dragon.type];
    for (let i = 0; i < 10; i++) {
        setTimeout(() => spawnParticle(typeData.emoji), i * 100);
    }
    showNameModal();
}
function handleLevelUp() {
    if (!gameState.dragon.type)
        return;
    const typeData = DRAGON_TYPES[gameState.dragon.type];
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            spawnParticle('✨');
            spawnParticle(typeData.emoji);
        }, i * 80);
    }
    if (gameState.dragon.level === 15) {
        gameState.dragon.tier = calculateTier();
        showMessage(`🏆 ${gameState.dragon.name}이(가) 전설의 단계에 도달했습니다! 등급: ${gameState.dragon.tier}`);
        recordDragon();
    }
    else {
        const info = getStageInfo(gameState.dragon.level);
        showMessage(`🌟 ${gameState.dragon.name}이(가) ${info.label} ${info.phaseLevel}단계로 성장했습니다!`);
    }
}
function setCooldown(action) {
    gameState.cooldowns[action] = Date.now() + COOLDOWNS[action] * 1000;
}
function getCooldownRemaining(action) {
    return Math.max(0, gameState.cooldowns[action] - Date.now());
}
function updateCooldownUI() {
    const actions = [
        { key: 'hunt', btn: elements.huntBtn, label: elements.huntCooldown },
        { key: 'training', btn: elements.trainingBtn, label: elements.trainingCooldown },
        { key: 'education', btn: elements.educationBtn, label: elements.educationCooldown },
        { key: 'meditation', btn: elements.meditationBtn, label: elements.meditationCooldown },
        { key: 'exploration', btn: elements.explorationBtn, label: elements.explorationCooldown }
    ];
    actions.forEach((action) => {
        const remaining = getCooldownRemaining(action.key);
        if (remaining > 0) {
            const seconds = Math.ceil(remaining / 1000);
            if (action.label)
                action.label.textContent = `${seconds}초`;
            if (action.btn)
                action.btn.disabled = true;
        }
        else {
            if (action.label)
                action.label.textContent = '';
            if (action.btn)
                action.btn.disabled = gameState.dragon.isSleeping || !gameState.isHatched;
        }
    });
}
function canAct(action, energyCost = 0) {
    if (!gameState.isHatched) {
        showMessage('아직 알이에요! 먼저 부화시켜 주세요.');
        return false;
    }
    if (gameState.dragon.isSleeping) {
        showMessage('지금은 잠자는 중이에요.');
        return false;
    }
    if (getCooldownRemaining(action) > 0) {
        showMessage('쿨다운 중이에요.');
        return false;
    }
    if (gameState.dragon.energy < energyCost) {
        showMessage('에너지가 부족해요!');
        return false;
    }
    return true;
}
// === 액션 함수들 ===
function feed() {
    if (gameState.dragon.isSleeping)
        return;
    if (!gameState.isHatched) {
        gameState.dragon.growth = Math.min(15, gameState.dragon.growth + 3);
        spawnParticle('🍖');
        spawnParticle('💕');
        if (gameState.dragon.growth >= 15) {
            hatch();
        }
        else {
            showMessage(`알이 따뜻해지고 있어요! (${Math.round(gameState.dragon.growth)}/15)`);
        }
        updateUI();
        return;
    }
    gameState.dragon.hunger = Math.min(100, gameState.dragon.hunger + applyStatGain(20));
    gameState.dragon.happiness = Math.min(100, gameState.dragon.happiness + applyHappinessGain(4));
    gameState.dragon.totalFeeds += 1;
    addExp(8);
    spawnParticle('🍖');
    spawnParticle('💕');
    showMessage(`${gameState.dragon.name}이(가) 맛있게 먹었습니다! 🍖`);
    updateUI();
}
function play() {
    if (gameState.dragon.isSleeping || gameState.dragon.energy < 10)
        return;
    if (!gameState.isHatched) {
        gameState.dragon.growth = Math.min(15, gameState.dragon.growth + 5);
        spawnParticle('⚽');
        if (gameState.dragon.growth >= 15) {
            hatch();
        }
        else {
            showMessage(`알이 흔들리고 있어요! (${Math.round(gameState.dragon.growth)}/15)`);
        }
        updateUI();
        return;
    }
    gameState.dragon.happiness = Math.min(100, gameState.dragon.happiness + applyHappinessGain(25));
    gameState.dragon.energy = Math.max(0, gameState.dragon.energy - 15);
    gameState.dragon.hunger = Math.max(0, gameState.dragon.hunger - 5);
    gameState.dragon.totalPlays += 1;
    addExp(12);
    spawnParticle('⚽');
    spawnParticle('😄');
    spawnParticle('💫');
    showMessage(`${gameState.dragon.name}이(가) 신나게 놀았습니다! 🎉`);
    updateUI();
}
function sleep() {
    if (gameState.dragon.isSleeping)
        return;
    if (!gameState.isHatched) {
        gameState.dragon.growth = Math.min(15, gameState.dragon.growth + 2);
        spawnParticle('😴');
        if (gameState.dragon.growth >= 15) {
            hatch();
        }
        else {
            showMessage(`알이 조용히 숨 쉬고 있어요! (${Math.round(gameState.dragon.growth)}/15)`);
        }
        updateUI();
        return;
    }
    gameState.dragon.isSleeping = true;
    showMessage(`${gameState.dragon.name}이(가) 잠들었습니다... 💤`);
    updateUI();
    spawnParticle('😴');
    spawnParticle('💤');
    const sleepInterval = setInterval(() => {
        if (gameState.dragon.energy >= 100) {
            clearInterval(sleepInterval);
            gameState.dragon.isSleeping = false;
            addExp(8);
            showMessage(`${gameState.dragon.name}이(가) 상쾌하게 일어났습니다! ☀️`);
            updateUI();
            return;
        }
        gameState.dragon.energy = Math.min(100, gameState.dragon.energy + applyStatGain(10));
        spawnParticle('💤');
        updateUI();
    }, 500);
}
/**
 * 사냥 액션
 * 성공률: 35% + (레벨 + 공격력) / 120 (최대 90%)
 * 사냥감 등급은 레벨과 랜덤에 따라 결정
 */
function hunt() {
    if (!canAct('hunt', 12))
        return;
    gameState.dragon.energy = Math.max(0, gameState.dragon.energy - 12);
    const successRate = Math.min(0.9, 0.35 + (gameState.dragon.level + gameState.dragon.attack) / 120);
    gameState.dragon.totalHunts += 1;
    setCooldown('hunt');
    if (Math.random() > successRate) {
        spawnParticle('💨');
        showMessage(`${gameState.dragon.name}이(가) 사냥에 실패했습니다...`);
        updateUI();
        return;
    }
    const roll = Math.random();
    let prey = { grade: '하급', gold: [12, 22], exp: 16 };
    if (gameState.dragon.level >= 14 && roll > 0.9) {
        prey = { grade: '전설', gold: [90, 140], exp: 60 };
    }
    else if (gameState.dragon.level >= 11 && roll > 0.65) {
        prey = { grade: '상급', gold: [55, 85], exp: 40 };
    }
    else if (gameState.dragon.level >= 6 && roll > 0.3) {
        prey = { grade: '중급', gold: [30, 50], exp: 28 };
    }
    const goldGain = randomRange(prey.gold[0], prey.gold[1]);
    gameState.gold += goldGain;
    gameState.dragon.attack = Math.min(100, gameState.dragon.attack + applyStatGain(2));
    addExp(prey.exp);
    spawnParticle('🏹');
    spawnParticle('💰');
    showMessage(`${gameState.dragon.name}이(가) ${prey.grade} 먹잇감을 획득! +${goldGain} 골드`);
    saveStorage();
    updateUI();
}
function education() {
    if (!canAct('education', 8))
        return;
    gameState.dragon.energy = Math.max(0, gameState.dragon.energy - 8);
    gameState.dragon.intelligence = Math.min(100, gameState.dragon.intelligence + applyStatGain(3));
    gameState.dragon.totalEducation += 1;
    addExp(20);
    setCooldown('education');
    spawnParticle('📘');
    spawnParticle('✨');
    showMessage(`${gameState.dragon.name}이(가) 지식을 쌓았습니다!`);
    updateUI();
}
function training() {
    if (!canAct('training', 15))
        return;
    gameState.dragon.energy = Math.max(0, gameState.dragon.energy - 15);
    gameState.dragon.attack = Math.min(100, gameState.dragon.attack + applyStatGain(3));
    gameState.dragon.defense = Math.min(100, gameState.dragon.defense + applyStatGain(3));
    gameState.dragon.totalTraining += 1;
    addExp(18);
    setCooldown('training');
    spawnParticle('🥊');
    spawnParticle('🔥');
    showMessage(`${gameState.dragon.name}이(가) 단련을 마쳤습니다!`);
    updateUI();
}
/**
 * 명상 액션
 * 정신력 증가 + 특정 임계값에서 특수능력 해금
 * - 정신력 30: 영혼 가속
 * - 정신력 60: 정신 방벽
 * - 정신력 90: 천상 집중
 */
function meditation() {
    if (!canAct('meditation', 6))
        return;
    gameState.dragon.energy = Math.min(100, gameState.dragon.energy + applyStatGain(8));
    gameState.dragon.spirit = Math.min(100, gameState.dragon.spirit + applyStatGain(3));
    gameState.dragon.totalMeditation += 1;
    addExp(16);
    setCooldown('meditation');
    spawnParticle('🧘');
    spawnParticle('✨');
    if (gameState.dragon.spirit >= 30 && !gameState.dragon.unlockedAbilities.includes('영혼 가속')) {
        gameState.dragon.unlockedAbilities.push('영혼 가속');
        showMessage(`${gameState.dragon.name}이(가) 새로운 능력 '영혼 가속'을 깨달았습니다!`);
    }
    else if (gameState.dragon.spirit >= 60 && !gameState.dragon.unlockedAbilities.includes('정신 방벽')) {
        gameState.dragon.unlockedAbilities.push('정신 방벽');
        showMessage(`${gameState.dragon.name}이(가) 새로운 능력 '정신 방벽'을 깨달았습니다!`);
    }
    else if (gameState.dragon.spirit >= 90 && !gameState.dragon.unlockedAbilities.includes('천상 집중')) {
        gameState.dragon.unlockedAbilities.push('천상 집중');
        showMessage(`${gameState.dragon.name}이(가) 새로운 능력 '천상 집중'을 깨달았습니다!`);
    }
    else {
        showMessage(`${gameState.dragon.name}이(가) 마음의 평화를 얻었습니다.`);
    }
    updateUI();
}
/**
 * 탐험 액션
 * 성공 시 골드, 희귀 유물, 또는 알 흔적 발견
 */
function exploration() {
    if (!canAct('exploration', 10))
        return;
    gameState.dragon.energy = Math.max(0, gameState.dragon.energy - 10);
    gameState.dragon.totalExplorations += 1;
    setCooldown('exploration');
    const successRate = Math.min(0.9, 0.4 + gameState.dragon.level / 25);
    if (Math.random() > successRate) {
        spawnParticle('🧭');
        showMessage(`${gameState.dragon.name}이(가) 아무것도 찾지 못했습니다.`);
        updateUI();
        return;
    }
    const roll = Math.random();
    if (roll < 0.5) {
        const goldGain = randomRange(15, 45);
        gameState.gold += goldGain;
        addExp(18);
        spawnParticle('💰');
        showMessage(`${gameState.dragon.name}이(가) 숨겨진 보물을 발견! +${goldGain} 골드`);
    }
    else if (roll < 0.8) {
        addExp(22);
        spawnParticle('✨');
        showMessage(`${gameState.dragon.name}이(가) 희귀한 유물을 발견했습니다!`);
    }
    else {
        addExp(30);
        spawnParticle('🥚');
        showMessage(`${gameState.dragon.name}이(가) 신비한 알의 흔적을 발견했습니다!`);
    }
    saveStorage();
    updateUI();
}
function upgradeNest() {
    if (gameState.nestLevel >= NESTS.length - 1)
        return;
    const nextNest = NESTS[gameState.nestLevel + 1];
    if (gameState.gold < nextNest.cost) {
        showMessage('골드가 부족합니다.');
        return;
    }
    gameState.gold -= nextNest.cost;
    gameState.nestLevel += 1;
    saveStorage();
    showMessage(`${nextNest.name}로 업그레이드되었습니다!`);
    updateUI();
}
function newEgg() {
    if (gameState.gameInterval)
        clearInterval(gameState.gameInterval);
    if (gameState.isHatched && gameState.dragon.level >= 15 && !gameState.dragon.recorded) {
        gameState.dragon.tier = gameState.dragon.tier || calculateTier();
        recordDragon();
    }
    gameState.dragon = createNewDragon();
    gameState.isHatched = false;
    if (elements.dragonName)
        elements.dragonName.textContent = '??? 의 알';
    if (elements.typeBadge)
        elements.typeBadge.className = 'type-badge hidden';
    if (elements.genderBadge)
        elements.genderBadge.classList.add('hidden');
    showMessage('🥚 새로운 알이 도착했습니다! 어떤 드래곤이 나올까요?');
    updateUI();
}
function startGameLoop() {
    if (gameState.gameInterval)
        clearInterval(gameState.gameInterval);
    gameState.gameInterval = setInterval(() => {
        if (!gameState.isHatched || gameState.dragon.isSleeping)
            return;
        gameState.dragon.hunger = Math.max(0, gameState.dragon.hunger - 1);
        gameState.dragon.happiness = Math.max(0, gameState.dragon.happiness - 0.6);
        gameState.dragon.energy = Math.max(0, gameState.dragon.energy - 0.4);
        if (gameState.dragon.hunger < 20) {
            showMessage(`${gameState.dragon.name}이(가) 배고파합니다! 🍖`);
        }
        else if (gameState.dragon.happiness < 20) {
            showMessage(`${gameState.dragon.name}이(가) 심심해합니다! 🎾`);
        }
        else if (gameState.dragon.energy < 20) {
            showMessage(`${gameState.dragon.name}이(가) 피곤해합니다! 😴`);
        }
        updateUI();
    }, 1000);
}
function handleEggClick() {
    if (!gameState.isHatched) {
        gameState.dragon.growth = Math.min(15, gameState.dragon.growth + 5);
        spawnParticle('💕');
        if (gameState.dragon.growth >= 15) {
            hatch();
        }
        else {
            showMessage(`알이 흔들리고 있어요! (${Math.round(gameState.dragon.growth)}/15)`);
        }
        updateUI();
    }
}
function setActiveTab(tabKey) {
    elements.tabButtons.forEach((button) => {
        button.classList.toggle('active', button.dataset.tab === tabKey);
    });
    elements.tabPanels.forEach((panel) => {
        panel.classList.toggle('active', panel.dataset.panel === tabKey);
    });
}
// === 전역 함수 내보내기 (HTML onclick용) ===
window.feed = feed;
window.play = play;
window.sleep = sleep;
window.hunt = hunt;
window.education = education;
window.training = training;
window.meditation = meditation;
window.exploration = exploration;
window.upgradeNest = upgradeNest;
window.newEgg = newEgg;
window.confirmName = confirmName;
// === 초기화 ===
document.addEventListener('DOMContentLoaded', () => {
    initElements();
    loadStorage();
    if (elements.spriteContainer) {
        elements.spriteContainer.addEventListener('click', handleEggClick);
    }
    if (elements.nameInput) {
        elements.nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter')
                confirmName();
        });
    }
    elements.tabButtons.forEach((button) => {
        button.addEventListener('click', () => setActiveTab(button.dataset.tab || ''));
    });
    updateUI();
    renderPokedex();
    if (gameState.cooldownInterval)
        clearInterval(gameState.cooldownInterval);
    gameState.cooldownInterval = setInterval(updateCooldownUI, 500);
    updateCooldownUI();
});
//# sourceMappingURL=game.js.map
