import { Table, Input, Button, Space } from "antd";
import { PlusOutlined, ImportOutlined } from "@ant-design/icons";
import SwitchTag from "./SwitchTag";
import TableName from "./TableNameColumn";
import React, { useState } from "react";

const PetTableDisplay = () => {
	const [searchText, setSearchText] = useState("");
	const [searchedColumn, setSearchedColumn] = useState("");

	const { Search } = Input;
	const onSearch = () => {};

	const columns = [
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
			render: (name, record) => (
				<TableName name={name} image={record.image} />
			)
		},
		{
			title: "Visibility",
			dataIndex: "visibility",
			onFilter: (value, record) => record.visibility.indexOf(value) === 0,
			filters: [
				{
					text: "No",
					value: "no"
				},
				{
					text: "Yes",
					value: "yes"
				}
			],
			render: (visibility) => (
				<SwitchTag type="visibility" value={visibility.toLowerCase()} />
			)
		},
		{
			title: "Species",
			dataIndex: "species",
			onFilter: (value, record) => record.species.indexOf(value) === 0,
			filters: [
				{
					text: "Cat",
					value: "cat"
				},
				{
					text: "Dog",
					value: "dog"
				},
				{
					text: "Rabbit",
					value: "rabbit"
				},
				{
					text: "Horse",
					value: "horse"
				}
			],
			render: (species: string) => (
				<SwitchTag type="species" value={species.toLowerCase()} />
			)
		},
		{
			title: "Status",
			dataIndex: "status",
			onFilter: (value, record) => record.status.indexOf(value) === 0,
			filters: [
				{
					text: "Healthy",
					value: "healthy"
				},
				{
					text: "Sick",
					value: "sick"
				},
				{
					text: "Fostered",
					value: "fostered"
				},
				{
					text: "Adopted",
					value: "adopted"
				}
			],
			render: (status: string) => (
				<SwitchTag type="status" value={status.toLowerCase()} />
			)
		},
		{
			title: "Action",
			dataIndex: "action",
			render: () => <a>View pet details</a>
		}
	];

	const data: {
		key: number;
		name: string;
		image: string;
		visibility: string;
		species: string;
		status: string;
		action: string;
	}[] = [];
	for (let i = 0; i < 80; i++) {
		data.push({
			key: i,
			name: `Fluttershy ${i}`,
			image: "",
			visibility: "yes",
			species: "rabbit",
			status: "adopted",
			action: ""
		});
	}

	return (
		<div>
			<div className="flex space-between table-header">
				Pets
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
				dataSource={data}
				pagination={{ pageSize: 10 }}
				scroll={{ y: 640 }}
			/>
		</div>
	);
};

export default PetTableDisplay;
