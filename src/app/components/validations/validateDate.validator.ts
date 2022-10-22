import { FormGroup } from "@angular/forms";
import { format } from "date-fns";

export function validateDate(controlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    if (control.value != "") {
      let weekDay = format(new Date(control.value), "EEEE");

      console.log(weekDay);
      if (weekDay == "Saturday") {
        control.setErrors({
          invalidDate: true,
          messageError: "La fecha no puede ser un Sabado.",
        });
      } else if (weekDay == "Sunday") {
        control.setErrors({
          invalidDate: true,
          messageError: "La fecha no puede ser un Domingo.",
        });
      } else {
        control.setErrors(null);
      }
    } else {
      control.setErrors(null);
    }
  };
}
