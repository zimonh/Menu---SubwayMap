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
		offset:0,		//waiting time before start
		speed:3,		//speed of transition
		interval:0.5},	//interval between animation start
	//big menu Setting
	s_big = {
		svg_width:135,	//circle + line width
		circle_x:140,	//circle offset
		circle_r:8,		//circle radius
		rect_x:140,		//line offset
		rect_width:112,	//line width
		rect_height:4,	//line thickness
		text_xy:99,		//text offset
		id:'#menu_big'
	},
	//small menu Setting
	s_small = {
		svg_width:73,
		circle_x:70,
		circle_r:5,
		rect_x:70,
		rect_width:42,
		rect_height:1,
		text_xy:49.5,
		id:'#menu_small'
	},
	menu = (e,s)=>{
		if(s === s_big) menu(e,s_small);
		let svg_width	= 10,	//total first width
			circle_x	= 30,	//circle first offset
			rect_x		= 44,	//line first offset
			text_xy		= 46,	//text first offset (must be bigger than 42)
			offset		= 9.5 - s.rect_height / 2,
			all			= ``;
			ani			= ``;
			s.ani_offset=s_ani.offset;
			s.ani_speed=s_ani.speed;
			s.ani_interval=s_ani.interval;
		for(let i = 0; i < e.length; i++) {
			all +=`
			<a class='a${[i]}' xlink:href="#${e[i]}" onclick="menu_highlight(this)">
				<circle cx="${circle_x}" cy="10" r="${s.circle_r}"></circle>
				<text class="menu_text" x="${text_xy}" y="-${text_xy-42}" transform="rotate(45)">${e[i]}</text>
			</a>`;
			ani += `.menu_svg > .a${i}{animation: slow_show ${s.ani_speed}s forwards; animation-delay: ${s.ani_offset+i*s.ani_interval}s;  }`;
			if(i < e.length-1) all+=`<rect width="${s.rect_width}" height="${s.rect_height}" x="${rect_x}" y="${offset}"></rect>`; //don't add a line to many
			svg_width	+= s.svg_width;
			circle_x	+= s.circle_x;
			rect_x		+= s.rect_x;
			text_xy		+= s.text_xy;
		}
		document.querySelector(s.id).innerHTML = `<svg class="menu_svg" height="120px" width="${svg_width}" xmlns="http://www.w3.org/2000/svg">${all}</svg><style>${ani}</style>`;
	},
	menu_highlight = e => { document.querySelector('SubwayMap_style').innerHTML = `
		<style>
			.menu_svg > a.${e.className.baseVal} > circle	{animation: slow_fill 0.7s forwards;}
			.menu_svg > a > circle							{animation: slow_reve 0.3s forwards;}
		<style>`;
	};
	//make the menu
	menu(menu_items,s_big);
