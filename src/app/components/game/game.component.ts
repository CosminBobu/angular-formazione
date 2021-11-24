import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, mergeAll, tap } from 'rxjs/operators';
import { PostService } from '../../services/post.service';
import { post } from '../../obj/post';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {
  posts: post[] = [];
  quote: string = '';
  phrase: string = '';
  subscribtions: Subscription[] = [];
  counter: number = 0;

  @ViewChild('quoteInput') input: ElementRef<any> = new ElementRef(null);

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.subscribtions.push(
      this.postService
        .get('https://jsonplaceholder.typicode.com/posts')
        .pipe(mergeAll())
        .subscribe((data) => this.posts.push(data))
    );
  }

  ngAfterViewInit(): void {
    fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map((data) => data.target.value),
        tap((data) => console.log(data)),
        debounceTime(50),
        map((data) => (this.phrase = data))
      )
      .subscribe((_) => this.checkPhrase());
  }

  onStart() {
    this.quote = this.posts[this.postService.randomNum()].title;
  }

  onFinish() {
    if (this.phrase === this.quote) {
      alert('Complimenti hai vinto, premere start per una nuova partita');
    } else {
      alert(
        'Peccato sembra che tu abbia fatto degli errori, premere start per riprovare'
      );
    }
    this.input.nativeElement.value = '';
  }

  checkPhrase() {
    this.counter = 0;
    var arr1 = this.phrase.split(' ');
    var arr2 = this.quote.split(' ');
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] == arr2[i]) {
        this.counter++;
        console.log(this.counter);
      }
    }
    if (this.counter == arr2.length) {
      this.onFinish();
    }
  }

  ngOnDestroy() {
    for (let i = 0; i < this.subscribtions.length; i++) {
      this.subscribtions[i].unsubscribe;
    }
  }
}
