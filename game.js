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
    stats: 'dragonStats',
    dragon: 'dragonCurrent',
    isHatched: 'dragonHatched',
    cooldowns: 'dragonCooldowns'
};
const SPRITE_CONFIG = {
    basePath: 'assets/sprites/',
    typeMapping: {
        fire: { file: 'dragon-fire.png', tint: '' },
        water: { file: 'dragon-water.png', tint: '' },
        earth: { file: 'dragon-earth.png', tint: '' },
        wind: { file: 'dragon-air.png', tint: '' },
        electric: { file: 'dragon-fire.png', tint: 'sprite-tint-electric' },
        ice: { file: 'dragon-water.png', tint: 'sprite-tint-ice' },
        grass: { file: 'dragon-earth.png', tint: 'sprite-tint-grass' },
        dark: { file: 'dragon-earth.png', tint: 'sprite-tint-dark' },
        light: { file: 'dragon-air.png', tint: 'sprite-tint-light' },
        psychic: { file: 'dragon-water.png', tint: 'sprite-tint-psychic' },
        rock: { file: 'dragon-earth.png', tint: 'sprite-tint-rock' },
        speed: { file: 'dragon-air.png', tint: 'sprite-tint-speed' },
        poison: { file: 'dragon-water.png', tint: 'sprite-tint-poison' },
        metal: { file: 'dragon-earth.png', tint: 'sprite-tint-metal' }
    }
};
/**
 * AI 생성 이미지 설정
 * 성장 단계별 이미지 경로 및 사용 가능 여부
 */
const AI_SPRITE_CONFIG = {
    basePath: 'assets/sprites/ai-generated/',
    stages: {
        baby: { file: 'dragon-baby.png', available: true },
        teen: { file: 'dragon-teen.png', available: true },
        adult: { file: 'dragon-adult.png', available: true },
        legendary: { file: 'dragon-legendary.png', available: false }
    }
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
    pokedexModalOverlay: null,
    pokedexModalContent: null,
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
    elements.pokedexModalOverlay = document.getElementById('pokedexModalOverlay');
    elements.pokedexModalContent = document.getElementById('pokedexModalContent');
    elements.tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
    elements.tabPanels = Array.from(document.querySelectorAll('.tab-panel'));
}
function loadStorage() {
    const savedGold = Number(localStorage.getItem(STORAGE_KEYS.gold));
    const savedNest = Number(localStorage.getItem(STORAGE_KEYS.nest));
    const savedPokedex = localStorage.getItem(STORAGE_KEYS.pokedex);
    const savedStats = localStorage.getItem(STORAGE_KEYS.stats);
    const savedDragon = localStorage.getItem(STORAGE_KEYS.dragon);
    const savedHatched = localStorage.getItem(STORAGE_KEYS.isHatched);
    const savedCooldowns = localStorage.getItem(STORAGE_KEYS.cooldowns);
    gameState.gold = Number.isFinite(savedGold) ? savedGold : 0;
    gameState.nestLevel = Number.isFinite(savedNest) ? Math.min(Math.max(savedNest, 0), NESTS.length - 1) : 0;
    gameState.pokedex = savedPokedex ? JSON.parse(savedPokedex) : [];
    gameState.pokedexStats = savedStats ? JSON.parse(savedStats) : { totalRaised: 0, typesDiscovered: [], highestTier: '없음' };
    if (savedDragon) {
        try {
            gameState.dragon = JSON.parse(savedDragon);
        }
        catch {
            gameState.dragon = createNewDragon();
        }
    }
    gameState.isHatched = savedHatched === 'true';
    // 쿨다운: 저장 시점 기준 경과 시간을 차감하여 복원
    if (savedCooldowns) {
        try {
            const cooldownData = JSON.parse(savedCooldowns);
            const now = Date.now();
            const elapsed = Math.floor((now - (cooldownData.savedAt || now)) / 1000);
            gameState.cooldowns = {
                hunt: Math.max(0, (cooldownData.hunt || 0) - elapsed),
                education: Math.max(0, (cooldownData.education || 0) - elapsed),
                exploration: Math.max(0, (cooldownData.exploration || 0) - elapsed),
                training: Math.max(0, (cooldownData.training || 0) - elapsed),
                meditation: Math.max(0, (cooldownData.meditation || 0) - elapsed)
            };
        }
        catch { }
    }
}
function saveStorage() {
    localStorage.setItem(STORAGE_KEYS.gold, String(gameState.gold));
    localStorage.setItem(STORAGE_KEYS.nest, String(gameState.nestLevel));
    localStorage.setItem(STORAGE_KEYS.pokedex, JSON.stringify(gameState.pokedex));
    localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(gameState.pokedexStats));
    localStorage.setItem(STORAGE_KEYS.dragon, JSON.stringify(gameState.dragon));
    localStorage.setItem(STORAGE_KEYS.isHatched, String(gameState.isHatched));
    localStorage.setItem(STORAGE_KEYS.cooldowns, JSON.stringify({
        ...gameState.cooldowns,
        savedAt: Date.now()
    }));
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


