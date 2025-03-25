
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';
@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isMenu = true;
  sellerName="";

  constructor(private service:AuthserviceService , private router: Router) {}
  ngOnInit() {
   
    this.router.events.subscribe((data: any) => { //to get current url
      if (data.url) {

        if (data.url.includes('seller') && localStorage.getItem('result')) {  
          this.isMenu = false;
          let storedata=localStorage.getItem('result')
          let convert=storedata && JSON.parse(storedata)[0]
          this.sellerName=convert.name;

        } else {
          this.isMenu = true;
        }
      }
    });

  }
  

  logout() {
    
   

    this.service.userlogout();
    
  }
}
