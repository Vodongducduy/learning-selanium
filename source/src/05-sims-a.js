/* ===== SIMULATIONS — Bài 1–10 (30 mô phỏng) ===== */
function E(id, tag, label, c, hint) { return { id: id, tag: tag, label: label, c: c || '', hint: hint || '' }; }
function F(s, id) { return s.dom.filter(function (e) { return e.id === id; })[0]; }
var BLANK = { url: 'about:blank', title: '', ctx: 'main', tabs: null };
var SIMS = [];

/* ---------- Bài 1: WebDriver ---------- */
SIMS.push({ id: 'L1-E', lesson: 1, level: 'Dễ', title: 'Mở trình duyệt và mở website',
  scen: 'Bạn muốn mở trang đăng nhập của shop và kiểm tra tiêu đề trang trước khi làm bất cứ việc gì.',
  code: ['WebDriver driver = new ChromeDriver();', 'driver.get("https://shop.example.com/login");', 'String title = driver.getTitle();', 'System.out.println(title);', 'driver.quit();'],
  init: { browser: BLANK, dom: [], vars: {}, clock: null },
  predict: { q: 'Sau khi new ChromeDriver() xong nhưng chưa gọi get(), trình duyệt đang hiển thị gì?', opts: ['Trang đăng nhập của shop', 'Trang trống (about:blank)', 'Lỗi NoSuchElementException', 'Trang Google mặc định'], ans: 1, why: 'Session mới thường bắt đầu với trang trống; chỉ khi get() được gọi mới tới đúng URL.' },
  steps: [
    { t: 'Khởi tạo phiên WebDriver', what: 'Tạo đối tượng driver điều khiển Chrome.', why: 'Mọi lệnh sau này đều gửi qua đối tượng này; không có session thì không có gì để điều khiển.', how: 'Selenium (Selenium Manager) tìm driver phù hợp, khởi động ChromeDriver và tạo session.', impact: 'Trình duyệt mở ra ở trang trống. Session đã sẵn sàng nhận lệnh.', line: 0, st: 'ok', fx: function (s) { s.browser.url = 'about:blank'; s.browser.title = 'Trang trống'; s.vars.driver = 'session#A1 (sẵn sàng)'; } },
    { t: 'Gửi lệnh get(URL)', what: 'Yêu cầu trình duyệt mở địa chỉ trang đăng nhập.', why: 'Test cần đưa trình duyệt đến đúng trang trước khi kiểm tra.', how: 'WebDriver gửi lệnh điều hướng; trình duyệt tải trang và chờ theo pageLoadStrategy (mặc định là normal).', impact: 'Địa chỉ trên thanh URL đổi sang trang login.', line: 1, st: 'run', dt: 2, fx: function (s) { s.browser.url = 'https://shop.example.com/login'; s.browser.title = 'Đang tải...'; s.vars.loading = true; } },
    { t: 'Trang tải xong', what: 'Trang login hiển thị đầy đủ nội dung.', why: 'Lệnh get trả về sau khi trang đạt trạng thái sẵn sàng theo cấu hình tải trang.', how: 'Trình duyệt dựng DOM và báo về cho driver. Tiêu đề trang được cập nhật.', impact: 'Trang đã sẵn sàng; tiêu đề hiện là "Đăng nhập - Shop".', line: 1, st: 'ok', fx: function (s) { s.browser.title = 'Đăng nhập - Shop'; s.vars.loading = false; s.dom = [E('form', 'div', 'Form đăng nhập', 'ok'), E('btn', 'button', 'Đăng nhập', '')]; } },
    { t: 'Lấy tiêu đề trang', what: 'Gọi getTitle() và lưu kết quả vào biến title.', why: 'Tiêu đề là một kiểm tra nhanh xem đúng trang chưa.', how: 'WebDriver hỏi trình duyệt tiêu đề hiện tại; kết quả là một chuỗi String.', impact: 'Biến title = "Đăng nhập - Shop".', line: 2, st: 'ok', fx: function (s) { s.vars.title = 'Đăng nhập - Shop'; } },
    { t: 'In kết quả ra console', what: 'In tiêu đề ra màn hình Java console.', why: 'Giúp người viết test kiểm tra giá trị đã lấy được.', how: 'Java in chuỗi từ biến title; đây là đầu ra của chương trình Java, không phải của trình duyệt.', impact: 'Console hiển thị: Đăng nhập - Shop.', line: 3, st: 'ok', fx: function (s) { s.vars.console = 'Đăng nhập - Shop'; } },
    { t: 'Đóng phiên bằng quit()', what: 'Đóng mọi cửa sổ và kết thúc session.', why: 'Tránh để lại tiến trình trình duyệt treo sau khi test xong.', how: 'quit() gửi lệnh kết thúc session; driver không còn dùng được.', impact: 'Trình duyệt đóng. Mọi lệnh sau quit() sẽ lỗi.', line: 4, st: 'ok', fx: function (s) { s.browser = { url: '—', title: 'Đã đóng', ctx: 'main', tabs: null }; s.dom = []; s.vars.session = 'ended'; } }
  ],
  takeaway: 'WebDriver không tự "thấy" trang. Mỗi lệnh là một yêu cầu gửi tới trình duyệt, và bạn chỉ biết kết quả qua giá trị trả về. Luôn gọi quit() để kết thúc session.' });

SIMS.push({ id: 'L1-M1', lesson: 1, level: 'Trung bình', title: 'Luồng lệnh và phản hồi giữa Java, WebDriver và trình duyệt',
  scen: 'Lệnh findElement(By.id("email")) đi qua các tầng nào, và kết quả quay về theo đường nào?',
  code: ['WebElement email = driver.findElement(By.id("email"));', 'email.sendKeys("qa@shop.vn");', 'String value = email.getAttribute("value");'],
  init: { nodes: [{ label: 'Test Script', sub: 'Java code', st: '' }, { label: 'WebDriver API', sub: 'Lệnh Java', st: '' }, { label: 'ChromeDriver', sub: 'Dịch sang W3C', st: '' }, { label: 'Browser', sub: 'DOM', st: '' }], vars: {}, clock: null, dom: [] },
  steps: [
    { t: 'Java gọi findElement', what: 'Test script gọi findElement với locator By.id("email").', why: 'Cần một tham chiếu tới ô email để thao tác.', how: 'Java tạo đối tượng By và gọi API của WebDriver.', impact: 'Lệnh sẵn sàng được gửi đi.', line: 0, st: 'run', fx: function (s) { s.nodes[0].st = 'active'; s.vars.locator = 'By.id("email")'; } },
    { t: 'WebDriver gửi lệnh tới driver', what: 'WebDriver chuyển thành yêu cầu theo giao thức WebDriver.', why: 'Trình duyệt không hiểu Java; cần định dạng chuẩn.', how: 'Yêu cầu HTTP (JSON) được gửi tới ChromeDriver, theo chuẩn W3C WebDriver.', impact: 'Lệnh đang ở tầng driver.', line: 0, st: 'run', fx: function (s) { s.nodes[0].st = 'done'; s.nodes[1].st = 'done'; s.nodes[2].st = 'active'; } },
    { t: 'Driver chuyển cho trình duyệt', what: 'ChromeDriver chuyển lệnh cho Chrome.', why: 'Chrome là nơi có DOM thật.', how: 'Driver dịch lệnh sang giao thức của trình duyệt và thực thi.', impact: 'Trình duyệt bắt đầu tìm trên DOM.', line: 0, st: 'run', fx: function (s) { s.nodes[2].st = 'done'; s.nodes[3].st = 'active'; } },
    { t: 'Trình duyệt tìm và trả về mã phần tử', what: 'Trình duyệt tìm phần tử có id="email" và trả về mã định danh (element reference).', why: 'Java không giữ phần tử thật; chỉ giữ một mã để gọi lại.', how: 'Trình duyệt trả về một id phần tử; WebDriver bọc thành đối tượng WebElement trong Java.', impact: 'Biến email trỏ tới phần tử trên trang.', line: 0, st: 'ok', fx: function (s) { s.nodes.forEach(function (n) { n.st = 'done'; }); s.vars.email = 'WebElement#ref-17 (tham chiếu)'; s.dom = [E('email', 'input', 'Ô email', 'hl', '#email')]; } },
    { t: 'sendKeys gửi chuỗi', what: 'email.sendKeys("qa@shop.vn") gửi lệnh gõ phím.', why: 'Nhập dữ liệu test vào ô.', how: 'Lệnh được gửi kèm mã phần tử; trình duyệt gõ từng ký tự vào ô.', impact: 'Ô email chứa "qa@shop.vn".', line: 1, st: 'run', fx: function (s) { s.nodes = null; F(s, 'email').c = 'ok'; F(s, 'email').label = 'qa@shop.vn'; } },
    { t: 'getAttribute trả giá trị về Java', what: 'Lấy giá trị hiện tại của ô và trả về biến value.', why: 'Kiểm tra dữ liệu đã nhập đúng chưa.', how: 'Trình duyệt trả chuỗi về qua driver; Java nhận được String.', impact: 'Biến value = "qa@shop.vn" — đây là dữ liệu quay về Java.', line: 2, st: 'ok', fx: function (s) { s.vars.value = 'qa@shop.vn'; } }
  ],
  takeaway: 'Mỗi lệnh là một vòng: Java → WebDriver → Driver → Browser → kết quả quay ngược lại. Khi lỗi, bạn có thể xác định lỗi nằm ở tầng nào.' });

