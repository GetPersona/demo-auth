import useAuthStore from "@/lib/auth";
import { useCallback } from "react";

const CHAT_WIDGET_URL =
	process.env.NODE_ENV === "production"
		? "https://persona-studios.stag.internal.personastudios.ai/chat-widget.js"
		: "http://persona-studios.localhost:3003/chat-widget.js";

const CHAT_WIDGET_ID = "ps-chat-widget-script";

export const usePersonaStudio = () => {
	const { user: initialUser } = useAuthStore();
	console.log("usePersonaStudio hook rendered with initialUser:", initialUser);

	const setUserDetails = () => {
		const currentUser = useAuthStore.getState().user;
		console.log("setUserDetails called, currentUser:", currentUser);
		window.PSChatConfig = {
			hiddenButton: true,
			name: currentUser?.name || "",
			email: currentUser?.email || "",
		};
	};

	const toggleChatWidget = () => {
		const psChatWidget = window.PSChatWidget;
		if (psChatWidget && typeof psChatWidget.toggleChatWidget === "function") {
			psChatWidget.toggleChatWidget();
		}
	};

	const initPersonaStudio = () => {
		if (document.getElementById(CHAT_WIDGET_ID)) {
			return;
		}

		setUserDetails();
		const scriptElement = document.createElement("script");
		scriptElement.id = CHAT_WIDGET_ID;
		scriptElement.type = "text/javascript";
		scriptElement.async = true;
		scriptElement.crossOrigin = "anonymous";
		scriptElement.src = CHAT_WIDGET_URL;
		document.body.appendChild(scriptElement);

		window.addEventListener("ps_chat_widget:on_open", () => {
			setUserDetails();
		});
	};

	return {
		initPersonaStudio,
		toggleChatWidget,
		setUserDetails,
	};
};
