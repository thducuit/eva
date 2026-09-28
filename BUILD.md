- Quick start

* mở terminal và gõ lệnh 'npm install' để render ra node_module
* tạo file .env
* mở terminal và gõ lệnh 'npm run dev' để chạy project
---

Các bước build lên VPS: Trên local:

- Đăng nhập Docker
- Build: docker compose -f docker-compose.yml build
- Push lên docker và tạo image mới: docker push docker.io/okhubvn/ava:latest

docker compose -f docker-compose.yml build && docker push docker.io/okhubvn/ava:latest
Trên VPS: Lần đẩy đầu tiên: 
- Đăng nhập Docker
docker pull docker.io/okhubvn/ava:latest && docker run -d -p 3000:3000 --name ava docker.io/okhubvn/ava:latest

- Pull image mới về: docker pull docker.io/okhubvn/ava:latest
- Xóa container cũ:

* docker stop ava
* docker rm ava

- Run app: docker run -d -p 3000:3000 --name ava
  docker.io/okhubvn/ava:latest

docker pull docker.io/okhubvn/ava:latest && docker stop ava && docker rm ava && docker run -d -p 3000:3000 --name ava docker.io/okhubvn/ava:latest
 