SIMS.push({ id: 'L1-M2', lesson: 1, level: 'Trung bình', title: 'Vòng đời phiên (session) và rủi ro quên quit()',
  scen: 'Test mở trình duyệt, chạy xong nhưng quên gọi quit(). Điều gì xảy ra với phiên này?',
  code: ['WebDriver driver = new ChromeDriver();', 'driver.get("https://shop.example.com");', '// ... test chạy xong, không có quit()', '// nếu có: driver.quit();'],
  init: { browser: BLANK, dom: [], vars: { session: 'chưa có' }, clock: null },
  predict: { q: 'Test kết thúc mà không gọi quit(), trình duyệt sẽ thế nào?', opts: ['Tự đóng ngay', 'Vẫn mở, session còn treo và tốn tài nguyên', 'Selenium tự xóa mọi tab', 'Test bị fail ngay lập tức'], ans: 1, why: 'Phiên không được đóng nếu bạn không gọi quit(); trình duyệt và driver vẫn chạy và chiếm tài nguyên.' },
  steps: [
    { t: 'Tạo session', what: 'new ChromeDriver() tạo session mới.', why: 'Session là điều kiện để điều khiển trình duyệt.', how: 'Driver tạo session ID và mở trình duyệt.', impact: 'Session #B2 đang chạy.', line: 0, st: 'ok', fx: function (s) { s.browser = { url: 'about:blank', title: '', ctx: 'main', tabs: null }; s.vars.session = 'B2 (đang chạy)'; } },
    { t: 'Mở trang', what: 'get() mở trang shop.', why: 'Đưa trình duyệt đến trang cần test.', how: 'Lệnh điều hướng được thực thi.', impact: 'Trang shop hiển thị.', line: 1, st: 'ok', fx: function (s) { s.browser.url = 'https://shop.example.com'; s.browser.title = 'Shop - Trang chủ'; } },
    { t: 'Test kết thúc nhưng không có quit()', what: 'Hàm test trả về, không có lệnh đóng session.', why: 'Đây là lỗi thường gặp khi quên dọn dẹp.', how: 'Driver không được báo; session vẫn tồn tại ở phía trình duyệt.', impact: 'Cảnh báo: trình duyệt vẫn mở và tiến trình driver còn chạy.', line: 2, st: 'wait', fx: function (s) { s.vars.session = 'B2 (VẪN CHẠY — rò rỉ)'; s.exc = 'Session B2 không được đóng: tài nguyên bị giữ.'; } },
    { t: 'Lần chạy sau tạo thêm session', what: 'Chạy lại test, tạo session #C3 mới.', why: 'Nhiều session treo tích lũy làm máy chậm và dễ lỗi.', how: 'Mỗi lần new ChromeDriver() tạo thêm một phiên.', impact: 'Có hai trình duyệt treo: B2 và C3.', line: 0, st: 'wait', fx: function (s) { s.vars.session = 'B2 + C3 (đều còn treo)'; s.exc = null; } },
    { t: 'Sửa: gọi quit() trong @AfterMethod / finally', what: 'Đưa quit() vào khối dọn dẹp luôn chạy.', why: 'Dọn dẹp phải chạy dù test pass hay fail.', how: 'quit() được gọi trong finally hoặc @AfterMethod/@AfterClass.', impact: 'Mọi session được đóng, không còn tiến trình treo.', line: 3, st: 'ok', fx: function (s) { s.vars.session = 'đã đóng cả B2, C3'; s.browser = { url: '—', title: 'Đã đóng', ctx: 'main', tabs: null }; } }
  ],
  takeaway: 'Session là tài nguyên bên ngoài Java. Luôn đóng bằng quit() trong khối dọn dẹp để tránh rò rỉ trình duyệt.' });

/* ---------- Bài 2: Navigation ---------- */
SIMS.push({ id: 'L2-E', lesson: 2, level: 'Dễ', title: 'Mở website bằng get()',
  scen: 'Bạn mở trang chủ của một cửa hàng để bắt đầu kịch bản kiểm thử.',
  code: ['driver.get("https://shop.example.com");', 'System.out.println(driver.getCurrentUrl());'],
  init: { browser: BLANK, dom: [], vars: {}, clock: null },
  predict: { q: 'get() chờ gì trước khi trả về?', opts: ['Chờ đúng 5 giây', 'Chờ trang tải theo pageLoadStrategy', 'Chờ người dùng bấm OK', 'Không chờ gì cả'], ans: 1, why: 'get() trả về khi trang đạt trạng thái tải theo pageLoadStrategy; không dùng thời gian cố định.' },
  steps: [
    { t: 'Gửi lệnh get()', what: 'Yêu cầu trình duyệt mở URL trang chủ.', why: 'Đây là điểm bắt đầu của kịch bản.', how: 'Lệnh điều hướng được gửi tới trình duyệt.', impact: 'Trình duyệt bắt đầu tải.', line: 0, st: 'run', dt: 2, fx: function (s) { s.browser.url = 'https://shop.example.com'; s.browser.title = 'Đang tải...'; } },
    { t: 'Chờ trang tải theo pageLoadStrategy', what: 'Driver chờ trang sẵn sàng.', why: 'Tránh thao tác khi DOM chưa đầy đủ.', how: 'Mặc định là normal: chờ đến khi sự kiện load xong.', impact: 'Trang đã sẵn sàng.', line: 0, st: 'ok', fx: function (s) { s.browser.title = 'Shop - Trang chủ'; s.dom = [E('hero', 'h1', 'Khuyến mãi tháng 11', 'ok')]; } },
    { t: 'Đọc URL hiện tại', what: 'getCurrentUrl() lấy địa chỉ đang mở.', why: 'Xác nhận đúng trang sau khi chuyển hướng.', how: 'Trình duyệt trả về URL cuối cùng (có thể khác URL đã gọi nếu có redirect).', impact: 'Biến url = https://shop.example.com/', line: 1, st: 'ok', fx: function (s) { s.vars.url = 'https://shop.example.com/'; } }
  ],
  takeaway: 'get() mở URL và chờ trang tải theo cấu hình, không dùng sleep cố định. Dùng getCurrentUrl() để xác nhận nơi bạn đang đứng.' });

SIMS.push({ id: 'L2-M1', lesson: 2, level: 'Trung bình', title: 'Back và Forward trong lịch sử trình duyệt',
  scen: 'Người dùng đi từ trang sản phẩm → giỏ hàng → thanh toán, rồi bấm Back hai lần. Test kiểm tra trang đã quay đúng chưa.',
  code: ['driver.get("https://shop.example.com/product/12");', 'driver.navigate().to("https://shop.example.com/cart");', 'driver.navigate().to("https://shop.example.com/checkout");', 'driver.navigate().back();', 'driver.navigate().back();', 'driver.navigate().forward();'],
  init: { browser: { url: 'about:blank', title: '', ctx: 'main', tabs: null }, dom: [], vars: { history: [], index: -1 }, clock: null },
  steps: [
    { t: 'Mở trang sản phẩm', what: 'get() mở /product/12.', why: 'Điểm bắt đầu của lịch sử.', how: 'Trình duyệt thêm trang vào lịch sử.', impact: 'Lịch sử: [sản phẩm]; đang ở vị trí 0.', line: 0, st: 'ok', fx: function (s) { s.browser.url = '/product/12'; s.browser.title = 'Sản phẩm 12'; s.vars.history = ['/product/12']; s.vars.index = 0; } },
    { t: 'Đi tới giỏ hàng', what: 'navigate().to() mở /cart.', why: 'Mô phỏng người dùng chuyển trang.', how: 'Trang mới được đẩy vào lịch sử, xóa phần "tiến" nếu có.', impact: 'Lịch sử: [sản phẩm, giỏ]; đang ở vị trí 1.', line: 1, st: 'ok', fx: function (s) { s.browser.url = '/cart'; s.browser.title = 'Giỏ hàng'; s.vars.history = ['/product/12', '/cart']; s.vars.index = 1; } },
    { t: 'Đi tới thanh toán', what: 'navigate().to() mở /checkout.', why: 'Bước tiếp theo của luồng mua hàng.', how: 'Trang checkout được thêm vào lịch sử.', impact: 'Lịch sử: [sản phẩm, giỏ, thanh toán]; vị trí 2.', line: 2, st: 'ok', fx: function (s) { s.browser.url = '/checkout'; s.browser.title = 'Thanh toán'; s.vars.history = ['/product/12', '/cart', '/checkout']; s.vars.index = 2; } },
    { t: 'Back lần 1', what: 'navigate().back() quay về giỏ hàng.', why: 'Kiểm tra nút Back của ứng dụng hoạt động.', how: 'Trình duyệt lùi một bước trong lịch sử; không tải lại dữ liệu mới nếu trang đã cache.', impact: 'Đang ở /cart; vị trí 1.', line: 3, st: 'ok', fx: function (s) { s.browser.url = '/cart'; s.browser.title = 'Giỏ hàng'; s.vars.index = 1; } },
    { t: 'Back lần 2', what: 'Lùi thêm một bước về sản phẩm.', why: 'Kiểm tra trạng thái trang cũ.', how: 'Lịch sử lùi tiếp.', impact: 'Đang ở /product/12; vị trí 0.', line: 4, st: 'ok', fx: function (s) { s.browser.url = '/product/12'; s.browser.title = 'Sản phẩm 12'; s.vars.index = 0; } },
    { t: 'Forward', what: 'navigate().forward() tiến một bước.', why: 'Kiểm tra quay lại cùng đường đi.', how: 'Trình duyệt tiến trong lịch sử.', impact: 'Đang ở /cart; vị trí 1.', line: 5, st: 'ok', fx: function (s) { s.browser.url = '/cart'; s.browser.title = 'Giỏ hàng'; s.vars.index = 1; } }
  ],
  takeaway: 'Back/Forward thao tác trên lịch sử trình duyệt. Sau Back, trang có thể được lấy từ cache, nên luôn kiểm tra nội dung bằng wait hoặc assertion thay vì tin vào URL.' });

SIMS.push({ id: 'L2-M2', lesson: 2, level: 'Trung bình', title: 'close() khác quit() như thế nào',
  scen: 'Test mở thêm một tab "Chính sách" rồi đóng nó. Sau đó test muốn tiếp tục thao tác trên tab gốc, và cuối cùng kết thúc phiên.',
  code: ['driver.get("https://shop.example.com");', 'driver.findElement(By.linkText("Chính sách")).click(); // mở tab mới', 'driver.close();  // đóng tab hiện tại (tab mới)', 'driver.quit();   // đóng mọi tab, kết thúc session'],
  init: { browser: { url: 'https://shop.example.com', title: 'Shop - Trang chủ', ctx: 'main', tabs: [{ title: 'Shop', active: true }] }, dom: [], vars: { session: 'đang chạy' }, clock: null },
  predict: { q: 'Sau close() trên tab mới, bạn có còn điều khiển được tab gốc mà không cần chuyển handle không?', opts: ['Có, driver tự quay về tab gốc', 'Không, cần switchTo().window(handle)', 'Có, vì close() cũng đóng driver', 'Không, mọi tab đều bị đóng'], ans: 1, why: 'close() đóng cửa sổ hiện tại; driver không tự chọn cửa sổ khác. Bạn phải chuyển về handle còn mở.' },
  steps: [
    { t: 'Mở trang chủ', what: 'get() mở trang shop trong tab gốc.', why: 'Điểm bắt đầu.', how: 'Trình duyệt mở một tab.', impact: '1 tab đang mở.', line: 0, st: 'ok', fx: function (s) { s.vars.session = 'đang chạy'; } },
    { t: 'Click mở tab mới', what: 'Link "Chính sách" mở tab mới.', why: 'Mô phỏng tình huống thường gặp với link target="_blank".', how: 'Trình duyệt tạo tab mới và chuyển focus sang đó (người dùng thấy), nhưng driver vẫn điều khiển tab đang được chọn.', impact: '2 tab. Tab mới đang được hiển thị.', line: 1, st: 'ok', fx: function (s) { s.browser.tabs = [{ title: 'Shop', active: false }, { title: 'Chính sách', active: true }]; s.browser.url = '/policy'; s.browser.title = 'Chính sách'; } },
    { t: 'close() đóng tab hiện tại', what: 'Đóng tab Chính sách.', why: 'Dọn tab không cần thiết.', how: 'close() chỉ đóng cửa sổ hiện tại; session vẫn sống.', impact: 'Còn 1 tab (Shop). Session vẫn chạy.', line: 2, st: 'wait', fx: function (s) { s.browser.tabs = [{ title: 'Shop', active: true }]; s.browser.url = 'https://shop.example.com'; s.browser.title = 'Shop - Trang chủ'; s.exc = 'Chú ý: driver vẫn trỏ tới tab đã đóng. Cần switchTo() trước khi thao tác tiếp.'; } },
    { t: 'Chuyển về tab gốc', what: 'switchTo().window(handle) đưa driver về tab còn mở.', why: 'Sau khi đóng tab, cần chọn một cửa sổ đang tồn tại.', how: 'Driver chuyển ngữ cảnh sang handle đã lưu.', impact: 'Driver điều khiển đúng tab Shop; lỗi biến mất.', line: 2, st: 'ok', fx: function (s) { s.exc = null; s.vars.current = 'handle của tab Shop'; } },
    { t: 'quit() kết thúc phiên', what: 'Đóng mọi tab và kết thúc session.', why: 'Hoàn tất test và giải phóng tài nguyên.', how: 'quit() gửi lệnh kết thúc; mọi handle không còn hợp lệ.', impact: 'Trình duyệt đóng hoàn toàn; session = ended.', line: 3, st: 'ok', fx: function (s) { s.browser = { url: '—', title: 'Đã đóng', ctx: 'main', tabs: null }; s.vars.session = 'ended'; s.vars.current = '—'; } }
  ],
  takeaway: 'close() = đóng một cửa sổ, session còn sống. quit() = đóng tất cả và kết thúc session. Sau khi đóng một tab, luôn chuyển về handle còn mở.' });

