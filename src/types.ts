/**
 * =============================================================================
 * 드래곤 타마고치 - 타입 정의
 * =============================================================================
 * 게임에서 사용되는 모든 타입과 인터페이스를 정의합니다.
 */

/** 드래곤 타입 키 (14종) */
export type DragonTypeKey = 
  | 'fire' | 'water' | 'earth' | 'dark' | 'light' 
  | 'speed' | 'electric' | 'wind' | 'psychic' 
  | 'grass' | 'rock' | 'ice' | 'poison' | 'metal';

/** 성별 */
export type Gender = 'male' | 'female';

/** 진화 등급 - 육성 방식에 따라 결정됨 */
export type EvolutionTier = '하급' | '중급' | '상급';

/** 쿨다운이 있는 액션 종류 */
export type CooldownAction = 'hunt' | 'education' | 'exploration' | 'training' | 'meditation';

/** 탭 종류 */
export type TabKey = 'care' | 'activity' | 'nest' | 'pokedex';

/**
 * 조상 드래곤 정보
 * 각 타입마다 신화적인 조상 드래곤이 존재함
 */
export interface Ancestor {
  /** 영문 이름 */
  name: string;
  /** 한글 이름 */
  korean: string;
}

/**
 * 드래곤 타입 정보
 * 14가지 타입 각각의 속성 정의
 */
export interface DragonTypeInfo {
  /** 한글 타입명 (예: '불', '물') */
  name: string;
  /** 이모지 아이콘 */
  emoji: string;
  /** CSS 색상 코드 */
  color: string;
  /** 조상 드래곤 정보 */
  ancestor: Ancestor;
}

/**
 * 둥지 정보
 * 둥지 레벨에 따른 보너스 효과
 */
export interface NestInfo {
  /** 둥지 이름 */
  name: string;
  /** 보너스 설명 */
  bonus: string;
  /** 업그레이드 비용 (골드) */
  cost: number;
  /** 행복도 획득 배율 */
  happinessGain: number;
  /** 스탯 획득 배율 */
  statGain: number;
  /** 경험치 획득 배율 */
  expGain: number;
}

/**
 * 드래곤 스탯 (도감 저장용)
 */
export interface DragonStats {
  hunger: number;
  happiness: number;
  energy: number;
  attack: number;
  defense: number;
  intelligence: number;
  spirit: number;
}

/**
 * 도감 엔트리
 * 완성된 드래곤의 기록
 */
export interface PokedexEntry {
  /** 드래곤 이름 */
  name: string;
  /** 타입 한글명 */
  type: string;
  /** 타입 키 */
  typeKey: DragonTypeKey;
  /** 성별 기호 */
  gender: string;
  /** 최종 레벨 */
  level: number;
  /** 진화 등급 */
  tier: EvolutionTier | '미정';
  /** 조상 드래곤 정보 문자열 */
  ancestor: string;
  /** 최종 스탯 */
  stats: DragonStats;
}

/**
 * 도감 통계
 */
export interface PokedexStatsData {
  /** 총 키운 드래곤 수 */
  totalRaised: number;
  /** 발견한 타입 목록 */
  typesDiscovered: DragonTypeKey[];
  /** 달성한 최고 등급 */
  highestTier: EvolutionTier | '없음';
}

/**
 * 드래곤 상태
 * 게임 내 드래곤의 모든 상태를 저장
 */
export interface Dragon {
  /** 타입 (부화 전에는 null) */
  type: DragonTypeKey | null;
  /** 레거시 스테이지 (호환성) */
  stage: number;
  
  // === 기본 스탯 (0-100) ===
  /** 배고픔 - 낮으면 먹이 필요 */
  hunger: number;
  /** 행복도 - 낮으면 놀아주기 필요 */
  happiness: number;
  /** 에너지 - 낮으면 수면 필요 */
  energy: number;
  /** 부화 게이지 (알 상태에서만 사용) */
  growth: number;
  
  // === 상태 플래그 ===
  /** 수면 중 여부 */
  isSleeping: boolean;
  
  // === 기본 정보 ===
  /** 이름 */
  name: string;
  /** 성별 */
  gender: Gender | null;
  
