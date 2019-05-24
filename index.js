"use strict";
const YAML = require('yaml');
var fs = require('fs');

class Extractor {
    constructor(filename){
        const file = fs.readFileSync(filename, 'utf8');
        this.selectors = YAML.parse(file);
    }
    extract_field(element, selector_type, attribute = '') {
        let content;
        if (!selector_type || selector_type === 'Text') {
            content = element.textContent;
        }
        else if (selector_type === 'Link') {
            content = element.href || '';
        }
        else if (selector_type === 'HTML') {
            content = encodeURI((element.innerHTML));
        }
        else if (selector_type === 'Attribute') {
            content = element.getAttribute(attribute);
        }
        return content
    }
    get_child(element, field_config) {
        var child = {}
        for (var field in field_config){
            child[field] = this.extract_selector(element, field_config[field])
        }
        return child
    }
    extract_selector(root_element, field_config){
        var elements;
        if ('xpath' in field_config) {
            elements = root_element.evaluate(field_config['xpath'])
        }
        else{
            elements = root_element.querySelectorAll(field_config['css'])
        }
        var values = []
        elements.forEach(element => {
            var value;
            if ('children' in field_config){
                value = this.get_child(element, field_config['children'])
            }
            else{
                 var selector_type = field_config['type']
                 var attribute = field_config['attribute']
                 value = this.extract_field(element, selector_type, attribute)
            }
            values.push(value)
        });
        if (field_config['multiple'] === true){
            return values;
        }
        else{
            return values[0];
        }
    }
    extract(document) {
        var data = {};
        for (var selector_name in this.selectors){
            var value = this.extract_selector(document, this.selectors[selector_name])
            data[selector_name] = value
        }
        return data;
    }
}

exports.Extractor = Extractor;
