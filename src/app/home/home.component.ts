
import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  imports: [NgIf,NgFor,RouterLink,NgbModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products:any=[]
  filterProduct:any=[]
  constructor(private service:UserService ){}
  ngOnInit(){
    this.service.getProducts().subscribe((data:any)=>{
      this.products=data
     
      this.filterProduct= this.products.filter((d:any)=>d.price>5000 )
      console.log(this.filterProduct)
    })

  }

}
