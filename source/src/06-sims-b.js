/* ===== SIMULATIONS — Bài 11–20 (30 mô phỏng) ===== */

/* ---------- Bài 11: Form controls ---------- */
SIMS.push({ id: 'L11-E', lesson: 11, level: 'Dễ', title: 'Tích checkbox "Đồng ý điều khoản"',
  scen: 'Form đăng ký yêu cầu tích ô "Tôi đồng ý điều khoản" trước khi gửi.',
  code: ['WebElement terms = driver.findElement(By.id("terms"));', 'System.out.println(terms.isSelected()); // false', 'if (!terms.isSelected()) { terms.click(); }', 'System.out.println(terms.isSelected()); // true'],
  init: { browser: { url: 'https://shop.example.com/register', title: 'Đăng ký', ctx: 'main', tabs: null }, dom: [E('terms', 'input[type=checkbox]', '☐ Tôi đồng ý điều khoản', '', 'checked=false')], vars: { isSelected: null }, clock: null },
  steps: [
    { t: 'Tìm checkbox', what: 'findElement(By.id("terms")).', why: 'Cần tham chiếu tới ô tích.', how: 'Trình duyệt trả phần tử.', impact: 'Checkbox được chọn.', line: 0, st: 'run', fx: function (s) { F(s, 'terms').c = 'hl'; } },
    { t: 'isSelected() ban đầu', what: 'Hỏi ô đã tích chưa.', why: 'Tránh bấm ngược lại trạng thái đã đúng.', how: 'Driver trả false.', impact: 'isSelected = false.', line: 1, st: 'wait', fx: function (s) { s.vars.isSelected = false; F(s, 'terms').c = 'wait'; } },
    { t: 'Điều kiện: chưa tích → click', what: 'Bấm checkbox.', why: 'Đưa về trạng thái mong muốn.', how: 'Click đổi trạng thái.', impact: 'Checkbox được tích.', line: 2, st: 'run', fx: function (s) { F(s, 'terms').label = '☑ Tôi đồng ý điều khoản'; F(s, 'terms').c = 'ok'; s.vars.isSelected = true; } },
    { t: 'Xác nhận đã tích', what: 'isSelected() trả true.', why: 'Kiểm tra trước khi gửi form.', how: 'Đọc trạng thái.', impact: 'isSelected = true.', line: 3, st: 'ok', fx: function (s) { s.vars.isSelected = true; } }
  ],
  takeaway: 'Checkbox là trạng thái bật/tắt. Click đổi trạng thái, nên kiểm tra isSelected trước khi click để tránh đảo ngược.' });

SIMS.push({ id: 'L11-M1', lesson: 11, level: 'Trung bình', title: 'Radio button: chọn "Nữ" làm "Nam" bị bỏ chọn',
  scen: 'Nhóm radio "Giới tính" (cùng name). Chọn Nam, rồi chọn Nữ. Kiểm tra trạng thái từng nút.',
  code: ['driver.findElement(By.id("male")).click();', 'driver.findElement(By.id("female")).click();', 'boolean maleOn = driver.findElement(By.id("male")).isSelected(); // false', 'boolean femaleOn = driver.findElement(By.id("female")).isSelected(); // true'],
  init: { browser: { url: 'https://shop.example.com/profile', title: 'Hồ sơ', ctx: 'main', tabs: null }, dom: [E('male', 'input[name=gender]', '◯ Nam', ''), E('female', 'input[name=gender]', '◯ Nữ', '')], vars: { male: false, female: false }, clock: null },
  predict: { q: 'Khi click "Nữ" khi "Nam" đang được chọn, trạng thái "Nam" sẽ thế nào?', opts: ['Vẫn được chọn', 'Tự động bỏ chọn', 'Báo lỗi', 'Cả hai đều được chọn'], ans: 1, why: 'Các radio cùng name thuộc một nhóm; chỉ một cái được chọn tại một thời điểm.' },
  steps: [
    { t: 'Click Nam', what: 'Chọn radio Nam.', why: 'Trạng thái ban đầu của test.', how: 'Trình duyệt đánh dấu Nam.', impact: 'Nam: ◉ đã chọn.', line: 0, st: 'ok', fx: function (s) { F(s, 'male').label = '◉ Nam'; F(s, 'male').c = 'ok'; s.vars.male = true; } },
    { t: 'Click Nữ', what: 'Chọn radio Nữ.', why: 'Đây là điều cần quan sát.', how: 'Cùng name → nhóm radio tự bỏ chọn nút cũ.', impact: 'Nữ được chọn; Nam bị bỏ chọn tự động.', line: 1, st: 'run', fx: function (s) { F(s, 'male').label = '◯ Nam'; F(s, 'male').c = ''; F(s, 'female').label = '◉ Nữ'; F(s, 'female').c = 'ok'; s.vars.male = false; s.vars.female = true; } },
    { t: 'Kiểm tra isSelected', what: 'Đọc trạng thái cả hai.', why: 'Xác nhận kết quả đúng nghiệp vụ.', how: 'isSelected trả về từng giá trị.', impact: 'maleOn = false, femaleOn = true.', line: 2, st: 'ok', fx: function (s) { s.vars.maleOn = false; } },
    { t: 'Kết quả', what: 'femaleOn = true.', why: 'Test pass khi chỉ một lựa chọn.', how: 'Assert.', impact: 'Nhóm radio hoạt động đúng.', line: 3, st: 'ok', fx: function (s) { s.vars.femaleOn = true; } }
  ],
  takeaway: 'Radio cùng name là một nhóm đơn lựa chọn. Click nút khác trong nhóm sẽ bỏ chọn nút cũ.' });

SIMS.push({ id: 'L11-M2', lesson: 11, level: 'Trung bình', title: 'Dropdown native (Select) và dropdown tùy biến',
  scen: 'Trang có hai dropdown: "Tỉnh" là thẻ select gốc; "Quốc gia" là danh sách tự vẽ bằng div.',
  code: ['Select province = new Select(driver.findElement(By.id("province")));', 'province.selectByVisibleText("Đà Nẵng");', '// Dropdown tự vẽ: click mở rồi click option', 'driver.findElement(By.id("country-btn")).click();', 'driver.findElement(By.xpath("//li[text()=\'Việt Nam\']")).click();'],
  init: { browser: { url: 'https://shop.example.com/address', title: 'Địa chỉ', ctx: 'main', tabs: null }, dom: [E('prov', 'select#province', 'Tỉnh: [chọn]', ''), E('ctry', 'div#country-btn', 'Quốc gia: [chọn]', '')], vars: {}, clock: null },
  steps: [
    { t: 'Tạo Select cho thẻ select', what: 'new Select(element).', why: 'Select chỉ hoạt động với thẻ <select> gốc.', how: 'Bọc phần tử để dùng các phương thức chọn.', impact: 'Đã sẵn sàng chọn.', line: 0, st: 'ok', fx: function (s) { F(s, 'prov').c = 'hl'; } },
    { t: 'selectByVisibleText("Đà Nẵng")', what: 'Chọn option có chữ hiển thị đó.', why: 'Mô phỏng người dùng chọn tỉnh.', how: 'Driver đặt thuộc tính selected cho option.', impact: 'Tỉnh = Đà Nẵng.', line: 1, st: 'ok', fx: function (s) { F(s, 'prov').label = 'Tỉnh: Đà Nẵng'; F(s, 'prov').c = 'ok'; } },
    { t: 'Dropdown tùy biến: mở danh sách', what: 'Click vào nút quốc gia để mở.', why: 'Select không nhận diện được div.', how: 'Click mở danh sách li hiện ra.', impact: 'Danh sách mở (chưa có Select).', line: 3, st: 'wait', fx: function (s) { F(s, 'ctry').c = 'wait'; F(s, 'ctry').hint = 'danh sách đang mở'; } },
    { t: 'Click option trong danh sách', what: 'Tìm li có text "Việt Nam" và click.', why: 'Đây là cách tương tác với dropdown tự vẽ.', how: 'XPath tìm li có text khớp, rồi click.', impact: 'Quốc gia = Việt Nam.', line: 4, st: 'ok', fx: function (s) { F(s, 'ctry').label = 'Quốc gia: Việt Nam'; F(s, 'ctry').c = 'ok'; } }
  ],
  takeaway: 'Dùng Select cho dropdown native. Dropdown tùy biến phải mô phỏng thao tác click mở và click chọn.' });

/* ---------- Bài 12: Alerts ---------- */
SIMS.push({ id: 'L12-E', lesson: 12, level: 'Dễ', title: 'Chấp nhận alert thông báo',
  scen: 'Bấm "Lưu" thì hiện alert "Đã lưu thành công". Test đọc nội dung và bấm OK.',
  code: ['driver.findElement(By.id("save")).click();', 'Alert alert = driver.switchTo().alert();', 'System.out.println(alert.getText());', 'alert.accept();'],
  init: { browser: { url: 'https://shop.example.com/profile', title: 'Hồ sơ', ctx: 'main', tabs: null }, dom: [E('save', 'button#save', 'Lưu', '')], vars: {}, clock: null },
  steps: [
    { t: 'Bấm Lưu', what: 'click() trên nút Lưu.', why: 'Kích hoạt alert.', how: 'Trang hiện hộp thoại JavaScript.', impact: 'Có alert đang chặn trang.', line: 0, st: 'run', fx: function (s) { F(s, 'save').c = 'ok'; s.dom.push(E('dlg', 'dialog (alert)', 'Đã lưu thành công', 'wait', 'OK')); s.vars.alertOpen = true; } },
    { t: 'switchTo().alert()', what: 'Chuyển sự chú ý sang alert.', why: 'Driver chỉ thao tác được với alert khi đã chuyển.', how: 'Driver lấy đối tượng Alert.', impact: 'alert trỏ tới hộp thoại.', line: 1, st: 'run', fx: function (s) { s.vars.alert = 'Alert#1'; F(s, 'dlg').c = 'hl'; } },
    { t: 'getText()', what: 'Đọc nội dung alert.', why: 'Kiểm tra thông báo đúng.', how: 'Driver lấy chuỗi.', impact: 'text = "Đã lưu thành công".', line: 2, st: 'ok', fx: function (s) { s.vars.text = 'Đã lưu thành công'; } },
    { t: 'accept() bấm OK', what: 'Đóng alert bằng OK.', why: 'Trang được mở khóa để tiếp tục.', how: 'Driver bấm nút OK.', impact: 'Alert biến mất; trang hoạt động lại.', line: 3, st: 'ok', fx: function (s) { s.dom = [E('save', 'button#save', 'Lưu', 'ok')]; s.vars.alert = 'đã đóng'; s.vars.alertOpen = false; } }
  ],
  takeaway: 'Alert chặn mọi thao tác khác. Phải chuyển sang alert, đọc và đóng nó trước khi làm việc tiếp.' });

