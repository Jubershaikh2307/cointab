import {
    Button, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Image,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Page2 = () => {

    const navigate = useNavigate()
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/").then((res) => {
            // console.log(res.data)
            setData(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <>
            <Button colorScheme='blue' onClick={() => navigate("/")}>back</Button>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>City</Th>
                            <Th>Profile</Th>
                        </Tr>
                    </Thead>
                    {
                        data && data.map((el) => {
                            return (
                                <Tbody>
                                    <Td>{el.name}</Td>
                                    <Td>{el.address}</Td>
                                    <Td><Image src={el.picture} /></Td>
                                </Tbody>
                            )
                        })
                    }

                </Table>
            </TableContainer>
        </>
    );
};

export default Page2;