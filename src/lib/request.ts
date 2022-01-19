import { api } from '$lib/api';
import { isAuthenticated } from '$lib/auth';
import type { JsonObject } from 'type-fest';

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
export type Api = 'auth' | 'yolk' | 'shop';
export type Body = FormData | JsonObject;

type UrlPart = string | number;

export const ACCESS_TOKEN_KEY: string = 'accessToken';
export const REFRESH_TOKEN_KEY: string = 'refreshToken';

class RequestBuilder<T> {

	private endpoint: string;
	private headers = new Headers();
	private init: RequestInit = {};

	private ignoreErrors: boolean = false;

	public constructor(private method: HttpMethod, private api: Api, url: UrlPart[]) {
		this.endpoint = url
			.map(u => u.toString())
			.map(u => u.startsWith('/') ? u.slice(1) : u)
			.join('/');
	}

	public header(key: string, value: string): this {
		this.headers.set(key, value);
		return this;
	}

	public body(body: Body): this {
		if (body instanceof FormData) {
			this.init.body = body;
		} else {
			this.headers.set('Content-Type', 'application/json');
			this.init.body = JSON.stringify(body);
		}
		return this;
	}

	public optional(): RequestBuilder<T | null> {
		this.ignoreErrors = true;
		return this;
	}

	public exec(): Promise<T> {
		return this.execRequest();
	}

	private async execRequest(authErrors: number = 0): Promise<T | null> {
		let url = `https://${ this.api }.eggtrainer.com/${ this.api }/${ this.endpoint }`;

		let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
		if (accessToken != null) {
			this.headers.set('Authorization', `Bearer ${ accessToken }`);
		}

		let response = await fetch(url, {
			...this.init,
			headers: this.headers,
			method: this.method.toUpperCase(),
		});

		if (response.status === 403) {
			if (authErrors > 3) {
				throw new Error('Auth error');
			}

			await this.getNewAccessToken();
			return this.execRequest(authErrors + 1);
		}

		if (response.status === 204) {
			return null;
		}

		let body: any = await response.text();
		if (body.length > 0) {
			body = JSON.parse(body);

			if ('accessToken' in body && 'refreshToken' in body) {
				localStorage.setItem(ACCESS_TOKEN_KEY, body.accessToken);
				localStorage.setItem(REFRESH_TOKEN_KEY, body.refreshToken);
				isAuthenticated.set(true);
			}
		}

		if (response.status >= 300) {
			if (this.ignoreErrors) {
				return null;
			}

			throw new RequestError(response.status, body);
		}

		return body;
	}

	private async getNewAccessToken(): Promise<void> {
		let token = localStorage.getItem(REFRESH_TOKEN_KEY);
		if (token == null) {
			isAuthenticated.set(false);
			return;
		}

		try {
			let { accessToken, refreshToken } = await api.token(token);
			localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
			localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
			isAuthenticated.set(true);
		} catch (e) {
			localStorage.removeItem(REFRESH_TOKEN_KEY);
			localStorage.removeItem(ACCESS_TOKEN_KEY);
			isAuthenticated.set(false);
		}
	}
}

export const request = {
	get<T = void>(api: Api, ...url: UrlPart[]): RequestBuilder<T> {
		return new RequestBuilder('get', api, url);
	},
	post<T = void>(api: Api, ...url: UrlPart[]): RequestBuilder<T> {
		return new RequestBuilder('post', api, url);
	},
	patch<T = void>(api: Api, ...url: UrlPart[]): RequestBuilder<T> {
		return new RequestBuilder('patch', api, url);
	},
	delete<T = void>(api: Api, ...url: UrlPart[]): RequestBuilder<T> {
		return new RequestBuilder('delete', api, url);
	},
};

export class RequestError extends Error {
	public constructor(
		public readonly status: number,
		public readonly body: Record<string, any>,
	) {
		super();
	}

	public hasError(rule: string): boolean {
		if (!this.body.errors || !Array.isArray(this.body.errors)) {
			return false;
		}

		for (let error of this.body.errors) {
			if (error.rule === rule) {
				return true;
			}
		}

		return false;
	}
}
