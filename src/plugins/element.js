import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/lib/theme-chalk/index.css';

export default (app) => {
    app.use(ElementPlus, {
        locale: zhCn,
    });
};
