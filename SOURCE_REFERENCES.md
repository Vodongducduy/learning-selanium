# SOURCE_REFERENCES — Tài liệu tham chiếu đã xác minh

**Ngày xác minh:** bài 1–20 ngày 26/11/2026; bài 21–47 ngày 28/11/2026. Số "Bài" trong tài liệu này là ID nội bộ, không phải mã hiển thị (ví dụ 4.3) trong ứng dụng; chữ "(Ngày N)" ở bài 1–20 là cách chia cũ.

**Cách kiểm tra:** Mỗi URL được gọi HTTP (curl, theo chuyển hướng) và phải trả về `200`. Đây là kiểm tra *tồn tại* của trang. Riêng các trang ghi "Đã đọc" ở cột Trạng thái, nội dung đã được đối chiếu với câu lệnh/khái niệm trong bài.

**Phân biệt:** Nội dung trong ứng dụng là *giải thích đơn giản hóa để học*, không sao chép nguyên văn tài liệu. Mọi khẳng định kỹ thuật nên được đối chiếu với trang gốc trước khi dùng cho buổi audit thật.

**Kết quả kiểm tra:** đợt 26/11/2026 có 54 URL trả về HTTP 200; đợt 28/11/2026 kiểm tra 55 URL của bài 21–47 (xem trạng thái từng dòng; link Hoppscotch được thêm sau đợt kiểm tra tự động và đã mở thử riêng). Các neo `#_...` của TestNG được kiểm tra bằng sự tồn tại của thuộc tính `id` trên trang.

**Không dùng:** API lỗi thời (ví dụ JSON Wire Protocol, Selenium RC) và không dùng liên kết chỉ trỏ tới trang chủ tài liệu.

## 1. Tài liệu theo từng bài học

### Bài 1: Selenium & kiến trúc WebDriver (Ngày 1)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| WebDriver — Drivers | Trang giải thích driver của từng trình duyệt | https://www.selenium.dev/documentation/webdriver/drivers/ | HTTP 200 (chưa đọc chi tiết nội dung) |
| WebDriver (Javadoc) | Interface WebDriver — quit(), get(), getTitle() | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/WebDriver.html | HTTP 200 (chưa đọc chi tiết nội dung) |
| W3C WebDriver Specification | Đặc tả chuẩn của giao thức WebDriver | https://www.w3.org/TR/webdriver/ | HTTP 200 (chưa đọc chi tiết nội dung) |

### Bài 2: Điều hướng trình duyệt (Navigation) (Ngày 1)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| Browser manipulation | Trang hướng dẫn điều khiển trình duyệt (get, navigate, window) | https://www.selenium.dev/documentation/webdriver/browser_manipulation/ | HTTP 200 (chưa đọc chi tiết nội dung) |
| WebDriver.Navigation (Javadoc) | back(), forward(), refresh(), to(String) | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/WebDriver.Navigation.html | HTTP 200 (chưa đọc chi tiết nội dung) |
| WebDriver (Javadoc) | close() và quit() | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/WebDriver.html | HTTP 200 (chưa đọc chi tiết nội dung) |

### Bài 3: HTML, DOM và Locators (Ngày 1)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| Locating elements | Hướng dẫn các locator (By.id, By.name, ...) | https://www.selenium.dev/documentation/webdriver/elements/locators/ | HTTP 200 (chưa đọc chi tiết nội dung) |
| DOM Introduction (MDN) | Giới thiệu DOM | https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction | HTTP 200 (chưa đọc chi tiết nội dung) |
| By (Javadoc) | Các factory method của By | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/By.html | HTTP 200 (chưa đọc chi tiết nội dung) |

### Bài 4: XPath (Ngày 1)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| Locating elements (XPath) | Phần XPath trong trang locator | https://www.selenium.dev/documentation/webdriver/elements/locators/ | HTTP 200 (chưa đọc chi tiết nội dung) |
| XPath (MDN) | Tổng quan XPath trên web | https://developer.mozilla.org/en-US/docs/Web/XPath | HTTP 200 (chưa đọc chi tiết nội dung) |
| By.xpath (Javadoc) | Factory method By.xpath | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/By.html | HTTP 200 (chưa đọc chi tiết nội dung) |

