export default function createResponse(
	statusCode: number = 200,
	body: any = {},
	headers: any = {}
) {
	const baseHeader: any = {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	};
	Object.keys(headers).forEach((key) => {
		baseHeader[key] = headers[key];
	});
	return {
		body,
		statusCode,
		headers: baseHeader,
	};
}
