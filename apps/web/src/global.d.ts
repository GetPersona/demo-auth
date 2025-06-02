export {};

declare global {
	interface Window {
		PSChatConfig?: {
			hiddenButton?: boolean;
			name?: string;
			email?: string;
		};
		PSChatWidget?: {
			toggleChatWidget?: () => void;
		};
	}
}