SIMS.push({ id: 'L12-M1', lesson: 12, level: 'Trung bình', title: 'Confirm: bấm Cancel (dismiss)',
  scen: 'Bấm "Xóa đơn hàng" hiện confirm "Bạn chắc chắn xóa?". Test chọn Hủy để giữ đơn.',
  code: ['driver.findElement(By.id("delete")).click();', 'Alert confirm = driver.switchTo().alert();', 'confirm.dismiss();  // Cancel', '// Kiểm tra đơn vẫn còn'],
  init: { browser: { url: 'https://shop.example.com/orders/88', title: 'Đơn 88', ctx: 'main', tabs: null }, dom: [E('del', 'button#delete', 'Xóa đơn hàng', ''), E('order', 'div#order', 'Đơn 88 — còn tồn tại', 'ok')], vars: {}, clock: null },
  steps: [
    { t: 'Bấm Xóa đơn hàng', what: 'click() mở confirm.', why: 'Mô phỏng hành động nguy hiểm cần xác nhận.', how: 'Trang hiện hộp thoại confirm.', impact: 'Confirm đang mở.', line: 0, st: 'run', fx: function (s) { F(s, 'del').c = 'ok'; s.dom.push(E('dlg', 'dialog (confirm)', 'Bạn chắc chắn xóa?', 'wait', 'OK / Cancel')); } },
    { t: 'Chuyển sang alert', what: 'switchTo().alert().', why: 'Cần đối tượng để thao tác.', how: 'Driver lấy alert.', impact: 'alert trỏ tới confirm.', line: 1, st: 'run', fx: function (s) { F(s, 'dlg').c = 'hl'; s.vars.alert = 'Alert#2'; } },
    { t: 'dismiss() bấm Cancel', what: 'Hủy thao tác xóa.', why: 'Kiểm tra nhánh "không xóa".', how: 'Driver bấm Cancel; confirm trả về false cho trang.', impact: 'Confirm đóng; đơn không bị xóa.', line: 2, st: 'ok', fx: function (s) { s.dom = [E('del', 'button#delete', 'Xóa đơn hàng', ''), E('order', 'div#order', 'Đơn 88 — còn tồn tại', 'ok')]; s.vars.result = 'đơn còn tồn tại'; } },
    { t: 'Xác nhận đơn còn', what: 'Kiểm tra order hiển thị.', why: 'Điều kiện nghiệp vụ: Cancel phải giữ dữ liệu.', how: 'Kiểm tra phần tử.', impact: 'Test pass đúng nhánh.', line: 3, st: 'ok', fx: function (s) { s.vars.assert = 'đơn 88 còn ✓'; } }
  ],
  takeaway: 'accept = OK, dismiss = Cancel. Hãy chọn đúng nhánh theo kịch bản cần kiểm thử.' });

SIMS.push({ id: 'L12-M2', lesson: 12, level: 'Trung bình', title: 'Prompt: nhập chữ rồi OK',
  scen: 'Bấm "Chào" hiện prompt "Tên bạn là gì?". Test nhập "Minh" rồi bấm OK và kiểm tra lời chào.',
  code: ['driver.findElement(By.id("greet")).click();', 'Alert prompt = driver.switchTo().alert();', 'prompt.sendKeys("Minh");', 'prompt.accept();'],
  init: { browser: { url: 'https://shop.example.com/demo', title: 'Demo', ctx: 'main', tabs: null }, dom: [E('g', 'button#greet', 'Chào', ''), E('out', 'p#out', '', '')], vars: {}, clock: null },
  steps: [
    { t: 'Bấm Chào', what: 'Mở prompt.', why: 'Prompt yêu cầu nhập tên.', how: 'Trang hiện hộp thoại có ô nhập.', impact: 'Prompt đang mở.', line: 0, st: 'run', fx: function (s) { F(s, 'g').c = 'ok'; s.dom.push(E('dlg', 'dialog (prompt)', 'Tên bạn là gì? [ ____ ]', 'wait')); } },
    { t: 'switchTo().alert()', what: 'Chuyển sang prompt.', why: 'Cần thao tác với ô nhập.', how: 'Driver lấy Alert.', impact: 'Prompt được chọn.', line: 1, st: 'run', fx: function (s) { F(s, 'dlg').c = 'hl'; s.vars.alert = 'Alert#3 (prompt)'; } },
    { t: 'sendKeys("Minh")', what: 'Gõ tên vào ô của prompt.', why: 'Nhập dữ liệu test.', how: 'Driver gõ vào hộp thoại.', impact: 'Ô prompt chứa "Minh".', line: 2, st: 'ok', fx: function (s) { F(s, 'dlg').label = 'Tên bạn là gì? [ Minh ]'; } },
    { t: 'accept() và kiểm tra kết quả', what: 'Bấm OK; trang nhận giá trị và hiển thị lời chào.', why: 'Kiểm tra luồng dữ liệu từ prompt sang trang.', how: 'Trang xử lý giá trị; #out được cập nhật.', impact: 'Hiển thị: "Xin chào, Minh!"', line: 3, st: 'ok', fx: function (s) { s.dom = [E('g', 'button#greet', 'Chào', ''), E('out', 'p#out', 'Xin chào, Minh!', 'ok')]; s.vars.alert = 'đã accept("Minh")'; } }
  ],
  takeaway: 'Prompt cần sendKeys trước khi accept. Nếu bỏ sendKeys, giá trị nhập sẽ là rỗng.' });

/* ---------- Bài 13: iFrame ---------- */
SIMS.push({ id: 'L13-E', lesson: 13, level: 'Dễ', title: 'Vào iframe thanh toán để nhập thẻ',
  scen: 'Ô số thẻ nằm trong iframe "payment-frame". Tìm trực tiếp sẽ không thấy; cần chuyển vào frame.',
  code: ['driver.switchTo().frame("payment-frame");', 'driver.findElement(By.id("card")).sendKeys("4111111111111111");'],
  init: { browser: { url: 'https://shop.example.com/pay', title: 'Thanh toán', ctx: 'main', tabs: null }, dom: [E('pf', 'iframe#payment-frame', 'Khung thanh toán (iframe)', ''), E('card', 'input#card', 'Số thẻ', 'off', 'chỉ thấy trong frame')], vars: {}, clock: null },
  predict: { q: 'Khi driver đang ở main document, findElement(By.id("card")) có tìm được ô trong iframe không?', opts: ['Có', 'Không, phải switchTo().frame trước', 'Có nếu dùng By.xpath', 'Có vì Selenium tự chuyển'], ans: 1, why: 'Mỗi iframe là một ngữ cảnh riêng; driver chỉ thấy DOM của ngữ cảnh đang chọn.' },
  steps: [
    { t: 'Tìm ô thẻ ở main document', what: 'findElement(By.id("card")) khi chưa vào frame.', why: 'Đây là lỗi phổ biến.', how: 'Driver chỉ tìm trong main document.', impact: 'NoSuchElementException.', line: 1, st: 'err', fx: function (s) { s.exc = 'NoSuchElementException: không tìm thấy #card trong ngữ cảnh main'; } },
    { t: 'switchTo().frame("payment-frame")', what: 'Chuyển ngữ cảnh vào iframe.', why: 'Đưa driver vào trang con.', how: 'Driver chuyển context sang document của iframe.', impact: 'Ngữ cảnh: payment-frame.', line: 0, st: 'run', fx: function (s) { s.exc = null; s.browser.ctx = 'payment-frame'; F(s, 'pf').c = 'hl'; } },
    { t: 'Tìm lại ô thẻ', what: 'findElement trong frame.', why: 'Bây giờ phần tử nằm trong ngữ cảnh hiện tại.', how: 'Driver tìm trong document của frame.', impact: 'Tìm thấy #card.', line: 1, st: 'ok', fx: function (s) { F(s, 'card').c = 'ok'; F(s, 'card').hint = 'tìm thấy trong frame'; } },
    { t: 'Nhập số thẻ', what: 'sendKeys(...).', why: 'Điền dữ liệu test.', how: 'Gõ vào phần tử trong frame.', impact: 'Ô thẻ có giá trị.', line: 1, st: 'ok', fx: function (s) { F(s, 'card').label = '4111 •••• •••• ••••'; } }
  ],
  takeaway: 'Thấy trên màn hình không có nghĩa là Selenium tìm được. Nếu phần tử nằm trong iframe, hãy switchTo().frame() trước.' });

