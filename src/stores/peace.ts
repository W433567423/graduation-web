import { type IPeaceUser } from '@/services/interfaces/peace';
import { getLocalStorage, setLocalStorage } from '@/utils';
import { defineStore } from 'pinia';

// 第一个参数必须是全局唯一，可以是哟
export default defineStore('peace', {
	state: (): { peaceUser: IPeaceUser } => ({
		peaceUser: {
			id: 0,
			username: '',
			nickname: '',
			password: '',
			salt: '',
			token: null,
			google: '',
			status: 0,
			api_id: '',
			api_key: '',
			money: 0,
			createtime: '',
			roleid: 0,
			pid: 0,
			quhao: false,
			forbid: 0,
			jr_pay: 0,
			zr_pay: 0,
			jr_orcoun: 0,
			zr_orcoun: 0,
			qr_pay: 0,
			sub_pay: 0,
			qr_orcoun: 0,
			goog: false,
			muxDate: '',
			dmSetArr: '',
			agency: false,
			uspidStr: '',
			zcz_pay: 0,
			zxf_pay: 0,
			zpl_pay: 0,
			zrxf_pay: 0,
			jrxf_pay: 0,
			hitzr_pay: 0,
			hitjr_pay: 0,
			delTime: ''
		}
	}),
	actions: {
		// 初始化
		init() {
			this.peaceUser = getLocalStorage('peaceUser');
		},
		// 设置平安用户
		setPeaceUser(user: any) {
			this.peaceUser = user;
			setLocalStorage('peaceUser', user);
		}
	}
});
