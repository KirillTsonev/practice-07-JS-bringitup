export default class Download {
    constructor(triggers) {
        this.btns = document.querySelectorAll(triggers);
        this.path = "assets/img/mainbg.jpg";
    }

    downloadItem(path) {
        const element = document.createElement("a");

        element.setAttribute("href", path);
        element.setAttribute("download", "filename");
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    init() {
        this.btns.forEach(a => {
            a.addEventListener("click", (e) => {
                e.stopPropagation();
                this.downloadItem(this.path);
            });
        });
    }
}