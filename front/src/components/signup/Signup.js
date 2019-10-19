import React from 'react';
import useForm from 'react-hook-form';

import { gql } from "apollo-boost";
import { useMutation } from '@apollo/react-hooks';

const SIGNUP = gql`
  mutation signup($firstname: String!,$lastname: String!, $email: String!, $username: String!, $password: String!) {
	signup(firstname: $firstname, lastname: $lastname, email: $email, username: $username, password: $password)
  }
`;

const Signup = () => {
	const { register, handleSubmit /*, errors*/ } = useForm();
  const [signup] = useMutation(SIGNUP,
	{
	  onCompleted: (data) => {
		localStorage.setItem('token', data.signup);
	  }
	});
  const onSubmit = inputs => {
	signup({
	  variables: {
		firstname: inputs.firstname,
		lastname: inputs.lastname,
		email: inputs.email,
		username: inputs.username,
		password: inputs.password,
	  }
	});
  };

  return (
	<form method="POST" className="signup bg-desc" onSubmit={handleSubmit(onSubmit)}>
	  <input type="text" name="firstname" placeholder="Prénom" ref={register} required/>
	  <input type="text" name="lastname" placeholder="Nom" ref={register}/>
	  <input type="text" name="username" placeholder="Username" ref={register} required/>
	  <input type="text" name="email" placeholder="Email" ref={register} required/>
	  <input type="password" name="password" placeholder="Mot de passe" ref={register} required/>
	  <input type="password" name="password-confirmation" placeholder="Vérification du mot de passe" ref={register}/>
	  <button>Sign up</button>
	</form>
  );
}

export default Signup;
