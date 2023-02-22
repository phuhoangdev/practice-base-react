const Home = () => {
   return (
      <>
         <div className="home-container mt-4">
            <p>
               Yêu cầu: <br />
               Sử dụng API từ trang web https://reqres.in/ để tạo website.{" "}
               <br />
               Sử dụng thư viện React để tạo một màn hình website cơ bản bao gồm
               các chức năng:
            </p>
            <ul>
               <li>1. Đăng nhập</li>
               <li>2. Thêm User</li>
               <li>3. Sửa User</li>
               <li>4. Xoá User</li>
               <li>5. Hiển thị tất cả User</li>
               <li>6. Tìm kiếm User theo Id</li>
               <li>7. Sắp xếp theo Firstname</li>
               <li>8. Import User từ file CSV</li>
               <li>9. Export User từ file CSV</li>
            </ul>
            <p>
               Tự do tuỳ chỉnh html, css để có một website nhẹ nhàng, khoa học
               và đẹp. <br />
               Commit và đẩy source code lên github public. <br />
               Triển khai website lên Heroku để demo.
            </p>
         </div>
      </>
   );
};
export default Home;
