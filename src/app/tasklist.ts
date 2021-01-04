import { CardStructure } from "./cardstructure";
export class TaskList{
  cards: any = {};
  lastid = -1;
  _addCard(card: CardStructure ) {
    card.id = String(++this.lastid);
    this.cards[card.id] = card;
    return card.id;
  }
  getCard(cardId: string) {
      
    return this.cards[cardId] ;
      
  }
  newCard(description: string): string {
    const card = new CardStructure ();
    card.cardname = description;
    return this._addCard(card);
  }
  replaceCard(cardId: string, description: string){
    this.cards[cardId] = {id:cardId,cardname:description};
    return this.cards
  }
}