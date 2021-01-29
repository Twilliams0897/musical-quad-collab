import { Pool } from 'pg';
// We shouldn't use Client because it creates a connection not in the pool.
// We'll probably have to use client in AWS Lambda, though.

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Creating a connection pool of pg Clients
// new Pool() will retrieve environment variables
const pool = new Pool({
	host: process.env.PGHOST,
	user: 'RN2012michael',
	password: process.env.PGPASSWORD,
	database: process.env.PGDATABASE,
});

function login(user: string, pass: string, cb: Function) {
	const q = `select * from user_account where username=$1::text and password=$2::text`;
	const args = [user, pass];
	cb(q, args);
}

function songs(cb: Function) {
	const q = `select * from song LIMIT 20`;
	cb(q);
}

function getPlaylistByUserId(userId: number, cb: Function) {
	const q = `select * from playlist where user_id=$1::integer`;
	const args = [userId];
	cb(q, args);
}

// testing user_account table in pg
router.get('/user/', function (req: any, res: any, next: Function) {
	const username = 'Cus1'; // 'Cus2', 'Cus3'
	const password = 'pass';
	login(username, password, async (q: string, args: string[]) => {
		const resp = await pool.query(q, args);
		console.log(resp.rows, 'from aws pg');
		res.send(JSON.stringify(resp.rows) + 'from pg user_account table');
	});
});

// testing song table in pg
router.get('/songs', function (req: any, res: any) {
	songs(async (q: string) => {
		const resp = await pool.query(q);
		console.log(resp.rows, 'from aws pg song table');
		res.send(JSON.stringify(resp.rows) + 'from pg song table');
	});
});
// testing playlist table

// testing user_account table in pg
router.get('/playlist/:userId', function (req: any, res: any, next: Function) {
	const userId = req.params.userId;
	getPlaylistByUserId(userId, async (q: string, args: string[]) => {
		const resp = await pool.query(q, args);
		console.log(resp.rows, 'from pg playlist table');
		res.send(JSON.stringify(resp.rows) + 'from pg playlist table');
	});
});

function quit() {
	// The app is closing, shut down the connections. when should we terminate connection?
	pool.end();
	process.exit();
}

// testing from Employee table in pg
function employee(id: number, cb: Function) {
	const q = `select * from "Employee" where "EmployeeId"=$1::integer`;
	const args = [id];
	cb(q, args);
}

router.get('/employee/:id', function (req: any, res: any) {
	let id = Number(req.params.id);
	console.log(id);
	employee(id, async (q: string, args: number[]) => {
		const resp = await pool.query(q, args);
		console.log(resp.rows, 'from aws rds postgres');
		res.send(JSON.stringify(resp.rows));
	});
});

export default router;
