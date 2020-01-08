import { Component, HostBinding } from '@angular/core';
import { Router }                 from '@angular/router';
import { slideInDownAnimation } from '../animations';
 
@Component({
  templateUrl: './compose-message.component.html',
  styles: [ ':host { position: absolute; top: 10%; right: 10%; background-color: #EDF8D3; padding: 20px; display: block }' ],
  // make the animation available to this component
  animations: [slideInDownAnimation],
  // attach the animation to the host (root) element of this component
  host: { '[@slideInDownAnimation]': ''}
})
export class ComposeMessageComponent {
 
  details: string;
  sending = false;
  message: string = '';
 
  constructor(private router: Router) {}
 
  send() {
    this.sending = true;
    this.details = 'Sending Message...';
 
    setTimeout(() => {
      this.sending = false;
      this.closePopup();
    }, 1000);
  }
 
  cancel() {
    this.closePopup();
  }
 
  closePopup() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: { side: null }}]);
  }
}
