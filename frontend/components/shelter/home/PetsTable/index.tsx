import { ImportOutlined, PlusOutlined } from "@ant-design/icons";
import { Animal } from "@contract";
import { Button, Input, Table } from "antd";
import { ColumnsType } from "antd/lib/table/interface";
import React from "react";
import styled from "styled-components";
import TableName from "./components/Name";
import TablePill, { TablePillType } from "./components/Pill";
import styles from "./PetsTable.module.css";

const { tableHeader, actionButton } = styles;
const { Search } = Input;

const PetTableDisplay = ({ petData }: { petData: Animal.Attributes[] }) => {
	/* commenting out for now as not implemented yet */
	// const [searchText, setSearchText] = useState("");
	// const [searchedColumn, setSearchedColumn] = useState("");

	const onSearch = () => {
		console.log("search");
	};
	const onViewMore = (id: string) => {
		console.log("clicked view more ", id);
	};

	const columns: ColumnsType<Animal.Attributes> = [
		{
			title: "ID",
			dataIndex: "id",
			defaultSortOrder: "ascend",
			sorter: (a, b) => {
				if (a.id > b.id) {
					return 1;
				}
				if (b.id > a.id) {
					return -1;
				}
				return 0;
			},
		},
		{
			title: "Name",
			dataIndex: "name",
			sorter: (a, b) => a.name.localeCompare(b.name),
			render: (name: Animal.Attributes["name"], record) => (
				<TableName
					name={name}
					image={
						record.animalImages
							? record.animalImages[0].thumbnailUrl
							: undefined
					}
				/>
			),
		},
		{
			title: "Visibility",
			dataIndex: "visible",
			onFilter: (value, record) => record.visible === value,
			filters: [
				{
					text: "No",
					value: false,
				},
				{
					text: "Yes",
					value: true,
				},
			],
			render: (visible: Animal.Attributes["visible"]) => (
				<TablePill type={TablePillType.VISIBILITY} value={visible} />
			),
		},
		{
			title: "Species",
			dataIndex: "species",
			onFilter: (value, record) => record.species === value,
			filters: Object.entries(Animal.Species).map(([, status]) => ({
				text: status,
				value: status,
			})),
			render: (species: Animal.Attributes["species"]) => (
				<TablePill type={TablePillType.SPECIES} value={species} />
			),
		},
		{
			title: "Status",
			dataIndex: "adoptionStatus",
			onFilter: (value, record) => record.adoptionStatus === value,
			filters: Object.entries(Animal.AdoptionStatus).map(
				([, status]) => ({
					text: status,
					value: status,
				}),
			),
			render: (status: Animal.Attributes["adoptionStatus"]) => (
				<TablePill type={TablePillType.STATUS} value={status} />
			),
		},
		{
			title: "Action",
			dataIndex: "id",
			render: (key: Animal.Attributes["id"]) => (
				<a className={actionButton} onClick={() => onViewMore(key)}>
					View pet details
				</a>
			),
		},
	];
	return (
		<Container>
			<div className={tableHeader}>
				<div>Pets</div>
				<div>
					<Search
						placeholder="search by name or ID"
						allowClear
						onSearch={onSearch}
						style={{ width: "264px", margin: "4px" }}
					/>
					<Button type="default" style={{ margin: "4px" }}>
						Clear all filters and sortings
					</Button>
					<Button type="primary" style={{ margin: "4px" }}>
						<ImportOutlined />
						Integrate with current software
					</Button>
					<Button type="primary" style={{ margin: "4px" }}>
						<PlusOutlined />
						Add New
					</Button>
				</div>
			</div>
			<Table
				rowKey={(pet) => pet.id}
				columns={columns}
				dataSource={petData}
				pagination={{ pageSize: 10 }}
				scroll={{ y: 640 }} // TODO: update to use dynamic window height calculation
			/>
		</Container>
	);
};

export default PetTableDisplay;

// =============================================================================
// Styled Components
// =============================================================================

const Container = styled.div`
	margin: 24px 34px;
	padding: 24px;
	background: var(--color-white);
`;
