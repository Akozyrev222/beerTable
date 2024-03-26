import React, {useEffect, useState} from "react";
import {Beer} from "../types/data";
import axios from "axios";
import {v4 as uuidv4} from "uuid";
import {ColumnsType} from "antd/es/table";

export const useDataTable = () => {
    const [data, setData] = useState<Beer[]>()
    const [loading, setLoading] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentModal, setCurrentModal] = useState<null | Beer>()

    const loadData = async () => {
        setLoading(true)
        const options = {
            method: 'GET',
            url: 'https://beers-list.p.rapidapi.com/beers/',
            headers: {
                'X-RapidAPI-Key': 'f306dae85bmsh4823e05df58e864p1b260djsn07d92207a000',
                'X-RapidAPI-Host': 'beers-list.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            const filteredData: Beer[] = response.data.map((item: Omit<Beer, 'country' | 'key'>) => ({
                ...item,
                key: uuidv4(),
            }))
            setData(filteredData)
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    const columns: ColumnsType<Beer> = [
        {
            title: 'Name',
            dataIndex: 'title',
            align: 'center',
            sorter: (a: Beer, b: Beer) => a.title.localeCompare(b.title)

        },
        {
            title: 'Alchool',
            dataIndex: 'alchool',
            align: 'center',
            sorter: (a: Beer, b: Beer) => {
                return Number(a.alchool.replace('%', '')) - Number(b.alchool.replace('%', ''))
            },
        },
        {
            title: 'Country',
            dataIndex: 'country',
            align: 'center',
            sorter: (a: Beer, b: Beer) => a.country.localeCompare(b.country)
        },
    ]
    const showModal = (record: Beer) => {
        setCurrentModal(record)
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setCurrentModal(null)
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
        if (e.target.value === '') {
            loadData()
        }
    }
    const search = () => {
        const filteredData = data?.filter((value: Beer) => {
            return (
                value.title.toLowerCase().includes(searchText.toLowerCase()) ||
                value.alchool.toLowerCase().includes(searchText.toLowerCase()) ||
                value.country.toLowerCase().includes(searchText.toLowerCase())
            )
        })
        setData(filteredData)
    }
    return {
        data, loading, isModalOpen, currentModal, columns, showModal, handleCancel, handleChange, search, searchText
    }
}