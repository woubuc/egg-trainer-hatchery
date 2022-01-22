import type { Opaque } from 'type-fest';

export const enum Species {
	Spitty = 'spitty',
}

export const enum Element {
	Fire = 'fire',
	Water = 'water',
	Grass = 'grass',
	Psychic = 'psychic',
	Fighting = 'fighting',
	Metal = 'metal',
	Fae = 'fae',
	Light = 'light',
	Dark = 'dark',
	Dragon = 'dragon',
}

export const enum Rarity {
	Common = 'common',
	Rare = 'rare',
}

export const enum Occupation {
	None = 'none',
	Training = 'training',
	Breeding = 'breeding',
}

export const enum Stat {
	Health = 'health',
	Speed = 'speed',
	Strength = 'strength',
	Power = 'power',
}

export const enum TechniqueType {
	Physical = 'physical',
}

export interface TechniqueSignature {
	species: Species;
	element: Element | null;
}

export type TechniqueKey = Opaque<string, 'TechniqueKey'>;

export interface Technique {
	key: TechniqueKey;
	name: string;
	description: string;
	type: TechniqueType;
	element: Element;
	damage: number;
	signature: TechniqueSignature;
	effect: null;
}

export type CreatureIndex = Opaque<number, 'CreatureIndex'>;

export interface TrainingData {
	stat: Stat;
	finishTime: string;
}

export interface SpeciesStats {
	health: number;
	speed: number;
	physicalAttack: number;
	physicalDefence: number;
	magicalAttack: number;
	magicalDefence: number;
}

export interface Stats {
	species: SpeciesStats;
	genetics: Record<Stat, number>;
	training: Record<Stat, number>;
}

export interface Creature {
	index: CreatureIndex;
	name: string;
	nickname: string;
	description: string;
	sprite: string;
	species: Species;
	element: Element;
	rarity: Rarity;
	occupation: Occupation;
}

export interface CreatureDetail extends Creature {
	inspect: false | Stats,
	training: false | TrainingData,

	techniques: Technique[],
	techniqueOptions: Technique[],
}

export function creatureColours(element: Element): { bg: string, main: string } {
	switch (element) {
		case Element.Fire:
			return { bg: 'from-orange-200 to-orange-50', main: 'bg-orange-500' };
		case Element.Water:
			return { bg: 'from-cyan-200 to-cyan-50', main: 'bg-cyan-500' };
		case Element.Grass:
			return { bg: 'from-green-200 to-green-50', main: 'bg-green-500' };
		case Element.Metal:
			return { bg: 'from-slate-300 to-slate-100', main: 'bg-slate-600' };
		case Element.Fae:
			return { bg: 'from-pink-200 to-pink-50', main: 'bg-pink-500' };
		case Element.Light:
			return { bg: 'from-yellow-200 to-yellow-50', main: 'bg-yellow-500' };
		case Element.Fighting:
			return { bg: 'from-gray-300 to-gray-100', main: 'bg-gray-600' };
		case Element.Psychic:
			return { bg: 'from-blue-200 to-blue-50', main: 'bg-blue-500' };
		case Element.Dark:
			return { bg: 'from-violet-300 to-violet-100', main: 'bg-violet-900' };
		case Element.Dragon:
			return { bg: 'from-rose-200 to-rose-50', main: 'bg-rose-500' };
		default:
			return { bg: 'from-stone-200 to-stone-50', main: 'bg-stone-500' };
	}
}
