// Creates ReactNode instead of ReactElement
// so that petTableDisplay.tsx can render in name column.

import Image from "next/image";

const TableName = (props) => {
	const { name, image } = props;

	let element: JSX.Element;

	return (
		<div>
			{image ? (
				<img
					src={image}
					alt="pet-image"
					style={{ height: "60px", width: "auto" }}
				/>
			) : (
				""
			)}
			{/* <Image src={image} alt="pet-image" /> */}
			{name}
		</div>
	);
};

export default TableName;