SIMS.push({ id: 'L13-M1', lesson: 13, level: 'Trung bình', title: 'Quay về trang chính sau khi làm việc trong frame',
  scen: 'Đã nhập thẻ trong iframe. Bây giờ cần bấm nút "Đặt hàng" nằm ở trang chính.',
  code: ['driver.switchTo().frame("payment-frame");', 'driver.findElement(By.id("card")).sendKeys("4111...");', 'driver.switchTo().defaultContent();', 'driver.findElement(By.id("place-order")).click();'],
  init: { browser: { url: 'https://shop.example.com/pay', title: 'Thanh toán', ctx: 'payment-frame', tabs: null }, dom: [E('card', 'input#card (trong frame)', 'Số thẻ', 'ok'), E('order', 'button#place-order (main)', 'Đặt hàng', 'off', 'không thấy trong frame')], vars: {}, clock: null },
  steps: [
    { t: 'Đang ở trong frame', what: 'Ngữ cảnh hiện tại là payment-frame.', why: 'Nút Đặt hàng không nằm trong frame này.', how: 'Driver chỉ thấy DOM của frame.', impact: 'Nút Đặt hàng không tìm thấy từ đây.', line: 1, st: 'wait', fx: function (s) { s.vars.context = 'payment-frame'; } },
    { t: 'Thử tìm nút ở frame', what: 'findElement(By.id("place-order")).', why: 'Mô phỏng lỗi thường gặp.', how: 'Không có trong frame.', impact: 'NoSuchElementException.', line: 3, st: 'err', fx: function (s) { s.exc = 'NoSuchElementException: #place-order không có trong frame hiện tại'; } },
    { t: 'defaultContent(): về trang chính', what: 'Thoát mọi frame, về document gốc.', why: 'Cần quay về ngữ cảnh chứa nút đặt hàng.', how: 'Driver đặt context về main document.', impact: 'Ngữ cảnh: main.', line: 2, st: 'run', fx: function (s) { s.exc = null; s.browser.ctx = 'main'; F(s, 'order').label = 'Đặt hàng'; F(s, 'order').c = 'hl'; F(s, 'order').hint = 'đã thấy (main)'; s.vars.context = 'main'; } },
    { t: 'Bấm Đặt hàng', what: 'click() trên nút trong main.', why: 'Hoàn tất thanh toán.', how: 'Trình duyệt bấm nút.', impact: 'Đơn hàng được đặt.', line: 3, st: 'ok', fx: function (s) { F(s, 'order').c = 'ok'; s.browser.url = '/order/confirmed'; } }
  ],
  takeaway: 'defaultContent() trở về trang chính; parentFrame() lên một cấp. Quên bước này là nguyên nhân phổ biến của NoSuchElementException.' });

SIMS.push({ id: 'L13-M2', lesson: 13, level: 'Trung bình', title: 'Frame lồng nhau: đi từng cấp',
  scen: 'Trong trang có iframe "outer" chứa iframe "inner". Ô nhập nằm trong "inner".',
  code: ['driver.switchTo().frame("outer");', 'driver.switchTo().frame("inner");', 'driver.findElement(By.id("note")).sendKeys("Ghi chú");', 'driver.switchTo().parentFrame(); // lên outer', 'driver.switchTo().defaultContent();'],
  init: { browser: { url: 'https://shop.example.com/editor', title: 'Editor', ctx: 'main', tabs: null }, dom: [E('note', 'textarea#note', 'Ghi chú (nằm trong inner)', 'off')], vars: {}, clock: null },
  steps: [
    { t: 'Vào frame "outer"', what: 'switchTo().frame("outer").', why: 'Inner nằm trong outer, phải vào outer trước.', how: 'Driver chuyển context lên outer.', impact: 'Ngữ cảnh: outer.', line: 0, st: 'run', fx: function (s) { s.browser.ctx = 'outer'; } },
    { t: 'Vào frame "inner"', what: 'switchTo().frame("inner") bên trong outer.', why: 'Ô ghi chú ở trong inner.', how: 'Driver đi xuống một cấp.', impact: 'Ngữ cảnh: outer > inner.', line: 1, st: 'run', fx: function (s) { s.browser.ctx = 'outer > inner'; } },
    { t: 'Nhập ghi chú', what: 'findElement + sendKeys trong inner.', why: 'Đúng ngữ cảnh chứa phần tử.', how: 'Gõ vào textarea.', impact: 'Ghi chú đã nhập.', line: 2, st: 'ok', fx: function (s) { F(s, 'note').c = 'ok'; F(s, 'note').label = 'Ghi chú: "Ghi chú"'; } },
    { t: 'parentFrame(): lên outer', what: 'Lên một cấp.', why: 'Muốn thao tác phần tử ở outer.', how: 'Driver đi lên một tầng.', impact: 'Ngữ cảnh: outer.', line: 3, st: 'run', fx: function (s) { s.browser.ctx = 'outer'; } },
    { t: 'defaultContent(): về trang chính', what: 'Thoát hết mọi frame.', why: 'Kết thúc việc trong frame.', how: 'Driver về main document.', impact: 'Ngữ cảnh: main.', line: 4, st: 'ok', fx: function (s) { s.browser.ctx = 'main'; } }
  ],
  takeaway: 'Frame lồng nhau phải đi từng cấp: vào outer → vào inner. Đi lên dùng parentFrame(), về gốc dùng defaultContent().' });

/* ---------- Bài 14: Windows & Tabs ---------- */
SIMS.push({ id: 'L14-E', lesson: 14, level: 'Dễ', title: 'Link mở tab mới',
  scen: 'Bấm link "Điều khoản" mở tab mới. Test cần biết đã có 2 tab.',
  code: ['String main = driver.getWindowHandle();', 'driver.findElement(By.linkText("Điều khoản")).click();', 'Set<String> all = driver.getWindowHandles();  // 2 handle'],
  init: { browser: { url: 'https://shop.example.com', title: 'Shop', ctx: 'main', tabs: [{ title: 'Shop', active: true }] }, dom: [E('l', 'a', 'Điều khoản', '')], vars: { handles: 1 }, clock: null },
  steps: [
    { t: 'Lưu handle của tab gốc', what: 'getWindowHandle().', why: 'Cần nhớ tab gốc để quay lại.', how: 'Driver trả về mã của cửa sổ đang chọn.', impact: 'main = "H-main".', line: 0, st: 'ok', fx: function (s) { s.vars.main = 'H-main'; } },
    { t: 'Click link mở tab mới', what: 'Link có target="_blank".', why: 'Tình huống phổ biến.', how: 'Trình duyệt mở tab mới.', impact: 'Có 2 tab.', line: 1, st: 'run', fx: function (s) { s.browser.tabs = [{ title: 'Shop', active: true }, { title: 'Điều khoản', active: false }]; } },
    { t: 'Lấy danh sách handle', what: 'getWindowHandles() trả về tập 2 handle.', why: 'Biết có tab mới.', how: 'Driver liệt kê mọi cửa sổ.', impact: 'handles = 2.', line: 2, st: 'ok', fx: function (s) { s.vars.handles = 2; s.vars.all = ['H-main', 'H-new']; } }
  ],
  takeaway: 'getWindowHandles() trả về tập hợp; không giả định thứ tự. So sánh với handle đã lưu để tìm tab mới.' });

SIMS.push({ id: 'L14-M1', lesson: 14, level: 'Trung bình', title: 'Chuyển sang tab mới theo handle',
  scen: 'Sau khi mở tab "Điều khoản", test đọc tiêu đề của tab đó rồi quay lại tab gốc.',
  code: ['String main = driver.getWindowHandle();', 'for (String h : driver.getWindowHandles()) {', '    if (!h.equals(main)) driver.switchTo().window(h);', '}', 'String newTitle = driver.getTitle();', 'driver.switchTo().window(main);'],
  init: { browser: { url: 'https://shop.example.com', title: 'Shop', ctx: 'main', tabs: [{ title: 'Shop', active: true }, { title: 'Điều khoản', active: false }] }, dom: [], vars: { main: 'H-main', current: 'H-main' }, clock: null },
  steps: [
    { t: 'Đang ở tab gốc', what: 'Driver điều khiển H-main.', why: 'Trạng thái bắt đầu.', how: 'Ngữ cảnh là tab gốc.', impact: 'current = H-main.', line: 0, st: 'ok', fx: function (s) { s.vars.current = 'H-main'; } },
    { t: 'Duyệt handle', what: 'Với mỗi handle, so sánh với handle gốc.', why: 'Tìm handle của tab mới một cách an toàn.', how: 'Vòng lặp trên tập handle.', impact: 'H-new khác H-main → chọn.', line: 2, st: 'run', fx: function (s) { s.vars.candidate = 'H-new'; } },
    { t: 'switchTo().window(H-new)', what: 'Chuyển điều khiển sang tab Điều khoản.', why: 'Từ đây lệnh sẽ tác động tới tab mới.', how: 'Driver đổi cửa sổ đang chọn.', impact: 'Ngữ cảnh: tab Điều khoản.', line: 2, st: 'ok', fx: function (s) { s.vars.current = 'H-new'; s.browser.tabs[0].active = false; s.browser.tabs[1].active = true; s.browser.title = 'Điều khoản'; s.browser.url = '/terms'; } },
    { t: 'getTitle() ở tab mới', what: 'Đọc tiêu đề tab hiện tại.', why: 'Kiểm tra đúng trang.', how: 'Lấy title của cửa sổ đang chọn.', impact: 'newTitle = "Điều khoản".', line: 4, st: 'ok', fx: function (s) { s.vars.newTitle = 'Điều khoản'; } },
    { t: 'Quay lại tab gốc', what: 'switchTo().window(main).', why: 'Tiếp tục kịch bản trên trang chính.', how: 'Driver đổi về H-main.', impact: 'current = H-main.', line: 5, st: 'ok', fx: function (s) { s.vars.current = 'H-main'; s.browser.tabs[0].active = true; s.browser.tabs[1].active = false; s.browser.title = 'Shop'; s.browser.url = 'https://shop.example.com'; } }
  ],
  takeaway: 'Lưu handle trước khi mở tab mới. Luôn chuyển đúng handle trước mỗi thao tác.' });

