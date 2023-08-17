import requests
from bs4 import BeautifulSoup


def get_html(url):
    r = requests.get(url)
    return r.text


data_list = []


def get_page_data(html):
    soup = BeautifulSoup(html, 'lxml')
    divs = soup.find_all('div', class_="ModelList__ModelContentBlock")
    for d in divs:
        a = d.find('a').get('title')
        img = d.find('img').get('src')
        prices = d.find_all('span', class_="PriceBlock__PriceValue")
        for price in prices:
            cost = price.find('span').next_sibling.text
            if cost == " p.":
                cost = price.find('span').text
            data = {"name": a, "image": img, "cost": cost}
            data_list.append(data)


def main():
    url = 'https://shop.by/stiralnye_mashiny/'
    get_page_data(get_html(url))
    print(len(data_list))


if __name__ == '__main__':
    main()