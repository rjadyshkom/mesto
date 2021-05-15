export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._initialArray = items;
        this.renderer = renderer;

        this._container = document.querySelector(containerSelector);
    };

    addItem(element) {
        this._container.prepend(element);
    };

    renderItems() {
        this._initialArray.reverse().forEach(item => {
            this.renderer(item);
        });
    };
}