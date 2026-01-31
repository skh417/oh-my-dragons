/**
 * =============================================================================
 * 드래곤 타마고치 - 메인 게임 로직
 * =============================================================================
 */

import type { StageInfo, CooldownAction, EvolutionTier, HuntResult, DragonTypeKey } from './types';
import { DRAGON_TYPES, GENDERS, COOLDOWNS, NESTS, SPRITE_CONFIG, AI_SPRITE_CONFIG, getExpToNextLevel } from './constants';
import { gameState, elements, initElements, loadStorage, saveStorage, createNewDragon, getRandomType, getRandomGender, randomRange } from './state';

const spriteCache: Record<string, boolean> = {};
const aiSpriteCache: Record<string, boolean> = {};
let spritesChecked = false;
let aiSpritesChecked = false;

/**
 * 레벨에 따른 성장 단계 정보 반환
 * - 레벨 1-5: 아기
 * - 레벨 6-10: 청소년
 * - 레벨 11-14: 성체
 * - 레벨 15: 전설
 */
function getStageInfo(level: number): StageInfo {
  if (level <= 5) return { label: '아기', stageClass: 'dragon-baby', phaseLevel: level };
  if (level <= 10) return { label: '청소년', stageClass: 'dragon-teen', phaseLevel: level - 5 };
  if (level <= 14) return { label: '성체', stageClass: 'dragon-adult', phaseLevel: level - 10 };
  return { label: '전설', stageClass: 'dragon-adult', phaseLevel: 5 };
}

function getStageBadgeText(): string {
  if (!gameState.isHatched) return '알';
  const info = getStageInfo(gameState.dragon.level);
  if (gameState.dragon.level === 15) return '전설';
  return `${info.label} ${info.phaseLevel}단계`;
}

function getNestEffects() {
  return NESTS[gameState.nestLevel] || NESTS[0];
}

/**
 * 둥지 효과가 적용된 행복도 증가량 계산
 */
function applyHappinessGain(amount: number): number {
  return Math.round(amount * getNestEffects().happinessGain);
}

/**
 * 둥지 효과가 적용된 스탯 증가량 계산
 */
function applyStatGain(amount: number): number {
  return Math.round(amount * getNestEffects().statGain);
}

/**
 * 경험치 추가 및 레벨업 처리
 * 경험치가 필요량을 초과하면 자동으로 레벨업
 */
