const input = (await Deno.readTextFile("input.txt")).split("\n");

class Hand {
  public red: number;
  public green: number;
  public blue: number;

  constructor(input: { red: number; green: number; blue: number }) {
    // constructor implementation goes here
    this.red = input.red;
    this.green = input.green;
    this.blue = input.blue;
  }

  toString(): string {
    return `${this.red} red, ${this.green} green, ${this.blue} blue`;
  }
}

class Game {
  constructor(public id: number, public hands: Hand[]) {
    // constructor implementation goes here
  }

  static FromString(input: string) {
    const [game, hands] = input.split(":");
    const idMatch = game.match(/Game (\d+)/);
    const id = idMatch ? parseInt(idMatch[1]) : 0;
    const handsArray = [];
    for (const hand of hands.split(";")) {
      const redMatch = hand.match(/(\d+) red/);
      const red = redMatch ? parseInt(redMatch[1]) : 0;
      const greenMatch = hand.match(/(\d+) green/);
      const green = greenMatch ? parseInt(greenMatch[1]) : 0;
      const blueMatch = hand.match(/(\d+) blue/);
      const blue = blueMatch ? parseInt(blueMatch[1]) : 0;
      handsArray.push(new Hand({ red, green, blue }));
    }
    return new Game(id, handsArray);
  }

  isPossible(hand: Hand): boolean {
    return !this.hands.some((h) => {
      // if any of the hands are impossible, then the game is impossible
      return h.red > hand.red || h.green > hand.green || h.blue > hand.blue;
    });
  }

  toString(): string {
    return `Game ${this.id}: ${
      this.hands
        .map((h) => h.toString())
        .join("; ")
    }`;
  }

  minHand(): Hand {
    return this.hands.reduce((min, h) => {
      return {
        red: Math.max(min.red, h.red),
        green: Math.max(min.green, h.green),
        blue: Math.max(min.blue, h.blue),
      };
    });
  }
}

const games = input.map(Game.FromString);

const chosenHand = new Hand({ red: 12, green: 13, blue: 14 });
const possibleGames = games.filter((g) => g.isPossible(chosenHand));
const result = possibleGames.reduce((sum, g) => sum + g.id, 0);

console.log("Games that are possible: " + possibleGames.length);
console.log("Sum of possible games IDs: " + result);

console.log("part 2");
const minHands = games.map((g) => g.minHand());
const powers = minHands.map((h) => h.red * h.green * h.blue);
const sum = powers.reduce((sum, p) => sum + p, 0);
console.log("Sum of powers: " + sum);