/* ---------- Bài 3: Locators ---------- */
SIMS.push({ id: 'L3-E', lesson: 3, level: 'Dễ', title: 'Tìm nút Login bằng ID',
  scen: 'Trang đăng nhập có ô username, password và nút Login đều có id ổn định. Test điền và bấm đăng nhập.',
  code: ['driver.findElement(By.id("username")).sendKeys("qa_user");', 'driver.findElement(By.id("password")).sendKeys("Pass@123");', 'driver.findElement(By.id("login")).click();'],
  init: { browser: { url: 'https://shop.example.com/login', title: 'Đăng nhập', ctx: 'main', tabs: null }, dom: [E('username', 'input', 'Username', '', '#username'), E('password', 'input', 'Password', '', '#password'), E('login', 'button', 'Đăng nhập', '', '#login')], vars: {}, clock: null },
  steps: [
    { t: 'Tìm ô username bằng id', what: 'findElement(By.id("username")).', why: 'id là định danh duy nhất, tìm nhanh và ổn định.', how: 'Trình duyệt tìm phần tử có id="username" trong DOM.', impact: 'Ô username được chọn (viền xanh).', line: 0, st: 'run', fx: function (s) { F(s, 'username').c = 'hl'; } },
    { t: 'Gõ tên đăng nhập', what: 'sendKeys("qa_user").', why: 'Điền dữ liệu test.', how: 'Trình duyệt gõ chuỗi vào phần tử đã chọn.', impact: 'Ô username có "qa_user".', line: 0, st: 'ok', fx: function (s) { F(s, 'username').c = 'ok'; F(s, 'username').label = 'qa_user'; } },
    { t: 'Tìm ô password bằng id', what: 'Chọn #password.', why: 'Mỗi ô có locator riêng.', how: 'Tìm theo id="password".', impact: 'Ô password được chọn.', line: 1, st: 'run', fx: function (s) { F(s, 'password').c = 'hl'; } },
    { t: 'Gõ mật khẩu', what: 'sendKeys("Pass@123").', why: 'Điền mật khẩu test.', how: 'Gõ chuỗi vào ô password (hiển thị dạng che).', impact: 'Ô password đã có dữ liệu.', line: 1, st: 'ok', fx: function (s) { F(s, 'password').c = 'ok'; F(s, 'password').label = '••••••••'; } },
    { t: 'Bấm nút Login', what: 'findElement(By.id("login")).click().', why: 'Gửi biểu mẫu.', how: 'Trình duyệt bấm vào nút có id="login".', impact: 'Form được gửi; chuyển sang trang dashboard.', line: 2, st: 'ok', fx: function (s) { F(s, 'login').c = 'ok'; s.browser.url = '/dashboard'; s.browser.title = 'Dashboard'; s.dom = [E('hi', 'h2', 'Xin chào, qa_user', 'ok')]; } }
  ],
  takeaway: 'Locator là "địa chỉ" của phần tử. id là lựa chọn tốt nhất khi id duy nhất và ổn định.' });

SIMS.push({ id: 'L3-M1', lesson: 3, level: 'Trung bình', title: 'Nhiều phần tử cùng class: lấy nhầm nút',
  scen: 'Trang có ba nút cùng class "btn". Test dùng By.className("btn") và bấm nhầm nút đầu tiên.',
  code: ['WebElement btn = driver.findElement(By.className("btn"));', 'btn.click();  // nút nào được bấm?', '// Sửa: By.cssSelector("button.btn-login")'],
  init: { browser: { url: 'https://shop.example.com/login', title: 'Đăng nhập', ctx: 'main', tabs: null }, dom: [E('b1', 'button', 'Hủy', '', 'class="btn"'), E('b2', 'button', 'Đăng nhập', '', 'class="btn btn-login"'), E('b3', 'button', 'Đăng ký', '', 'class="btn"')], vars: {}, clock: null },
  predict: { q: 'findElement(By.className("btn")) trả về phần tử nào khi có ba phần tử cùng class?', opts: ['Phần tử cuối cùng', 'Phần tử đầu tiên khớp trong DOM', 'Lỗi TooManyElements', 'Một danh sách'], ans: 1, why: 'findElement lấy phần tử đầu tiên khớp; không báo lỗi khi có nhiều phần tử khớp.' },
  steps: [
    { t: 'Tìm theo class "btn"', what: 'findElement(By.className("btn")).', why: 'Chọn nút đăng nhập bằng class chung.', how: 'Trình duyệt duyệt DOM theo thứ tự và lấy phần tử khớp đầu tiên.', impact: 'Nút "Hủy" bị chọn (không phải nút Đăng nhập).', line: 0, st: 'wait', fx: function (s) { F(s, 'b1').c = 'wait'; s.vars.picked = 'Hủy'; s.exc = null; } },
    { t: 'Kiểm tra: đúng nút chưa?', what: 'So sánh text của phần tử đã chọn với "Đăng nhập".', why: 'Phát hiện sớm lấy nhầm phần tử.', how: 'Đọc getText().', impact: 'Không khớp: đây là lỗi locator, không phải lỗi ứng dụng.', line: 1, st: 'err', fx: function (s) { F(s, 'b1').c = 'err'; s.exc = 'Sai phần tử: đã bấm "Hủy" thay vì "Đăng nhập".'; } },
    { t: 'Dùng locator cụ thể hơn', what: 'Thay bằng By.cssSelector("button.btn-login").', why: 'Kết hợp tag và class duy nhất.', how: 'Chỉ khớp nút có cả hai class.', impact: 'Chỉ còn một phần tử khớp: "Đăng nhập".', line: 2, st: 'run', fx: function (s) { s.exc = null; F(s, 'b1').c = 'off'; F(s, 'b3').c = 'off'; F(s, 'b2').c = 'hl'; s.vars.picked = 'Đăng nhập'; } },
    { t: 'Bấm đúng nút', what: 'click() trên nút Đăng nhập.', why: 'Mục tiêu của test.', how: 'Bấm phần tử đã xác định.', impact: 'Đúng hành động; test tiếp tục.', line: 2, st: 'ok', fx: function (s) { F(s, 'b2').c = 'ok'; } }
  ],
  takeaway: 'findElement không báo lỗi khi nhiều phần tử khớp; nó lấy cái đầu tiên. Luôn làm locator đủ cụ thể.' });

SIMS.push({ id: 'L3-M2', lesson: 3, level: 'Trung bình', title: 'ID động thay đổi sau mỗi lần tải trang',
  scen: 'Ô nhập có id tự sinh "input_8f2a" ở lần chạy đầu, rồi đổi thành "input_b19c" sau khi tải lại. Locator cũ bị lỗi.',
  code: ['driver.get("https://shop.example.com/register");', 'driver.findElement(By.id("input_8f2a")).sendKeys("qa@shop.vn"); // lỗi lần sau', '// Sửa: By.name("email") hoặc data-testid'],
  init: { browser: { url: 'https://shop.example.com/register', title: 'Đăng ký', ctx: 'main', tabs: null }, dom: [E('e', 'input', 'Email', '', 'id="input_8f2a" name="email"')], vars: {}, clock: null },
  steps: [
    { t: 'Lần chạy 1: tìm bằng id', what: 'By.id("input_8f2a").', why: 'Id được ghi trong script từ một lần quan sát.', how: 'Trình duyệt tìm id hiện có.', impact: 'Tìm thấy; test chạy tốt.', line: 1, st: 'ok', fx: function (s) { F(s, 'e').c = 'ok'; F(s, 'e').hint = 'id="input_8f2a"'; } },
    { t: 'Ứng dụng tạo lại id', what: 'Sau khi build/tải lại, id đổi thành "input_b19c".', why: 'Nhiều framework sinh id ngẫu nhiên mỗi lần render.', how: 'DOM mới có id khác, tên thuộc tính name vẫn giữ nguyên.', impact: 'Locator cũ không còn khớp.', line: 1, st: 'wait', fx: function (s) { F(s, 'e').c = 'wait'; F(s, 'e').hint = 'id="input_b19c"'; } },
    { t: 'Lần chạy 2: tìm bằng id cũ', what: 'By.id("input_8f2a") gửi tới trình duyệt.', why: 'Đây là điều gây lỗi.', how: 'Trình duyệt không tìm thấy id này.', impact: 'NoSuchElementException.', line: 1, st: 'err', fx: function (s) { F(s, 'e').c = 'err'; s.exc = 'NoSuchElementException: không có phần tử với id="input_8f2a".'; } },
    { t: 'Sửa: dùng thuộc tính ổn định', what: 'Dùng By.name("email") hoặc data-testid nếu có.', why: 'Thuộc tính có nghĩa ít đổi hơn id sinh tự động.', how: 'Tìm theo name hoặc attribute được thống nhất với lập trình viên.', impact: 'Tìm thấy ô email ở cả hai lần chạy.', line: 2, st: 'ok', fx: function (s) { s.exc = null; F(s, 'e').c = 'ok'; F(s, 'e').hint = 'name="email"'; } }
  ],
  takeaway: 'Không dùng id sinh ngẫu nhiên. Chọn thuộc tính ổn định, và nếu có thể, yêu cầu đội phát triển thêm data-testid.' });

