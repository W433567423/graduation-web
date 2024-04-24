import { mapListProjects, mapRunStatus } from '@/utils/handleMap.utils';
import { getLocalStorage, setLocalStorage } from '@/utils/storage.util';

const isMobile = () => {
	return navigator.userAgent.match(
		/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
	);
};

export { getLocalStorage, isMobile, mapListProjects, mapRunStatus, setLocalStorage };
