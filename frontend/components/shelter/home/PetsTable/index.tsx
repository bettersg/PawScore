import { ImportOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import { ColumnsType } from "antd/lib/table/interface";
import { PetData, Species, Status } from "common/enums";
import React, { useState } from "react";
import styled from "styled-components";
import TablePill, { TablePillType } from "./components/Pill";
import TableName from "./components/Name";
import styles from "./PetsTable.module.css";

const { tableHeader, action } = styles;

const Container = styled.div`
	margin: 24px 34px;
	padding: 24px;
	background: var(--color-header-background);
`;

const PetTableDisplay = () => {
	const [searchText, setSearchText] = useState("");
	const [searchedColumn, setSearchedColumn] = useState("");

	const { Search } = Input;
	const onSearch = () => {};

	const columns: ColumnsType<PetData> = [
		{
			title: "ID",
			dataIndex: "key",
			defaultSortOrder: "ascend",
			sorter: (a, b) => a.key - b.key
		},
		{
			title: "Name",
			dataIndex: "name",
			sorter: (a, b) => a.name.localeCompare(b.name),
			render: (name: string, record) => (
				<TableName name={name} image={record.image} />
			)
		},
		{
			title: "Visibility",
			dataIndex: "visible",
			onFilter: (value, record) => record.visible === value,
			filters: [
				{
					text: "No",
					value: false
				},
				{
					text: "Yes",
					value: true
				}
			],
			render: (visible: boolean) => (
				<TablePill type={TablePillType.VISIBILITY} value={visible} />
			)
		},
		{
			title: "Species",
			dataIndex: "species",
			onFilter: (value, record) => record.species === value,
			filters: Object.entries(Species).map(([, status]) => ({
				text: status,
				value: status
			})),
			render: (species: Species) => (
				<TablePill type={TablePillType.SPECIES} value={species} />
			)
		},
		{
			title: "Status",
			dataIndex: "status",
			onFilter: (value, record) => record.status === value,
			filters: Object.entries(Status).map(([, status]) => ({
				text: status,
				value: status
			})),
			render: (status: Status) => (
				<TablePill type={TablePillType.STATUS} value={status} />
			)
		},
		{
			title: "Action",
			dataIndex: "action",
			render: (onClick: () => void) => (
				<a className={action} onClick={onClick}>
					View pet details
				</a>
			)
		}
	];

	const mockData: PetData[] = [];
	for (let i = 0; i < 80; i++) {
		mockData.push({
			key: i,
			name: `Fluttershy ${i}`,
			// image: "",
			visible: Math.random() > 0.5 ? true : false,
			species: Species.RABBIT,
			status: Status.ADOPTED,
			action: () => alert("clicked")
		});
	}

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
				dataSource={mockData}
				pagination={{ pageSize: 10 }}
				scroll={{ y: 640 }} // TODO: update to use dynamic window height calculation
			/>
		</Container>
	);
};

export default PetTableDisplay;