/* ---------- Bài 4: XPath ---------- */
SIMS.push({ id: 'L4-E', lesson: 4, level: 'Dễ', title: 'Tìm nút theo text bằng XPath',
  scen: 'Nút không có id, nhưng có chữ "Đăng nhập". Dùng XPath để tìm theo text.',
  code: ['driver.findElement(By.xpath("//button[normalize-space()=\'Đăng nhập\']")).click();'],
  init: { browser: { url: 'https://shop.example.com/login', title: 'Đăng nhập', ctx: 'main', tabs: null }, dom: [E('h', 'button', 'Đăng ký', '', 'text: Đăng ký'), E('t', 'button', 'Đăng nhập', '', 'text: Đăng nhập')], vars: {}, clock: null },
  steps: [
    { t: 'Đọc biểu thức XPath', what: '//button[normalize-space()=...] — tìm nút ở bất kỳ đâu có text khớp.', why: 'Dấu // nghĩa là mọi vị trí trong cây.', how: 'normalize-space() bỏ khoảng trắng thừa trước khi so sánh.', impact: 'Driver có điều kiện tìm.', line: 0, st: 'run', fx: function (s) { s.vars.xpath = '//button[normalize-space()=\'Đăng nhập\']'; } },
    { t: 'Duyệt từng nút', what: 'Xét "Đăng ký" trước.', why: 'XPath so sánh từng node.', how: 'Text "Đăng ký" không khớp → bỏ qua.', impact: 'Không khớp.', line: 0, st: 'run', fx: function (s) { F(s, 't').c = ''; F(s, 'h').c = 'off'; } },
    { t: 'Tìm được nút "Đăng nhập"', what: 'Text khớp chính xác.', why: 'Đây là phần tử cần thao tác.', how: 'Driver trả về phần tử khớp.', impact: 'Nút được chọn (viền xanh).', line: 0, st: 'ok', fx: function (s) { F(s, 't').c = 'hl'; } },
    { t: 'Bấm nút', what: 'click().', why: 'Mục tiêu hành động.', how: 'Trình duyệt bấm phần tử.', impact: 'Form đăng nhập được gửi.', line: 0, st: 'ok', fx: function (s) { F(s, 't').c = 'ok'; s.browser.url = '/dashboard'; } }
  ],
  takeaway: 'XPath có thể tìm theo text. Dùng normalize-space() để tránh lỗi do khoảng trắng.' });

SIMS.push({ id: 'L4-M1', lesson: 4, level: 'Trung bình', title: 'Đi từ cha xuống con và lên tổ tiên',
  scen: 'Có nhiều ô "Số lượng" trong các dòng sản phẩm. Cần chọn ô nằm trong dòng của sản phẩm "Áo thun".',
  code: ['//div[@class="row" and .//span[text()="Áo thun"]]//input[@class="qty"]', '// đi lên: ancestor::, đi xuống: descendant::, con: child::'],
  init: { browser: { url: 'https://shop.example.com/cart', title: 'Giỏ hàng', ctx: 'main', tabs: null }, dom: [E('r1', 'div.row', 'Áo thun', '', 'ancestor'), E('q1', 'input.qty', 'Số lượng: 1', '', 'descendant'), E('r2', 'div.row', 'Quần jean', ''), E('q2', 'input.qty', 'Số lượng: 1', '')], vars: {}, clock: null },
  steps: [
    { t: 'Tìm span có text "Áo thun"', what: 'Node đích nằm trong một hàng.', why: 'Đi từ dữ liệu đã biết tới phần tử cần thao tác.', how: '//span[text()="Áo thun"] tìm node text.', impact: 'Tìm thấy span trong hàng 1.', line: 0, st: 'run', fx: function (s) { F(s, 'r1').c = 'hl'; F(s, 'r1').hint = 'chứa span Áo thun'; } },
    { t: 'Đi lên ancestor::div (hàng)', what: 'Từ span đi lên tới div.row.', why: 'Cần đúng hàng chứa sản phẩm.', how: 'Trục ancestor:: đi ngược lên tổ tiên.', impact: 'Đã xác định hàng "Áo thun".', line: 0, st: 'run', fx: function (s) { F(s, 'r1').c = 'ok'; F(s, 'r1').hint = 'ancestor::div.row'; } },
    { t: 'Đi xuống descendant::input', what: 'Từ hàng xuống ô input.qty.', why: 'Ô số lượng là hậu duệ của hàng.', how: '//input[@class="qty"] trong ngữ cảnh hàng; trục descendant:: đi xuống nhiều cấp.', impact: 'Chọn đúng ô số lượng của Áo thun.', line: 0, st: 'ok', fx: function (s) { F(s, 'q1').c = 'hl'; F(s, 'q1').hint = 'descendant::input'; } },
    { t: 'Kiểm tra hàng khác không bị chọn', what: 'Ô số lượng của Quần jean không khớp.', why: 'Tránh thao tác nhầm dữ liệu.', how: 'Điều kiện ràng buộc trong ngoặc giữ kết quả đúng.', impact: 'Chỉ một ô được chọn.', line: 1, st: 'ok', fx: function (s) { F(s, 'q2').c = 'off'; F(s, 'q2').hint = 'không khớp'; } }
  ],
  takeaway: 'XPath đi được cả hai chiều: ancestor:: lên, descendant:: và child:: xuống. Điều này giúp chọn đúng phần tử trong một hàng dữ liệu.' });

SIMS.push({ id: 'L4-M2', lesson: 4, level: 'Trung bình', title: 'Tìm ô nhập sau nhãn bằng following-sibling',
  scen: 'Các nhãn "Mật khẩu" và ô nhập không có id. Ô nhập nằm ngay sau nhãn cùng cấp.',
  code: ['driver.findElement(By.xpath("//label[text()=\'Mật khẩu\']/following-sibling::input")).sendKeys("Pass@123");'],
  init: { browser: { url: 'https://shop.example.com/register', title: 'Đăng ký', ctx: 'main', tabs: null }, dom: [E('l1', 'label', 'Email'), E('i1', 'input', 'ô email', ''), E('l2', 'label', 'Mật khẩu'), E('i2', 'input', 'ô mật khẩu', '')], vars: {}, clock: null },
  predict: { q: 'following-sibling::input có tìm ô nhập nằm TRƯỚC nhãn không?', opts: ['Có', 'Không, chỉ các anh em đứng sau', 'Chỉ khi có id', 'Chỉ trong thẻ form'], ans: 1, why: 'following-sibling:: chỉ lấy các node cùng cha đứng sau node hiện tại.' },
  steps: [
    { t: 'Tìm nhãn "Mật khẩu"', what: 'label[text()="Mật khẩu"] là điểm xuất phát.', why: 'Nhãn có text rõ ràng.', how: 'Driver tìm label có text khớp.', impact: 'Nhãn được chọn.', line: 0, st: 'run', fx: function (s) { F(s, 'l2').c = 'hl'; } },
    { t: 'Trục following-sibling', what: 'Xét các anh em đứng sau nhãn cùng cha.', why: 'Ô nhập đi kèm nhãn theo thứ tự HTML.', how: 'Node đầu tiên là input.', impact: 'Tìm thấy ô mật khẩu.', line: 0, st: 'run', fx: function (s) { F(s, 'i2').c = 'hl'; F(s, 'i2').hint = 'following-sibling::input'; } },
    { t: 'Điền dữ liệu', what: 'sendKeys("Pass@123").', why: 'Điền mật khẩu test.', how: 'Gõ vào phần tử đã chọn.', impact: 'Ô mật khẩu có giá trị.', line: 0, st: 'ok', fx: function (s) { F(s, 'i2').c = 'ok'; F(s, 'i2').label = '••••••••'; } },
    { t: 'Ô email không bị ảnh hưởng', what: 'Ô nhập email vẫn giữ nguyên.', why: 'Xác nhận locator đúng đích.', how: 'Biểu thức chỉ khớp anh em sau nhãn "Mật khẩu".', impact: 'Ô email trống; không thao tác nhầm.', line: 0, st: 'ok', fx: function (s) { F(s, 'i1').c = 'off'; } }
  ],
  takeaway: 'following-sibling:: là một trục XPath đi sang phải (anh em đứng sau). Hữu ích khi nhãn và ô nhập nằm cùng cấp.' });

/* ---------- Bài 5: CSS Selector ---------- */
SIMS.push({ id: 'L5-E', lesson: 5, level: 'Dễ', title: 'Chọn phần tử theo class',
  scen: 'Trang có nhiều nút; nút "Thêm vào giỏ" có class "btn-primary". Chọn bằng CSS selector.',
  code: ['driver.findElement(By.cssSelector(".btn-primary")).click();'],
  init: { browser: { url: 'https://shop.example.com/product/12', title: 'Sản phẩm', ctx: 'main', tabs: null }, dom: [E('a', 'button.btn-secondary', 'Xem thêm', ''), E('b', 'button.btn-primary', 'Thêm vào giỏ', '')], vars: { matches: 0 }, clock: null },
  steps: [
    { t: 'Đọc selector .btn-primary', what: 'Dấu chấm nghĩa là class.', why: 'Class là nhãn nhóm.', how: 'Driver so khớp thuộc tính class của từng phần tử.', impact: 'Đang đánh giá selector.', line: 0, st: 'run', fx: function (s) { s.vars.selector = '.btn-primary'; } },
    { t: 'Xét "Xem thêm"', what: 'Class btn-secondary không khớp.', why: 'Phải khớp đúng tên class.', how: 'So sánh tên class.', impact: 'Không khớp.', line: 0, st: 'run', fx: function (s) { F(s, 'a').c = 'off'; } },
    { t: 'Xét "Thêm vào giỏ"', what: 'Class btn-primary khớp.', why: 'Đây là đích.', how: 'Phần tử được chọn.', impact: 'Đếm khớp = 1.', line: 0, st: 'ok', fx: function (s) { F(s, 'b').c = 'hl'; s.vars.matches = 1; } },
    { t: 'Bấm nút', what: 'click().', why: 'Hành động của test.', how: 'Bấm phần tử đã chọn.', impact: 'Sản phẩm được thêm vào giỏ.', line: 0, st: 'ok', fx: function (s) { F(s, 'b').c = 'ok'; s.dom.push(E('cart', 'span', 'Giỏ: 1 sản phẩm', 'ok')); } }
  ],
  takeaway: '.class khớp mọi phần tử có class đó. Nếu cần chính xác hơn, thêm tag hoặc thuộc tính.' });

