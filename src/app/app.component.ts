import { HttpClient } from '@angular/common/http';
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
  public title: any;
  public New_imgUrl: any;

  public constructor(private http: HttpClient) {
    this.form = new FormBuilder().group({
      channel: null,
      image: null,
      date: null,
      type: null,
      NewURL: null
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
          return -1;
        }
        if (a.date < b.date) {
          return 1;
        }
        return 0;

      });
    });
  }

  public selectChannel(channel) {
    this.selectedChannel = channel;
    this.form.patchValue({ channel });
  }

  public schedule() {
    if (!this.form.valid) return; // TODO: give feedback
    this.http
      .post('api/schedules', this.form.value, { responseType: 'json' })
      .subscribe((data) => {
        // this.form.reset(); //retiro isso para evitar que se atualize o formulario, pois estava criando conflitos quando se faziam agendamentos depois do primeiro.
               
        this.New_imgUrl = "" //Para resetar a imagem preview

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
              return -1;
            }
            if (a.date < b.date) {
              return 1;
            }
            return 0;
          });

        });
      });
      
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File,) => {
          this.form.patchValue({ image: file });
          
          this.form.patchValue({ date: new Date() }); //Data atualizada ao dia em que é feito o upload do arquivo
          
          var reader = new FileReader(); // **for reading file**
          for(const droppedFile of files){
            // Is it a file?
            if(droppedFile.fileEntry.isFile){
              let fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
              fileEntry.file((file:File) => {
                // console.log(droppedFile.relativePath, file);
                reader.readAsDataURL(file);
                  reader.onload = () => {
                      this.form.patchValue({ NewURL: reader.result }); //Para enviar a imagem nova até a tabela
                      this.New_imgUrl = reader.result; //Para previsualizar
                  };
                })
              }
            }
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        // console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  public changeTab($event) {
    this.form.patchValue({ type: $event.index === 0 ? 'feed' : 'story' });
  }
}


