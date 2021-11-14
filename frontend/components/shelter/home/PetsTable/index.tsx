import { ImportOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import { ColumnsType } from "antd/lib/table/interface";
import { FurLength, PetData, Sex, Species, Status } from "common/enums";
import React from "react";
import styled from "styled-components";
import TableName from "./components/Name";
import TablePill, { TablePillType } from "./components/Pill";
import styles from "./PetsTable.module.css";
import Router from "next/router";

const { tableHeader, actionButton } = styles;
const { Search } = Input;

const Container = styled.div`
	margin: 24px 34px;
	padding: 24px;
	background: var(--color-white);
`;

const PetTableDisplay = () => {
	/* commenting out for now as not implemented yet */
	// const [searchText, setSearchText] = useState("");
	// const [searchedColumn, setSearchedColumn] = useState("");
	const onSearch = () => {
		console.log("search");
	};
	const onViewMore = (id: string) => {
		console.log("clicked view more ", id);
	};

	const columns: ColumnsType<Omit<PetData, "acquired" | "breed">> = [
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
			}
		},
		{
			title: "Name",
			dataIndex: "name",
			sorter: (a, b) => a.name.localeCompare(b.name),
			render: (name: PetData["name"], record) => (
				<TableName name={name} image={record.images} />
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
			render: (visible: PetData["visible"]) => (
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
			render: (species: PetData["species"]) => (
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
			render: (status: PetData["status"]) => (
				<TablePill type={TablePillType.STATUS} value={status} />
			)
		},
		{
			title: "Action",
			dataIndex: "key",
			render: (key: PetData["key"]) => (
				<a className={actionButton} onClick={() => onViewMore(key)}>
					View pet details
				</a>
			)
		}
	];

	const mockData: Omit<PetData, "acquired" | "breed">[] = [];
	for (let i = 0; i < 80; i++) {
		mockData.push({
			key: "" + i,
			name: `Fluttershy ${i}`,
			images: [],
			visible: Math.random() > 0.5 ? true : false,
			sex: Math.random() > 0.5 ? Sex.MALE : Sex.FEMALE,
			species: Species.RABBIT,
			status: Status.ADOPTED,
			furLength: Math.random() > 0.5 ? FurLength.SHORT : FurLength.LONG,
			medicalIssues: [],
			sterilised: Math.random() > 0.5 ? "yes" : "no",
			dateOfBirth: new Date(),
			furColor: [],
			toiletTrained: Math.random() > 0.5 ? true : false
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
					<Button
						type="primary"
						style={{ margin: "4px" }}
						onClick={() => Router.push("/shelter/pet/add")}>
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
