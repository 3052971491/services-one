FROM node:22.3.0 as builder

CMD [ "mkdir", "/upload" ]

WORKDIR /servers

COPY . .

ENV TZ=Asia/Shanghai

RUN npm i --registry=https://registry.npmmirror.com -g pnpm && pnpm i && pnpm run build

EXPOSE 8080