SIMS.push({ id: 'L14-M2', lesson: 14, level: 'Trung bình', title: 'Đóng tab mới rồi quên quay về: lỗi thường gặp',
  scen: 'Test đóng tab Điều khoản nhưng quên switchTo về tab gốc, rồi tiếp tục tìm phần tử.',
  code: ['driver.close();  // đóng tab hiện tại (đang là tab mới)', 'driver.findElement(By.id("checkout")).click(); // lỗi: không còn tab đang chọn hợp lệ', '// Sửa: driver.switchTo().window(main);'],
  init: { browser: { url: 'https://shop.example.com', title: 'Shop', ctx: 'main', tabs: [{ title: 'Shop', active: false }, { title: 'Điều khoản', active: true }] }, dom: [E('co', 'button#checkout', 'Thanh toán', '')], vars: { current: 'H-new', main: 'H-main' }, clock: null },
  steps: [
    { t: 'Đóng tab Điều khoản', what: 'close() đóng cửa sổ hiện tại (tab mới).', why: 'Dọn tab không cần.', how: 'Trình duyệt đóng tab; session vẫn chạy.', impact: 'Còn 1 tab (Shop).', line: 0, st: 'run', fx: function (s) { s.browser.tabs = [{ title: 'Shop', active: false }]; s.vars.current = 'H-new (đã đóng)'; } },
    { t: 'Quên switchTo về tab gốc', what: 'Driver vẫn trỏ tới handle đã đóng.', why: 'Đây là lỗi phổ biến nhất khi làm việc với nhiều tab.', how: 'Lệnh tiếp theo dùng ngữ cảnh không còn tồn tại.', impact: 'Lệnh tìm phần tử thất bại (NoSuchWindow/lỗi cửa sổ).', line: 1, st: 'err', fx: function (s) { s.exc = 'NoSuchWindowException: cửa sổ đang chọn không còn tồn tại'; s.vars.current = 'H-new (đã đóng)'; } },
    { t: 'Sửa: switchTo().window(main)', what: 'Chuyển về handle còn mở.', why: 'Phải chọn một cửa sổ đang tồn tại.', how: 'Driver đổi về H-main.', impact: 'Ngữ cảnh: tab Shop.', line: 2, st: 'run', fx: function (s) { s.exc = null; s.vars.current = 'H-main'; s.browser.tabs[0].active = true; } },
    { t: 'Tìm và bấm Thanh toán lại', what: 'Thao tác bình thường.', why: 'Kịch bản tiếp tục đúng.', how: 'Driver điều khiển tab Shop.', impact: 'Chuyển sang trang thanh toán.', line: 1, st: 'ok', fx: function (s) { s.browser.url = '/checkout'; s.browser.title = 'Thanh toán'; } }
  ],
  takeaway: 'Sau khi đóng một cửa sổ, luôn switchTo() về cửa sổ còn mở. Driver không tự quay về.' });

/* ---------- Bài 15: Actions ---------- */
SIMS.push({ id: 'L15-E', lesson: 15, level: 'Dễ', title: 'Di chuột (hover) để mở menu',
  scen: 'Menu "Danh mục" chỉ hiện submenu khi di chuột vào. Dùng Actions.moveToElement().',
  code: ['Actions actions = new Actions(driver);', 'WebElement menu = driver.findElement(By.id("menu"));', 'actions.moveToElement(menu).perform();', 'driver.findElement(By.linkText("Áo")).click();'],
  init: { browser: { url: 'https://shop.example.com', title: 'Shop', ctx: 'main', tabs: null }, dom: [E('menu', 'li#menu', 'Danh mục ▾', ''), E('sub', 'ul (submenu ẩn)', 'Áo · Quần · Giày', 'gone')], vars: {}, clock: null },
  steps: [
    { t: 'Tạo Actions', what: 'new Actions(driver).', why: 'Chuỗi thao tác chuột/phím.', how: 'Driver khởi tạo builder.', impact: 'Sẵn sàng ghép hành động.', line: 0, st: 'ok', fx: function (s) { s.vars.actions = 'Actions(builder)'; } },
    { t: 'Tìm menu', what: 'findElement(By.id("menu")).', why: 'Biết phần tử để di chuột vào.', how: 'Tìm phần tử.', impact: 'Menu được chọn.', line: 1, st: 'run', fx: function (s) { F(s, 'menu').c = 'hl'; } },
    { t: 'moveToElement(menu).perform()', what: 'Di chuột vào menu.', why: 'Kích hoạt sự kiện hover để submenu hiện.', how: 'Driver gửi chuyển động chuột tới phần tử; perform chạy chuỗi.', impact: 'Submenu hiện ra.', line: 2, st: 'ok', fx: function (s) { F(s, 'sub').c = 'ok'; F(s, 'sub').label = 'Áo · Quần · Giày (đang hiện)'; } },
    { t: 'Click "Áo"', what: 'Chọn mục trong submenu.', why: 'Tiếp tục luồng.', how: 'Click phần tử đã hiện.', impact: 'Chuyển sang danh mục Áo.', line: 3, st: 'ok', fx: function (s) { s.browser.url = '/category/ao'; s.browser.title = 'Áo'; } }
  ],
  takeaway: 'Actions gom chuỗi thao tác; hover cần perform() để thực thi và submenu chỉ hiện khi chuột ở đó.' });

SIMS.push({ id: 'L15-M1', lesson: 15, level: 'Trung bình', title: 'Kéo thả sản phẩm vào giỏ',
  scen: 'Kéo sản phẩm "Áo khoác" từ danh sách vào vùng giỏ hàng. Giỏ hàng phải tăng số lượng.',
  code: ['WebElement src = driver.findElement(By.id("item-ao"));', 'WebElement dst = driver.findElement(By.id("cart-drop"));', 'new Actions(driver).dragAndDrop(src, dst).perform();'],
  init: { browser: { url: 'https://shop.example.com/products', title: 'Sản phẩm', ctx: 'main', tabs: null }, dom: [E('item', 'div#item-ao', 'Áo khoác', ''), E('cart', 'div#cart-drop', 'Giỏ: 0', '')], vars: { cartCount: 0 }, clock: null },
  steps: [
    { t: 'Tìm nguồn và đích', what: 'src = sản phẩm, dst = vùng giỏ.', why: 'Actions cần hai tham chiếu.', how: 'Tìm hai phần tử.', impact: 'Đã có src và dst.', line: 0, st: 'run', fx: function (s) { F(s, 'item').c = 'hl'; } },
    { t: 'Nhấn giữ chuột ở nguồn', what: 'Bắt đầu kéo.', why: 'Mô phỏng người dùng giữ chuột.', how: 'Chuột xuống tại src.', impact: 'Sản phẩm đang được kéo.', line: 2, st: 'run', fx: function (s) { F(s, 'item').c = 'wait'; F(s, 'item').hint = 'đang kéo'; } },
    { t: 'Di chuyển tới đích và nhả', what: 'Thả tại dst.', why: 'Hoàn tất thao tác kéo thả.', how: 'Chuột di chuyển rồi nhả tại dst.', impact: 'Ứng dụng nhận sự kiện drop.', line: 2, st: 'ok', fx: function (s) { F(s, 'item').c = 'ok'; F(s, 'cart').c = 'ok'; F(s, 'cart').label = 'Giỏ: 1'; } },
    { t: 'Kiểm tra số lượng giỏ', what: 'Giỏ tăng từ 0 lên 1.', why: 'Kết quả nghiệp vụ.', how: 'Đọc giá trị giỏ.', impact: 'cartCount = 1.', line: 2, st: 'ok', fx: function (s) { s.vars.cartCount = 1; } }
  ],
  takeaway: 'Kéo thả là chuỗi: giữ chuột → di chuyển → nhả. Actions.dragAndDrop gói sẵn chuỗi này, nhưng ứng dụng vẫn phải hỗ trợ sự kiện kéo thả.' });

SIMS.push({ id: 'L15-M2', lesson: 15, level: 'Trung bình', title: 'Tổ hợp phím Ctrl+A để chọn toàn bộ ô nhập',
  scen: 'Ô ghi chú đã có chữ. Test muốn chọn toàn bộ bằng Ctrl+A rồi gõ đè nội dung mới.',
  code: ['WebElement note = driver.findElement(By.id("note"));', 'note.click();', 'new Actions(driver).keyDown(Keys.CONTROL).sendKeys("a").keyUp(Keys.CONTROL).sendKeys("Nội dung mới").perform();'],
  init: { browser: { url: 'https://shop.example.com/note', title: 'Ghi chú', ctx: 'main', tabs: null }, dom: [E('note', 'textarea#note', 'Nội dung cũ', '')], vars: { selection: 'none' }, clock: null },
  steps: [
    { t: 'Tìm và click ô ghi chú', what: 'Ô nhận focus.', why: 'Tổ hợp phím gửi vào phần tử đang có focus.', how: 'click() đặt con trỏ trong ô.', impact: 'Ô đang focus.', line: 1, st: 'ok', fx: function (s) { F(s, 'note').c = 'hl'; } },
    { t: 'Giữ Ctrl', what: 'keyDown(Keys.CONTROL).', why: 'Phím bổ trợ phải giữ trong khi gõ phím khác.', how: 'Gửi sự kiện nhấn giữ Ctrl.', impact: 'Ctrl đang được giữ.', line: 2, st: 'run', fx: function (s) { s.vars.modifier = 'CTRL (giữ)'; } },
    { t: 'Gõ a rồi nhả Ctrl', what: 'sendKeys("a") trong khi giữ Ctrl → chọn tất cả.', why: 'Đây là tổ hợp Ctrl+A.', how: 'Trình duyệt nhận Ctrl+A và chọn toàn bộ văn bản.', impact: 'Toàn bộ nội dung được bôi đen.', line: 2, st: 'ok', fx: function (s) { s.vars.modifier = 'none'; s.vars.selection = 'toàn bộ'; F(s, 'note').hint = 'đã chọn tất cả'; } },
    { t: 'Gõ nội dung mới', what: 'sendKeys("Nội dung mới") đè lên phần đã chọn.', why: 'Thay toàn bộ nội dung.', how: 'Văn bản được thay thế.', impact: 'Ô ghi chú: "Nội dung mới".', line: 2, st: 'ok', fx: function (s) { F(s, 'note').label = 'Nội dung mới'; F(s, 'note').c = 'ok'; } }
  ],
  takeaway: 'Với tổ hợp phím, dùng keyDown để giữ phím bổ trợ, sendKeys cho phím thường, rồi keyUp để nhả.' });