### Bài 5: CSS Selector (Ngày 1)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| Locating elements (CSS) | Phần CSS selector | https://www.selenium.dev/documentation/webdriver/elements/locators/ | HTTP 200 (chưa đọc chi tiết nội dung) |
| Attribute selectors (MDN) | Cú pháp [attr] và [attr=value] | https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors | HTTP 200 (chưa đọc chi tiết nội dung) |
| Element.querySelector (MDN) | Cách trình duyệt áp CSS selector | https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector | HTTP 200 (chưa đọc chi tiết nội dung) |

### Bài 6: findElement() và findElements() (Ngày 1)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| Finding elements | findElement và findElements trong Selenium | https://www.selenium.dev/documentation/webdriver/elements/finders/ | HTTP 200 (chưa đọc chi tiết nội dung) |
| WebDriver (Javadoc) | Các phương thức findElement/findElements | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/WebDriver.html | HTTP 200 (chưa đọc chi tiết nội dung) |
| NoSuchElementException (Javadoc) | Ngoại lệ khi không tìm thấy phần tử | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/NoSuchElementException.html | HTTP 200 (chưa đọc chi tiết nội dung) |

### Bài 7: WebElement — click, sendKeys và thuộc tính (Ngày 1)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| Element interactions | click, sendKeys, clear | https://www.selenium.dev/documentation/webdriver/elements/interactions/ | HTTP 200 (chưa đọc chi tiết nội dung) |
| Element information | isDisplayed, getText, attributes | https://www.selenium.dev/documentation/webdriver/elements/information/ | HTTP 200 (chưa đọc chi tiết nội dung) |
| WebElement (Javadoc) | getAttribute, getDomAttribute, getDomProperty | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/WebElement.html | Đã đọc: getAttribute trả về property trước, nếu không có thì attribute; có getDomAttribute và getDomProperty. |

### Bài 8: Implicit Wait (Ngày 2)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| Waits — Implicit waits | Mục Implicit waits và cảnh báo không trộn implicit với explicit | https://www.selenium.dev/documentation/webdriver/waits/ | Đã đọc: mô tả implicit wait (áp dụng khi tìm phần tử; timeout là giới hạn tối đa) và cảnh báo "Do not mix implicit and explicit waits." |
| WebDriver.Timeouts (Javadoc) | implicitlyWait(Duration) | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/WebDriver.Timeouts.html | HTTP 200 (chưa đọc chi tiết nội dung) |

### Bài 9: Explicit Wait (Ngày 2)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| Waits — Explicit waits | WebDriverWait và điều kiện | https://www.selenium.dev/documentation/webdriver/waits/ | Đã đọc: mô tả implicit wait (áp dụng khi tìm phần tử; timeout là giới hạn tối đa) và cảnh báo "Do not mix implicit and explicit waits." |
| WebDriverWait (Javadoc) | Lớp WebDriverWait | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/support/ui/WebDriverWait.html | HTTP 200 (chưa đọc chi tiết nội dung) |
| ExpectedConditions (Javadoc) | Các điều kiện chờ dựng sẵn | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/support/ui/ExpectedConditions.html | HTTP 200 (chưa đọc chi tiết nội dung) |

### Bài 10: Fluent Wait (Ngày 2)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| Waits — Fluent waits | Mục FluentWait và tùy chọn | https://www.selenium.dev/documentation/webdriver/waits/ | Đã đọc: mô tả implicit wait (áp dụng khi tìm phần tử; timeout là giới hạn tối đa) và cảnh báo "Do not mix implicit and explicit waits." |
| FluentWait (Javadoc) | withTimeout, pollingEvery, ignoring | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/support/ui/FluentWait.html | HTTP 200 (chưa đọc chi tiết nội dung) |

