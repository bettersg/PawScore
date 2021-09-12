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
      sorter: (a, b) => a.name.length - b.name.length
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

  const data = [{
    key: 1,
    name: `Fluttershy 785321`,
    visibility: "yes",
    species: "cat",
    status: "ADOPTED",
    action: ""
  },
  {
    key: 2,
    name: `Twilight 951148`,
    visibility: "no",
    species: "dog",
    status: "fostered",
    action: ""
  },
  {
    key: 7,
    name: `Rainbow Dash`,
    visibility: "yes",
    species: "rabbit",
    status: "SICK",
    action: ""
  }];
  
	return (
		<div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 25 }} scroll={{ y: 640 }} />
		</div>
	);
};

export default PetTableDisplay;
