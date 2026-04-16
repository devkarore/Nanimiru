import { Component, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

interface moodModel {
  id: number;
  titre: string;
  libelle_btn: string;
}


@Component({
  selector: 'app-mood',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './mood.html',
  styleUrl: './mood.scss',
})
listeMood = signal<moodModel[]>

export class Mood {

  breakpoints = {
    0: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    }
  };

  ListeEtudiant: EtudiantModel[] = [
    {
          id: 1, 
  titre: Cosy
  libelle_btn: string;
        },

  ];

}