### Bài 11: Dropdown, Checkbox và Radio Button (Ngày 2)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| Select (Javadoc) | Lớp Select cho thẻ select | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/support/ui/Select.html | HTTP 200 (chưa đọc chi tiết nội dung) |
| HTML select (MDN) | Thẻ select | https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select | HTTP 200 (chưa đọc chi tiết nội dung) |
| Element interactions | Thao tác click và trạng thái | https://www.selenium.dev/documentation/webdriver/elements/interactions/ | HTTP 200 (chưa đọc chi tiết nội dung) |

### Bài 12: Alerts (hộp thoại JavaScript) (Ngày 2)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| Alerts | Xử lý alert trong Selenium | https://www.selenium.dev/documentation/webdriver/interactions/alerts/ | HTTP 200 (chưa đọc chi tiết nội dung) |
| Alert (Javadoc) | accept, dismiss, sendKeys | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/Alert.html | HTTP 200 (chưa đọc chi tiết nội dung) |
| NoAlertPresentException (Javadoc) | Khi không có alert | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/NoAlertPresentException.html | HTTP 200 (chưa đọc chi tiết nội dung) |

### Bài 13: iFrame và Nested Frames (Ngày 2)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| Frames and iframes | Chuyển ngữ cảnh frame | https://www.selenium.dev/documentation/webdriver/interactions/frames/ | HTTP 200 (chưa đọc chi tiết nội dung) |
| iframe (MDN) | Thẻ iframe | https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe | HTTP 200 (chưa đọc chi tiết nội dung) |
| TargetLocator (Javadoc) | switchTo().frame / defaultContent | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/WebDriver.TargetLocator.html | HTTP 200 (chưa đọc chi tiết nội dung) |

### Bài 14: Nhiều cửa sổ và tab (Ngày 2)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| Windows and tabs | Quản lý cửa sổ | https://www.selenium.dev/documentation/webdriver/interactions/windows/ | HTTP 200 (chưa đọc chi tiết nội dung) |
| WebDriver.Window (Javadoc) | Các thao tác cửa sổ | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/WebDriver.Window.html | HTTP 200 (chưa đọc chi tiết nội dung) |
| TargetLocator (Javadoc) | switchTo().window | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/WebDriver.TargetLocator.html | HTTP 200 (chưa đọc chi tiết nội dung) |

### Bài 15: Actions Class (Ngày 2)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| Actions API | Chuỗi hành động chuột và phím | https://www.selenium.dev/documentation/webdriver/actions_api/ | HTTP 200 (chưa đọc chi tiết nội dung) |
| Actions (Javadoc) | moveToElement, dragAndDrop, perform | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/interactions/Actions.html | HTTP 200 (chưa đọc chi tiết nội dung) |
| Keyboard | Phím đặc biệt như Keys.CONTROL | https://www.selenium.dev/documentation/webdriver/keyboard/ | HTTP 200 (chưa đọc chi tiết nội dung) |

### Bài 16: Các Exception thường gặp (Ngày 2)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| Troubleshooting errors | Các lỗi thường gặp trong Selenium | https://www.selenium.dev/documentation/webdriver/troubleshooting/errors/ | HTTP 200 (chưa đọc chi tiết nội dung) |
| NoSuchElementException (Javadoc) | Mô tả ngoại lệ | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/NoSuchElementException.html | HTTP 200 (chưa đọc chi tiết nội dung) |
| StaleElementReferenceException (Javadoc) | Mô tả ngoại lệ | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/StaleElementReferenceException.html | HTTP 200 (chưa đọc chi tiết nội dung) |
| ElementClickInterceptedException (Javadoc) | Mô tả ngoại lệ | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/ElementClickInterceptedException.html | HTTP 200 (chưa đọc chi tiết nội dung) |

