import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent implements OnInit {

  messageForm!: FormGroup;
  hasFormErrors = false;

  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<NewMessageComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.createMessageForm();
  }

  createMessageForm() {
		this.messageForm = this.fb.group({
			recipient: ['', Validators.required],
			title: ['', Validators.required],
			body: ['', Validators.required],
		});
	}

  get getControl(){
    return this.messageForm?.controls;
  }

  onSubmit() {
    if (this.messageForm.invalid) {
			Object.keys(this.getControl).forEach(controlName =>
				this.getControl[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}
    if(this.messageForm.valid)
		    this.onConfirm();
	}

  onConfirm(): void {
		this.dialogRef.close(true);
	}

	onDismiss(): void {
		this.dialogRef.close(false);
	}
}
