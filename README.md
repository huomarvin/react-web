# 概述

一个基于 node 的小项目，前端实现用户、角色、菜单、权限功能、登录、授权功能
使用redis存储用户信息
mysql存储数据

## 技术栈

前端
react
react-router-dom
react-redux
koa
### docker
```shell
docker run --name mysql -p 3306:3306 -v /tmp/mysql:/var/lib/mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=true -d mysql:5.7
```
redis
mysql


