# Selenium Java Visual Audit Bootcamp

Ứng dụng học offline dành cho người mới (fresher, không chuyên IT) cần ôn Selenium Java cho buổi technical audit và phỏng vấn.

> **Lưu ý quan trọng:** Đây là **mô phỏng bằng JavaScript**. Ứng dụng không chạy Java, không chạy Selenium và không mở trình duyệt thật. Code Java trong ứng dụng chỉ dùng để minh họa. Chức năng Hoàn tác (Undo) là tính năng của mô phỏng, không phải thao tác rollback của WebDriver.

## Cách dùng

1. Mở file `index.html` bằng trình duyệt (Chrome, Edge, Firefox). Không cần cài đặt, không cần mạng.
2. Bắt đầu tại **Dashboard** → chọn một nhóm kỹ năng (hoặc bấm "Tiếp tục học").
3. Mỗi bài có: Lý thuyết, Giải thích cho người mới, Ví dụ có chú thích, **3 mô phỏng** (1 Dễ, 2 Trung bình; chỉ bài 1–20), Lỗi thường gặp, Câu hỏi audit, Flashcard, Quiz, Tài liệu chính thức.
4. Trong mô phỏng:
   - **▶ Phát tự động** / **⏸ Tạm dừng**: chạy hết các bước hoặc dừng ở bước hiện tại.
   - **⏭ Bước tiếp theo**: thực hiện đúng một bước.
   - **⏪ Hoàn tác (Undo)**: khôi phục toàn bộ trạng thái của bước trước (DOM, biến, log, ngữ cảnh, exception).
   - **⏮ Đặt lại** và **↻ Phát lại**.
   - **Tốc độ** 0.5x / 1x / 2x.
   - **Dòng thời gian**: bấm một số bước để nhảy tới đó.
   - Mỗi bước có WHAT / WHY / HOW / IMPACT và bảng **Trước → Sau** cho thấy thay đổi.
   - Bấm **Bước tiếp theo** hoặc **Phát** là bắt đầu; ô "Dự đoán" (có ở một số mô phỏng) cho phép dự đoán trước khi xem kết quả.

## Nội dung

Nội dung bám theo hai bảng: **bảng kỹ năng Automation Test** (nhóm 1–6) và **bảng Interview Evaluation** (thêm OOP, Page Object Model, Git, kỹ năng mềm, ngoại ngữ).

| Khu vực | Nội dung |
|---|---|
| 1. Programming & Unit Test | 9 bài: Java cơ bản: kiểu dữ liệu, điều kiện, vòng lặp, String; Java: Collections và Exception Handling; Lập trình hướng đối tượng (OOP); TestNG, Annotation và vòng đời test; Hard Assert vs Soft Assert; DataProvider và Data-driven Testing; TestNG: Groups, Filter và Parameterized Test; TestNG: Exception, Timeout và Retry; TestNG: Parallel Test và ITestContext |
| 2. Web Automation Test | 18 bài: Selenium & kiến trúc WebDriver; Điều hướng trình duyệt (Navigation); HTML, DOM và Locators; XPath; CSS Selector; findElement() và findElements(); WebElement — click, sendKeys và thuộc tính; Implicit Wait; Explicit Wait; Fluent Wait; Dropdown, Checkbox và Radio Button; Alerts (hộp thoại JavaScript); iFrame và Nested Frames; Nhiều cửa sổ và tab; Actions Class; Các Exception thường gặp; Page Object Model (POM); Tạo Automation Test Project |
| 3. API Testing | 5 bài: API Testing cơ bản: Request và Response; cURL: gửi request từ dòng lệnh; Thiết kế Test Case cho API; Hoppscotch: tạo request và viết script; JMeter: API test, CSV data, assertion và report |
| 4. Database SQL | 5 bài: ER Model và khái niệm Database; PostgreSQL và SQL Server: cài đặt, kiểu dữ liệu; SQL cơ bản: DDL và DML; SQL Operators; SQL Joins |
| 5. AI for Tester | 3 bài: GenAI cơ bản và Prompt Engineering cho Testing; AI trong Test Monitoring, Defect Analysis và Quality Report; Ứng dụng AI cho SQL, API và Automation |
| 6. Software Testing Foundation | 5 bài: Năng lực Tester và khái niệm kiểm thử; Test Process và Test Plan; Test Levels và Test Types; Test Case và Test Design Techniques; Test Execution và quản lý Defect |
| 7. Git & Phỏng vấn | 2 bài: Git cho Tester; Phỏng vấn: thái độ, kỹ năng mềm và tiếng Anh/Nhật |
| Đánh giá phỏng vấn | 18 tiêu chí đúng tỷ trọng (tổng 100%); bạn tự đánh giá 0–4, app tính mức sẵn sàng và gợi ý chỗ cần ôn trước |
| Flashcards | 141 thẻ (3/bài). Lật thẻ, tự đánh giá, ghim, lọc theo nhóm/độ khó/chế độ, xáo trộn |
| Quiz | 141 câu (3/bài): theo bài, theo nhóm, ngẫu nhiên hoặc ôn câu sai |
| Mock Audit | 60 câu hỏi mở, có loại "Phỏng vấn". Đồng hồ tùy chọn |
| Cheat Sheet / Glossary | 28 cặp so sánh / 76 thuật ngữ |
| Weak Points / References | Chủ đề yếu theo dữ liệu của bạn / tài liệu theo bài (xem `SOURCE_REFERENCES.md`) |
| Kiến thức bổ sung | Maven, JavaScriptExecutor, screenshot, upload file (hỗ trợ nhóm Web Automation) |
| Dữ liệu & Cài đặt | Chế độ sáng/tối, xuất/nhập JSON tiến độ, đặt lại tiến độ |

