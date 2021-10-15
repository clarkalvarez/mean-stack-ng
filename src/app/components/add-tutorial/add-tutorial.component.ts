import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.scss']
})
export class AddTutorialComponent implements OnInit {

  tutorial: Tutorial = {
    name: '',
    department: '',
    position: '',
    image: '',
  };
  submitted = false;
  imageSrc: any;

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
  }

  readURL(event: Event): void {
    if (event.target["files"] && event.target["files"][0]) {
        const file = event.target["files"][0];
        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;
        
        reader.readAsDataURL(file);
    }
}

  saveTutorial(): void {
    const data = {
      name: this.tutorial.name,
      department: this.tutorial.department,
      position: this.tutorial.position,
      image: this.imageSrc,
    };

    this.tutorialService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      name: '',
      department: '',
      position: '',
      image: '',
    };
  }
}