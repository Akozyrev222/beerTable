import React from 'react';
import {Button, Input, Space, Table} from "antd";
import {useDataTable} from "./useDataTable";
import {CustomModal} from "./Modal/Modal";

const DataTable = () => {
    const {
        data,
        columns,
        loading,
        currentModal,
        isModalOpen,
        searchText,
        showModal,
        search,
        handleChange,
        handleCancel
    } = useDataTable()
    return (
        <div>
            <h2>Beer table with AntDesign</h2>
            <Space style={{marginBottom: 16}}>
                <Input
                    placeholder={'name, alchool or country'}
                    onChange={handleChange}
                    type='text'
                    allowClear
                    value={searchText}
                />
                <Button type='primary' onClick={search}>Search</Button>
            </Space>
            <Table
                onRow={(record) => {
                    return {
                        onClick: (event) => {
                            showModal(record)
                        }
                    };
                }}
                columns={columns}
                dataSource={data}
                bordered
                loading={loading}
            />
            <CustomModal
                currentModal={currentModal}
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}/>
        </div>
    );
}

export default DataTable;