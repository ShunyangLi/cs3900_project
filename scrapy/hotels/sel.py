from selenium import webdriver
driver = webdriver.Chrome()
driver.get('https://www.sydney.com/accommodation/accommodation-hotel-and-motel')
load_more = driver.find_element_by_xpath('/html/body/div[2]/div/div/div[2]/div/div/section/div/article/div/div/div[1]/div/div/article/div/div/div[2]/div[4]/button')
load_more.click()
print(driver.page_source)