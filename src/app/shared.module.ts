import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GetLogoPipe } from './pipes/get-logo.pipe';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule
    ],
    declarations: [
        GetLogoPipe
    ],
    providers: [],
    exports: [
        CommonModule,
        IonicModule,
        FormsModule,
        GetLogoPipe,
    ]
})
export class SharedModule { }