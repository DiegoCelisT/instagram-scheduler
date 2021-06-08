import { HttpClient } from '@angular/common/http';
import { summaryFileName } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})


export class AppComponent implements OnInit {
  public files: NgxFileDropEntry[] = [];
  public channels: any = [];
  public schedules: any = [];
  public schedulePeriod = null;
  public selectedChannel = null;
  public displayedColumns = ['type', 'status', 'image', 'channel', 'date'];
  private form: FormGroup;
  public title = 'nforms';
  public New_imgUrl: any;
  public submit:boolean = false;
  public imageName:string
  public startDate = new Date()

  
  public constructor(private http: HttpClient) {
    this.form = new FormBuilder().group({
      channel: null,
      image: null,
      date: null,
      type: null,
      NewURL: null,
      status: null
    });
  }

  public ngOnInit() {

    this.form.patchValue({ type: 'feed' });
    this.http.get('api/channels').subscribe((channels) => {
      this.selectedChannel = channels[0];
      this.channels = channels;
      this.form.patchValue({ channel: channels[0] });
      // console.log(channels)
    });

    this.http.get('api/schedules').subscribe((scheduleResponse: any) => {
      this.schedulePeriod = {
        start_date: scheduleResponse.start_date,
        end_date: scheduleResponse.end_date,
      };
      this.schedules = scheduleResponse.data;
      // console.log(this.schedules)

      //Para ordenar por data:
      this.schedules.sort(function(a, b) {
        if (a.date > b.date) {
          return 1;
        }
        if (a.date < b.date) {
          return -1;
        }
        return 0;
      });
    });
  }

  public selectChannel(channel) {
    this.selectedChannel = channel;
    this.form.patchValue({ channel });
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
      if (files[0].fileEntry.isFile) {  //Só aceitar 1 arquivo por vez
        const fileEntry = files[0].fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File,) => {
          if (file.type.includes('image')) { //Para permitir somente imagens
            this.form.patchValue({ image: file });
            this.form.patchValue({ date: new Date() }); //Data por default, atualizada ao dia em que é feito o upload do arquivo
            var reader = new FileReader(); // Para ler o arquivo
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.form.patchValue({ NewURL: reader.result }); //Para enviar a imagem nova até a tabela
                this.New_imgUrl = reader.result; //Para previsualizar
                this.submit = true // Mostrar botão de submit
                this.imageName = this.form.value.image.name
              };
            };
          });
      } else {
        const fileEntry = files[0].fileEntry as FileSystemDirectoryEntry;
        // console.log(droppedFile.relativePath, fileEntry);
      }
  }

  public dateInput($event){
    this.form.patchValue({ date: $event.target.value });
  }

  public schedule(statusInput) {
    this.form.patchValue({ status: statusInput });
    if (!this.form.valid) return; // TODO: give feedback
    this.http
      .post('api/schedules', this.form.value, { responseType: 'json' })
      .subscribe((data) => {
        // this.form.reset(); //retiro isso para evitar que se atualize o formulario, pois ao resetar criava conflitos (empty form)
        this.New_imgUrl = "" //Para resetar a imagem preview
        this.submit = false //Ocultar o botão de submit

        this.files = [];
        this.http.get('api/schedules').subscribe((scheduleResponse: any) => {
          this.schedulePeriod = {
            start_date: scheduleResponse.start_date,
            end_date: scheduleResponse.end_date,
          };

          this.schedules = scheduleResponse.data;
   
          //Para manter a ordem por data:
          this.schedules.sort(function(a, b) {
            if (a.date > b.date) {
              return 1;
            }
            if (a.date < b.date) {
              return -1;
            }
            return 0;
          });
        });
      });
  }

  public cancel(){
    this.submit = false;
  }

  public fileOver(event) {
    // console.log(event);
  }

  public fileLeave(event) {
    // console.log(event);
  }

  public changeTab($event) {
    this.form.patchValue({ type: $event.index === 0 ? 'feed' : 'story' });
  }


  // Funções para controlar o comportamento do menu:
  
  public isCollapse = true;  
  
  toggleState() {
      let foo = this.isCollapse;
      this.isCollapse = foo === true ? false : true; 
      document.getElementById("menu").classList.toggle("change-menu");      
  }
  
  onClickedOutside() {
    let foo = this.isCollapse;
    if (foo === false){
      this.isCollapse = foo === false ? true : false;
      document.getElementById("menu").classList.toggle("change-menu");
    }
  }

  //Just For unit test
  // sum(a,b){
  //   let result = a+b
  //   return (result)
  // }

}


