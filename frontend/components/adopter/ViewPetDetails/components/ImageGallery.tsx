import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Carousel } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import React, { useRef } from "react";
import styled from "styled-components";

interface ImageGalleryProps {
	images: string[];
}

export function ImageGallery(props: ImageGalleryProps) {
	const carouselRef = useRef<CarouselRef>(null);
	const { images } = props;

	const goPrev = () => {
		carouselRef.current?.prev();
	};

	const goNext = () => {
		carouselRef.current?.next();
	};

	const selectImage = (index: number) => {
		carouselRef.current?.goTo(index);
	};

	return (
		<CarouselWrapper>
			<LeftArrowWrapper>
				<Button
					shape="circle"
					icon={<LeftOutlined />}
					onClick={goPrev}
				></Button>
			</LeftArrowWrapper>
			<Carousel ref={carouselRef} autoplay={false}>
				{images.map((image) => (
					<StyledImage key={image} src={image} alt="" />
				))}
			</Carousel>
			<CarouselThumbnailRow>
				{images.map((image, i) => (
					<CarouselThumbnailButton
						key={image}
						onClick={() => selectImage(i)}
					>
						<CarouselThumbnail src={image} alt="" />
					</CarouselThumbnailButton>
				))}
			</CarouselThumbnailRow>
			<RightArrowWrapper>
				<Button
					shape="circle"
					icon={<RightOutlined />}
					onClick={goNext}
				></Button>
			</RightArrowWrapper>
		</CarouselWrapper>
	);
}

const LeftArrowWrapper = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	z-index: 1;
	display: flex;
	align-items: center;
	padding: 12px;
	font-size: 32px;
`;

const RightArrowWrapper = styled.div`
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 1;
	display: flex;
	align-items: center;
	padding: 12px;
	font-size: 32px;
`;

const CarouselWrapper = styled.div`
	width: 100%;
	position: relative;
	border-radius: 7px;
	overflow: hidden;

	& .slick-dots-bottom {
		display: none !important;
	}
`;

const StyledImage = styled.img`
	object-fit: cover;
	aspect-ratio: 1 / 1;
`;

const CarouselThumbnailRow = styled.div`
	position: absolute;
	display: flex;
	flex-direction: row;
	justify-content: center;
	bottom: 0;
	left: 0;
	right: 0;
	margin-bottom: 14px;
`;

const CarouselThumbnailButton = styled.button`
	background-color: transparent;
	border: none;
	margin: 0px 4px;
	padding: 0;
	border-radius: 7px;
	overflow: hidden;
	cursor: pointer;
`;

const CarouselThumbnail = styled.img`
	width: 32px;
	height: 32px;
`;
