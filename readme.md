# Bài tập lớn CT449

## Hướng dẫn chạy trên môi trường dev
### 1. Sử dụng Docker
```zsh
  docker compose up --build -d
```
hoặc nếu máy có gói ```make``` thì sử dụng
```zsh
  make build
```

### 2. Chạy thủ công

```
Yêu cầu: máy đã cài đặt node và typescript
```

1. Thiết lập CSDL ```mongo``` trên local hoặc website của mongo và sao chép link connect
2. Truy cập vào thư mục ```server/```
3. Copy file env.example đổi tên thành .env rồi điền link connect vào
4. Thực hiện lệnh ``npm run dev``
5. Trở về thư mục gốc và truy cập thư mục ``admin-client``
6. Copy file env.example đổi tên thành .env rồi điền link của server vào
7. Thực hiện lênh ```npm run dev```
8. Thực hiện tương tự với thư mục ```customer-client```

### 3. Các cổng sau khi chạy ứng dụng

<table>
  <tr>
    <th>Tên thư mục</th>
    <th>Host</th>
  </tr>
  <tr>
    <td>server/</td>
    <td>localhost:3000</td>
  </tr>
  <tr>
    <td>admin-client/</td>
    <td>localhost:3001</td>
  </tr>
  <tr>
    <td>customer-client/</td>
    <td>localhost:3002</td>
  </tr>
</tabel>



