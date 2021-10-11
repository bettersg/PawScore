type TableNameProps = {
	name: string;
	image?: string[]; // TODO: confirm type
};

const TableName = ({ name, image }: TableNameProps) => {
	return (
		<div>
			{image && (
				<img
					src={image[0]} // TODO: check for image
					alt="pet-image"
					style={{ height: "60px", width: "auto" }}
				/>
			)}
			{name}
		</div>
	);
};

export default TableName;
