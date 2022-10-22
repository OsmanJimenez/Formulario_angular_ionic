import { Component } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { validateDate } from "../components/validations/validateDate.validator";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  createForm: FormGroup;

  constructor(public formBuilder: FormBuilder) {}

  ngOnInit() {
    this.validateForm();
  }

  validateForm() {
    this.createForm = this.formBuilder.group({
      first_name: [
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      last_name: [
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      email: [
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      birth_date: ["", Validators.compose([Validators.required])],

      identification: [
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      gender: ["", Validators.compose([Validators.required])],
    },
    {
      validator: validateDate('birth_date'),
    });
  }

  get errorControl() {
    return this.createForm.controls;
  }

  sendData() {
    console.log(this.createForm.controls);
  }
}
