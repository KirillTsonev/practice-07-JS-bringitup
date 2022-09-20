export default class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll("input");
        this.message = {
            loading: "Loading",
            success: "Success",
            failure: "Failure",
        };
        this.path = "assets/question.php";
    }

    clearInputs() {
        this.inputs.forEach(a => {
            a.value = "";
        });
    }

    checkMailInputs() {
        const mailInputs = document.querySelectorAll("[type='email']");

        mailInputs.forEach(a => {
            a.addEventListener("keypress", (e) => {
                if (e.key.match(/[^a-z0-9@ \.]/ig)) {
                    e.preventDefault();
                }
            });
        });
    }

    initMask() {
        let setCursorPosition = (pos, elem) => {
            elem.focus();
            elem.setSelectionRange(pos, pos);
        };
    
        function createMask(event) {
            let matrix = "+1 (___) ___-____";
            let i = 0;
            let def = matrix.replace(/\D/g, "");
            let val = this.value.replace(/\D/g, "");
    
            if (def.length >= val.length) {
                val = def;
            }
    
            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
            });
    
            if (event.type === "blur") {
                if (this.value.length === 2) {
                    this.value = "";
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }
    
        let inputs = document.querySelectorAll("[name='phone']");
    
        inputs.forEach(a => {
            a.addEventListener("input", createMask);
            a.addEventListener("focus", createMask);
            a.addEventListener("blur", createMask);
        });
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: "POST",
            body: data,
        });
    
        return await res.text();
    }

    init() {
        this.checkMailInputs();
        this.initMask();
        
        this.forms.forEach(a => {
            a.addEventListener("submit", (e) => {
                e.preventDefault();

                let statusMessage = document.createElement("div");
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
                a.parentNode.appendChild(statusMessage);

                statusMessage.textContent = this.message.loading;

                const formData = new FormData(a);

                this.postData(this.path, formData)
                    .then(() => {
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 6000);
                    });
            });
        });
    }
}