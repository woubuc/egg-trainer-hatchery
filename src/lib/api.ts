import type { Account } from '$lib/models/account';
import type { Creature, TechniqueKey } from '$lib/models/creature';
import type { Egg } from '$lib/models/egg';
import { request } from '$lib/request';

export interface TokenResponse {
	accessToken: string;
	refreshToken: string;
}

export interface TrainingResponse {
	message: string;
	finishTime: string;
}

export const api = {
	login: (email: string, password: string) => request.post<TokenResponse>('auth', 'login').body({ email, password }).exec(),
	account: () => request.get<Account>('auth', 'account').exec(),
	token: (refreshToken: string) => request.post<TokenResponse>('auth', 'token').body({ token: refreshToken }).exec(),

	creatures: () => request.get<Creature[]>('yolk', 'creatures').exec(),
	creature: (index: number) => ({
		inspect: () => request.get<Creature>('yolk', 'creatures', 'inspect', index).exec(),
		setTechniques: (techniques: TechniqueKey[]) => request
			.post<void>('yolk', 'creatures', 'techniques')
			.body({ creatureIndex: index, techniques })
			.exec(),
		setTraining: (stat: string) => request
			.patch<TrainingResponse>('yolk', 'occupation')
			.body({ index, set: 'training', stat })
			.exec(),
		setBreeding: () => request.patch<void>('yolk', 'occupation')
			.body({ index, set: 'breeding' })
			.exec(),
	}),

	eggs: () => request.get<Egg[]>('yolk', 'eggs').exec(),
};
