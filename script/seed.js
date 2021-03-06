'use strict'

const db = require('../server/db')
const {User, Item, Order} = require('../server/db/models')

const users = [
  {
    email: 'cody@email.com',
    password: '123',
    firstName: 'Cody',
    lastName: 'Pugman'
  },
  {
    email: 'murphy@email.com',
    password: '123',
    firstName: 'Murphy',
    lastName: 'McGrady'
  }
]

const items = [
  {
    name: 'Avalon',
    description:
      "The Resistance: Avalon pits the forces of Good and Evil in a battle to control the future of civilization. Arthur represents the future of Britain, a promise of prosperity and honor, yet hidden among his brave warriors are Mordred's unscrupulous minions. These forces of evil are few in number but have knowledge of each other and remain hidden from all but one of Arthur's servants. Merlin alone knows the agents of evil, but he must speak of this only in riddles. If his true identity is discovered, all will be lost.",
    quantity: 35,
    price: 1999,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71ooTJfPLPL._SL1159_.jpg',
    category: 'board',
    ageRange: '12+',
    tags: ['board', 'strategy']
  },
  {
    name: 'Uno',
    description:
      'This #1 Compact UNO Card Game is fast fun for everyone!! Its compact size makes it easier for all around enjoyment. This can be used at home or as a take along game in your travel bag. It is definitely worth to purchase, if you are with children seven years or older. Object of the game: Be the first player to get rid of all of your cards in each round and score points for the cards your opponents are left holding. When you are down to one card, don\'t forget to yell "UNO". Points in rounds accumulate and the first player to reach 500 points wins. Contents: 108 compact UNO cards as follows 19 Blue cards - 0 to 9 19 Green cards - 0 to 9 19 Red cards - 0 to 9 19 Yellow cards - 0 to 9 8 Draw Two cards - 2 each in blue, green, red, and yellow 8 Reverse cards - 2 each in blue, green, red, and yellow 8 Skip cards - 2 each in blue, green, red, and yellow 4 Wild cards 4 Wild Draw Four cards The actual size of the cards are approximately 1.7 x 2.5 inches. The box size is approximately 2.7 x 4.9 inches.',
    quantity: 87,
    price: 1028,
    imageUrl: 'https://pics.drugstore.com/prodimg/227769/900.jpg',
    category: 'card',
    agerange: '7-12',
    tags: ['speed', 'family']
  },
  {
    name: 'Risk',
    description:
      "Take over the world in this exciting game of military strategy, now with a refreshed look that includes updated figures, compelling board art, and improved Mission cards. In the Risk game players set out to conquer their enemies' territories by building an army, moving in troops, and engaging in battle.",
    quantity: 9,
    price: 1997,
    imageUrl:
      'https://cdn-images-1.medium.com/max/1169/1*leQsT43ge-lg8JUgcds02g.jpeg',
    tags: ['strategy'],
    category: 'board',
    ageRange: '12+'
  },
  {
    name: 'Codenames',
    description:
      'Codenames is a social word game with a simple premise and challenging game play. Two rival spymasters know the secret identities of 25 agents. Their teammates know the agents only by their codenames. The teams compete to see who can make contact with all of their agents first. Spymasters give one-word clues that can point to multiple words on the table. Their teammates try to guess words of their color while avoiding those that belong to the opposing team. And everyone wants to avoid the assassin. The game works very well with 4 players if you prefer to guess without help. Or you can add more players if you prefer lively discussion. There is also a cooperative variant where a single team tries to achieve the highest score they can by playing against the game itself.',
    quantity: 34,
    price: 1299,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71ZHkM7fHwL._SY679_.jpg',
    tags: ['strategy', 'guessing'],
    category: 'board',
    ageRange: '12+'
  },
  {
    name: 'Catan',
    description:
      "Your adventurous settlers seek to tame the remote but rich isle of Catan. Start by revealing Catan's many harbors and regions: pastures, fields, mountains, hills, forests, and desert. \n Acquire your resources through trades, cards or lucky dice (even outside your turn). Use resource combinations of grain, wool, ore, brick, and lumber to build roads, settlements, and cities. Buy handy development cards. \n But beware! Someone might cut off your road or play a monopoly card. \n And you never know when the wily robber might steal some of your precious gains! \n Guide your settlers to victory by clever trading and cunning development. The random mix creates a different board virtually every game. No two games are the same!",
    quantity: 5,
    price: 4410,
    imageUrl:
      'https://catanshop.com/content/images/thumbs/0000380_catan_600.jpeg',
    tags: ['strategy'],
    category: 'board',
    ageRange: '12+'
  },
  {
    name: 'Monopoly',
    description:
      "It's the fast-dealing property trading game where players buy, sell, dream and scheme their way to riches. This version of the Monopoly game welcomes the Rubber Ducky, Tyrannosaurus Rex, and Penguin into its family of tokens. Choose your token, place it on GO! and roll the dice to own it all! There can be only one winner in the Monopoly game. Will it be you?",
    quantity: 12,
    price: 1374,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_6e63ca54-f938-4243-b2de-0523a05fe70a?wid=488&hei=488&fmt=pjpeg',
    tags: ['strategy'],
    category: 'board',
    ageRange: '12+'
  },
  {
    name: 'Candy Land',
    description:
      "Start down the colourful road to sweet surprises in this classic Candy Land game that features the fun illustrations and gingerbread man movers that kids love. Players draw colourful cards to guide their mover along the rainbow path to luscious locations such as Peppermint Forest, Lollipop Palace, and Licorice Lagoon! It's such sweet fun as players race to be the first one to reach King Kandy's Castle to win! For 2-4 players.",
    quantity: 7,
    price: 2201,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/91yUG40gv0L._SX425_.jpg',
    tags: ['kids', 'family'],
    category: 'board',
    ageRange: '7-12'
  },
  {
    name: 'Snakes & Ladders',
    description:
      'A simple game which requires basic skill of counting and observation.',
    quantity: 2,
    price: 1408,
    imageUrl:
      'https://www.binayaksen.net/wp-content/uploads/2017/08/0009636_floor-snakes-and-ladders-game.jpeg',
    tags: ['kids', 'family'],
    category: 'board',
    ageRange: '4-7'
  },
  {
    name: 'Scrabble',
    description:
      "Scrabble, the classic crossword game, is full-on fun for friends and family. You can feel the excitement begin as soon as you rack up your letters, choose a great word, and hope to land on a triple-word score. Play the popular Scrabble game the classic way as you take on opponents head-to-head, for a challenging and fun time whether you're a beginner or an expert.",
    quantity: 1,
    price: 1499,
    imageUrl:
      'https://www.riteaid.com/shop/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/0/5/0515154_1.jpg',
    tags: ['strategy', 'educational'],
    category: 'board',
    ageRange: '12+'
  },
  {
    name: 'Chess',
    description:
      'Chess is a game played between two opponents on opposite sides of a board containing 64 squares of alternating colors. Each player has 16 pieces: 1 king, 1 queen, 2 rooks, 2 bishops, 2 knights, and 8 pawns. The goal of the game is to checkmate the other king.',
    quantity: 14,
    price: 2699,
    imageUrl:
      'https://storage.googleapis.com/kaggle-datasets-images/41273/67830/ea55ce3671370acf35824482983a9efb/data-original.jpg?t=2018-08-06-10-20-46',
    tags: ['strategy'],
    category: 'board',
    ageRange: '12+'
  },
  {
    name: 'Exploding Kittens',
    description:
      'Exploding kittens is a card game for people who are into kittens and explosions and laser beams and sometimes goats. In this highly-strategic, kitty-powered version of Russian roulette, players draw cards until someone draws an exploding kitten, at which point they explode, they are Dead, and they are out of the game -- unless that player has a defuse card, which can defuse the kitten using things like laser pointers, belly rubs, and catnip sandwiches. All of the other cards in the deck are used to move, mitigate, or avoid the exploding kittens. Exploding kittens is the most-backed crowd funded project ever, the most-funded game in the history of Kickstarter, and has paved the way for peace and tranquility in the modern world.',
    price: 1999,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/81TMofZh0NL._SL1500_.jpg',
    category: 'card',
    ageRange: '12+',
    quantity: 99,
    tags: ['strategy']
  },
  {
    name: 'Monopoly Deal',
    description:
      "Get a handy way to play the classic property-trading game! Be the first collect 3 full property sets of different colors, and you'll win the Monopoly Deal Card Game. You'll pick up cards when it's your turn and play Action cards to charge players rent, steal their cards or demand money for your birthday. Build up property sets, gather piles of money and keep wheeling and dealing until you're the Monopoly Deal winner! Monopoly and all related characters are trademarks of Hasbro.",
    price: 670,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/91VpONZe6ZL._SL1500_.jpg',
    category: 'card',
    ageRange: '12+',
    quantity: 45,
    tags: ['strategy']
  },
  {
    name: "Watch Ya' Mouth",
    description:
      "Watch Ya' Mouth, Hilarious, Mouthguard Party Game. Originated in viral videos, Launched on Kickstarter, and now on Amazon just for you! In this laughter-inducing, competitive card-based game, teams of players, hampered by cheek retractors, attempt to read and interpret/speak out phrases and.... Hilarity ensues! Good for Ages 8+, with virtually unlimited players (when played using our \"Alternate\" rule set), Watch Ya' Mouth is a must for any gathering, party, game night, or family night. Our mouthpieces are FDA and CE certified, our cards are thick and durable, and our community is second to none. With a variety of phrase packs available, ranging from Family-Safe to Adult-Only, there's something for everyone. Be warned: Stomach-Cramping, Eye-Watering laughter is a very frequent occurrence. \"One of the funniest party games there's been\" Learn it in seconds, play it for hours, and create lasting memories with your friends and family. We're a small, independent, and extremely hard working team whose mission is to make you laugh. Join us, and welcome to the party!",
    price: 1599,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/91mpUd0WIZL._SL1500_.jpg',
    category: 'card',
    ageRange: '12+',
    quantity: 30,
    tags: ['funny', 'family']
  },
  {
    name: 'HedBanz',
    description:
      'Play Hedbanz, the quick question game of "What am I?" Ask "yes" or "no" questions to figure out if the cartoon on your head is an animal, food or man-made object. Be the first player to guess what you are and win! Hedbanz – the game where everybody knows by you! ',
    price: 1599,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/81UxnB18%2BbL._SL1500_.jpg',
    category: 'card',
    ageRange: '7-12',
    quantity: 80,
    tags: ['family', 'educational', 'guessing']
  },
  {
    name: 'HedBanz Junior',
    description:
      "Now younger kids can enjoy their very own version of the popular quick-question game of Hedbanz. Hedbanz Jr. Edition puts kids to the test as they take turns asking 'yes' or 'no' questions to figure out 'what animal am I?' with the help of clue cards and play mats. Silly, funny and engaging, this game helps kids interact and relate to each other as they giggle their way through each round.",
    price: 1499,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/91hVgqj9ZUL._SL1500_.jpg',
    category: 'card',
    ageRange: '4-7',
    quantity: 75,
    tags: ['family', 'kids', 'educational', 'guessing']
  },
  {
    name: 'Heads Up!',
    description:
      "Heads up! Party game 3Rd edition lets you play the party game version of the popular app seen on the ellen DeGeneres's show! Put on a headband and place game cards in with the words facing out— without looking at them! Race the timer to guess the words you' re wearing in your headband based on your teammates; s clues. All-new cards in four categories keep everyone guessing! In Superstars, describe pop culture celebrities without saying any part of their name. In food fight, describe food and drinks. In act it out family style, it' s time to mime. How would you act out musical chairs, Pie eating contest or water balloon fight? In the exclusive deck, bingeworthy, describe popular shows without saying any part of the Title. Think quickly and blurt out answers to earn chips for each card you figure out. The player who earns the most chips wins! With over 1 million games sold, heads up! Is the hilarious party game that' s heads above the rest! Bring out the headbands for a rousing game at your next party",
    price: 1999,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/91krVQgBUPL._SL1500_.jpg',
    category: 'card',
    ageRange: '12+',
    quantity: 75,
    tags: ['guessing', 'family']
  },
  {
    name: 'Smack It!',
    description:
      'Get ready for a fun and exciting twist on the classic card games Slap Jack and War. Smack it! card game for kids is fast-paced, rowdy fun! Players quickly flip their cards into a central pile and battle for the pile during challenge rounds. But stay sharp, you never know when a Smack it! card will appear sending players scrambling for a win. Smack it! is EASY to learn, FUN to play, and sure to be a hit with the whole family.',
    price: 899,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/513pz8iUIvL.jpg',
    category: 'card',
    ageRange: '7-12',
    quantity: 75,
    tags: ['family', 'speed', 'guessing']
  },
  {
    name: 'Blink',
    description:
      "Blink is the lightning-fast game where two players race head-to-head to be the first to play all of their cards! Using sharp eyes and fast hands, players quickly try to match the shape, count or color on the cards. For instance, a card with four yellow stars could be played on any card with yellow (color), or on a card with stars (shape), or on a card with four symbols (count). Don't be fooled by the games' simplicity—your hand and eye coordination will be put to the test! The first player who can rid themselves of all their cards wins. Fast and portable, Blink game is instant fun for everyone! Includes 1 Blink card game with instructions. Colors and decorations may vary.",
    price: 586,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/91Eb6h-QnpL._SL1500_.jpg',
    category: 'card',
    ageRange: '7-12',
    quantity: 86,
    tags: ['speed']
  },
  {
    name: 'Cards Against Humanity',
    description:
      "Cards Against Humanity is a party game for horrible people. Unlike most of the party games you've played before, Cards Against Humanity is as despicable and awkward as you and your friends. ",
    price: 586,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/81U7sn6wbWL._SL1500_.jpg',
    category: 'card',
    ageRange: '12+',
    quantity: 100,
    tags: ['funny']
  }
]

const orders = [
  {
    date: '2018-10-15 19:10:25-07',
    total: 3027,
    streetAddress: '123 Alphabet Ave',
    city: 'New York',
    state: 'NY',
    zipcode: 10001
  },
  {
    total: 3027,
    streetAddress: '456 Chickpea Ave.',
    city: 'San Francisco',
    state: 'CA',
    zipcode: 94602
  }
]

const seed = async () => {
  await db.sync({force: true})
  console.log('connected')
  const [user, item, order] = await Promise.all([
    User.bulkCreate(users, {returning: true, individualHooks: true}),
    Item.bulkCreate(items, {returning: true, individualHooks: true}),
    Order.bulkCreate(orders, {returning: true, individualHooks: true})
  ])
  const [user1, user2] = user
  const [item1, item2, item3] = item
  const [order1, order2] = order
  await order1.setUser(user1)
  await order2.setUser(user2)
  await order1.setItems([item1, item2, item3])
  await order2.setItems([item1, item3])
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed
