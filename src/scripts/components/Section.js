export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._containerSelector = containerSelector;
        this._cardArray = document.querySelector(this._containerSelector);
    }

    addItem(element) {
        this._cardArray.prepend(element);
    }

    renderItems() {
        this._renderedItems.forEach((item) => {
            this._renderer(item);
        });
    }
}