**Mô phỏng:** 60 mô phỏng thuộc bài 1–20 (Selenium, TestNG annotation, assertion, POM, DataProvider). Bài 21–47 chưa có mô phỏng.

## Tiến độ được lưu ở đâu?

- Tiến độ lưu trong **localStorage** của trình duyệt, khóa `sbvab-v1`. Không gửi đi đâu.
- Tiến độ còn sau khi tải lại trang. Mất khi xóa dữ liệu trang của trình duyệt hoặc mở ở cửa sổ ẩn danh.
**Cách học trên nhiều máy (không cần tài khoản):**
1. Ở máy đang học, vào **Dashboard → Đồng bộ giữa các thiết bị → ⬇ Tải file tiến độ**. File tên dạng `sbvab-tien-do-2026-11-26.json`.
2. Lưu file đó vào Google Drive, Zalo hoặc email của bạn.
3. Trên máy khác, mở app, vào **Dashboard → ⬆ Nhập file tiến độ**, chọn file vừa tải. App sẽ hỏi xác nhận trước khi thay tiến độ.
4. Nên tải file sau mỗi buổi học. Dashboard hiển thị thời điểm tải gần nhất.

Lưu ý: nhập file sẽ **thay thế** tiến độ hiện có trên máy đó, không gộp hai bên.

## Cấu trúc thư mục

```
index.html          ← ứng dụng hoàn chỉnh (toàn bộ CSS, JS, nội dung nằm trong file này)
README.md           ← hướng dẫn này
QA_REPORT.md        ← kết quả kiểm thử thực tế, lỗi đã sửa, giới hạn còn lại
SOURCE_REFERENCES.md← tài liệu chính thức đã kiểm tra, ánh xạ theo bài
source/             ← mã nguồn tách file (chỉ để bảo trì)
  build.js          ← ghép src/ thành index.html
  src/              ← các phần: nội dung bài, mô phỏng, flashcard, quiz, audit, engine, UI
tests/              ← kiểm thử tự động (xem bên dưới)
```

Ứng dụng không có phụ thuộc bên ngoài: không CDN, không font tải từ mạng, không backend.

## Chạy lại build và kiểm thử (tùy chọn, cần Node.js)

```bash
node source/build.js index.html          # ghép lại index.html từ source/src
node tests/test-data.js source           # kiểm tra số lượng và cấu trúc dữ liệu
```

`tests/e2e.js` dùng `puppeteer-core` và Google Chrome để chạy 35 kiểm thử trên trình duyệt thật. Đường dẫn file và Chrome trong script đang cố định cho máy Windows đã kiểm thử; đổi lại cho máy khác trước khi chạy.

## Hạn chế cần biết

Xem chi tiết trong `QA_REPORT.md`. Tóm tắt:
- Mô phỏng là mô phỏng: không thay thế việc thực hành với Selenium thật.
- Mock Audit không chấm điểm bằng AI; chỉ đối chiếu từ khóa và bạn tự đánh giá.
- Ví dụ Java, SQL, curl, JMeter, Hoppscotch và Git trong bài chưa được chạy thử.
- Nội dung tiếng Việt chưa được người bản ngữ rà soát.
