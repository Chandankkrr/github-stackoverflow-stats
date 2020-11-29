import { NowRequest, NowResponse } from '@vercel/node';

import StatsRenderer from '../src/StatsRenderer';
import fetch from 'node-fetch';

const stackoverflowBaseUrl = 'https://api.stackexchange.com';

module.exports = async (req: NowRequest, res: NowResponse) => {
	try {
		const { user, site } = req.query;

		const stackoverflowApiUrl = `${stackoverflowBaseUrl}/2.2/users/${user}?&site=${site}`;
		const response = await fetch(stackoverflowApiUrl);
		const stackOverflowStats = await response.json();
		const statsContent = await StatsRenderer(stackOverflowStats);

        res.setHeader('Content-Type', 'image/svg+xml');
		return res.status(200).send(statsContent);
	} catch (error) {
		return res.status(500).send('Something went wrong!');
	}
};
