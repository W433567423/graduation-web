// 平安用户类型
export interface IPeaceUser {
	id: number;
	username: string;
	nickname: string;
	password: string;
	salt: string;
	token: string | string | null;
	google: string;
	status: number;
	api_id: string;
	api_key: string;
	money: number;
	createtime: string;
	roleid: number;
	pid: number;
	quhao: boolean;
	forbid: number;
	jr_pay: number;
	zr_pay: number;
	jr_orcoun: number;
	zr_orcoun: number;
	qr_pay: number;
	sub_pay: number;
	qr_orcoun: number;
	goog: boolean;
	muxDate: string;
	dmSetArr: string;
	agency: boolean;
	uspidStr: string;
	zcz_pay: number;
	zxf_pay: number;
	zpl_pay: number;
	zrxf_pay: number;
	jrxf_pay: number;
	hitzr_pay: number;
	hitjr_pay: number;
	delTime: string;
}

// 接码列表item类型
export interface IYardItem {
	account: string;
	code: string | null;
	id: string;
	land_id: number;
	userid: number;
	userPid: number;
	syorder: string;
	orderid: string | null;
	tdorder: string;
	money: number;
	order_url: string;
	cjTime: string;
	status: number;
	channelid: number;
	upTime: string;
	channel_name: string;
	dm: string;
	quTime: string;
	api_id: string;
	username: string;
	uspidStr: string;
	pay_type: number;
	leanerid: boolean;
	serverName: string;
	rolename: string;
	topid: string | null;
	pay_mode: number;
	paySelect: number;
	testingTime: string;
	rechargeSun: number;
	validTime: number;
	rail_id: string | null;
	openkey: string | null;
	offerid: string | null;
	url_params: string | null;
	tgp_id: string | null;
}

// 平安的菜单 item 类型
interface IPeaceMenuItem {
	childMenus: IPeaceMenuItem[];
	href: '';
	icon: '';
	id: 0;
	pid: 0;
	roleId: '';
	sort: 0;
	title: '';
	type: 0;
}

// 平安的充值记录
interface IPayMessageItem {
	boolAuto: boolean;
	cjTime: string;
	hash: null;
	id: string;
	money: number;
	nickname: string;
	objid: number;
	objnickname: string;
	objpid: number;
	objusername: string;
	resmoney: number;
	setmoney: number;
	type: number;
	username: string;
	usid: number;
	uspid: number;
}

// 平安的通道 item 类型
interface IPeaceChannelItem {
	channel_set: boolean;
	dm: string;
	game_id: null;
	id: number;
	img: string;
	jr_bfb: number;
	jr_pay: number;
	landview: string;
	name: string;
	status: number;
	type: number;
	viewType: number;
	zr_pay: number;
}
