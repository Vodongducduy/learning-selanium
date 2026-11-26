# Selenium Java Visual Audit Bootcamp

Ứng dụng học offline dành cho người mới (fresher, không chuyên IT) cần ôn Selenium Java cho buổi technical audit trong 4 ngày.

> **Lưu ý quan trọng:** Đây là **mô phỏng bằng JavaScript**. Ứng dụng không chạy Java, không chạy Selenium và không mở trình duyệt thật. Code Java trong ứng dụng chỉ dùng để minh họa. Chức năng Hoàn tác (Undo) là tính năng của mô phỏng, không phải thao tác rollback của WebDriver.

## Cách dùng

1. Mở file `index.html` bằng trình duyệt (Chrome, Edge, Firefox). Không cần cài đặt, không cần mạng.
2. Bắt đầu tại **Dashboard** → chọn **Day 1** (hoặc bấm "Tiếp tục học").
3. Mỗi bài có: Lý thuyết, Giải thích cho người mới, Code Java có chú thích từng dòng, **3 mô phỏng** (1 Dễ, 2 Trung bình), Lỗi thường gặp, Câu hỏi audit, Flashcard, Quiz, Tài liệu chính thức.
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

| Khu vực | Nội dung |
|---|---|
| Day 1 | Bài 1–7: kiến trúc WebDriver, điều hướng, locator, XPath, CSS, findElement(s), WebElement |
| Day 2 | Bài 8–16: Implicit/Explicit/Fluent Wait, form controls, alert, iFrame, cửa sổ/tab, Actions, exception |
| Day 3 | Bài 17–20: TestNG, Hard/Soft Assert, Page Object Model, DataProvider |
| Day 4 | Hub ôn tập: quiz lỗi, thẻ khó, so sánh, Mock Audit, khoảng trống kiến thức |
| Flashcards | 60 thẻ (3/bài). Lật thẻ, tự đánh giá "Chưa nhớ / Chưa chắc / Đã nhớ", ghim, lọc theo ngày/độ khó/chế độ, xáo trộn |
| Quiz | 60 câu (3/bài), 4 đáp án, đáp án chỉ hiện sau khi nộp, lý do từng đáp án sai, làm lại câu sai |
| Mock Audit | 30 câu hỏi mở: câu hỏi EN + VI, model answer, giải thích VI, từ khóa, câu hỏi tiếp theo, lỗi thường gặp. Có đồng hồ tùy chọn |
| Cheat Sheet | 16 cặp khái niệm dễ nhầm (bảng so sánh) |
| Glossary | 45 thuật ngữ có tìm kiếm |
| Weak Points | Chủ đề yếu, tính từ kết quả quiz, thẻ và tự đánh giá của bạn |
| References | Tài liệu chính thức theo từng bài (xem `SOURCE_REFERENCES.md`) |
| Kiến thức bổ sung | Maven, Selenium Grid, JavaScriptExecutor, screenshot, upload file, cross-browser (giới thiệu ngắn) |
| Dữ liệu & Cài đặt | Chế độ sáng/tối, xuất/nhập JSON tiến độ, đặt lại tiến độ (có xác nhận) |

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

`tests/e2e.js` dùng `puppeteer-core` và Google Chrome để chạy 25 kiểm thử trên trình duyệt thật. Đường dẫn file và Chrome trong script đang cố định cho máy Windows đã kiểm thử; đổi lại cho máy khác trước khi chạy.

## Hạn chế cần biết

Xem chi tiết trong `QA_REPORT.md`. Tóm tắt:
- Mô phỏng là mô phỏng: không thay thế việc thực hành với Selenium thật.
- Mock Audit không chấm điểm bằng AI; chỉ đối chiếu từ khóa và bạn tự đánh giá.
- Code Java chưa được biên dịch trong phiên kiểm thử này.
- Nội dung tiếng Việt chưa được người bản ngữ rà soát.
