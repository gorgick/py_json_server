import json

import requests
from bs4 import BeautifulSoup


def get_html(url):
    r = requests.get(url)
    return r.text


data_list = []


def write_json(data):
    my_dict = {"objects": data_list}
    with open("my_data.json", 'w') as f:
        json.dump(my_dict, f, indent=4)


def get_page_data(html):
    soup = BeautifulSoup(html, 'lxml')
    divs = soup.find_all('div', class_="ModelList__ModelContentBlock")
    for d in divs:
        a = d.find('a').get('href')
        title = d.find('a').get('title')
        prices = d.find_all('span', class_="PriceBlock__PriceValue")
        for price in prices:
            cost = price.find('span').next_sibling.text
            if cost == " p.":
                cost = price.find('span').text
            data = {"address": f'https://shop.by{a}', "title": title, "cost": cost}
            data_list.append(data)


def main():
    url = 'https://shop.by/stiralnye_mashiny/'
    write_json(get_page_data(get_html(url)))


if __name__ == '__main__':
    main()
