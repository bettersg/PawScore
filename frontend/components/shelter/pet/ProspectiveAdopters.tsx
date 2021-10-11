import { Space, Table, Tabs, Tag } from "antd";
import { ColumnsType } from "antd/lib/table/interface";
import Title from "antd/lib/typography/Title";
import { PillColor } from "common/enums";
import dayjs from "dayjs";
import Link from "next/link";
import styled from "styled-components";

const adopterCols: ColumnsType<Adopter> = [
	{
		title: "Application Id",
		dataIndex: "key",
		key: "key",
		render: (key: Adopter["key"]) => <span>{key}</span>,
		sorter: (a, b) => a.key.localeCompare(b.key)
	},
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
		render: (name: Adopter["name"], record) => (
			<div style={{ display: "flex", alignItems: "center" }}>
				<img
					src={record.image}
					alt={name}
					style={{ width: 22, height: 22 }}
				/>
				<span style={{ marginLeft: 8 }}>{name}</span>
			</div>
		),
		sorter: (a, b) => a.name.localeCompare(b.name)
	},
	{
		title: "Date Of Application",
		dataIndex: "applicationDate",
		key: "applicationDate",
		render: (applicationDate: Adopter["applicationDate"]) => (
			<span>{dayjs(applicationDate).format("DD/MM/YYYY")}</span>
		),
		sorter: (a, b) =>
			a.applicationDate.getTime() - b.applicationDate.getTime()
	},
	{
		title: "Quiz Score",
		dataIndex: "score",
		key: "score",
		render: (score: Adopter["score"]) => <span>{score}</span>,
		sorter: (a, b) => a.score - b.score,
		filters: [
			{
				text: ">= 20",
				value: 20
			},
			{
				text: ">= 40",
				value: 40
			}
		],
		onFilter: (value, record) => record.score >= value
	},
	{
		title: "Status",
		dataIndex: "status",
		key: "status",
		render: (status: Adopter["status"]) => {
			switch (status) {
				case "rejected":
					return <Tag color={PillColor.RED}>rejected</Tag>;
				case "pending":
					return <Tag color={PillColor.ORANGE}>pending</Tag>;
				default:
					return <Tag color={PillColor.PURPLE}>unknown</Tag>;
			}
		},
		filters: [
			// TODO: auto fill this based off an array
			{
				text: "Rejected",
				value: "rejected"
			},
			{
				text: "Pending",
				value: "pending"
			}
		],
		onFilter: (value: any, record: Adopter) =>
			record.status.indexOf(value) === 0
	},
	{
		title: "Action",
		key: "action",
		render: (_: any, record: Adopter) => (
			<Space size="middle">
				<Link href={`adopter/${record.key}`}>
					<a>View Details</a>
				</Link>
			</Space>
		)
	}
];

type ProspectiveAdoptersProps = {
	petAdopters: Adopter[];
};
const ProspectiveAdopters = ({ petAdopters }: ProspectiveAdoptersProps) => {
	return (
		<InnerContent>
			<Title level={5}>Prospective Adopters</Title>
			<Tabs defaultActiveKey="1">
				<Tabs.TabPane tab="Adopters" key="tab-adopters">
					<Table dataSource={petAdopters} columns={adopterCols} />
				</Tabs.TabPane>
				<Tabs.TabPane tab="Fosterers" key="tab-fosterers">
					Content of Tab Pane 2
				</Tabs.TabPane>
				<Tabs.TabPane tab="Donations" key="tab-donations">
					Content of Tab Pane 3
				</Tabs.TabPane>
			</Tabs>
		</InnerContent>
	);
};

export default ProspectiveAdopters;

// =============================================================================
// Styled Components
// =============================================================================
const InnerContent = styled.div`
	margin-top: 24px;
`;
