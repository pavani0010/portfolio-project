"use strict";


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle =
    document.querySelector(".menu-toggle");

const navigation =
    document.querySelector(".main-navigation");


if (menuToggle && navigation) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            menuToggle.getAttribute("aria-expanded")
            === "true";

        menuToggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Open navigation menu"
                : "Close navigation menu"
        );

        navigation.classList.toggle(
            "open",
            !isOpen
        );

    });


    /* Close menu when a navigation link is clicked */

    const navLinks =
        navigation.querySelectorAll("a");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            navigation.classList.remove("open");

        });

    });


    /* Close menu with Escape */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            navigation.classList.remove("open");

            menuToggle.focus();

        }

    });

}


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.querySelector("#contact-form");


if (contactForm) {

    const nameInput =
        document.querySelector("#name");

    const emailInput =
        document.querySelector("#email");

    const subjectInput =
        document.querySelector("#subject");

    const messageInput =
        document.querySelector("#message");

    const status =
        document.querySelector("#form-status");


    function setError(input, errorElement, message) {

        input.setAttribute(
            "aria-invalid",
            "true"
        );

        errorElement.textContent = message;

    }


    function clearError(input, errorElement) {

        input.removeAttribute(
            "aria-invalid"
        );

        errorElement.textContent = "";

    }


    function validateForm() {

        let isValid = true;


        const nameError =
            document.querySelector("#name-error");

        const emailError =
            document.querySelector("#email-error");

        const subjectError =
            document.querySelector("#subject-error");

        const messageError =
            document.querySelector("#message-error");


        /* Name */

        if (nameInput.value.trim().length < 2) {

            setError(
                nameInput,
                nameError,
                "Please enter your full name."
            );

            isValid = false;

        } else {

            clearError(
                nameInput,
                nameError
            );

        }


        /* Email */

        if (!emailInput.validity.valid) {

            setError(
                emailInput,
                emailError,
                "Please enter a valid email address."
            );

            isValid = false;

        } else {

            clearError(
                emailInput,
                emailError
            );

        }


        /* Subject */

        if (subjectInput.value.trim().length < 3) {

            setError(
                subjectInput,
                subjectError,
                "Please enter a subject."
            );

            isValid = false;

        } else {

            clearError(
                subjectInput,
                subjectError
            );

        }


        /* Message */

        if (messageInput.value.trim().length < 10) {

            setError(
                messageInput,
                messageError,
                "Message must contain at least 10 characters."
            );

            isValid = false;

        } else {

            clearError(
                messageInput,
                messageError
            );

        }


        return isValid;

    }


    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            status.textContent = "";


            if (!validateForm()) {

                status.textContent =
                    "Please correct the highlighted fields.";

                const firstInvalid =
                    contactForm.querySelector(
                        '[aria-invalid="true"]'
                    );

                if (firstInvalid) {
                    firstInvalid.focus();
                }

                return;

            }


            /*
             * This is a front-end demonstration.
             *
             * For real email delivery, connect this form
             * to a backend or form service.
             */

            const name =
                nameInput.value.trim();

            status.textContent =
                `Thank you, ${name}! Your message has been validated successfully.`;

            contactForm.reset();

        }
    );

}