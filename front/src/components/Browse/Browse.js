import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";
import React, { useEffect, useReducer } from 'react';
import UserProfile from '../Profile/UserProfile';
import Nav from "../Nav/Nav";
import './Browse.scss'

const GET_USERS = gql`
query User($username: String) {
	users: User {
		uid
		bio
		gender
		firstname
		lastname
		birthdate
		avatar
		elo
		likesCount
		prefDistance
		tags {
			uid
			name
		}
		likedUsers {
			uid
			username
		}
    }

	firstUser: User(username: $username) {
			uid
			bio
			gender
			firstname
			lastname
			birthdate
			avatar
			elo
			likesCount
			prefDistance
			tags {
				uid
				name
			}
			likedUsers {
				uid
				username
			}
	} 
}
`;

const Browse = ({ firstUsername = null }) => {
	const { loading, error, data } = useQuery(GET_USERS, { variables: {username: firstUsername} });

	function reducer(state, action) {
		switch (action.type) {
			case 'dislike':
				return { user: data.users.shift() };
			case 'reset':
				return { user: action.payload };
			default:
				throw new Error();
		}
	}
	const [state, dispatch] = useReducer(reducer, { uid: 'none', tags: [] });

	useEffect(() => {
		const onCompleted = (data) => {
			if (data.firstUser.length > 0)
				data.users.unshift(data.firstUser[0]);
			dispatch({ type: 'reset', payload: data.users.shift() });
		};
		const onError = (error) => console.log(error);
		if (onCompleted || onError)
			if (onCompleted && !loading && !error)
				onCompleted(data);
		else if (onError && !loading && error)
			onError(error);
	}, [loading, data, error]);
	
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error </p>;

	return <>	
		{ state.user == null ?
				(
					<p>Plus personne, reviens plus tard !</p>
				) : (
					<div className="browse">
						<UserProfile key={state.user.uid} user={state.user} dispatch={dispatch} />
					</div>
				)
		}
		<Nav />
	</>
}

export default Browse;