### Bài 17: TestNG, Annotation và vòng đời test (Ngày 3)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| TestNG — Annotations | Danh sách annotation và thứ tự chạy | https://testng.org/#_annotations | Đã kiểm tra: anchor id _annotations tồn tại trên trang; nội dung chi tiết chưa đọc đầy đủ. |
| TestNG — Test methods | Cách test được chọn và chạy | https://testng.org/#_test_methods | Đã kiểm tra: anchor id tồn tại; nội dung chưa đọc đầy đủ. |
| TestNG — testng.xml | Cấu hình suite | https://testng.org/#_testng_xml | Đã kiểm tra: anchor id tồn tại; nội dung chưa đọc đầy đủ. |

### Bài 18: Hard Assert vs Soft Assert (Ngày 3)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| TestNG — Asserts | Assert và SoftAssert | https://testng.org/#_asserts | Đã đọc mục 9.2 "Asserts": org.testng.Assert có thứ tự tham số khác JUnit (không liệt kê SoftAssert ở đây). |
| TestNG — Success, failure and assert | Cách TestNG đánh dấu pass/fail | https://testng.org/#_success_failure_and_assert | Đã kiểm tra: anchor id tồn tại; nội dung chưa đọc đầy đủ. |
| SoftAssert (TestNG 7.9.0 Javadoc) | Lớp org.testng.asserts.SoftAssert: assertEquals/assertTrue và assertAll() | https://javadoc.io/static/org.testng/testng/7.9.0/org/testng/asserts/SoftAssert.html | HTTP 200 (chưa đọc chi tiết nội dung) |

### Bài 19: Page Object Model (POM) (Ngày 3)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| Page Object Models | Hướng dẫn POM của Selenium | https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/ | HTTP 200 (chưa đọc chi tiết nội dung) |
| PageFactory (Javadoc) | org.openqa.selenium.support.PageFactory | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/support/PageFactory.html | HTTP 200 (chưa đọc chi tiết nội dung) |
| By (Javadoc) | Các locator | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/By.html | HTTP 200 (chưa đọc chi tiết nội dung) |

### Bài 20: DataProvider và Data-driven Testing (Ngày 3)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| TestNG — Parameters with DataProviders | DataProvider và tham số | https://testng.org/#_parameters_with_dataproviders | Đã kiểm tra: anchor id tồn tại; nội dung chưa đọc đầy đủ. |
| DataProvider (TestNG 7.9.0 Javadoc) | Annotation org.testng.annotations.DataProvider | https://javadoc.io/static/org.testng/testng/7.9.0/org/testng/annotations/DataProvider.html | HTTP 200 (chưa đọc chi tiết nội dung) |
| TestNG — Annotations | Annotation @DataProvider và @Test | https://testng.org/#_annotations | Đã kiểm tra: anchor id _annotations tồn tại trên trang; nội dung chi tiết chưa đọc đầy đủ. |
| Java documentation | Tài liệu Java chính thức (Oracle) | https://docs.oracle.com/en/java/ | HTTP 200 (chưa đọc chi tiết nội dung) |

### Bài 21: Java cơ bản: kiểu dữ liệu, điều kiện, vòng lặp, String (Programming & Unit Test)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| Java Tutorials — Language Basics | Biến, toán tử, điều kiện, vòng lặp | https://docs.oracle.com/javase/tutorial/java/nutsandbolts/index.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| Java Tutorials — Strings | Làm việc với String | https://docs.oracle.com/javase/tutorial/java/data/strings.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |

### Bài 22: Java: Collections và Exception Handling (Programming & Unit Test)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| Java Tutorials — Collections | List, Set, Map | https://docs.oracle.com/javase/tutorial/collections/index.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| Java Tutorials — Exceptions | try, catch, finally, throw, throws | https://docs.oracle.com/javase/tutorial/essential/exceptions/index.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |

### Bài 23: Lập trình hướng đối tượng (OOP) (Programming & Unit Test)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| Java Tutorials — OOP Concepts | Object, class, inheritance, interface | https://docs.oracle.com/javase/tutorial/java/concepts/index.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| Java Tutorials — Interfaces and Inheritance | Interface, abstract, override | https://docs.oracle.com/javase/tutorial/java/IandI/index.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |

