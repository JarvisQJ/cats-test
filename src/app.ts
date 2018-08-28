import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import * as Koa from 'koa';
import * as request from 'request';
import { getManager } from 'typeorm';
import { User } from './entity/User';

const app = new Koa();
const router = new Router();

// const users = ['Tom', 'Jack', 'Amy', 'Lena', 'Brian'];

app.use(bodyParser());

app.use(logger());

import 'reflect-metadata';
import {  createConnection  } from 'typeorm';

console.log('123:', __dirname);

createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'test',
  entities: [
      User
  ],
  synchronize: true,
}).then(async connection => {
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
}).catch(error => console.log(error));

// 用户注册
router.post('/user', async (ctx, next) => {
  console.log('body:', ctx.request.body);
  const userRepository = await getManager().getRepository(User);
  const newUser = userRepository.create(ctx.request.body);
  await userRepository.save(newUser);
  ctx.response.status = 200;
  ctx.response.body = {
    data: newUser
  };
});

// 登录
router.post('/login', async (ctx, next) => {
  console.log('body:', ctx.request.body);
  const userRepository = await getManager().getRepository(User);
  const user = await userRepository.findOne(ctx.request.body);
  console.log('body:', user);
  ctx.response.status = 200;
  ctx.response.body = {
    data: user
  };
});

// 登录金拱门并保存登录信息
router.post('/mcd/login', async (ctx, next) => {
  console.log('body:', ctx.request.body);
  const userRepository = await getManager().getRepository(User);
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
  request.post({url: 'http://127.0.0.1:80/node/user/login', form: ctx.request.body}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log('null>>>>>>>>>>>:', response);
      console.log('null>>>>>>>>>>>><<<<<<<<<<<<<<:');
      ctx.response.status = 200;
      ctx.response.body = {
        data: body
      };
    } else {
      ctx.response.status = 200;
      ctx.response.body = {
        data: error
      };
    }
});
});

// 当前可用拼单列表
router.post('/mcd/login/list', async (ctx, next) => {
  console.log('body:', ctx.request.body);
  const userRepository = await getManager().getRepository(User);
  const user = await userRepository.findOne(ctx.request.body);
  console.log('body:', user);
  ctx.response.status = 200;
  ctx.response.body = {
    data: user
  };
});

// 单个用户下单
router.post('/order', async (ctx, next) => {
  console.log('body:', ctx.request.body);
  const userRepository = await getManager().getRepository(User);
  const user = await userRepository.findOne(ctx.request.body);
  console.log('body:', user);
  ctx.response.status = 200;
  ctx.response.body = {
    data: user
  };
});

// 拼单后正式向金拱门下单
router.post('/mcd/order', async (ctx, next) => {
  console.log('body:', ctx.request.body);
  const userRepository = await getManager().getRepository(User);
  const user = await userRepository.findOne(ctx.request.body);
  console.log('body:', user);
  ctx.response.status = 200;
  ctx.response.body = {
    data: user
  };
});



router.get('/users', async (ctx, next) => {
  const userRepository = await getManager().getRepository(User);
  const users = await userRepository.find();
  console.log('uuser:', users );
  ctx.response.status = 200;
  ctx.response.body = {
    data: users
  };
});

app.use(router.routes());

module.exports = app;