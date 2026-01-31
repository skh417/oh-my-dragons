const DRAGON_TYPES = {
  fire: { name: '불', emoji: '🔥', color: '#ff6b35' },
  water: { name: '물', emoji: '💧', color: '#4a90d9' },
  earth: { name: '땅', emoji: '🏔️', color: '#8b7355' },
  dark: { name: '어둠', emoji: '🌑', color: '#5a4a7a' },
  light: { name: '빛', emoji: '✨', color: '#fff8dc' },
  speed: { name: '스피드', emoji: '💨', color: '#00d4aa' },
  electric: { name: '전기', emoji: '⚡', color: '#ffd700' },
  wind: { name: '바람', emoji: '🌪️', color: '#87ceeb' },
  psychic: { name: '초능력', emoji: '🔮', color: '#ff69b4' },
  grass: { name: '풀', emoji: '🌿', color: '#3cb371' },
  rock: { name: '바위', emoji: '🪨', color: '#808080' },
  ice: { name: '얼음', emoji: '❄️', color: '#add8e6' }
};

const STAGES = ['알', '아기', '청소년', '성체'];
const STAGE_THRESHOLDS = [0, 25, 50, 100];
const GENDERS = { male: '♂', female: '♀' };

let dragon = {
  type: null,
  stage: 0,
  hunger: 100,
  happiness: 100,
  energy: 100,
  growth: 0,
  isSleeping: false,
  name: '???',
  gender: null
};

let gameInterval = null;
let isHatched = false;

const elements = {};

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
  elements.modalOverlay = document.getElementById('modalOverlay');
  elements.nameInput = document.getElementById('nameInput');
}

function getRandomType() {
  const types = Object.keys(DRAGON_TYPES);
  return types[Math.floor(Math.random() * types.length)];
}

function getRandomGender() {
  return Math.random() < 0.5 ? 'male' : 'female';
}

function createEggSprite() {
  return '<div class="pixel-egg"></div>';
}

function createDragonSprite(type, stage) {
  const stageClass = stage === 1 ? 'dragon-baby' : stage === 2 ? 'dragon-teen' : 'dragon-adult';
  
  let html = `<div class="dragon-body ${stageClass} dragon-${type}">`;
  html += '<div class="head">';
  
  if (stage >= 2) {
    html += '<div class="horn left"></div>';
    html += '<div class="horn right"></div>';
  }
  
  html += '<div class="eye left"></div>';
  html += '<div class="eye right"></div>';
  html += '</div>';
  
  if (stage === 3) {
    html += '<div class="wing left"></div>';
    html += '<div class="wing right"></div>';
  }
  
  html += '<div class="body"></div>';
  html += '<div class="tail"></div>';
  html += '</div>';
  
  return html;
}

function updateUI() {
  elements.hungerBar.style.width = `${dragon.hunger}%`;
  elements.happinessBar.style.width = `${dragon.happiness}%`;
  elements.energyBar.style.width = `${dragon.energy}%`;
  elements.growthBar.style.width = `${dragon.growth}%`;
  
  elements.hungerValue.textContent = Math.round(dragon.hunger);
  elements.happinessValue.textContent = Math.round(dragon.happiness);
  elements.energyValue.textContent = Math.round(dragon.energy);
  elements.growthValue.textContent = Math.round(dragon.growth);

  elements.stageBadge.textContent = STAGES[dragon.stage];

  if (!isHatched) {
    elements.spriteContainer.innerHTML = createEggSprite();
    elements.spriteContainer.className = 'dragon-sprite-container egg';
    elements.genderBadge.classList.add('hidden');
  } else {
    elements.spriteContainer.innerHTML = createDragonSprite(dragon.type, dragon.stage);
    elements.spriteContainer.className = dragon.isSleeping ? 'dragon-sprite-container sleeping' : 'dragon-sprite-container';
    
    const typeData = DRAGON_TYPES[dragon.type];
    elements.typeBadge.textContent = `${typeData.emoji} ${typeData.name}`;
    elements.typeBadge.className = `type-badge type-${dragon.type}`;
    
    elements.genderBadge.textContent = GENDERS[dragon.gender];
    elements.genderBadge.classList.remove('hidden');
  }

  elements.feedBtn.disabled = dragon.isSleeping;
  elements.playBtn.disabled = dragon.isSleeping || dragon.energy < 10;
  elements.sleepBtn.disabled = dragon.isSleeping;
}

function spawnParticle(emoji) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.textContent = emoji;
  particle.style.left = `${30 + Math.random() * 40}%`;
  particle.style.top = `${40 + Math.random() * 20}%`;
  elements.particles.appendChild(particle);
  setTimeout(() => particle.remove(), 1000);
}

function showMessage(msg) {
  elements.message.textContent = msg;
}

function showNameModal() {
  elements.modalOverlay.classList.remove('hidden');
  elements.nameInput.value = '';
  elements.nameInput.focus();
}