### Bài 24: TestNG: Groups, Filter và Parameterized Test (Programming & Unit Test)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| TestNG — Test groups | groups, include, exclude | https://testng.org/#_test_groups | Đã kiểm tra anchor id tồn tại; nội dung chưa đọc đầy đủ |
| TestNG — Parameters | @Parameters, @Optional, testng.xml | https://testng.org/#_parameters | Đã kiểm tra anchor id tồn tại; nội dung chưa đọc đầy đủ |

### Bài 25: TestNG: Exception, Timeout và Retry (Programming & Unit Test)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| TestNG — Annotations | Thuộc tính expectedExceptions, timeOut, retryAnalyzer của @Test | https://testng.org/#_annotations | Đã kiểm tra anchor id tồn tại; nội dung chưa đọc đầy đủ |
| TestNG — Rerunning failed tests | IRetryAnalyzer và chạy lại test fail | https://testng.org/#_rerunning_failed_tests | Đã kiểm tra anchor id tồn tại; nội dung chưa đọc đầy đủ |
| TestNG — Parallelism and time-outs | Giới hạn thời gian chạy | https://testng.org/#_parallelism_and_time_outs | Đã kiểm tra anchor id tồn tại; nội dung chưa đọc đầy đủ |

### Bài 26: TestNG: Parallel Test và ITestContext (Programming & Unit Test)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| TestNG — Parallelism | parallel, thread-count | https://testng.org/#_parallelism_and_time_outs | Đã kiểm tra anchor id tồn tại; nội dung chưa đọc đầy đủ |
| TestNG — Dependency injection | Tiêm ITestContext vào method | https://testng.org/#_dependency_injection | Đã kiểm tra anchor id tồn tại; nội dung chưa đọc đầy đủ |
| ITestContext (TestNG 7.9.0 Javadoc) | Thông tin lần chạy và attribute | https://javadoc.io/static/org.testng/testng/7.9.0/org/testng/ITestContext.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |

### Bài 27: Tạo Automation Test Project (Web Automation Test)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| Maven — Standard Directory Layout | Cấu trúc thư mục chuẩn | https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| Install a Selenium library | Khai báo Selenium cho project | https://www.selenium.dev/documentation/webdriver/getting_started/install_library/ | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| Surefire — TestNG | Chạy TestNG bằng Maven | https://maven.apache.org/surefire/maven-surefire-plugin/examples/testng.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |

### Bài 28: Năng lực Tester và khái niệm kiểm thử (Software Testing Foundation)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| ISTQB CTFL v4.0 | Syllabus Foundation Level | https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/ | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| ISTQB Glossary | Thuật ngữ kiểm thử chuẩn | https://glossary.istqb.org/ | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |

### Bài 29: Test Process và Test Plan (Software Testing Foundation)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| ISTQB CTFL v4.0 | Test activities và test planning | https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/ | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| ISTQB Glossary | Test plan, entry criteria, exit criteria | https://glossary.istqb.org/ | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |

### Bài 30: Test Levels và Test Types (Software Testing Foundation)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| ISTQB CTFL v4.0 | Test levels và test types | https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/ | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| ISTQB Glossary | Confirmation testing, regression testing, smoke test | https://glossary.istqb.org/ | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |

### Bài 31: Test Case và Test Design Techniques (Software Testing Foundation)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| ISTQB CTFL v4.0 | Test analysis and design techniques | https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/ | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| ISTQB Glossary | Equivalence partitioning, boundary value analysis | https://glossary.istqb.org/ | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |

### Bài 32: Test Execution và quản lý Defect (Software Testing Foundation)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| ISTQB CTFL v4.0 | Defect management và test reporting | https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/ | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| ISTQB Glossary | Defect report, severity, priority | https://glossary.istqb.org/ | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |

### Bài 33: API Testing cơ bản: Request và Response (API Testing)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| MDN — An overview of HTTP | Request, response | https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| MDN — HTTP response status codes | Danh sách status code | https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| MDN — HTTP cookies | Cookie và Set-Cookie | https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |

