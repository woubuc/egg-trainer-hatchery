import type { Opaque } from 'type-fest';

export const enum Species {
	Spitty = 'spitty',
}

export const enum Element {
	Fire = 'fire',
	Fighting = 'fighting',
	Psychic = 'psychic',
	Grass = 'grass',
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
	inspect: false,
	training: false | TrainingData,

	techniques: Technique[],
	techniqueOptions: Technique[],
}
