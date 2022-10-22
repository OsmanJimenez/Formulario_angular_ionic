import { FormGroup } from "@angular/forms";
import { format } from "date-fns";

export function validateDate(controlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    if (control.value != "") {
      let weekDay = format(new Date(control.value), "EEEE");

      console.log(weekDay);
      if (weekDay == "Saturday" || weekDay == "Sunday") {
        control.setErrors({ invalidDate: true });
      } else {
        control.setErrors(null);
      }
    } else {
      control.setErrors(null);
    }
  };
}
