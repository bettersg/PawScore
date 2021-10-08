import { EditOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Form, Space, Table, Tabs, Tag } from "antd";
import { Content } from "antd/lib/layout/layout";
import { ColumnsType } from "antd/lib/table/interface";
import Title from "antd/lib/typography/Title";
import { PetData, PillColor, Species, Status } from "common/enums";
import dayjs from "dayjs";
import ShelterLayout from "layouts/shelter/ShelterLayout";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const adopterData: Adopter[] = [
	{
		key: "1",
		name: "Adopter 1",
		applicationDate: new Date(2021, 8, 18),
		score: 20,
		status: "pending",
		image: "https://via.placeholder.com/22"
	},
	{
		key: "2",
		name: "Adopter 2",
		applicationDate: new Date(2021, 8, 19),
		score: 17,
		status: "rejected",
		image: "https://via.placeholder.com/22"
	},
	{
		key: "3",
		name: "Adopter 3",
		applicationDate: new Date(2021, 8, 20),
		score: 20,
		status: "pending",
		image: "https://via.placeholder.com/22"
	},
	{
		key: "4",
		name: "Adopter 4",
		applicationDate: new Date(2021, 8, 21),
		score: 45,
		status: "pending",
		image: "https://via.placeholder.com/22"
	},
	{
		key: "5",
		name: "Adopter 5",
		applicationDate: new Date(2021, 8, 22),
		score: 28,
		status: "pending",
		image: "https://via.placeholder.com/22"
	},
	{
		key: "6",
		name: "Adopter 6",
		applicationDate: new Date(2021, 8, 25),
		score: 62,
		status: "pending",
		image: "https://via.placeholder.com/22"
	}
];

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

export default function PetDetails() {
	const router = useRouter();
	const { id } = router.query;
	const [petData, setPetData] = useState<PetData>();

	useEffect(() => {
		console.log(`Fetching pet info ${id}`);
		const pd: PetData = {
			key: id as string,
			name: "Cat 1",
			images: [
				"https://via.placeholder.com/86",
				"https://via.placeholder.com/86",
				"https://via.placeholder.com/86",
				"https://via.placeholder.com/86",
				"https://via.placeholder.com/86"
			],
			visible: false,
			species: Species.CAT,
			status: Status.HEALTHY,
			acquired: new Date(),
			breed: "Shorthair cat"
		};
		setPetData(pd);
	}, [id]);

	return (
		<ShelterLayout>
			<Container>
				<Breadcrumb separator=">">
					<Breadcrumb.Item>Pets</Breadcrumb.Item>
					<Breadcrumb.Item href="">View Pet Details</Breadcrumb.Item>
				</Breadcrumb>
				{petData && <PetDetailsSection petData={petData} />}
			</Container>
			<Container>
				<ProspectiveAdopters />
			</Container>
		</ShelterLayout>
	);
}

type PetDetailsSectionProps = {
	petData: PetData;
};
const PetDetailsSection = ({ petData }: PetDetailsSectionProps) => {
	const { key, images, visible, breed, name, species, acquired } = petData;
	return (
		<InnerContent>
			<PetDetailHeader>
				<Title level={5}>Pet Details</Title>
				<Button
					type="primary"
					icon={<EditOutlined />}
					href={`${key}/edit`}>
					Edit
				</Button>
			</PetDetailHeader>
			<div>
				<Form labelCol={{ span: 2 }}>
					<Form.Item label="Photos">
						<ImageGallery images={images} />
					</Form.Item>
				</Form>
				<FormContainer>
					<FormDivFlex>
						<Form labelCol={{ span: 6 }} layout="horizontal">
							<Form.Item label="Id" labelAlign="right">
								<span>{key}</span>
							</Form.Item>
							<Form.Item label="Visibility" labelAlign="right">
								<span>{visible ? "Yes" : "No"}</span>
							</Form.Item>
							<Form.Item label="Status" labelAlign="right">
								<span>{status}</span>
							</Form.Item>
							<Form.Item label="Date of Birth" labelAlign="right">
								<span>0 years 3 months</span>
							</Form.Item>
							<Form.Item label="Breed" labelAlign="right">
								<span>{breed}</span>
							</Form.Item>
						</Form>
					</FormDivFlex>
					<FormDivFlex>
						<Form labelCol={{ span: 8 }}>
							<Form.Item label="Name">
								<span>{name}</span>
							</Form.Item>
							<Form.Item label="Species">
								<span>{species}</span>
							</Form.Item>
							<Form.Item label="Date Acquired">
								<span>{acquired}</span>
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
	);
};

type ImageGalleryProps = {
	images?: string[];
};
const ImageGallery = ({ images }: ImageGalleryProps) => {
	return (
		<GridContainer>
			{images &&
				images.map((image, index) => (
					<img
						key={index}
						src={image}
						alt="Pet Image"
						style={{ width: 86, height: 86 }}
					/>
				))}
		</GridContainer>
	);
};

const ProspectiveAdopters = () => {
	return (
		<InnerContent>
			<Title level={5}>Prospective Adopters</Title>
			<Tabs defaultActiveKey="1">
				<Tabs.TabPane tab="Adopters" key="tab-adopters">
					<Table dataSource={adopterData} columns={adopterCols} />
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