/* ---------- Bài 16: Exceptions ---------- */
SIMS.push({ id: 'L16-E', lesson: 16, level: 'Dễ', title: 'NoSuchElementException do locator sai',
  scen: 'Locator viết sai id "submit-btn" thành "submitBtn". Trang có id đúng là "submit-btn".',
  code: ['driver.findElement(By.id("submitBtn")).click(); // sai tên id'],
  init: { browser: { url: 'https://shop.example.com/form', title: 'Biểu mẫu', ctx: 'main', tabs: null }, dom: [E('sb', 'button#submit-btn', 'Gửi', '')], vars: {}, clock: null },
  steps: [
    { t: 'Gửi lệnh findElement(By.id("submitBtn"))', what: 'Tìm id "submitBtn".', why: 'Lệnh được thực thi như đã viết.', how: 'Trình duyệt so khớp chính xác (phân biệt hoa thường).', impact: 'Không khớp phần tử nào.', line: 0, st: 'run', fx: function (s) { s.vars.searching = 'submitBtn'; } },
    { t: 'Ném NoSuchElementException', what: 'Không tìm thấy sau khi hết wait.', why: 'Driver báo lỗi cho test.', how: 'Ngoại lệ được ném.', impact: 'Test fail tại dòng này.', line: 0, st: 'err', fx: function (s) { s.exc = 'NoSuchElementException: no such element: {"method":"id","selector":"submitBtn"}'; } },
    { t: 'Đọc lại locator trong code', what: 'So với id thật trên DOM: "submit-btn".', why: 'Lỗi do chính locator, không phải ứng dụng.', how: 'So sánh chuỗi.', impact: 'Phát hiện chữ "B" và dấu "-" không khớp.', line: 0, st: 'wait', fx: function (s) { s.vars.actualId = 'submit-btn'; } },
    { t: 'Sửa locator', what: 'Đổi thành By.id("submit-btn").', why: 'Khớp id thật.', how: 'Chạy lại.', impact: 'Tìm thấy nút và bấm được.', line: 0, st: 'ok', fx: function (s) { s.exc = null; F(s, 'sb').c = 'ok'; s.vars.searching = 'submit-btn'; } }
  ],
  takeaway: 'NoSuchElementException không luôn là lỗi ứng dụng. Kiểm tra locator trước.' });

SIMS.push({ id: 'L16-M1', lesson: 16, level: 'Trung bình', title: 'StaleElementReferenceException: DOM đã thay mới',
  scen: 'Test lấy tham chiếu tới một dòng trong bảng. Sau khi trang render lại, dòng cũ không còn trong DOM nữa.',
  code: ['WebElement row = driver.findElement(By.cssSelector("tr.item"));', 'driver.navigate().refresh();   // DOM được render lại', 'row.getText();  // StaleElementReferenceException', 'row = driver.findElement(By.cssSelector("tr.item")); // tìm lại'],
  init: { browser: { url: 'https://shop.example.com/list', title: 'Danh sách', ctx: 'main', tabs: null }, dom: [E('r', 'tr.item (v1)', 'Sản phẩm A', '')], vars: { row: null }, clock: null },
  predict: { q: 'Sau khi trang render lại, tham chiếu row cũ còn dùng được không?', opts: ['Có, vẫn là cùng phần tử', 'Không, phải tìm lại vì phần tử cũ đã bị gỡ khỏi DOM', 'Có, nếu dùng getAttribute', 'Chỉ lỗi nếu dùng click'], ans: 1, why: 'Tham chiếu gắn với nút DOM cũ. Khi trang render lại, nút đó không còn; tham chiếu thành stale.' },
  steps: [
    { t: 'Lấy tham chiếu row', what: 'findElement tìm tr.item.', why: 'Lưu để dùng sau.', how: 'Driver lưu một mã tham chiếu tới phần tử v1.', impact: 'row → phần tử v1.', line: 0, st: 'ok', fx: function (s) { F(s, 'r').c = 'hl'; s.vars.row = 'ref → v1'; } },
    { t: 'Trang được render lại', what: 'Refresh tạo DOM mới: phần tử v2.', why: 'Đây là tình huống thường gặp với SPA/bảng động.', how: 'Trình duyệt gỡ v1 và chèn v2.', impact: 'v1 không còn trong DOM.', line: 1, st: 'wait', fx: function (s) { F(s, 'r').tag = 'tr.item (v1 đã gỡ)'; F(s, 'r').c = 'stale'; F(s, 'r').label = 'Sản phẩm A (cũ)'; s.dom.push(E('r2', 'tr.item (v2)', 'Sản phẩm A (mới)', 'ok')); s.vars.row = 'ref → v1 (đã gỡ)'; } },
    { t: 'row.getText()', what: 'Dùng tham chiếu cũ.', why: 'Đây là lỗi.', how: 'Driver không tìm thấy phần tử v1 đã gắn vào DOM.', impact: 'StaleElementReferenceException.', line: 2, st: 'err', fx: function (s) { s.exc = 'StaleElementReferenceException: element is not attached to the page document'; } },
    { t: 'Tìm lại phần tử', what: 'findElement lần nữa để lấy v2.', why: 'Tham chiếu mới trỏ vào DOM hiện tại.', how: 'Driver tìm và trả về tham chiếu mới.', impact: 'row → v2; lỗi biến mất.', line: 3, st: 'ok', fx: function (s) { s.exc = null; s.vars.row = 'ref → v2'; F(s, 'r2').c = 'ok'; } }
  ],
  takeaway: 'Stale nghĩa là tham chiếu cũ. Khi DOM thay đổi (refresh, AJAX, render lại), hãy tìm lại phần tử.' });

SIMS.push({ id: 'L16-M2', lesson: 16, level: 'Trung bình', title: 'ElementClickInterceptedException: lớp phủ che nút',
  scen: 'Một lớp thông báo (overlay) đang phủ lên nút "Mua ngay". Click bị chặn.',
  code: ['driver.findElement(By.id("buy")).click();  // bị chặn bởi overlay', '// Sửa: chờ overlay biến mất rồi click'],
  init: { browser: { url: 'https://shop.example.com/product/9', title: 'Sản phẩm 9', ctx: 'main', tabs: null }, dom: [E('buy', 'button#buy', 'Mua ngay', ''), E('ov', 'div.overlay (cookie)', 'Chấp nhận cookie', 'hl')], vars: {}, clock: null },
  predict: { q: 'Nút "Mua ngay" đang hiển thị và enabled nhưng bị overlay phủ. click() sẽ thế nào?', opts: ['Vẫn bấm được', 'Ném ElementClickInterceptedException', 'Trả về false', 'Bấm vào overlay mà không báo lỗi'], ans: 1, why: 'WebDriver kiểm tra phần tử đích có bị phần tử khác che tại điểm bấm không; nếu có, ném ElementClickInterceptedException.' },
  steps: [
    { t: 'Chuẩn bị bấm Mua ngay', what: 'Phần tử hiển thị, enabled.', why: 'Các điều kiện cơ bản đều đúng.', how: 'Driver chuẩn bị click.', impact: 'Nút sẵn sàng về mặt thuộc tính.', line: 0, st: 'run', fx: function (s) { F(s, 'buy').c = 'hl'; } },
    { t: 'Phát hiện lớp phủ tại điểm bấm', what: 'Điểm trung tâm nút bị overlay che.', why: 'Click sẽ rơi vào overlay chứ không vào nút.', how: 'Driver kiểm tra phần tử ở điểm click.', impact: 'Click bị chặn.', line: 0, st: 'err', fx: function (s) { F(s, 'buy').c = 'err'; s.exc = 'ElementClickInterceptedException: Element is not clickable at point (…). Other element would receive the click: div.overlay'; } },
    { t: 'Chờ overlay biến mất', what: 'Chờ điều kiện overlay không còn hiển thị.', why: 'Cách sạch hơn là chờ thay vì sleep.', how: 'WebDriverWait với invisibilityOfElementLocated.', impact: 'Overlay đã biến mất.', line: 1, st: 'wait', fx: function (s) { s.exc = null; F(s, 'ov').c = 'off gone'; F(s, 'ov').label = '(đã ẩn)'; } },
    { t: 'Click lại', what: 'Bấm Mua ngay.', why: 'Lớp che đã đi.', how: 'Click tại điểm đúng.', impact: 'Đặt mua thành công.', line: 0, st: 'ok', fx: function (s) { F(s, 'buy').c = 'ok'; s.browser.url = '/cart'; } }
  ],
  takeaway: 'Intercepted = có phần tử khác đang nhận click. Chờ lớp phủ biến mất hoặc đóng nó; đừng dùng JavaScript click để che lỗi.' });

/* ---------- Bài 17: TestNG lifecycle ---------- */
SIMS.push({ id: 'L17-E', lesson: 17, level: 'Dễ', title: 'Vòng đời của một test duy nhất',
  scen: 'Class LoginTest có một @Test. Quan sát thứ tự các annotation chạy.',
  code: ['@BeforeClass  openBrowser()', '@BeforeMethod goToLogin()', '@Test       validLogin()', '@AfterMethod  takeShot()', '@AfterClass  closeBrowser()'],
  init: { nodes: [{ label: '@BeforeClass', sub: 'mở browser', st: '' }, { label: '@BeforeMethod', sub: 'vào trang login', st: '' }, { label: '@Test', sub: 'validLogin', st: '' }, { label: '@AfterMethod', sub: 'chụp ảnh nếu lỗi', st: '' }, { label: '@AfterClass', sub: 'quit()', st: '' }], browser: null, dom: null, vars: {}, clock: null },
  steps: [
    { t: '@BeforeClass chạy', what: 'Mở browser một lần cho class.', why: 'Tốn thời gian nên chỉ làm một lần.', how: 'TestNG gọi method đánh dấu @BeforeClass.', impact: 'Browser đã sẵn sàng.', line: 0, st: 'ok', fx: function (s) { s.nodes[0].st = 'done'; } },
    { t: '@BeforeMethod chạy', what: 'Đưa trang về trạng thái bắt đầu.', why: 'Mỗi test cần một điểm xuất phát giống nhau.', how: 'Trước mỗi @Test, TestNG gọi method này.', impact: 'Trang login đã mở.', line: 1, st: 'ok', fx: function (s) { s.nodes[1].st = 'done'; } },
    { t: '@Test chạy', what: 'Thực thi kịch bản đăng nhập.', why: 'Đây là phần kiểm thử chính.', how: 'TestNG gọi method test.', impact: 'Test pass.', line: 2, st: 'ok', fx: function (s) { s.nodes[2].st = 'done'; s.vars.result = 'PASSED'; } },
    { t: '@AfterMethod chạy', what: 'Dọn dẹp sau mỗi test.', why: 'Chạy dù pass hay fail.', how: 'TestNG gọi sau test.', impact: 'Đã chụp ảnh (nếu cần).', line: 3, st: 'ok', fx: function (s) { s.nodes[3].st = 'done'; } },
    { t: '@AfterClass chạy', what: 'Đóng browser khi class kết thúc.', why: 'Giải phóng tài nguyên.', how: 'quit() được gọi.', impact: 'Browser đã đóng.', line: 4, st: 'ok', fx: function (s) { s.nodes[4].st = 'done'; s.vars.session = 'ended'; } }
  ],
  takeaway: 'Thứ tự: BeforeClass → BeforeMethod → Test → AfterMethod → AfterClass. Đặt công việc tốn thời gian ở mức phù hợp.' });

