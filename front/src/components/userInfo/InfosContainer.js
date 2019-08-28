import React, { useState, useEffect } from 'react';
import MainInfos from './MainInfos';
import Bio from './Bio';
import Tag from './Tag';
import LikeDislike from './LikeDislike';
import Nav from '../Nav';

import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";

const InfosContainer =  () => {
    const { loading, error, data } = useQuery(gql`
        {
            Users {
                id
                firstname
                lastname
                likesCount
                prefRadius
                tags{
                    name
                    id
                }
            }
        }
    `);
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        console.log(loading);
        if (loading === false) {
            setUsers(data.Users);
        }
        console.log(users);
        console.log(data.Users);
    }, [users, loading, setUsers]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error </p>;

    const HandleDelete = idUser => {
        const updatedUsers = [...data.Users];
        //console.log(updatedUsers);
        //console.log(idUser);
        const index = updatedUsers.findIndex(user => user.id === idUser);
        //console.log(index);
        updatedUsers.splice(index, 1);
        data.Users.splice(index, 1);
        setUsers(updatedUsers);
    }
   // console.log(data.Users);

    return data.Users.map(({ id, firstname, lastname, tags, likesCount, prefRadius }) => (
        <div className="infos-container" key={id}>
            <div>
                <MainInfos firstname={firstname} lastname={lastname} likesCount={likesCount} prefRadius={prefRadius}/>
                <Bio />
                <div className="tag-container">
                    {tags.map(tag => <Tag tagName={tag.name}/>)}
                    <Tag tagName="hello"/>
                    <Tag tagName="hello"/>
                    <Tag tagName="hello"/>
                    <Tag tagName="hello koko"/>
                    <Tag tagName="hello"/>
                    <Tag tagName="Say hello"/>
                </div>
                <LikeDislike idUser={id} onDelete={HandleDelete} />
                <Nav/>
            </div>
        </div>
    ));
    console.log(users);
}

export default InfosContainer;