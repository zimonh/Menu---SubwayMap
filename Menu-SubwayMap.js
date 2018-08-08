/* by: ZIMONH src: https://github.com/zimonh/Menu-Subway-Map
License: https://creativecommons.org/licenses/by-nc-sa/4.0/ */
const
	//Menu Items
	menu_items = [
		'HOME',
		'PHOTOS',
		'ABOUT',
		'CONTACT',
		'ART'
	],

	//animation Setting
	s_ani = {
		offset:0,		//time after first loading page
		speed:2,		//speed of transition
		interval:0.5},	//interval between animation start

	//big menu Setting
	s_big = {
		svg_width:   135,	//circle + line width		(adjust group A)
		circle_x:    140,	//circle offset			(adjust group A)
		circle_r:    6,		//circle radius			(adjust group A)
		rect_x:      140,	//line offset			(adjust group A)
		rect_width:  112,	//line width			(adjust group B)
		rect_height: 2,		//line thickness		(adjust group B)
		text_xy:     99,	//space between text		(adjust group C)
		text_angle:  45,	//text angle			(adjust group C)
		text_x:      48,	//text offset circle		(adjust group C)
		text_y:      2,		//text offset top		(adjust group C)
		special_x:   0,		//angle offset fix		(adjust group C)
		special_y:   0,		//angle offset fix		(adjust group C)
		id:'#menu_big'		//id of element where menu ends up
	},

	//small menu Setting
	s_small = {
		svg_width:   73,
		circle_x:    70,
		circle_r:    5,
		rect_x:      70,
		rect_width:  42,
		rect_height: 1,
		text_xy:     49.5,
		text_angle:  45,
		text_x:      47,
		text_y:      0,
		special_x:   0,
		special_y:   0,
		id:'#menu_small'
	},

	menu = (e,s)=>{

		//make small menu
		if(s === s_big) menu(e,s_small);

		let svg_width		= 10,		//total first width
			circle_x	= 30,		//circle first offset
			rect_x		= 44,		//line first offset
			text_x		= s.text_x,
			text_y		= s.text_y,
			offset		= 19.5 - s.rect_height / 2,
			all		= ``,
			ani		= ``;

			s.ani_offset   	= s_ani.offset;
			s.ani_speed    	= s_ani.speed;
			s.ani_interval 	= s_ani.interval;

		for(let i = 0; i < e.length; i++){

			all +=`
			<a class='a${[i]}' xlink:href="#${e[i]}" onclick="menu_highlight(this)">
				<circle cx="${circle_x}" cy="20" r="${s.circle_r}"></circle>
				<text class="menu_text" x="${text_x}" y="${text_y}" transform="rotate(${s.text_angle})">${e[i]}</text>
			</a>`;
			ani += `.menu_svg > .a${i}{animation: slow_show ${s.ani_speed}s forwards; animation-delay: ${s.ani_offset+i*s.ani_interval}s;  }`;

			if(i < e.length-1) all+=`<rect width="${s.rect_width}" height="${s.rect_height}" x="${rect_x}" y="${offset}"></rect>`; //don't add a line to many

			let	x,y;
			if(s.text_angle>45){
				x = s.text_xy * (2 - s.text_angle/45);
				y = s.text_xy * (s.text_angle/45);
			}else{
				y = s.text_xy * (s.text_angle/45);
				x = s.text_xy * (2 - s.text_angle/45);}

			svg_width	+= s.svg_width;
			circle_x	+= s.circle_x;
			rect_x		+= s.rect_x;
			text_x		+= x+s.special_x;
			text_y		-= y+s.special_y;}

		document.querySelector(s.id).innerHTML = `
		<svg class="menu_svg" width="${svg_width}" xmlns="http://www.w3.org/2000/svg">${all}</svg><style>${ani}</style>`;},


	menu_highlight = e => { document.querySelector('#SubwayMap_style').innerHTML = `
		<style>
			.menu_svg > a.${e.className.baseVal} > circle	{animation: slow_fill 0.7s forwards;}
			.menu_svg > a > circle							{animation: slow_reve 0.3s forwards;}
		<style>`;};

	//make the menu
	menu(menu_items,s_big);