### Bài 34: cURL: gửi request từ dòng lệnh (API Testing)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| curl — man page | Toàn bộ tùy chọn | https://curl.se/docs/manpage.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| curl — HTTP scripting | Hướng dẫn dùng curl với HTTP | https://curl.se/docs/httpscripting.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |

### Bài 35: Thiết kế Test Case cho API (API Testing)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| OpenAPI Specification | Chuẩn mô tả API | https://spec.openapis.org/oas/latest.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| OWASP API Security Top 10 | Rủi ro bảo mật API thường gặp | https://owasp.org/API-Security/ | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |

### Bài 36: Hoppscotch: tạo request và viết script (API Testing)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| Hoppscotch Docs | Trang chủ tài liệu chính thức | https://docs.hoppscotch.io/documentation/getting-started/introduction | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| Hoppscotch — Scripts | pw.* và hopp.* trong pre-request, post-request script | https://docs.hoppscotch.io/documentation/features/scripts | Đã đối chiếu tên hàm pw.* / hopp.* trên trang |
| Hoppscotch — Tests | Viết test sau response | https://docs.hoppscotch.io/documentation/getting-started/rest/tests | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |

### Bài 37: JMeter: API test, CSV data, assertion và report (API Testing)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| JMeter — Elements of a Test Plan | Thread Group, sampler, assertion, listener | https://jmeter.apache.org/usermanual/test_plan.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| JMeter — Component Reference | CSV Data Set Config, JSON Extractor | https://jmeter.apache.org/usermanual/component_reference.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| JMeter — Generating Dashboard Report | HTML report | https://jmeter.apache.org/usermanual/generating-dashboard.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |

### Bài 38: ER Model và khái niệm Database (Database SQL)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| PostgreSQL — Constraints | Primary key, foreign key, unique, check | https://www.postgresql.org/docs/current/ddl-constraints.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| SQL Server — Primary and foreign key constraints | Khóa trong SQL Server | https://learn.microsoft.com/en-us/sql/relational-databases/tables/primary-and-foreign-key-constraints | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |

### Bài 39: PostgreSQL và SQL Server: cài đặt, kiểu dữ liệu (Database SQL)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| PostgreSQL — Data Types | Kiểu dữ liệu | https://www.postgresql.org/docs/current/datatype.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| PostgreSQL — Getting Started | Cài đặt và kiến trúc cơ bản | https://www.postgresql.org/docs/current/tutorial-start.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| SQL Server — Data types (Transact-SQL) | Kiểu dữ liệu của SQL Server | https://learn.microsoft.com/en-us/sql/t-sql/data-types/data-types-transact-sql | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |

### Bài 40: SQL cơ bản: DDL và DML (Database SQL)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| PostgreSQL — Data Definition | DDL | https://www.postgresql.org/docs/current/ddl.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| PostgreSQL — Data Manipulation | DML | https://www.postgresql.org/docs/current/dml.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| PostgreSQL — Aggregate Functions tutorial | GROUP BY và HAVING | https://www.postgresql.org/docs/current/tutorial-agg.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |

### Bài 41: SQL Operators (Database SQL)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| PostgreSQL — Comparison Functions and Operators | So sánh, BETWEEN, IS NULL | https://www.postgresql.org/docs/current/functions-comparison.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| PostgreSQL — Logical Operators | AND, OR, NOT và NULL | https://www.postgresql.org/docs/current/functions-logical.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| PostgreSQL — Pattern Matching | LIKE, ILIKE | https://www.postgresql.org/docs/current/functions-matching.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |

### Bài 42: SQL Joins (Database SQL)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| PostgreSQL — Joins Between Tables | Tutorial JOIN | https://www.postgresql.org/docs/current/tutorial-join.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| PostgreSQL — Table Expressions | Các loại join | https://www.postgresql.org/docs/current/queries-table-expressions.html | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| SQL Server — Joins | Join trong SQL Server | https://learn.microsoft.com/en-us/sql/relational-databases/performance/joins | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |

