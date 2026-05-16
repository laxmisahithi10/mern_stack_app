import React from 'react'
import { Table } from '@mantine/core';
import { useState, useEffect } from 'react';
import Service from '../../utils/http';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { TextInput } from '@mantine/core';

export const Myurls = () => {
    const service = new Service();
    const [updateddata, setupdateddata] = useState({});
    const [opened, { open, close }] = useDisclosure(false);
    const [data, setdata] = useState([]);
    const [rows, setrows] = useState([]);
    const [shortCode, setShortCode] = useState([""]);
    
    useEffect(() => {
        if(data && data.length > 0){
            setrows(data.map((element) => (
                <Table.Tr key={element._id}>
                    <Table.Td>{element.originalUrl}</Table.Td>
                    <Table.Td>{element.shortCode}</Table.Td>
                    <Table.Td>{element.clickCount}</Table.Td>
                    <Table.Td>{element.createdAt}</Table.Td>
                    <Table.Td>{element.updatedAt}</Table.Td>
                    <Table.Td>
                        <Button variant="filled" size="xs" radius="sm" onClick={()=>handleUpdate(element)}> Edit</Button>
                        <Button variant="filled" size="xs" radius="sm" onClick={()=>handleDelete(element)}> Delete</Button>
                    </Table.Td>
                </Table.Tr>
            )));
        }
    },[data]); 

    const fetchhistory = async() => {
        try{
            const response = await service.get("user/my/urls");
            console.log(response.shortURLs);
            setdata(response.shortURLs);
        }
        catch(error){
            console.error("Get API failed", error.message);
        }
    }

    useEffect(() => {
        fetchhistory();
    }, []);

    const handleSubmit = async () => {
        await updateRecord(shortCode, updateddata);
        close();
        await fetchhistory();
    }

    const updateRecord = async (shortCode, updateddata) => {
        try {
            const response = await service.patch(`s/${shortCode}`, updateddata);
            console.log(response);
        } 
        catch (error) {
            console.error(error.message);
        }
    }
    
    const handleUpdate = ((element) => {
        setShortCode(element.shortCode);
        setupdateddata({
            originalUrl: element.originalUrl,
            title: element.title,
        });
        open();
    })
    const handleDelete = async (element) => {
        try {
            await service.delete(`s/${element.shortCode}`);
            await fetchhistory();
        } catch (error) {
            console.error(error.message);
        }
    }


    return (
        <div>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                    <Table.Th>Original URL</Table.Th>
                    <Table.Th>Short Code</Table.Th>
                    <Table.Th>Click Count</Table.Th>
                    <Table.Th>Created At</Table.Th>
                    <Table.Th>Updated At</Table.Th>
                    <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
             <Modal opened={opened} onClose={close} title="Authentication">
                <TextInput
                   defaultValue={updateddata.originalUrl}
                   label="Enter new URL"
                   onChange={(event) => {
                       setupdateddata({ ...updateddata, originalUrl: event.target.value });
                   }}
                   placeholder="Input placeholder"
               />
               <TextInput
                   defaultValue={updateddata.title}
                   label="Enter New Title"
                   placeholder="Input placeholder"
                   onChange={(event) => {
                       setupdateddata({ ...updateddata, title: event.target.value });
                   }}
               />
               <Button variant="filled"
                    onClick={() => {
                        handleSubmit(); 
                    }}>Update</Button>
            </Modal>
        </div>
    )
}
