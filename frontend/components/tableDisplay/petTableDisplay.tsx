import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import SwitchTag from './switchTag';
import TableName from './tableNameColumn';
import React, { useState } from 'react';

const PetTableDisplay = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.key - b.key,
      ...getColumnSearchProps('key')
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name, record) => <TableName name={name} image={record.image} />,
      ...getColumnSearchProps('name')
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

  const data: {
    key: number,
    name: string,
    image: string,
    visibility: string,
    species: string,
    status: string,
    action: string
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
      <div class="flex space-between table-header">
        Pets
        <Button type="default">Clear all filters and sortings</Button>
        <Button type="primary">Integrate with current software</Button>
        <Button type="primary">Add New</Button>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 25 }} scroll={{ y: 640 }} />
		</div>
	);
};

export default PetTableDisplay;