SIMS.push({ id: 'L5-M1', lesson: 5, level: 'Trung bình', title: 'Selector theo thuộc tính',
  scen: 'Trang có hai ô: "Email" (type=email) và "Mã giảm giá" (type=text). Chọn đúng ô email bằng thuộc tính.',
  code: ['driver.findElement(By.cssSelector("input[type=\'email\']")).sendKeys("qa@shop.vn");', '// Không dùng: input  (khớp cả hai ô)'],
  init: { browser: { url: 'https://shop.example.com/checkout', title: 'Thanh toán', ctx: 'main', tabs: null }, dom: [E('e', 'input[type=email]', 'Email', ''), E('c', 'input[type=text]', 'Mã giảm giá', '')], vars: { matches: 2 }, clock: null },
  steps: [
    { t: 'Thử selector "input" (quá rộng)', what: 'Chọn mọi thẻ input.', why: 'Đây là lỗi thường gặp: locator quá chung.', how: 'Driver khớp cả hai ô.', impact: 'Khớp 2 phần tử; findElement lấy ô đầu.', line: 1, st: 'wait', fx: function (s) { s.vars.matches = 2; } },
    { t: 'Thêm điều kiện [type="email"]', what: 'Selector input[type=\'email\'].', why: 'Thuộc tính type phân biệt hai ô.', how: 'Chỉ so khớp thuộc tính type.', impact: 'Khớp 1 phần tử.', line: 0, st: 'run', fx: function (s) { F(s, 'c').c = 'off'; F(s, 'e').c = 'hl'; s.vars.matches = 1; } },
    { t: 'Nhập email', what: 'sendKeys("qa@shop.vn").', why: 'Thao tác đúng ô.', how: 'Gõ vào ô đã chọn.', impact: 'Ô email có dữ liệu; ô mã giảm giá vẫn trống.', line: 0, st: 'ok', fx: function (s) { F(s, 'e').c = 'ok'; F(s, 'e').label = 'qa@shop.vn'; } }
  ],
  takeaway: 'Thuộc tính trong [ ] giúp phân biệt phần tử cùng tag. Selector ngắn nhưng đủ điều kiện là tốt nhất.' });

SIMS.push({ id: 'L5-M2', lesson: 5, level: 'Trung bình', title: 'Kết hợp selector để thu hẹp dần',
  scen: 'Trang đăng nhập có nhiều input. Cần chọn ô mật khẩu nằm trong form có id "login".',
  code: ['driver.findElement(By.cssSelector("form#login input.form-control[type=\'password\']"));'],
  init: { browser: { url: 'https://shop.example.com/login', title: 'Đăng nhập', ctx: 'main', tabs: null }, dom: [E('p1', 'input[type=password]', 'Mật khẩu (form#login)', ''), E('p2', 'input[type=password]', 'Mật khẩu (form#signup)', ''), E('u1', 'input.form-control', 'Username (form#login)', '')], vars: { candidates: 3 }, clock: null },
  steps: [
    { t: 'Bước 1: tất cả input', what: 'Selector input thô.', why: 'Điểm bắt đầu.', how: 'Khớp 3 phần tử.', impact: 'candidates = 3.', line: 0, st: 'run', fx: function (s) { s.vars.candidates = 3; } },
    { t: 'Bước 2: thêm form#login', what: 'Chỉ input nằm trong form có id login.', why: 'Loại bỏ form đăng ký.', how: 'Quan hệ hậu duệ trong CSS.', impact: 'Còn 2 phần tử (username và password của login).', line: 0, st: 'run', fx: function (s) { F(s, 'p2').c = 'off'; s.vars.candidates = 2; } },
    { t: 'Bước 3: thêm class và type', what: 'input.form-control[type=\'password\'].', why: 'Chỉ giữ ô password.', how: 'Các điều kiện phải đồng thời đúng (AND).', impact: 'Còn đúng 1 phần tử.', line: 0, st: 'ok', fx: function (s) { F(s, 'u1').c = 'off'; F(s, 'p1').c = 'hl'; s.vars.candidates = 1; } },
    { t: 'Điền mật khẩu', what: 'sendKeys vào ô đã chọn.', why: 'Hành động đúng đích.', how: 'Gõ vào phần tử.', impact: 'Ô password của form login có dữ liệu.', line: 0, st: 'ok', fx: function (s) { F(s, 'p1').c = 'ok'; F(s, 'p1').label = '••••••••'; } }
  ],
  takeaway: 'Các điều kiện trong một selector được áp dụng cùng lúc (AND). Càng thêm điều kiện, số phần tử khớp càng ít.' });

/* ---------- Bài 6: findElement / findElements ---------- */
SIMS.push({ id: 'L6-E', lesson: 6, level: 'Dễ', title: 'Tìm một nút bằng findElement',
  scen: 'Trang sản phẩm có nút "Thêm vào giỏ" với id "add-cart". Lấy nút đó bằng findElement.',
  code: ['WebElement addBtn = driver.findElement(By.id("add-cart"));', 'addBtn.click();'],
  init: { browser: { url: 'https://shop.example.com/product/12', title: 'Sản phẩm', ctx: 'main', tabs: null }, dom: [E('add', 'button', 'Thêm vào giỏ', '', '#add-cart')], vars: {}, clock: null },
  steps: [
    { t: 'findElement tìm #add-cart', what: 'Trả về đúng một WebElement.', why: 'Chỉ cần một nút.', how: 'Driver lấy phần tử khớp đầu tiên.', impact: 'Biến addBtn trỏ tới nút.', line: 0, st: 'ok', fx: function (s) { F(s, 'add').c = 'hl'; s.vars.addBtn = 'WebElement (1 phần tử)'; } },
    { t: 'Bấm nút', what: 'click().', why: 'Thêm sản phẩm.', how: 'Bấm phần tử đã chọn.', impact: 'Giỏ hàng tăng 1.', line: 1, st: 'ok', fx: function (s) { F(s, 'add').c = 'ok'; s.dom.push(E('cart', 'span', 'Giỏ: 1 sản phẩm', 'ok')); } }
  ],
  takeaway: 'findElement dùng khi bạn chắc chắn chỉ có một phần tử phù hợp.' });

SIMS.push({ id: 'L6-M1', lesson: 6, level: 'Trung bình', title: 'Đếm sản phẩm bằng findElements',
  scen: 'Trang danh sách có 6 thẻ sản phẩm cùng class "product-card". Test cần đếm số lượng.',
  code: ['List<WebElement> cards = driver.findElements(By.cssSelector(".product-card"));', 'int count = cards.size();', 'System.out.println(count);'],
  init: { browser: { url: 'https://shop.example.com/products', title: 'Danh sách', ctx: 'main', tabs: null }, dom: [1, 2, 3, 4, 5, 6].map(function (i) { return E('p' + i, 'div.product-card', 'Sản phẩm ' + i, ''); }), vars: {}, clock: null },
  steps: [
    { t: 'findElements tìm tất cả .product-card', what: 'Trả về List<WebElement>.', why: 'Cần đếm và duyệt.', how: 'Driver quét toàn bộ DOM, gom mọi phần tử khớp.', impact: 'Danh sách có 6 phần tử.', line: 0, st: 'run', fx: function (s) { s.dom.forEach(function (e) { e.c = 'hl'; }); s.vars.cards = 'List (6 phần tử)'; } },
    { t: 'Đếm kích thước danh sách', what: 'cards.size().', why: 'Kiểm tra số lượng sản phẩm.', how: 'Java đếm phần tử của List.', impact: 'count = 6.', line: 1, st: 'ok', fx: function (s) { s.dom.forEach(function (e) { e.c = 'ok'; }); s.vars.count = 6; } },
    { t: 'In kết quả', what: 'In count ra console.', why: 'Quan sát giá trị.', how: 'Java in số nguyên.', impact: 'Console: 6.', line: 2, st: 'ok', fx: function (s) { s.vars.console = '6'; } }
  ],
  takeaway: 'findElements trả về List, không ném lỗi nếu không có phần tử; size() là cách đếm số lượng.' });

SIMS.push({ id: 'L6-M2', lesson: 6, level: 'Trung bình', title: 'Không có phần tử: findElements rỗng, findElement lỗi',
  scen: 'Trang không có banner khuyến mãi (id "promo"). Test kiểm tra banner có hiện không theo hai cách.',
  code: ['List<WebElement> promos = driver.findElements(By.id("promo"));', 'boolean hasPromo = promos.size() > 0;', 'WebElement p = driver.findElement(By.id("promo")); // ném NoSuchElementException'],
  init: { browser: { url: 'https://shop.example.com/', title: 'Trang chủ', ctx: 'main', tabs: null }, dom: [E('x', 'div#promo', 'Banner (không có trên trang)', 'gone')], vars: {}, clock: null },
  predict: { q: 'findElements(By.id("promo")) khi không có phần tử sẽ trả về gì?', opts: ['null', 'Danh sách rỗng', 'Ném NoSuchElementException', 'Danh sách có một phần tử rỗng'], ans: 1, why: 'findElements trả về List rỗng; findElement mới ném NoSuchElementException.' },
  steps: [
    { t: 'findElements tìm #promo', what: 'Không có phần tử nào khớp.', why: 'Kiểm tra sự tồn tại an toàn.', how: 'Driver trả về danh sách rỗng.', impact: 'promos = [] (không lỗi).', line: 0, st: 'ok', fx: function (s) { s.vars.promos = '[]  (rỗng)'; } },
    { t: 'Kiểm tra size()', what: 'promos.size() > 0 là false.', why: 'Kết quả hợp lệ: không có banner.', how: 'So sánh số phần tử.', impact: 'hasPromo = false.', line: 1, st: 'ok', fx: function (s) { s.vars.hasPromo = false; } },
    { t: 'findElement tìm #promo', what: 'Yêu cầu một phần tử duy nhất.', why: 'So sánh hành vi.', how: 'Không có phần tử → lỗi.', impact: 'NoSuchElementException được ném.', line: 2, st: 'err', fx: function (s) { s.exc = 'NoSuchElementException: Unable to locate element: #promo'; } },
    { t: 'Bắt lỗi đúng cách', what: 'Dùng findElements().isEmpty() khi chỉ cần kiểm tra.', why: 'Tránh ngoại lệ không cần thiết.', how: 'Kiểm tra danh sách rỗng.', impact: 'Test đi tiếp, không lỗi.', line: 1, st: 'ok', fx: function (s) { s.exc = null; } }
  ],
  takeaway: 'Để kiểm tra "có hay không", dùng findElements. findElement dành cho khi phần tử bắt buộc phải có.' });

