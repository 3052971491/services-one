FROM node:22.3.0 as builder

CMD [ "mkdir", "/upload" ]

WORKDIR /servers

COPY . .

ENV TZ=Asia/Shanghai

# 设置 node 阿里镜像
RUN npm config set registry https://registry.npmmirror.com
# 设置--max-old-space-size
ENV NODE_OPTIONS=--max-old-space-size=16384
# 设置阿里镜像、pnpm、依赖、编译
RUN npm install pnpm -g && \
    pnpm install --no-frozen-lockfile && \
    pnpm build
# node部分结束
RUN echo "🎉 编 🎉 译 🎉 成 🎉 功 🎉"

EXPOSE 5173
