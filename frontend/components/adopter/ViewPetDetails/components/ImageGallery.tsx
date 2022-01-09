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
`;

const StyledImage = styled.img`
	object-fit: cover;
	aspect-ratio: 1 / 1;
`;
