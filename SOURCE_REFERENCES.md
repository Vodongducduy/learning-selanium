# SOURCE_REFERENCES — Tài liệu tham chiếu đã xác minh

**Ngày xác minh:** 26/11/2026 (kiểm tra trực tiếp từ môi trường có truy cập Internet).

**Cách kiểm tra:** Mỗi URL được gọi HTTP (curl, theo chuyển hướng) và phải trả về `200`. Đây là kiểm tra *tồn tại* của trang. Riêng các trang ghi "Đã đọc" ở cột Trạng thái, nội dung đã được đối chiếu với câu lệnh/khái niệm trong bài.

**Phân biệt:** Nội dung trong ứng dụng là *giải thích đơn giản hóa để học*, không sao chép nguyên văn tài liệu. Mọi khẳng định kỹ thuật nên được đối chiếu với trang gốc trước khi dùng cho buổi audit thật.

**Kết quả kiểm tra:** 54 URL duy nhất, tất cả trả về HTTP 200. Các neo `#_...` của TestNG được kiểm tra bằng sự tồn tại của thuộc tính `id` trên trang.

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

## 2. Kiến thức bổ sung (không thuộc 20 bài chính)

| Chủ đề | Tiêu đề nguồn | Mục / nội dung | URL | Trạng thái |
|---|---|---|---|---|
| Maven — quản lý thư viện và cấu trúc dự án | Maven Guides | Hướng dẫn Maven chính thức (pom.xml, vòng đời build) | https://maven.apache.org/guides/ | HTTP 200 (chưa đọc chi tiết nội dung) |
| Selenium Grid — chạy test trên máy từ xa | Selenium Grid | Tổng quan và cách chạy Grid | https://www.selenium.dev/documentation/grid/ | HTTP 200 (chưa đọc chi tiết nội dung) |
| JavaScriptExecutor — chạy JavaScript trong trang | JavascriptExecutor (Javadoc) | Interface JavascriptExecutor và executeScript | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/JavascriptExecutor.html | HTTP 200 (chưa đọc chi tiết nội dung) |
| Chụp ảnh màn hình (screenshot) | TakesScreenshot (Javadoc) | getScreenshotAs và OutputType | https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/TakesScreenshot.html | HTTP 200 (chưa đọc chi tiết nội dung) |
| Upload file | File upload | Hướng dẫn upload file trong Selenium | https://www.selenium.dev/documentation/webdriver/elements/file_upload/ | HTTP 200 (chưa đọc chi tiết nội dung) |
| Cross-browser testing | Supported browsers | Danh sách trình duyệt và driver được hỗ trợ | https://www.selenium.dev/documentation/webdriver/browsers/ | HTTP 200 (chưa đọc chi tiết nội dung) |

## 3. Giới hạn của phần tham chiếu

- Chỉ một số trang được đọc nội dung (xem cột Trạng thái); các trang còn lại mới kiểm tra HTTP 200.
- Phần Maven, Selenium Grid, screenshot, upload file, cross-browser chỉ giới thiệu khái niệm; chưa đối chiếu từng tham số với trang gốc.