SIMS.push({ id: 'L17-M1', lesson: 17, level: 'Trung bình', title: 'Nhiều test method: BeforeMethod chạy lặp lại',
  scen: 'Class có hai @Test. BeforeClass chạy một lần; BeforeMethod và AfterMethod chạy cho từng test.',
  code: ['@BeforeClass  openBrowser()      // 1 lần', '@BeforeMethod goToLogin()        // mỗi @Test', '@Test       validLogin()', '@AfterMethod  takeShot()          // mỗi @Test', '@Test       invalidLogin()', '@AfterClass  closeBrowser()     // 1 lần'],
  init: { nodes: [{ label: '@BeforeClass', sub: '1 lần', st: '' }, { label: '@BeforeMethod', sub: 'mỗi test', st: '' }, { label: '@Test 1', sub: 'validLogin', st: '' }, { label: '@AfterMethod', sub: 'mỗi test', st: '' }, { label: '@Test 2', sub: 'invalidLogin', st: '' }, { label: '@AfterClass', sub: '1 lần', st: '' }], browser: null, dom: null, vars: { runs: 0 }, clock: null },
  steps: [
    { t: 'BeforeClass (1 lần)', what: 'Mở browser cho cả class.', why: 'Dùng chung cho mọi test.', how: 'Chạy trước mọi method.', impact: 'Browser đã mở.', line: 0, st: 'ok', fx: function (s) { s.nodes[0].st = 'done'; } },
    { t: 'BeforeMethod cho Test 1', what: 'Vào trang login.', why: 'Trạng thái đầu cho test 1.', how: 'Trước test 1.', impact: 'Trang login.', line: 1, st: 'ok', fx: function (s) { s.nodes[1].st = 'done'; } },
    { t: 'Test 1: validLogin', what: 'Đăng nhập đúng.', why: 'Kịch bản tích cực.', how: 'Chạy test.', impact: 'PASSED.', line: 2, st: 'ok', fx: function (s) { s.nodes[2].st = 'done'; s.vars.runs = 1; } },
    { t: 'AfterMethod cho Test 1', what: 'Dọn dẹp sau test 1.', why: 'Chuẩn bị cho test 2.', how: 'Chạy sau test 1.', impact: 'Xong test 1.', line: 3, st: 'ok', fx: function (s) { s.nodes[3].st = 'done'; } },
    { t: 'BeforeMethod lại cho Test 2', what: 'Vào lại trang login.', why: 'Mỗi test bắt đầu từ trạng thái sạch.', how: 'Chạy lại trước test 2.', impact: 'Trang login được tải lại.', line: 1, st: 'ok', fx: function (s) { s.nodes[1].st = 'active'; } },
    { t: 'Test 2: invalidLogin', what: 'Đăng nhập sai.', why: 'Kịch bản tiêu cực.', how: 'Chạy test.', impact: 'PASSED (thông báo lỗi đúng).', line: 4, st: 'ok', fx: function (s) { s.nodes[4].st = 'done'; s.vars.runs = 2; } },
    { t: 'AfterClass (1 lần)', what: 'Đóng browser.', why: 'Kết thúc class.', how: 'Chạy sau cùng.', impact: 'Hoàn tất.', line: 5, st: 'ok', fx: function (s) { s.nodes[5].st = 'done'; s.nodes[3].st = 'done'; } }
  ],
  takeaway: 'BeforeClass/AfterClass chạy một lần cho class; BeforeMethod/AfterMethod chạy quanh từng @Test.' });

SIMS.push({ id: 'L17-M2', lesson: 17, level: 'Trung bình', title: 'Test fail: AfterMethod vẫn chạy để chụp ảnh',
  scen: 'Test thanh toán gặp lỗi giữa chừng. AfterMethod vẫn chạy để chụp màn hình; AfterClass vẫn đóng browser.',
  code: ['@Test public void checkout() { /* ... lỗi ở giữa ... */ }', '@AfterMethod takeShotIfFailed(ITestResult r) { if (r.getStatus()==ITestResult.FAILURE) { /* chụp */ } }', '@AfterClass closeBrowser() { driver.quit(); }'],
  init: { nodes: [{ label: '@Test checkout', sub: 'đang chạy', st: '' }, { label: '@AfterMethod', sub: 'chụp ảnh', st: '' }, { label: '@AfterClass', sub: 'quit()', st: '' }], browser: null, dom: null, vars: {}, clock: null },
  steps: [
    { t: 'Test bắt đầu', what: 'checkout() chạy.', why: 'Kịch bản thanh toán.', how: 'Các bước thực thi tuần tự.', impact: 'Đang chạy.', line: 0, st: 'run', fx: function (s) { s.nodes[0].st = 'active'; } },
    { t: 'Gặp lỗi giữa chừng', what: 'Một assert thất bại.', why: 'Đây là tình huống cần xử lý.', how: 'TestNG ghi nhận FAILED và dừng phần còn lại của test.', impact: 'Test đánh dấu FAILED.', line: 0, st: 'err', fx: function (s) { s.nodes[0].st = 'error'; s.vars.result = 'FAILED'; s.exc = 'AssertionError: expected [Thành công] but found [Lỗi thanh toán]'; } },
    { t: 'AfterMethod chạy dù fail', what: 'Kiểm tra trạng thái và chụp ảnh.', why: 'Ảnh giúp điều tra lỗi nhanh.', how: 'TestNG vẫn gọi AfterMethod; method đọc ITestResult.', impact: 'Đã lưu screenshot.', line: 1, st: 'ok', fx: function (s) { s.exc = null; s.nodes[1].st = 'done'; s.vars.screenshot = 'fail-checkout.png'; } },
    { t: 'AfterClass chạy', what: 'Đóng browser.', why: 'Dọn tài nguyên dù test fail.', how: 'quit() được gọi.', impact: 'Session đã kết thúc.', line: 2, st: 'ok', fx: function (s) { s.nodes[2].st = 'done'; s.vars.session = 'ended'; } },
    { t: 'Báo cáo', what: 'Kết quả: 1 test FAILED kèm ảnh.', why: 'Người đọc báo cáo biết lỗi ở đâu.', how: 'TestNG ghi báo cáo.', impact: 'Có đủ dữ liệu để điều tra.', line: 0, st: 'wait', fx: function (s) { s.vars.report = 'FAILED: checkout (có ảnh)'; } }
  ],
  takeaway: 'AfterMethod và AfterClass là nơi đặt dọn dẹp và chụp ảnh. Chúng vẫn chạy khi test fail (miễn là cấu hình không bỏ qua).' });

/* ---------- Bài 18: Assertions ---------- */
SIMS.push({ id: 'L18-E', lesson: 18, level: 'Dễ', title: 'So sánh Expected và Actual',
  scen: 'Sau khi đăng nhập, tiêu đề trang phải là "Dashboard". Test so sánh giá trị thực tế với kỳ vọng.',
  code: ['String actual = driver.getTitle();', 'Assert.assertEquals(actual, "Dashboard");  // actual trước, expected sau'],
  init: { browser: { url: 'https://shop.example.com/dashboard', title: 'Dashboard', ctx: 'main', tabs: null }, dom: [], vars: { actual: null, expected: 'Dashboard' }, clock: null },
  steps: [
    { t: 'Lấy giá trị thực tế', what: 'getTitle() trả về tiêu đề.', why: 'Actual là dữ liệu từ ứng dụng.', how: 'Driver trả về chuỗi.', impact: 'actual = "Dashboard".', line: 0, st: 'ok', fx: function (s) { s.vars.actual = 'Dashboard'; } },
    { t: 'Đặt kỳ vọng', what: 'Expected là "Dashboard".', why: 'Đây là điều yêu cầu nghiệp vụ mô tả.', how: 'Giá trị hằng số trong test.', impact: 'expected = "Dashboard".', line: 1, st: 'run', fx: function (s) { s.vars.expected = 'Dashboard'; } },
    { t: 'assertEquals so sánh', what: 'Hai giá trị bằng nhau.', why: 'Đây là kiểm tra chính.', how: 'TestNG so sánh bằng equals.', impact: 'Kết quả: PASS.', line: 1, st: 'ok', fx: function (s) { s.vars.result = 'PASS ✓'; } },
    { t: 'Test tiếp tục', what: 'Không có lỗi, test đi tiếp.', why: 'Kết quả đúng nên không cần dừng.', how: 'Không ném AssertionError.', impact: 'Test thành công.', line: 1, st: 'ok', fx: function (s) { s.vars.status = 'passed'; } }
  ],
  takeaway: 'TestNG: Assert.assertEquals(actual, expected). Thứ tự đảo lại sẽ làm thông báo lỗi khó đọc (không đổi kết quả pass/fail).' });

