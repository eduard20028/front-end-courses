let letterCount = (str, char) => {
    return str.match(new RegExp(char, 'gi')).length;
}
letterCount("Maggy", "g");
letterCount("arrGgG", "g");