import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Animal, Upload } from "@contract";
import { PetApi } from "api/petApi";
import { ChangeEvent, CSSProperties, useRef } from "react";
import styled from "styled-components";

export interface ImageProps {
	images: Animal.Image[];
	isEditMode: boolean;
}
interface ImageGalleryProps extends ImageProps {
	addNewImage: (img: Animal.Image) => void;
	removeImage: (imageIndex: number) => void;
}

export const ImageGallery = ({
	images,
	addNewImage,
	removeImage,
	isEditMode = false,
}: ImageGalleryProps) => {
	const imageUploadRef = useRef<HTMLInputElement>(null);

	const waitForLoadedImage = (_pickedImage: File): Promise<string> => {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64String = (reader.result as string).split(",")[1];
				resolve(base64String);
			};
			reader.readAsDataURL(_pickedImage);
		});
	};

	const storeImageToGcp = async (imageFile: File): Promise<Animal.Image> => {
		const imageData: Upload.uploadImageApiDomain.requestBody = {
			originalFileName: imageFile.name,
			base64File: await waitForLoadedImage(imageFile),
		};
		const res = await new PetApi().uploadImage(imageData);

		return {
			thumbnailUrl: res.payload.thumbnailUrl,
			photoUrl: res.payload.url,
		};
	};

	const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event?.target?.files?.[0];
		try {
			if (file && file.type.substring(0, 5)) {
				const image = await storeImageToGcp(file);
				addNewImage(image);
			}
		} catch (error) {
			alert("error uploading image");
		} finally {
			// Reset value so that onChange will trigger again alter
			event.target.value = "";
		}
	};

	return (
		<GridContainer>
			{images.length > 0 &&
				images.map((image, index) => (
					<GalleryItem key={index}>
						{isEditMode && (
							<GalleryOverlayAction>
								<EyeOutlined style={overlayStyle} />
								<DeleteOutlined
									style={overlayStyle}
									onClick={() => removeImage(index)}
								/>
							</GalleryOverlayAction>
						)}
						<GalleryImage src={image.photoUrl} alt="Pet Image" />
					</GalleryItem>
				))}
			{isEditMode && (
				<UploaderContainer
					onClick={() => {
						if (!imageUploadRef.current) return;
						imageUploadRef?.current?.click();
					}}
				>
					<span className="symbol">+</span>
					<span className="upload">Upload</span>
					<input
						ref={imageUploadRef}
						type="file"
						style={{ display: "none" }}
						accept="image/*"
						onChange={uploadImage}
					/>
				</UploaderContainer>
			)}
		</GridContainer>
	);
};

// =============================================================================
// Styled Components
// =============================================================================
const overlayStyle: CSSProperties = {
	cursor: "pointer",
	fontSize: 16,
	color: "#FFFFFF",
};

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 104px);
	grid-gap: 8px;
`;
const GalleryOverlayAction = styled.div`
	background-color: #00000080;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	opacity: 0;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	transition: 0.2s ease;
`;
const GalleryItem = styled.div`
	position: relative;
	border-style: solid;
	border-width: 1px;
	border-color: #d9d9d9;
	border-radius: 2px;
	&:hover ${GalleryOverlayAction} {
		opacity: 0.8;
	}
`;

const GalleryImage = styled.img`
	width: 86px;
	height: 86px;
	margin: 9px;
	object-fit: contain;
`;

const UploaderContainer = styled.div`
	height: 104px;
	width: 104px;
	cursor: pointer;
	border-style: dotted;
	border-width: 2px;
	border-color: #d9d9d9;
	border-radius: 2;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #fafafa;
	flex-direction: column;

	span.symbol {
		color: #000000d9;
		font-size: 20px;
	}
	span.upload {
		color: #00000073;
	}
`;
