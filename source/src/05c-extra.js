/* ===== Bước bổ sung (xác minh / kết luận) để mỗi mô phỏng đạt 5+ bước ===== */
(function () {
  function Z(line, t, what, why, how, impact, st, fx) { return { t: t, what: what, why: why, how: how, impact: impact, line: line, st: st || 'ok', fx: fx }; }
  var X = {
    'L2-E': [
      Z(1, 'Xác minh tiêu đề trang', 'So sánh tiêu đề với kỳ vọng.', 'get() thành công chưa đủ; phải chắc trang đúng.', 'getTitle() rồi assertEquals với chuỗi kỳ vọng.', 'Khớp: tiêu đề là "Shop - Trang chủ".', 'ok', function (s) { s.vars.titleAssert = 'PASS'; }),
      Z(1, 'Ghi nhớ về redirect', 'URL cuối có thể khác URL đã gọi nếu có chuyển hướng.', 'Tránh assert sai khi server đổi địa chỉ.', 'Kiểm tra bằng contains() khi cần linh hoạt.', 'Test ổn định hơn khi có redirect.', 'ok', function (s) { s.vars.note = 'so sánh URL theo phần cần thiết'; })
    ],
    'L3-M1': [
      Z(2, 'Xác nhận bằng text', 'Đọc text của nút đã chọn.', 'Locator đúng cú pháp chưa chắc đúng nghĩa.', 'getText() so với "Đăng nhập".', 'Text khớp; test được tiếp tục.', 'ok', function (s) { F(s, 'b2').hint = 'text đã xác nhận'; })
    ],
    'L3-M2': [
      Z(2, 'Kiểm tra sau nhiều lần tải', 'Tải lại trang để xác nhận locator mới ổn định.', 'Chỉ một lần thành công chưa đủ để tin cậy.', 'Tải lại 2 lần rồi tìm bằng name.', 'Cả hai lần đều tìm thấy ô email.', 'ok', function (s) { F(s, 'e').hint = 'ổn định qua 2 lần tải'; })
    ],
    'L4-E': [
      Z(0, 'Đếm số phần tử khớp', 'Đảm bảo XPath chỉ khớp đúng một nút.', 'XPath tốt phải duy nhất trước khi thao tác.', 'findElements(...).size() phải bằng 1.', 'Số khớp = 1 ✓.', 'ok', function (s) { s.vars.count = 1; })
    ],
    'L4-M1': [
      Z(0, 'Trường hợp hai hàng cùng tên', 'Nếu có hai hàng "Áo thun", phải thêm điều kiện.', 'XPath phải duy nhất trước khi thao tác.', 'Thêm mã sản phẩm vào điều kiện.', 'Chỉ còn một ô được chọn.', 'ok', function (s) { s.vars.note = 'thêm điều kiện mã sản phẩm'; })
    ],
    'L4-M2': [
      Z(0, 'Kiểm tra dữ liệu đã nhập', 'Đọc lại giá trị ô mật khẩu.', 'Xác nhận đúng ô và đúng dữ liệu.', 'getAttribute("value") có độ dài 8.', 'Đúng ô, đúng dữ liệu.', 'ok', function (s) { s.vars.pwdLen = 8; })
    ],
    'L5-E': [
      Z(0, 'So sánh với XPath tương đương', 'Cùng phần tử có thể viết bằng XPath.', 'Hiểu hai cú pháp cho cùng một kết quả.', "//button[contains(@class,'btn-primary')]", 'Cùng kết quả; CSS ngắn gọn hơn.', 'ok', function (s) { s.vars.alt = 'XPath cho cùng kết quả'; })
    ],
    'L5-M1': [
      Z(0, 'Đếm số phần tử khớp', 'Đếm số ô khớp với input[type=\'email\'].', 'Xác nhận selector chỉ khớp một ô.', 'findElements().size().', 'Khớp đúng 1.', 'ok', function (s) { s.vars.matches = 1; }),
      Z(0, 'Đọc lại giá trị sau khi gõ', 'Đọc value của ô email.', 'Xác nhận đúng ô đã nhận dữ liệu.', 'getAttribute("value").', 'value = qa@shop.vn.', 'ok', function (s) { s.vars.value = 'qa@shop.vn'; })
    ],
    'L5-M2': [
      Z(0, 'Kiểm tra số khớp cuối cùng', 'Xác nhận selector cuối chỉ khớp một phần tử.', 'Tránh findElement lấy nhầm.', 'findElements().size() == 1.', 'Kết quả: 1 ✓.', 'ok', function (s) { s.vars.candidates = 1; })
    ],
    'L6-E': [
      Z(0, 'Kiểm tra phần tử hiển thị', 'Gọi isDisplayed() trước khi bấm.', 'Tồn tại trong DOM chưa chắc đã hiển thị.', 'btn.isDisplayed().', 'Nút hiển thị được.', 'ok', function (s) { s.vars.displayed = true; }),
      Z(1, 'Nếu nút không tồn tại', 'findElement sẽ ném NoSuchElementException.', 'Biết trước để chọn đúng hàm khi cần kiểm tra tồn tại.', 'Thử với id sai để quan sát.', 'Dùng findElements().isEmpty() khi chỉ cần kiểm tra.', 'wait', function (s) { s.vars.note = 'findElements để kiểm tra tồn tại'; }),
      Z(1, 'Tóm tắt quy tắc', 'Một phần tử bắt buộc → findElement.', 'Ghi nhớ đúng ngữ nghĩa.', 'Áp dụng cho các test sau.', 'Test rõ ràng hơn.', 'ok', function (s) { s.vars.rule = '1 phần tử bắt buộc → findElement'; })
    ],
    'L6-M1': [
      Z(2, 'Duyệt từng sản phẩm', 'Lặp qua danh sách để đọc tên.', 'Kiểm tra từng phần tử, không chỉ đếm.', 'for (WebElement c : cards) c.getText().', 'Đọc được 6 tên sản phẩm.', 'ok', function (s) { s.vars.names = 6; }),
      Z(1, 'So sánh với kỳ vọng', 'So count với số lượng kỳ vọng 6.', 'Phát hiện thiếu hoặc thừa sản phẩm.', 'assertEquals(count, 6).', 'Khớp ✓.', 'ok', function (s) { s.vars.assert = 'PASS'; })
    ],
    'L6-M2': [
      Z(1, 'Chọn hàm đúng nghiệp vụ', 'Kiểm tra có/không → findElements; bắt buộc có → findElement.', 'Tránh lỗi giả khi banner là tùy chọn.', 'Đối chiếu yêu cầu nghiệp vụ.', 'Test không bị lỗi giả.', 'ok', function (s) { s.vars.rule = 'findElements cho kiểm tra có/không'; })
    ],
    'L7-M1': [
      Z(0, 'Kiểm tra lại sau khi giỏ có hàng', 'Thêm sản phẩm rồi kiểm tra nút.', 'Nút chỉ đúng khi giỏ trống; cần thấy trạng thái đổi.', 'isEnabled() sau khi thêm sản phẩm.', 'isEnabled = true.', 'ok', function (s) { s.vars.enabled = true; F(s, 'pay').c = 'ok'; F(s, 'pay').label = 'Thanh toán'; })
    ],
    'L7-M2': [
      Z(3, 'Chọn nguồn dữ liệu cho test', 'Quyết định dùng thuộc tính nào để điều hướng.', 'Tránh nhầm giữa chữ hiển thị và dữ liệu.', 'Dựa vào yêu cầu kiểm thử.', 'Dùng dataId để điều hướng chính xác.', 'ok', function (s) { s.vars.useData = 'dataId'; })
    ],
    'L8-M1': [
      Z(3, 'So sánh tổng thời gian', 'So sánh tổng thời gian với giới hạn của test.', 'Phát hiện test chậm bất thường.', 'Đo thời gian chạy và so sánh.', 'Tổng 6s nằm trong giới hạn 15s ✓.', 'ok', function (s) { s.vars.budget = '6s / 15s'; })
    ],
    'L8-M2': [
      Z(0, 'Điều tra: có phải lỗi của test?', 'Kiểm tra các bước trước có đúng không.', 'Lỗi có thể do chưa đến đúng bước hiển thị banner.', 'Xem log các bước trước.', 'Xác định được nguyên nhân thực tế.', 'ok', function (s) { s.vars.cause = 'chưa đến bước hiện banner'; })
    ],
    'L9-M1': [
      Z(1, 'Thử click trước khi chờ', 'Thử bấm khi nút còn disabled.', 'Hiểu vì sao cần wait.', 'Click khi enabled = false.', 'Không có tác dụng.', 'wait', function (s) { s.vars.preWait = 'không có tác dụng'; })
    ],
    'L9-M2': [
      Z(0, 'Cân nhắc tăng timeout', 'Đánh giá có nên tăng timeout lên 10 giây.', 'Đủ dài để chờ xử lý, nhưng không quá dài.', 'Chọn timeout lớn hơn thời gian xử lý tối đa đã biết.', 'Với 10 giây, điều kiện đạt lúc 7 giây.', 'ok', function (s) { s.vars.suggest = '10s'; })
    ],
    'L10-M1': [
      Z(1, 'Chọn chu kỳ phù hợp', 'Chọn khoảng 1–2 giây cho đa số trường hợp.', 'Cân bằng độ trễ và số lần kiểm tra.', 'Đánh giá theo đặc điểm ứng dụng.', 'Độ trễ tối đa khoảng 2 giây.', 'ok', function (s) { s.vars.choice = '1–2s'; }),
      Z(0, 'Ghi nhớ', 'Chu kỳ polling không phải thời gian chờ tổng.', 'Tránh nhầm khi cấu hình.', 'withTimeout là tổng thời gian; pollingEvery là chu kỳ.', 'Hiểu đúng cấu hình.', 'ok', function (s) { s.vars.note = 'timeout ≠ polling'; })
    ],
    'L11-E': [
      Z(2, 'Bỏ qua khi đã tích', 'Chỉ bấm khi chưa tích.', 'Tránh đảo trạng thái ngoài ý muốn.', 'if (terms.isSelected()) bỏ qua.', 'Không thay đổi trạng thái khi đã đúng.', 'ok', function (s) { s.vars.skipped = true; })
    ],
    'L11-M1': [
      Z(0, 'Chọn lại Nam', 'Chọn lại Nam để kiểm tra nhóm đổi lựa chọn nhiều lần.', 'Xác nhận nhóm hoạt động đúng mọi lần.', 'click Nam.', 'Nam ◉, Nữ ◯.', 'ok', function (s) { F(s, 'male').label = '◉ Nam'; F(s, 'male').c = 'ok'; F(s, 'female').label = '◯ Nữ'; F(s, 'female').c = ''; s.vars.male = true; s.vars.female = false; })
    ],
    'L11-M2': [
      Z(1, 'Xác nhận giá trị đã chọn', 'Đọc option đang được chọn trong Select.', 'Xác nhận đúng Đà Nẵng.', 'getFirstSelectedOption().getText().', 'Đà Nẵng ✓.', 'ok', function (s) { s.vars.selected = 'Đà Nẵng'; })
    ],
    'L12-E': [
      Z(3, 'Kiểm tra không còn alert', 'Xác nhận alert đã đóng.', 'Tránh lỗi ở bước tiếp theo.', 'Gọi lại switchTo().alert() phải ném NoAlertPresentException.', 'Đúng: không còn alert.', 'ok', function (s) { s.vars.noAlert = true; })
    ],
    'L12-M1': [
      Z(1, 'Nhánh accept để so sánh', 'Thử nhánh OK để thấy khác biệt.', 'Hiểu hai nhánh cho kết quả khác nhau.', 'accept() → đơn bị xóa.', 'Chỉ nhánh này làm đơn 88 biến mất.', 'ok', function (s) { s.vars.acceptBranch = 'đơn bị xóa'; })
    ],
    'L12-M2': [
      Z(2, 'Kiểm tra trường hợp để trống', 'Nếu không nhập và bấm OK, giá trị là chuỗi rỗng.', 'Biết hành vi biên của ứng dụng.', 'sendKeys bỏ qua; accept().', 'Lời chào thành "Xin chào, !" — cần báo là lỗi nghiệp vụ.', 'wait', function (s) { s.vars.emptyCase = 'Xin chào, !'; })
    ],
    'L13-E': [
      Z(1, 'Thoát frame rồi thử lại', 'Thử tìm ô thẻ khi đã ở main.', 'Phần tử trong frame không thấy từ main.', 'findElement tại main document.', 'NoSuchElement — đúng hành vi.', 'err', function (s) { s.browser.ctx = 'main'; s.exc = 'NoSuchElementException: #card không có trong main'; })
    ],
    'L13-M1': [
      Z(3, 'Kiểm tra ngữ cảnh trước khi bấm', 'Đọc ngữ cảnh hiện tại trước click.', 'Tránh bấm nhầm khi quên chuyển.', 'Xem ngữ cảnh đang là main.', 'ctx = main ✓.', 'ok', function (s) { s.vars.context = 'main'; })
    ],
    'L14-E': [
      Z(2, 'Đánh dấu tab mới', 'Chọn handle khác handle gốc làm tab mới.', 'Chuẩn bị chuyển ngữ cảnh.', 'for ... if (!h.equals(main)).', 'Tìm được H-new.', 'ok', function (s) { s.vars.newHandle = 'H-new'; }),
      Z(2, 'Kiểm tra tiêu đề tab mới', 'Xác nhận tab mới đúng trang Điều khoản.', 'Chỉ đếm số tab là chưa đủ.', 'switchTo rồi getTitle().', 'Điều khoản ✓.', 'ok', function (s) { s.vars.check = 'PASS'; })
    ],
    'L14-M2': [
      Z(0, 'Rút ra quy tắc', 'Sau close() phải switchTo().', 'Tránh lặp lại lỗi.', 'Ghi vào quy ước của nhóm.', 'Giảm lỗi cửa sổ.', 'ok', function (s) { s.vars.rule = 'switch sau close'; })
    ],
    'L15-E': [
      Z(2, 'Kiểm tra submenu ẩn lại', 'Di chuột ra ngoài để xem submenu đóng.', 'Hiểu hành vi hover.', 'Di chuyển chuột khỏi menu.', 'Submenu ẩn lại.', 'ok', function (s) { F(s, 'sub').c = 'gone'; })
    ],
    'L15-M1': [
      Z(2, 'Nếu kéo thả không hoạt động', 'Một số ứng dụng cần sự kiện kéo thả khác.', 'Không phải lúc nào dragAndDrop cũng đủ.', 'Kiểm tra loại kéo thả với lập trình viên.', 'Chọn cách phù hợp và ghi chú.', 'wait', function (s) { s.vars.note = 'cần kiểm tra loại kéo thả'; })
    ],
    'L15-M2': [
      Z(2, 'Kiểm tra vùng đã chọn', 'Xác nhận toàn bộ nội dung đã được thay.', 'Tránh đè nhầm một phần.', 'Đọc giá trị ô ghi chú.', 'Toàn bộ thay bằng "Nội dung mới" ✓.', 'ok', function (s) { s.vars.check = 'PASS'; })
    ],
    'L16-E': [
      Z(0, 'Đọc stack trace', 'Xem dòng gây lỗi trong báo cáo.', 'Biết chính xác locator nào sai.', 'Tìm dòng có findElement.', 'Dòng đầu tiên là nguồn lỗi.', 'ok', function (s) { s.vars.where = 'dòng findElement'; })
    ],
    'L16-M1': [
      Z(3, 'Phòng ngừa stale', 'Không giữ tham chiếu quá lâu.', 'Giảm khả năng gặp stale.', 'Tìm lại phần tử ngay trước khi dùng sau khi DOM đổi.', 'Ít lỗi hơn trong suite lớn.', 'ok', function (s) { s.vars.tip = 'tìm lại sau khi DOM đổi'; })
    ],
    'L16-M2': [
      Z(0, 'Ghi nhận nguyên nhân', 'Ghi lại lớp phủ là cookie banner.', 'Lần sau xử lý nhanh hơn.', 'Ghi chú trong test.', 'Có ghi chú rõ ràng.', 'ok', function (s) { s.vars.cause = 'cookie banner'; })
    ],
    'L18-E': [
      Z(0, 'Đọc thông báo khi sai', 'Nếu sai, AssertionError cho biết expected và actual.', 'Giúp điều tra nhanh.', 'Đọc message của AssertionError.', 'Biết chính xác giá trị nào khác.', 'ok', function (s) { s.vars.msgNote = 'hiển thị expected và actual'; })
    ],
    'L18-M1': [
      Z(0, 'Chọn chiến lược assert', 'Tên sai làm các bước sau vô nghĩa → dùng hard.', 'Đúng chiến lược theo phụ thuộc.', 'Hard cho điều kiện tiên quyết.', 'Quyết định: hard cho bước 1.', 'ok', function (s) { s.vars.strategy = 'hard cho điều kiện tiên quyết'; })
    ],
    'L19-E': [
      Z(0, 'Kiểm tra test không chứa locator', 'Test chỉ nên gọi hành động nghiệp vụ.', 'Đảm bảo POM được áp dụng đúng.', 'Đọc code test.', 'Test chỉ gọi login(), không có By.', 'ok', function (s) { s.vars.leak = 'không'; })
    ],
    'L19-M1': [
      Z(1, 'Kiểm tra trang kết quả', 'Xác nhận DashboardPage hợp lệ.', 'Test B tiếp tục dùng trang này.', 'Kiểm tra tiêu đề dashboard.', 'Dashboard ✓.', 'ok', function (s) { s.vars.dash = 'OK'; }),
      Z(3, 'Tổng kết tái sử dụng', 'Hai test dùng cùng LoginPage.', 'Giảm trùng lặp code.', 'Đếm nơi viết locator đăng nhập.', 'Locator chỉ ở 1 nơi.', 'ok', function (s) { s.vars.locatorPlaces = 1; })
    ],
    'L19-M2': [
      Z(3, 'Kiểm tra test không cần sửa', 'Xác nhận các test không phải thay đổi.', 'Đây là lợi ích chính của POM.', 'So sánh diff của test trước và sau.', 'Không có thay đổi ở test.', 'ok', function (s) { s.vars.testChanges = 0; })
    ],
    'L20-E': [
      Z(2, 'Thử thêm hàng thứ hai', 'Xem khác biệt khi có nhiều hàng.', 'Hiểu cách TestNG chạy nhiều lần.', 'Thêm một hàng vào mảng.', 'Sẽ có 2 lần chạy.', 'wait', function (s) { s.vars.rowsNext = 2; }),
      Z(5, 'Kết luận', 'Tóm tắt một test với một hàng.', 'Nền tảng trước khi mở rộng dữ liệu.', 'Đọc kết quả.', '1 hàng = 1 lần chạy; 1/1 PASS.', 'ok', function (s) { s.vars.summary = '1 hàng = 1 lần'; })
    ],
    'L20-M1': [
      Z(7, 'Báo cáo chi tiết', 'Xem từng bộ dữ liệu trong báo cáo.', 'Biết bộ nào lỗi để điều tra.', 'Mỗi hàng là một dòng kết quả.', '3 dòng kết quả riêng biệt.', 'ok', function (s) { s.vars.report = '3 dòng'; })
    ],
    'L20-M2': [
      Z(8, 'Logic phân nhánh theo expectOk', 'Nếu không phân nhánh, dữ liệu sai sẽ báo FAIL giả.', 'Kết quả assert phải khớp kỳ vọng từng hàng.', 'if (expectOk) assertTrue else assertFalse.', 'Không còn FAIL giả.', 'ok', function (s) { s.vars.logic = 'phân nhánh theo expectOk'; })
    ]
  };
  // Gắn bước bổ sung vào đúng mô phỏng. Không chạm vào bước gốc.
  SIMS.forEach(function (sim) {
    (X[sim.id] || []).forEach(function (st) { sim.steps.push(st); });
  });
})();
