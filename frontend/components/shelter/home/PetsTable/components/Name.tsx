type TableNameProps = {
	name: string;
	image?: string; // TODO: confirm type
};

const TableName = ({ name, image }: TableNameProps) => {
	return (
		<div>
			{image && (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					src={image}
					alt="pet-image"
					style={{ height: "60px", width: "auto" }}
				/>
			)}
			{name}
		</div>
	);
};

export default TableName;
