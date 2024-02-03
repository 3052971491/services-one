
-- 创建超级管理员用户
-- id 创建时间 更新时间 创建人 更新人 是否删除 删除时间 密码 盐 账号 手机号 email 状态 头像 是否系统
INSERT INTO `sys_user` VALUES (
    1, 
    '2021-11-15 16:09:23.000000', 
    '2023-04-26 15:24:39.000000',
    '',
    '',
    1,
    '',
    '$2a$10$JChCYKwJYbVV4ANalu2tBenViaF3fuQGAJ1NSBOtR8HJNCV7H710i', 
    '$2a$10$JChCYKwJYbVV4ANalu2tBe', 
    'admin', 
    '15173886750', 
    '3052971491@qq.com', 
    1, 
    'http://localhost:8081/static/67f57d2058984103afc54d164aff5648.jpeg', 
    0,  
);

-- 创建超级管理员角色
INSERT INTO `sys_role` VALUES (
    1, 
    '2021-11-15 16:09:23.000000', 
    '2023-04-26 15:24:39.000000',
    '',
    '',
    1,
    '',
    '超级管理员', 
    'SUPER_ADMIN', 
    '', 
    0, 
);

