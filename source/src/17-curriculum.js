/* ===== CHƯƠNG TRÌNH: theo bảng kỹ năng và bảng đánh giá phỏng vấn ===== */
/* items: [Software Engineer Skill, nội dung yêu cầu, bài đáp ứng] */
var GROUPS = [
  { n: 1, title: 'Programming & Unit Test', lessons: [21, 22, 23, 17, 18, 20, 24, 25, 26], items: [
    ['Unit Test Framework Usage', 'Basic Java programming', [21, 22]],
    ['Unit Test Framework Usage', 'Unit test with TestNG Java — @Test, @BeforeMethod, @AfterMethod, @BeforeClass, @AfterClass', [17]],
    ['Unit Test Framework Usage', 'Assertion', [18]],
    ['Unit Test Framework Usage', 'Data-driven', [20]],
    ['Unit Test Framework Usage', 'Groups/Filter, Parameterized Test', [24]],
    ['Unit Test Framework Usage', 'Exception Handling, Timeout & Retry', [25, 22]],
    ['Unit Test Framework Usage', 'Parallel Test, ITestContext', [26]],
    ['Design (bảng phỏng vấn)', 'OOP', [23]]
  ] },
  { n: 2, title: 'Web Automation Test', lessons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 19, 27], items: [
    ['Automation test skills', 'Using id, xpath, css for finding & define elements', [3, 4, 5, 6]],
    ['Automation test skills', 'Create automation test project', [27]],
    ['Framework usage skills', 'Selenium Java — Working with Elements', [6, 7, 11]],
    ['Framework usage skills', 'Working with Selenium API', [1, 2, 15, 16]],
    ['Framework usage skills', 'Synchronizing Tests', [8, 9, 10]],
    ['Framework usage skills', 'Alerts, Frames, and Windows', [12, 13, 14]],
    ['Framework usage skills', 'Data Provider', [20]],
    ['Design (bảng phỏng vấn)', 'Page Object Model', [19]]
  ] },
  { n: 3, title: 'API Testing', lessons: [33, 34, 35, 36, 37], items: [
    ['API Testing skills', 'API Testing Fundamental', [33]],
    ['API Testing skills', 'Curl request & response, url, body, headers, cookies, status code', [34, 33]],
    ['API Testing skills', 'Design test case for API Testing', [35]],
    ['Tool usage skills', 'Hoppscotch: create request, implement script, call API, parse response, assertion', [36]],
    ['Tool usage skills', 'JMeter: create request, script, CSV data, parse response, assertion, report', [37]]
  ] },
  { n: 4, title: 'Database SQL', lessons: [38, 39, 40, 41, 42], items: [
    ['Database SQL', 'ER Model and Database Concepts', [38]],
    ['Database SQL', 'SQL Server Introduction – Postgres (Install, Datatypes)', [39]],
    ['Database SQL', 'SQL Basic (DDL & DML Statements)', [40]],
    ['Database SQL', 'SQL Operators', [41]],
    ['Database SQL', 'SQL Joins', [42]]
  ] },
  { n: 5, title: 'AI for Tester', lessons: [43, 44, 45], items: [
    ['AI for Tester', 'GenAI Foundations and Prompt Engineering for Testing', [43]],
    ['AI for Tester', 'AI in Test Monitoring, Defect Analysis and Quality Reporting', [44]],
    ['AI for Tester', 'Applying AI to Technical Testing: SQL, API and Automation', [45]]
  ] },
  { n: 6, title: 'Software Testing Foundation', lessons: [28, 29, 30, 31, 32], items: [
    ['Software Testing Foundation', 'Tester Competency & Software Testing Concepts', [28]],
    ['Software Testing Foundation', 'Fundamental test process & Test Plan', [29]],
    ['Software Testing Foundation', 'Test Levels & Test Types', [30]],
    ['Software Testing Foundation', 'Test Case and Test Design', [31]],
    ['Software Testing Foundation', 'Test Execution', [32]]
  ] },
  { n: 7, title: 'Git & Phỏng vấn', lessons: [46, 47], items: [
    ['Experience (bảng phỏng vấn)', 'GIT', [46]],
    ['Work Hard, Soft skill, Language (bảng phỏng vấn)', 'Working mindset, Communication, Problem solving, Teamwork, English/Japanese', [47]]
  ] }
];

/* Bảng Interview Evaluation: [category, sub-category, tỷ trọng %, bài ôn]. Tổng = 100. */
var EVAL_ROWS = [
  ['Work Hard', 'Working mindset', 5, [47]],
  ['Software Technology', 'Basic language - Java', 10, [21, 22]],
  ['Software Technology', 'Unit Test - TestNG', 10, [17, 18, 20, 24, 25, 26]],
  ['Software Technology', 'SQL (ER Model, DML, DDL)', 10, [38, 39, 40, 41, 42]],
  ['Software Technology', 'AI for Tester', 7, [43, 44, 45]],
  ['Software Technology', 'Software Testing Foundation', 10, [28, 29, 30, 31, 32]],
  ['Design', 'OOP', 5, [23]],
  ['Design', 'Page Object Model', 5, [19]],
  ['Experience', 'Web Automation Test', 10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 27]],
  ['Experience', 'API Testing', 10, [33, 34, 35, 36, 37]],
  ['Experience', 'GIT', 5, [46]],
  ['Soft skill', 'Communication', 3, [47]],
  ['Soft skill', 'Problem solving', 3, [47]],
  ['Soft skill', 'Teamwork', 3, [47]],
  ['Language (English/Japanese)', 'Listening', 1, [47]],
  ['Language (English/Japanese)', 'Speaking', 1, [47]],
  ['Language (English/Japanese)', 'Writing', 1, [47]],
  ['Language (English/Japanese)', 'Reading', 1, [47]]
];

