import type { Dragon, Cooldowns, PokedexEntry, PokedexStatsData, Elements, DragonTypeKey, Gender } from './types';
import { NESTS, STORAGE_KEYS } from './constants';

export function createNewDragon(): Dragon {
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

export const gameState = {
  dragon: createNewDragon(),
  isHatched: false,
  gold: 0,
  nestLevel: 0,
  pokedex: [] as PokedexEntry[],
  pokedexStats: { totalRaised: 0, typesDiscovered: [] as DragonTypeKey[], highestTier: '없음' } as PokedexStatsData,
  cooldowns: { hunt: 0, education: 0, exploration: 0, training: 0, meditation: 0 } as Cooldowns,
  gameInterval: null as ReturnType<typeof setInterval> | null,
  cooldownInterval: null as ReturnType<typeof setInterval> | null
};

export const elements: Elements = {
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

export function initElements(): void {
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
  elements.feedBtn = document.getElementById('feedBtn') as HTMLButtonElement;
  elements.playBtn = document.getElementById('playBtn') as HTMLButtonElement;
  elements.sleepBtn = document.getElementById('sleepBtn') as HTMLButtonElement;
  elements.huntBtn = document.getElementById('huntBtn') as HTMLButtonElement;
  elements.trainingBtn = document.getElementById('trainingBtn') as HTMLButtonElement;
  elements.educationBtn = document.getElementById('educationBtn') as HTMLButtonElement;
  elements.meditationBtn = document.getElementById('meditationBtn') as HTMLButtonElement;
  elements.explorationBtn = document.getElementById('explorationBtn') as HTMLButtonElement;
  elements.huntCooldown = document.getElementById('huntCooldown');
  elements.trainingCooldown = document.getElementById('trainingCooldown');
  elements.educationCooldown = document.getElementById('educationCooldown');
  elements.meditationCooldown = document.getElementById('meditationCooldown');
  elements.explorationCooldown = document.getElementById('explorationCooldown');
  elements.modalOverlay = document.getElementById('modalOverlay');
  elements.nameInput = document.getElementById('nameInput') as HTMLInputElement;
  elements.goldValue = document.getElementById('goldValue');
  elements.nestName = document.getElementById('nestName');
  elements.nestTitle = document.getElementById('nestTitle');
  elements.nestBonus = document.getElementById('nestBonus');
  elements.nestCost = document.getElementById('nestCost');
  elements.upgradeNestBtn = document.getElementById('upgradeNestBtn') as HTMLButtonElement;
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

export function loadStorage(): void {
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
    } catch {
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
    } catch { }
  }
}

export function saveStorage(): void {
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

export function getRandomType(): DragonTypeKey {
  const types: DragonTypeKey[] = ['fire', 'water', 'earth', 'dark', 'light', 'speed', 'electric', 'wind', 'psychic', 'grass', 'rock', 'ice', 'poison', 'metal'];
  return types[Math.floor(Math.random() * types.length)];
}

export function getRandomGender(): Gender {
  return Math.random() < 0.5 ? 'male' : 'female';
}

export function randomRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
