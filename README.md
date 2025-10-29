call npm ci || call npm install
call npm run build
mkdir "C:\ProgramData\Jenkins\.jenkins\userContent\freestyle\"
xcopy /E /I /Y "C:\ProgramData\Jenkins\.jenkins\workspace\freestyle\dist\*" "C:\ProgramData\Jenkins\.jenkins\userContent\freestyle\"



FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