CHEAT.push(
  ['Overload vs Override', 'Cùng tên khác tham số / lớp con viết lại cùng chữ ký', 'type(String) , type(String, boolean) / @Override', 'Overloading changes the parameters; overriding redefines an inherited method.'],
  ['Abstract class vs Interface', 'Kế thừa một, có trạng thái / cài đặt nhiều, không có instance field', 'extends BasePage / implements WebDriver', 'A class extends one abstract class but can implement many interfaces.'],
  ['@Parameters vs @DataProvider', 'Giá trị từ testng.xml / nhiều bộ dữ liệu từ Java', '@Parameters("browser") / @Test(dataProvider="accounts")', 'Parameters come from XML; a DataProvider supplies many data sets.'],
  ['Retesting vs Regression', 'Xác nhận bug đã sửa / kiểm tra phần khác không bị hỏng', 'chạy lại bước gây bug / chạy bộ regression', 'Retesting confirms the fix; regression looks for side effects.'],
  ['Severity vs Priority', 'Mức ảnh hưởng / mức cần sửa gấp', 'Major, High', 'Severity is impact; priority is urgency.'],
  ['QA vs QC', 'Quy trình, phòng ngừa / sản phẩm, phát hiện', 'cải tiến quy trình / thực thi test', 'QA is process-oriented; QC is product-oriented.'],
  ['401 vs 403', 'Chưa xác thực hợp lệ / bị từ chối quyền', 'thiếu token / user thường gọi API admin', '401 is about authentication; 403 is about access rights.'],
  ['PUT vs PATCH', 'Thay toàn bộ / sửa một phần', 'PUT /users/1 / PATCH /users/1', 'PUT replaces a resource; PATCH updates part of it.'],
  ['DELETE vs TRUNCATE vs DROP', 'Xóa dòng chọn lọc / xóa hết dòng / xóa cả bảng', 'DELETE FROM t WHERE id=1; TRUNCATE t; DROP TABLE t;', 'DELETE removes rows, TRUNCATE empties the table, DROP removes it.'],
  ['WHERE vs HAVING', 'Lọc dòng trước nhóm / lọc nhóm sau gộp', 'WHERE total > 0 ... HAVING COUNT(*) > 5', 'WHERE filters rows; HAVING filters groups.'],
  ['INNER vs LEFT JOIN', 'Chỉ dòng khớp / mọi dòng bảng trái', 'a JOIN b ON ... / a LEFT JOIN b ON ...', 'LEFT JOIN also keeps unmatched left rows.'],
  ['merge vs rebase', 'Gộp lịch sử / viết lại commit trên nền mới', 'git merge main / git rebase main', 'Merge preserves history; rebase rewrites commits.']
);

GLOSSARY.push(
  ['JVM', 'Máy ảo chạy bytecode Java', 21], ['Collection', 'Cấu trúc chứa nhiều object: List, Set, Map...', 22], ['Exception handling', 'Xử lý lỗi bằng try/catch/finally', 22],
  ['Encapsulation', 'Đóng gói', 23], ['Polymorphism', 'Đa hình', 23], ['Test group', 'Nhãn để lọc test TestNG', 24], ['IRetryAnalyzer', 'Interface chạy lại test fail', 25], ['ITestContext', 'Ngữ cảnh của một thẻ <test>', 26], ['pom.xml', 'File cấu hình Maven', 27],
  ['Defect', 'Chỗ sai trong sản phẩm', 28], ['Test plan', 'Kế hoạch kiểm thử', 29], ['Regression testing', 'Kiểm tra thay đổi không làm hỏng chỗ khác', 30], ['Boundary value analysis', 'Phân tích giá trị biên', 31], ['Severity', 'Mức nghiêm trọng của defect', 32],
  ['Status code', 'Mã trạng thái HTTP', 33], ['Cookie', 'Dữ liệu client gửi lại cho server', 33], ['cURL', 'Công cụ gửi request từ dòng lệnh', 34], ['Schema validation', 'Kiểm tra cấu trúc và kiểu dữ liệu', 35], ['Hoppscotch', 'Công cụ kiểm thử API mã nguồn mở', 36], ['Thread Group', 'Cấu hình user ảo trong JMeter', 37],
  ['Primary key', 'Khóa chính', 38], ['Foreign key', 'Khóa ngoại', 38], ['PostgreSQL', 'Hệ quản trị CSDL quan hệ mã nguồn mở', 39], ['DDL', 'Lệnh định nghĩa cấu trúc dữ liệu', 40], ['DML', 'Lệnh thao tác dữ liệu', 40], ['NULL', 'Giá trị không có hoặc không biết', 41], ['JOIN', 'Kết hợp dòng từ nhiều bảng', 42],
  ['LLM', 'Mô hình ngôn ngữ lớn', 43], ['Hallucination', 'AI tạo nội dung nghe hợp lý nhưng sai', 43], ['Triage', 'Phân loại, ưu tiên defect', 44], ['Merge conflict', 'Git không tự gộp được thay đổi', 46], ['STAR', 'Situation, Task, Action, Result', 47]
);
