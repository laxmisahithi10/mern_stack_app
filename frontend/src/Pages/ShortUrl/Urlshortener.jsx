import React from 'react'
import { TextInput, Stack } from '@mantine/core';
import { useState, useEffect } from 'react';
import Service from '../../utils/http';
import { Button } from '@mantine/core';
import { Notification } from '@mantine/core';

export const Urlshortener = () => {
    const service = new Service();
    const [data, setdata] = useState({});
    const [shorturl, setshorturl] = useState("");
    const [notification, setNotification] = useState(null); // null | 'success' | 'error'

    const handleSubmit = async () => {
        try {
            const response = await service.post("s", data);
            setshorturl(`${service.getBaseURL()}/api/s/${response.shortCode}`);
            setNotification('success');
        } catch (error) {
            console.error("Post API failed", error.message);
            setNotification('error');
        }
        setTimeout(() => setNotification(null), 3000);
    }

    useEffect(() => {
        console.log(`Short URL: ${shorturl}`);
    }, [shorturl])

    return (
        <>
            {notification && (
                <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
                    {notification === 'success' ? (
                        <Notification title="Success" color="green" onClose={() => setNotification(null)}>
                            Short URL created successfully!
                        </Notification>
                    ) : (
                        <Notification withBorder color="red" title="Error" onClose={() => setNotification(null)}>
                            Please enter a valid URL
                        </Notification>
                    )}
                </div>
            )}

            <Stack h={500} align="center" justify="center" gap="xl">
                <div>Shorten Your Url</div>
                <TextInput
                    label="Original URL"
                    withAsterisk
                    placeholder="Paste your original Url here"
                    onChange={(event) => setdata({ ...data, originalUrl: event.target.value })}
                    w="50%"
                />
                <TextInput
                    label="Customize your link ( Optional )"
                    placeholder="Customize your link"
                    onChange={(event) => setdata({ ...data, customUrl: event.target.value })}
                    w="50%"
                />
                <TextInput
                    label="Title ( Optional )"
                    placeholder="Enter your title"
                    onChange={(event) => setdata({ ...data, title: event.target.value })}
                    w="50%"
                />
                <Button variant="outline" onClick={handleSubmit}>Generate and shorten Url</Button>

                {shorturl && (
                    <div style={{ textAlign: 'center', marginTop: 10 }}>
                        <span style={{ fontSize: 13, color: '#555' }}>Your short URL: </span>
                        <a href={shorturl} target="_blank" rel="noreferrer" style={{ fontSize: 14, fontWeight: 500 }}>
                            {shorturl}
                        </a>
                    </div>
                )}
            </Stack>
        </>
    )
}