function addExp(amount: number): void {
  if (!gameState.isHatched || gameState.dragon.level >= 15) return;
  
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
function calculateTier(): EvolutionTier {
  const { hunger, happiness, energy, attack, defense, intelligence, spirit } = gameState.dragon;
  const avg = (hunger + happiness + energy + attack + defense + intelligence + spirit) / 7;
  if (avg < 45) return '하급';
  if (avg < 75) return '중급';
  return '상급';
}

/**
 * 드래곤을 도감에 기록
 * 레벨 15 도달 시 자동 호출됨
 */
function recordDragon(): void {
  if (!gameState.isHatched || gameState.dragon.recorded || !gameState.dragon.type) return;
  
  const typeData = DRAGON_TYPES[gameState.dragon.type];
  const entry = {
    name: gameState.dragon.name,
    type: typeData.name,
    typeKey: gameState.dragon.type,
    gender: GENDERS[gameState.dragon.gender!],
    level: gameState.dragon.level,
    tier: gameState.dragon.tier || '미정' as const,
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

  const tierRank: Record<string, number> = { '하급': 1, '중급': 2, '상급': 3, '없음': 0 };
  const currentRank = tierRank[gameState.pokedexStats.highestTier] || 0;
  const newRank = tierRank[entry.tier] || 0;
  if (newRank > currentRank) {
    gameState.pokedexStats.highestTier = entry.tier as EvolutionTier;
  }

  gameState.dragon.recorded = true;
  saveStorage();
  renderPokedex();
}

function checkSpriteAvailability(): void {
  if (spritesChecked) return;
  spritesChecked = true;
  
  const files = ['dragon-fire.png', 'dragon-water.png', 'dragon-earth.png', 'dragon-air.png'];
  files.forEach(file => {
    const img = new Image();
    img.onload = () => { spriteCache[file] = true; };
    img.onerror = () => { spriteCache[file] = false; };
    img.src = SPRITE_CONFIG.basePath + file;
  });
}

function checkAiSpriteAvailability(): void {
  if (aiSpritesChecked) return;
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

function getAiSpriteStage(level: number): 'baby' | 'teen' | 'adult' | 'legendary' {
  if (level <= 5) return 'baby';
  if (level <= 10) return 'teen';
  if (level <= 14) return 'adult';
  return 'legendary';
}

function hasAiSpriteFor(level: number): boolean {
  const stage = getAiSpriteStage(level);
  const config = AI_SPRITE_CONFIG.stages[stage];
  return config.available && aiSpriteCache[stage] === true;
}

function createAiSpriteDragon(level: number, isSleeping: boolean): string {
  const stage = getAiSpriteStage(level);
  const config = AI_SPRITE_CONFIG.stages[stage];
  const sizeClass = getStageSizeClass(level);
  const animClass = isSleeping ? 'sleeping' : 'idle';
  const src = AI_SPRITE_CONFIG.basePath + config.file;
  
  return `<div class="ai-sprite-dragon ${sizeClass} ${animClass}" style="background-image: url('${src}')"></div>`;
}

function createCSSFallbackDragon(type: string, level: number, showComingSoon: boolean): string {
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

function getStageSizeClass(level: number): string {
  if (level <= 5) return 'baby';
  if (level <= 10) return 'teen';
  if (level <= 14) return 'adult';
  return 'legendary';
}

function createEggSprite(): string {
  return '<div class="pixel-egg"></div>';
}

function createDragonSprite(type: string, level: number, isSleeping: boolean = false): string {
  if (hasAiSpriteFor(level)) {
    return createAiSpriteDragon(level, isSleeping);
  }
  
  const stage = getAiSpriteStage(level);
  const aiConfig = AI_SPRITE_CONFIG.stages[stage];
  const showComingSoon = !aiConfig.available;
  
  return createCSSFallbackDragon(type, level, showComingSoon);
}

function updateUI(): void {
  const { dragon, isHatched, gold } = gameState;
  
  const growthPercent = isHatched
    ? (dragon.level >= 15 ? 100 : Math.round((dragon.exp / (getExpToNextLevel(dragon.level) || 1)) * 100))
    : Math.min(100, Math.round((dragon.growth / 15) * 100));

  if (elements.hungerBar) elements.hungerBar.style.width = `${dragon.hunger}%`;
  if (elements.happinessBar) elements.happinessBar.style.width = `${dragon.happiness}%`;
  if (elements.energyBar) elements.energyBar.style.width = `${dragon.energy}%`;
  if (elements.growthBar) elements.growthBar.style.width = `${growthPercent}%`;

  if (elements.hungerValue) elements.hungerValue.textContent = String(Math.round(dragon.hunger));
  if (elements.happinessValue) elements.happinessValue.textContent = String(Math.round(dragon.happiness));
  if (elements.energyValue) elements.energyValue.textContent = String(Math.round(dragon.energy));
  if (elements.growthValue) elements.growthValue.textContent = isHatched ? `${growthPercent}%` : `${Math.round(dragon.growth)}/15`;

  if (elements.stageBadge) elements.stageBadge.textContent = getStageBadgeText();

  if (!isHatched) {
    if (elements.spriteContainer) {
      elements.spriteContainer.innerHTML = createEggSprite();
      elements.spriteContainer.className = 'dragon-sprite-container egg';
    }
    if (elements.genderBadge) elements.genderBadge.classList.add('hidden');
    if (elements.typeBadge) elements.typeBadge.className = 'type-badge hidden';
    if (elements.tierLine) elements.tierLine.textContent = '진화 등급: -';
    if (elements.ancestorLine) elements.ancestorLine.textContent = '조상 드래곤: ???';
  } else if (dragon.type) {
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
    if (elements.tierLine) elements.tierLine.textContent = `진화 등급: ${dragon.tier || '미정'}`;
    if (elements.ancestorLine) elements.ancestorLine.textContent = `조상 드래곤: ${typeData.ancestor.korean} (${typeData.ancestor.name})`;
  }

  if (elements.goldValue) elements.goldValue.textContent = String(gold);
  if (elements.attackValue) elements.attackValue.textContent = String(dragon.attack);
  if (elements.defenseValue) elements.defenseValue.textContent = String(dragon.defense);
  if (elements.intelligenceValue) elements.intelligenceValue.textContent = String(dragon.intelligence);
  if (elements.spiritValue) elements.spiritValue.textContent = String(dragon.spirit);
  if (elements.levelValue) elements.levelValue.textContent = isHatched ? String(dragon.level) : '-';
  
  const expMax = getExpToNextLevel(dragon.level);
  if (elements.expValue) elements.expValue.textContent = isHatched ? (expMax ? `${dragon.exp}/${expMax}` : '최대') : '0/0';

  if (elements.feedBtn) elements.feedBtn.disabled = dragon.isSleeping;
  if (elements.playBtn) elements.playBtn.disabled = dragon.isSleeping || dragon.energy < 10;
  if (elements.sleepBtn) elements.sleepBtn.disabled = dragon.isSleeping;

  updateNestUI();
  renderPokedex();
}

function updateNestUI(): void {
  const currentNest = getNestEffects();
  if (elements.nestName) elements.nestName.textContent = currentNest.name;
  if (elements.nestTitle) elements.nestTitle.textContent = currentNest.name;
  if (elements.nestBonus) elements.nestBonus.textContent = currentNest.bonus;

  if (gameState.nestLevel < NESTS.length - 1) {
    const nextNest = NESTS[gameState.nestLevel + 1];
    if (elements.nestCost) elements.nestCost.textContent = `업그레이드 비용: ${nextNest.cost} 골드`;
    if (elements.upgradeNestBtn) elements.upgradeNestBtn.disabled = false;
  } else {
    if (elements.nestCost) elements.nestCost.textContent = '업그레이드 비용: 최대 단계';
    if (elements.upgradeNestBtn) elements.upgradeNestBtn.disabled = true;
  }
}

function renderPokedex(): void {
  const typeNames = gameState.pokedexStats.typesDiscovered.map((key) => DRAGON_TYPES[key]?.name || key);
  if (elements.pokedexStats) {
    elements.pokedexStats.textContent = `총 키운 드래곤: ${gameState.pokedexStats.totalRaised}마리 | 발견 타입: ${typeNames.length}종 | 최고 등급: ${gameState.pokedexStats.highestTier}`;
  }

  if (!elements.pokedexList) return;

  if (gameState.pokedex.length === 0) {
    elements.pokedexList.innerHTML = '<div class="pokedex-empty">아직 기록된 드래곤이 없습니다.</div>';
    return;
  }

  elements.pokedexList.innerHTML = gameState.pokedex
    .map((entry, index) => {
      const typeInfo = DRAGON_TYPES[entry.typeKey as DragonTypeKey];
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
      const index = Number((card as HTMLElement).dataset.index);
      showPokedexDetail(index);
    });
  });
}

function showPokedexDetail(index: number): void {
  const entry = gameState.pokedex[index];
  if (!entry || !elements.pokedexModalOverlay || !elements.pokedexModalContent) return;

  const typeInfo = DRAGON_TYPES[entry.typeKey as DragonTypeKey];
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

function closePokedexModal(): void {
  if (elements.pokedexModalOverlay) {
    elements.pokedexModalOverlay.classList.add('hidden');
  }
}

function spawnParticle(emoji: string): void {
  if (!elements.particles) return;
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.textContent = emoji;
  particle.style.left = `${30 + Math.random() * 40}%`;
  particle.style.top = `${40 + Math.random() * 20}%`;
  elements.particles.appendChild(particle);
  setTimeout(() => particle.remove(), 1000);
}

function showMessage(msg: string): void {
  if (elements.message) elements.message.textContent = msg;
}

function showNameModal(): void {
  if (elements.modalOverlay) elements.modalOverlay.classList.remove('hidden');
  if (elements.nameInput) {
    elements.nameInput.value = '';
    elements.nameInput.focus();
  }
}

function confirmName(): void {
  const name = elements.nameInput?.value.trim();
  if (name) {
    gameState.dragon.name = name;
  } else if (gameState.dragon.type) {
    const prefixes = ['작은', '빛나는', '용감한', '신비로운', '귀여운', '강력한'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    gameState.dragon.name = `${prefix} ${DRAGON_TYPES[gameState.dragon.type].name}`;
  }

  if (elements.modalOverlay) elements.modalOverlay.classList.add('hidden');
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

function hatch(): void {
  if (gameState.isHatched) return;

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

function handleLevelUp(): void {
  if (!gameState.dragon.type) return;
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
  } else {
    const info = getStageInfo(gameState.dragon.level);
    showMessage(`🌟 ${gameState.dragon.name}이(가) ${info.label} ${info.phaseLevel}단계로 성장했습니다!`);
  }
}

function setCooldown(action: CooldownAction): void {
  gameState.cooldowns[action] = Date.now() + COOLDOWNS[action] * 1000;
}

function getCooldownRemaining(action: CooldownAction): number {
  return Math.max(0, gameState.cooldowns[action] - Date.now());
}

function updateCooldownUI(): void {
  const actions: { key: CooldownAction; btn: HTMLButtonElement | null; label: HTMLElement | null }[] = [
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
      if (action.label) action.label.textContent = `${seconds}초`;
      if (action.btn) action.btn.disabled = true;
    } else {
      if (action.label) action.label.textContent = '';
      if (action.btn) action.btn.disabled = gameState.dragon.isSleeping || !gameState.isHatched;
    }
  });
}

function canAct(action: CooldownAction, energyCost: number = 0): boolean {
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

function feed(): void {
  if (gameState.dragon.isSleeping) return;

  if (!gameState.isHatched) {
    gameState.dragon.growth = Math.min(15, gameState.dragon.growth + 3);
    spawnParticle('🍖');
    spawnParticle('💕');
    if (gameState.dragon.growth >= 15) {
      hatch();
    } else {
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

function play(): void {
  if (gameState.dragon.isSleeping || gameState.dragon.energy < 10) return;

  if (!gameState.isHatched) {
    gameState.dragon.growth = Math.min(15, gameState.dragon.growth + 5);
    spawnParticle('⚽');
    if (gameState.dragon.growth >= 15) {
      hatch();
    } else {
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

function sleep(): void {
  if (gameState.dragon.isSleeping) return;

  if (!gameState.isHatched) {
    gameState.dragon.growth = Math.min(15, gameState.dragon.growth + 2);
    spawnParticle('😴');
    if (gameState.dragon.growth >= 15) {
      hatch();
    } else {
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
function hunt(): void {
  if (!canAct('hunt', 12)) return;
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
  let prey: HuntResult = { grade: '하급', gold: [12, 22], exp: 16 };
  
  if (gameState.dragon.level >= 14 && roll > 0.9) {
    prey = { grade: '전설', gold: [90, 140], exp: 60 };
  } else if (gameState.dragon.level >= 11 && roll > 0.65) {
    prey = { grade: '상급', gold: [55, 85], exp: 40 };
  } else if (gameState.dragon.level >= 6 && roll > 0.3) {
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

function education(): void {
  if (!canAct('education', 8)) return;
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

function training(): void {
  if (!canAct('training', 15)) return;
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
function meditation(): void {
  if (!canAct('meditation', 6)) return;
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
  } else if (gameState.dragon.spirit >= 60 && !gameState.dragon.unlockedAbilities.includes('정신 방벽')) {
    gameState.dragon.unlockedAbilities.push('정신 방벽');
    showMessage(`${gameState.dragon.name}이(가) 새로운 능력 '정신 방벽'을 깨달았습니다!`);
  } else if (gameState.dragon.spirit >= 90 && !gameState.dragon.unlockedAbilities.includes('천상 집중')) {
    gameState.dragon.unlockedAbilities.push('천상 집중');
    showMessage(`${gameState.dragon.name}이(가) 새로운 능력 '천상 집중'을 깨달았습니다!`);
  } else {
    showMessage(`${gameState.dragon.name}이(가) 마음의 평화를 얻었습니다.`);
  }

  updateUI();
}

/**
 * 탐험 액션
 * 성공 시 골드, 희귀 유물, 또는 알 흔적 발견
 */
function exploration(): void {
  if (!canAct('exploration', 10)) return;
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
  } else if (roll < 0.8) {
    addExp(22);
    spawnParticle('✨');
    showMessage(`${gameState.dragon.name}이(가) 희귀한 유물을 발견했습니다!`);
  } else {
    addExp(30);
    spawnParticle('🥚');
    showMessage(`${gameState.dragon.name}이(가) 신비한 알의 흔적을 발견했습니다!`);
  }

  saveStorage();
  updateUI();
}

function upgradeNest(): void {
  if (gameState.nestLevel >= NESTS.length - 1) return;
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

async function shareDragon(): Promise<void> {
  const dragon = gameState.dragon;
  const typeInfo = dragon.type ? DRAGON_TYPES[dragon.type] : null;
  
  let shareText: string;
  if (!gameState.isHatched) {
    shareText = '🥚 드래곤 타마고치에서 알을 키우고 있어요! 어떤 드래곤이 나올까요?';
  } else {
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
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        fallbackShare(shareText);
      }
    }
  } else {
    fallbackShare(shareText);
  }
}

function fallbackShare(text: string): void {
  const url = 'https://skh417.github.io/oh-my-dragons/';
  const fullText = `${text}\n${url}`;
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(fullText).then(() => {
      showMessage('📋 클립보드에 복사되었습니다!');
    }).catch(() => {
      showMessage('공유 링크를 복사할 수 없습니다.');
    });
  } else {
    showMessage('공유 기능을 사용할 수 없습니다.');
  }
}

function newEgg(): void {
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

  if (gameState.gameInterval) clearInterval(gameState.gameInterval);
  
  if (gameState.isHatched && gameState.dragon.level >= 15 && !gameState.dragon.recorded) {
    gameState.dragon.tier = gameState.dragon.tier || calculateTier();
    recordDragon();
  }

  gameState.dragon = createNewDragon();
  gameState.isHatched = false;
  saveStorage();
  if (elements.dragonName) elements.dragonName.textContent = '??? 의 알';
  if (elements.typeBadge) elements.typeBadge.className = 'type-badge hidden';
  if (elements.genderBadge) elements.genderBadge.classList.add('hidden');
  showMessage('🥚 새로운 알이 도착했습니다! 어떤 드래곤이 나올까요?');
  updateUI();
}

function startGameLoop(): void {
  if (gameState.gameInterval) clearInterval(gameState.gameInterval);
  
  gameState.gameInterval = setInterval(() => {
    if (!gameState.isHatched || gameState.dragon.isSleeping) return;

    gameState.dragon.hunger = Math.max(0, gameState.dragon.hunger - 1);
    gameState.dragon.happiness = Math.max(0, gameState.dragon.happiness - 0.6);
    gameState.dragon.energy = Math.max(0, gameState.dragon.energy - 0.4);

    if (gameState.dragon.hunger < 20) {
      showMessage(`${gameState.dragon.name}이(가) 배고파합니다! 🍖`);
    } else if (gameState.dragon.happiness < 20) {
      showMessage(`${gameState.dragon.name}이(가) 심심해합니다! 🎾`);
    } else if (gameState.dragon.energy < 20) {
      showMessage(`${gameState.dragon.name}이(가) 피곤해합니다! 😴`);
    }

    updateUI();
  }, 1000);
}

function handleEggClick(): void {
  if (!gameState.isHatched) {
    gameState.dragon.growth = Math.min(15, gameState.dragon.growth + 5);
    spawnParticle('💕');
    if (gameState.dragon.growth >= 15) {
      hatch();
    } else {
      showMessage(`알이 흔들리고 있어요! (${Math.round(gameState.dragon.growth)}/15)`);
    }
    updateUI();
  }
}

function setActiveTab(tabKey: string): void {
  elements.tabButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === tabKey);
  });
  elements.tabPanels.forEach((panel) => {
    panel.classList.toggle('active', (panel as HTMLElement).dataset.panel === tabKey);
  });
}

// === 전역 함수 내보내기 (HTML onclick용) ===
(window as any).feed = feed;
(window as any).play = play;
(window as any).sleep = sleep;
(window as any).hunt = hunt;
(window as any).education = education;
(window as any).training = training;
(window as any).meditation = meditation;
(window as any).exploration = exploration;
(window as any).upgradeNest = upgradeNest;
(window as any).newEgg = newEgg;
(window as any).confirmName = confirmName;
(window as any).closePokedexModal = closePokedexModal;
(window as any).shareDragon = shareDragon;

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
      if (e.key === 'Enter') confirmName();
    });
  }

  elements.tabButtons.forEach((button) => {
    button.addEventListener('click', () => setActiveTab(button.dataset.tab || ''));
  });

  if (elements.pokedexModalOverlay) {
    elements.pokedexModalOverlay.addEventListener('click', (e) => {
      if (e.target === elements.pokedexModalOverlay) closePokedexModal();
    });
  }

  updateUI();
  renderPokedex();

  if (gameState.cooldownInterval) clearInterval(gameState.cooldownInterval);
  gameState.cooldownInterval = setInterval(updateCooldownUI, 500);
  updateCooldownUI();
});
