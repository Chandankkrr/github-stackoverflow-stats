import { IStackOverflowStats } from './interface';
import fetch from 'node-fetch';

export const StatsRenderer = async (props: IStackOverflowStats) => {
	const { items } = props;
	const { profile_image, display_name, reputation, badge_counts } = items[0];
	const { gold, silver, bronze } = badge_counts;
	const buff = await fetch(profile_image);
	const arrayBuffer = await buff.arrayBuffer();
	const profileImage = `data:image/jpeg;base64,${Buffer.from(arrayBuffer).toString(
		'base64'
	)}`;

	const width = 200;
	const height = 200;

	return `<svg
		fill="none"
		width="${width}"
		height="${height}"
		viewBox="0 0 ${width} ${height}"
		xmlns="http://www.w3.org/2000/svg"
	  >
		<foreignObject width="${width}" height="${height}">
		  <div xmlns="http://www.w3.org/1999/xhtml">
			<style>
				* {
				  margin: 0;
				  box-sizing: border-box;
				}
				.box {
					margin: 0 20px;
				}
				.profile-image-container {
					margin: 10px;
				}
			  </style>
			  <div class="container">
			  <div class="profile-image-container">
				  <img
					  style="border-radius: 50%; border: 5px solid #f48023;"
					  src="${profileImage}"
					  alt="${display_name}"
				  />
			  </div>
			  <div class="box">
				  <span>${reputation}</span>
				  <span
					  title="${gold} gold badge"
					  style="color: #f1b600; cursor: pointer"
				  >
					  ● ${gold}
				  </span>
				  <span
					  title="${silver} silver badge"
					  style="color: #9a9c9f; cursor: pointer"
				  >
					  ● ${silver}
				  </span>
				  <span
					  title="${bronze} bronze badge"
					  style="color: #ab825f; cursor: pointer"
				  >
					  ● ${bronze}
				  </span>
			  </div>
		  </div>
		  </div>
		</foreignObject>
	  </svg>`;
};

export default StatsRenderer;
