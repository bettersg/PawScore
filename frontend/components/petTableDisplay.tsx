import { Table } from 'antd';
import SwitchTag from './switchTag';

const PetTableDisplay = () => {

  const columns = [
    {
      title: 'ID',
      dataIndex: 'key'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true
    },
    {
      title: 'Visibility',
      dataIndex: 'visibility',
      filters: [
      {
        text: "No",
        value: "no"
      }, {
        text: "Yes",
        value: "yes"
      }],
      render: (visibility) => <SwitchTag type="visibility" value={visibility.toLowerCase()} />
    },
    {
      title: 'Species',
      dataIndex: 'species',
      filters: [
        {
          text: "Cat",
          value: "cat"
        }, {
          text: "Dog",
          value: "dog"
        }, {
          text: "Rabbit",
          value: "rabbit"
        }, {
          text: "Horse",
          value: "horse"
        }],
      render: (species) => <SwitchTag type="species" value={species.toLowerCase()} />
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filters: [
        {
          text: "Healthy",
          value: "healthy"
        }, {
          text: "Sick",
          value: "sick"
        }, {
          text: "Fostered",
          value: "fostered"
        }, {
          text: "Adopted",
          value: "adopted"
        }],
      render: (status) => <SwitchTag type="status" value={status.toLowerCase()} />
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: () => <a>View pet details</a>
    }
  ];

  const data = [];

  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Pet ${i}`,
      visibility: "yes",
      species: "cat",
      status: "ADOPTED",
      action: ""
    },
    {
      key: i,
      name: `Pet ${i+3}`,
      visibility: "no",
      species: "dog",
      status: "fostered",
      action: ""
    },
    {
      key: i,
      name: `Pet ${i+7}`,
      visibility: "yes",
      species: "rabbit",
      status: "SICK",
      action: ""
    }
    );
  }
  
	return (
		<div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 25 }} scroll={{ y: 640 }} />
		</div>
	);
};

export default PetTableDisplay;
