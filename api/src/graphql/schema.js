import { makeAugmentedSchema } from 'neo4j-graphql-js';
import fs, { exists } from 'fs';
import jwt from 'jsonwebtoken';
import uniqid from 'uniqid';

import crypto from 'crypto-js/core'
import PBKDF2 from 'crypto-js/pbkdf2'
import SHA256 from 'crypto-js/sha256'

import { v1 as neo4j }  from 'neo4j-driver';
const driver = neo4j.driver('bolt://db', neo4j.auth.basic('neo4j', 'matcha'))
const session = driver.session();

const resolvers = {
  Mutation: {
	async signup (_, { firstname, email, username, password }) {
	  const uid = uniqid('user-');
	  //const hash = await PBKDF2(password, 'salt', { iterations: 10, hasher: crypto.algo.SHA256, keySize: 256 }).toString();
	  const hash = await SHA256(password, 'salt').toString();

	  return await session.run(`CREATE (u:User {uid: $uid, firstname: $firstname, username: $username, email: $email, password: $hash}) RETURN u`,
		{uid, firstname, email, username, hash})
		.then(result => {
		  	const user = result.records[0].get('u').properties;
		  	//console.log(user);
		  	return jwt.sign(
				{ uid: user.uid },
				process.env.JWT_SECRET,
				{ expiresIn: '1y' }
			)
		});
	},

	async login (_, { username, password }) {
	  console.log('lol');
	  //const user = await User.findOne({ where: { username } })
	  const user = await session.run(`MATCH (u:User {username: $username}) RETURN u`, {username});
	  console.log(user);
	  if (!user) {
		throw new Error('No user with that username')
	  }
	  const hash = await SHA256(password, 'salt').toString();
	  console.log(hash);
	  const valid = await bcrypt.compare(hash, user.password)
	  if (!valid) {
		throw new Error('Incorrect password')
	  }
	  //MATCH (u:User {username: 'test', password: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'}) RETURN u
	  return await session.run(`MATCH (u:User {username: $username, password: $hash}) RETURN u`,
		{username, password})
		.then(result => {
		  	const user = result.records[0].get('u').properties;
		  	//console.log(user);
			return jwt.sign(
				{ id: user.id },
				process.env.JWT_SECRET,
				{ expiresIn: '1d' }
		  	)
		});
	}
  }
};

const typeDefs = fs.readFileSync('/usr/src/src/graphql/schema.gql', 'utf8');
const schema = makeAugmentedSchema({ typeDefs, resolvers });
export default schema
