/*
  FormLoader
  A small helper library that scans a container for all input elements and gets or 
  sets their respective values.

  jQuery is a dependency to shorten the code, but certainly nothing is too complex
  here, so this dependency will be removed in a sibling library. But if you're
  already using jQuery, may as well save some space by using this version.
*/

// Define a class called FormLoader
export default class FormLoader {
    // Define a constructor that takes a container element as a parameter
    // For simplicity, we will refer to this as a form, though it
    // doesn't need to be an action form.
    constructor(form) {
        // Assign the form element to a property called form
        this.form = form;
    }

    /*
    deserialize
    Define a public method that takes a data object as a parameter. It will loop 
    over each key of the object, search for the element, and set its value.
  */
    deserialize(data) {
        // Save reference to this
        let that = this;

        // Iterate over the properties of the data object
        $.each(data, function (index, value) {
            // Find the input element or select element in the form that has the same name as the property
            // This is a jQuery object.
            let element = that.form.find(`[name='${index}']`);

            // Check the type of the input element
            switch (element.attr("type")) {
                // If it is a checkbox, set the checked property based on the value
                case "checkbox":
                    element.prop("checked", value);
                    break;

                // If it is a radio, find the option that matches the value and check it
                case "radio":
                    element.filter(`[value='${value}']`).prop("checked", true);
                    break;

                // If it is a file, create a URL from the value and set it as the src attribute
                case "file":
                    element.attr("src", URL.createObjectURL(value));
                    break;

                // If it is any other type, set the value property
                // This should handle most types of input including text and textarea
                default:
                    element.val(value);
            }
        });
    }

    serialize() {
        // Unfortunately $.serializeArray requires a form wrapper, I don't want to make that
        // a requirement. It also returns an array instead of an object. So for consistency
        // I've written my own serialize method.

        // Save reference to this
        let that = this,
            inputs = this.form.find("input, textarea, select"),
            response = {};

        // Iterate over the properties of the data object
        $.each(inputs, function (i, v) {
            let value,
                type = v.getAttribute("data-type") || v.type;

            switch (type) {
                // If it is a checkbox, set the checked property based on the value
                case "checkbox":
                    value = v.value === "on";
                    break;

                case "number":
                    value = parseFloat(v.value);
                    break;

                // If it is any other type, get the value property
                // This should handle most types of input including text and textarea
                default:
                    value = v.value;
            }

            // Add to response object
            response[v.name] = value;
        });

        return response;
    }
}