/* ---------- Bài 7: WebElement ---------- */
SIMS.push({ id: 'L7-E', lesson: 7, level: 'Dễ', title: 'Nhập email và bấm gửi',
  scen: 'Form nhận đăng ký nhận tin. Nhập email rồi bấm gửi, kiểm tra thông báo.',
  code: ['WebElement email = driver.findElement(By.id("email"));', 'email.clear();', 'email.sendKeys("qa@shop.vn");', 'driver.findElement(By.id("send")).click();', 'String msg = driver.findElement(By.id("msg")).getText();'],
  init: { browser: { url: 'https://shop.example.com/newsletter', title: 'Nhận tin', ctx: 'main', tabs: null }, dom: [E('email', 'input', 'Email', '', '#email'), E('send', 'button', 'Gửi', '', '#send'), E('msg', 'p', '', '', '#msg')], vars: {}, clock: null },
  steps: [
    { t: 'Tìm ô email', what: 'findElement(By.id("email")).', why: 'Cần tham chiếu để thao tác.', how: 'Trình duyệt trả phần tử.', impact: 'Ô email được chọn.', line: 0, st: 'run', fx: function (s) { F(s, 'email').c = 'hl'; } },
    { t: 'clear()', what: 'Xóa nội dung cũ trong ô.', why: 'Tránh nối thêm vào dữ liệu cũ.', how: 'Trình duyệt xóa giá trị.', impact: 'Ô email trống.', line: 1, st: 'ok', fx: function (s) { F(s, 'email').label = ''; } },
    { t: 'sendKeys("qa@shop.vn")', what: 'Gõ email vào ô.', why: 'Dữ liệu test.', how: 'Gõ từng ký tự.', impact: 'Ô email chứa "qa@shop.vn".', line: 2, st: 'ok', fx: function (s) { F(s, 'email').label = 'qa@shop.vn'; } },
    { t: 'click() nút Gửi', what: 'Bấm nút gửi.', why: 'Gửi biểu mẫu.', how: 'Trình duyệt bấm nút.', impact: 'Form được gửi.', line: 3, st: 'ok', fx: function (s) { F(s, 'send').c = 'ok'; F(s, 'msg').label = 'Cảm ơn bạn đã đăng ký!'; F(s, 'msg').c = 'ok'; } },
    { t: 'getText() đọc thông báo', what: 'Lấy chữ hiển thị của #msg.', why: 'Xác nhận kết quả.', how: 'Đọc text hiển thị.', impact: 'msg = "Cảm ơn bạn đã đăng ký!"', line: 4, st: 'ok', fx: function (s) { s.vars.msg = 'Cảm ơn bạn đã đăng ký!'; } }
  ],
  takeaway: 'Luồng chuẩn: tìm → clear → sendKeys → click → đọc kết quả bằng getText.' });

SIMS.push({ id: 'L7-M1', lesson: 7, level: 'Trung bình', title: 'Nút bị disable: bấm không có tác dụng',
  scen: 'Nút "Thanh toán" bị disable khi giỏ hàng trống. Test cố bấm và kiểm tra trạng thái.',
  code: ['WebElement pay = driver.findElement(By.id("pay"));', 'boolean enabled = pay.isEnabled();', 'if (enabled) { pay.click(); }'],
  init: { browser: { url: 'https://shop.example.com/cart', title: 'Giỏ hàng', ctx: 'main', tabs: null }, dom: [E('pay', 'button[disabled]', 'Thanh toán', 'off', 'isEnabled = false')], vars: { enabled: null }, clock: null },
  predict: { q: 'Nút disabled có được click không?', opts: ['Có, click luôn thành công', 'Không, trạng thái disabled chặn tương tác', 'Có, nhưng gây lỗi JS', 'Chỉ bấm được bằng JavaScript'], ans: 1, why: 'Phần tử disabled không nhận được thao tác người dùng; test nên kiểm tra isEnabled trước.' },
  steps: [
    { t: 'Tìm nút Thanh toán', what: 'findElement(By.id("pay")).', why: 'Có tham chiếu để kiểm tra.', how: 'Trình duyệt trả phần tử.', impact: 'Nút xuất hiện ở trạng thái mờ.', line: 0, st: 'run', fx: function (s) { F(s, 'pay').c = 'hl off'; } },
    { t: 'isEnabled() kiểm tra', what: 'Hỏi phần tử có được phép thao tác không.', why: 'Biết trước để không thao tác vô ích.', how: 'Driver trả về false vì thuộc tính disabled.', impact: 'enabled = false.', line: 1, st: 'wait', fx: function (s) { s.vars.enabled = false; F(s, 'pay').c = 'wait off'; } },
    { t: 'Bỏ qua click', what: 'Không gọi click() vì điều kiện sai.', why: 'Tránh test fail vì lỗi giả.', how: 'Câu if chặn lệnh click.', impact: 'Không có tương tác; kết quả: không chuyển trang.', line: 2, st: 'ok', fx: function (s) { F(s, 'pay').c = 'off'; s.vars.clicked = false; } },
    { t: 'Ghi nhận đây là kết quả đúng', what: 'Test nên kiểm tra nút disabled như một yêu cầu nghiệp vụ.', why: 'Đôi khi việc nút bị khóa chính là điều cần kiểm thử.', how: 'Assert isEnabled() == false.', impact: 'Test pass khi đúng quy tắc: giỏ trống thì không thanh toán được.', line: 1, st: 'ok', fx: function (s) { s.vars.assert = 'isEnabled == false ✓'; } }
  ],
  takeaway: 'Kiểm tra isEnabled trước khi thao tác. Nếu trạng thái disabled là yêu cầu nghiệp vụ, hãy assert nó.' });

SIMS.push({ id: 'L7-M2', lesson: 7, level: 'Trung bình', title: 'getText khác getAttribute và getDomAttribute',
  scen: 'Một liên kết có chữ "Chi tiết", href="/order/88" và data-id="88". Test cần đọc chữ, đường dẫn và mã đơn.',
  code: ['WebElement link = driver.findElement(By.linkText("Chi tiết"));', 'String text = link.getText();', 'String href = link.getAttribute("href");', 'String dataId = link.getDomAttribute("data-id");'],
  init: { browser: { url: 'https://shop.example.com/orders', title: 'Đơn hàng', ctx: 'main', tabs: null }, dom: [E('l', 'a', 'Chi tiết', 'hl', 'href="/order/88" data-id="88"')], vars: {}, clock: null },
  steps: [
    { t: 'Tìm liên kết theo chữ', what: 'By.linkText("Chi tiết").', why: 'Chọn đúng link.', how: 'Tìm thẻ a có text khớp.', impact: 'Link được chọn.', line: 0, st: 'run', fx: function (s) { s.vars.link = 'WebElement <a>'; } },
    { t: 'getText()', what: 'Lấy chữ hiển thị cho người dùng.', why: 'Kiểm tra nội dung đúng.', how: 'Đọc text đang render.', impact: 'text = "Chi tiết".', line: 1, st: 'ok', fx: function (s) { s.vars.text = 'Chi tiết'; } },
    { t: 'getAttribute("href")', what: 'Lấy giá trị thuộc tính href.', why: 'Kiểm tra đường dẫn đúng.', how: 'Driver trả về property/attribute "href" (đã chuẩn hóa thành URL đầy đủ tùy trình duyệt).', impact: 'href = "/order/88" (hoặc URL đầy đủ tùy trình duyệt).', line: 2, st: 'ok', fx: function (s) { s.vars.href = '/order/88'; } },
    { t: 'getDomAttribute("data-id")', what: 'Đọc thuộc tính data-id như có trong DOM.', why: 'data-* là thuộc tính tùy chỉnh, dùng để lưu mã.', how: 'Driver trả về giá trị attribute trong DOM.', impact: 'dataId = "88".', line: 3, st: 'ok', fx: function (s) { s.vars.dataId = '88'; } }
  ],
  takeaway: 'getText = chữ nhìn thấy. getAttribute = giá trị thuộc tính/property (ưu tiên property nếu có). getDomAttribute = đọc attribute đúng như DOM.' });

/* ---------- Bài 8: Implicit Wait ---------- */
SIMS.push({ id: 'L8-E', lesson: 8, level: 'Dễ', title: 'Phần tử xuất hiện sau 3 giây',
  scen: 'Trang báo cáo tải chậm; phần tử #report xuất hiện sau 3 giây. Implicit wait đặt 10 giây.',
  code: ['driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));', 'driver.get("https://shop.example.com/report");', 'WebElement r = driver.findElement(By.id("report"));'],
  init: { browser: { url: 'about:blank', title: '', ctx: 'main', tabs: null }, dom: [], vars: { implicit: '0s' }, clock: { now: 0, limit: 10, max: 12, label: 'implicit wait 10s' } },
  predict: { q: 'Với implicit wait 10 giây, phần tử xuất hiện sau 3 giây, findElement sẽ trả về khi nào?', opts: ['Sau đúng 10 giây', 'Ngay khi phần tử xuất hiện (≈3 giây)', 'Sau 13 giây', 'Ngay lập tức, không chờ'], ans: 1, why: 'Implicit wait là thời gian tối đa; driver trả về ngay khi tìm thấy phần tử.' },
  steps: [
    { t: 'Đặt implicit wait 10s', what: 'Cấu hình thời gian chờ ngầm cho session.', why: 'Mọi lần tìm phần tử sẽ dùng cấu hình này.', how: 'Lệnh implicitlyWait ghi vào session.', impact: 'implicit = 10s.', line: 0, st: 'ok', fx: function (s) { s.vars.implicit = '10s'; } },
    { t: 'Mở trang báo cáo', what: 'get() tải trang.', why: 'Trang có phần tử đang tải.', how: 'Trình duyệt tải trang.', impact: 'Trang mở; báo cáo chưa hiện.', line: 1, st: 'run', dt: 1, fx: function (s) { s.browser.url = '/report'; s.browser.title = 'Báo cáo'; s.dom = [E('spin', 'div', 'Đang tải báo cáo...', 'wait')]; s.clock.now = 1; } },
    { t: 'Tìm #report (lần 1 — chưa có)', what: 'driver thử tìm nhưng chưa thấy.', why: 'Implicit wait sẽ thử lại thay vì lỗi ngay.', how: 'Driver chờ và thử lại liên tục.', impact: 'Vẫn chờ trong phạm vi 10 giây.', line: 2, st: 'wait', dt: 1, fx: function (s) { s.clock.now = 2; s.exc = null; } },
    { t: 'Phần tử #report xuất hiện', what: 'Báo cáo đã render sau khoảng 3 giây.', why: 'Đây là lúc driver tìm thấy.', how: 'Lần thử tiếp theo tìm được phần tử.', impact: 'Driver trả về phần tử ngay, không chờ thêm 7 giây.', line: 2, st: 'ok', dt: 1, fx: function (s) { s.clock.now = 3; s.dom = [E('report', 'div#report', 'Doanh thu: 12.500.000đ', 'ok')]; } },
    { t: 'Kết quả', what: 'r trỏ tới phần tử báo cáo.', why: 'Test tiếp tục.', how: 'Biến được gán.', impact: 'Thời gian chờ thực tế = 3s (không phải 10s).', line: 2, st: 'ok', fx: function (s) { s.vars.r = 'WebElement#report'; s.clock.label = 'thực tế 3s / tối đa 10s'; } }
  ],
  takeaway: 'Implicit wait là timeout tối đa, không phải thời gian bắt buộc. Driver trả về ngay khi tìm thấy.' });

