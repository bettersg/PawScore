/* eslint-disable @next/next/no-img-element */
import { EditOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Form, Space, Table, Tabs, Tag } from "antd";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import dayjs from "dayjs";
import ShelterLayout from "layouts/shelter/ShelterLayout";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useEffect } from "react";
import styled from "styled-components";

const adopterData: Adopter[] = [
	{
		key: "1",
		name: "Adopter 1",
		applicationDate: new Date(2021, 8, 18),
		score: 20,
		status: "pending"
	},
	{
		key: "2",
		name: "Adopter 2",
		applicationDate: new Date(2021, 8, 19),
		score: 17,
		status: "rejected"
	},
	{
		key: "3",
		name: "Adopter 3",
		applicationDate: new Date(2021, 8, 20),
		score: 20,
		status: "pending"
	},
	{
		key: "4",
		name: "Adopter 4",
		applicationDate: new Date(2021, 8, 21),
		score: 45,
		status: "pending"
	},
	{
		key: "5",
		name: "Adopter 5",
		applicationDate: new Date(2021, 8, 22),
		score: 28,
		status: "pending"
	},
	{
		key: "6",
		name: "Adopter 6",
		applicationDate: new Date(2021, 8, 25),
		score: 62,
		status: "pending"
	}
];

const adopterCols = [
	{
		title: "Application Id",
		dataIndex: "key",
		key: "key",
		render: (text: Adopter["key"]) => <span>{text}</span>,
		sorter: (a: Adopter, b: Adopter) => a.key.localeCompare(b.key)
	},
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
		render: (text: Adopter["name"]) => (
			<div style={{ display: "flex", alignItems: "center" }}>
				<img
					src="https://via.placeholder.com/22"
					alt={text}
					style={{ width: 22, height: 22 }}
				/>
				<span style={{ marginLeft: 8 }}>{text}</span>
			</div>
		),
		sorter: (a: Adopter, b: Adopter) => a.name.localeCompare(b.name)
	},
	{
		title: "Date Of Application",
		dataIndex: "applicationDate",
		key: "applicationDate",
		render: (applicationDate: Adopter["applicationDate"]) => (
			<span>{dayjs(applicationDate).format("DD/MM/YYYY")}</span>
		),
		sorter: (a: Adopter, b: Adopter) =>
			a.applicationDate.getTime() - b.applicationDate.getTime()
	},
	{
		title: "Quiz Score",
		dataIndex: "score",
		key: "score",
		render: (text: Adopter["score"]) => <span>{text}</span>,
		sorter: (a: Adopter, b: Adopter) => a.score - b.score,
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
		onFilter: (value: any, record: Adopter) => record.score >= value
	},
	{
		title: "Status",
		dataIndex: "status",
		key: "status",
		render: (status: Adopter["status"]) => {
			switch (status) {
				case "rejected":
					return <Tag color="red">rejected</Tag>;
				case "pending":
					return <Tag color="orange">pending</Tag>;
				default:
					return <Tag color="purple">unknown</Tag>;
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

export default function PetDetails() {
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		console.log(`Fetching pet info ${id}`);
	}, [id]);

	return (
		<ShelterLayout>
			<>
				<Container>
					<Breadcrumb separator=">">
						<Breadcrumb.Item>Pets</Breadcrumb.Item>
						<Breadcrumb.Item href="">
							View Pet Details
						</Breadcrumb.Item>
					</Breadcrumb>
					<InnerContent>
						<PetDetailHeader>
							<Title level={5}>Pet Details</Title>
							<Button
								type="primary"
								icon={<EditOutlined />}
								href={`${id}/edit`}>
								Edit
							</Button>
						</PetDetailHeader>
						<div>
							<Form labelCol={{ span: 2 }}>
								<Form.Item label="Photos">
									<ImageGallery />
								</Form.Item>
							</Form>
							<FormContainer>
								<FormDivFlex>
									<Form
										labelCol={{ span: 6 }}
										layout="horizontal">
										<Form.Item
											label="Id"
											labelAlign="right">
											<span>1233</span>
										</Form.Item>
										<Form.Item
											label="Visibility"
											labelAlign="right">
											<span>No</span>
										</Form.Item>
										<Form.Item
											label="Status"
											labelAlign="right">
											<span>Healthy</span>
										</Form.Item>
										<Form.Item
											label="Date of Birth"
											labelAlign="right">
											<span>0 years 3 months</span>
										</Form.Item>
										<Form.Item
											label="Breed"
											labelAlign="right">
											<span>British Shorthair</span>
										</Form.Item>
									</Form>
								</FormDivFlex>
								<FormDivFlex>
									<Form labelCol={{ span: 8 }}>
										<Form.Item label="Name">
											<span>Cat 1</span>
										</Form.Item>
										<Form.Item label="Species">
											<span>Cat</span>
										</Form.Item>
										<Form.Item label="Date Acquired">
											<span>2020-11-20</span>
										</Form.Item>
										<Form.Item label="Medical Problems">
											<Tag>Problem 1</Tag>
											<Tag>Problem 2</Tag>
											<Tag>Problem 3</Tag>
										</Form.Item>
									</Form>
								</FormDivFlex>
							</FormContainer>
						</div>
					</InnerContent>
				</Container>
				<Container>
					<InnerContent>
						<Title level={5}>Prospective Adopters</Title>
						<Tabs defaultActiveKey="1">
							<Tabs.TabPane tab="Adopters" key="tab-adopters">
								<Table
									dataSource={adopterData}
									columns={adopterCols}
								/>
							</Tabs.TabPane>
							<Tabs.TabPane tab="Fosterers" key="tab-fosterers">
								Content of Tab Pane 2
							</Tabs.TabPane>
							<Tabs.TabPane tab="Donations" key="tab-donations">
								Content of Tab Pane 3
							</Tabs.TabPane>
						</Tabs>
					</InnerContent>
				</Container>
			</>
		</ShelterLayout>
	);
}

const ImageGallery = () => {
	return (
		<GridContainer>
			{[0, 1, 2, 3, 4, 5].map((_, index) => (
				<img
					key={index}
					src="https://via.placeholder.com/86"
					alt="Pet Image"
					style={{ width: 86, height: 86 }}
				/>
			))}
		</GridContainer>
	);
};

const Container = styled(Content)`
	margin: 24px;
	padding: 24px;
	background-color: white;
`;

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 86px);
	grid-gap: 12px;
`;

const InnerContent = styled.div`
	margin-top: 24px;
`;

const FormDivFlex = styled.div`
	flex: 1;
`;

const FormContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

const PetDetailHeader = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
`;