SIMS.push({ id: 'L18-M1', lesson: 18, level: 'Trung bình', title: 'Hard Assert thất bại: các bước sau không chạy',
  scen: 'Kiểm tra tên người dùng hiển thị trước. Nếu sai, các bước sau (kiểm tra giỏ hàng, giá) có còn ý nghĩa không?',
  code: ['Assert.assertEquals(userName, "Lan");     // bước 1: hard', 'Assert.assertTrue(cart.isDisplayed());    // bước 2', 'Assert.assertEquals(total, "250.000đ");      // bước 3'],
  init: { browser: { url: 'https://shop.example.com', title: 'Shop', ctx: 'main', tabs: null }, dom: [], vars: { userName: 'Minh' }, clock: null },
  steps: [
    { t: 'Bước 1: so tên người dùng', what: 'assertEquals("Minh", "Lan").', why: 'Điều kiện tiên quyết: đúng người dùng.', how: 'So sánh; không khớp.', impact: 'AssertionError được ném.', line: 0, st: 'err', fx: function (s) { s.exc = 'AssertionError: expected [Lan] but found [Minh]'; s.vars.result = 'FAILED tại bước 1'; } },
    { t: 'Bước 2 KHÔNG chạy', what: 'Assert giỏ hàng không được thực thi.', why: 'Hard assert dừng test ngay.', how: 'Ngoại lệ bay ra khỏi method test.', impact: 'Bước 2 bị bỏ qua.', line: 1, st: 'wait', fx: function (s) { s.vars.step2 = 'không chạy'; } },
    { t: 'Bước 3 KHÔNG chạy', what: 'Assert tổng tiền không được thực thi.', why: 'Tránh kết luận khi nền tảng đã sai.', how: 'Test đã dừng.', impact: 'Bước 3 bị bỏ qua.', line: 2, st: 'wait', fx: function (s) { s.vars.step3 = 'không chạy'; } },
    { t: 'Kết luận', what: 'Chỉ biết tên sai; chưa biết giỏ/tổng đúng hay sai.', why: 'Đây là đánh đổi của hard assert.', how: 'Báo cáo chỉ có một lỗi.', impact: 'Cần chạy lại sau khi sửa, hoặc dùng soft assert để gom.', line: 0, st: 'ok', fx: function (s) { s.vars.note = 'Dùng hard cho điều kiện tiên quyết' ; } }
  ],
  takeaway: 'Hard assert tốt cho điều kiện tiên quyết. Với các kiểm tra độc lập, soft assert giúp thấy nhiều lỗi hơn trong một lần chạy.' });

SIMS.push({ id: 'L18-M2', lesson: 18, level: 'Trung bình', title: 'Soft Assert gom lỗi và assertAll() báo tổng hợp',
  scen: 'Trang chi tiết sản phẩm có 3 kiểm tra độc lập. Hai cái sai. Dùng SoftAssert để thấy cả hai.',
  code: ['SoftAssert soft = new SoftAssert();', 'soft.assertEquals(name, "Áo thun");     // sai', 'soft.assertEquals(price, "150.000đ");   // đúng', 'soft.assertTrue(addBtn.isDisplayed());   // sai', 'soft.assertAll();                         // báo 2 lỗi'],
  init: { browser: { url: 'https://shop.example.com/product/3', title: 'Sản phẩm', ctx: 'main', tabs: null }, dom: [], vars: { collected: [] }, clock: null },
  steps: [
    { t: 'Tạo SoftAssert', what: 'new SoftAssert().', why: 'Bộ gom lỗi.', how: 'Đối tượng lưu danh sách kết quả.', impact: 'collected = [].', line: 0, st: 'ok', fx: function (s) { s.vars.collected = []; } },
    { t: 'Kiểm tra tên: SAI', what: 'assertEquals(name, "Áo thun").', why: 'Ghi nhận lỗi nhưng không dừng.', how: 'SoftAssert lưu lỗi và tiếp tục.', impact: 'collected = [tên sai].', line: 1, st: 'err', fx: function (s) { s.vars.collected = ['tên sai']; } },
    { t: 'Kiểm tra giá: ĐÚNG', what: 'assertEquals(price, "150.000đ").', why: 'Vẫn kiểm tra tiếp.', how: 'Khớp → không ghi lỗi.', impact: 'collected vẫn 1 lỗi.', line: 2, st: 'ok', fx: function (s) { s.vars.collected = ['tên sai']; } },
    { t: 'Kiểm tra nút thêm: SAI', what: 'assertTrue(addBtn.isDisplayed()).', why: 'Tiếp tục gom lỗi.', how: 'Lưu thêm lỗi.', impact: 'collected = 2 lỗi.', line: 3, st: 'err', fx: function (s) { s.vars.collected = ['tên sai', 'nút thêm không hiển thị']; } },
    { t: 'assertAll() báo tổng hợp', what: 'Ném một AssertionError chứa tất cả lỗi.', why: 'Bắt buộc gọi để soft assert báo lỗi.', how: 'SoftAssert kiểm tra danh sách và ném nếu có lỗi.', impact: 'Test FAILED với 2 lỗi trong một lần.', line: 4, st: 'err', fx: function (s) { s.exc = 'AssertionError (SoftAssert): 2 lỗi — tên sai; nút thêm không hiển thị'; } }
  ],
  takeaway: 'SoftAssert chỉ báo lỗi khi gọi assertAll(). Quên assertAll() = lỗi bị bỏ qua và test có thể pass sai.' });

/* ---------- Bài 19: POM ---------- */
SIMS.push({ id: 'L19-E', lesson: 19, level: 'Dễ', title: 'Login Page Object: test gọi một hành động',
  scen: 'Test đăng nhập không tự tìm ô nhập. Nó gọi LoginPage.login(), và LoginPage chứa mọi locator.',
  code: ['// LoginPage.java', 'private By user = By.id("username");', 'public DashboardPage login(String u, String p) { ... }', '// LoginTest.java', 'new LoginPage(driver).login("qa_user", "Pass@123");'],
  init: { nodes: [{ label: 'LoginTest', sub: 'test class', st: '' }, { label: 'LoginPage', sub: 'locator + hành động', st: '' }, { label: 'WebDriver', sub: 'điều khiển', st: '' }, { label: 'Browser', sub: 'trang login', st: '' }], browser: null, dom: null, vars: {}, clock: null },
  steps: [
    { t: 'Test tạo LoginPage', what: 'new LoginPage(driver).', why: 'Test không cần biết chi tiết locator.', how: 'Page Object giữ driver.', impact: 'LoginPage sẵn sàng.', line: 4, st: 'ok', fx: function (s) { s.nodes[0].st = 'done'; s.nodes[1].st = 'active'; } },
    { t: 'Gọi login(user, pass)', what: 'Test yêu cầu hành động đăng nhập.', why: 'Diễn đạt bằng nghiệp vụ, không bằng thao tác từng ô.', how: 'LoginPage dùng locator nội bộ.', impact: 'LoginPage nhận yêu cầu.', line: 2, st: 'run', fx: function (s) { s.nodes[1].st = 'active'; s.vars.call = 'login("qa_user", "Pass@123")'; } },
    { t: 'LoginPage dùng WebDriver', what: 'Tìm ô, nhập, bấm.', why: 'Locator nằm trong Page Object.', how: 'Gọi driver.findElement(user...).', impact: 'Các thao tác được gửi tới trình duyệt.', line: 1, st: 'run', fx: function (s) { s.nodes[2].st = 'active'; } },
    { t: 'Trình duyệt thực hiện', what: 'Form được gửi.', why: 'Hành động thật xảy ra trên trang.', how: 'Trình duyệt xử lý.', impact: 'Trang chuyển sang dashboard.', line: 2, st: 'ok', fx: function (s) { s.nodes[3].st = 'done'; s.nodes[2].st = 'done'; s.nodes[1].st = 'done'; s.vars.returns = 'DashboardPage'; } }
  ],
  takeaway: 'POM tách "biết trang làm gì" khỏi "tìm phần tử thế nào". Đây là mẫu thiết kế, không phải framework.' });

SIMS.push({ id: 'L19-M1', lesson: 19, level: 'Trung bình', title: 'Tái sử dụng hành động của Page Object',
  scen: 'Hai test (đăng nhập thành công và đăng nhập rồi thêm giỏ) đều dùng LoginPage.login().',
  code: ['// Test A', 'new LoginPage(driver).login("qa_user", "Pass@123");', '// Test B', 'new LoginPage(driver).login("qa_user", "Pass@123");', 'new CartPage(driver).addItem("Áo thun");'],
  init: { nodes: [{ label: 'Test A', sub: 'đăng nhập', st: '' }, { label: 'Test B', sub: 'đăng nhập + giỏ', st: '' }, { label: 'LoginPage.login', sub: 'dùng lại', st: '' }, { label: 'CartPage.addItem', sub: 'dùng lại', st: '' }], browser: null, dom: null, vars: {}, clock: null },
  steps: [
    { t: 'Test A gọi login()', what: 'Dùng LoginPage.', why: 'Không viết lại thao tác.', how: 'Gọi method đã có.', impact: 'Đăng nhập OK.', line: 1, st: 'ok', fx: function (s) { s.nodes[0].st = 'done'; s.nodes[2].st = 'done'; s.vars.A = 'PASS'; } },
    { t: 'Test B gọi login()', what: 'Dùng lại đúng method đó.', why: 'Cùng một thao tác đăng nhập ở nhiều test.', how: 'Method được gọi lần nữa.', impact: 'Đăng nhập OK.', line: 3, st: 'ok', fx: function (s) { s.nodes[1].st = 'active'; s.vars.B1 = 'login OK'; } },
    { t: 'Test B gọi addItem()', what: 'Thêm vào giỏ qua CartPage.', why: 'Mỗi trang có Page Object riêng.', how: 'Method của CartPage.', impact: 'Giỏ có 1 sản phẩm.', line: 4, st: 'ok', fx: function (s) { s.nodes[3].st = 'done'; s.nodes[1].st = 'done'; s.vars.B = 'PASS'; } }
  ],
  takeaway: 'Một hành động viết một lần, dùng nhiều lần. Khi có thay đổi, bạn sửa một chỗ.' });

