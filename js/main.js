!function () {
    var container = document.querySelector(".container"),
        menu = document.querySelector(".menu"),
        menu_trigger = document.querySelector(".menu-trigger"),
        menu_desktop = (document.querySelector(".menu-inner-desktop"), document.querySelector(".menu-inner-list-more-trigger")),
        menu_more = document.querySelector(".menu-inner-list-more"),
        page_form = document.querySelector(".pagination__form"),
        phone_width = getComputedStyle(document.body).getPropertyValue("--phoneWidth"),
        is_phone = function () {
            return window.matchMedia(phone_width).matches
        },
        was_phone = is_phone(),
        toggle_vis = function () {
            menu && is_phone() && !was_phone &&
                menu.classList.add("hidden"),
            menu && !is_phone() &&
                menu.classList.remove("hidden"),
            menu_more && !is_phone() &&
                menu_more.classList.add("hidden"),
            was_phone = is_phone()
        };

    toggle_vis(),
    page_form &&
        (page_form.onsubmit = function(event) {
            if (this.page.value == 1) {
                loc = this.action.slice(0, -5)
            }
            else {
                loc = this.action += this.page.value + '/';
            }
            event.preventDefault();
            window.location.href = loc;
        }),
    menu &&
        menu.addEventListener("click", function (event) {
            return event.stopPropagation()
        }),
    menu_more &&
        menu_more.addEventListener("click", function (event) {
            return event.stopPropagation()
        }),
    document.body.addEventListener("click", function () {
        is_phone() || !menu_more ||
            menu_more.classList.contains("hidden") ?
                is_phone() &&
                    !menu.classList.contains("hidden") &&
                    menu.classList.add("hidden")
            :
                menu_more.classList.add("hidden")
    }),
    window.addEventListener("resize", toggle_vis),
    menu_trigger &&
        (menu_trigger.addEventListener("click", function (event) {
            event.stopPropagation(),
            menu &&
                menu.classList.toggle("hidden")
        }),
        menu_trigger.addEventListener("keyup", function (event) {
            event.stopPropagation(),
            event.code === "Enter" &&
                menu &&
                menu.classList.toggle("hidden")
        })),
    menu_desktop &&
        (menu_desktop.addEventListener("click", function (event) {
            event.stopPropagation(),
            menu_more &&
                menu_more.classList.toggle("hidden"),
            menu_more.getBoundingClientRect().right > container.getBoundingClientRect().right &&
                ((menu_more.style.left = "auto"), (menu_more.style.right = 0))
        }),
        menu_desktop.addEventListener("keyup", function (event) {
            event.stopPropagation(),
            event.code === "Enter" &&
                menu_more &&
                menu_more.classList.toggle("hidden"),
            menu_more.getBoundingClientRect().right > container.getBoundingClientRect().right &&
                ((menu_more.style.left = "auto"), (menu_more.style.right = 0))
        }));
}();
