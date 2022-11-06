# Contributing

Here I explain how you can help to improve this website. First, you can fork this repo and make a pull request with your changes. If you don't know how to do that, you can also open an issue with your suggestion and I'll try to implement it as soon as I can. Be aware that I'm a college student and I don't have much time to work on this project.

Also I would like to add that I'm really really new to frontend. The code is a little messy in some parts, I'm sorry about that. I'll improve it once I have more time.

<br>

# Language support

Do you want to help me translate this website to your language? You can do it!

I need the following data:

- Questions (with answer and points)
- Natures
- Nature descriptions
- Nature to pokemon
- Strings-language.json

## Questions

My webapp uses JSON as data format. You can use that as base for your translation, but manually translanting 63 questions, natures and answers is A LOT of work. So if your language is supported by the original game (Italian, French or German) and you know a wiki that contains the data, you can send me that link and I'll try to make a script to extract the data from the wiki (that's how I got my actual data).

You can check [the english questions data](./public/lang/en/questions-en.json) as an example.

Also, it's not necessary but I would appreacite if question and answer order is the same as in the spanish and english data I have. That helps me validate faster that the points and natures are correct.

## Natures

I need the natures names. You can check [the english natures data](./public/lang/en/natures-en.json) as an example.

Here I need the natures in the same order as in the spanish and english data I have as I have scripts that rely on that order to validate the data.

## Nature descriptions

I need the nature descriptions for your language. You can check [the english nature descriptions](./public/lang/en/naturedescription-en.json) as an example.

The only requisite here is that it must be a single line. THe container wrapper will automatically adjust the text to fit the container.

## Nature to pokemon

I need the nature to pokemon data for your language. You can check [the english nature to pokemon data](./public/lang/en/naturetopokemon-en.json) as an example.

The order of the pokemon is not important, but the pattern I follow is ``"Nature": ["malePokemon", "femalePokemon"]``

## Strings-language.json

I need the strings-language.json file for your language. You can check [the english strings-language.json](./public/lang/en/strings-en.json) as an example.

If your language is italian, the name of the file would be strings-it.json.