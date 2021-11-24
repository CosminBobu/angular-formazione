import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../obj/person';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  genders = ['male', 'female'];
  person: Person
  persons: Person[] = [];
  myForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: [this.person?.name || ''],
      surname: [this.person?.surname || ''],
      username: [this.person?.username || '', Validators.required],
      email: [this.person?.email || '', [Validators.required, Validators.email]],
      gender: [this.person?.gender || ''],
    })
  }

  onSubmit() {
    this.persons.push(new Person(
      this.myForm.controls.name.value,
      this.myForm.controls.surname.value,
      this.myForm.controls.username.value,
      this.myForm.controls.email.value,
      this.myForm.controls.gender.value,))
      this.myForm.reset();
  }

  onPatch() {
    this.myForm.patchValue({
      name: 'Marco',
      surname: 'Polo',
      gender: 'male'
    })
  }
}
