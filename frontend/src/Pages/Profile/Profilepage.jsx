// import { set } from 'mongoose';
import React from 'react'
import Service from '../../utils/http';
import { Container } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Avatar, Text, Stack, Loader} from '@mantine/core';
//import { CssLoader } from '@mantine/core';

export const Profilepage = () => {
    const service = new Service();
    const[loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    
    const fetchUser = async () => {
        try{
            const response = await service.get("user/me");
            setUser(response);
            console.log(user);
        }
        catch (error) {
            console.error("User data unavailable", error);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    if(loading){
        return <div>Loading....</div>
        // return ({
        //     components: {
        //         Loader: Loader.extend({
        //             defaultProps: {
        //                 loaders: { ...Loader.defaultLoaders, custom: CssLoader },
        //                 type: 'custom',
        //             },
        //         }),
        //     },
        // });
    }
    if(!user){
        return <div>User Not found</div>
    }

    return(
        <div>
        <Container>
            <Stack
            h={300}
            bg="var(--mantine-color-body)"
            align="center"
            justify="center"
            gap="sm"
            >
                <Avatar src={user.avatar} size={150} radius={150} alt="it's me" />
                <Text> {user.name}</Text>
                <Text> {user.email}</Text>
                <Text> {new Date(user.createdAt).toLocaleDateString()}</Text>
            </Stack>
        </Container>
        </div>
    )
}
