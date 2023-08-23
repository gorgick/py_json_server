"use strict";

document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:3000/objects')
        .then(data => data.json())
        .then(res => {
        console.log(res)
        buildCards(res);
        function getOptions(word, machines) {
            return machines.filter(s => {
                const regex = new RegExp(word, 'gi');
                return s.title.match(regex);
            })
        };

        function displayOptions() {
            console.log(this.value);
            const options = getOptions(this.value, res)
            const html = options
                .map(res => {
                    const regex = new RegExp(this.value, 'gi');
                    const machineName = res.title.replace(regex,
                        `<span class="hl">${this.value}</span>`
                    )
                    return `<li><span>${machineName}</li></span>`;
                })
                .slice(0,7)
                .join("");
            searchOptions.innerHTML = this.value ? html: null;
        }

        const searchInput = document.querySelector(".search");
        const searchOptions = document.querySelector(".options");

        searchInput.addEventListener("change", displayOptions)
        searchInput.addEventListener("keyup", displayOptions)

    });


    let buildCards = (cards) => {
    let cardsWrapper = document.querySelector('.row');
    cardsWrapper.innerHTML = '';

        cards.forEach(card => {
            let innerCard = `
                <div class="col-md-3">
                    <div class="product">
                      <div class="image">
                          <img src="https://place-hold.it/200x300" alt="">
                      </div>
                      <div class="info">
                        <h3>${card.title}</h3>
                        <div class="info-price">
                            <span class="price">${card.cost} руб.</span>
                            <button class="in-shop">
                                <a href="${card.address}" class="price-dollar">В магазин</a>
                            </button>
                        </div>
                      </div>
                    </div>
                </div>
            `
        cardsWrapper.innerHTML += innerCard;
        })
    }
});