import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
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
  subscriptions: Subscription[] = [];
  counter: number = 0;
  theme: TemplateRef<HTMLElement>;
  timeLeft: number = 60;
  interval: number;

  @ViewChild('quoteInput') input: ElementRef<any> = new ElementRef(null);
  @ViewChild('light') light: TemplateRef<HTMLElement>;
  @ViewChild('dark') dark: TemplateRef<HTMLElement>;

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.postService
        .get('https://jsonplaceholder.typicode.com/posts')
        .pipe(mergeAll())
        .subscribe((data) => this.posts.push(data))
    );
  }

  ngAfterViewInit(): void {
    this.theme = this.light;
  }

  onStart() {
    this.input.nativeElement.value = '';
    this.quote = this.posts[this.postService.randomNum()].title;
    fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map((data) => data.target.value),
        debounceTime(50),
        map((data) => (this.phrase = data))
      )
      .subscribe((_) => this.checkPhrase());
    if (this.timeLeft == 60) {
      this.startTimer();
    }
  }

  onFinish() {
    alert('Complimenti hai digitato ' + this.counter + ' in un minuto');
    this.quote = '';
    this.input.nativeElement.value = '';
  }

  checkPhrase() {
    let temp = 0;
    let arr1 = this.phrase.split(' ');
    let arr2 = this.quote.split(' ');
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr1[i] == arr2[j]) {
          temp++;
          console.log(temp);
        }
      }
    }
    if (arr1.length == arr2.length + 1) {
      this.counter += temp;
      this.onStart();
    }
  }

  changeTheme() {
    this.quote = '';
    if (this.theme === this.light) this.theme = this.dark;
    else this.theme = this.light;
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
        this.onFinish();
      }
    }, 1000);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe);
  }
}
