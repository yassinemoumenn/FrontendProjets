
import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { OldPwdValidators } from './old-pwd.validators';

@Component({
  selector: 'pwd-change',
  templateUrl: './pwd-change.component.html',
  styleUrls: ['./pwd-change.component.scss']
})
export class PwdChangeComponent {
  form1: FormGroup; 
  
  constructor(fb: FormBuilder){
    this.form1 = fb.group({
      'oldPwd': ['',Validators.required,OldPwdValidators.shouldBe1234],
      'newPwd': ['',Validators.required],
      'confirmPwd': ['',Validators.required]
    }, {
      validator: OldPwdValidators.matchPwds
    });
  }

  get oldPwd(){
    return this.form1.get('oldPwd');
  }

   get newPwd(){
    return this.form1.get('newPwd');
  }

   get confirmPwd(){
    return this.form1.get('confirmPwd');
  }
}