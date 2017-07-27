"use strict";

document.addEventListener("DOMContentLoaded", function () {

    //helper functions
    function $$(selector, context) {
        context = context || document;
        var elements = context.querySelectorAll(selector);
        return Array.prototype.slice.call(elements);
    }

    function fieldsNotEmpty(list) {
        for (var i = 0, len = list.length; i < len; i++) {
            if (list[i].value === "") {
                return false;
            }
        }
        return true;
    }

    function addRequiredMsg() {
        var span = document.createElement('span');
        span.innerHTML = 'Required field !';
        span.classList.add('required');

        return span;
    }

    var form = document.querySelector('form[name=login]');
    var fields = $$('form[name=login] input[name^=user]');
    var submit = document.querySelector('form[name=login] button[type=submit]');
    var playVideo = document.querySelector('.video a');
    var blocker = document.querySelector('.blocker');
    var modal = blocker.querySelector('.modal');

    var span = document.createElement('span');
    span.innerHTML = 'Required field !';
    span.classList.add('required');

    form.addEventListener('submit', function (event) {
        var errors = [];

        for (var i = 0, len = fields.length; i < len; i++) {
            if (fields[i].value === "") {
                errors.push(fields[i]);
                fields[i].parentNode.insertBefore(addRequiredMsg(), fields[i].nextSibling);
            }
        }

        if (errors.length == 0) {
            alert('You have successfully submitted the form !');
            return true;
        } else {
            event && event.preventDefault();
            return false;
        }
    });

    fields.forEach(function (field) {
        field.addEventListener("blur", function (event) {

            if (field.nextSibling) {
                field.parentNode.removeChild(field.nextSibling);
            }

            if (field.value === '') {
                field.parentNode.insertBefore(addRequiredMsg(), field.nextSibling);
            }

            if (fieldsNotEmpty(fields)) {
                submit.removeAttribute('disabled');
            } else {
                submit.setAttribute('disabled', 'disabled');
            }
        });
    });

    document.body.addEventListener('click', function (event) {
        if (blocker.classList.contains('active')) {
            modal.querySelector('iframe').remove();
            blocker.classList.remove('active');
        }
    });

    modal.addEventListener('click', function (event) {
        event && event.stopPropagation();
    });

    playVideo.addEventListener('click', function (event) {
        event && event.preventDefault();
        event && event.stopPropagation();
        blocker.classList.add('active');
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube.com/embed/iD4qsWnjsNU?autoplay=1';
        iframe.width = '620px';
        iframe.height = '349px';
        iframe.frameborder = '0';
        modal.querySelector('.cover').appendChild(iframe);
    });
});