export class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._containerSelector = containerSelector;
        this._cardArray = document.querySelector(this._containerSelector);
    }

    addItem(element) {
        this._cardArray.prepend(element);
    }

    renderItems(items) {
        items.forEach((item) => {
            this._renderer(item);
        });
    }
}