import type { DragonTypeKey, DragonTypeInfo, NestInfo } from './types';

/**
 * 14가지 드래곤 타입 정보
 * 각 타입은 고유한 색상, 이모지, 조상 드래곤을 가짐
 */
export const DRAGON_TYPES: Record<DragonTypeKey, DragonTypeInfo> = {
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

export const GENDERS = { male: '♂', female: '♀' } as const;

/**
 * 각 액션의 쿨다운 시간 (초)
 */
export const COOLDOWNS = {
  hunt: 30,
  education: 20,
  exploration: 60,
  training: 15,
  meditation: 25
} as const;

/**
 * 둥지 레벨별 정보
 * 골드를 사용해 업그레이드하면 다양한 보너스 획득
 */
export const NESTS: NestInfo[] = [
  { name: '기본 둥지', bonus: '보너스 없음', cost: 0, happinessGain: 1, statGain: 1, expGain: 1 },
  { name: '포근한 둥지', bonus: '행복 회복 +10%', cost: 150, happinessGain: 1.1, statGain: 1, expGain: 1 },
  { name: '호화 둥지', bonus: '모든 능력치 증가 +20%', cost: 450, happinessGain: 1, statGain: 1.2, expGain: 1 },
  { name: '전설의 둥지', bonus: '경험치 획득 +30%', cost: 900, happinessGain: 1, statGain: 1, expGain: 1.3 }
];

export const STORAGE_KEYS = {
  gold: 'dragonGold',
  nest: 'dragonNestLevel',
  pokedex: 'dragonPokedex',
  stats: 'dragonStats',
  dragon: 'dragonCurrent',
  isHatched: 'dragonHatched',
  cooldowns: 'dragonCooldowns'
} as const;

export const SPRITE_CONFIG = {
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
  } as Record<DragonTypeKey, { file: string; tint: string }>
} as const;

/**
 * AI 생성 이미지 설정
 * 성장 단계별 이미지 경로 및 사용 가능 여부
 */
export const AI_SPRITE_CONFIG = {
  basePath: 'assets/sprites/ai-generated/',
  stages: {
    baby: { file: 'dragon-baby.png', available: true },
    teen: { file: 'dragon-teen.png', available: true },
    adult: { file: 'dragon-adult.png', available: true },
    legendary: { file: 'dragon-legendary.png', available: false }
  }
} as const;

/**
 * 레벨업에 필요한 경험치 계산
 * 공식: 80 + (레벨 - 1) * 30
 * 레벨 1: 80, 레벨 2: 110, 레벨 3: 140 ...
 */
export function getExpToNextLevel(level: number): number | null {
  if (level >= 15) return null;
  return 80 + (level - 1) * 30;
}
