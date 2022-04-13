var tags = [];

document.addEventListener("DOMContentLoaded", function (e) {
    var textField = document.getElementById("aw-search-input-field");

    if (textField !== null) {
        var content = textField.value;

        textField.value = "";

        if (content !== undefined) {
            tags = content.split(',');

            tags.forEach(function (tag) {
                if (tag !== undefined && tag !== "" && tag !== "x") {
                    createTag(tag);
                }
            });
        }
    }

    textField.focus();
});

document.addEventListener("submit", function (e) {
    var formElement = document.getElementById("aw-search-form");

    if (formElement !== null) {
        var textField = document.getElementById("aw-search-input-field");

        if (textField !== null) {
            tags.forEach(function (tag) {
                textField.value += tag + ",";
            });

            formElement.submit();
        }
    }
});

document.addEventListener("keypress", function (e) {
    if (e.key == ',') {
        e.preventDefault();

        var textField = document.getElementById("aw-search-input-field");

        if (textField !== null) {
            var content = textField.value;

            textField.value = "";

            if (content !== undefined) {
                content = content.replace(',', '');

                createTag(content);
            }
        }
    }
});

document.addEventListener("keyup", function (e) {
    if (e.key == "Backspace") {
        var formElement = document.getElementById("aw-search-form");
        if (formElement !== null) {
            var textField = document.getElementById("aw-search-input-field");

            if (textField !== null) {
                if (textField.value == "") {
                    var tagToRemove = tags.slice(-1)[0];
                    removeTag(tagToRemove);
                }
            }
        }
    }
});

function createTag(tag) {
    if (tags !== null || tags !== undefined) {
        var tagParagraphElement = document.createElement("p");
        var textNode = document.createTextNode(tag);

        tagParagraphElement.appendChild(textNode);

        var container = document.getElementById("aw-search-form");

        if (container !== null) {
            var removeTagHyperlink = document.createElement("a");
            removeTagHyperlink.href = "#";
            removeTagHyperlink.innerHTML = "x";
            removeTagHyperlink.style.marginLeft = "3px";

            tagParagraphElement.appendChild(removeTagHyperlink);

            var newTag = document.createElement("span");
            newTag.className = "aw-search-tag";
            newTag.style.cssFloat = "left";

            newTag.appendChild(tagParagraphElement);

            removeTagHyperlink.addEventListener("click", function (e) {
                e.target.parentNode.parentNode.remove();
            });

            container.append(newTag);

            tags.push(tag);

            var textField = document.getElementById("aw-search-input-field");

            if (textField !== null) {
                var newTextField = textField;
                textField.remove();

                container.append(newTextField);
                newTextField.focus();
            }
        }
    }
}

function removeTag(tag) {
    var formElement = document.getElementById("aw-search-form");
    var textField = document.getElementById("aw-search-input-field");

    if (formElement !== null) {
        if (textField !== null) {
            var content = textField.value;

            if (content.length < 1) {
                var tagText = tags.slice(-1)[0];

                if (formElement.hasChildNodes) {
                    formElement.childNodes.forEach(function (item) {
                        if (item.textContent.slice(0, -1) == tag) {
                            item.remove();
                            tags.pop();
                        }
                    });
                }
            }
        }
    }
}