SIMS.push({ id: 'L8-M1', lesson: 8, level: 'Trung bình', title: 'Nhiều lần tìm kiếm: thời gian cộng dồn',
  scen: 'Trang có ba phần tử xuất hiện lần lượt, mỗi cái sau 2 giây. Mỗi lần findElement đều áp dụng implicit wait.',
  code: ['driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));', 'driver.findElement(By.id("a")); // ~2s', 'driver.findElement(By.id("b")); // ~2s', 'driver.findElement(By.id("c")); // ~2s'],
  init: { browser: { url: 'https://shop.example.com/wizard', title: 'Wizard', ctx: 'main', tabs: null }, dom: [E('a', 'div#a', 'Bước 1', ''), E('b', 'div#b', 'Bước 2', ''), E('c', 'div#c', 'Bước 3', '')], vars: { total: 0 }, clock: { now: 0, limit: 15, max: 15, label: '3 lần tìm (mỗi lần ≤5s)' } },
  steps: [
    { t: 'Tìm #a (chờ ~2s)', what: 'Lần tìm đầu tiên.', why: 'Implicit wait áp dụng cho từng lần tìm.', how: 'Driver chờ đến khi #a xuất hiện.', impact: 'Đã trôi 2s.', line: 1, st: 'run', dt: 2, fx: function (s) { s.clock.now = 2; F(s, 'a').c = 'ok'; s.vars.total = 2; } },
    { t: 'Tìm #b (chờ ~2s)', what: 'Lần tìm thứ hai.', why: 'Mỗi lần có thời gian chờ riêng.', how: 'Chờ tiếp đến khi #b xuất hiện.', impact: 'Đã trôi 4s.', line: 2, st: 'run', dt: 2, fx: function (s) { s.clock.now = 4; F(s, 'b').c = 'ok'; s.vars.total = 4; } },
    { t: 'Tìm #c (chờ ~2s)', what: 'Lần tìm thứ ba.', why: 'Tiếp tục theo chuỗi thao tác.', how: 'Chờ tiếp đến khi #c xuất hiện.', impact: 'Đã trôi 6s tổng cộng.', line: 3, st: 'ok', dt: 2, fx: function (s) { s.clock.now = 6; F(s, 'c').c = 'ok'; s.vars.total = 6; } },
    { t: 'Tổng hợp', what: 'Các lần chờ cộng lại thành tổng thời gian test.', why: 'Nếu có nhiều lần tìm chậm, test có thể chậm đáng kể.', how: 'Mỗi lần findElement là một lần chờ độc lập.', impact: 'Tổng thời gian ≈ 6s; không phải một lần 5s.', line: 3, st: 'ok', fx: function (s) { s.vars.total = '6s'; s.clock.label = 'tổng cộng 6s'; } }
  ],
  takeaway: 'Implicit wait áp dụng cho từng lần tìm. Nhiều lần tìm chậm sẽ cộng dồn thời gian thực tế.' });

SIMS.push({ id: 'L8-M2', lesson: 8, level: 'Trung bình', title: 'Không có phần tử: hết implicit wait thì báo lỗi',
  scen: 'Phần tử #error-banner không bao giờ xuất hiện. Implicit wait đặt 5 giây.',
  code: ['driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));', 'driver.findElement(By.id("error-banner"));  // không bao giờ có'],
  init: { browser: { url: 'https://shop.example.com/pay', title: 'Thanh toán', ctx: 'main', tabs: null }, dom: [], vars: {}, clock: { now: 0, limit: 5, max: 6, label: 'implicit 5s' } },
  predict: { q: 'Sau khi hết implicit wait mà vẫn không có phần tử, điều gì xảy ra?', opts: ['Trả về null', 'Trả về danh sách rỗng', 'Ném NoSuchElementException', 'Test tự động pass'], ans: 2, why: 'findElement ném NoSuchElementException khi không tìm thấy sau khi hết thời gian chờ.' },
  steps: [
    { t: 'Bắt đầu tìm #error-banner', what: 'findElement với implicit 5s.', why: 'Driver bắt đầu chờ.', how: 'Thử lại liên tục trong 5 giây.', impact: 'Đang chờ.', line: 1, st: 'wait', dt: 2, fx: function (s) { s.clock.now = 2; s.vars.status = 'đang tìm...'; } },
    { t: 'Đến giới hạn 5 giây', what: 'Hết thời gian chờ ngầm.', why: 'Không chờ mãi mãi.', how: 'Driver dừng việc thử lại.', impact: 'Vẫn chưa thấy phần tử.', line: 1, st: 'wait', dt: 3, fx: function (s) { s.clock.now = 5; } },
    { t: 'Ném NoSuchElementException', what: 'Lỗi được ném ra cho test.', why: 'Báo cho người viết test biết phần tử không có.', how: 'Ngoại lệ bay lên khỏi dòng findElement.', impact: 'Test fail tại dòng này.', line: 1, st: 'err', fx: function (s) { s.exc = 'NoSuchElementException: no such element: #error-banner'; s.vars.status = 'thất bại'; } },
    { t: 'Phân tích nguyên nhân', what: 'Kiểm tra: lỗi có đúng không, hay trang chưa tới bước hiện banner?', why: 'Không phải lúc nào cũng là lỗi ứng dụng.', how: 'Kiểm tra dữ liệu đầu vào hoặc điều kiện trước đó.', impact: 'Nếu đúng là bug: báo cáo. Nếu không: sửa kịch bản.', line: 1, st: 'ok', fx: function (s) { s.exc = null; s.vars.status = 'đã phân tích'; } }
  ],
  takeaway: 'Hết implicit wait mà không có phần tử → NoSuchElementException. Lỗi này không tự biến mất nếu bạn chỉ tăng wait mà không hiểu nguyên nhân.' });

/* ---------- Bài 9: Explicit Wait ---------- */
SIMS.push({ id: 'L9-E', lesson: 9, level: 'Dễ', title: 'Chờ nút Login sẵn sàng bấm',
  scen: 'Nút Login được kích hoạt sau khi script tải xong (khoảng 2 giây). Chờ điều kiện elementToBeClickable.',
  code: ['WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));', 'WebElement login = wait.until(ExpectedConditions.elementToBeClickable(By.id("login")));', 'login.click();'],
  init: { browser: { url: 'https://shop.example.com/login', title: 'Đăng nhập', ctx: 'main', tabs: null }, dom: [E('login', 'button#login', 'Đăng nhập (đang khóa)', 'off')], vars: {}, clock: { now: 0, limit: 5, max: 6, label: 'explicit 5s' } },
  steps: [
    { t: 'Tạo WebDriverWait 5s', what: 'Bộ chờ với timeout 5 giây.', why: 'Giới hạn thời gian cho điều kiện.', how: 'WebDriverWait dùng polling mặc định.', impact: 'Bộ chờ sẵn sàng.', line: 0, st: 'ok', fx: function (s) { s.vars.wait = '5s'; } },
    { t: 'Kiểm tra điều kiện lần 1', what: 'elementToBeClickable: nút chưa enabled.', why: 'Điều kiện chưa đạt.', how: 'Kết quả chưa có giá trị → tiếp tục chờ.', impact: 'Đang chờ.', line: 1, st: 'wait', dt: 1, fx: function (s) { s.clock.now = 1; } },
    { t: 'Kiểm tra lần 2', what: 'Nút vẫn chưa sẵn sàng.', why: 'Script trang chưa chạy xong.', how: 'Tiếp tục polling.', impact: 'Đang chờ.', line: 1, st: 'wait', dt: 1, fx: function (s) { s.clock.now = 2; } },
    { t: 'Điều kiện đạt', what: 'Nút đã hiển thị, enabled và có thể bấm.', why: 'Chỉ khi đó mới an toàn click.', how: 'wait.until trả về phần tử.', impact: 'login trỏ tới nút đã sẵn sàng.', line: 1, st: 'ok', dt: 0, fx: function (s) { F(s, 'login').c = 'ok'; F(s, 'login').label = 'Đăng nhập (sẵn sàng)'; s.vars.login = 'WebElement#login'; } },
    { t: 'click()', what: 'Bấm nút.', why: 'Mục tiêu của test.', how: 'Trình duyệt bấm.', impact: 'Đăng nhập thành công.', line: 2, st: 'ok', fx: function (s) { s.browser.url = '/dashboard'; } }
  ],
  takeaway: 'Explicit wait chờ đúng điều kiện. Điều kiện càng cụ thể, test càng ổn định.' });

SIMS.push({ id: 'L9-M1', lesson: 9, level: 'Trung bình', title: 'Nút Thanh toán bị disable đến khi giỏ có hàng',
  scen: 'Nút "Thanh toán" chỉ được bật sau khi giỏ hàng có sản phẩm (sau một lần gọi AJAX).',
  code: ['wait.until(ExpectedConditions.elementToBeClickable(By.id("checkout")));', 'driver.findElement(By.id("checkout")).click();'],
  init: { browser: { url: 'https://shop.example.com/cart', title: 'Giỏ hàng', ctx: 'main', tabs: null }, dom: [E('cart', 'span', 'Giỏ: 0 sản phẩm', 'wait'), E('co', 'button#checkout', 'Thanh toán (disabled)', 'off')], vars: { cartCount: 0 }, clock: { now: 0, limit: 8, max: 8, label: 'explicit 8s' } },
  steps: [
    { t: 'Chờ nút clickable', what: 'Bắt đầu chờ #checkout.', why: 'Nút đang disabled, không thể bấm ngay.', how: 'Polling kiểm tra enabled.', impact: 'Đang chờ.', line: 0, st: 'wait', dt: 1, fx: function (s) { s.clock.now = 1; } },
    { t: 'Người dùng thêm sản phẩm (AJAX)', what: 'Giỏ hàng cập nhật thành 1.', why: 'Điều kiện nghiệp vụ thay đổi.', how: 'Ứng dụng cập nhật DOM và trạng thái nút.', impact: 'Giỏ có 1 sản phẩm.', line: 0, st: 'wait', dt: 2, fx: function (s) { s.clock.now = 3; s.vars.cartCount = 1; F(s, 'cart').label = 'Giỏ: 1 sản phẩm'; } },
    { t: 'Nút được bật', what: 'Nút enabled.', why: 'Điều kiện đạt.', how: 'Lần polling tiếp theo thấy nút enabled.', impact: 'Điều kiện đạt sau khoảng 3s.', line: 0, st: 'ok', dt: 1, fx: function (s) { s.clock.now = 4; F(s, 'co').c = 'ok'; F(s, 'co').label = 'Thanh toán'; F(s, 'cart').c = 'ok'; } },
    { t: 'Bấm Thanh toán', what: 'click() trên nút đã sẵn sàng.', why: 'Tiếp tục luồng mua hàng.', how: 'Trình duyệt bấm.', impact: 'Chuyển sang trang thanh toán.', line: 1, st: 'ok', fx: function (s) { s.browser.url = '/checkout'; s.browser.title = 'Thanh toán'; } }
  ],
  takeaway: 'Chờ điều kiện nghiệp vụ (nút bật) rồi mới thao tác. Không dùng sleep đoán thời gian.' });

