"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const Koa = require("koa");
const request = require("request");
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const app = new Koa();
const router = new Router();
// const users = ['Tom', 'Jack', 'Amy', 'Lena', 'Brian'];
app.use(bodyParser());
app.use(logger());
require("reflect-metadata");
const typeorm_2 = require("typeorm");
console.log('123:', __dirname);
typeorm_2.createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'test',
    entities: [
        User_1.User
    ],
    synchronize: true,
}).then((connection) => __awaiter(this, void 0, void 0, function* () {
    // 这里可以写实体操作相关的代码
    // const user = new User();
    //     user.firstName = 'Jack';
    //     user.lastName = 'Lau';
    //     user.age = 18;
    //     const userRepository = connection.getRepository(User);
    //     await userRepository.save(user);
    //     console.log('User has been saved');
    //     const savedUsers = await userRepository.find();
    //     console.log('All users from the db: ', savedUsers);
})).catch(error => console.log(error));
// 用户注册
router.post('/user', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    console.log('body:', ctx.request.body);
    const userRepository = yield typeorm_1.getManager().getRepository(User_1.User);
    const newUser = userRepository.create(ctx.request.body);
    yield userRepository.save(newUser);
    ctx.response.status = 200;
    ctx.response.body = {
        data: newUser
    };
}));
// 登录
router.post('/login', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    console.log('body:', ctx.request.body);
    const userRepository = yield typeorm_1.getManager().getRepository(User_1.User);
    const user = yield userRepository.findOne(ctx.request.body);
    console.log('body:', user);
    ctx.response.status = 200;
    ctx.response.body = {
        data: user
    };
}));
// 登录金拱门并保存登录信息
router.post('/mcd/login', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    console.log('body:', ctx.request.body);
    const userRepository = yield typeorm_1.getManager().getRepository(User_1.User);
    // const proxy = httpProxy.createProxyServer({});
    // const req: any = ctx.request;
    // const res: any = ctx.response;
    // proxy.web(req, res, {target: 'http://127.0.0.1:80/node/user/login'});
    // proxy.on('proxyRes', function(proxyRes: any, req2: any, res2: any) {
    //   console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
    //   ctx.response.status = 200;
    //   ctx.response.body = {
    //     data: proxyRes
    //   };
    // });
    request.post({ url: 'http://127.0.0.1:80/node/user/login', form: ctx.request.body }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log('null>>>>>>>>>>>:', response);
            console.log('null>>>>>>>>>>>><<<<<<<<<<<<<<:');
            ctx.response.status = 200;
            ctx.response.body = {
                data: body
            };
        }
        else {
            ctx.response.status = 200;
            ctx.response.body = {
                data: error
            };
        }
    });
}));
// 当前可用拼单列表
router.post('/mcd/login/list', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    console.log('body:', ctx.request.body);
    const userRepository = yield typeorm_1.getManager().getRepository(User_1.User);
    const user = yield userRepository.findOne(ctx.request.body);
    console.log('body:', user);
    ctx.response.status = 200;
    ctx.response.body = {
        data: user
    };
}));
// 单个用户下单
router.post('/order', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    console.log('body:', ctx.request.body);
    const userRepository = yield typeorm_1.getManager().getRepository(User_1.User);
    const user = yield userRepository.findOne(ctx.request.body);
    console.log('body:', user);
    ctx.response.status = 200;
    ctx.response.body = {
        data: user
    };
}));
// 拼单后正式向金拱门下单
router.post('/mcd/order', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    console.log('body:', ctx.request.body);
    const userRepository = yield typeorm_1.getManager().getRepository(User_1.User);
    const user = yield userRepository.findOne(ctx.request.body);
    console.log('body:', user);
    ctx.response.status = 200;
    ctx.response.body = {
        data: user
    };
}));
router.get('/users', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const userRepository = yield typeorm_1.getManager().getRepository(User_1.User);
    const users = yield userRepository.find();
    console.log('uuser:', users);
    ctx.response.status = 200;
    ctx.response.body = {
        data: users
    };
}));
app.use(router.routes());
module.exports = app;
//# sourceMappingURL=app.js.map