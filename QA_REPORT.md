# QA_REPORT — Kết quả kiểm thử thực tế

## Cập nhật 28/11/2026 — mở rộng theo bảng kỹ năng và bảng đánh giá phỏng vấn

Phần này mới nhất. Số liệu ở các mục phía dưới là của đợt 26/11/2026.

- **Thêm:** bài 21–47, chia 7 nhóm; bảng yêu cầu → bài ở mỗi nhóm; trang Đánh giá phỏng vấn (tổng tỷ trọng 100%).
- **Bỏ:** Selenium Grid, Cross-browser testing (không có trong hai bảng); lộ trình Day 1–4.
- **Tổng:** 47 bài, 60 mô phỏng, 141 flashcard, 141 quiz, 60 câu audit, 28 dòng cheat sheet, 76 thuật ngữ.
- **Kiểm thử:** `test-data.js` đạt; `e2e.js` đạt 35/35; `sync-test.js` đạt 4/4.
- **Link bài 21–47:** trả về HTTP 200; trang JLPT lúc kiểm tra đang chuyển sang trang bảo trì.
- **Giới hạn:** bài 21–47 không có mô phỏng. Nội dung mới được viết từ kiến thức và phần lớn chưa đối chiếu với nội dung nguồn. Ví dụ Java, SQL, curl, JMeter, Hoppscotch, Git chưa được chạy thử. Nội dung tiếng Việt và tiếng Anh chưa được người khác rà soát.

---

- **Ngày kiểm thử:** 26/11/2026
- **Sản phẩm:** `index.html` (khoảng 371 KB trên đĩa, một file, không phụ thuộc bên ngoài)
- **Môi trường:** Windows 11 Pro, Google Chrome (headless, bản cài sẵn trên máy), Node.js 22.15.1
- **Phạm vi:** kiểm thử tự động (dữ liệu + trình duyệt thật), kiểm tra hình ảnh trên desktop, mobile và dark mode, rà soát tham chiếu tài liệu.

## 1. Tóm tắt kết quả

| Hạng mục | Yêu cầu | Đã có | Kết quả |
|---|---|---|---|
| Bài học chính | 20 | 20 | ✅ |
| Mô phỏng | 60 (1 Dễ + 2 Trung bình / bài) | 60 | ✅ |
| Bước mô phỏng | khoảng 5–10 | 5–7 mỗi mô phỏng (tổng 305 bước) | ✅ |
| Flashcard | ≥ 60 (3 / bài) | 60 | ✅ |
| Quiz | ≥ 60 (3 / bài) | 60 | ✅ (đáp án đúng phân bố 15/15/15/15 ở vị trí A–D) |
| Mock Audit | ≥ 30 | 30 | ✅ |
| Cheat sheet | 15 cặp khái niệm trong đề | 16 dòng | ✅ |
| Glossary | — | 45 thuật ngữ | ✅ |
| Kiến thức bổ sung | giới thiệu ngắn 6 chủ đề | 6 chủ đề | ✅ (mức giới thiệu) |
| Kiểm thử dữ liệu tự động | — | 0 lỗi | ✅ |
| Kiểm thử trình duyệt tự động | — | **25/25 đạt** | ✅ |
| Kiểm tra URL tham chiếu | — | 54/54 HTTP 200 | ✅ (xem mục 5) |
| Tài nguyên bên ngoài | không | không có `<script src>`, `<link>`, `@import`, font hoặc CDN | ✅ |

## 2. Kiểm thử tự động đã chạy

### 2.1 Kiểm thử dữ liệu và engine (`tests/test-data.js`)

Chạy trong Node.js, nạp trực tiếp dữ liệu và engine trạng thái. Kết quả cuối: **ALL DATA CHECKS PASSED**.