function confirmName() {
  const name = elements.nameInput.value.trim();
  if (name) {
    dragon.name = name;
  } else {
    const prefixes = ['작은', '빛나는', '용감한', '신비로운', '귀여운', '강력한'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    dragon.name = `${prefix} ${DRAGON_TYPES[dragon.type].name}`;
  }
  
  elements.modalOverlay.classList.add('hidden');
  elements.dragonName.textContent = `${dragon.name} ${GENDERS[dragon.gender]}`;
  
  const typeData = DRAGON_TYPES[dragon.type];
  showMessage(`🎉 ${typeData.name} 타입의 ${dragon.name}이(가) 태어났습니다!`);
  updateUI();
  startGameLoop();
}

function hatch() {
  if (isHatched) return;
  
  dragon.type = getRandomType();
  dragon.gender = getRandomGender();
  dragon.stage = 1;
  isHatched = true;

  const typeData = DRAGON_TYPES[dragon.type];
  
  for (let i = 0; i < 10; i++) {
    setTimeout(() => spawnParticle(typeData.emoji), i * 100);
  }
  
  showNameModal();
}

function feed() {
  if (dragon.isSleeping) return;
  
  dragon.hunger = Math.min(100, dragon.hunger + 20);
  dragon.growth += 3;
  
  spawnParticle('🍖');
  spawnParticle('💕');
  
  if (!isHatched) {
    hatch();
  } else {
    showMessage(`${dragon.name}이(가) 맛있게 먹었습니다! 🍖`);
    checkEvolution();
  }
  updateUI();
}

function play() {
  if (dragon.isSleeping || dragon.energy < 10) return;
  
  dragon.happiness = Math.min(100, dragon.happiness + 25);
  dragon.energy = Math.max(0, dragon.energy - 15);
  dragon.hunger = Math.max(0, dragon.hunger - 5);
  dragon.growth += 5;
  
  spawnParticle('⚽');
  spawnParticle('😄');
  spawnParticle('💫');
  
  if (!isHatched) {
    hatch();
  } else {
    showMessage(`${dragon.name}이(가) 신나게 놀았습니다! 🎉`);
    checkEvolution();
  }
  updateUI();
}

function sleep() {
  if (dragon.isSleeping) return;
  
  dragon.isSleeping = true;
  showMessage(`${dragon.name}이(가) 잠들었습니다... 💤`);
  updateUI();
  
  spawnParticle('😴');
  spawnParticle('💤');
  
  const sleepInterval = setInterval(() => {
    if (dragon.energy >= 100) {
      clearInterval(sleepInterval);
      dragon.isSleeping = false;
      dragon.growth += 2;
      showMessage(`${dragon.name}이(가) 상쾌하게 일어났습니다! ☀️`);
      checkEvolution();
      updateUI();
      return;
    }
    dragon.energy = Math.min(100, dragon.energy + 10);
    spawnParticle('💤');
    updateUI();
  }, 500);
  
  if (!isHatched) {
    hatch();
  }
}

function checkEvolution() {
  const newStage = STAGE_THRESHOLDS.reduce((stage, threshold, i) => 
    dragon.growth >= threshold ? i : stage, 0);
  
  if (newStage > dragon.stage && dragon.stage < 3) {
    dragon.stage = newStage;
    const typeData = DRAGON_TYPES[dragon.type];
    
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        spawnParticle('✨');
        spawnParticle(typeData.emoji);
      }, i * 100);
    }
    
    if (newStage === 3) {
      showMessage(`🎊 축하합니다! ${dragon.name}이(가) 완전한 성체가 되었습니다! 🐉`);
    } else {
      showMessage(`🌟 ${dragon.name}이(가) ${STAGES[newStage]}(으)로 성장했습니다!`);
    }
  }
}

function newEgg() {
  if (gameInterval) clearInterval(gameInterval);
  
  dragon = {
    type: null,
    stage: 0,
    hunger: 100,
    happiness: 100,
    energy: 100,
    growth: 0,
    isSleeping: false,
    name: '???',
    gender: null
  };
  
  isHatched = false;
  elements.dragonName.textContent = '??? 의 알';
  elements.typeBadge.className = 'type-badge hidden';
  elements.genderBadge.classList.add('hidden');
  
  showMessage('🥚 새로운 알이 도착했습니다! 어떤 드래곤이 나올까요?');
  updateUI();
}

function startGameLoop() {
  if (gameInterval) clearInterval(gameInterval);
  
  gameInterval = setInterval(() => {
    if (!isHatched || dragon.isSleeping) return;
    
    dragon.hunger = Math.max(0, dragon.hunger - 1);
    dragon.happiness = Math.max(0, dragon.happiness - 0.5);
    dragon.energy = Math.max(0, dragon.energy - 0.3);
    
    if (dragon.hunger < 20) {
      showMessage(`${dragon.name}이(가) 배고파합니다! 🍖`);
    } else if (dragon.happiness < 20) {
      showMessage(`${dragon.name}이(가) 심심해합니다! 🎾`);
    } else if (dragon.energy < 20) {
      showMessage(`${dragon.name}이(가) 피곤해합니다! 😴`);
    }
    
    updateUI();
  }, 1000);
}

function handleEggClick() {
  if (!isHatched) {
    dragon.growth += 5;
    spawnParticle('💕');
    if (dragon.growth >= 15) {
      hatch();
    } else {
      showMessage(`알이 흔들리고 있어요! (${Math.round(dragon.growth)}/15)`);
    }
    updateUI();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initElements();
  
  elements.spriteContainer.addEventListener('click', handleEggClick);
  
  elements.nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') confirmName();
  });
  
  updateUI();
});