const spriteCache = {};
const aiSpriteCache = {};
let spritesChecked = false;
let aiSpritesChecked = false;
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
function checkSpriteAvailability() {
    if (spritesChecked)
        return;
    spritesChecked = true;
    const files = ['dragon-fire.png', 'dragon-water.png', 'dragon-earth.png', 'dragon-air.png'];
    files.forEach(file => {
        const img = new Image();
        img.onload = () => { spriteCache[file] = true; };
        img.onerror = () => { spriteCache[file] = false; };
        img.src = SPRITE_CONFIG.basePath + file;
    });
}
function checkAiSpriteAvailability() {
    if (aiSpritesChecked)
        return;
    aiSpritesChecked = true;
    Object.entries(AI_SPRITE_CONFIG.stages).forEach(([stage, config]) => {
        if (config.available) {
            const img = new Image();
            img.onload = () => { aiSpriteCache[stage] = true; };
            img.onerror = () => { aiSpriteCache[stage] = false; };
            img.src = AI_SPRITE_CONFIG.basePath + config.file;
        }
    });
}
function getAiSpriteStage(level) {
    if (level <= 5)
        return 'baby';
    if (level <= 10)
        return 'teen';
    if (level <= 14)
        return 'adult';
    return 'legendary';
}
function hasAiSpriteFor(level) {
    const stage = getAiSpriteStage(level);
    const config = AI_SPRITE_CONFIG.stages[stage];
    return config.available && aiSpriteCache[stage] === true;
}
function createAiSpriteDragon(level, isSleeping) {
    const stage = getAiSpriteStage(level);
    const config = AI_SPRITE_CONFIG.stages[stage];
    const sizeClass = getStageSizeClass(level);
    const animClass = isSleeping ? 'sleeping' : 'idle';
    const src = AI_SPRITE_CONFIG.basePath + config.file;
    return `<div class="ai-sprite-dragon ${sizeClass} ${animClass}" style="background-image: url('${src}')"></div>`;
}
function createCSSFallbackDragon(type, level, showComingSoon) {
    const stageClass = getStageInfo(level).stageClass;
    let html = `<div class="dragon-fallback-container">`;
    html += `<div class="dragon-body ${stageClass} dragon-${type}">`;
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
    if (showComingSoon) {
        html += '<span class="coming-soon-badge">추후 이미지 추가예정</span>';
    }
    html += '</div>';
    return html;
}
function getStageSizeClass(level) {
    if (level <= 5)
        return 'baby';
    if (level <= 10)
        return 'teen';
    if (level <= 14)
        return 'adult';
    return 'legendary';
}
function createEggSprite() {
    return '<div class="pixel-egg"></div>';
}
function createDragonSprite(type, level, isSleeping = false) {
    if (hasAiSpriteFor(level)) {
        return createAiSpriteDragon(level, isSleeping);
    }
    const stage = getAiSpriteStage(level);
    const aiConfig = AI_SPRITE_CONFIG.stages[stage];
    const showComingSoon = !aiConfig.available;
    return createCSSFallbackDragon(type, level, showComingSoon);
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
            elements.spriteContainer.innerHTML = createDragonSprite(dragon.type, dragon.level, dragon.isSleeping);
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
        elements.pokedexList.innerHTML = '<div class="pokedex-empty">아직 기록된 드래곤이 없습니다.</div>';
        return;
    }
    elements.pokedexList.innerHTML = gameState.pokedex
        .map((entry, index) => {
        const typeInfo = DRAGON_TYPES[entry.typeKey];
        const emoji = typeInfo?.emoji || '🐉';
        const tierClass = entry.tier === '상급' ? 'tier-high' : entry.tier === '중급' ? 'tier-mid' : 'tier-low';
        return `
        <div class="pokedex-card" data-index="${index}">
          <div class="pokedex-card-emoji">${emoji}</div>
          <div class="pokedex-card-name">${entry.name}</div>
          <div class="pokedex-card-info">${entry.gender} Lv.${entry.level}</div>
          <div class="pokedex-card-tier ${tierClass}">${entry.tier}</div>
        </div>
      `;
    })
        .join('');
    elements.pokedexList.querySelectorAll('.pokedex-card').forEach((card) => {
        card.addEventListener('click', () => {
            const index = Number(card.dataset.index);
            showPokedexDetail(index);
        });
    });
}
function showPokedexDetail(index) {
    const entry = gameState.pokedex[index];
    if (!entry || !elements.pokedexModalOverlay || !elements.pokedexModalContent)
        return;
    const typeInfo = DRAGON_TYPES[entry.typeKey];
    const emoji = typeInfo?.emoji || '🐉';
    const color = typeInfo?.color || '#4a90d9';
    elements.pokedexModalContent.innerHTML = `
    <div class="pokedex-detail-header" style="border-color: ${color}">
      <span class="pokedex-detail-emoji">${emoji}</span>
      <div class="pokedex-detail-title">
        <div class="pokedex-detail-name">${entry.name}</div>
        <div class="pokedex-detail-sub">${entry.type} 타입 ${entry.gender}</div>
      </div>
    </div>
    <div class="pokedex-detail-body">
      <div class="pokedex-detail-row">
        <span>레벨</span><span>Lv.${entry.level}</span>
      </div>
      <div class="pokedex-detail-row">
        <span>진화 등급</span><span>${entry.tier}</span>
      </div>
      <div class="pokedex-detail-row">
        <span>조상 드래곤</span><span>${entry.ancestor}</span>
      </div>
      <div class="pokedex-detail-divider"></div>
      <div class="pokedex-detail-row">
        <span>공격력</span><span>${entry.stats.attack}</span>
      </div>
      <div class="pokedex-detail-row">
        <span>방어력</span><span>${entry.stats.defense}</span>
      </div>
      <div class="pokedex-detail-row">
        <span>지능</span><span>${entry.stats.intelligence}</span>
      </div>
      <div class="pokedex-detail-row">
        <span>정신력</span><span>${entry.stats.spirit}</span>
      </div>
    </div>
  `;
    elements.pokedexModalOverlay.classList.remove('hidden');
}
function closePokedexModal() {
    if (elements.pokedexModalOverlay) {
        elements.pokedexModalOverlay.classList.add('hidden');
    }
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
async function shareDragon() {
    const dragon = gameState.dragon;
    const typeInfo = dragon.type ? DRAGON_TYPES[dragon.type] : null;
    let shareText;
    if (!gameState.isHatched) {
        shareText = '🥚 드래곤 타마고치에서 알을 키우고 있어요! 어떤 드래곤이 나올까요?';
    }
    else {
        const emoji = typeInfo?.emoji || '🐉';
        const typeName = typeInfo?.name || '???';
        shareText = `${emoji} ${dragon.name}(Lv.${dragon.level}) - ${typeName} 타입 드래곤을 키우고 있어요!`;
    }
    const shareData = {
        title: '드래곤 타마고치',
        text: shareText,
        url: 'https://skh417.github.io/oh-my-dragons/'
    };
    if (navigator.share) {
        try {
            await navigator.share(shareData);
        }
        catch (err) {
            if (err.name !== 'AbortError') {
                fallbackShare(shareText);
            }
        }
    }
    else {
        fallbackShare(shareText);
    }
}
function fallbackShare(text) {
    const url = 'https://skh417.github.io/oh-my-dragons/';
    const fullText = `${text}\n${url}`;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(fullText).then(() => {
            showMessage('📋 클립보드에 복사되었습니다!');
        }).catch(() => {
            showMessage('공유 링크를 복사할 수 없습니다.');
        });
    }
    else {
        showMessage('공유 기능을 사용할 수 없습니다.');
    }
}
function newEgg() {
    const hasUnrecordedProgress = gameState.isHatched && !gameState.dragon.recorded;
    if (hasUnrecordedProgress) {
        const dragonName = gameState.dragon.name || '현재 드래곤';
        const level = gameState.dragon.level;
        const confirmMessage = level >= 15
            ? `${dragonName}(Lv.${level})을(를) 도감에 등록하고 새 알을 받으시겠습니까?`
            : `⚠️ ${dragonName}(Lv.${level})은 아직 도감에 등록되지 않습니다.\n(Lv.15 이상 필요)\n\n정말 새 알을 받으시겠습니까? 현재 드래곤은 사라집니다.`;
        if (!confirm(confirmMessage)) {
            return;
        }
    }
    if (gameState.gameInterval)
        clearInterval(gameState.gameInterval);
    if (gameState.isHatched && gameState.dragon.level >= 15 && !gameState.dragon.recorded) {
        gameState.dragon.tier = gameState.dragon.tier || calculateTier();
        recordDragon();
    }
    gameState.dragon = createNewDragon();
    gameState.isHatched = false;
    saveStorage();
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
window.closePokedexModal = closePokedexModal;
window.shareDragon = shareDragon;
// === 초기화 ===
document.addEventListener('DOMContentLoaded', () => {
    initElements();
    loadStorage();
    checkSpriteAvailability();
    checkAiSpriteAvailability();
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
    if (elements.pokedexModalOverlay) {
        elements.pokedexModalOverlay.addEventListener('click', (e) => {
            if (e.target === elements.pokedexModalOverlay)
                closePokedexModal();
        });
    }
    updateUI();
    renderPokedex();
    if (gameState.cooldownInterval)
        clearInterval(gameState.cooldownInterval);
    gameState.cooldownInterval = setInterval(updateCooldownUI, 500);
    updateCooldownUI();
});
//# sourceMappingURL=game.js.map