  // === 전투/성장 스탯 ===
  /** 공격력 - 사냥, 훈련으로 증가 */
  attack: number;
  /** 방어력 - 훈련으로 증가 */
  defense: number;
  /** 지능 - 교육으로 증가 */
  intelligence: number;
  /** 정신력 - 명상으로 증가, 특수능력 해금 */
  spirit: number;
  
  // === 레벨 시스템 ===
  /** 현재 레벨 (1-15) */
  level: number;
  /** 현재 경험치 */
  exp: number;
  /** 진화 등급 (레벨 15 도달 시 결정) */
  tier: EvolutionTier | null;
  
  // === 활동 추적 (진화 등급 계산용) ===
  totalFeeds: number;
  totalPlays: number;
  totalEducation: number;
  totalTraining: number;
  totalMeditation: number;
  totalHunts: number;
  totalExplorations: number;
  
  // === 특수 ===
  /** 해금된 능력 목록 */
  unlockedAbilities: string[];
  /** 도감 등록 여부 */
  recorded: boolean;
}

/**
 * 쿨다운 상태
 * 각 액션의 다음 사용 가능 시간 (timestamp)
 */
export interface Cooldowns {
  hunt: number;
  education: number;
  exploration: number;
  training: number;
  meditation: number;
}

/**
 * 사냥 결과
 */
export interface HuntResult {
  /** 사냥감 등급 */
  grade: '하급' | '중급' | '상급' | '전설';
  /** 골드 범위 [최소, 최대] */
  gold: [number, number];
  /** 경험치 */
  exp: number;
}

/**
 * 성장 단계 정보
 */
export interface StageInfo {
  /** 단계 레이블 (아기/청소년/성체/전설) */
  label: string;
  /** CSS 클래스 */
  stageClass: 'dragon-baby' | 'dragon-teen' | 'dragon-adult';
  /** 해당 단계 내 레벨 (1-5) */
  phaseLevel: number;
}

/**
 * DOM 요소 참조
 */
export interface Elements {
  spriteContainer: HTMLElement | null;
  stageBadge: HTMLElement | null;
  typeBadge: HTMLElement | null;
  genderBadge: HTMLElement | null;
  dragonName: HTMLElement | null;
  hungerBar: HTMLElement | null;
  happinessBar: HTMLElement | null;
  energyBar: HTMLElement | null;
  growthBar: HTMLElement | null;
  hungerValue: HTMLElement | null;
  happinessValue: HTMLElement | null;
  energyValue: HTMLElement | null;
  growthValue: HTMLElement | null;
  message: HTMLElement | null;
  particles: HTMLElement | null;
  feedBtn: HTMLButtonElement | null;
  playBtn: HTMLButtonElement | null;
  sleepBtn: HTMLButtonElement | null;
  huntBtn: HTMLButtonElement | null;
  trainingBtn: HTMLButtonElement | null;
  educationBtn: HTMLButtonElement | null;
  meditationBtn: HTMLButtonElement | null;
  explorationBtn: HTMLButtonElement | null;
  huntCooldown: HTMLElement | null;
  trainingCooldown: HTMLElement | null;
  educationCooldown: HTMLElement | null;
  meditationCooldown: HTMLElement | null;
  explorationCooldown: HTMLElement | null;
  modalOverlay: HTMLElement | null;
  nameInput: HTMLInputElement | null;
  goldValue: HTMLElement | null;
  nestName: HTMLElement | null;
  nestTitle: HTMLElement | null;
  nestBonus: HTMLElement | null;
  nestCost: HTMLElement | null;
  upgradeNestBtn: HTMLButtonElement | null;
  attackValue: HTMLElement | null;
  defenseValue: HTMLElement | null;
  intelligenceValue: HTMLElement | null;
  spiritValue: HTMLElement | null;
  levelValue: HTMLElement | null;
  expValue: HTMLElement | null;
  tierLine: HTMLElement | null;
  ancestorLine: HTMLElement | null;
  pokedexStats: HTMLElement | null;
  pokedexList: HTMLElement | null;
  tabButtons: HTMLElement[];
  tabPanels: HTMLElement[];
}
