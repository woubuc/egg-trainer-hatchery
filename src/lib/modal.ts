export interface ModalOptions {
	danger: boolean;
	yesButton: string;
	noButton: string;
	okButton: string;
}

export interface ModalApi {
	confirm(title: string, message: string, options?: Partial<ModalOptions>): Promise<boolean>;
	alert(title: string, message: string, options?: Partial<ModalOptions>): Promise<void>;
}

export const modal: ModalApi = {
	confirm: async (_, message) => confirm(message),
	alert: async (_, message) => alert(message),
}
