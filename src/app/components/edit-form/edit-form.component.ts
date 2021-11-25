import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
})
export class EditFormComponent implements OnInit {
  myForm: FormGroup;
  id: number = 0;
  username: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params) => {
      this.id = params.id;
      this.username = params.username;
    });

    this.myForm = new FormGroup({
      username: new FormControl('', Validators.required),
    });
  }

  onSubmit(username: string) {
    console.log(username);
    /*chiamata metodo che updata l'username*/
  }

  onClick() {
    this.myForm.patchValue({
      username: this.username,
    });
  }
}