Kiểm tra gồm:
- Đủ số lượng: 20 bài, 60 mô phỏng, 60 flashcard, 60 quiz, 30 câu audit, 16 dòng cheat sheet.
- Mỗi bài có đúng 1 mô phỏng Dễ và 2 Trung bình; mỗi bài có 3 flashcard, 3 câu quiz.
- Mỗi bước mô phỏng có đủ WHAT / WHY / HOW / IMPACT, và chỉ số dòng code (`line`) hợp lệ.
- Trạng thái bước thuộc tập `run / ok / err / wait`.
- **Tất định:** dựng snapshot hai lần cho ra kết quả JSON giống hệt nhau.
- **Bất biến:** dựng xong toàn bộ snapshot, các snapshot trước đó không bị thay đổi.
- Mỗi quiz có 4 đáp án khác nhau, đáp án đúng nằm trong khoảng 0–3, có giải thích cho từng đáp án sai.
- Mỗi câu audit có đủ các trường: EN, VI, model answer, giải thích VI, từ khóa, câu hỏi tiếp theo, lỗi thường gặp.

Ghi chú (không phải lỗi): 5 mô phỏng có 1–2 bước chỉ mang tính quan sát (không thay đổi trạng thái): L5-M1, L5-M2, L6-M2, L13-M1, L18-M2. Bước đó được nói rõ trong phần WHAT/IMPACT.

### 2.2 Kiểm thử trên trình duyệt thật (`tests/e2e.js`, Chrome headless)

Kết quả lần chạy cuối: **ALL E2E CHECKS PASSED (25)**.

| # | Kiểm tra | Kết quả |
|---|---|---|
| 1 | Dashboard hiển thị đúng tiêu đề và lộ trình | Đạt |
| 2 | Sidebar có 14 mục điều hướng | Đạt |
| 3 | Cả 20 bài đều có 3 mô phỏng và đủ các mục (Lý thuyết, Code, Mô phỏng, Lỗi, Audit, Flashcard, Quiz, Tài liệu) | Đạt |
| 4 | **Undo** khôi phục **đúng từng ký tự DOM** của trạng thái trước, ở **mọi bước** của **cả 60 mô phỏng** | Đạt |
| 5 | **Reset** khôi phục đúng trạng thái ban đầu của cả 60 mô phỏng | Đạt |
| 6 | **Dòng thời gian** (click số bước) tái tạo đúng snapshot của bước đó | Đạt |
| 7 | **Tạm dừng** dừng hẳn việc tự chạy | Đạt |
| 8 | **Phát tự động ở 2x** chạy tới bước cuối (6/6) và hiện kết luận kỹ thuật | Đạt |
| 9 | **Phát lại** đưa về bước 0 | Đạt |
| 10 | **Undo khi đang tự chạy** dừng bộ đếm an toàn (không chạy tiếp) | Đạt |
| 11 | Rời bài khi đang chạy không làm lỗi trang | Đạt |
| 12 | Đánh giá flashcard được lưu vào localStorage | Đạt |
| 13 | Quiz không hiện đáp án trước khi nộp | Đạt |
| 14 | Quiz hiện đáp án và điểm sau khi nộp; kết quả được lưu | Đạt |
| 15 | Mock Audit lưu tự đánh giá và chuyển sang câu tiếp theo | Đạt |
| 16 | Chế độ tối được áp dụng | Đạt |
| 17 | Xuất JSON chứa tiến độ | Đạt |
| 18 | Nhập JSON khôi phục tiến độ | Đạt |
| 19 | Tiến độ còn sau khi tải lại trang | Đạt |
| 20 | Không cuộn ngang ở chiều rộng 390px (điện thoại) | Đạt (sau khi sửa, xem mục 3) |
| 21 | Không có lỗi console hay exception chưa bắt | Đạt |

Trong quá trình chạy có 0 lỗi console và 0 `pageerror`.

## 3. Lỗi tìm thấy và đã sửa

