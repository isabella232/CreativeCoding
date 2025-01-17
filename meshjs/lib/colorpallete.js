import Color from "./color.js";
import { randomInt } from "./math.js";

export default class ColorPallete {
  constructor(colors, name) {
    this._colors = colors;
    this._index = -1;
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get colors() {
    return this._colors;
  }

  set colors(colors) {
    this._colors = colors;
  }

  get size() {
    return this._colors.length;
  }

  //todo: this should probably be a getColorAtIndex
  getColorAtIndex(index) {
    return this._colors[index];
  }

  //todo: this should probably be getRandomColor
  getRandomColor() {
    //make sure we dont return same color twice in a row
    let index = this._index;
    let rIndex = index;
    while (rIndex == index) {
      index = randomInt(0, this._colors.length);
    }

    return this.getColorAtIndex(index);
  }

  //todo: this should probably be getNextColor
  getNextColor() {
    this._index++;

    if (this._index == this._colors.length) {
      this._index = 0;
    }

    return this.getColorAtIndex(this._index);
  }
}

function createPallete(pallete) {
  let out = [];

  for (let p of pallete.colors) {
    out.push(new Color(p.r, p.g, p.b));
  }

  return new ColorPallete(out, pallete.name);
}

export function colorPalleteFromName(name) {
  for (let p of palletes) {
    if (p.name == name) {
      return createPallete(p);
    }
  }

  return undefined;
}

let lastPalleteIndex = -1;
export function randomColorPallete() {
  if (palletes.length <= 1) {
    lastPalleteIndex = 0;
    return createPallete(palletes[0]);
  }

  let index = lastPalleteIndex;
  while (index == lastPalleteIndex) {
    index = randomInt(0, palletes.length);
  }

  lastPalleteIndex = index;

  return createPallete(palletes[index]);
}

//palletes from colourlovers.com
//http://www.colourlovers.com/api/palettes/top?format=json&numResults=100
//http://www.colourlovers.com/api
let palletes = [
  {
    name: "Melon Ball Surprise",
    colors: [
      {
        r: 209,
        g: 242,
        b: 165
      },
      {
        r: 239,
        g: 250,
        b: 180
      },
      {
        r: 255,
        g: 196,
        b: 140
      },
      {
        r: 255,
        g: 159,
        b: 128
      },
      {
        r: 245,
        g: 105,
        b: 145
      }
    ]
  },
  {
    name: "Giant Goldfish",
    colors: [
      {
        r: 105,
        g: 210,
        b: 231
      },
      {
        r: 167,
        g: 219,
        b: 216
      },
      {
        r: 224,
        g: 228,
        b: 204
      },
      {
        r: 243,
        g: 134,
        b: 48
      },
      {
        r: 250,
        g: 105,
        b: 0
      }
    ]
  },
  {
    name: "(???)",
    colors: [
      {
        r: 254,
        g: 67,
        b: 101
      },
      {
        r: 252,
        g: 157,
        b: 154
      },
      {
        r: 249,
        g: 205,
        b: 173
      },
      {
        r: 200,
        g: 200,
        b: 169
      },
      {
        r: 131,
        g: 175,
        b: 155
      }
    ]
  },
  {
    name: "Thought Provoking",
    colors: [
      {
        r: 236,
        g: 208,
        b: 120
      },
      {
        r: 217,
        g: 91,
        b: 67
      },
      {
        r: 192,
        g: 41,
        b: 66
      },
      {
        r: 84,
        g: 36,
        b: 55
      },
      {
        r: 83,
        g: 119,
        b: 122
      }
    ]
  },
  {
    name: "cheer up emo kid",
    colors: [
      {
        r: 85,
        g: 98,
        b: 112
      },
      {
        r: 78,
        g: 205,
        b: 196
      },
      {
        r: 199,
        g: 244,
        b: 100
      },
      {
        r: 255,
        g: 107,
        b: 107
      },
      {
        r: 196,
        g: 77,
        b: 88
      }
    ]
  },
  {
    name: "let them eat cake",
    colors: [
      {
        r: 119,
        g: 79,
        b: 56
      },
      {
        r: 224,
        g: 142,
        b: 121
      },
      {
        r: 241,
        g: 212,
        b: 175
      },
      {
        r: 236,
        g: 229,
        b: 206
      },
      {
        r: 197,
        g: 224,
        b: 220
      }
    ]
  },
  {
    name: "Terra?",
    colors: [
      {
        r: 232,
        g: 221,
        b: 203
      },
      {
        r: 205,
        g: 179,
        b: 128
      },
      {
        r: 3,
        g: 101,
        b: 100
      },
      {
        r: 3,
        g: 54,
        b: 73
      },
      {
        r: 3,
        g: 22,
        b: 52
      }
    ]
  },
  {
    name: "i demand a pancake",
    colors: [
      {
        r: 89,
        g: 79,
        b: 79
      },
      {
        r: 84,
        g: 121,
        b: 128
      },
      {
        r: 69,
        g: 173,
        b: 168
      },
      {
        r: 157,
        g: 224,
        b: 173
      },
      {
        r: 229,
        g: 252,
        b: 194
      }
    ]
  },
  {
    name: "Ocean Five",
    colors: [
      {
        r: 0,
        g: 160,
        b: 176
      },
      {
        r: 106,
        g: 74,
        b: 60
      },
      {
        r: 204,
        g: 51,
        b: 63
      },
      {
        r: 235,
        g: 104,
        b: 65
      },
      {
        r: 237,
        g: 201,
        b: 81
      }
    ]
  },
  {
    name: "LoversInJapan",
    colors: [
      {
        r: 233,
        g: 78,
        b: 119
      },
      {
        r: 214,
        g: 129,
        b: 137
      },
      {
        r: 198,
        g: 164,
        b: 154
      },
      {
        r: 198,
        g: 229,
        b: 217
      },
      {
        r: 244,
        g: 234,
        b: 213
      }
    ]
  },
  {
    name: "Compatible",
    colors: [
      {
        r: 63,
        g: 184,
        b: 175
      },
      {
        r: 127,
        g: 199,
        b: 175
      },
      {
        r: 218,
        g: 216,
        b: 167
      },
      {
        r: 255,
        g: 158,
        b: 157
      },
      {
        r: 255,
        g: 61,
        b: 127
      }
    ]
  },
  {
    name: "Good Friends",
    colors: [
      {
        r: 217,
        g: 206,
        b: 178
      },
      {
        r: 148,
        g: 140,
        b: 117
      },
      {
        r: 213,
        g: 222,
        b: 217
      },
      {
        r: 122,
        g: 106,
        b: 83
      },
      {
        r: 153,
        g: 178,
        b: 183
      }
    ]
  },
  {
    name: "w o r d l e s s .",
    colors: [
      {
        r: 255,
        g: 255,
        b: 255
      },
      {
        r: 203,
        g: 232,
        b: 107
      },
      {
        r: 242,
        g: 233,
        b: 225
      },
      {
        r: 28,
        g: 20,
        b: 13
      },
      {
        r: 203,
        g: 232,
        b: 107
      }
    ]
  },
  {
    name: "Curiosity Killed",
    colors: [
      {
        r: 239,
        g: 255,
        b: 205
      },
      {
        r: 220,
        g: 233,
        b: 190
      },
      {
        r: 85,
        g: 81,
        b: 82
      },
      {
        r: 46,
        g: 38,
        b: 51
      },
      {
        r: 153,
        g: 23,
        b: 60
      }
    ]
  },
  {
    name: "dream magnet",
    colors: [
      {
        r: 52,
        g: 56,
        b: 56
      },
      {
        r: 0,
        g: 95,
        b: 107
      },
      {
        r: 0,
        g: 140,
        b: 158
      },
      {
        r: 0,
        g: 180,
        b: 204
      },
      {
        r: 0,
        g: 223,
        b: 252
      }
    ]
  },
  {
    name: "clairedelune",
    colors: [
      {
        r: 65,
        g: 62,
        b: 74
      },
      {
        r: 115,
        g: 98,
        b: 110
      },
      {
        r: 179,
        g: 129,
        b: 132
      },
      {
        r: 240,
        g: 180,
        b: 158
      },
      {
        r: 247,
        g: 228,
        b: 190
      }
    ]
  },
  {
    name: "Dance To Forget",
    colors: [
      {
        r: 255,
        g: 78,
        b: 80
      },
      {
        r: 252,
        g: 145,
        b: 58
      },
      {
        r: 249,
        g: 212,
        b: 35
      },
      {
        r: 237,
        g: 229,
        b: 116
      },
      {
        r: 225,
        g: 245,
        b: 196
      }
    ]
  },
  {
    name: "coup de grâce",
    colors: [
      {
        r: 153,
        g: 184,
        b: 152
      },
      {
        r: 254,
        g: 206,
        b: 168
      },
      {
        r: 255,
        g: 132,
        b: 124
      },
      {
        r: 232,
        g: 74,
        b: 95
      },
      {
        r: 42,
        g: 54,
        b: 59
      }
    ]
  },
  {
    name: "Headache",
    colors: [
      {
        r: 101,
        g: 86,
        b: 67
      },
      {
        r: 128,
        g: 188,
        b: 163
      },
      {
        r: 246,
        g: 247,
        b: 189
      },
      {
        r: 230,
        g: 172,
        b: 39
      },
      {
        r: 191,
        g: 77,
        b: 40
      }
    ]
  },
  {
    name: "fresh cut day",
    colors: [
      {
        r: 0,
        g: 168,
        b: 198
      },
      {
        r: 64,
        g: 192,
        b: 203
      },
      {
        r: 249,
        g: 242,
        b: 231
      },
      {
        r: 174,
        g: 226,
        b: 57
      },
      {
        r: 143,
        g: 190,
        b: 0
      }
    ]
  },
  {
    name: "you are beautiful",
    colors: [
      {
        r: 53,
        g: 19,
        b: 48
      },
      {
        r: 66,
        g: 66,
        b: 84
      },
      {
        r: 100,
        g: 144,
        b: 138
      },
      {
        r: 232,
        g: 202,
        b: 164
      },
      {
        r: 204,
        g: 42,
        b: 65
      }
    ]
  },
  {
    name: "mystery machine",
    colors: [
      {
        r: 85,
        g: 66,
        b: 54
      },
      {
        r: 247,
        g: 120,
        b: 37
      },
      {
        r: 211,
        g: 206,
        b: 61
      },
      {
        r: 241,
        g: 239,
        b: 165
      },
      {
        r: 96,
        g: 185,
        b: 154
      }
    ]
  },
  {
    name: "forever lost",
    colors: [
      {
        r: 93,
        g: 65,
        b: 87
      },
      {
        r: 131,
        g: 134,
        b: 137
      },
      {
        r: 168,
        g: 202,
        b: 186
      },
      {
        r: 202,
        g: 215,
        b: 178
      },
      {
        r: 235,
        g: 227,
        b: 170
      }
    ]
  },
  {
    name: "Vintage Modern",
    colors: [
      {
        r: 140,
        g: 35,
        b: 24
      },
      {
        r: 94,
        g: 140,
        b: 106
      },
      {
        r: 136,
        g: 166,
        b: 94
      },
      {
        r: 191,
        g: 179,
        b: 90
      },
      {
        r: 242,
        g: 196,
        b: 90
      }
    ]
  },
  {
    name: "Maddening Caravan",
    colors: [
      {
        r: 250,
        g: 208,
        b: 137
      },
      {
        r: 255,
        g: 156,
        b: 91
      },
      {
        r: 245,
        g: 99,
        b: 74
      },
      {
        r: 237,
        g: 48,
        b: 60
      },
      {
        r: 59,
        g: 129,
        b: 131
      }
    ]
  },
  {
    name: "Wasabi Suicide",
    colors: [
      {
        r: 255,
        g: 66,
        b: 66
      },
      {
        r: 244,
        g: 250,
        b: 210
      },
      {
        r: 212,
        g: 238,
        b: 94
      },
      {
        r: 225,
        g: 237,
        b: 185
      },
      {
        r: 240,
        g: 242,
        b: 235
      }
    ]
  },
  {
    name: "1001 Stories",
    colors: [
      {
        r: 248,
        g: 177,
        b: 149
      },
      {
        r: 246,
        g: 114,
        b: 128
      },
      {
        r: 192,
        g: 108,
        b: 132
      },
      {
        r: 108,
        g: 91,
        b: 123
      },
      {
        r: 53,
        g: 92,
        b: 125
      }
    ]
  },
  {
    name: "tech light",
    colors: [
      {
        r: 209,
        g: 231,
        b: 81
      },
      {
        r: 255,
        g: 255,
        b: 255
      },
      {
        r: 0,
        g: 0,
        b: 0
      },
      {
        r: 77,
        g: 188,
        b: 233
      },
      {
        r: 38,
        g: 173,
        b: 228
      }
    ]
  },
  {
    name: "A Dream in Color",
    colors: [
      {
        r: 27,
        g: 103,
        b: 107
      },
      {
        r: 81,
        g: 149,
        b: 72
      },
      {
        r: 136,
        g: 196,
        b: 37
      },
      {
        r: 190,
        g: 242,
        b: 2
      },
      {
        r: 234,
        g: 253,
        b: 230
      }
    ]
  },
  {
    name: "Storming Psychedelia",
    colors: [
      {
        r: 188,
        g: 189,
        b: 172
      },
      {
        r: 207,
        g: 190,
        b: 39
      },
      {
        r: 242,
        g: 116,
        b: 53
      },
      {
        r: 240,
        g: 36,
        b: 117
      },
      {
        r: 59,
        g: 45,
        b: 56
      }
    ]
  },
  {
    name: "Papua New Guinea",
    colors: [
      {
        r: 94,
        g: 65,
        b: 47
      },
      {
        r: 252,
        g: 235,
        b: 182
      },
      {
        r: 120,
        g: 192,
        b: 168
      },
      {
        r: 240,
        g: 120,
        b: 24
      },
      {
        r: 240,
        g: 168,
        b: 48
      }
    ]
  },
  {
    name: "t r a n c e",
    colors: [
      {
        r: 69,
        g: 38,
        b: 50
      },
      {
        r: 145,
        g: 32,
        b: 77
      },
      {
        r: 228,
        g: 132,
        b: 74
      },
      {
        r: 232,
        g: 191,
        b: 86
      },
      {
        r: 226,
        g: 247,
        b: 206
      }
    ]
  },
  {
    name: "Newly Risen Moon",
    colors: [
      {
        r: 238,
        g: 230,
        b: 171
      },
      {
        r: 197,
        g: 188,
        b: 142
      },
      {
        r: 105,
        g: 103,
        b: 88
      },
      {
        r: 69,
        g: 72,
        b: 75
      },
      {
        r: 54,
        g: 57,
        b: 59
      }
    ]
  },
  {
    name: "Koi Carp",
    colors: [
      {
        r: 240,
        g: 216,
        b: 168
      },
      {
        r: 61,
        g: 28,
        b: 0
      },
      {
        r: 134,
        g: 184,
        b: 177
      },
      {
        r: 242,
        g: 214,
        b: 148
      },
      {
        r: 250,
        g: 42,
        b: 0
      }
    ]
  },
  {
    name: "Lena's Love Letter",
    colors: [
      {
        r: 240,
        g: 65,
        b: 85
      },
      {
        r: 255,
        g: 130,
        b: 58
      },
      {
        r: 242,
        g: 242,
        b: 111
      },
      {
        r: 255,
        g: 247,
        b: 189
      },
      {
        r: 149,
        g: 207,
        b: 183
      }
    ]
  },
  {
    name: "Hymn For My Soul",
    colors: [
      {
        r: 42,
        g: 4,
        b: 74
      },
      {
        r: 11,
        g: 46,
        b: 89
      },
      {
        r: 13,
        g: 103,
        b: 89
      },
      {
        r: 122,
        g: 179,
        b: 23
      },
      {
        r: 160,
        g: 197,
        b: 95
      }
    ]
  },
  {
    name: "Entrapped InAPalette",
    colors: [
      {
        r: 185,
        g: 215,
        b: 217
      },
      {
        r: 102,
        g: 130,
        b: 132
      },
      {
        r: 42,
        g: 40,
        b: 41
      },
      {
        r: 73,
        g: 55,
        b: 54
      },
      {
        r: 123,
        g: 59,
        b: 59
      }
    ]
  },
  {
    name: "Very",
    colors: [
      {
        r: 187,
        g: 187,
        b: 136
      },
      {
        r: 204,
        g: 198,
        b: 141
      },
      {
        r: 238,
        g: 221,
        b: 153
      },
      {
        r: 238,
        g: 194,
        b: 144
      },
      {
        r: 238,
        g: 170,
        b: 136
      }
    ]
  },
  {
    name: "I like your Smile",
    colors: [
      {
        r: 179,
        g: 204,
        b: 87
      },
      {
        r: 236,
        g: 240,
        b: 129
      },
      {
        r: 255,
        g: 190,
        b: 64
      },
      {
        r: 239,
        g: 116,
        b: 111
      },
      {
        r: 171,
        g: 62,
        b: 91
      }
    ]
  },
  {
    name: "it's raining love",
    colors: [
      {
        r: 163,
        g: 169,
        b: 72
      },
      {
        r: 237,
        g: 185,
        b: 46
      },
      {
        r: 248,
        g: 89,
        b: 49
      },
      {
        r: 206,
        g: 24,
        b: 54
      },
      {
        r: 0,
        g: 153,
        b: 137
      }
    ]
  },
  {
    name: "lucky bubble gum",
    colors: [
      {
        r: 103,
        g: 145,
        b: 122
      },
      {
        r: 23,
        g: 4,
        b: 9
      },
      {
        r: 184,
        g: 175,
        b: 3
      },
      {
        r: 204,
        g: 191,
        b: 130
      },
      {
        r: 227,
        g: 50,
        b: 88
      }
    ]
  },
  {
    name: "Funny Like the Moon",
    colors: [
      {
        r: 232,
        g: 213,
        b: 183
      },
      {
        r: 14,
        g: 36,
        b: 48
      },
      {
        r: 252,
        g: 58,
        b: 81
      },
      {
        r: 245,
        g: 179,
        b: 73
      },
      {
        r: 232,
        g: 213,
        b: 185
      }
    ]
  },
  {
    name: "[p] Wintry Magic",
    colors: [
      {
        r: 170,
        g: 179,
        b: 171
      },
      {
        r: 196,
        g: 203,
        b: 183
      },
      {
        r: 235,
        g: 239,
        b: 201
      },
      {
        r: 238,
        g: 224,
        b: 183
      },
      {
        r: 232,
        g: 202,
        b: 175
      }
    ]
  },
  {
    name: "Influenza",
    colors: [
      {
        r: 48,
        g: 0,
        b: 48
      },
      {
        r: 72,
        g: 0,
        b: 72
      },
      {
        r: 96,
        g: 24,
        b: 72
      },
      {
        r: 192,
        g: 72,
        b: 72
      },
      {
        r: 240,
        g: 114,
        b: 65
      }
    ]
  },
  {
    name: "Machu Picchu",
    colors: [
      {
        r: 96,
        g: 120,
        b: 72
      },
      {
        r: 120,
        g: 144,
        b: 72
      },
      {
        r: 192,
        g: 216,
        b: 96
      },
      {
        r: 240,
        g: 240,
        b: 216
      },
      {
        r: 96,
        g: 72,
        b: 72
      }
    ]
  },
  {
    name: "Thumbelina",
    colors: [
      {
        r: 171,
        g: 82,
        b: 107
      },
      {
        r: 188,
        g: 162,
        b: 151
      },
      {
        r: 197,
        g: 206,
        b: 174
      },
      {
        r: 240,
        g: 226,
        b: 164
      },
      {
        r: 244,
        g: 235,
        b: 195
      }
    ]
  },
  {
    name: "An Old Friend",
    colors: [
      {
        r: 182,
        g: 216,
        b: 192
      },
      {
        r: 200,
        g: 217,
        b: 191
      },
      {
        r: 218,
        g: 218,
        b: 189
      },
      {
        r: 236,
        g: 219,
        b: 188
      },
      {
        r: 254,
        g: 220,
        b: 186
      }
    ]
  },
  {
    name: "400 unique artists ?",
    colors: [
      {
        r: 168,
        g: 230,
        b: 206
      },
      {
        r: 220,
        g: 237,
        b: 194
      },
      {
        r: 255,
        g: 211,
        b: 181
      },
      {
        r: 255,
        g: 170,
        b: 166
      },
      {
        r: 255,
        g: 140,
        b: 148
      }
    ]
  },
  {
    name: "She Is French, Yes?",
    colors: [
      {
        r: 62,
        g: 65,
        b: 71
      },
      {
        r: 255,
        g: 254,
        b: 223
      },
      {
        r: 223,
        g: 186,
        b: 105
      },
      {
        r: 90,
        g: 46,
        b: 46
      },
      {
        r: 42,
        g: 44,
        b: 49
      }
    ]
  },
  {
    name: "metro",
    colors: [
      {
        r: 81,
        g: 81,
        b: 81
      },
      {
        r: 255,
        g: 255,
        b: 255
      },
      {
        r: 0,
        g: 180,
        b: 255
      },
      {
        r: 238,
        g: 238,
        b: 238
      }
    ]
  },
  {
    name: "Miaka",
    colors: [
      {
        r: 252,
        g: 53,
        b: 76
      },
      {
        r: 41,
        g: 34,
        b: 31
      },
      {
        r: 19,
        g: 116,
        b: 125
      },
      {
        r: 10,
        g: 191,
        b: 188
      },
      {
        r: 252,
        g: 247,
        b: 197
      }
    ]
  },
  {
    name: "vivacious",
    colors: [
      {
        r: 204,
        g: 12,
        b: 57
      },
      {
        r: 230,
        g: 120,
        b: 30
      },
      {
        r: 200,
        g: 207,
        b: 2
      },
      {
        r: 248,
        g: 252,
        b: 193
      },
      {
        r: 22,
        g: 147,
        b: 167
      }
    ]
  },
  {
    name: "The Way You Love Me",
    colors: [
      {
        r: 28,
        g: 33,
        b: 48
      },
      {
        r: 2,
        g: 143,
        b: 118
      },
      {
        r: 179,
        g: 224,
        b: 153
      },
      {
        r: 255,
        g: 234,
        b: 173
      },
      {
        r: 209,
        g: 67,
        b: 52
      }
    ]
  },
  {
    name: "don't you go down",
    colors: [
      {
        r: 237,
        g: 235,
        b: 230
      },
      {
        r: 214,
        g: 225,
        b: 199
      },
      {
        r: 148,
        g: 199,
        b: 182
      },
      {
        r: 64,
        g: 59,
        b: 51
      },
      {
        r: 211,
        g: 100,
        b: 59
      }
    ]
  },
  {
    name: "colorful banaani",
    colors: [
      {
        r: 167,
        g: 197,
        b: 189
      },
      {
        r: 229,
        g: 221,
        b: 203
      },
      {
        r: 235,
        g: 123,
        b: 89
      },
      {
        r: 207,
        g: 70,
        b: 71
      },
      {
        r: 82,
        g: 70,
        b: 86
      }
    ]
  },
  {
    name: "undecided",
    colors: [
      {
        r: 218,
        g: 214,
        b: 202
      },
      {
        r: 27,
        g: 176,
        b: 206
      },
      {
        r: 79,
        g: 134,
        b: 153
      },
      {
        r: 106,
        g: 94,
        b: 114
      },
      {
        r: 86,
        g: 52,
        b: 68
      }
    ]
  },
  {
    name: "All Eyes On You",
    colors: [
      {
        r: 92,
        g: 50,
        b: 62
      },
      {
        r: 168,
        g: 39,
        b: 67
      },
      {
        r: 225,
        g: 94,
        b: 50
      },
      {
        r: 192,
        g: 210,
        b: 62
      },
      {
        r: 229,
        g: 240,
        b: 76
      }
    ]
  },
  {
    name: "500 honies?",
    colors: [
      {
        r: 253,
        g: 241,
        b: 204
      },
      {
        r: 198,
        g: 214,
        b: 184
      },
      {
        r: 152,
        g: 127,
        b: 105
      },
      {
        r: 227,
        g: 173,
        b: 64
      },
      {
        r: 252,
        g: 208,
        b: 54
      }
    ]
  },
  {
    name: "War",
    colors: [
      {
        r: 35,
        g: 15,
        b: 43
      },
      {
        r: 242,
        g: 29,
        b: 65
      },
      {
        r: 235,
        g: 235,
        b: 188
      },
      {
        r: 188,
        g: 227,
        b: 197
      },
      {
        r: 130,
        g: 179,
        b: 174
      }
    ]
  },
  {
    name: "A Kiss To Awake",
    colors: [
      {
        r: 185,
        g: 211,
        b: 176
      },
      {
        r: 129,
        g: 189,
        b: 164
      },
      {
        r: 178,
        g: 135,
        b: 116
      },
      {
        r: 248,
        g: 143,
        b: 121
      },
      {
        r: 246,
        g: 170,
        b: 147
      }
    ]
  },
  {
    name: "still be friends?",
    colors: [
      {
        r: 58,
        g: 17,
        b: 28
      },
      {
        r: 87,
        g: 73,
        b: 81
      },
      {
        r: 131,
        g: 152,
        b: 142
      },
      {
        r: 188,
        g: 222,
        b: 165
      },
      {
        r: 230,
        g: 249,
        b: 188
      }
    ]
  },
  {
    name: "My November.",
    colors: [
      {
        r: 94,
        g: 57,
        b: 41
      },
      {
        r: 205,
        g: 140,
        b: 82
      },
      {
        r: 183,
        g: 209,
        b: 163
      },
      {
        r: 222,
        g: 232,
        b: 190
      },
      {
        r: 252,
        g: 247,
        b: 211
      }
    ]
  },
  {
    name: "s e x ' n . r o l l ",
    colors: [
      {
        r: 28,
        g: 1,
        b: 19
      },
      {
        r: 107,
        g: 1,
        b: 3
      },
      {
        r: 163,
        g: 0,
        b: 6
      },
      {
        r: 194,
        g: 26,
        b: 1
      },
      {
        r: 240,
        g: 60,
        b: 2
      }
    ]
  },
  {
    name: "american idiot",
    colors: [
      {
        r: 0,
        g: 0,
        b: 0
      },
      {
        r: 159,
        g: 17,
        b: 27
      },
      {
        r: 177,
        g: 22,
        b: 35
      },
      {
        r: 41,
        g: 44,
        b: 55
      },
      {
        r: 204,
        g: 204,
        b: 204
      }
    ]
  },
  {
    name: "victoria's secret",
    colors: [
      {
        r: 56,
        g: 47,
        b: 50
      },
      {
        r: 255,
        g: 234,
        b: 242
      },
      {
        r: 252,
        g: 217,
        b: 229
      },
      {
        r: 251,
        g: 197,
        b: 216
      },
      {
        r: 241,
        g: 57,
        b: 109
      }
    ]
  },
  {
    name: "japan9",
    colors: [
      {
        r: 227,
        g: 223,
        b: 186
      },
      {
        r: 200,
        g: 214,
        b: 191
      },
      {
        r: 147,
        g: 204,
        b: 198
      },
      {
        r: 108,
        g: 189,
        b: 181
      },
      {
        r: 26,
        g: 31,
        b: 30
      }
    ]
  },
  {
    name: "threadless",
    colors: [
      {
        r: 27,
        g: 50,
        b: 95
      },
      {
        r: 156,
        g: 196,
        b: 228
      },
      {
        r: 233,
        g: 242,
        b: 249
      },
      {
        r: 58,
        g: 137,
        b: 201
      },
      {
        r: 242,
        g: 108,
        b: 79
      }
    ]
  },
  {
    name: "Walking Away",
    colors: [
      {
        r: 246,
        g: 246,
        b: 246
      },
      {
        r: 232,
        g: 232,
        b: 232
      },
      {
        r: 51,
        g: 51,
        b: 51
      },
      {
        r: 153,
        g: 1,
        b: 0
      },
      {
        r: 185,
        g: 5,
        b: 4
      }
    ]
  },
  {
    name: "sands of time",
    colors: [
      {
        r: 193,
        g: 179,
        b: 152
      },
      {
        r: 96,
        g: 89,
        b: 81
      },
      {
        r: 251,
        g: 238,
        b: 194
      },
      {
        r: 97,
        g: 166,
        b: 171
      },
      {
        r: 172,
        g: 206,
        b: 192
      }
    ]
  },
  {
    name: "The Key",
    colors: [
      {
        r: 141,
        g: 204,
        b: 173
      },
      {
        r: 152,
        g: 136,
        b: 100
      },
      {
        r: 254,
        g: 166,
        b: 162
      },
      {
        r: 249,
        g: 214,
        b: 172
      },
      {
        r: 255,
        g: 233,
        b: 175
      }
    ]
  },
  {
    name: "One Sixty-Eight ?",
    colors: [
      {
        r: 94,
        g: 159,
        b: 163
      },
      {
        r: 220,
        g: 209,
        b: 180
      },
      {
        r: 250,
        g: 184,
        b: 127
      },
      {
        r: 248,
        g: 126,
        b: 123
      },
      {
        r: 176,
        g: 85,
        b: 116
      }
    ]
  },
  {
    name: "leatherbound",
    colors: [
      {
        r: 149,
        g: 31,
        b: 43
      },
      {
        r: 245,
        g: 244,
        b: 215
      },
      {
        r: 224,
        g: 223,
        b: 177
      },
      {
        r: 165,
        g: 163,
        b: 108
      },
      {
        r: 83,
        g: 82,
        b: 51
      }
    ]
  },
  {
    name: "Happy Day !",
    colors: [
      {
        r: 161,
        g: 219,
        b: 178
      },
      {
        r: 254,
        g: 229,
        b: 173
      },
      {
        r: 250,
        g: 202,
        b: 102
      },
      {
        r: 247,
        g: 165,
        b: 65
      },
      {
        r: 244,
        g: 93,
        b: 76
      }
    ]
  },
  {
    name: "antidesign",
    colors: [
      {
        r: 65,
        g: 61,
        b: 61
      },
      {
        r: 4,
        g: 0,
        b: 4
      },
      {
        r: 200,
        g: 255,
        b: 0
      },
      {
        r: 250,
        g: 2,
        b: 60
      },
      {
        r: 75,
        g: 0,
        b: 15
      }
    ]
  },
  {
    name: "Outer Rings",
    colors: [
      {
        r: 239,
        g: 243,
        b: 205
      },
      {
        r: 178,
        g: 213,
        b: 186
      },
      {
        r: 97,
        g: 173,
        b: 160
      },
      {
        r: 36,
        g: 143,
        b: 141
      },
      {
        r: 96,
        g: 80,
        b: 99
      }
    ]
  },
  {
    name: "Nobody ? Sugar",
    colors: [
      {
        r: 45,
        g: 45,
        b: 41
      },
      {
        r: 33,
        g: 90,
        b: 109
      },
      {
        r: 60,
        g: 162,
        b: 162
      },
      {
        r: 146,
        g: 199,
        b: 163
      },
      {
        r: 223,
        g: 236,
        b: 230
      }
    ]
  },
  {
    name: "She Sells Seashells.",
    colors: [
      {
        r: 255,
        g: 239,
        b: 211
      },
      {
        r: 255,
        g: 254,
        b: 228
      },
      {
        r: 208,
        g: 236,
        b: 234
      },
      {
        r: 159,
        g: 214,
        b: 210
      },
      {
        r: 139,
        g: 122,
        b: 94
      }
    ]
  },
  {
    name: "Salt With Battery",
    colors: [
      {
        r: 207,
        g: 255,
        b: 221
      },
      {
        r: 180,
        g: 222,
        b: 193
      },
      {
        r: 92,
        g: 88,
        b: 99
      },
      {
        r: 168,
        g: 81,
        b: 99
      },
      {
        r: 255,
        g: 31,
        b: 76
      }
    ]
  },
  {
    name: "Christina",
    colors: [
      {
        r: 78,
        g: 57,
        b: 93
      },
      {
        r: 130,
        g: 112,
        b: 133
      },
      {
        r: 142,
        g: 190,
        b: 148
      },
      {
        r: 204,
        g: 252,
        b: 142
      },
      {
        r: 220,
        g: 91,
        b: 62
      }
    ]
  },
  {
    name: "Carrot Cafe",
    colors: [
      {
        r: 157,
        g: 201,
        b: 172
      },
      {
        r: 255,
        g: 254,
        b: 199
      },
      {
        r: 245,
        g: 98,
        b: 24
      },
      {
        r: 255,
        g: 157,
        b: 46
      },
      {
        r: 145,
        g: 145,
        b: 103
      }
    ]
  },
  {
    name: "Good Friends",
    colors: [
      {
        r: 168,
        g: 167,
        b: 167
      },
      {
        r: 204,
        g: 82,
        b: 122
      },
      {
        r: 232,
        g: 23,
        b: 93
      },
      {
        r: 71,
        g: 71,
        b: 71
      },
      {
        r: 54,
        g: 54,
        b: 54
      }
    ]
  },
  {
    name: "after the heist",
    colors: [
      {
        r: 248,
        g: 237,
        b: 209
      },
      {
        r: 216,
        g: 138,
        b: 138
      },
      {
        r: 71,
        g: 72,
        b: 67
      },
      {
        r: 157,
        g: 157,
        b: 147
      },
      {
        r: 197,
        g: 207,
        b: 198
      }
    ]
  },
  {
    name: "[CHIC] Dreamer",
    colors: [
      {
        r: 243,
        g: 138,
        b: 138
      },
      {
        r: 85,
        g: 68,
        b: 61
      },
      {
        r: 160,
        g: 202,
        b: 181
      },
      {
        r: 205,
        g: 233,
        b: 202
      },
      {
        r: 241,
        g: 237,
        b: 208
      }
    ]
  },
  {
    name: "[slow motion]",
    colors: [
      {
        r: 255,
        g: 237,
        b: 191
      },
      {
        r: 247,
        g: 128,
        b: 60
      },
      {
        r: 245,
        g: 72,
        b: 40
      },
      {
        r: 46,
        g: 13,
        b: 35
      },
      {
        r: 248,
        g: 228,
        b: 193
      }
    ]
  },
  {
    name: "Making Coffee",
    colors: [
      {
        r: 12,
        g: 165,
        b: 176
      },
      {
        r: 78,
        g: 63,
        b: 48
      },
      {
        r: 254,
        g: 254,
        b: 235
      },
      {
        r: 248,
        g: 244,
        b: 228
      },
      {
        r: 165,
        g: 179,
        b: 170
      }
    ]
  },
  {
    name: "Hands On",
    colors: [
      {
        r: 78,
        g: 77,
        b: 74
      },
      {
        r: 53,
        g: 52,
        b: 50
      },
      {
        r: 148,
        g: 186,
        b: 101
      },
      {
        r: 39,
        g: 144,
        b: 176
      },
      {
        r: 43,
        g: 78,
        b: 114
      }
    ]
  },
  {
    name: "a lost memory.",
    colors: [
      {
        r: 77,
        g: 59,
        b: 59
      },
      {
        r: 222,
        g: 98,
        b: 98
      },
      {
        r: 255,
        g: 184,
        b: 140
      },
      {
        r: 255,
        g: 208,
        b: 179
      },
      {
        r: 245,
        g: 224,
        b: 211
      }
    ]
  },
  {
    name: "Sweet Lolly",
    colors: [
      {
        r: 255,
        g: 0,
        b: 60
      },
      {
        r: 255,
        g: 138,
        b: 0
      },
      {
        r: 250,
        g: 190,
        b: 40
      },
      {
        r: 136,
        g: 193,
        b: 0
      },
      {
        r: 0,
        g: 193,
        b: 118
      }
    ]
  },
  {
    name: "400 Lovers",
    colors: [
      {
        r: 4,
        g: 109,
        b: 139
      },
      {
        r: 48,
        g: 146,
        b: 146
      },
      {
        r: 47,
        g: 184,
        b: 172
      },
      {
        r: 147,
        g: 164,
        b: 42
      },
      {
        r: 236,
        g: 190,
        b: 19
      }
    ]
  },
  {
    name: "mai",
    colors: [
      {
        r: 167,
        g: 2,
        b: 103
      },
      {
        r: 241,
        g: 12,
        b: 73
      },
      {
        r: 251,
        g: 107,
        b: 65
      },
      {
        r: 246,
        g: 216,
        b: 107
      },
      {
        r: 51,
        g: 145,
        b: 148
      }
    ]
  },
  {
    name: "G2K Followers",
    colors: [
      {
        r: 255,
        g: 251,
        b: 183
      },
      {
        r: 166,
        g: 246,
        b: 175
      },
      {
        r: 102,
        g: 182,
        b: 171
      },
      {
        r: 91,
        g: 124,
        b: 141
      },
      {
        r: 79,
        g: 41,
        b: 88
      }
    ]
  },
  {
    name: "Omega Nebula",
    colors: [
      {
        r: 157,
        g: 126,
        b: 121
      },
      {
        r: 204,
        g: 172,
        b: 149
      },
      {
        r: 154,
        g: 148,
        b: 124
      },
      {
        r: 116,
        g: 139,
        b: 131
      },
      {
        r: 91,
        g: 117,
        b: 108
      }
    ]
  },
  {
    name: "french kiss",
    colors: [
      {
        r: 237,
        g: 246,
        b: 238
      },
      {
        r: 209,
        g: 192,
        b: 137
      },
      {
        r: 179,
        g: 32,
        b: 77
      },
      {
        r: 65,
        g: 46,
        b: 40
      },
      {
        r: 21,
        g: 17,
        b: 1
      }
    ]
  },
  {
    name: "i n v i s i b l e",
    colors: [
      {
        r: 252,
        g: 254,
        b: 245
      },
      {
        r: 233,
        g: 255,
        b: 225
      },
      {
        r: 205,
        g: 207,
        b: 183
      },
      {
        r: 214,
        g: 230,
        b: 195
      },
      {
        r: 250,
        g: 251,
        b: 227
      }
    ]
  },
  {
    name: "Japanese Bath",
    colors: [
      {
        r: 156,
        g: 221,
        b: 200
      },
      {
        r: 191,
        g: 216,
        b: 173
      },
      {
        r: 221,
        g: 217,
        b: 171
      },
      {
        r: 247,
        g: 175,
        b: 99
      },
      {
        r: 99,
        g: 61,
        b: 46
      }
    ]
  },
  {
    name: "blue chocolate",
    colors: [
      {
        r: 48,
        g: 38,
        b: 28
      },
      {
        r: 64,
        g: 56,
        b: 49
      },
      {
        r: 54,
        g: 84,
        b: 79
      },
      {
        r: 31,
        g: 95,
        b: 97
      },
      {
        r: 11,
        g: 129,
        b: 133
      }
    ]
  },
  {
    name: "This is for YOU!",
    colors: [
      {
        r: 209,
        g: 49,
        b: 61
      },
      {
        r: 229,
        g: 98,
        b: 92
      },
      {
        r: 249,
        g: 191,
        b: 118
      },
      {
        r: 142,
        g: 178,
        b: 197
      },
      {
        r: 97,
        g: 83,
        b: 117
      }
    ]
  },
  {
    name: "Pop Is Everything",
    colors: [
      {
        r: 170,
        g: 255,
        b: 0
      },
      {
        r: 255,
        g: 170,
        b: 0
      },
      {
        r: 255,
        g: 0,
        b: 170
      },
      {
        r: 170,
        g: 0,
        b: 255
      },
      {
        r: 0,
        g: 170,
        b: 255
      }
    ]
  },
  {
    name: "Lemon Sorbet",
    colors: [
      {
        r: 255,
        g: 225,
        b: 129
      },
      {
        r: 238,
        g: 233,
        b: 229
      },
      {
        r: 250,
        g: 211,
        b: 178
      },
      {
        r: 255,
        g: 186,
        b: 127
      },
      {
        r: 255,
        g: 156,
        b: 151
      }
    ]
  },
  {
    name: "Between The Clouds",
    colors: [
      {
        r: 115,
        g: 200,
        b: 169
      },
      {
        r: 222,
        g: 225,
        b: 182
      },
      {
        r: 225,
        g: 184,
        b: 102
      },
      {
        r: 189,
        g: 85,
        b: 50
      },
      {
        r: 55,
        g: 59,
        b: 68
      }
    ]
  }
];
