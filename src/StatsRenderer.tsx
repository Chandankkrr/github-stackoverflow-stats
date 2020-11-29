import React from 'react';
import { IStackOverflowStats } from './interface';
import fetch from 'node-fetch';

export const StatsRenderer = async (props: IStackOverflowStats) => {
	const { items } = props;
	const {
		profile_image,
		display_name,
		reputation,
		badge_counts,
		link,
	} = items[0];
	const { gold, silver, bronze } = badge_counts;

	const buff = await fetch(profile_image);
	const arrayBuffer = await buff.arrayBuffer();

	const coverImg = `data:image/jpeg;base64,${Buffer.from(arrayBuffer).toString(
		'base64'
	)}`;

	const width = 300;
	const height = 300;

	const getBadgeText = (badgeCount: number): string => {
		return badgeCount > 1 ? 'badges' : 'badge';
	};

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
			 .container {
			 width: 250px;
			 }
			 .container-avatar {
			 padding: 12px;
			 border: 1px solid #d6d9dc;
			 border-radius: 5px;
			 box-shadow: inset 0 10em 0 #eff0f1 !important;
			 }
			 .container-avatar .avatar {
			 width: 165px;
			 height: 165px;
			 margin-top: 15px;
			 margin: auto;
			 }
			 .profile-image {
			 border-radius: 3px;
			 }
			 .reputation {
			 display: flex;
			 justify-content: center;
			 align-items: center;
			 margin: 5px;
			 }
			 .reputation .title {
			 font-size: 20px;
			 margin: 5px;
			 }
			 .reputation .description {
			 font-size: 10px;
			 color: #6a737c;
			 text-transform: uppercase;
			 }
			 .grid {
			 display: flex;
			 }
			 .grid-item {
			 flex: 1 auto;
			 margin: 2px;
			 }
			 .badge {
			 padding: 0 6px;
			 border: 1px solid;
			 border-radius: 3px;
			 font-size: 12px;
			 line-height: 2;
			 color: #3c4146;
			 align-items: center
			 }
			 .center {
			 flex: 1 auto;
			 justify-content: center;
			 align-items: center;
			 }
			 .gold {
			 background: #f1b600;
			 }
			 .badge_gold {
			 border-color: #f1b600;
			 background-color: #fff4d1;
			 }
			 .silver {
			 background: #b4b8bc;
			 }
			 .badge_silver {
			 border-color: #9a9c9f;
			 background-color: #e8e8e8;
			 }
			 .bronze {
			 background: #ab825f;
			 }
			 .badge_bronze {
			 border-color: #ab825f;
			 background-color: #f2e9e1;
			 }
			 .gold,
			 .silver,
			 .bronze {
			 overflow: hidden;
			 width: 10px;
			 height: 10px;
			 border-radius: 50%;
			 }
		  </style>
		  <div class="container">
			 <div class="container-avatar">
				<div class="avatar">
				   <a href="${link}">
					  <div>
						 <img src="${coverImg}" alt="${display_name}" width="164" height="164" class="profile-image" />
					  </div>
				   </a>
				</div>
				<div class="reputation">
				   <div class="title">${reputation} <span class="description">reputation</span></div>
				</div>
				<div class="grid">
				   <div class="grid-item">
					  <div class="grid badge badge_gold"
						 title="${gold} gold ${getBadgeText(gold)}">
						 <span class="gold"></span>
						 <span class="grid center">${gold}</span>
					  </div>
				   </div>
				   <div class="grid-item">
					  <div class="grid badge badge_silver" 
						 title="${silver} silver ${getBadgeText(silver)}">
						 <span class="silver"></span>
						 <span class="grid center">${silver}</span>
					  </div>
				   </div>
				   <div class="grid-item">
					  <div class="grid badge badge_bronze" 
						 title="${bronze} bronze ${getBadgeText(bronze)}">
						 <span class="bronze"></span>
						 <span class="grid center">${bronze}</span>
					  </div>
				   </div>
				</div>
			 </div>
		  </div>
	   </div>
	</foreignObject>
 </svg>
 `;
};

export default StatsRenderer;
