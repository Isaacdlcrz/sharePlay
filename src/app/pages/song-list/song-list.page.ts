import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActionSheetController, GestureController, IonCard } from '@ionic/angular';


@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.page.html',
  styleUrls: ['./song-list.page.scss'],
})
export class SongListPage implements OnInit {

  songs = [
    {
      name: "Hola",
      artist: "José José"
    },
    {
      name: "Como",
      artist: "Alfredo Olivas"
    },
    {
      name: "Estás",
      artist: "Ariel Camacho"
    },
    {
      name: "unu",
      artist: "El Komander"
    },
  ]

  private longPressActive : boolean;
  private numberOfCliks: number = 0;

  @ViewChildren(IonCard, {read: ElementRef}) cards: QueryList<ElementRef>;

  constructor(
    private gestureCtrl: GestureController,
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const cardArray = this.cards.toArray();
    
    this.longPress(cardArray);
  }

  longPress(cardArray) {
    const longPressTime = 500;
    for(let i = 0; i < cardArray.length; i++) {
      const card = cardArray[i];
      console.log(card);
      
      const gesture = this.gestureCtrl.create({
        el: card.nativeElement,
        gestureName: 'long_press',
        threshold: 0,
        onStart: () => {
          this.longPressActive = true;
          setTimeout( () => {
            if(this.longPressActive) {
              this.showSongOptions(i);
            }
            
          }, longPressTime)
        },
        onEnd : () => {
          this.longPressActive = false;
        }
      });
    
      gesture.enable();
    }
  }

  async showSongOptions(index) {
    const actionSheet = await this.actionSheetController.create({
      header: this.songs[index].name,
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Play (open modal)',
          icon: 'caret-forward-circle',
          handler: () => {
            console.log('Play clicked');
          }
        },
        {
          text: 'Edit',
          icon: 'create',
          handler: () => {
            console.log('Edit clicked');
          }
        }, 
        {
          text: 'Share',
          icon: 'share',
          handler: () => {
            console.log('Share clicked');
          }
        }, 
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Delete clicked');
          }
        }, 
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }],
      keyboardClose: true,
      mode: "md"
    });
    await actionSheet.present();
  }

  playSong() {
    // alert("KE TRANZAAA");
  }
}
