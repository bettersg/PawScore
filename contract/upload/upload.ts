import { Methods } from "../methods";

export namespace uploadApiDomain {
	export const endpoint = "api/upload";
	export const method = Methods.POST;
	export interface requestBody {
		originalFileName: string;
		base64File: string;
	}
	export interface response {
		message: string;
		payload: {
			originalFileName: string;
			fileName: string;
			url: string;
		}
	};
}

export namespace uploadImageApiDomain {
	export const endpoint = "api/upload/image";
	export const method = Methods.POST;
	export interface requestBody {
		originalFileName: string;
		base64File: string;
	}
	export interface response {
		message: string;
		payload: {
			originalFileName: string;
			fileName: string;
			url: string;
			thumbnailUrl: string;
		}
	};
}
