import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GetLogoPipe } from './pipes/get-logo.pipe';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        GetLogoPipe
    ],
    providers: [],
    exports: [
        GetLogoPipe,
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class SharedModule { }