### Bài 43: GenAI cơ bản và Prompt Engineering cho Testing (AI for Tester)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| Prompt engineering overview | Tài liệu hướng dẫn prompt (Anthropic) | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| NIST AI Risk Management Framework | Quản lý rủi ro AI | https://www.nist.gov/itl/ai-risk-management-framework | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| OWASP Top 10 for LLM Applications | Rủi ro khi dùng LLM | https://owasp.org/www-project-top-10-for-large-language-model-applications/ | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |

### Bài 44: AI trong Test Monitoring, Defect Analysis và Quality Report (AI for Tester)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| NIST AI Risk Management Framework | Giám sát và đánh giá đầu ra AI | https://www.nist.gov/itl/ai-risk-management-framework | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| OWASP Top 10 for LLM Applications | Rủi ro tin cậy quá mức và lộ dữ liệu | https://owasp.org/www-project-top-10-for-large-language-model-applications/ | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| ISTQB CTFL v4.0 | Test monitoring và reporting | https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/ | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |

### Bài 45: Ứng dụng AI cho SQL, API và Automation (AI for Tester)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| Prompt engineering overview | Hướng dẫn prompt | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| Selenium — Encouraged behaviors | Chuẩn để review script | https://www.selenium.dev/documentation/test_practices/encouraged/ | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| OWASP Top 10 for LLM Applications | Xử lý đầu ra không an toàn | https://owasp.org/www-project-top-10-for-large-language-model-applications/ | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |

### Bài 46: Git cho Tester (Git & Phỏng vấn)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| git — reference | Tài liệu lệnh Git | https://git-scm.com/docs/git | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| git-merge | Merge và conflict | https://git-scm.com/docs/git-merge | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| git-revert | Đảo ngược commit | https://git-scm.com/docs/git-revert | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| Pro Git book | Sách Git chính thức | https://git-scm.com/book/en/v2 | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |

### Bài 47: Phỏng vấn: thái độ, kỹ năng mềm và tiếng Anh/Nhật (Git & Phỏng vấn)

| Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|
| British Council — LearnEnglish | Luyện nghe, nói, đọc, viết tiếng Anh | https://learnenglish.britishcouncil.org/free-resources | HTTP 200 ngày 28/11/2026 (chưa đọc chi tiết nội dung) |
| JLPT | Trang chính thức kỳ thi năng lực tiếng Nhật | https://www.jlpt.jp/e/ | Ngày 28/11/2026 chuyển hướng sang trang bảo trì (HTTP 200); cần mở lại để kiểm tra |

## 2. Kiến thức bổ sung (không thuộc các bài chính)

| Chủ đề | Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|---|
| Maven — quản lý thư viện và cấu trúc dự án | Maven Guides | Hướng dẫn Maven chính thức (pom.xml, vòng đời build) | https://maven.apache.org/guides/ | HTTP 200 (chưa đọc chi tiết nội dung) |
| JavaScriptExecutor — chạy JavaScript trong trang | JavascriptExecutor (Javadoc) | Interface JavascriptExecutor và executeScript | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/JavascriptExecutor.html | HTTP 200 (chưa đọc chi tiết nội dung) |
| Chụp ảnh màn hình (screenshot) | TakesScreenshot (Javadoc) | getScreenshotAs và OutputType | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/TakesScreenshot.html | HTTP 200 (chưa đọc chi tiết nội dung) |
| Upload file | File upload | Hướng dẫn upload file trong Selenium | https://www.selenium.dev/documentation/webdriver/elements/file_upload/ | HTTP 200 (chưa đọc chi tiết nội dung) |

## 3. Giới hạn của phần tham chiếu

- Chỉ một số trang được đọc nội dung (xem cột Trạng thái); các trang còn lại mới kiểm tra HTTP 200.
- Phần Maven, screenshot, upload file chỉ giới thiệu khái niệm; chưa đối chiếu từng tham số với trang gốc.
