# -*- coding: utf-8 -*-
import scrapy
from selenium import webdriver
import time
import sqlite3
import os

DATABASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "hotel.db")

def connect_db():
    return sqlite3.connect(DATABASE)


def query_db(query, args=(), one=False):
    conn = connect_db()
    c = conn.cursor()
    cur = c.execute(query, args)
    rv = [dict((cur.description[idx][0], value)
               for idx, value in enumerate(row)) for row in cur.fetchall()]
    conn.commit()
    conn.close()
    return (rv[0] if rv else None) if one else rv


class HotlesSpider(scrapy.Spider):
    name = 'hotles'
    allowed_domains = ['sydney.com']
    start_urls = ['https://www.sydney.com/accommodation/accommodation-hotel-and-motel']

    def __init__(self):
        self.index = 0

    def parse(self, response):
        driver = webdriver.Chrome()
        driver.get('https://www.sydney.com/accommodation/accommodation-hotel-and-motel')
        load_more = driver.find_element_by_xpath('/html/body/div[2]/div/div/div[2]/div/div/section/div/article/div/div/div[1]/div/div/article/div/div/div[2]/div[4]/button')

        for i in range(0,4,1):
            load_more.click()
            time.sleep(2)

        response_selenium = scrapy.Selector(text=driver.page_source)
        list_url = response_selenium.xpath('//div[@id="search-results"]//a/@href').extract()
        for href in list_url:
            href = 'https://www.sydney.com' + href
            yield scrapy.Request(url=href, callback=self.new_parse)
            # print(href)
            # break

    def new_parse(self,response):
        title = (response.css('h3.product__sidebar-title')[0]).css('span::text').extract_first()
        address = (response.css('div.product__item.product__item-address')[0]).css('a::text').extract()
        phone = (response.css('div.product__item.product__item-phone')[0]).css('a::text').extract()
        email = (response.css('div.product__item.product__item-email')[0]).css('a::text').extract_first()
        web = (response.css('div.product__item.product__item-website')[0]).css('a::text').extract()
        descs = response.xpath('//*[@id="product__overview"]/div[2]//text()').extract()
        desc = ''.join(descs)
        img_div = response.css('div.carousel-inner.multimedia__inner')
        img_url = img_div.css('div.item img.img-responsive::attr(src)').extract()

        address = str(address[1]).replace('^\n', '')
        phone = str(phone[1])
        web = str(web[1])

        # print('title: ', title)
        # print('address: ', address)
        # print('phone: ', phone)
        # print('email: ', email)
        # print('web: ',web)
        # print('desc: ', desc)
        # print('url: ',img_url)

        query_db("INSERT INTO hotel(id, title, address, phone, email, web, desc) VALUES (?,?,?,?,?,?,?)",(self.index, title,address,phone,email,web,desc))
        for url in img_url:
            query_db("INSERT INTO image_url (hotel_id, url) values (?,?)",(self.index,url))
        self.index += 1
        print("Insert: ",self.index)

