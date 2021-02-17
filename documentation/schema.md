# Schema

## Users
```
model User {
  id           Int            @id @default(autoincrement())
  username     String         @unique
  hashword     String
  email        String         @unique
  decks        Deck[]
  deckLikes    DeckLikes[]
  comments     Comment[]
  commentLikes CommentLikes[]
}
```
<br>

## Decks

```
model Deck {
  id          Int              @id @default(autoincrement())
  userId      Int
  user        User             @relation(fields: [userId], references: [id])
  name        String
  format      String
  wins        Int
  losses      Int
  buyLink     String?
  imgUrl      String?
  description String?
  mainDeck    MainDeckCards[]
  likes       DeckLikes[]
  comments    Comment[]
  sideBoard   SideBoardCards[]
  deckStrat   Strategy?
}
```
<br>

## MainDeckCards
```
model MainDeckCards {
  deckId   Int
  deck     Deck @relation(fields: [deckId], references: [id])
  cardId   Int
  card     Card @relation("inMainDeck", fields: [cardId], references: [id])
  quantity Int

  @@id([deckId, cardId])
}
```
<br>

## SideBoardCards
```
model SideBoardCards {
  deckId   Int
  deck     Deck @relation(fields: [deckId], references: [id])
  cardId   Int
  card     Card @relation("inSideBoard", fields: [cardId], references: [id])
  quantity Int

  @@id([deckId, cardId])
}
```
<br>

## Comment
```
model Comment {
  id       Int            @id @default(autoincrement())
  authorId Int
  author   User           @relation(fields: [authorId], references: [id])
  deckId   Int
  deck     Deck           @relation(fields: [deckId], references: [id])
  likedBy  CommentLikes[]
  content  String
  edited   Boolean        @default(false)
}
```
<br>

## DeckLikes
```
model DeckLikes {
  userId Int
  user   User @relation(fields: [userId], references: [id])
  deckId Int
  deck   Deck @relation(fields: [deckId], references: [id])

  @@id([userId, deckId])
}
```
<br>

## CommentLikes
```
model CommentLikes {
  userId    Int
  user      User    @relation(fields: [userId], references: [id])
  commentId Int
  comment   Comment @relation(fields: [commentId], references: [id])

  @@id([userId, commentId])
}
```
<br>

## Set
```
model Set {
  id           Int     @id @default(autoincrement())
  name         String
  baseSetSize  Int
  totalSetSize Int
  code         String
  cards        Card[]
  isFoilOnly   Boolean
  isOnlineOnly Boolean
  releaseDate  String
  type         String
}
```
<br>

## Card
```
model Card {
  id                  Int              @id @default(autoincrement())
  artist              String
  borderColor         String
  colorIdentity       String
  colors              String
  cmc                 Int
  flavorText          String?
  frameVersion        String
  hasFoil             Boolean
  hasNonFoil          Boolean
  inMainDeck          MainDeckCards[]  @relation("inMainDeck")
  inSideBoard         SideBoardCards[] @relation("inSideBoard")
  keywords            Keyword[]
  layout              String
  manaCost            String?
  name                String
  power               String?
  rarity              String
  rulings             Ruling[]
  setId               Int
  set                 Set              @relation(fields: [setId], references: [id])
  subtypes            SubType[]
  supertypes          SuperType[]
  text                String?
  toughness           String?
  type                String
  cardTypes           CardType[]
  imgSmall            String?
  imgLarge            String?
  backImgSmall        String?
  backImgLarge        String?
  uuid                String           @unique
  frontFaceName       String?
  otherFaceName       String?
  otherFaceId         String?
  otherFaceText       String?
  otherFaceFlavorText String?
  otherFaceType       String?
  otherFaceColors     String?
  otherFaceManaCost   String?
  artCrop             String?
  backArtCrop         String?
}
```
<br>

## CardSymbol
```
model CardSymbol {
  id      Int    @id @default(autoincrement())
  symbol  String @unique
  svg_uri String
  english String
}
```
<br>

## Keyword
```
model Keyword {
  id    Int    @id @default(autoincrement())
  name  String
  cards Card[]
}
```
<br>

## CardType
```
model CardType {
  id       Int       @id @default(autoincrement())
  name     String
  subtypes SubType[]
  cards    Card[]
}
```
<br>

## SubType
```
model SubType {
  id       Int      @id @default(autoincrement())
  name     String
  cards    Card[]
  typeId   Int
  mainType CardType @relation(fields: [typeId], references: [id])
}
```
<br>

## SuperType
```
model SuperType {
  id    Int    @id @default(autoincrement())
  name  String
  cards Card[]
}
```
<br>

## Ruling
```
model Ruling {
  id     Int    @id @default(autoincrement())
  cardId Int
  card   Card   @relation(fields: [cardId], references: [id])
  text   String
  date   String
}
```
<br>