| # | Phát hiện | Nguyên nhân | Cách sửa |
|---|---|---|---|
| 1 | Trên điện thoại, trang rộng 832px, cuộn ngang 443px | Cột nội dung của lưới `.app` dùng `1fr`, nên nội dung rộng (code, bảng) đẩy cả cột ra ngoài | Dùng `minmax(0,1fr)` cho lưới và `min-width:0` cho phần tử con |
| 2 | 54/60 đáp án đúng nằm ở vị trí B | Dữ liệu quiz được viết lệch | Xoay lại đáp án trong dữ liệu: 15/15/15/15. Giao diện còn xáo trộn thứ tự đáp án mỗi phiên |
| 3 | 45 mô phỏng có dưới 5 bước (một số chỉ 2–3) | Bản đầu viết ngắn | Thêm 1–3 bước kiểm tra/kết luận có thay đổi trạng thái (`src/05c-extra.js`). Bước gốc giữ nguyên |
| 4 | Một tham chiếu của Bài 1 chỉ trỏ tới trang chủ tài liệu | Vi phạm yêu cầu "không link trang chủ" | Thay bằng trang "Drivers" (HTTP 200) |
| 5 | Tham chiếu của Bài 18 ghi nhãn "Assert (Javadoc)" nhưng trỏ tới mục Asserts | Nhãn không khớp đích | Sửa thành "SoftAssert (TestNG 7.9.0 Javadoc)" trỏ tới trang Javadoc đã kiểm tra HTTP 200 |
| 6 | Mô phỏng Bài 10 (polling 1s/3s) có câu giải thích rối | Viết nháp chưa rõ | Viết lại: các lần kiểm tra ở 0/3/6s chưa đạt; 9s mới thấy điều kiện đúng |
| 7 | Khung chính có viền đen khi chuyển trang | Focus được đặt bằng code | Tắt outline cho `#main:focus` |
| 8 | Phần "Trước → Sau" hiện đường dẫn thô như `dom.0.c` | Hiển thị dữ liệu nội bộ | Đổi thành nhãn tiếng Việt: `Phần tử "Ô email" · trạng thái: "err" → "off"` |
| 9 | Đề bài yêu cầu giới thiệu Maven, Grid, JavaScriptExecutor, screenshot, upload, cross-browser nhưng chỉ có trong glossary | Thiếu nội dung | Thêm trang "Kiến thức bổ sung" với code ngắn và tham chiếu đã kiểm tra |
| 10 | Lỗi trong chính bộ kiểm thử (không phải ứng dụng): kiểm tra đọc nhầm trường `what/why` trên sim; mô phỏng 6 bước bị kỳ vọng 5 bước; script bị lỗi do quoting shell | Viết test vội | Sửa test; chạy lại đến khi các kiểm tra phản ánh đúng dữ liệu |

Không có lỗi ứng dụng nào còn mở ở thời điểm báo cáo, trong phạm vi các kiểm thử đã chạy.

## 4. Kiểm tra hình ảnh

Đã xem trực tiếp các ảnh chụp sau:
- Desktop, Bài 1: sidebar, tiêu đề, thẻ lý thuyết, căn chỉnh tốt.
- Điện thoại 390px, Bài 9: menu, thẻ và nút xếp dọc, không cuộn ngang.
- Mô phỏng Bài 3 (bước 3/5) và Bài 13 (bước 2/5): trình duyệt mô phỏng, dòng code đang chạy được tô sáng, dòng thời gian, bảng thay đổi trạng thái, giải thích WHAT/WHY/HOW/IMPACT.
- Chế độ tối (Bài 1): tương phản đủ, các trạng thái (xanh/đỏ/vàng/tím/xám) đều có nhãn chữ kèm màu.

## 5. Kiểm tra tài liệu tham chiếu

- **54 URL duy nhất** trong bài học và phần bổ sung đều trả về **HTTP 200** (kiểm tra ngày 26/11/2026).
- Đã **đọc nội dung** ba nguồn và khẳng định được với nguồn:
  - Selenium waits: implicit wait áp dụng khi tìm phần tử; timeout là giới hạn tối đa; cảnh báo không trộn implicit với explicit.
  - Javadoc `WebElement`: `getAttribute` trả về property trước, nếu không có thì attribute; có `getDomAttribute` và `getDomProperty`.
  - TestNG mục 9.2 Asserts: `org.testng.Assert` có thứ tự tham số khác JUnit.