SIMS.push({ id: 'L19-M2', lesson: 19, level: 'Trung bình', title: 'Đổi locator ở một nơi: nhiều test cùng được sửa',
  scen: 'Ô username bị đổi id từ "username" sang "user-name". Chỉ cần sửa LoginPage; mọi test dùng nó đều chạy lại được.',
  code: ['// Trước: LoginPage.java', 'private By user = By.id("username");', '// Sau khi đổi giao diện: sửa đúng 1 dòng', 'private By user = By.id("user-name");'],
  init: { nodes: [{ label: 'LoginPage', sub: 'By.id("username")', st: '' }, { label: 'Test 1', sub: 'login', st: '' }, { label: 'Test 2', sub: 'login', st: '' }, { label: 'Test 3', sub: 'login sai', st: '' }], browser: null, dom: null, vars: { locator: 'By.id("username")' }, clock: null },
  predict: { q: 'Sau khi ứng dụng đổi id, bạn cần sửa bao nhiêu chỗ nếu có 30 test dùng LoginPage?', opts: ['30 chỗ, mỗi test một chỗ', '1 chỗ trong LoginPage', '0 chỗ, tự động', '2 chỗ'], ans: 1, why: 'Locator nằm trong một Page Object; các test gọi qua hành động của trang nên chỉ cần sửa một nơi.' },
  steps: [
    { t: 'Trạng thái ban đầu: 3 test PASS', what: 'Mọi test dùng locator cũ.', why: 'Hệ thống đang ổn.', how: 'Locator khớp.', impact: '3/3 PASS.', line: 1, st: 'ok', fx: function (s) { s.nodes[1].st = 'done'; s.nodes[2].st = 'done'; s.nodes[3].st = 'done'; s.vars.result = '3/3 PASS'; } },
    { t: 'Ứng dụng đổi id', what: 'Ô username bây giờ là "user-name".', why: 'Thay đổi giao diện là chuyện bình thường.', how: 'DOM mới có id khác.', impact: 'Mọi test dùng LoginPage đều lỗi.', line: 1, st: 'err', fx: function (s) { s.nodes.forEach(function (n) { if (n.label !== 'LoginPage') n.st = 'error'; }); s.nodes[0].st = 'error'; s.vars.result = '0/3 PASS (NoSuchElement)'; s.exc = 'NoSuchElementException: id="username" không còn tồn tại'; } },
    { t: 'Sửa đúng một dòng trong LoginPage', what: 'Đổi locator thành By.id("user-name").', why: 'Đây là nơi duy nhất chứa locator.', how: 'Sửa một dòng.', impact: 'Locator mới.', line: 3, st: 'run', fx: function (s) { s.exc = null; s.vars.locator = 'By.id("user-name")'; s.nodes[0].st = 'active'; } },
    { t: 'Chạy lại: 3 test PASS', what: 'Cả ba test dùng lại LoginPage đã sửa.', why: 'Đó là lợi ích của POM.', how: 'Không cần sửa test.', impact: '3/3 PASS trở lại.', line: 3, st: 'ok', fx: function (s) { s.nodes.forEach(function (n) { n.st = 'done'; }); s.vars.result = '3/3 PASS'; } }
  ],
  takeaway: 'POM giảm chi phí bảo trì: locator đổi ở một chỗ, tất cả test dùng trang đó được hưởng lợi.' });

/* ---------- Bài 20: DataProvider ---------- */
SIMS.push({ id: 'L20-E', lesson: 20, level: 'Dễ', title: 'Một bộ dữ liệu cho một test',
  scen: 'Test đăng nhập với một tài khoản. DataProvider chỉ trả về một hàng.',
  code: ['@DataProvider(name="accounts")', 'public Object[][] accounts() {', '    return new Object[][] { { "qa_user", "Pass@123" } };', '}', '@Test(dataProvider="accounts")', 'public void login(String u, String p) { ... }'],
  init: { browser: { url: 'about:blank', title: '', ctx: 'main', tabs: null }, dom: [], vars: { runs: 0 }, clock: null },
  steps: [
    { t: 'DataProvider trả về 1 hàng', what: 'Object[][] có một bộ.', why: 'Test sẽ chạy đúng một lần.', how: 'TestNG nhận mảng hai chiều.', impact: 'Có 1 bộ dữ liệu.', line: 2, st: 'ok', fx: function (s) { s.vars.rows = 1; } },
    { t: 'Chạy test với "qa_user"', what: 'login("qa_user", "Pass@123").', why: 'Chạy kịch bản một lần.', how: 'TestNG gọi method với tham số.', impact: 'Đăng nhập thành công.', line: 5, st: 'ok', fx: function (s) { s.vars.runs = 1; s.browser.url = '/dashboard'; s.browser.title = 'Dashboard'; } },
    { t: 'Kết quả', what: '1 lần chạy, PASS.', why: 'Tổng kết.', how: 'Báo cáo.', impact: 'Đủ cho kịch bản đơn.', line: 5, st: 'ok', fx: function (s) { s.vars.result = '1/1 PASS'; } }
  ],
  takeaway: 'DataProvider có một hàng thì test chạy một lần. Lợi ích thật sự xuất hiện khi có nhiều hàng.' });

SIMS.push({ id: 'L20-M1', lesson: 20, level: 'Trung bình', title: 'Nhiều tài khoản: một test chạy ba lần',
  scen: 'Ba tài khoản (quản trị, khách, khách VIP) đều cần kiểm tra đăng nhập thành công.',
  code: ['@DataProvider(name="accounts")', 'public Object[][] accounts() {', '    return new Object[][] {', '        { "admin", "Admin@1" }, { "guest", "Guest@1" }, { "vip", "Vip@1" }', '    };', '}', '@Test(dataProvider="accounts")', 'public void login(String u, String p) { ... }'],
  init: { browser: { url: 'about:blank', title: '', ctx: 'main', tabs: null }, dom: [], vars: { results: [] }, clock: null },
  steps: [
    { t: 'Lần 1: admin', what: 'Chạy test với bộ dữ liệu đầu tiên.', why: 'Mỗi hàng là một lần chạy độc lập.', how: 'TestNG truyền từng hàng vào tham số.', impact: 'admin → PASS.', line: 3, st: 'ok', fx: function (s) { s.vars.results = ['admin: PASS']; } },
    { t: 'Lần 2: guest', what: 'Cùng logic, dữ liệu khác.', why: 'Không copy test.', how: 'Gọi lại method với tham số mới.', impact: 'guest → PASS.', line: 3, st: 'ok', fx: function (s) { s.vars.results = ['admin: PASS', 'guest: PASS']; } },
    { t: 'Lần 3: vip', what: 'Lần chạy cuối.', why: 'Kiểm tra vai trò khác.', how: 'Gọi method với tham số cuối.', impact: 'vip → PASS.', line: 3, st: 'ok', fx: function (s) { s.vars.results = ['admin: PASS', 'guest: PASS', 'vip: PASS']; } },
    { t: 'Tổng kết', what: '3 lần chạy từ 1 method.', why: 'Báo cáo cho từng bộ dữ liệu.', how: 'TestNG báo cáo riêng mỗi lần.', impact: '3/3 PASS.', line: 7, st: 'ok', fx: function (s) { s.vars.result = '3/3 PASS'; } }
  ],
  takeaway: 'Một @Test + nhiều hàng dữ liệu = nhiều lần chạy độc lập. Báo cáo cho từng bộ, giúp biết chính xác bộ nào lỗi.' });

SIMS.push({ id: 'L20-M2', lesson: 20, level: 'Trung bình', title: 'Dữ liệu đúng và sai: kiểm tra cả hai nhánh',
  scen: 'Bộ dữ liệu gồm tài khoản đúng (kỳ vọng thành công) và mật khẩu sai (kỳ vọng báo lỗi).',
  code: ['@DataProvider(name="cases")', 'public Object[][] cases() {', '    return new Object[][] {', '        { "qa_user", "Pass@123", true },', '        { "qa_user", "wrong", false },', '    };', '}', '@Test(dataProvider="cases")', 'public void login(String u, String p, boolean expectOk) { ... }'],
  init: { browser: { url: 'about:blank', title: '', ctx: 'main', tabs: null }, dom: [E('msg', 'p#msg', '', '')], vars: { results: [] }, clock: null },
  predict: { q: 'Với dữ liệu sai (expectOk=false), test nên làm gì?', opts: ['Bỏ qua vì đây không phải đăng nhập', 'Kiểm tra thông báo lỗi đúng và không vào dashboard', 'Đăng nhập lại cho đến khi đúng', 'Coi là PASS vì không có exception'], ans: 1, why: 'Dữ liệu tiêu cực kiểm tra hệ thống có từ chối đúng cách không.' },
  steps: [
    { t: 'Case 1: đúng (expectOk = true)', what: 'Đăng nhập với mật khẩu đúng.', why: 'Kiểm tra luồng thành công.', how: 'Gọi login với tham số đúng.', impact: 'Vào dashboard → PASS.', line: 3, st: 'ok', fx: function (s) { s.vars.results = ['case1: PASS (vào dashboard)']; s.browser.url = '/dashboard'; } },
    { t: 'Case 2: sai (expectOk = false)', what: 'Đăng nhập với mật khẩu sai.', why: 'Kiểm tra hệ thống chặn đúng.', how: 'Gọi login với tham số sai.', impact: 'Không vào dashboard; hiện thông báo lỗi.', line: 4, st: 'ok', fx: function (s) { s.browser.url = '/login'; F(s, 'msg').label = 'Sai tên đăng nhập hoặc mật khẩu'; F(s, 'msg').c = 'ok'; } },
    { t: 'Assert theo expectOk', what: 'Nếu expectOk = false: kiểm tra có thông báo lỗi và KHÔNG có dashboard.', why: 'Assert phải phản ánh kỳ vọng của từng hàng.', how: 'Điều kiện if/else theo cờ boolean.', impact: 'Case 2: PASS đúng nghĩa.', line: 8, st: 'ok', fx: function (s) { s.vars.results = ['case1: PASS', 'case2: PASS (có thông báo lỗi)']; } },
    { t: 'Tổng kết', what: 'Cả hai nhánh đều được kiểm tra.', why: 'Tránh bỏ sót lỗi chấp nhận sai.', how: 'Báo cáo hai lần chạy.', impact: '2/2 PASS.', line: 7, st: 'ok', fx: function (s) { s.vars.result = '2/2 PASS'; } }
  ],
  takeaway: 'Dữ liệu sai không phải "đừng kiểm tra". Nó kiểm tra xem ứng dụng có từ chối đúng cách hay không.' });
