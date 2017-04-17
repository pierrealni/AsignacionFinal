import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RegisterUser } from './shared/register-user.interface';
import { RegisterUserService } from './shared/register-user.service';

@Component({
	selector: 'register-user',
	templateUrl: 'register-user.component.html',
	styleUrls: ['./register-user.component.scss'],
	providers: [RegisterUserService]
})

export class RegisterUserComponent implements OnInit {
	user: FormGroup;

	constructor(private fb: FormBuilder) { }

	ngOnInit() {
		this.user = this.fb.group({
			name: ['', [Validators.required, Validators.minLength(2)]],
			account: this.fb.group({
				email: ['', Validators.required],
				confirm: ['', Validators.required]
			})
		});
	}
	onSubmit({ value, valid }: { value: RegisterUser, valid: boolean }) {
		console.log(value, valid);
	}
}