- Các neo `#_...` trên trang TestNG được kiểm tra bằng sự tồn tại của `id` trên trang, không phải đọc hết nội dung.
- **Chưa đọc nội dung chi tiết** phần lớn các trang còn lại. Chi tiết nằm trong `SOURCE_REFERENCES.md`.

## 6. Giới hạn còn lại (trung thực)

1. **Mô phỏng không phải 60 animation riêng biệt.** Ứng dụng dùng một engine trạng thái chung với các thành phần trực quan theo dữ liệu: trình duyệt mock, sơ đồ luồng nodes, thanh đồng hồ thời gian, bảng code, DOM dạng danh sách có ghi chú. Các trường hợp đặc thù được thể hiện qua trạng thái (tab, frame, dialog, stale, overlay), nhưng:
   - XPath được hiển thị dạng danh sách phẳng có ghi chú trục (parent/child/sibling), **không phải cây DOM có animation duyệt**.
   - CSS selector hiển thị số ứng viên thu hẹp dần, **không** animate từng phần tử được đánh giá.
   - Không có hiệu ứng gõ chữ hay con trỏ hoạt hình.
2. **Predict before play** có trong 17/60 mô phỏng. Yêu cầu ghi "tùy chọn", nên chấp nhận được, nhưng chưa phủ đều.
3. **Code Java chưa được biên dịch** với Selenium/TestNG thật. Các snippet được viết theo API Selenium 4 và TestNG, nhưng chưa chạy thử. Cần rà lại trước khi dùng làm đáp án chuẩn.
4. **Nội dung kỹ thuật chủ yếu được viết từ kiến thức, rồi đối chiếu một phần.** Đã đọc nội dung 3 nguồn; phần còn lại chỉ xác nhận trang tồn tại. Nên đối chiếu các khẳng định về Selenium Manager, pageLoadStrategy, cú pháp Actions, các ExpectedConditions, và thứ tự lifecycle TestNG với trang gốc trước buổi audit.
5. **Kiến thức bổ sung chỉ ở mức giới thiệu.** Chưa có hướng dẫn cài Maven đầy đủ, chưa có ví dụ Grid thật, chưa so sánh tham số chi tiết.
6. **Trình duyệt được kiểm thử:** chỉ Google Chrome headless trên Windows. Chưa kiểm thử Firefox, Edge, Safari, thiết bị cảm ứng thật, hay trình đọc màn hình. Có ARIA cơ bản (`role`, `aria-label`, `aria-live`, `aria-current`), nhưng chưa kiểm định truy cập.
7. **Tiếng Việt chưa được người bản ngữ rà soát.** Thuật ngữ kỹ thuật giữ tiếng Anh như yêu cầu.
8. **Spaced repetition đơn giản:** khoảng cách cố định 1, 2, 4, 7 ngày theo ngày thực, chưa tối ưu theo lịch 4 ngày.
9. **Ước tính thời gian còn lại** là con số thô, chỉ mang tính gợi ý.
10. **Mock Audit không chấm ngữ nghĩa.** Chỉ đối chiếu từ khóa đơn giản và học viên tự đánh giá, đúng như yêu cầu.
11. **Kiểm tra nhập JSON** mới ở mức cơ bản (kiểm tra `sbvab` và `progress`), chưa kiểm tra từng trường.
12. **Hoàn thành bài** là thao tác thủ công; mô phỏng được ghi là "đã xem" khi đạt bước cuối.
13. **Chưa có** commit hay push: thư mục dự án không phải git repository.

## 7. Cách tái kiểm tra

```bash
node source/build.js index.html
node tests/test-data.js source
node tests/e2e.js        # cần Chrome và puppeteer-core; sửa đường dẫn cho máy của bạn
```
