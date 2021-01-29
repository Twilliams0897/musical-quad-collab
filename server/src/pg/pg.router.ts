import { Pool } from 'pg';
// We shouldn't use Client because it creates a connection not in the pool.
// We'll probably have to use client in AWS Lambda, though.

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Creating a connection pool of pg Clients
// new Pool() will retrieve environment variables
const pool = new Pool();

router.get('/', function (req: any, res: any, next: Function) {
	// for testing db connection from postgres  only
	login('rorr', 'pass', async (q: string, args: string[]) => {
		const resp = await pool.query(q, args);
		console.log(resp.rows, 'from aws pg');
		res.send(JSON.stringify(resp.rows) + 'from aws pg');
	});
});

// pg db connection works in my aws rds
function login(user: string, pass: string, cb: Function) {
	const q = `select * from diner where username=$1::text and password=$2::text`;
	const args = [user, pass];
	cb(q, args);
}

function quit() {
	// The app is closing, shut down the connections. when should we terminate connection?
	pool.end();
	process.exit();
}

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
