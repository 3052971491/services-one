# ================== STEP 1: Build ==================
FROM node:22.3.0 as builder

# 将源码复制到 /app 目录中
WORKDIR /app
COPY . .

# 设置 node 阿里镜像
RUN npm config set registry https://registry.npmmirror.com
# 设置--max-old-space-size
ENV NODE_OPTIONS=--max-old-space-size=16384
# 设置阿里镜像、pnpm、依赖、编译
RUN npm install pnpm -g && \
    pnpm install --no-frozen-lockfile && \
    pnpm build:docker
# node部分结束
RUN echo "🎉 编 🎉 译 🎉 成 🎉 功 🎉"

# ================== STEP 2: Publish ==================
FROM nginx:1.19.6

# 复制 nginx.conf 配置文件到镜像中
COPY ["./_nginx/default.conf", "/etc/nginx/nginx.conf"]

# 删除 nginx html 原有内容
RUN rm -rf /usr/share/nginx/html/*

EXPOSE 80

# 从编译镜像复制编译结果到此镜像
COPY --from=builder /app/dist /usr/share/nginx/html

## 将/usr/share/nginx/html/dist/assets/index.js 和/usr/share/nginx/html/dist/_app.config.js中的"$vg_base_url"替换为环境变量中的VG_BASE_URL,$vg_sub_domain 替换成VG_SUB_DOMAIN，$vg_default_user替换成VG_DEFAULT_USER，$vg_default_password替换成VG_DEFAULT_PASSWORD 而后启动nginx
# CMD sed -i "s|__vg_base_url|$VG_BASE_URL|g" /usr/share/nginx/html/dist/assets/entry/index-*.js /usr/share/nginx/html/dist/_app.config.js && \
#     nginx -g 'daemon off;'

RUN echo "🎉 架 🎉 设 🎉 成 🎉 功 🎉"