SIMS.push({ id: 'L9-M2', lesson: 9, level: 'Trung bình', title: 'TimeoutException khi điều kiện đến quá muộn',
  scen: 'Thông báo "Đặt hàng thành công" xuất hiện sau 7 giây, nhưng test chỉ chờ tối đa 5 giây.',
  code: ['WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));', 'wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("success")));'],
  init: { browser: { url: 'https://shop.example.com/order', title: 'Đặt hàng', ctx: 'main', tabs: null }, dom: [E('ok', 'div#success', 'Đặt hàng thành công', 'off')], vars: {}, clock: { now: 0, limit: 5, max: 8, label: 'explicit 5s' } },
  predict: { q: 'Thông báo hiện sau 7 giây, wait tối đa 5 giây. Kết quả là gì?', opts: ['Pass vì cuối cùng cũng hiện', 'TimeoutException sau 5 giây', 'NoSuchElementException ngay lập tức', 'Chờ thêm 2 giây tự động'], ans: 1, why: 'Hết thời gian chờ thì ném TimeoutException; wait không tự kéo dài thời gian.' },
  steps: [
    { t: 'Bắt đầu chờ thông báo', what: 'visibilityOfElementLocated(#success).', why: 'Chờ hiển thị.', how: 'Polling.', impact: 'Đang chờ.', line: 1, st: 'wait', dt: 2, fx: function (s) { s.clock.now = 2; } },
    { t: 'Chờ tiếp…', what: 'Thông báo vẫn chưa hiện.', why: 'Hệ thống xử lý đơn còn chậm.', how: 'Tiếp tục polling.', impact: 'Đã chờ 4 giây.', line: 1, st: 'wait', dt: 2, fx: function (s) { s.clock.now = 4; } },
    { t: 'Hết 5 giây', what: 'Đạt giới hạn timeout.', why: 'Wait phải dừng để test không treo.', how: 'Bộ chờ ném lỗi.', impact: 'TimeoutException được ném.', line: 1, st: 'err', dt: 1, fx: function (s) { s.clock.now = 5; s.exc = 'TimeoutException: Expected condition failed: waiting for visibility of #success (5s)'; } },
    { t: 'Thông báo hiện ở giây 7 (quá muộn)', what: 'Thông báo xuất hiện sau khi test đã dừng.', why: 'Đây là lý do test fail dù chức năng đúng.', how: 'Không ai đọc kết quả sau khi exception được ném.', impact: 'Cần tăng timeout hợp lý hoặc kiểm tra tiến trình xử lý.', line: 1, st: 'wait', dt: 2, fx: function (s) { s.clock.now = 7; F(s, 'ok').c = 'wait'; F(s, 'ok').label = 'Đặt hàng thành công (đến quá muộn)'; } }
  ],
  takeaway: 'TimeoutException nghĩa là điều kiện không đạt trong thời gian cho phép. Cần xem có phải timeout quá ngắn, hay chức năng quá chậm.' });

/* ---------- Bài 10: Fluent Wait ---------- */
SIMS.push({ id: 'L10-E', lesson: 10, level: 'Dễ', title: 'Chờ kết quả xuất hiện theo chu kỳ',
  scen: 'Trang tính toán báo cáo; khi xong, #result hiện chữ "Hoàn tất". Dùng FluentWait kiểm tra mỗi 2 giây.',
  code: ['Wait<WebDriver> wait = new FluentWait<>(driver)', '    .withTimeout(Duration.ofSeconds(20))', '    .pollingEvery(Duration.ofSeconds(2));', 'wait.until(d -> d.findElement(By.id("result")).getText().equals("Hoàn tất"));'],
  init: { browser: { url: 'https://shop.example.com/report', title: 'Báo cáo', ctx: 'main', tabs: null }, dom: [E('res', 'div#result', 'Đang xử lý...', 'wait')], vars: { polls: 0 }, clock: { now: 0, limit: 20, max: 20, label: 'fluent 20s / poll 2s' } },
  steps: [
    { t: 'Lần kiểm tra 1 (t=0s)', what: 'Điều kiện: text = "Hoàn tất"?', why: 'Kiểm tra ngay khi bắt đầu.', how: 'Lambda được gọi.', impact: 'Chưa đúng: tiếp tục.', line: 3, st: 'wait', dt: 0, fx: function (s) { s.vars.polls = 1; } },
    { t: 'Chờ 2 giây rồi kiểm tra lại', what: 'pollingEvery(2s) quyết định chu kỳ.', why: 'Không kiểm tra liên tục để tiết kiệm tài nguyên.', how: 'Bộ chờ đợi đúng chu kỳ.', impact: 'Lần 2 (t=2s): vẫn đang xử lý.', line: 2, st: 'wait', dt: 2, fx: function (s) { s.clock.now = 2; s.vars.polls = 2; } },
    { t: 'Lần 3 (t=4s)', what: 'Kiểm tra lại.', why: 'Hệ thống vẫn chạy.', how: 'Chu kỳ tiếp theo.', impact: 'Chưa đạt.', line: 2, st: 'wait', dt: 2, fx: function (s) { s.clock.now = 4; s.vars.polls = 3; } },
    { t: 'Lần 4 (t=6s): đạt', what: 'Text đã thành "Hoàn tất".', why: 'Điều kiện đúng.', how: 'Lambda trả về true, bộ chờ dừng.', impact: 'Kết thúc chờ sau 6 giây.', line: 3, st: 'ok', dt: 2, fx: function (s) { s.clock.now = 6; s.vars.polls = 4; F(s, 'res').label = 'Hoàn tất'; F(s, 'res').c = 'ok'; } },
    { t: 'Đọc kết quả', what: 'Lấy text để assert.', why: 'Kiểm tra nội dung cuối cùng.', how: 'getText().', impact: 'Test có thể tiếp tục.', line: 3, st: 'ok', fx: function (s) { s.vars.result = 'Hoàn tất'; s.clock.label = 'hoàn tất sau 6s'; } }
  ],
  takeaway: 'FluentWait kiểm tra điều kiện theo chu kỳ đã cấu hình, có timeout tổng. Điều kiện viết bằng lambda.' });

SIMS.push({ id: 'L10-M1', lesson: 10, level: 'Trung bình', title: 'Chu kỳ polling: 1 giây hay 3 giây',
  scen: 'Điều kiện đạt sau 7 giây. So sánh số lần kiểm tra khi polling 1s và 3s.',
  code: ['// Cấu hình A: pollingEvery(1s)', '// Cấu hình B: pollingEvery(3s)', '// Điều kiện đạt ở t = 7s'],
  init: { browser: { url: 'https://shop.example.com/queue', title: 'Hàng đợi', ctx: 'main', tabs: null }, dom: [E('st', 'div#status', 'Đang chờ', 'wait')], vars: { pollsA_1s: 0, pollsB_3s: 0 }, clock: { now: 0, limit: 10, max: 10, label: 'timeout 10s' } },
  steps: [
    { t: 'Cấu hình A: poll mỗi 1s', what: 'Kiểm tra t=0,1,2,...', why: 'Phản hồi nhanh nhưng tốn lượt kiểm tra.', how: 'Bộ chờ gọi điều kiện mỗi giây.', impact: 'Đến t=7s có khoảng 8 lần kiểm tra (0..7).', line: 0, st: 'run', dt: 7, fx: function (s) { s.clock.now = 7; s.vars.pollsA_1s = 8; } },
    { t: 'Cấu hình B: poll mỗi 3s', what: 'Kiểm tra t=0,3,6,...', why: 'Ít lượt hơn nhưng có thể trễ tới 3 giây.', how: 'Bộ chờ gọi điều kiện mỗi 3 giây.', impact: 'Các lần kiểm tra ở 0s, 3s, 6s đều chưa đạt; lần kế tiếp (9s) mới thấy điều kiện đã đúng.', line: 1, st: 'wait', dt: 2, fx: function (s) { s.vars.pollsB_3s = 3; s.clock.now = 9; } },
    { t: 'So sánh độ trễ', what: 'A phát hiện ~7s; B phát hiện ~9s.', why: 'Polling lớn làm phát hiện trễ hơn.', how: 'Độ trễ tối đa xấp xỉ chu kỳ polling.', impact: 'Chọn chu kỳ cân bằng: thường 500ms–2s.', line: 2, st: 'ok', fx: function (s) { s.clock.label = 'so sánh xong'; F(s, 'st').c = 'ok'; F(s, 'st').label = 'Hoàn tất'; } }
  ],
  takeaway: 'Chu kỳ polling quyết định độ trễ phát hiện và số lần gọi điều kiện. Chọn giá trị cân bằng.' });

SIMS.push({ id: 'L10-M2', lesson: 10, level: 'Trung bình', title: 'ignoring: bỏ qua exception tạm thời',
  scen: 'Phần tử #toast được chèn vào DOM sau 4 giây. Trước đó findElement ném NoSuchElementException; ta cấu hình bỏ qua exception đó.',
  code: ['Wait<WebDriver> wait = new FluentWait<>(driver)', '    .withTimeout(Duration.ofSeconds(10))', '    .pollingEvery(Duration.ofSeconds(1))', '    .ignoring(NoSuchElementException.class);', 'wait.until(d -> d.findElement(By.id("toast")));'],
  init: { browser: { url: 'https://shop.example.com/save', title: 'Lưu', ctx: 'main', tabs: null }, dom: [], vars: { ignored: 0 }, clock: { now: 0, limit: 10, max: 10, label: 'fluent 10s' } },
  steps: [
    { t: 'Lần 1 (t=0s): chưa có #toast', what: 'findElement ném NoSuchElementException.', why: 'Chưa có thông báo vì chưa bấm lưu xong.', how: 'Bộ chờ bắt exception vì nằm trong ignoring.', impact: 'Bỏ qua và chờ tiếp.', line: 4, st: 'wait', dt: 1, fx: function (s) { s.clock.now = 1; s.vars.ignored = 1; s.exc = null; } },
    { t: 'Lần 2 (t=2s): vẫn chưa có', what: 'Lại bị bỏ qua.', why: 'Đây là lỗi tạm thời.', how: 'Tiếp tục polling.', impact: 'ignored = 2.', line: 4, st: 'wait', dt: 1, fx: function (s) { s.clock.now = 2; s.vars.ignored = 2; } },
    { t: 'Lần 3 (t=3s): vẫn chưa có', what: 'Bị bỏ qua thêm lần nữa.', why: 'Server đang xử lý.', how: 'Tiếp tục.', impact: 'ignored = 3.', line: 4, st: 'wait', dt: 1, fx: function (s) { s.clock.now = 3; s.vars.ignored = 3; } },
    { t: 'Lần 4 (t=4s): #toast xuất hiện', what: 'findElement thành công.', why: 'Điều kiện đạt.', how: 'Lambda trả về phần tử.', impact: 'Kết thúc chờ.', line: 4, st: 'ok', dt: 1, fx: function (s) { s.clock.now = 4; s.dom = [E('toast', 'div#toast', 'Đã lưu thành công', 'ok')]; } },
    { t: 'Nếu không ignoring thì sao?', what: 'Nếu không cấu hình ignoring, exception đầu tiên sẽ làm test lỗi ngay.', why: 'Cấu hình ignoring giúp chờ được tình huống tạm thời.', how: 'Không bắt exception, lỗi bay ra ngoài.', impact: 'Chỉ nên ignore exception đã hiểu rõ.', line: 3, st: 'ok', fx: function (s) { s.clock.label = 'đã đạt sau 4s'; } }
  ],
  takeaway: 'ignoring chỉ bỏ qua exception được chỉ định trong khi chờ. Đừng ignore quá rộng, nếu không sẽ che lỗi thật.' });
