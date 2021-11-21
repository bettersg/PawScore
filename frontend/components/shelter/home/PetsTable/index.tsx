import { ImportOutlined, PlusOutlined } from "@ant-design/icons";
import { Shelter, Species, AdoptionStatus } from "@contract";
import { Button, Input, Table } from "antd";
import { ColumnsType } from "antd/lib/table/interface";
import React from "react";
import styled from "styled-components";
import TableName from "./components/Name";
import TablePill, { TablePillType } from "./components/Pill";
import styles from "./PetsTable.module.css";

const { tableHeader, actionButton } = styles;
const { Search } = Input;

const PetTableDisplay = ({ petData }: { petData: Shelter.PetDataItem[] }) => {
	/* commenting out for now as not implemented yet */
	// const [searchText, setSearchText] = useState("");
	// const [searchedColumn, setSearchedColumn] = useState("");

	const onSearch = () => {
		console.log("search");
	};
	const onViewMore = (id: string) => {
		console.log("clicked view more ", id);
	};

	const columns: ColumnsType<Shelter.PetDataItem> = [
		{
			title: "ID",
			dataIndex: "key",
			defaultSortOrder: "ascend",
			sorter: (a, b) => {
				if (a.key > b.key) {
					return 1;
				}
				if (b.key > a.key) {
					return -1;
				}
				return 0;
			},
		},
		{
			title: "Name",
			dataIndex: "name",
			sorter: (a, b) => a.name.localeCompare(b.name),
			render: (name: Shelter.PetData["name"], record) => (
				<TableName name={name} image={record.images} />
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
			render: (visible: Shelter.PetData["visible"]) => (
				<TablePill type={TablePillType.VISIBILITY} value={visible} />
			),
		},
		{
			title: "Species",
			dataIndex: "species",
			onFilter: (value, record) => record.species === value,
			filters: Object.entries(Species).map(([, status]) => ({
				text: status,
				value: status,
			})),
			render: (species: Shelter.PetData["species"]) => (
				<TablePill type={TablePillType.SPECIES} value={species} />
			),
		},
		{
			title: "Status",
			dataIndex: "status",
			onFilter: (value, record) => record.status === value,
			filters: Object.entries(AdoptionStatus).map(([, status]) => ({
				text: status,
				value: status,
			})),
			render: (status: Shelter.PetData["status"]) => (
				<TablePill type={TablePillType.STATUS} value={status} />
			),
		},
		{
			title: "Action",
			dataIndex: "key",
			render: (key: Shelter.PetData["key"]) => (
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
