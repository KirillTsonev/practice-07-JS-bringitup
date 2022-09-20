export default class ShowInfo {
    constructor(triggers) {
        this.btns = document.querySelectorAll(triggers);
    }

    init() {
        this.btns.forEach(a => {
            a.addEventListener("click", () => {
                const sibling = a.closest(".module__info-show").nextElementSibling;

                sibling.classList.toggle("msg");
                sibling.style.marginTop = "20px";
                sibling.style.fontSize = "12px";
            });
        });
    }
}