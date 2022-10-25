import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { format } from "date-fns";
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ValidationsService {
  holidays = {};

  constructor(private http: HttpClient) {
    this.http
      .get("./assets/validations/holidays.json")
      .subscribe((res: any) => {
        this.holidays = res;
        console.log(res);
      });
  }

  Validation() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      console.log(control);
      if (control.value != "") {
        let weekDay = format(new Date(control.value), "EEEE");
        let dateFormat = format(new Date(control.value), "dd-MM-yyyy");
        console.log(weekDay);
        console.log(dateFormat);
        if (weekDay == "Saturday") {
          return {
            invalidDate: true,
            messageError: "La fecha no puede ser un Sabado.",
          };
        } else if (weekDay == "Sunday") {
          return {
            invalidDate: true,
            messageError: "La fecha no puede ser un Domingo.",
          };
        } else {
          for (var i = 0; i < Object.keys(this.holidays).length; i++) {
            if (Object.keys(this.holidays)[i] == dateFormat) {
              i = Object.keys(this.holidays).length;
              console.log(
                "Este es el error: ",
                this.holidays[dateFormat.toString()]
              );
              return {
                invalidDate: true,
                messageError:
                  "La fecha no es valida porque es " +
                  this.holidays[dateFormat.toString()],
              };
            } else {
              control.setErrors(null);
            }
          }
        }
      } else {
        return {
          invalidDate: true,
          messageError: "La fecha es requerida.",
        };
      }

      return null;
    };
  }
}
