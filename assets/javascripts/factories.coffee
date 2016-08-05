React = require 'react'

tags = ['div', 'em', 'span', 'a', 'button', 'input', 'ul', 'li', 'i']

module.exports = tags.reduce (x, y) ->
    x[y]= React.createFactory y
    x
, {}
