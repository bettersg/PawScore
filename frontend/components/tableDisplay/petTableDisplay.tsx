import { Table } from 'antd';
import SwitchTag from './switchTag';
import TableName from './tableNameColumn'

const PetTableDisplay = () => {

  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name, record) => <TableName name={name} image={record.image} />
    },
    {
      title: 'Visibility',
      dataIndex: 'visibility',
      onFilter: (value, record) => record.visibility.indexOf(value) === 0,
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
      onFilter: (value, record) => record.species.indexOf(value) === 0,
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
      render: (species: string) => <SwitchTag type="species" value={species.toLowerCase()} />
    },
    {
      title: 'Status',
      dataIndex: 'status',
      onFilter: (value, record) => record.status.indexOf(value) === 0,
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
      render: (status: string) => <SwitchTag type="status" value={status.toLowerCase()} />
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: () => <a>View pet details</a>
    }
  ];

  let data: {
    key: number,
    name: string,
    image: string,
    visibility: string,
    species: string,
    status: string,
    action: string
  }[];
  
	return (
		<div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 25 }} scroll={{ y: 640 }} />
		</div>
	);
};

export default PetTableDisplay;
