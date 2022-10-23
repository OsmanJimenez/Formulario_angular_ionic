import { FormGroup } from "@angular/forms";
import { format } from "date-fns";

export function validateDate(controlName: string) {
  return (formGroup: FormGroup) => {
    let holidays = {
      "01-01-2022": "Año nuevo.",
      "10-01-2022": "Dia de los reyes magos.",
      "21-03-2022": "Dia de San José.",
      "14-04-2022": "Jueves Santo.",
      "15-04-2022": "Viernes Santo.",
      "01-05-2022": "Dia del trabajador.",
      "30-05-2022": "Dia de la ascensión.",
      "20-06-2022": "Corpus Cristi.",
      "27-06-2022": "Sagrado Corazon.",
      "04-07-2022": "San Pedro y San Pablo.",
      "20-07-2022": "Dia de la independencia.",
      "07-08-2022": "Batalla de Boyaca.",
      "15-08-2022": "La asunción de la virgen.",
      "17-10-2022": "Dia de la raza.",
      "07-11-2022": "Dia de los difuntos.",
      "14-11-2022": "Independencia de Cartagena.",
      "08-12-2022": "Dia de la inmaculada concepción.",
      "23-12-2022": "Navidad.",
    };

    const control = formGroup.controls[controlName];
    if (control.value != "") {
      let weekDay = format(new Date(control.value), "EEEE");
      let dateFormat = format(new Date(control.value), "dd-MM-yyyy");

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
        for (var i = 0; i < Object.keys(holidays).length; i++) {
          if (Object.keys(holidays)[i] == dateFormat) {
            control.setErrors({
              invalidDate: true,
              messageError:
                "La fecha no es valida porque es " + Object.values(holidays)[i],
            });

            i = Object.keys(holidays).length;
          } else {
            control.setErrors(null);
          }
        }
      }
    } else {
      control.setErrors({
        invalidDate: true,
        messageError: "La fecha es requerida.",
      });
    }
  };
}
