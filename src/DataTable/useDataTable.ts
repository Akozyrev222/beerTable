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
    const getRandomCountry = () => {
        const countryList: string[] = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
        return countryList[Math.floor(Math.random() * countryList.length)]
    }
    const loadData = async () => {
        setLoading(true)
        const options = {
            method: 'GET',
            url: 'https://beers-list.p.rapidapi.com/beers/italy',
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
                country: getRandomCountry()
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